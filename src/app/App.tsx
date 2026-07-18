import "../styles/fonts.css";
import { GNB } from "./components/GNB";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ArtistsSection } from "./components/ArtistsSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { MapSection } from "./components/MapSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

/* MARKER-MAKE-KIT-INVOKED */

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
        scrollBehavior: "smooth",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; background-color: #FFFFFF; }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background-color: #FFFFFF !important; }

        .hidden-mobile { display: flex !important; }
        .show-mobile { display: none !important; }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center !important;
          }
          .hero-grid > div:first-child {
            align-items: center !important;
          }
          .hero-grid > div:last-child {
            padding-bottom: 80px !important;
            max-width: 420px !important;
            margin: 0 auto !important;
          }
        }

        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .artists-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .map-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }

        @media (max-width: 480px) {
          .artists-grid {
            grid-template-columns: 1fr !important;
          }
        }

        input:focus, textarea:focus, select:focus {
          border-color: #1B7A63 !important;
          box-shadow: 0 0 0 3px rgba(27,122,99,0.12);
        }

        ::selection {
          background: rgba(242,175,41,0.3);
        }
      `}</style>

      <GNB />
      <HeroSection />
      <AboutSection />
      <ArtistsSection />
      <PortfolioSection />
      <MapSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
