import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { MapPin, Calendar, Music2, Loader2, ArrowRight } from "lucide-react";
import { getPublishedPosts, ConcertPost } from "../../../lib/boardApi";
import { Footer } from "../Footer";

interface ParsedDate {
  year: string;
  formatted: string;
  raw: string;
}

function parseConcertDate(rawDate: string, createdAt?: string): ParsedDate {
  if (!rawDate) {
    const fallbackYear = createdAt ? new Date(createdAt).getFullYear().toString() : "2026";
    return { year: fallbackYear, formatted: "-", raw: "" };
  }

  const trimmed = rawDate.trim();
  const match = trimmed.match(/^(\d{4})[.-](\d{1,2})[.-](\d{1,2})(.*)$/);
  if (match) {
    const year = match[1];
    const month = match[2].padStart(2, "0");
    const day = match[3].padStart(2, "0");
    const extra = match[4].trim();
    return {
      year,
      formatted: `${year}. ${month}. ${day} ${extra}`.trim(),
      raw: trimmed,
    };
  }

  const fallbackYear = createdAt ? new Date(createdAt).getFullYear().toString() : "2026";
  return {
    year: fallbackYear,
    formatted: trimmed,
    raw: trimmed,
  };
}

export function BoardListPage() {
  const [posts, setPosts] = useState<ConcertPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
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

  // ─── 연도별(2026, 2025...) 그룹핑 및 정렬 ───
  const yearlyGroups = useMemo(() => {
    const map = new Map<string, ConcertPost[]>();

    posts.forEach((post) => {
      const parsed = parseConcertDate(post.concert_date, post.created_at);
      const yearKey = parsed.year || "2026";
      if (!map.has(yearKey)) {
        map.set(yearKey, []);
      }
      map.get(yearKey)!.push(post);
    });

    const sortedYears = Array.from(map.keys()).sort((a, b) => b.localeCompare(a));

    return sortedYears.map((year) => ({
      year,
      items: map.get(year)!,
    }));
  }, [posts]);

  // 등록된 고유 연도 목록 (2026, 2025...)
  const availableYears = useMemo(() => {
    return yearlyGroups.map((g) => g.year);
  }, [yearlyGroups]);

  // 선택된 탭에 따라 필터링된 연도 그룹 목록
  const displayedGroups = useMemo(() => {
    if (selectedYear === "ALL") return yearlyGroups;
    return yearlyGroups.filter((g) => g.year === selectedYear);
  }, [yearlyGroups, selectedYear]);

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
        .seoulphil-card {
          cursor: pointer;
          transition: transform 0.25s ease;
        }
        .seoulphil-card:hover .poster-img {
          transform: scale(1.04);
        }
        .seoulphil-card:hover .card-title {
          color: #1B7A63 !important;
        }

        .year-tab-btn {
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .year-tab-btn:not(.active):hover {
          background-color: #F4F6F5 !important;
          color: #1B7A63 !important;
          border-color: #1B7A63 !important;
          transform: translateY(-1px);
        }
        .year-tab-btn:active {
          transform: translateY(0);
        }

        .year-section-row {
          display: grid;
          grid-template-columns: 68px minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }

        .year-col-left {
          position: sticky;
          top: 100px;
        }

        .year-anchor-title {
          font-family: 'Playfair Display', 'Cinzel', Pretendard, serif;
          font-size: 32px;
          font-weight: 800;
          color: #05261D;
          letter-spacing: -0.5px;
          margin: 0;
          line-height: 1.1;
          white-space: nowrap;
        }

        .seoulphil-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          column-gap: 22px;
          row-gap: 48px;
        }

        @media (max-width: 1200px) {
          .seoulphil-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            column-gap: 20px !important;
          }
        }

        @media (max-width: 960px) {
          .year-section-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .year-col-left {
            position: static !important;
          }
          .year-anchor-title {
            font-size: 28px !important;
          }
        }

        @media (max-width: 768px) {
          .seoulphil-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            column-gap: 16px !important;
            row-gap: 36px !important;
          }
        }

        @media (max-width: 440px) {
          .seoulphil-grid {
            grid-template-columns: 1fr !important;
            row-gap: 32px !important;
          }
        }
      `}</style>

      {/* ─── Page Header (메인 페이지 시그니처와 100% 통일) ─── */}
      <section
        style={{
          paddingTop: 135,
          paddingBottom: 44,
          paddingLeft: 24,
          paddingRight: 24,
          textAlign: "center",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* Section Subtitle with Green Lines */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div style={{ width: 32, height: 2, backgroundColor: "#1B7A63" }} />
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#1B7A63",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              CONCERT SCHEDULE
            </span>
            <div style={{ width: 32, height: 2, backgroundColor: "#1B7A63" }} />
          </div>

          {/* Clean Single Title: 공연 일정 */}
          <h1
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.8px",
              lineHeight: 1.35,
              marginBottom: 12,
              color: "#05261D",
            }}
          >
            공연 일정
          </h1>

          <p
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: "clamp(14.5px, 1.6vw, 16px)",
              color: "#636e72",
              lineHeight: 1.65,
              fontWeight: 400,
              maxWidth: 520,
              margin: "0 auto",
              wordBreak: "keep-all",
            }}
          >
            부디 앙상블의 공식 정기연주회와 특별 기획 무대를 만나보세요.
          </p>
        </div>
      </section>

      {/* ─── Main Content (비대칭 2열 포스터 그리드) ─── */}
      <main
        style={{
          flex: 1,
          maxWidth: 1260,
          width: "100%",
          margin: "0 auto",
          padding: "40px 24px 100px",
        }}
      >
        {/* ─── Year Tabs (연도별 알약형 탭 필터) ─── */}
        {!loading && !error && posts.length > 0 && availableYears.length > 0 && (
          <nav
            aria-label="공연 연도 필터"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 44,
              flexWrap: "wrap",
            }}
          >
            {/* 전체 탭 */}
            <button
              type="button"
              onClick={() => setSelectedYear("ALL")}
              className={`year-tab-btn ${selectedYear === "ALL" ? "active" : ""}`}
              style={{
                fontFamily: "Pretendard, sans-serif",
                padding: "8px 22px",
                borderRadius: 9999,
                fontSize: 14.5,
                fontWeight: 600,
                border: selectedYear === "ALL" ? "none" : "1px solid rgba(0, 0, 0, 0.1)",
                backgroundColor: selectedYear === "ALL" ? "#05261D" : "#FFFFFF",
                color: selectedYear === "ALL" ? "#FFFFFF" : "#636e72",
                boxShadow:
                  selectedYear === "ALL"
                    ? "0 4px 12px rgba(5, 38, 29, 0.18)"
                    : "0 1px 3px rgba(0, 0, 0, 0.04)",
              }}
            >
              전체
            </button>

            {/* 개별 연도 탭 */}
            {availableYears.map((year) => {
              const isActive = selectedYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`year-tab-btn ${isActive ? "active" : ""}`}
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    padding: "8px 22px",
                    borderRadius: 9999,
                    fontSize: 14.5,
                    fontWeight: 600,
                    border: isActive ? "none" : "1px solid rgba(0, 0, 0, 0.1)",
                    backgroundColor: isActive ? "#05261D" : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : "#636e72",
                    boxShadow: isActive
                      ? "0 4px 12px rgba(5, 38, 29, 0.18)"
                      : "0 1px 3px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {year}년
                </button>
              );
            })}
          </nav>
        )}
        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <Loader2
              className="animate-spin"
              size={36}
              color="#1B7A63"
              style={{ margin: "0 auto 16px" }}
            />
            <p style={{ color: "#636e72", fontSize: 15, fontWeight: 500 }}>
              공연 일정을 불러오는 중입니다...
            </p>
          </div>
        ) : error ? (
          <div
            style={{
              textAlign: "center",
              padding: "70px 24px",
              backgroundColor: "#F7FAF9",
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.06)",
              maxWidth: 500,
              margin: "40px auto",
            }}
          >
            <p style={{ color: "#d63031", fontSize: 16, marginBottom: 16, fontWeight: 500 }}>
              {error}
            </p>
            <button
              onClick={loadPosts}
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
              다시 시도
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "90px 24px",
              borderRadius: 20,
              backgroundColor: "#F7FAF9",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              maxWidth: 560,
              margin: "40px auto",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#EBF5F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
                color: "#1B7A63",
              }}
            >
              <Music2 size={28} />
            </div>
            <h3
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 19,
                color: "#05261D",
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              예정된 공식 공연 일정을 준비 중입니다
            </h3>
            <p
              style={{
                color: "#636e72",
                fontSize: 14.5,
                lineHeight: 1.65,
                wordBreak: "keep-all",
                maxWidth: 400,
                margin: "0 auto",
              }}
            >
              부디 앙상블의 새로운 연주 소식이 확정되는 대로 이곳에 가장 먼저 안내해 드리겠습니다.
            </p>
          </div>
        ) : (
          /* ─── Yearly Sections ─── */
          <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
            {displayedGroups.map((group) => (
              <section key={group.year} className="year-section-row">
                {/* 좌측 열: 2026 연도 앵커 (컨테이너 좌측 정렬 유지) */}
                <div className="year-col-left">
                  <div
                    style={{
                      height: 46,
                      display: "flex",
                      alignItems: "flex-end",
                      paddingBottom: 8,
                      boxSizing: "border-box",
                    }}
                  >
                    <h2 className="year-anchor-title">
                      {group.year}
                    </h2>
                  </div>
                </div>

                {/* 우측 열: 검은줄 + 포스터 4열 그리드 (우측으로 살짝 밀린 형태) */}
                <div style={{ minWidth: 0 }}>
                  {/* 검은 구분선 - 우측 컬럼 상단에만 밀려서 위치 */}
                  <div
                    style={{
                      borderBottom: "2px solid #05261D",
                      marginBottom: 28,
                      height: 46,
                      boxSizing: "border-box",
                    }}
                  />

                  {/* Seoul Phil Style: 4-Column Frameless Poster Grid */}
                  <div className="seoulphil-grid">
                  {group.items.map((post) => {
                    const dateInfo = parseConcertDate(post.concert_date, post.created_at);

                    return (
                      <article
                        key={post.id}
                        className="seoulphil-card"
                        onClick={() => navigate(`/board/${post.id}`)}
                      >
                        {/* ─── 1. Poster Container (1:1.414 Standard Ratio) ─── */}
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "141.4%", // 1:1.414 A-시리즈 포스터 비율
                            borderRadius: 10,
                            overflow: "hidden",
                            backgroundColor: "#F4F6F5",
                            border: "1px solid rgba(0, 0, 0, 0.08)",
                            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
                            marginBottom: 16,
                          }}
                        >
                          {post.poster_url ? (
                            <img
                              src={post.poster_url}
                              alt={post.title}
                              loading="lazy"
                              className="poster-img"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
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
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "rgba(27, 122, 99, 0.35)",
                                gap: 8,
                              }}
                            >
                              <Music2 size={36} />
                              <span style={{ fontSize: 12, color: "#8395a7", fontWeight: 500 }}>
                                Budi Ensemble
                              </span>
                            </div>
                          )}
                        </div>

                        {/* ─── 2. Concert Title (Pretendard Bold, 2-line clamp) ─── */}
                        <h3
                          className="card-title"
                          style={{
                            fontFamily: "Pretendard, sans-serif",
                            fontSize: "clamp(21px, 1.4vw, 25px)",
                            fontWeight: 800,
                            lineHeight: 1.32,
                            color: "#05261D",
                            letterSpacing: "-0.5px",
                            margin: "0 0 5px 0",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            transition: "color 0.2s ease",
                          }}
                        >
                          {post.title}
                        </h3>

                        {/* ─── 3. Venue (공연 장소) ─── */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 13.5,
                            color: "#636e72",
                            marginBottom: 4,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <MapPin size={14} style={{ color: "#1B7A63", flexShrink: 0 }} />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {post.venue}
                          </span>
                        </div>

                        {/* ─── 4. Date & Time (공연 일시) ─── */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 13,
                            color: "#1B7A63",
                            fontWeight: 600,
                            letterSpacing: "-0.2px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Calendar size={14} style={{ flexShrink: 0 }} />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {dateInfo.formatted}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>
        )}
      </main>

      {/* ─── Footer (메인 페이지와 동일) ─── */}
      <Footer />
    </div>
  );
}
