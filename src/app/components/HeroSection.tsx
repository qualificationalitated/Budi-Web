import { ArrowRight, Play } from "lucide-react";

const MAIN_PHOTO =
  "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const SECONDARY_PHOTO =
  "https://images.unsplash.com/photo-1519412666065-94acb3f8838f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        backgroundColor: "#FDFCF8",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 75% 50%, rgba(27,122,99,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* Top-left accent dot cluster */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 60,
          width: 180,
          height: 180,
          backgroundImage: "radial-gradient(circle, #CCEDE6 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          position: "relative",
        }}
        className="hero-grid"
      >
        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#E6F2F0",
              border: "1px solid #CCEDE6",
              borderRadius: 100,
              padding: "7px 16px",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#1B7A63",
              }}
            />
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 600,
                fontSize: 12,
                color: "#1B7A63",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Piano Quintet · 피아노 5중주
            </span>
          </div>

          {/* Serif Headline */}
          <h1
            style={{
              fontFamily: "'Noto Serif KR', 'Pretendard', serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 3.8vw, 52px)",
              color: "#2D3436",
              lineHeight: 1.35,
              letterSpacing: "-1px",
              marginBottom: 24,
              wordBreak: "keep-all",
            }}
          >
            부디, 당신의 간절함이<br />
            이루어지기를.
          </h1>

          {/* Accent line */}
          <div
            style={{
              width: 48,
              height: 3,
              backgroundColor: "#F2AF29",
              borderRadius: 2,
              marginBottom: 24,
            }}
          />

          {/* Sub-headline */}
          <p
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.5vw, 17px)",
              color: "#636e72",
              lineHeight: 1.8,
              marginBottom: 20,
              wordBreak: "keep-all",
            }}
          >
            간절한 마음을 담아 위로를 전하는 피아노 5중주,
            <br />
            <strong style={{ fontWeight: 600, color: "#2D3436" }}>Budi Ensemble</strong>
          </p>

          {/* Stats line */}
          <p
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: "#1B7A63",
              lineHeight: 1.7,
              marginBottom: 40,
              wordBreak: "keep-all",
            }}
          >
            전국 200회 이상의 무대에서 관객들과 깊은 공명을 나누었습니다.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="#contact"
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#05261D",
                backgroundColor: "#F2AF29",
                padding: "14px 32px",
                borderRadius: 10,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 6px 24px rgba(242,175,41,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 10px 32px rgba(242,175,41,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 6px 24px rgba(242,175,41,0.35)";
              }}
            >
              공연 섭외 문의
              <ArrowRight size={16} />
            </a>
            <a
              href="#portfolio"
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#2D3436",
                backgroundColor: "transparent",
                border: "1.5px solid #CCEDE6",
                padding: "14px 28px",
                borderRadius: 10,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1B7A63";
                (e.currentTarget as HTMLAnchorElement).style.color = "#1B7A63";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#CCEDE6";
                (e.currentTarget as HTMLAnchorElement).style.color = "#2D3436";
              }}
            >
              <Play size={14} fill="#1B7A63" color="#1B7A63" />
              공연 이력 보기
            </a>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 52,
              paddingTop: 32,
              borderTop: "1px solid #E6F2F0",
              width: "100%",
            }}
          >
            {[
              { num: "200+", label: "전국 공연" },
              { num: "50+", label: "기업 파트너" },
              { num: "15+", label: "방송 출연" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 800,
                    fontSize: 26,
                    color: "#1B7A63",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#95a5a6",
                    marginTop: 5,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN — Floating Frame Gallery ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            /* Reserve height so the overlapping secondary frame doesn't clip */
            paddingBottom: 60,
            paddingLeft: 20,
          }}
        >
          {/* Decorative ring behind main frame */}
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: "90%",
              aspectRatio: "3/4",
              border: "1.5px dashed #CCEDE6",
              borderRadius: 28,
              zIndex: 0,
            }}
          />

          {/* ── Main Frame ── */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 480,
              aspectRatio: "3/4",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow:
                "0 20px 60px rgba(10,64,48,0.18), 0 8px 24px rgba(10,64,48,0.10)",
              border: "4px solid #FFFFFF",
            }}
          >
            <img
              src={MAIN_PHOTO}
              alt="Budi Ensemble 공연 사진"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Subtle inner vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.0) 55%, rgba(5,38,29,0.35) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Ensemble label at bottom of main frame */}
            <div
              style={{
                position: "absolute",
                bottom: 22,
                left: 22,
                right: 22,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "rgba(253,252,248,0.92)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 10,
                  padding: "10px 16px",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#F2AF29",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#2D3436",
                  }}
                >
                  Budi Ensemble — 정기 연주회
                </span>
              </div>
            </div>
          </div>

          {/* ── Secondary Frame (collage overlap) ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 2,
              width: "48%",
              aspectRatio: "4/3",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow:
                "0 12px 40px rgba(10,64,48,0.22), 0 4px 12px rgba(10,64,48,0.12)",
              border: "3px solid #FFFFFF",
            }}
          >
            <img
              src={SECONDARY_PHOTO}
              alt="Budi Ensemble 무대"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* ── Floating badge on secondary frame ── */}
          <div
            style={{
              position: "absolute",
              bottom: "calc(0% + 9px)",
              left: "calc(48% - 12px)",
              zIndex: 3,
              backgroundColor: "#1B7A63",
              borderRadius: 12,
              padding: "10px 14px",
              boxShadow: "0 4px 16px rgba(10,64,48,0.3)",
              border: "2px solid #FFFFFF",
            }}
          >
            <div
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 800,
                fontSize: 17,
                color: "#F2AF29",
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              2015
            </div>
            <div
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 500,
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
                marginTop: 3,
                letterSpacing: "0.5px",
              }}
            >
              창단
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
