import { Music } from "lucide-react";

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920";

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "0 8%",
        overflow: "hidden",
      }}
    >
      {/* Black Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(10, 10, 10, 0.94) 0%, rgba(10, 10, 10, 0.88) 35%, rgba(10, 10, 10, 0.45) 75%, rgba(10, 10, 10, 0.25) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Main Content Area */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 800,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          color: "#FFFFFF",
          marginTop: 40,
        }}
      >
        {/* Subtitle / Category */}
        <span
          style={{
            fontFamily: "Pretendard, -apple-system, sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.8)",
            letterSpacing: "8px",
            textTransform: "uppercase",
            marginBottom: 16,
            paddingLeft: 4,
          }}
        >
          PIANO & STRINGS ENSEMBLE
        </span>

        {/* Thin Gold/White line */}
        <div
          style={{
            width: "100%",
            maxWidth: 360,
            height: 1,
            background: "linear-gradient(to right, rgba(242, 175, 41, 0.6) 0%, rgba(255, 255, 255, 0.1) 100%)",
            marginBottom: 36,
          }}
        />

        {/* Main Brand Name */}
        <h2
          style={{
            fontFamily: "'Playfair Display', 'Cinzel', 'Noto Serif KR', serif",
            fontWeight: 800,
            fontSize: "clamp(46px, 6vw, 80px)",
            color: "#FFFFFF",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
            marginBottom: 24,
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          Budi Ensemble
        </h2>

        {/* Main copy */}
        <h1
          style={{
            fontFamily: "'Noto Serif KR', 'Pretendard', serif",
            fontWeight: 400,
            fontSize: "clamp(24px, 3vw, 38px)",
            color: "rgba(255, 255, 255, 0.95)",
            lineHeight: 1.55,
            letterSpacing: "-0.8px",
            marginBottom: 36,
            wordBreak: "keep-all",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          부디, 선율로 채워진 <br />아름다운 이야기이기를

        </h1>
        {/* 뒷 배경으로는 연주하고 있는 사진*/}

        {/* Bottom Sub-info */}
        <span
          style={{
            fontFamily: "'Noto Serif KR', 'Pretendard', serif",
            fontWeight: 500,
            fontSize: 16,
            color: "#F2AF29",
            letterSpacing: "4px",
            opacity: 0.95,
          }}
        >
          피아노 & 현악 앙상블
        </span>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: 0.6,
          cursor: "pointer",
          transition: "opacity 0.2s",
        }}
        onClick={() => {
          const about = document.getElementById("about");
          if (about) about.scrollIntoView({ behavior: "smooth" });
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.95")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
      >
        <span style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#FFFFFF" }}>Scroll</span>
        <div
          style={{
            width: 1,
            height: 40,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "40%",
              backgroundColor: "#F2AF29",
              animation: "scrollDown 2s infinite ease-in-out",
            }}
          />
        </div>
        <style>{`
          @keyframes scrollDown {
            0% { top: -40%; }
            50% { top: 100%; }
            100% { top: 100%; }
          }
        `}</style>
      </div>
    </section>
  );
}
