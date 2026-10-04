// ─── 검색 로봇 전용 SEO 렌더링 (Vercel Serverless Function) ─────────────
// 네이버(Yeti)·구글·다음·카카오톡 스크래퍼 등 봇이 /board 또는 /board/:id 에 접근하면
// (vercel.json의 user-agent 조건부 rewrite → /api/board-seo) 이 함수가 실행됩니다.
//
// 동작:
//  1. 실제 배포된 index.html(React SPA)을 템플릿으로 가져온다.
//  2. Supabase에서 공연 정보를 조회해 <title>, description, canonical, OG/Twitter 태그,
//     JSON-LD(MusicEvent, BreadcrumbList)를 주입한다.
//  3. JS를 실행하지 않는 봇도 읽을 수 있도록 공연 본문을 #root 안에 평문 HTML로 넣는다.
//     (React가 마운트되면 createRoot가 이 내용을 그대로 대체하므로, 사람이 받아도 정상 동작)
//
// → 글 작성/수정 시 별도 작업 없이 실시간 반영됩니다.

const SITE_URL = "https://budiensemble.com";
const SITE_NAME = "부디 앙상블";
const DEFAULT_IMAGE = `${SITE_URL}/images/about_budi/about_budi.webp`;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ─── Supabase REST 조회 ────────────────────────────────────────────────
function getSupabaseEnv() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
  return { url: url.replace(/\/$/, ""), key };
}

async function supabaseSelect(query) {
  const { url, key } = getSupabaseEnv();
  if (!url || !key) throw new Error("Supabase 환경변수가 설정되지 않았습니다.");

  const response = await fetch(`${url}/rest/v1/concert_posts?${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!response.ok) throw new Error(`Supabase 응답 오류: ${response.status}`);
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

function fetchPostList() {
  return supabaseSelect(
    "select=id,title,concert_date,venue,poster_url,created_at" +
      "&is_published=eq.true&order=created_at.desc"
  );
}

async function fetchPost(id) {
  const rows = await supabaseSelect(
    `select=*&id=eq.${encodeURIComponent(id)}&is_published=eq.true&limit=1`
  );
  return rows[0] || null;
}

// ─── 템플릿(index.html) 로드 ───────────────────────────────────────────
const FALLBACK_TEMPLATE = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${SITE_NAME} | Budi Ensemble</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

async function loadTemplate(req) {
  const host = req.headers["x-forwarded-host"] || req.headers.host || "budiensemble.com";
  try {
    // 정적 파일(/index.html)은 rewrite보다 우선 서빙되므로 무한 루프가 발생하지 않습니다.
    const response = await fetch(`https://${host}/index.html`);
    if (response.ok) {
      const html = await response.text();
      if (html.includes('<div id="root">')) return html;
    }
  } catch (err) {
    console.error("[board-seo] index.html 로드 실패, 기본 템플릿 사용:", err);
  }
  return FALLBACK_TEMPLATE;
}

