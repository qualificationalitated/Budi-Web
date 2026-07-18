import { Award, Heart, Globe } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";

const pillars = [
  {
    icon: <Award size={22} color="#1B7A63" strokeWidth={2} />,
    title: "탁월한 연주력",
    desc: "국내외 정상급 음악원 출신의 연주자들이 모인 전문 앙상블로, 매 공연마다 완벽한 앙상블을 선보입니다.",
  },
  {
    icon: <Heart size={22} color="#1B7A63" strokeWidth={2} />,
    title: "감동적인 스토리텔링",
    desc: "클래식의 깊이와 현대적 감수성을 결합하여, 청중과 진정한 감동의 순간을 나눕니다.",
  },
  {
    icon: <Globe size={22} color="#1B7A63" strokeWidth={2} />,
    title: "다양한 레퍼토리",
    desc: "바로크부터 현대 창작곡까지, 행사의 성격과 분위기에 맞춰 최적의 프로그램을 제안합니다.",
  },
];

export function AboutSection() {
  return (
    <section id="about" style={{ backgroundColor: "#FFFFFF", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section label */}
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
            About Us
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: Headline */}
          <div>
            <h2
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                color: "#2D3436",
                lineHeight: 1.25,
                letterSpacing: "-0.8px",
                marginBottom: 24,
              }}
            >
              음악이 공간을 <br />
              <span style={{ color: "#1B7A63" }}>변화시키는 순간</span>
            </h2>
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 17,
                color: "#636e72",
                lineHeight: 1.85,
                marginBottom: 20,
              }}
            >
              Budi Ensemble은 최고의 클래식 음악을 통해 모든 공간을 특별한 경험의 무대로
              만드는 피아노 퀸텟입니다. 2015년 창단 이후, 기업 VIP 행사, 방송 프로그램, 국내외
              콘서트홀 등 다양한 무대에서 200회 이상의 공연을 성공적으로 이끌어 왔습니다.
            </p>
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 17,
                color: "#636e72",
                lineHeight: 1.85,
              }}
            >
              저희는 단순한 연주를 넘어, 클라이언트와의 긴밀한 소통을 통해 행사의 콘셉트와
              분위기에 완벽히 어우러지는 음악적 경험을 설계합니다. 음악이 곧 메시지가 되는
              순간을 함께 만들어 가겠습니다.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              {["기업행사", "갈라콘서트", "방송·미디어", "웨딩·연회", "프라이빗 이벤트"].map(
                (tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      color: "#1B7A63",
                      backgroundColor: "#E6F2F0",
                      padding: "6px 14px",
                      borderRadius: 100,
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: Pillars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {pillars.map((p) => (
              <div
                key={p.title}
                style={{
                  display: "flex",
                  gap: 20,
                  padding: "22px 24px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 12,
                  border: "1.5px solid #E6F2F0",
                  boxShadow: "0 2px 12px rgba(27,122,99,0.06)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: "#E6F2F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#2D3436",
                      marginBottom: 8,
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#636e72",
                      lineHeight: 1.7,
                    }}
                  >
                    {p.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Carousel — full width below the two-column content */}
        <ImageCarousel />
      </div>
    </section>
  );
}
