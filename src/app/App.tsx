import { Routes, Route } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "../styles/fonts.css";
import { GNB } from "./components/GNB";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ArtistsSection } from "./components/ArtistsSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { MapSection } from "./components/MapSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { GrillMePage } from "./components/GrillMePage";
import { ImageCarousel } from "./components/ImageCarousel";
import { SECTION_CONFIG } from "./sectionConfig";

import { useEffect } from "react";
import { useLocation } from "react-router";

function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
      const element = document.getElementById(id);
      const scrollContainer = document.querySelector(".scroll-container");
      if (element && scrollContainer) {
        scrollContainer.classList.add("is-navigating");
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);

        const onScrollEnd = () => {
          scrollContainer.classList.remove("is-navigating");
        };

        scrollContainer.addEventListener("scrollend", onScrollEnd, { once: true });
        const fallbackTimer = setTimeout(onScrollEnd, 1000);

        return () => {
          clearTimeout(timer);
          clearTimeout(fallbackTimer);
          scrollContainer.removeEventListener("scrollend", onScrollEnd);
        };
      }
    }
  }, [location]);

  // 히어로 섹션과 소개 섹션 사이에서 튕기는 느낌을 강하게 주기 위한 커스텀 스크롤 휠 이벤트 처리
  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container") as HTMLDivElement;
    if (!scrollContainer) return;

    let isAnimating = false;
    let accumulatedDelta = 0;

    const handleWheel = (e: WheelEvent) => {
      const heroSection = document.querySelector(".hero-section");
      const heroHeight = heroSection ? heroSection.getBoundingClientRect().height : window.innerHeight;
      const scrollTop = scrollContainer.scrollTop;

      if (isAnimating) {
        e.preventDefault();
        return;
      }

      // 1. 히어로 섹션(최상단)에서 아래로 스크롤할 때
      if (scrollTop <= 10) {
        if (e.deltaY > 0) {
          e.preventDefault();
          accumulatedDelta += e.deltaY;

          // 일정 임계값(80)까지 버티다가 넘어가면 빠르게 다음 섹션으로 이동
          if (accumulatedDelta > 100) {
            isAnimating = true;
            accumulatedDelta = 0;

            const prevSnap = scrollContainer.style.scrollSnapType;
            scrollContainer.style.scrollSnapType = "none";

            scrollContainer.scrollTo({
              top: heroHeight,
              behavior: "smooth"
            });

            setTimeout(() => {
              scrollContainer.style.scrollSnapType = prevSnap;
              isAnimating = false;
            }, 600);
          }
        } else {
          accumulatedDelta = 0;
        }
      }
      // 2. 소개 섹션(두 번째 섹션) 시작점에서 위로 스크롤할 때
      else if (Math.abs(scrollTop - heroHeight) <= 15) {
        if (e.deltaY < 0) {
          e.preventDefault();
          accumulatedDelta += e.deltaY;

          // 일정 임계값(-80)까지 버티다가 넘어가면 빠르게 히어로 섹션으로 이동
          if (accumulatedDelta < -100) {
            isAnimating = true;
            accumulatedDelta = 0;

            const prevSnap = scrollContainer.style.scrollSnapType;
            scrollContainer.style.scrollSnapType = "none";

            scrollContainer.scrollTo({
              top: 0,
              behavior: "smooth"
            });

            setTimeout(() => {
              scrollContainer.style.scrollSnapType = prevSnap;
              isAnimating = false;
            }, 600);
          }
        } else {
          accumulatedDelta = 0;
        }
      } else {
        accumulatedDelta = 0;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  // 모바일/터치스크린 환경 등을 위한 동적 스냅 활성화 여부만 처리
  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const heroSection = document.querySelector(".hero-section");
      const heroHeight = heroSection ? heroSection.getBoundingClientRect().height : window.innerHeight;

      if (scrollContainer.scrollTop <= heroHeight + 5) {
        scrollContainer.classList.add("snap-active");
      } else {
        scrollContainer.classList.remove("snap-active");
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-container">
      {SECTION_CONFIG.hero && (
        <div className="hero-section">
          <HeroSection />
        </div>
      )}
      {SECTION_CONFIG.about && (
        <div className="about-section">
          <AboutSection />
        </div>
      )}
      {SECTION_CONFIG.gallery && (
        <div className="gallery-section">
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
            <ImageCarousel />
          </div>
        </div>
      )}
      {SECTION_CONFIG.artists && (
        <div className="artist-section">
          <ArtistsSection />
        </div>
      )}
      {SECTION_CONFIG.portfolio && (
        <div className="portfolio-section">
          <PortfolioSection />
        </div>
      )}
      {SECTION_CONFIG.map && (
        <div className="map-section">
          <MapSection />
        </div>
      )}
      {SECTION_CONFIG.contact && (
        <div className="contact-section">
          <ContactSection />
        </div>
      )}
      <Footer />
    </div>
  );
}

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

        /* 1. 전체를 감싸는 부모 컨테이너 */
        .scroll-container {
          width: 100%;
          height: 100vh;
          overflow-y: auto;
          scroll-behavior: smooth;
          scroll-snap-type: none; /* 기본 상태는 스냅 비활성화 */
        }

        /* 첫 두 화면 부근일 때만 Y축 스냅 활성화 (단, GNB 메뉴 클릭 등으로 이동 중일 때는 해제) */
        .scroll-container.snap-active:not(.is-navigating) {
          scroll-snap-type: y mandatory; 
        }

        /* 2. 첫 번째 '히어로 섹션'과 두 번째 '소개 섹션'에 스냅 고정 적용 */
        .hero-section,
        .about-section {
          width: 100%;
          scroll-snap-align: start; 
        }

        .hero-section {
          height: 100vh;
        }

        /* 3. 세 번째 섹션부터는 스냅을 해제 */
        .gallery-section,
        .artist-section,
        .portfolio-section,
        .map-section,
        .contact-section {
          width: 100%;
          height: auto; 
          scroll-snap-align: none; 
        }

        /* 4. 아티스트 그리드 반응형 (데스크톱 3x2, 태블릿/모바일 2x3, 소형 모바일 1x6) */
        @media (max-width: 768px) {
          .artists-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 480px) {
          .artists-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }

        /* 5. About 섹션 에디토리얼 반응형 그리드 규칙 */
        @media (max-width: 900px) {
          .about-gallery-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .about-sub-cut-a {
            margin-top: 0 !important;
            aspect-ratio: 16 / 9 !important;
          }
          .about-story-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-reviews-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {SECTION_CONFIG.grillMe && (
          <Route path="/grill-me" element={<><GrillMePage /><Footer /></>} />
        )}
      </Routes>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