// ─── 유틸 ──────────────────────────────────────────────────────────────
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toJsonLd(data) {
  // </script> 조기 종료 방지
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function summarize(text, maxLength) {
  const flat = String(text || "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return flat.length > maxLength ? `${flat.slice(0, maxLength - 1).trim()}…` : flat;
}

/** "2026.10.25 (일) 18:00" → "2026-10-25T18:00:00+09:00" (KST) */
function toIsoKst(rawDate) {
  const match = String(rawDate || "").match(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  const time = String(rawDate).match(/(\d{1,2}):(\d{2})/);
  if (!time) return date;
  return `${date}T${time[1].padStart(2, "0")}:${time[2]}:00+09:00`;
}

function isPastConcert(isoDate) {
  if (!isoDate) return false;
  const end = isoDate.length === 10 ? new Date(`${isoDate}T23:59:59+09:00`) : new Date(isoDate);
  return !Number.isNaN(end.getTime()) && Date.now() > end.getTime();
}

// ─── <head> 주입 ───────────────────────────────────────────────────────
function buildHead({ title, description, url, image, type, jsonLd, noindex }) {
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    noindex ? `<meta name="robots" content="noindex, follow" />` : null,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    ...jsonLd.map((data) => `<script type="application/ld+json">${toJsonLd(data)}</script>`),
  ];
  return tags.filter(Boolean).join("\n    ");
}

function injectIntoTemplate(template, headTags, bodyHtml) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "");

  if (headTags.includes('name="robots"')) {
    html = html.replace(/<meta\s+name="robots"[^>]*>/gi, "");
  }

  html = html.replace("</head>", `    ${headTags}\n  </head>`);
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${bodyHtml}</div>`);
  return html;
}

// ─── 본문(#root) 정적 HTML ─────────────────────────────────────────────
const WRAP_STYLE =
  "max-width:960px;margin:0 auto;padding:120px 24px 80px;" +
  "font-family:Pretendard,-apple-system,sans-serif;color:#2D3436;line-height:1.7;";

function siteNav() {
  return `<nav aria-label="사이트 메뉴"><a href="/">${SITE_NAME} 홈</a> · <a href="/board">공연 일정</a></nav>`;
}

function renderDetailBody(post, isoDate, siblings) {
  const paragraphs = String(post.content || "")
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br />")}</p>`)
    .join("\n");

  const status = isPastConcert(isoDate) ? "공연 종료" : "공연 예정";
  const sibLinks = siblings
    .filter(Boolean)
    .map((s) => `<li><a href="/board/${s.id}">${escapeHtml(s.title)}</a></li>`)
    .join("");

  return `
<div style="${WRAP_STYLE}">
  ${siteNav()}
  <article>
    <p>${status}</p>
    <h1>${escapeHtml(post.title)}</h1>
    <dl>
      <dt>공연 일시</dt><dd>${isoDate ? `<time datetime="${isoDate}">` : ""}${escapeHtml(post.concert_date)}${isoDate ? "</time>" : ""}</dd>
      <dt>공연 장소</dt><dd>${escapeHtml(post.venue)}</dd>
      <dt>출연</dt><dd>${SITE_NAME} (Budi Ensemble)</dd>
    </dl>
    ${post.poster_url ? `<img src="${escapeHtml(post.poster_url)}" alt="${escapeHtml(post.title)} 공연 포스터" style="max-width:100%;height:auto;" />` : ""}
    <section>
      <h2>공연 소개</h2>
      ${paragraphs}
    </section>
    ${post.kakao_link ? `<p><a href="${escapeHtml(post.kakao_link)}" rel="noopener">공연 예매 / 문의하기</a></p>` : ""}
  </article>
  ${sibLinks ? `<nav aria-label="다른 공연"><h2>다른 공연</h2><ul>${sibLinks}</ul></nav>` : ""}
  <p><a href="/board">전체 공연 일정 보기</a></p>
</div>`;
}

function renderListBody(posts) {
  const items = posts
    .map(
      (p) => `
    <li>
      <a href="/board/${p.id}">${escapeHtml(p.title)}</a>
      <span> · ${escapeHtml(p.concert_date)} · ${escapeHtml(p.venue)}</span>
    </li>`
    )
    .join("");

  return `
<div style="${WRAP_STYLE}">
  ${siteNav()}
  <h1>공연 일정</h1>
  <p>${SITE_NAME}의 공식 정기연주회와 특별 기획 무대를 만나보세요.</p>
  <ul>${items || "<li>예정된 공식 공연 일정을 준비 중입니다.</li>"}</ul>
</div>`;
}

// ─── JSON-LD ───────────────────────────────────────────────────────────
const PERFORMER = {
  "@type": "MusicGroup",
  name: SITE_NAME,
  alternateName: "Budi Ensemble",
  url: `${SITE_URL}/`,
};

function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function musicEvent(post, isoDate, url, description, image) {
  if (!isoDate) return null; // startDate 없는 Event는 구글이 무효 처리하므로 생략
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: post.title,
    description,
    url,
    image: [image],
    startDate: isoDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: post.venue,
      address: { "@type": "PostalAddress", streetAddress: post.venue, addressCountry: "KR" },
    },
    performer: PERFORMER,
    organizer: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
  };
}

