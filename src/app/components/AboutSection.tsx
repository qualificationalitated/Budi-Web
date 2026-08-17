import { useState } from "react";

export function AboutSection() {
  const [isImgHovered, setIsImgHovered] = useState(false);

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "110px 24px 120px",
        borderTop: "1px solid #E6F2F0",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* ========================================================
            1. 섹션 헤더 (ABOUT BUDI + 감성 영문 필기체 Blurb)
           ======================================================== */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
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
              ABOUT BUDI
            </span>
            <div style={{ width: 32, height: 2, backgroundColor: "#1B7A63" }} />
          </div>

          {/* 감성 영문 Blurb 한 줄 */}
          <p
            style={{
              fontFamily: "Pretendard, -apple-system, sans-serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(18px, 2.2vw, 24px)",
              color: "#64748B",
              letterSpacing: "0.2px",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            “Where warm melodies breathe life into every shared moment on stage.”
          </p>
        </div>

        {/* ========================================================
            2. 에디토리얼 스토리 & 현장 컷 (2-Column Editorial Layout)
           ======================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.95fr 1.05fr",
            gap: 60,
            alignItems: "center",
          }}
          className="about-story-row"
        >
          {/* [좌측] 현장 사진 & 감성 인용구 */}
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: 18,
                overflow: "hidden",
                aspectRatio: "4 / 3",
                boxShadow: "0 16px 40px rgba(5, 38, 29, 0.09)",
                cursor: "default",
                marginBottom: 20,
                backgroundColor: "#F5F5F5",
              }}
              onMouseEnter={() => setIsImgHovered(true)}
              onMouseLeave={() => setIsImgHovered(false)}
            >
              <img
                src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?crop=entropy&cs=tinysrgb&fit=crop&h=700&w=900"
                alt="부디 앙상블 라이브 현장 무대"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transform: isImgHovered ? "scale(1.03)" : "scale(1)",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(5, 38, 29, 0.85) 0%, transparent 60%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "26px 26px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      color: "#F2AF29",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    LIVE ON STAGE
                  </span>
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      color: "#FFFFFF",
                    }}
                  >
                    관객의 환호와 온기가 하나 되는 무대
                  </span>
                </div>
              </div>
            </div>

            {/* Quote 밑단 서브 캡션 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "0 8px" }}>
              <span style={{ width: 24, height: 1, backgroundColor: "#CBD5E1" }} />
              <p
                style={{
                  fontFamily: "Nanum Myeongjo, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: 14.5,
                  color: "#374151",
                  textAlign: "center",
                  margin: 0,
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                }}
              >
                “음악은 관객의 숨소리와 마주할 때 비로소 완성됩니다.”
              </p>
              <span style={{ width: 24, height: 1, backgroundColor: "#CBD5E1" }} />
            </div>
          </div>

          {/* [우측] 흐르는 본문 에디토리얼 줄글 */}
          <div style={{ paddingLeft: "8px" }}>
            
            {/* 본문 상단 앵커링 라벨 */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
              }}
            >
              <span style={{ width: 20, height: 1.5, backgroundColor: "#1B7A63" }} />
              <span
                style={{
                  fontFamily: "Nanum Myeongjo, serif",
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#1B7A63",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                }}
              >
                OUR STORY
              </span>
            </div>

            {/* Paragraph 1 with Drop Cap (정) */}
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 16.5,
                color: "#2D3436",
                lineHeight: 1.95,
                letterSpacing: "-0.02em",
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  float: "left",
                  fontFamily: "Nanum Myeongjo, serif",
                  fontSize: 52,
                  lineHeight: "44px",
                  paddingTop: 4,
                  paddingRight: 12,
                  paddingBottom: 2,
                  fontWeight: 700,
                  color: "#1B7A63",
                  display: "block",
                }}
              >
                정
              </span>
              적을 깨는 첫 활의 떨림부터, 무대 위에서 연주자들이 나누는 작은 눈빛과 미소까지.
              부디 앙상블의 연주는 단순히 악보를 읽는 시간에 그치지 않습니다.
            </p>

            {/* Paragraph 2 */}
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 16.5,
                color: "#4B5563",
                lineHeight: 1.95,
                letterSpacing: "-0.02em",
                marginBottom: 22,
              }}
            >
              2020년 첫 걸음을 뗀 이래, 웅장한 대형 페스티벌 무대부터 온기가 필요한 소박한 공간에 이르기까지 <strong style={{ color: "#05261D", fontWeight: 700 }}>500여 회가 넘는 현장</strong>에서 우리는 무대 위 순간을 만끽하고 청중과 함께 호흡했습니다.
            </p>

            {/* Paragraph 3 */}
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 16.5,
                color: "#4B5563",
                lineHeight: 1.95,
                letterSpacing: "-0.02em",
                marginBottom: 36,
              }}
            >
              엄숙한 클래식의 문턱을 넘어 눈을 맞추며 나누는 친근한 해설, 공간의 분위기를 고조시키는 맞춤형 울림. 연주자와 청중의 마음이 만나는 그 따뜻한 순간이야말로 부디 앙상블이 이어가는 진정한 음악 여정입니다.
            </p>

            {/* [Minimal Inline Stats] 매거진 인라인 스탯 3종 */}
            <div
              style={{
                borderTop: "1px solid #E6F2F0",
                paddingTop: 24,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
              }}
            >
              {[
                { value: "2020", label: "Founded Year" },
                { value: "500+", label: "Live Concerts" },
                { value: "100%", label: "Custom Music" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 800,
                      fontSize: 24,
                      color: "#1B7A63",
                      letterSpacing: "-0.5px",
                      marginBottom: 2,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                      color: "#8395a7",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
