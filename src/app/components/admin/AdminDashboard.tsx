import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  LogOut,
  Calendar,
  MapPin,
  Loader2,
  CheckCircle2,
  Music,
} from "lucide-react";
import {
  getAllPosts,
  deletePost,
  deletePoster,
  togglePublish,
  getCurrentUser,
  isAdmin,
  signOutAdmin,
  ConcertPost,
} from "../../../lib/boardApi";

export function AdminDashboard() {
  const [posts, setPosts] = useState<ConcertPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  async function checkAuthAndLoad() {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user?.email) {
        navigate("/admin", { replace: true });
        return;
      }

      const admin = await isAdmin(user.email);
      if (!admin) {
        navigate("/admin", { replace: true });
        return;
      }

      setUserEmail(user.email);
      await fetchPosts();
    } catch (err: any) {
      console.error("인증 실패:", err);
      navigate("/admin", { replace: true });
    } finally {
      setLoading(false);
    }
  }

  async function fetchPosts() {
    const data = await getAllPosts();
    setPosts(data);
  }

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleTogglePublish = async (post: ConcertPost) => {
    try {
      setActionLoading(post.id);
      const nextStatus = !post.is_published;
      await togglePublish(post.id, nextStatus);
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, is_published: nextStatus } : p))
      );
      showToast(nextStatus ? "공개로 전환되었습니다." : "비공개로 전환되었습니다.");
    } catch (err: any) {
      console.error("상태 변경 실패:", err);
      alert("상태 변경 중 오류가 발생했습니다.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (post: ConcertPost) => {
    if (!window.confirm(`'${post.title}' 글을 삭제하시겠습니까?`)) {
      return;
    }

    try {
      setActionLoading(post.id);
      if (post.poster_url) {
        try {
          await deletePoster(post.poster_url);
        } catch (storageErr) {
          console.warn("포스터 삭제 오류:", storageErr);
        }
      }
      await deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      showToast("삭제되었습니다.");
    } catch (err: any) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    navigate("/admin", { replace: true });
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F8FAFC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        <Loader2 className="animate-spin" size={32} color="#1B7A63" />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
      }}
    >
      {/* ─── Top Header ─── */}
      <header
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#1B7A63" }}>
            관리자
          </span>
          <span
            style={{
              padding: "2px 8px",
              borderRadius: 4,
              backgroundColor: "#F1F5F9",
              fontSize: 12,
              color: "#64748B",
              fontWeight: 500,
            }}
          >
            {userEmail}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            to="/board"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 12px",
              borderRadius: 6,
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              color: "#334155",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <span>게시판 보기</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 12px",
              borderRadius: 6,
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              color: "#64748B",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#DC2626")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
          >
            <LogOut size={13} />
            <span>로그아웃</span>
          </button>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 20px 80px" }}>
        {/* Toast */}
        {toastMsg && (
          <div
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              backgroundColor: "#1B7A63",
              color: "#FFFFFF",
              padding: "10px 18px",
              borderRadius: 8,
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 500,
              zIndex: 100,
            }}
          >
            <CheckCircle2 size={16} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>
              공연 목록
            </h1>
            <p style={{ fontSize: 13, color: "#64748B" }}>
              총 {posts.length}건
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/new")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 18px",
              borderRadius: 8,
              backgroundColor: "#1B7A63",
              color: "#FFFFFF",
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#156350")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1B7A63")}
          >
            <Plus size={16} />
            <span>새 공연 등록</span>
          </button>
        </div>

        {/* List */}
        {posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: 10,
            }}
          >
            <p style={{ fontSize: 14, color: "#64748B", marginBottom: 16 }}>
              등록된 공연이 없습니다.
            </p>
            <button
              onClick={() => navigate("/admin/new")}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                backgroundColor: "#1B7A63",
                color: "#FFFFFF",
                border: "none",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              새 공연 등록
            </button>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {posts.map((post, idx) => (
              <div
                key={post.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: idx === posts.length - 1 ? "none" : "1px solid #F1F5F9",
                  gap: 16,
                  transition: "background-color 0.1s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8FAFC")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
              >
                {/* Left: Thumbnail & Details */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 200, flex: 1 }}>
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: 52,
                      height: 66,
                      borderRadius: 6,
                      overflow: "hidden",
                      backgroundColor: "#F1F5F9",
                      flexShrink: 0,
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    {post.poster_url ? (
                      <img
                        src={post.poster_url}
                        alt={post.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#94A3B8",
                        }}
                      >
                        <Music size={20} />
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span
                        style={{
                          padding: "2px 6px",
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          backgroundColor: post.is_published ? "#ECFDF5" : "#F1F5F9",
                          color: post.is_published ? "#065F46" : "#64748B",
                          border: `1px solid ${post.is_published ? "#A7F3D0" : "#E2E8F0"}`,
                        }}
                      >
                        {post.is_published ? "공개" : "비공개"}
                      </span>
                    </div>

                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", marginBottom: 4 }}>
                      {post.title}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 12, color: "#64748B" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Calendar size={12} color="#1B7A63" />
                        {post.concert_date}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={12} color="#94A3B8" />
                        {post.venue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {/* Toggle */}
                  <button
                    onClick={() => handleTogglePublish(post)}
                    disabled={actionLoading === post.id}
                    title={post.is_published ? "비공개로 변경" : "공개로 변경"}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 10px",
                      borderRadius: 6,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      color: post.is_published ? "#065F46" : "#64748B",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {post.is_published ? <Eye size={13} /> : <EyeOff size={13} />}
                    <span>{post.is_published ? "공개" : "비공개"}</span>
                  </button>

                  {/* View Live */}
                  <Link
                    to={`/board/${post.id}`}
                    target="_blank"
                    title="게시글 보기"
                    style={{
                      padding: 7,
                      borderRadius: 6,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      color: "#475569",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ExternalLink size={14} />
                  </Link>

                  {/* Edit */}
                  <button
                    onClick={() => navigate(`/admin/edit/${post.id}`)}
                    title="수정"
                    style={{
                      padding: 7,
                      borderRadius: 6,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      color: "#1B7A63",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Edit2 size={14} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(post)}
                    disabled={actionLoading === post.id}
                    title="삭제"
                    style={{
                      padding: 7,
                      borderRadius: 6,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      color: "#EF4444",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
