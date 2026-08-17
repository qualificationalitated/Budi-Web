import { 
  Sparkles, 
  Music, 
  Award, 
  MessageSquare, 
  Building2, 
  Tv, 
  HeartHandshake, 
  Landmark, 
  Smile 
} from "lucide-react";

export function AboutSection() {
  return (
    <section 
      id="about" 
      style={{ 
        backgroundColor: "#FFFFFF", 
        padding: "100px 24px 110px",
        borderTop: "1px solid #E6F2F0"
      }}
    >
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        
        {/* ========================================================
            1. 헤드카피 & 메인 스토리 + 핵심 지표 (Top Grid)
           ======================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 60,
            alignItems: "center",
            marginBottom: 90,
          }}
          className="about-top-grid"
        >
          {/* Left: Main Story */}
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
                ABOUT BUDI ENSEMBLE
              </span>
            </div>

            <h2
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 42px)",
                color: "#2D3436",
                lineHeight: 1.3,
                letterSpacing: "-0.8px",
                marginBottom: 24,
              }}
            >
              마음을 채우는 온기, <br />
              <span style={{ color: "#1B7A63" }}>누구나 쉽게 즐기는 클래식 이야기</span>
            </h2>

            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: "#636e72",
                lineHeight: 1.85,
                marginBottom: 16,
              }}
            >
              부디 앙상블은 문화예술의 문턱을 낮추고, 음악을 통해 누군가의 삶에 따뜻한 위로와 즐거움을 전합니다.
            </p>
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: "#636e72",
                lineHeight: 1.85,
                marginBottom: 16,
              }}
            >
              2020년 창단 이래 기업 VIP 행사, 방송 및 드라마 연주, 주요 지역 페스티벌부터 위로가 필요한 사회공헌 무대까지 <strong style={{ color: "#05261D", fontWeight: 700 }}>500여 회 이상의 수많은 공연</strong>을 성공적으로 이어왔습니다.
            </p>
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: "#636e72",
                lineHeight: 1.85,
              }}
            >
              전문 연주자들의 탄탄한 연주력 위에 친근한 해설과 맞춤형 스토리텔링을 더해, 행사의 성격과 분위기에 완벽히 어우러지는 잊지 못할 순간을 선물합니다.
            </p>
          </div>

          {/* Right: Key Numbers (3 Cards) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              {
                number: "2020년~",
                label: "끊임없이 소통해온 음악 여정",
                bg: "linear-gradient(135deg, #0A4030 0%, #1B7A63 100%)",
                numColor: "#F2AF29",
                labelColor: "rgba(255,255,255,0.85)",
              },
              {
                number: "500+회",
                label: "누적 공연 및 행사 섭외 진행",
                bg: "#F9FBFA",
                border: "1.5px solid #CCEDE6",
                numColor: "#1B7A63",
                labelColor: "#2D3436",
              },
              {
                number: "100%",
                label: "행사 맞춤 선곡 & 편곡 지원",
                bg: "#F9FBFA",
                border: "1.5px solid #CCEDE6",
                numColor: "#1B7A63",
                labelColor: "#2D3436",
              },
            ].map((k, idx) => (
              <div
                key={idx}
                style={{
                  background: k.bg,
                  border: k.border || "none",
                  borderRadius: 16,
                  padding: "24px 28px",
                  boxShadow: k.border ? "0 4px 16px rgba(27,122,99,0.04)" : "0 8px 24px rgba(10,64,48,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 800,
                      fontSize: 32,
                      color: k.numColor,
                      letterSpacing: "-0.5px",
                      marginBottom: 2,
                    }}
                  >
                    {k.number}
                  </div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: k.labelColor,
                    }}
                  >
                    {k.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            2. 핵심 강점 (Why Budi Ensemble - 4 Cards Grid)
           ======================================================== */}
        <div style={{ marginBottom: 90 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#E6F2F0", padding: "6px 14px", borderRadius: 100, marginBottom: 12 }}>
              <Sparkles size={14} color="#1B7A63" />
              <span style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 700, fontSize: 12, color: "#1B7A63", letterSpacing: "1px" }}>
                WHY BUDI ENSEMBLE
              </span>
            </div>
            <h3
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 34px)",
                color: "#2D3436",
                letterSpacing: "-0.5px",
              }}
            >
              부디 앙상블만의 4가지 핵심 강점
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
            }}
            className="why-budi-grid"
          >
            {[
              {
                icon: <Smile size={24} color="#1B7A63" />,
                num: "01",
                title: "따뜻한 온기와 친근한 해설이 있는 연주",
                desc: "어려운 클래식이 아닌, 청중과 눈을 맞추며 이야기하듯 풀어냅니다. 포근하고 따뜻한 음색과 친절한 해설로 남녀노소 누구나 몰입할 수 있는 시간을 만듭니다.",
              },
              {
                icon: <Music size={24} color="#1B7A63" />,
                num: "02",
                title: "1:1 완벽 맞춤 선곡 & 인하우스 편곡",
                desc: "행사의 성격, 연령대, 분위기에 맞춘 디테일한 추천 및 맞춤 선곡을 제공합니다. 필요시 인하우스 악보 편곡 및 챔버 오케스트라급 구성 확장까지 '불가능을 가능하게' 구현합니다.",
              },
              {
                icon: <Award size={24} color="#1B7A63" />,
                num: "03",
                title: "500여 회 무대로 검증된 압도적 프로페셔널",
                desc: "오랜 단체 활동과 풍부한 경력을 지닌 베테랑 연주자들로 구성되어 있습니다. 기업 VIP 행사부터 예식, 방송 연주까지 어떤 현장에서도 기복 없는 최상의 연주를 선보입니다.",
              },
              {
                icon: <MessageSquare size={24} color="#1B7A63" />,
                num: "04",
                title: "답답함 없는 신속하고 명확한 커뮤니케이션",
                desc: "행사 기획자의 마음을 잘 알기에, 문의 시 빠르게 답변드리고 섭외부터 연주 당일까지 세심하게 소통하여 준비 과정을 완벽하게 케어해 드립니다.",
              },
            ].map((strength) => (
              <div
                key={strength.num}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #CCEDE6",
                  borderRadius: 18,
                  padding: "32px 28px",
                  boxShadow: "0 4px 20px rgba(10,64,48,0.04)",
                  transition: "transform 0.3s, boxShadow 0.3s",
                }}
                className="why-card"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      backgroundColor: "#E6F2F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {strength.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 800,
                      fontSize: 18,
                      color: "#CCEDE6",
                    }}
                  >
                    {strength.num}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#05261D",
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}
                >
                  {strength.title}
                </h4>
                <p
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#636e72",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {strength.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            3. 주요 연주 분야 (Target Services - 5 Categories)
           ======================================================== */}
        <div>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#1B7A63",
                letterSpacing: "2px",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              TARGET SERVICES
            </span>
            <h3
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 34px)",
                color: "#2D3436",
                letterSpacing: "-0.5px",
              }}
            >
              주요 연주 & 섭외 분야
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
            className="services-grid"
          >
            {[
              {
                icon: <Building2 size={20} color="#1B7A63" />,
                category: "기업 VIP & 브랜드 행사",
                desc: "브랜드의 품격을 높이는 고품격 앙상블 연주",
                example: "삼성중공업 VIP 행사 등",
              },
              {
                icon: <Tv size={20} color="#1B7A63" />,
                category: "방송 & 축제·페스티벌",
                desc: "대중성과 감동을 동시에 잡는 대표 무대 연주",
                example: "드라마 '신사와 아가씨', 안동 하회탈 축제, 낙화축제 등",
              },
              {
                icon: <HeartHandshake size={20} color="#1B7A63" />,
                category: "웨딩 & 프라이빗 이벤트",
                desc: "두 사람만의 이야기를 담은 감동적인 맞춤 예식 연주",
                example: "호텔 예식, 하우스 웨딩, 소규모 단독 연회 등",
              },
              {
                icon: <Landmark size={20} color="#1B7A63" />,
                category: "공공기관 & 지자체",
                desc: "기획 의도와 행사 주제에 완벽히 부합하는 맞춤형 연주",
                example: "지자체 공식 기념식, 문화가 있는 날 공연 등",
              },
              {
                icon: <Smile size={20} color="#1B7A63" />,
                category: "사회공헌 & 종교 연주",
                desc: "실버센터, 보육원, 군부대, 사찰 및 교회 등 위로와 희망을 전하는 연주",
                example: "찾아가는 음악회, 사회공헌 재능기부 연주 등",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#F9FBFA",
                  border: "1px solid #E6F2F0",
                  borderRadius: 14,
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  gridColumn: idx === 3 ? "span 1" : undefined,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: "#E6F2F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {service.icon}
                  </div>
                  <h4
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#05261D",
                      margin: 0,
                    }}
                  >
                    {service.category}
                  </h4>
                </div>

                <p
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "#2D3436",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {service.desc}
                </p>

                <div
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "#1B7A63",
                    backgroundColor: "#E6F2F0",
                    padding: "4px 10px",
                    borderRadius: 6,
                    alignSelf: "flex-start",
                    marginTop: "auto",
                  }}
                >
                  ex) {service.example}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
