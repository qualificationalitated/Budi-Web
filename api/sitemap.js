// ─── 동적 사이트맵 (Vercel Serverless Function) ─────────────────────────
// 검색 로봇이 https://budiensemble.com/sitemap.xml 을 요청하면
// (vercel.json rewrite → /api/sitemap) Supabase에 공개된 공연 글을 실시간 조회해
// 개별 공연 상세 페이지(/board/:id)까지 포함된 사이트맵을 생성합니다.
// → 관리자 센터에서 글을 작성/수정하면 별도 작업 없이 자동 반영됩니다.

const SITE_URL = "https://budiensemble.com";

function getSupabaseEnv() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
  return { url: url.replace(/\/$/, ""), key };
}

async function fetchPublishedPosts() {
  const { url, key } = getSupabaseEnv();
  if (!url || !key) return [];

  const endpoint =
    `${url}/rest/v1/concert_posts` +
    `?select=id,updated_at,created_at&is_published=eq.true&order=created_at.desc`;

  const response = await fetch(endpoint, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!response.ok) return [];
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toW3CDate(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export default async function handler(req, res) {
  let posts = [];
  try {
    posts = await fetchPublishedPosts();
  } catch (err) {
    // DB 조회 실패 시에도 고정 페이지만으로 유효한 사이트맵을 반환 (검색엔진 오류 방지)
    console.error("[sitemap] Supabase 조회 실패:", err);
  }

  const latestPostDate = posts
    .map((p) => toW3CDate(p.updated_at || p.created_at))
    .filter(Boolean)
    .sort()
    .pop();

  const entries = [
    urlEntry({ loc: `${SITE_URL}/`, lastmod: "2026-09-20", changefreq: "weekly", priority: "1.0" }),
    urlEntry({
      loc: `${SITE_URL}/board`,
      lastmod: latestPostDate || "2026-09-20",
      changefreq: "daily",
      priority: "0.9",
    }),
    ...posts.map((post) =>
      urlEntry({
        loc: `${SITE_URL}/board/${post.id}`,
        lastmod: toW3CDate(post.updated_at || post.created_at),
        changefreq: "weekly",
        priority: "0.8",
      })
    ),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${entries.join("\n")}\n` +
    `</urlset>\n`;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  // 엣지 캐시 5분 + 백그라운드 갱신 → 새 글이 최대 수 분 내 반영
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=3600");
  res.end(xml);
}
