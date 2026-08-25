import { useState } from "react";

export function AboutSection() {
  const [isImgHovered, setIsImgHovered] = useState(false);

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#F7FAF9",
        padding: "110px 24px 120px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ========================================================
            1. 섹션 헤더 (ABOUT BUDI + 메인 카피 + 댓글 후기 3종)
           ======================================================== */}
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 18,
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

          {/* 메인 카피 */}
          <h2
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.2vw, 36px)",
              color: "#05261D",
              lineHeight: 1.45,
              letterSpacing: "-0.6px",
              maxWidth: 860,
              margin: "0 auto",
              wordBreak: "keep-all",
            }}
          >
            공간의 품격을 완성하는 맞춤형 라이브, <br />
            <span style={{ color: "#1B7A63" }}>수많은 찬사로 증명된 부디 앙상블의 압도적 퀄리티</span>
          </h2>
        </div>

        {/* ========================================================
            실제 공연 후기 3종 (Social Proof)
           ======================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginBottom: 72,
          }}
          className="about-reviews-grid"
        >
          {[
            {
              category: "VIP Event",
              text: "“격조 높은 연주 덕분에 행사의 품격이 달라졌습니다. 귀빈 만족도 최고!”",
              author: "기업 VIP 행사 기획 담당자",
            },
            {
              category: "Wedding",
              text: "“신부대기실에서부터 울려 퍼지는 음악에 행복이 가득 찼어요. 지인들에게 무조건 강력 추천합니다”",
              author: "프라이빗 웨딩 신부님",
            },
            {
              category: "Festival",
              text: "“축제에서 우연히 듣고 완전 귀호강… 일상 탈출 제대로 하고 울컥할 만큼 좋았어요.”",
              author: "영평사 낙화 페스티벌 관람객",
            },
          ].map((rev, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D6ECE5",
                borderRadius: 16,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 18px rgba(10, 64, 48, 0.04)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#1B7A63",
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                      fontFamily: "Pretendard, sans-serif",
                    }}
                  >
                    {rev.category}
                  </span>
                  <span style={{ color: "#F2AF29", fontSize: 12, letterSpacing: "2px" }}>★★★★★</span>
                </div>
                <p
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#2D3436",
                    lineHeight: 1.65,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {rev.text}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "#8395a7",
                  marginTop: 16,
                  textAlign: "right",
                  display: "block",
                }}
              >
                — {rev.author}
              </span>
            </div>
          ))}
        </div>

        {/* ========================================================
            2. 에디토리얼 스토리 & 현장 컷 (Clean 5:4 Layout)
           ======================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: 52,
            alignItems: "center",
          }}
          className="about-story-row"
        >
          {/* [좌측] 가로형 5:4 비율의 클린 원본 현장 사진 */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              aspectRatio: "5 / 4",
              backgroundColor: "#F5F5F5",
            }}
          >
            <img
              src="/images/about_budi/about_budi.webp"
              alt="부디 앙상블 라이브 현장 무대"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* [우측] 흐르는 본문 에디토리얼 줄글 */}
          <div>

            {/* 본문 상단 앵커링 라벨 */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
              }}
            >
              <span style={{ width: 20, height: 2, backgroundColor: "#1B7A63" }} />
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#1B7A63",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                }}
              >
                OUR STORY
              </span>
            </div>

            {/* Paragraph 1 */}
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(17px, 1.35vw, 18.5px)",
                color: "#2D3436",
                lineHeight: 1.9,
                letterSpacing: "-0.02em",
                wordBreak: "keep-all",
                marginBottom: 24,
              }}
            >
              정적을 깨는 첫 활의 떨림부터 무대 위에서 나누는 작은 눈빛과 미소까지, 부디 앙상블의 음악은 악보를 따라 흐르는 단순한 소리에 머물지 않습니다.
            </p>

            {/* Paragraph 2 */}
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(17px, 1.35vw, 18.5px)",
                color: "#4B5563",
                lineHeight: 1.9,
                letterSpacing: "-0.02em",
                wordBreak: "keep-all",
                marginBottom: 24,
              }}
            >
              2020년 창단 이래 <span style={{ color: "#1B7A63", fontWeight: 600, display: "inline-block", whiteSpace: "nowrap" }}>대형 페스티벌</span>부터 <span style={{ color: "#1B7A63", fontWeight: 600, display: "inline-block", whiteSpace: "nowrap" }}>프라이빗 웨딩</span>, <span style={{ color: "#1B7A63", fontWeight: 600, display: "inline-block", whiteSpace: "nowrap" }}>기업 VIP 행사</span>에 이르기까지 <strong style={{ color: "#05261D", fontWeight: 700, display: "inline-block", whiteSpace: "nowrap" }}>500여 회가 넘는 현장</strong>에서 청중과 호흡하며 공간에 꼭 맞는 이야기를 음악으로 완성해 왔습니다.
            </p>

            {/* Paragraph 3 */}
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(17px, 1.35vw, 18.5px)",
                color: "#4B5563",
                lineHeight: 1.9,
                letterSpacing: "-0.02em",
                wordBreak: "keep-all",
                marginBottom: 38,
              }}
            >
              클래식의 문턱을 낮추는 친근한 해설과 분위기를 채우는 맞춤형 선율로, <strong style={{ color: "#05261D", fontWeight: 700, display: "inline-block", whiteSpace: "nowrap" }}>6명의 전문 연주자와 작곡가</strong>가 오직 당신만을 위한 프로페셔널한 음악 경험을 선사합니다.
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
