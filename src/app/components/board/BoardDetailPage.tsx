import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarPlus2,
  MapPin,
  MessageCircle,
  Share2,
  Music2,
  Loader2,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  getPostById,
  getPostSiblings,
  recordPostView,
  ConcertPost,
  PostSibling,
} from "../../../lib/boardApi";
import { Footer } from "../Footer";

// ─── 헬퍼: 본문 내 URL 및 전화번호 자동 하이퍼링크 치환 ──────────────────
function renderContentWithAutoLinks(content: string) {
  if (!content) return null;

  // URL(http, https) 및 한국 전화번호(010, 02, 053, 070 등) 감지 정규식
  const combinedRegex =
    /((?:https?:\/\/[^\s]+)|(?:01[016789]|0[2-6]\d|070)-\d{3,4}-\d{4})/g;

  const parts = content.split(combinedRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // 1. URL 패턴 감지
    if (/^https?:\/\//i.test(part)) {
      let cleanUrl = part;
      let trailingPunct = "";
      const punctMatch = cleanUrl.match(/[.,;:)]+$/);
      if (punctMatch) {
        trailingPunct = punctMatch[0];
        cleanUrl = cleanUrl.slice(0, -trailingPunct.length);
      }

      return (
        <span key={index}>
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1B7A63",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              wordBreak: "break-all",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#05261D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1B7A63")}
          >
            {cleanUrl}
          </a>
          {trailingPunct}
        </span>
      );
    }

    // 2. 전화번호 패턴 감지
    if (/^(?:01[016789]|0[2-6]\d|070)-\d{3,4}-\d{4}$/.test(part)) {
      return (
        <a
          key={index}
          href={`tel:${part.replace(/-/g, "")}`}
          style={{
            color: "#1B7A63",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
          title={`${part} 전화 걸기`}
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

// ─── 헬퍼: 공연 일시 기반 공연 상태 자동 계산 (예정 vs 종료) ───────────
function getConcertStatus(rawDate: string): { isPast: boolean; label: string } {
  if (!rawDate) return { isPast: false, label: "공연 예정" };

  const match = rawDate.match(/(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);
  if (!match) return { isPast: false, label: "공연 예정" };

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);

  const timeMatch = rawDate.match(/(\d{1,2}):(\d{2})/);
  const hour = timeMatch ? parseInt(timeMatch[1], 10) : 23;
  const minute = timeMatch ? parseInt(timeMatch[2], 10) : 59;

  const concertDateTime = new Date(year, month, day, hour, minute, 59);
  const now = new Date();

  const isPast = now.getTime() > concertDateTime.getTime();
  return {
    isPast,
    label: isPast ? "공연 종료" : "공연 예정",
  };
}

// ─── 헬퍼: 구글 캘린더 등록 Web Intent URL 생성 ────────────────────────
function getGoogleCalendarUrl(post: ConcertPost): string {
  const match = post.concert_date.match(/(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);
  let datesParam = "";

  if (match) {
    const y = match[1];
    const m = match[2].padStart(2, "0");
    const d = match[3].padStart(2, "0");
    const timeMatch = post.concert_date.match(/(\d{1,2}):(\d{2})/);

    if (timeMatch) {
      const hour = parseInt(timeMatch[1], 10);
      const min = parseInt(timeMatch[2], 10);
      const startDt = new Date(
        Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10), hour - 9, min)
      );
      const endDt = new Date(startDt.getTime() + 2 * 60 * 60 * 1000);

      const formatUtc = (date: Date) =>
        date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
      datesParam = `${formatUtc(startDt)}/${formatUtc(endDt)}`;
    } else {
      const nextDay = new Date(
        Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10) + 1)
      );
      const y2 = nextDay.getUTCFullYear();
      const m2 = String(nextDay.getUTCMonth() + 1).padStart(2, "0");
      const d2 = String(nextDay.getUTCDate()).padStart(2, "0");
      datesParam = `${y}${m}${d}/${y2}${m2}${d2}`;
    }
  }

  const title = `[부디 앙상블] ${post.title}`;
  const details = `${post.title}\n\n일시: ${post.concert_date}\n장소: ${post.venue}\n\n공식 안내: https://budiensemble.com/board/${post.id}`;
  const location = post.venue;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${datesParam}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
    location
  )}`;
}

export function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<ConcertPost | null>(null);
  const [siblings, setSiblings] = useState<{
    prevPost: PostSibling | null;
    nextPost: PostSibling | null;
  }>({ prevPost: null, nextPost: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) {
      navigate("/board");
      return;
    }
    loadPost(id);
  }, [id]);

  // 브라우저 탭 제목을 현재 공연명으로 동기화 (페이지 이탈 시 기본 제목 복원)
  useEffect(() => {
    if (!post) return;
    const previousTitle = document.title;
    document.title = `${post.title} | 부디 앙상블`;
    return () => {
      document.title = previousTitle;
    };
  }, [post]);

  async function loadPost(postId: string) {
    try {
      setLoading(true);
      setError(null);
      const [data, sibs] = await Promise.all([
        getPostById(postId),
        getPostSiblings(postId),
      ]);

      if (!data) {
        setError("해당 공연 정보를 찾을 수 없습니다.");
      } else {
        setPost(data);
        setSiblings(sibs);
        // 방문자 조회수 집계 (관리자 제외, 24시간 중복 방지)
        recordPostView(postId);
      }
    } catch (err: any) {
      console.error("게시글 상세 로딩 실패:", err);
      setError("공연 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post?.title || "공연 소식"} | 부디 앙상블`,
          text: `[부디 앙상블] ${post?.title} (${post?.concert_date}, ${post?.venue})`,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusInfo = post
    ? getConcertStatus(post.concert_date)
    : { isPast: false, label: "공연 예정" };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        color: "#2D3436",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Pretendard, -apple-system, sans-serif",
      }}
    >
      <style>{`
        .detail-container-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(280px, 380px);
          gap: 64px;
          align-items: start;
        }

        .detail-sticky-panel {
          position: sticky;
          top: 100px;
        }

        @media (max-width: 920px) {
          .detail-container-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .detail-right-col {
            order: -1; /* 모바일에서는 포스터 및 액션이 상단에 먼저 노출 */
            max-width: 420px;
            margin: 0 auto;
            width: 100%;
          }
          .detail-sticky-panel {
            position: static;
          }
        }

        .back-link-btn {
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .back-link-btn:hover {
          color: #1B7A63 !important;
        }
        .back-link-btn:hover .back-arrow-icon {
          transform: translateX(-3px);
        }

        .sibling-nav-card {
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sibling-nav-card:hover {
          border-color: #1B7A63 !important;
          background-color: #F0F7F4 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(27, 122, 99, 0.08);
        }
        .sibling-nav-card:hover .sibling-title {
          color: #1B7A63 !important;
        }
      `}</style>

      {/* ─── Main Canvas ─── */}
      <main
        style={{
          flex: 1,
          maxWidth: 1100,
          width: "100%",
          margin: "0 auto",
          padding: "120px 24px 100px",
        }}
      >
        {/* ─── Back to Schedule Link ─── */}
        <div style={{ marginBottom: 36 }}>
          <button
            type="button"
            onClick={() => navigate("/board")}
            className="back-link-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              padding: 0,
              color: "#636e72",
              fontSize: 14.5,
              fontWeight: 600,
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            <ArrowLeft
              size={17}
              className="back-arrow-icon"
              style={{ transition: "transform 0.2s ease" }}
            />
            <span>전체 공연 일정으로</span>
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "120px 20px" }}>
            <Loader2
              className="animate-spin"
              size={36}
              color="#1B7A63"
              style={{ margin: "0 auto 16px" }}
            />
            <p style={{ color: "#636e72", fontSize: 15, fontWeight: 500 }}>
              공연 정보를 불러오는 중입니다...
            </p>
          </div>
        ) : error || !post ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              backgroundColor: "#F7FAF9",
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.06)",
              maxWidth: 480,
              margin: "40px auto",
            }}
          >
            <p style={{ color: "#d63031", fontSize: 16, marginBottom: 20, fontWeight: 500 }}>
              {error || "공연 정보가 없습니다."}
            </p>
            <button
              type="button"
              onClick={() => navigate("/board")}
              style={{
                padding: "10px 24px",
                borderRadius: 8,
                backgroundColor: "#1B7A63",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              목록으로 돌아가기
            </button>
          </div>
        ) : (
          <div>
            {/* ─── 2-Column Responsive Layout ─── */}
            <div className="detail-container-grid">
              {/* ─── Left Column: Title, Metadata Specs & Content ─── */}
              <div className="detail-left-col">
                {/* 1. 공연 상태 뱃지 ([공연 예정] vs [공연 종료]) */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span
                    style={{
                      padding: "4px 11px",
                      borderRadius: 6,
                      fontSize: 12.5,
                      fontWeight: 700,
                      fontFamily: "Pretendard, sans-serif",
                      backgroundColor: statusInfo.isPast ? "#F1F5F9" : "#ECFDF5",
                      color: statusInfo.isPast ? "#64748B" : "#065F46",
                      border: `1px solid ${statusInfo.isPast ? "#E2E8F0" : "#A7F3D0"}`,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      letterSpacing: "-0.2px",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: statusInfo.isPast ? "#94A3B8" : "#10B981",
                      }}
                    />
                    {statusInfo.label}
                  </span>
                </div>

                {/* Concert Main Title */}
                <h1
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: "clamp(28px, 3.6vw, 42px)",
                    fontWeight: 800,
                    lineHeight: 1.28,
                    color: "#05261D",
                    letterSpacing: "-0.8px",
                    marginTop: 0,
                    marginBottom: 22,
                    wordBreak: "keep-all",
                    overflowWrap: "break-word",
                  }}
                >
                  {post.title}
                </h1>

                {/* Specifications List (DB 존재하는 실제 데이터만 노출: 일시, 장소) */}
                <dl
                  style={{
                    margin: 0,
                    padding: 0,
                    borderTop: "1.5px solid #05261D",
                  }}
                >
                  {/* 공연 일시 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      padding: "13px 0",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                      gap: 18,
                    }}
                  >
                    <dt
                      style={{
                        width: 80,
                        flexShrink: 0,
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: "#8395a7",
                        fontFamily: "Pretendard, sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Calendar size={15} style={{ color: "#1B7A63" }} />
                      <span>공연 일시</span>
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        fontSize: 15.5,
                        fontWeight: 700,
                        color: "#05261D",
                        fontFamily: "Pretendard, sans-serif",
                      }}
                    >
                      {post.concert_date}
                    </dd>
                  </div>

                  {/* 공연 장소 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      padding: "13px 0",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                      gap: 18,
                    }}
                  >
                    <dt
                      style={{
                        width: 80,
                        flexShrink: 0,
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: "#8395a7",
                        fontFamily: "Pretendard, sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <MapPin size={15} style={{ color: "#1B7A63" }} />
                      <span>공연 장소</span>
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        fontSize: 15.5,
                        fontWeight: 700,
                        color: "#05261D",
                        fontFamily: "Pretendard, sans-serif",
                      }}
                    >
                      {post.venue}
                    </dd>
                  </div>
                </dl>

                {/* 공연 소개 (Introduction & Program Notes) */}
                {post.content && (
                  <section
                    style={{
                      marginTop: 36,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 10,
                        marginBottom: 16,
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: "Pretendard, sans-serif",
                          fontSize: 19,
                          fontWeight: 800,
                          color: "#05261D",
                          letterSpacing: "-0.5px",
                          margin: 0,
                        }}
                      >
                        공연 소개
                      </h2>
                      <span
                        style={{
                          fontFamily: "Pretendard, sans-serif",
                          fontSize: 12.5,
                          color: "#8395a7",
                          fontWeight: 600,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                        }}
                      >
                        ABOUT
                      </span>
                    </div>

                    {/* Text Content with Auto-Linked URLs & Phone Numbers */}
                    <div
                      style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 15.5,
                        lineHeight: 1.85,
                        color: "#2D3436",
                        whiteSpace: "pre-line",
                        wordBreak: "keep-all",
                      }}
                    >
                      {renderContentWithAutoLinks(post.content)}
                    </div>
                  </section>
                )}

                {/* ─── Previous / Next Concert Navigation (이전 / 다음 공연) ─── */}
                <nav
                  aria-label="이전 및 다음 공연 내비게이션"
                  style={{
                    marginTop: 56,
                    paddingTop: 32,
                    borderTop: "1.5px solid #05261D",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {/* 다음 공연 (게시판 목록 기준 좌측 / 최신 공연) */}
                    {siblings.nextPost ? (
                      <div
                        onClick={() => navigate(`/board/${siblings.nextPost?.id}`)}
                        className="sibling-nav-card"
                        style={{
                          padding: "16px 20px",
                          borderRadius: 10,
                          backgroundColor: "#F7FAF9",
                          border: "1px solid rgba(0, 0, 0, 0.08)",
                          cursor: "pointer",
                          boxSizing: "border-box",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 12,
                            color: "#8395a7",
                            marginBottom: 6,
                            fontWeight: 600,
                          }}
                        >
                          <ArrowLeft size={13} />
                          <span>다음 공연</span>
                        </div>
                        <div
                          className="sibling-title"
                          style={{
                            fontSize: 14.5,
                            fontWeight: 700,
                            color: "#05261D",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            wordBreak: "keep-all",
                            overflowWrap: "break-word",
                            lineHeight: 1.35,
                            transition: "color 0.2s ease",
                          }}
                        >
                          {siblings.nextPost.title}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          padding: "16px 20px",
                          borderRadius: 10,
                          backgroundColor: "#FAFAFA",
                          border: "1px dashed rgba(0, 0, 0, 0.08)",
                          color: "#b2bec3",
                          fontSize: 13,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          boxSizing: "border-box",
                        }}
                      >
                        <span>다음 등록된 공연이 없습니다</span>
                      </div>
                    )}

                    {/* 이전 공연 (게시판 목록 기준 우측 / 과거 공연) */}
                    {siblings.prevPost ? (
                      <div
                        onClick={() => navigate(`/board/${siblings.prevPost?.id}`)}
                        className="sibling-nav-card"
                        style={{
                          padding: "16px 20px",
                          borderRadius: 10,
                          backgroundColor: "#F7FAF9",
                          border: "1px solid rgba(0, 0, 0, 0.08)",
                          cursor: "pointer",
                          textAlign: "right",
                          boxSizing: "border-box",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 6,
                            fontSize: 12,
                            color: "#8395a7",
                            marginBottom: 6,
                            fontWeight: 600,
                          }}
                        >
                          <span>이전 공연</span>
                          <ArrowRight size={13} />
                        </div>
                        <div
                          className="sibling-title"
                          style={{
                            fontSize: 14.5,
                            fontWeight: 700,
                            color: "#05261D",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            wordBreak: "keep-all",
                            overflowWrap: "break-word",
                            lineHeight: 1.35,
                            transition: "color 0.2s ease",
                          }}
                        >
                          {siblings.prevPost.title}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          padding: "16px 20px",
                          borderRadius: 10,
                          backgroundColor: "#FAFAFA",
                          border: "1px dashed rgba(0, 0, 0, 0.08)",
                          color: "#b2bec3",
                          fontSize: 13,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 6,
                          boxSizing: "border-box",
                        }}
                      >
                        <span>이전 등록된 공연이 없습니다</span>
                      </div>
                    )}
                  </div>
                </nav>

                {/* 전체 목록 돌아가기 버튼 (왼쪽 콘텐츠 하단) */}
                <div
                  style={{
                    marginTop: 36,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => navigate("/board")}
                    className="back-link-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "9px 20px",
                      borderRadius: 9999,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid rgba(0, 0, 0, 0.12)",
                      color: "#05261D",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "Pretendard, sans-serif",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#F4F6F5";
                      e.currentTarget.style.borderColor = "#1B7A63";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.12)";
                    }}
                  >
                    <ArrowLeft size={16} />
                    <span>전체 공연 목록으로 돌아가기</span>
                  </button>
                </div>
              </div>

              {/* ─── Right Column: Poster Image & Action CTAs ─── */}
              <div className="detail-right-col">
                <div className="detail-sticky-panel">
                  {/* Poster Frame */}
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 10,
                      overflow: "hidden",
                      backgroundColor: "#F4F6F5",
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
                      marginBottom: 16,
                    }}
                  >
                    {post.poster_url ? (
                      <img
                        src={post.poster_url}
                        alt={post.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: 420,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "rgba(27, 122, 99, 0.35)",
                          gap: 12,
                        }}
                      >
                        <Music2 size={54} />
                        <span style={{ fontSize: 13, color: "#8395a7", fontWeight: 500 }}>
                          Budi Ensemble Poster
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTAs under Poster */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* 1. 예매하기 버튼 (공연 상태에 따라 분기) */}
                    {statusInfo.isPast ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          width: "100%",
                          padding: "13px 20px",
                          borderRadius: 8,
                          backgroundColor: "#F1F5F9",
                          color: "#94A3B8",
                          fontWeight: 600,
                          fontSize: 14.5,
                          border: "1px solid #E2E8F0",
                          boxSizing: "border-box",
                        }}
                      >
                        <span>공연이 종료되었습니다</span>
                      </div>
                    ) : post.kakao_link ? (
                      <a
                        href={post.kakao_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          width: "100%",
                          padding: "14px 20px",
                          borderRadius: 8,
                          backgroundColor: post.kakao_link.includes("kakao") ? "#FEE500" : "#05261D",
                          color: post.kakao_link.includes("kakao") ? "#000000" : "#FFFFFF",
                          fontWeight: 700,
                          fontSize: 15,
                          textDecoration: "none",
                          boxShadow: post.kakao_link.includes("kakao")
                            ? "0 3px 10px rgba(0,0,0,0.06)"
                            : "0 4px 14px rgba(5, 38, 29, 0.16)",
                          transition: "all 0.2s ease",
                          boxSizing: "border-box",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-1px)";
                          if (post.kakao_link?.includes("kakao")) {
                            e.currentTarget.style.boxShadow = "0 6px 18px rgba(254, 229, 0, 0.35)";
                          } else {
                            e.currentTarget.style.backgroundColor = "#1B7A63";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          if (post.kakao_link?.includes("kakao")) {
                            e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.06)";
                          } else {
                            e.currentTarget.style.backgroundColor = "#05261D";
                          }
                        }}
                      >
                        {post.kakao_link.includes("kakao") ? (
                          <MessageCircle size={18} fill="#000000" />
                        ) : (
                          <ExternalLink size={18} />
                        )}
                        <span>
                          {post.kakao_link.includes("kakao") ? "카카오톡 예매 / 문의하기" : "공연 예매 / 문의하기"}
                        </span>
                      </a>
                    ) : null}

                    {/* 2. 구글 캘린더에 일정 담기 버튼 */}
                    <a
                      href={getGoogleCalendarUrl(post)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Google Calendar에 공연 일정 등록"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        width: "100%",
                        padding: "12px 20px",
                        borderRadius: 8,
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                        color: "#05261D",
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        boxSizing: "border-box",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F4F6F5";
                        e.currentTarget.style.borderColor = "#1B7A63";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                        e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.12)";
                      }}
                    >
                      <CalendarPlus2 size={16} color="#1B7A63" />
                      <span>내 캘린더에 일정 담기</span>
                    </a>

                    {/* 3. 공연 링크 공유하기 버튼 */}
                    <button
                      type="button"
                      onClick={handleShare}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        width: "100%",
                        padding: "12px 20px",
                        borderRadius: 8,
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                        color: copied ? "#1B7A63" : "#2D3436",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxSizing: "border-box",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F4F6F5";
                        e.currentTarget.style.borderColor = "#1B7A63";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                        e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.12)";
                      }}
                    >
                      {copied ? <Check size={16} color="#1B7A63" /> : <Share2 size={16} />}
                      <span>{copied ? "공연 링크가 복사되었습니다!" : "공연 링크 공유하기"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─── Footer (메인 페이지와 동일) ─── */}
      <Footer />
    </div>
  );
}
