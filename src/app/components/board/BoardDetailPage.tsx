import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Calendar, MapPin, MessageCircle, Share2, Sparkles, Loader2, Music2 } from "lucide-react";
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
    <div style={{ minHeight: "100vh", backgroundColor: "#05261D", color: "#FDFCFA", display: "flex", flexDirection: "column" }}>
      {/* ─── Back Navigation Header ─── */}
      <div
        style={{
          paddingTop: 110,
          paddingBottom: 20,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 1100,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => navigate("/board")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 8,
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(242,175,41,0.2)",
            color: "rgba(253,252,248,0.8)",
            fontSize: 14,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(242,175,41,0.12)";
            e.currentTarget.style.color = "#F2AF29";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(253,252,248,0.8)";
          }}
        >
          <ArrowLeft size={16} />
          <span>전체 공연 목록</span>
        </button>
      </div>

      {/* ─── Main Content ─── */}
      <main style={{ flex: 1, maxWidth: 1100, width: "100%", margin: "0 auto", padding: "0 24px 100px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "120px 20px" }}>
            <Loader2 className="animate-spin" size={36} color="#F2AF29" style={{ margin: "0 auto 16px" }} />
            <p style={{ color: "rgba(253,252,248,0.6)", fontSize: 15 }}>공연 정보를 불러오는 중입니다...</p>
          </div>
        ) : error || !post ? (
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <p style={{ color: "#ff8b8b", fontSize: 16, marginBottom: 20 }}>{error || "공연 정보가 없습니다."}</p>
            <button
              onClick={() => navigate("/board")}
              style={{
                padding: "10px 24px",
                borderRadius: 8,
                backgroundColor: "#1B7A63",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              목록으로 돌아가기
            </button>
          </div>
        ) : (
          <div>
            {/* ─── Grid: Poster (Left) + Key Info (Right) ─── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 48,
                marginBottom: 60,
                alignItems: "start",
              }}
            >
              {/* Poster Column */}
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(242,175,41,0.25)",
                  backgroundColor: "#02120e",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
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
                      height: 480,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(242,175,41,0.3)",
                    }}
                  >
                    <Music2 size={80} />
                  </div>
                )}
              </div>

              {/* Info Column */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 12px",
                    borderRadius: 20,
                    backgroundColor: "rgba(242,175,41,0.1)",
                    border: "1px solid rgba(242,175,41,0.3)",
                    color: "#F2AF29",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    width: "fit-content",
                    marginBottom: 16,
                  }}
                >
                  <Sparkles size={13} />
                  <span>Official Performance</span>
                </div>

                <h1
                  style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    color: "#FFFFFF",
                    marginBottom: 24,
                    wordBreak: "keep-all",
                  }}
                >
                  {post.title}
                </h1>

                {/* Metadata Card */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(242,175,41,0.15)",
                    borderRadius: 12,
                    padding: "20px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    marginBottom: 28,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        backgroundColor: "rgba(242,175,41,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#F2AF29",
                        flexShrink: 0,
                      }}
                    >
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "rgba(253,252,248,0.5)", marginBottom: 2 }}>일시</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>{post.concert_date}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        backgroundColor: "rgba(27,122,99,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1B7A63",
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "rgba(253,252,248,0.5)", marginBottom: 2 }}>장소</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>{post.venue}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        backgroundColor: "rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FDFCFA",
                        flexShrink: 0,
                      }}
                    >
                      <Music2 size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "rgba(253,252,248,0.5)", marginBottom: 2 }}>주최 / 연주</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>부디 앙상블 (Budi Ensemble)</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {post.kakao_link && (
                    <a
                      href={post.kakao_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: "1 1 200px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "14px 24px",
                        borderRadius: 10,
                        backgroundColor: "#FEE500",
                        color: "#000000",
                        fontWeight: 700,
                        fontSize: 15,
                        textDecoration: "none",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(254,229,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <MessageCircle size={18} fill="#000000" />
                      <span>카카오톡 예매 / 문의</span>
                    </a>
                  )}

                  <button
                    onClick={handleShare}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "14px 20px",
                      borderRadius: 10,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(242,175,41,0.25)",
                      color: "#FDFCFA",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(242,175,41,0.15)";
                      e.currentTarget.style.color = "#F2AF29";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.color = "#FDFCFA";
                    }}
                  >
                    <Share2 size={16} />
                    <span>{copied ? "링크 복사됨! ✓" : "공연 공유"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ─── Detailed Content / Description ─── */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(242,175,41,0.15)",
                borderRadius: 16,
                padding: "36px 32px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Noto Serif KR', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#F2AF29",
                  marginBottom: 24,
                  paddingBottom: 16,
                  borderBottom: "1px solid rgba(242,175,41,0.15)",
                }}
              >
                공연 소개
              </h3>

              <div
                style={{
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: "rgba(253,252,248,0.85)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "keep-all",
                }}
              >
                {post.content}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
