import { Music } from "lucide-react";

const artists = [
  {
    name: "이수연",
    nameEn: "Suyeon Lee",
    instrument: "피아노 · 작곡",
    role: "앙상블 리더",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?crop=entropy&cs=tinysrgb&fit=crop&h=400&w=400",
    bio: "독일 뮌헨 국립음대 최고연주자과정 졸업. 섬세한 터치와 따뜻한 감성으로 앙상블의 음악적 깊이를 이끄는 리더입니다.",
  },
  {
    name: "김민준",
    nameEn: "Minjun Kim",
    instrument: "바이올린 I",
    role: "수석 바이올리니스트",
    image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ee?crop=entropy&cs=tinysrgb&fit=crop&h=400&w=400",
    bio: "오스트리아 모차르테움 국립음대 최우수 졸업. 화려한 테크닉과 호소력 짙은 음색을 자랑하는 바이올리니스트입니다.",
  },
  {
    name: "박지원",
    nameEn: "Jiwon Park",
    instrument: "바이올린 II",
    role: "바이올리니스트",
    image: "https://images.unsplash.com/photo-1548504769-900b70ed122e?crop=entropy&cs=tinysrgb&fit=crop&h=400&w=400",
    bio: "서울대학교 음악대학 졸업. 견고한 하모니와 명징한 호흡을 바탕으로 현악 선율 간의 이상적인 대위법적 조화를 구현합니다.",
  },
  {
    name: "최아름",
    nameEn: "Areum Choi",
    instrument: "비올라",
    role: "비올리스트",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=tinysrgb&fit=crop&h=400&w=400",
    bio: "한국예술종합학교 전문사 졸업. 중후하고 아늑한 특유의 따스한 울림으로 앙상블의 허리를 단단하게 채워줍니다.",
  },
  {
    name: "정우성",
    nameEn: "Woosung Jung",
    instrument: "첼로",
    role: "첼리스트",
    image: "https://images.unsplash.com/photo-1580974511812-4b7196c56830?crop=entropy&cs=tinysrgb&fit=crop&h=400&w=400",
    bio: "미국 피바디 음악대학 석사 졸업. 묵직하고 흔들림 없는 타격감과 풍부한 보잉으로 앙상블의 든든한 초석을 쌓습니다.",
  },
];

export function ArtistsSection() {
  return (
    <section
      id="artists"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "100px 24px",
        borderTop: "1px solid #E6F2F0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 16,
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
              Our Artists
            </span>
            <div style={{ width: 32, height: 2, backgroundColor: "#1B7A63" }} />
          </div>
          <h2
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.5vw, 40px)",
              color: "#2D3436",
              letterSpacing: "-0.6px",
              marginBottom: 16,
            }}
          >
            5인의 전문 연주자
          </h2>
          <p
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#636e72",
              maxWidth: 550,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            국내외 최정상 음악 교육기관 출신의 다섯 명의 솔리스트들이 부디 앙상블로 만나, 각 악기의 고유한 매력을 살려 하나의 완전한 울림을 빚어냅니다.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
          }}
          className="artists-grid"
        >
          {artists.map((artist) => (
            <div
              key={artist.name}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid #CCEDE6",
                boxShadow: "0 4px 20px rgba(10,64,48,0.04)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "default",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "translateY(-8px)";
                target.style.boxShadow = "0 20px 40px rgba(10,64,48,0.12)";
                target.style.borderColor = "#1B7A63";
                const img = target.querySelector("img");
                if (img) img.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "0 4px 20px rgba(10,64,48,0.04)";
                target.style.borderColor = "#CCEDE6";
                const img = target.querySelector("img");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Photo Area */}
              <div
                style={{
                  height: 220,
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "#E6F2F0",
                }}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
                
                {/* Role badge overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    backgroundColor: "rgba(5, 38, 29, 0.8)",
                    backdropFilter: "blur(4px)",
                    borderRadius: 8,
                    padding: "4px 10px",
                    border: "1px solid rgba(242,175,41,0.3)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                      color: "#F2AF29",
                    }}
                  >
                    {artist.role}
                  </span>
                </div>
              </div>

              {/* Info & Bio Area */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#2D3436",
                    marginBottom: 2,
                  }}
                >
                  {artist.name}
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#95a5a6",
                    marginBottom: 12,
                  }}
                >
                  {artist.nameEn}
                </div>
                
                {/* Instrument badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 14,
                  }}
                >
                  <Music size={14} color="#1B7A63" />
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#1B7A63",
                    }}
                  >
                    {artist.instrument}
                  </span>
                </div>

                {/* Biography description */}
                <p
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "#636e72",
                    lineHeight: 1.6,
                    marginTop: "auto",
                    borderTop: "1px solid #F0F5F4",
                    paddingTop: 12,
                  }}
                >
                  {artist.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
