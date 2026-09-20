import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, MapPin, MessageCircle, Share2, Music2, Loader2, Check, ExternalLink } from "lucide-react";
import { getPostById, ConcertPost } from "../../../lib/boardApi";
import { Footer } from "../Footer";

export function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<ConcertPost | null>(null);
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

  async function loadPost(postId: string) {
    try {
      setLoading(true);
      setError(null);
      const data = await getPostById(postId);
      if (!data) {
        setError("해당 공연 정보를 찾을 수 없습니다.");
      } else {
        setPost(data);
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

                    {/* Text Content (Open Typography) */}
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
                      {post.content}
                    </div>
                  </section>
                )}

                {/* 전체 목록 돌아가기 버튼 (왼쪽 콘텐츠 하단) */}
                <div
                  style={{
                    marginTop: 64,
                    paddingTop: 28,
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
                      transition: "all 0.2s ease",
                      fontFamily: "Pretendard, sans-serif",
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
                    {/* 예매하기 버튼 (글 작성 시 링크가 입력되어 있을 때만 렌더링) */}
                    {post.kakao_link && (
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
                    )}

                    {/* 공연 링크 공유하기 버튼 */}
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
