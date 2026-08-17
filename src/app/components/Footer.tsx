import { useState } from "react";
import { Music2, Mail, Youtube, Instagram, BookOpen } from "lucide-react";
import { SECTION_CONFIG, CONTACT_INFO } from "../sectionConfig";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";

const footerLinks = [
  { id: "about", label: "소개", href: "#about" },
  { id: "artists", label: "아티스트", href: "#artists" },
  { id: "portfolio", label: "포트폴리오", href: "#portfolio" },
  { id: "map", label: "공연 지도", href: "#map" },
  { id: "contact", label: "문의", href: "#contact" },
].filter((link) => SECTION_CONFIG[link.id as keyof typeof SECTION_CONFIG]);

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

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
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <img
                src="/images/logo/budi_logo.webp"
                alt="Budi Ensemble Logo"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Playfair Display', 'Cinzel', 'Noto Serif KR', serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#FFFFFF",
                  letterSpacing: "-0.3px",
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
              부디(Budi) 앙상블은 2020년 만들어진 전문 피아노 & 현악 앙상블로서 <br />
              듣는 모든 분들의 행복을 바라는 마음을 담아, 아름다운 이야기를 연주해 나갑니다.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { icon: <Mail size={16} />, href: `mailto:${CONTACT_INFO.email}` },
                { icon: <Youtube size={16} />, href: CONTACT_INFO.youtube },
                { icon: <Instagram size={16} />, href: CONTACT_INFO.instagram },
                { icon: <BookOpen size={16} />, href: CONTACT_INFO.blog },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
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
                  {link.label}
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
                { label: "Email", value: CONTACT_INFO.email },
                { label: "Tel", value: CONTACT_INFO.phone },
                { label: "Business Reg.", value: CONTACT_INFO.businessNumber },
                { label: "Hours", value: CONTACT_INFO.hours },
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
                      lineHeight: 1.5,
                    }}
                  >
                    {Array.isArray(c.value) ? (
                      c.value.map((v, i) => <div key={i}>{v}</div>)
                    ) : (
                      c.value
                    )}
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
            © 2026 Budi Ensemble. All rights reserved. | 사업자등록번호: {CONTACT_INFO.businessNumber}
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            <button
              onClick={() => setPrivacyOpen(true)}
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "#F2AF29")}
              onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
            >
              개인정보처리방침
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}