// ─── 핸들러 ────────────────────────────────────────────────────────────
function getPostId(req) {
  const parsed = new URL(req.url || "/", "http://localhost");
  const fromQuery = (req.query && req.query.id) || parsed.searchParams.get("id");
  if (fromQuery) return String(fromQuery);
  const fromPath = parsed.pathname.match(/\/board\/([^/?#]+)/);
  return fromPath ? decodeURIComponent(fromPath[1]) : null;
}

function send(res, status, html, cache) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", cache);
  res.end(html);
}

const CACHE_OK = "public, max-age=0, s-maxage=60, stale-while-revalidate=600";
const CACHE_ERR = "public, max-age=0, s-maxage=30";

export default async function handler(req, res) {
  const id = getPostId(req);
  const templatePromise = loadTemplate(req);

  try {
    // ── 공연 목록 (/board) ──
    if (!id) {
      const [template, posts] = await Promise.all([templatePromise, fetchPostList()]);
      const url = `${SITE_URL}/board`;
      const title = `공연 일정 | ${SITE_NAME} Budi Ensemble`;
      const description = summarize(
        `${SITE_NAME}의 공식 공연 일정. ` +
          posts.slice(0, 5).map((p) => `${p.title}(${p.concert_date}, ${p.venue})`).join(", "),
        155
      );
      const head = buildHead({
        title,
        description,
        url,
        image: posts.find((p) => p.poster_url)?.poster_url || DEFAULT_IMAGE,
        type: "website",
        jsonLd: [
          breadcrumb([
            { name: SITE_NAME, url: `${SITE_URL}/` },
            { name: "공연 일정", url },
          ]),
        ],
      });
      return send(res, 200, injectIntoTemplate(template, head, renderListBody(posts)), CACHE_OK);
    }

    // ── 공연 상세 (/board/:id) ──
    const [template, post, list] = await Promise.all([
      templatePromise,
      UUID_RE.test(id) ? fetchPost(id) : Promise.resolve(null),
      fetchPostList().catch(() => []),
    ]);

    if (!post) {
      const head = buildHead({
        title: `공연 정보를 찾을 수 없습니다 | ${SITE_NAME}`,
        description: "요청하신 공연 정보를 찾을 수 없습니다.",
        url: `${SITE_URL}/board`,
        image: DEFAULT_IMAGE,
        type: "website",
        jsonLd: [],
        noindex: true,
      });
      return send(res, 404, injectIntoTemplate(template, head, ""), CACHE_ERR);
    }

    const url = `${SITE_URL}/board/${post.id}`;
    const isoDate = toIsoKst(post.concert_date);
    const image = post.poster_url || DEFAULT_IMAGE;
    const title = `${post.title} | ${SITE_NAME}`;
    const description = summarize(
      `${post.title} - ${post.concert_date}, ${post.venue}. ${SITE_NAME} 공연. ${post.content || ""}`,
      155
    );

    const index = list.findIndex((p) => p.id === post.id);
    const siblings = index === -1 ? [] : [list[index - 1], list[index + 1]];

    const head = buildHead({
      title,
      description,
      url,
      image,
      type: "article",
      jsonLd: [
        musicEvent(post, isoDate, url, description, image),
        breadcrumb([
          { name: SITE_NAME, url: `${SITE_URL}/` },
          { name: "공연 일정", url: `${SITE_URL}/board` },
          { name: post.title, url },
        ]),
      ].filter(Boolean),
    });

    return send(
      res,
      200,
      injectIntoTemplate(template, head, renderDetailBody(post, isoDate, siblings)),
      CACHE_OK
    );
  } catch (err) {
    // 조회 실패 시에도 SPA 원본을 돌려줘 페이지가 깨지지 않도록 한다
    console.error("[board-seo] 렌더링 실패:", err);
    const template = await templatePromise;
    return send(res, 200, template, CACHE_ERR);
  }
}
