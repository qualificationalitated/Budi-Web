import { useState } from "react";
import { Building2, Tv, Music4, CheckCircle2 } from "lucide-react";

const tabs = [
  { id: "corporate", label: "기업 행사", icon: <Building2 size={16} /> },
  { id: "broadcast", label: "방송 출연", icon: <Tv size={16} /> },
  { id: "concerts", label: "콘서트", icon: <Music4 size={16} /> },
];

const portfolioData: Record<
  string,
  { year: string; title: string; org: string; note?: string }[]
> = {
  corporate: [
    { year: "2024", title: "삼성전자 글로벌 리더십 포럼 갈라 디너", org: "삼성전자", note: "VIP 300석" },
    { year: "2024", title: "LG그룹 창립기념 음악회", org: "LG그룹", note: "임원 200명" },
    { year: "2023", title: "현대자동차 CES 2023 네트워킹 이벤트", org: "현대자동차", note: "라스베이거스" },
    { year: "2023", title: "SK하이닉스 경영혁신 세미나 환영 공연", org: "SK하이닉스" },
    { year: "2023", title: "롯데그룹 VIP 연회 음악 공연", org: "롯데그룹", note: "롯데호텔 서울" },
    { year: "2022", title: "카카오 뮤직 파트너십 론칭 이벤트", org: "카카오" },
    { year: "2022", title: "네이버 Tech Talk 갈라 이브닝", org: "네이버" },
    { year: "2021", title: "외교부 국빈 만찬 음악 공연", org: "대한민국 외교부", note: "청와대" },
  ],
  broadcast: [
    { year: "2024", title: "KBS 클래식 오디세이 특집 출연", org: "KBS 1TV", note: "2회 분량" },
    { year: "2024", title: "MBC 문화 다큐멘터리 '소리의 풍경'", org: "MBC", note: "전국 방영" },
    { year: "2023", title: "JTBC 드라마 OST 녹음 세션", org: "JTBC", note: "8곡 참여" },
    { year: "2023", title: "EBS 클래식 탐구 시즌 4 출연", org: "EBS", note: "10부작" },
    { year: "2023", title: "YTN 사이언스 다큐멘터리 배경음악", org: "YTN Science" },
    { year: "2022", title: "SBS 연말 특집 '오늘의 클래식'", org: "SBS", note: "생방송" },
    { year: "2022", title: "OBS 경인TV 문화 프로그램 정기 출연", org: "OBS", note: "12회 시즌" },
  ],
  concerts: [
    { year: "2024", title: "예술의전당 IBK챔버홀 정기 연주회", org: "예술의전당", note: "전석 매진" },
    { year: "2024", title: "롯데콘서트홀 '사계를 넘어' 특별 공연", org: "롯데콘서트홀" },
    { year: "2023", title: "세종문화회관 체임버홀 초청 연주", org: "세종문화회관", note: "2회 공연" },
    { year: "2023", title: "통영국제음악제 참가 연주", org: "통영국제음악제" },
    { year: "2023", title: "대전 예술의전당 순회 공연", org: "대전 예술의전당" },
    { year: "2022", title: "부산문화회관 특별 초청 공연", org: "부산문화회관" },
    { year: "2022", title: "수원SK아트리움 '봄의 소나타' 시리즈", org: "수원SK아트리움", note: "3회 공연" },
    { year: "2021", title: "광주문화재단 시민과 함께하는 클래식", org: "광주문화재단", note: "야외 공연" },
  ],
};

export function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("corporate");

  return (
    <section
      id="portfolio"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
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
              Portfolio
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
              marginBottom: 12,
            }}
          >
            주요 공연 이력
          </h2>
          <p
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#636e72",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            국내 최고의 무대에서 검증된 Budi Ensemble의 공연 이력을 확인하세요.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginBottom: 36,
            flexWrap: "wrap",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: activeTab === tab.id ? "#FFFFFF" : "#636e72",
                backgroundColor: activeTab === tab.id ? "#1B7A63" : "transparent",
                border: "1.5px solid",
                borderColor: activeTab === tab.id ? "#1B7A63" : "#CCEDE6",
                padding: "10px 24px",
                borderRadius: 100,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div
          style={{
            borderRadius: 16,
            border: "1.5px solid #E6F2F0",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(27,122,99,0.06)",
          }}
        >
          {portfolioData[activeTab].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                padding: "20px 28px",
                borderBottom:
                  idx < portfolioData[activeTab].length - 1
                    ? "1px solid #F0FAF8"
                    : "none",
                backgroundColor: "#FFFFFF",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#F8FDFB")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#FFFFFF")
              }
            >
              <CheckCircle2 size={18} color="#1B7A63" style={{ marginTop: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#2D3436",
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      color: "#95a5a6",
                    }}
                  >
                    {item.org}
                  </span>
                  {item.note && (
                    <span
                      style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontWeight: 500,
                        fontSize: 11,
                        color: "#1B7A63",
                        backgroundColor: "#E6F2F0",
                        padding: "2px 10px",
                        borderRadius: 100,
                      }}
                    >
                      {item.note}
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#F2AF29",
                  flexShrink: 0,
                  backgroundColor: "rgba(242,175,41,0.1)",
                  padding: "3px 10px",
                  borderRadius: 6,
                }}
              >
                {item.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
