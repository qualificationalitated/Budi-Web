import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Music2, Menu, X, Sparkles } from "lucide-react";

import { SECTION_CONFIG } from "../sectionConfig";

const navLinks = [
  { id: "about", label: "소개", href: "#about" },
  { id: "artists", label: "아티스트", href: "#artists" },
  { id: "portfolio", label: "포트폴리오", href: "#portfolio" },
  { id: "map", label: "공연 지도", href: "#map" },
].filter((link) => SECTION_CONFIG[link.id as keyof typeof SECTION_CONFIG]);

export function GNB() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const scrollContainer = document.querySelector(".scroll-container");
      const scrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      setScrolled(scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, []);

  const isDark = scrolled;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      if (location.pathname !== "/") {
        // 메인 페이지가 아니면 메인으로 이동 후 스크롤 유도 state 전달
        navigate("/", { state: { scrollTo: targetId } });
      } else {
        const element = document.getElementById(targetId);
        const scrollContainer = document.querySelector(".scroll-container");
        if (element && scrollContainer) {
          scrollContainer.classList.add("is-navigating");
          element.scrollIntoView({ behavior: "smooth" });

          const onScrollEnd = () => {
            scrollContainer.classList.remove("is-navigating");
          };

          scrollContainer.addEventListener("scrollend", onScrollEnd, { once: true });
          // Fallback
          setTimeout(onScrollEnd, 1000);
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const scrollContainer = document.querySelector(".scroll-container");
      if (scrollContainer) {
        scrollContainer.classList.add("is-navigating");
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });

        const onScrollEnd = () => {
          scrollContainer.classList.remove("is-navigating");
        };

        scrollContainer.addEventListener("scrollend", onScrollEnd, { once: true });
        setTimeout(onScrollEnd, 1000);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: isDark ? "#05261D" : "rgba(253,252,248,0.96)",
        borderBottom: `1px solid ${isDark ? "rgba(242,175,41,0.15)" : "rgba(0,0,0,0.07)"}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "background-color 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", cursor: "pointer" }}
        >
          <img
            src="/images/logo/budi_logo.webp"
            alt="Budi Ensemble Logo"
            style={{
              width: 42,
              height: 42,
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
              color: isDark ? "#FFFFFF" : "#2D3436",
              letterSpacing: "-0.3px",
              transition: "color 0.3s",
              cursor: "pointer",
            }}
          >
            Budi Ensemble
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 24 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: isDark ? "rgba(255,255,255,0.8)" : "#636e72",
                textDecoration: "none",
                transition: "color 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "#1B7A63")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color = isDark
                  ? "rgba(255,255,255,0.8)"
                  : "#636e72")
              }
            >
              {link.label}
            </a>
          ))}

          {/* 기존 섭외 문의 버튼 */}
          {SECTION_CONFIG.contact && (
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#05261D",
                backgroundColor: "#F2AF29",
                padding: "9px 20px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "opacity 0.2s",
                letterSpacing: "-0.2px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.opacity = "1")
              }
            >
              공연 섭외 문의
            </a>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: isDark ? "#FFFFFF" : "#2D3436",
            display: "none",
            padding: 4,
          }}
          className="show-mobile"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            backgroundColor: isDark ? "#05261D" : "#FFFFFF",
            padding: "16px 28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setMobileOpen(false);
                handleNavClick(e, link.href);
              }}
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 500,
                fontSize: 16,
                color: isDark ? "rgba(255,255,255,0.85)" : "#2D3436",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {link.label}
            </a>
          ))}
          {SECTION_CONFIG.contact && (
            <a
              href="#contact"
              onClick={(e) => {
                setMobileOpen(false);
                handleNavClick(e, "#contact");
              }}
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#05261D",
                backgroundColor: "#F2AF29",
                padding: "13px 20px",
                borderRadius: 8,
                textDecoration: "none",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              공연 섭외 문의
            </a>
          )}
        </div>
      )}
    </header>
  );
}
