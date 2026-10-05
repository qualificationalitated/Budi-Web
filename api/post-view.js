import crypto from "node:crypto";

const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14cWZqdXhsd2phd3RqdWdwcGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyOTIwODgsImV4cCI6MjEwNDg2ODA4OH0.K7KM7LUVw_7wHaUSZvJn_JF5-_XHwH1lqcVRoSAy-E0";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://mxqfjuxlwjawtjugppjg.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  DEFAULT_ANON_KEY;

// 검색 엔진 크롤러 및 소셜 미리보기 봇 목록 (조회수 왜곡 방지)
const BOT_REGEX =
  /([Bb]ot|[Cc]rawler|[Ss]pider|Yeti|Daum|kakaotalk-scrap|facebookexternalhit|Google-InspectionTool|WhatsApp)/i;

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const id = req.query?.id || req.body?.id;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const ua = req.headers["user-agent"] || "";
    // 검색 로봇이나 크롤러는 카운트 제외
    if (BOT_REGEX.test(ua)) {
      return res.status(200).json({ counted: false, reason: "bot" });
    }

    // IP 추출 (Vercel 환경 x-forwarded-for 헤더)
    const rawIp =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.socket?.remoteAddress ||
      "unknown";
    const clientIp = String(rawIp).split(",")[0].trim();

    // 개인정보 보호를 위한 익명 단방향 해시 생성 (IP + 당일 날짜 + 솔트)
    const today = new Date().toISOString().slice(0, 10);
    const visitorHash = crypto
      .createHash("sha256")
      .update(`${clientIp}-${today}-budi-view-salt`)
      .digest("hex")
      .slice(0, 24);

    // Supabase RPC 직접 호출 (경량 fetch 사용으로 cold start 극소화)
    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/record_post_view`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_post_id: id,
        p_visitor_hash: visitorHash,
      }),
    });

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      // RPC 미등록 상태여도 클라이언트 에러로 터지지 않도록 처리
      console.warn("record_post_view RPC failed:", errText);
      return res.status(200).json({ counted: false, note: "pending_sql" });
    }

    const data = await rpcRes.json();
    return res.status(200).json({ counted: Boolean(data) });
  } catch (err) {
    console.error("View count error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
