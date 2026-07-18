import { Music2, Mail, Youtube, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: "#05261D",
        padding: "60px 24px 32px",
        borderTop: "1px solid rgba(242,175,41,0.15)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#F2AF29",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Music2 size={18} color="#05261D" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#FFFFFF",
                }}
              >
                Budi Ensemble
              </span>
            </div>
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                maxWidth: 300,
                marginBottom: 24,
              }}
            >
              피아노 퀸텟 Budi Ensemble은 클래식 음악의 깊이와 현대적 감성을 결합하여, 모든
              순간을 특별하게 만드는 전문 음악 앙상블입니다.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { icon: <Mail size={16} />, href: "mailto:booking@boodiensemble.com" },
                { icon: <Youtube size={16} />, href: "#" },
                { icon: <Instagram size={16} />, href: "#" },
                { icon: <Facebook size={16} />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "background-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      "rgba(242,175,41,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#F2AF29";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#FFFFFF",
                marginBottom: 20,
                letterSpacing: "0.5px",
              }}
            >
              바로가기
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["소개", "#about"],
                ["아티스트", "#artists"],
                ["포트폴리오", "#portfolio"],
                ["공연 지도", "#map"],
                ["문의", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLAnchorElement).style.color = "#F2AF29")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#FFFFFF",
                marginBottom: 20,
                letterSpacing: "0.5px",
              }}
            >
              연락처
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Email", value: "booking@boodiensemble.com" },
                { label: "Tel", value: "02-1234-5678" },
                { label: "Hours", value: "평일 10:00 – 18:00" },
              ].map((c) => (
                <div key={c.label}>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                      color: "#F2AF29",
                      letterSpacing: "1px",
                      marginBottom: 2,
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {c.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            © 2026 Budi Ensemble. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["개인정보처리방침", "이용약관"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
