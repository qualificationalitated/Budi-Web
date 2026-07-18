import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1551696785-927d4ac2d35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "정기 연주회 · 예술의전당",
    credit: "Photo by Samuel Sianipar",
  },
  {
    url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "리허설 현장",
    credit: "Photo by Larisa Birta",
  },
  {
    url: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "갈라 콘서트 · 세종문화회관",
    credit: "Photo by Manuel Nägeli",
  },
  {
    url: "https://images.unsplash.com/photo-1519682718457-c82ce8296645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "기업 VIP 초청 공연",
    credit: "Photo by Manuel Nägeli",
  },
  {
    url: "https://images.unsplash.com/photo-1684784176798-aae206e325e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "스튜디오 녹음 세션",
    credit: "Photo by Lulu Wu",
  },
  {
    url: "https://images.unsplash.com/photo-1488630228244-bcdf33562a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "롯데콘서트홀 특별 공연",
    credit: "Photo by Arindam Mahanta",
  },
];

export function ImageCarousel() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 480;
  const GAP = 20;

  const scrollTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(images.length - 1, idx));
    setActive(clamped);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: clamped * (CARD_WIDTH + GAP),
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ marginTop: 60 }}>
      {/* Label row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          paddingRight: 4,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            Gallery
          </span>
        </div>

        {/* Nav arrows */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => scrollTo(active - 1)}
            disabled={active === 0}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1.5px solid",
              borderColor: active === 0 ? "#CCEDE6" : "#1B7A63",
              backgroundColor: "transparent",
              color: active === 0 ? "#CCEDE6" : "#1B7A63",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: active === 0 ? "default" : "pointer",
              transition: "all 0.2s",
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollTo(active + 1)}
            disabled={active === images.length - 1}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1.5px solid",
              borderColor: active === images.length - 1 ? "#CCEDE6" : "#1B7A63",
              backgroundColor: active === images.length - 1 ? "transparent" : "#1B7A63",
              color: active === images.length - 1 ? "#CCEDE6" : "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: active === images.length - 1 ? "default" : "pointer",
              transition: "all 0.2s",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: GAP,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: 8,
          cursor: "grab",
        }}
        onMouseDown={(e) => {
          const el = scrollRef.current;
          if (!el) return;
          const startX = e.pageX - el.offsetLeft;
          const startScroll = el.scrollLeft;
          const onMove = (me: MouseEvent) => {
            el.scrollLeft = startScroll - (me.pageX - el.offsetLeft - startX);
          };
          const onUp = () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
          };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              minWidth: CARD_WIDTH,
              height: 320,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              scrollSnapAlign: "start",
              flexShrink: 0,
              cursor: "pointer",
              outline: active === i ? "2.5px solid #F2AF29" : "none",
              outlineOffset: 2,
              transition: "outline 0.2s",
            }}
          >
            <img
              src={img.url}
              alt={img.caption}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.4s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(5,38,29,0.75) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
            />
            {/* Caption */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#FFFFFF",
                  marginBottom: 2,
                }}
              >
                {img.caption}
              </div>
            </div>
            {/* Active badge */}
            {active === i && (
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#F2AF29",
                  boxShadow: "0 0 0 3px rgba(242,175,41,0.3)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: 6, marginTop: 16, justifyContent: "center" }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            style={{
              width: active === i ? 24 : 8,
              height: 8,
              borderRadius: 100,
              backgroundColor: active === i ? "#1B7A63" : "#CCEDE6",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.25s, background-color 0.25s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
