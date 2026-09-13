import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Calendar, MapPin, ArrowRight, Music2, Sparkles, Loader2 } from "lucide-react";
import { getPublishedPosts, ConcertPost } from "../../../lib/boardApi";
import { Footer } from "../Footer";

export function BoardListPage() {
  const [posts, setPosts] = useState<ConcertPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublishedPosts();
      setPosts(data);
    } catch (err: any) {
      console.error("게시글 로딩 실패:", err);
      setError("공연 일정을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#05261D", color: "#FDFCFA", display: "flex", flexDirection: "column" }}>
      {/* ─── Hero Header ─── */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 60,
          paddingLeft: 24,
          paddingRight: 24,
          textAlign: "center",
          background: "radial-gradient(ellipse at 50% 30%, rgba(27,122,99,0.3) 0%, rgba(5,38,29,1) 70%)",
          borderBottom: "1px solid rgba(242,175,41,0.12)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 20,
              backgroundColor: "rgba(242,175,41,0.08)",
              border: "1px solid rgba(242,175,41,0.25)",
              color: "#F2AF29",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            <Sparkles size={14} />
            <span>Concerts & Events</span>
          </div>

          <h1
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              marginBottom: 16,
              color: "#FFFFFF",
            }}
          >
            공연 일정 & 소식
          </h1>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
              color: "rgba(253,252,248,0.72)",
              lineHeight: 1.7,
              fontWeight: 300,
              wordBreak: "keep-all",
            }}
          >
            부디 앙상블의 공식 무대와 특별 기획 연주 일정을 만나보세요.
          </p>
        </div>
      </section>

      {/* ─── Content Section ─── */}
      <main style={{ flex: 1, maxWidth: 1200, width: "100%", margin: "0 auto", padding: "60px 24px 100px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <Loader2 className="animate-spin" size={36} color="#F2AF29" style={{ margin: "0 auto 16px" }} />
            <p style={{ color: "rgba(253,252,248,0.6)", fontSize: 15 }}>공연 일정을 불러오는 중입니다...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <p style={{ color: "#ff8b8b", fontSize: 16, marginBottom: 16 }}>{error}</p>
            <button
              onClick={loadPosts}
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
              다시 시도
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "100px 24px",
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(242,175,41,0.2)",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "rgba(242,175,41,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "#F2AF29",
              }}
            >
              <Music2 size={32} />
            </div>
            <h3
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: 20,
                color: "#FFFFFF",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              예정된 공식 공연 일정을 준비 중입니다
            </h3>
            <p style={{ color: "rgba(253,252,248,0.6)", fontSize: 14, lineHeight: 1.6, wordBreak: "keep-all" }}>
              새로운 연주 소식이 등록되는 대로 이곳에 안내해 드리겠습니다.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 32,
            }}
          >
            {posts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/board/${post.id}`)}
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(242,175,41,0.15)",
                  cursor: "pointer",
                  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "rgba(242,175,41,0.45)";
                  e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(242,175,41,0.15)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* ─── Poster Image ─── */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "125%", // 4:5 Poster Aspect Ratio
                    backgroundColor: "#02120e",
                    overflow: "hidden",
                  }}
                >
                  {post.poster_url ? (
                    <img
                      src={post.poster_url}
                      alt={post.title}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(242,175,41,0.3)",
                      }}
                    >
                      <Music2 size={56} />
                    </div>
                  )}

                  {/* Brand Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      padding: "4px 10px",
                      borderRadius: 6,
                      backgroundColor: "rgba(5,38,29,0.85)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(242,175,41,0.3)",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#F2AF29",
                      letterSpacing: "0.04em",
                    }}
                  >
                    BUDI ENSEMBLE
                  </div>
                </div>

                {/* ─── Body Details ─── */}
                <div style={{ padding: "24px 22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h2
                    style={{
                      fontFamily: "'Noto Serif KR', serif",
                      fontSize: 18,
                      fontWeight: 700,
                      lineHeight: 1.45,
                      color: "#FFFFFF",
                      marginBottom: 16,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {post.title}
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#F2AF29", fontSize: 13, fontWeight: 500 }}>
                      <Calendar size={15} style={{ flexShrink: 0 }} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {post.concert_date}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(253,252,248,0.7)", fontSize: 13 }}>
                      <MapPin size={15} style={{ flexShrink: 0, color: "#1B7A63" }} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {post.venue}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: 14,
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      fontSize: 13,
                      color: "#F2AF29",
                      fontWeight: 600,
                    }}
                  >
                    <span>자세히 보기</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
