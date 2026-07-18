import { Music } from "lucide-react";

const artists = [
  {
    name: "이수연",
    nameEn: "Suyeon Lee",
    instrument: "피아노 · 작곡",
    instrumentEn: "Piano & Composer",
    role: "앙상블 리더",
    color: "#0A4030",
    initials: "이",
  },
  {
    name: "김민준",
    nameEn: "Minjun Kim",
    instrument: "바이올린 I",
    instrumentEn: "Violin I",
    role: "수석 바이올리니스트",
    color: "#1B7A63",
    initials: "김",
  },
  {
    name: "박지원",
    nameEn: "Jiwon Park",
    instrument: "바이올린 II",
    instrumentEn: "Violin II",
    role: "바이올리니스트",
    color: "#155e4a",
    initials: "박",
  },
  {
    name: "최아름",
    nameEn: "Areum Choi",
    instrument: "비올라",
    instrumentEn: "Viola",
    role: "비올리스트",
    color: "#0d4f3c",
    initials: "최",
  },
  {
    name: "정우성",
    nameEn: "Woosung Jung",
    instrument: "첼로",
    instrumentEn: "Cello",
    role: "첼리스트",
    color: "#1a6b54",
    initials: "정",
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
            5인의 전문 연주자
          </h2>
          <p
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#636e72",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            국내외 최정상 음악 교육기관 출신의 다섯 연주자가 하나의 앙상블로 완벽한 하모니를
            만들어냅니다.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 20,
          }}
          className="artists-grid"
        >
          {artists.map((artist) => (
            <div
              key={artist.name}
              style={{
                backgroundColor: "#E6F2F0",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #CCEDE6",
                transition: "transform 0.25s, box-shadow 0.25s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 16px 40px rgba(10,64,48,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Photo placeholder */}
              <div
                style={{
                  height: 200,
                  backgroundColor: artist.color,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Pattern overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%)",
                  }}
                />
                {/* Avatar */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    border: "2px solid rgba(242,175,41,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 700,
                      fontSize: 28,
                      color: "#F2AF29",
                    }}
                  >
                    {artist.initials}
                  </span>
                </div>
                {/* Role badge */}
                <div
                  style={{
                    backgroundColor: "rgba(242,175,41,0.2)",
                    border: "1px solid rgba(242,175,41,0.4)",
                    borderRadius: 100,
                    padding: "3px 10px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 500,
                      fontSize: 11,
                      color: "#F2AF29",
                    }}
                  >
                    {artist.role}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "18px 20px 20px" }}>
                <div
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
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
                    marginBottom: 10,
                  }}
                >
                  {artist.nameEn}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Music size={13} color="#1B7A63" />
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      color: "#1B7A63",
                    }}
                  >
                    {artist.instrument}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
