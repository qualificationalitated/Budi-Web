import { MapPin, ArrowRight } from "lucide-react";

const regions = [
  { name: "서울", count: 120, x: "54%", y: "38%" },
  { name: "부산", count: 32, x: "68%", y: "72%" },
  { name: "대구", count: 18, x: "65%", y: "60%" },
  { name: "인천", count: 22, x: "50%", y: "36%" },
  { name: "광주", count: 14, x: "42%", y: "65%" },
  { name: "대전", count: 16, x: "56%", y: "53%" },
];

export function MapSection() {
  return (
    <section
      id="map"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "100px 24px",
        borderTop: "1px solid #E6F2F0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
          className="map-grid"
        >
          {/* Left: Text */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 2, backgroundColor: "#1B7A63" }} />
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#1B7A63",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Boodi Map
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 3.5vw, 40px)",
                color: "#2D3436",
                letterSpacing: "-0.6px",
                lineHeight: 1.25,
                marginBottom: 20,
              }}
            >전국 어디서든 <br /><span style={{ color: "#1B7A63" }}>Budi와 함께</span></h2>
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: "#636e72",
                lineHeight: 1.8,
                marginBottom: 32,
              }}
            >
              서울부터 제주까지, Boodi Ensemble은 대한민국 전역에서 활발히 활동하고 있습니다.
              'Budi Map'을 통해 우리가 함께한 공연 현장들을 한눈에 확인하세요.
            </p>

            {/* Region stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 36,
              }}
            >
              {regions.map((r) => (
                <div
                  key={r.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    backgroundColor: "#E6F2F0",
                    borderRadius: 8,
                    border: "1px solid #CCEDE6",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MapPin size={14} color="#1B7A63" />
                    <span
                      style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#2D3436",
                      }}
                    >
                      {r.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#1B7A63",
                    }}
                  >
                    {r.count}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#FFFFFF",
                backgroundColor: "#1B7A63",
                padding: "13px 28px",
                borderRadius: 8,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0A4030")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1B7A63")
              }
            >
              지역 공연 문의하기
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: Map graphic */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                backgroundColor: "#E6F2F0",
                borderRadius: 20,
                border: "1px solid #CCEDE6",
                aspectRatio: "3/4",
                maxHeight: 480,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(10,64,48,0.10)",
              }}
            >
              {/* Korea map silhouette — stylized SVG */}
              <svg
                viewBox="0 0 300 400"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
              >
                <path
                  d="M130,30 C120,40 100,50 90,70 C80,90 85,110 80,130 C75,150 60,165 55,185 C50,205 60,225 65,245 C70,265 65,280 70,295 C75,310 85,320 90,335 C95,350 92,365 100,375 C108,385 120,388 130,382 C140,376 148,365 155,352 C162,339 165,325 172,315 C179,305 190,300 195,288 C200,276 196,262 198,250 C200,238 208,228 210,215 C212,202 206,190 205,177 C204,164 210,152 208,140 C206,128 196,120 192,108 C188,96 190,82 183,72 C176,62 162,58 152,48 C142,38 140,20 130,30 Z"
                  fill="#1B7A63"
                />
              </svg>

              {/* Dotted grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle, #CCEDE6 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Region pins */}
              {regions.map((r) => (
                <div
                  key={r.name}
                  style={{
                    position: "absolute",
                    left: r.x,
                    top: r.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "#0A4030",
                      border: "3px solid #F2AF29",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(10,64,48,0.3)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontWeight: 700,
                        fontSize: 10,
                        color: "#FFFFFF",
                      }}
                    >
                      {r.count}
                    </span>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      color: "#2D3436",
                      marginTop: 4,
                    }}
                  >
                    {r.name}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  border: "1px solid #CCEDE6",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    color: "#2D3436",
                    marginBottom: 4,
                  }}
                >
                  Boodi Map
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 400,
                    fontSize: 11,
                    color: "#636e72",
                  }}
                >
                  전국 공연 현황
                </div>
              </div>

              {/* Coming Soon badge */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  backgroundColor: "#F2AF29",
                  borderRadius: 100,
                  padding: "5px 12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    color: "#05261D",
                  }}
                >
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
