import { Music } from "lucide-react";

const artists = [
  {
    name: "정호진",
    nameEn: "Hojin Jung",
    instrument: "바이올린",
    instrumentEn: "VIOLIN",
    role: "바이올리니스트",
    image: "/images/artist_profile/hojin.webp",
    bio: "경북대학교 음악학과 바이올린 전공",
  },
  {
    name: "정선민",
    nameEn: "Seonmin Jeong",
    instrument: "바이올린",
    instrumentEn: "VIOLIN",
    role: "바이올리니스트",
    image: "/images/artist_profile/seonmin.webp",
    bio: "경북대학교 음악학과 바이올린 전공",
  },
  {
    name: "양수연",
    nameEn: "Suyeon Yang",
    instrument: "비올라",
    instrumentEn: "VIOLA",
    role: "비올리스트",
    image: "/images/artist_profile/suyeon.webp",
    bio: "경북대학교 음악학과 비올라 전공",
  },
  {
    name: "김혜준",
    nameEn: "Hyejun Kim",
    instrument: "첼로",
    instrumentEn: "CELLO",
    role: "첼리스트",
    image: "/images/artist_profile/hyejun.webp",
    bio: "경북대학교 음악학과 첼로 전공",
  },
  {
    name: "정세인",
    nameEn: "Sein Jung",
    instrument: "피아노",
    instrumentEn: "PIANO",
    role: "피아니스트",
    image: "/images/artist_profile/sein.webp",
    bio: "계명대학교 음악공연예술대학 피아노 전공",
  },
  {
    name: "이수정",
    nameEn: "Sujeong Lee",
    instrument: "작곡",
    instrumentEn: "COMPOSER",
    role: "작곡가",
    image: "/images/artist_profile/sujeong.webp",
    bio: "경북대학교 음악학과 작곡 전공",
  },
];

export function ArtistsSection() {
  return (
    <section
      id="artists"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "110px 24px 120px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            부디 앙상블 아티스트
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
            6명의 전문 아티스트들이 어우러져 깊고 아름다운 선율을 빚어냅니다.
          </p>
        </div>

        {/* Cards Grid: 3인 2줄 배치 */}
        <div
          className="artists-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {artists.map((artist) => (
            <div
              key={artist.name}
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: "3 / 4",
                backgroundColor: "#F5F5F5",
                borderRadius: 14,
                boxShadow: "0 4px 20px rgba(5,38,29,0.08)",
                border: "none",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "translateY(-6px)";
                target.style.boxShadow = "0 18px 36px rgba(5,38,29,0.18)";
                const overlay = target.querySelector(".artist-overlay") as HTMLDivElement;
                if (overlay) overlay.style.opacity = "1";
                const img = target.querySelector("img") as HTMLImageElement;
                if (img) img.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "0 4px 20px rgba(5,38,29,0.08)";
                const overlay = target.querySelector(".artist-overlay") as HTMLDivElement;
                if (overlay) overlay.style.opacity = "0";
                const img = target.querySelector("img") as HTMLImageElement;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Photo */}
              <img
                src={artist.image}
                alt={artist.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
              />

              {/* 하단 정보 바 (좌측: 영문 악기 배지 / 우측: 한글 & 영문 이름) */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "64px 22px 20px",
                  background: "linear-gradient(to top, rgba(5, 38, 29, 0.95) 0%, rgba(5, 38, 29, 0.76) 25%, rgba(5, 38, 29, 0.44) 50%, rgba(5, 38, 29, 0.15) 75%, transparent 100%)",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 12,
                  zIndex: 2,
                }}
              >
                {/* 좌측: 영문 악기 배지 */}
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 12px",
                      backgroundColor: "rgba(255, 255, 255, 0.14)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.28)",
                      borderRadius: 100,
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontWeight: 700,
                        fontSize: 11,
                        color: "#FFFFFF",
                        letterSpacing: "1.4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {artist.instrumentEn}
                    </span>
                  </div>
                </div>

                {/* 우측: 한글 및 영문 이름 */}
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 700,
                      fontSize: 29,
                      color: "#FFFFFF",
                      lineHeight: 1.15,
                      textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                    }}
                  >
                    {artist.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      color: "rgba(255,255,255,0.88)",
                      marginTop: 4,
                      letterSpacing: "0.3px",
                    }}
                  >
                    {artist.nameEn}
                  </div>
                </div>
              </div>

              {/* 호버 오버레이 */}
              <div
                className="artist-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(27,122,99,0.12)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 1,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
