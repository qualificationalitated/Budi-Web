import { supabase } from "./supabase";

// ─── Types ───────────────────────────────────────────────────
export interface ConcertPost {
  id: string;
  title: string;
  concert_date: string;
  venue: string;
  content: string;
  poster_url: string | null;
  kakao_link: string | null;
  is_published: boolean;
  author_email: string;
  created_at: string;
  updated_at: string;
}

export type ConcertPostInsert = Omit<ConcertPost, "id" | "created_at" | "updated_at">;
export type ConcertPostUpdate = Partial<Omit<ConcertPost, "id" | "created_at" | "updated_at">>;

// ─── 방문자용: 공개 게시글 조회 ─────────────────────────────
export async function getPublishedPosts(): Promise<ConcertPost[]> {
  const { data, error } = await supabase
    .from("concert_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPostById(id: string): Promise<ConcertPost | null> {
  const { data, error } = await supabase
    .from("concert_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw error;
  }
  return data;
}

export interface PostSibling {
  id: string;
  title: string;
  concert_date: string;
}

// ─── 방문자용: 이전/다음 공연 내비게이션 조회 ─────────────────────
export async function getPostSiblings(
  currentPostId: string
): Promise<{ prevPost: PostSibling | null; nextPost: PostSibling | null }> {
  const { data, error } = await supabase
    .from("concert_posts")
    .select("id, title, concert_date, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return { prevPost: null, nextPost: null };

  const currentIndex = data.findIndex((p) => p.id === currentPostId);
  if (currentIndex === -1) return { prevPost: null, nextPost: null };

  // 게시판 목록 기준: 최신글(좌측, currentIndex - 1)은 다음 공연, 과거글(우측, currentIndex + 1)은 이전 공연
  const nextPost =
    currentIndex > 0
      ? {
          id: data[currentIndex - 1].id,
          title: data[currentIndex - 1].title,
          concert_date: data[currentIndex - 1].concert_date,
        }
      : null;

  const prevPost =
    currentIndex < data.length - 1
      ? {
          id: data[currentIndex + 1].id,
          title: data[currentIndex + 1].title,
          concert_date: data[currentIndex + 1].concert_date,
        }
      : null;

  return { prevPost, nextPost };
}

// ─── 관리자용: 전체 게시글 CRUD ──────────────────────────────
export async function getAllPosts(): Promise<ConcertPost[]> {
  const { data, error } = await supabase
    .from("concert_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createPost(post: ConcertPostInsert): Promise<ConcertPost> {
  const { data, error } = await supabase
    .from("concert_posts")
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id: string, updates: ConcertPostUpdate): Promise<ConcertPost> {
  const { data, error } = await supabase
    .from("concert_posts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase
    .from("concert_posts")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function togglePublish(id: string, isPublished: boolean): Promise<void> {
  const { error } = await supabase
    .from("concert_posts")
    .update({ is_published: isPublished, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
}

// ─── 포스터 이미지 업로드 (Supabase Storage) ─────────────────
export async function uploadPoster(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("posters")
    .upload(fileName, file, { contentType: file.type, upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from("posters").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function deletePoster(posterUrl: string): Promise<void> {
  // URL에서 파일명 추출
  const fileName = posterUrl.split("/").pop();
  if (!fileName) return;

  const { error } = await supabase.storage
    .from("posters")
    .remove([fileName]);

  if (error) throw error;
}

// ─── 관리자 권한 및 인증 ────────────────────────────────────
export async function isAdmin(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("admins")
    .select("id")
    .eq("email", email)
    .single();

  if (error) return false;
  return !!data;
}

export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/admin`,
    },
  });
  if (error) throw error;
}

export async function signOutAdmin(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

