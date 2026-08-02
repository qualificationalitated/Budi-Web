import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Music,
  Users,
  Compass,
  DollarSign,
  FileText,
  Send,
  RefreshCw,
  Calendar,
  Award,
  ArrowRight,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";

// 질문 단계 구조 정의
interface Step {
  id: number;
  title: string;
  subtitle: string;
  field: "purpose" | "scale" | "mood" | "size";
  options: {
    value: string;
    label: string;
    desc: string;
    icon: React.ReactNode;
  }[];
}

export function GrillMePage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    purpose: "",
    scale: "",
    mood: "",
    size: "",
    additional: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 단계별 질문 세팅
  const steps: Step[] = [
    {
      id: 1,
      title: "어떤 성격의 공연을 계획하시나요?",
      subtitle: "행사의 성격에 가장 잘 어울리는 맞춤형 사운드 디자인을 제안해 드립니다.",
      field: "purpose",
      options: [
        {
          value: "corporate",
          label: "기업 행사 / 리셉션",
          desc: "품격 있는 만찬, 시상식, 런칭 파티 등을 위한 고급스러운 배경 및 메인 공연",
          icon: <Award size={24} className="text-amber-500" />,
        },
        {
          value: "concert",
          label: "콘서트 / 기획 연주",
          desc: "해설이 있는 음악회, 기획 독창/독주회 등 무대 몰입감이 중심이 되는 정식 공연",
          icon: <Music size={24} className="text-emerald-600" />,
        },
        {
          value: "wedding",
          label: "웨딩 / 갈라 파티",
          desc: "인생의 가장 특별한 순간을 찬란하고 우아하게 빛내 줄 세리머니 음악",
          icon: <Calendar size={24} className="text-pink-500" />,
        },
        {
          value: "private",
          label: "사적인 살롱 파티 / 소모임",
          desc: "소규모 갤러리, 하우스 콘서트, 아늑한 친목 모임을 위한 따뜻한 라이브 연주",
          icon: <Users size={24} className="text-sky-500" />,
        },
      ],
    },
    {
      id: 2,
      title: "관객의 규모와 공연 장소는 어디인가요?",
      subtitle: "공간의 물리적 특성과 음향 반사율을 고려하여 알맞은 구성을 선별합니다.",
      field: "scale",
      options: [
        {
          value: "small",
          label: "소형 공간 (30명 이하)",
          desc: "카페, 북카페, 개인 살롱 등 마이크 없이도 온전한 울림을 전할 수 있는 아늑한 공간",
          icon: <Users size={20} className="text-emerald-600" />,
        },
        {
          value: "medium",
          label: "중형 아트홀 (30 ~ 150명)",
          desc: "호텔 세미나실, 소극장, 레스토랑 등 풍부한 어쿠스틱 음향이 최적으로 울리는 홀",
          icon: <Compass size={20} className="text-amber-500" />,
        },
        {
          value: "large",
          label: "대형 무대 / 야외 (150명 이상)",
          desc: "대극장, 야외 광장, 대학교 강당 등 음향 장비 보강 및 대규모 편성이 추천되는 환경",
          icon: <Sparkles size={20} className="text-indigo-500" />,
        },
      ],
    },
    {
      id: 3,
      title: "원하시는 음악의 분위기는 무엇인가요?",
      subtitle: "클래식을 기반으로 다양한 스펙트럼의 큐레이션을 제공합니다.",
      field: "mood",
      options: [
        {
          value: "classic",
          label: "정통 클래식",
          desc: "모차르트, 바흐 등 엄선된 정통 악곡으로 구성하여 우아하고 격식 높은 분위기 연출",
          icon: <Award size={20} className="text-amber-600" />,
        },
        {
          value: "ost",
          label: "영화 음악 / OST",
          desc: "지브리, 디즈니, 영화 라라랜드 등의 테마곡을 클래식하게 편곡하여 친근감 극대화",
          icon: <Music size={20} className="text-pink-600" />,
        },
        {
          value: "jazz",
          label: "재즈 & 탱고",
          desc: "피아졸라의 정열적인 탱고, 부드러운 스윙 재즈를 융합하여 감각적이고 이색적인 무드",
          icon: <Compass size={20} className="text-sky-600" />,
        },
        {
          value: "crossover",
          label: "대중가요 / 팝 크로스오버",
          desc: "Coldplay, 아이유 등 시대를 아우르는 인기 곡들을 화려한 현악 선율로 편곡",
          icon: <Sparkles size={20} className="text-indigo-600" />,
        },
      ],
    },
    {
      id: 4,
      title: "생각하시는 예산 또는 편성 규모는 어떻게 되나요?",
      subtitle: "프로젝트 성격과 예산 설계에 맞추어 연주자의 편성을 매칭해 드립니다.",
      field: "size",
      options: [
        {
          value: "compact",
          label: "컴팩트 앙상블 (2 ~ 3인조)",
          desc: "피아노 3중주(바이올린, 첼로, 피아노) 등 가성비와 꽉 찬 사운드를 동시에 챙기는 실속 구성",
          icon: <Users size={20} className="text-emerald-600" />,
        },
        {
          value: "quartet",
          label: "현악 4중주 (4인조)",
          desc: "바이올린 I & II, 비올라, 첼로 구성으로 클래식 실내악의 정석이자 완벽한 밸런스를 선사",
          icon: <Award size={20} className="text-indigo-600" />,
        },
        {
          value: "premium",
          label: "프리미엄 콰인텟 (5 ~ 6인조)",
          desc: "현악 4중주에 피아노, 퍼커션, 혹은 보컬을 추가하여 무대의 화려함과 장르 소화력을 고도화",
          icon: <Sparkles size={20} className="text-amber-500" />,
        },
        {
          value: "orchestra",
          label: "체임버 오케스트라 (10인조 이상)",
          desc: "현악 합주단과 목관 악기 구성으로 웅장하고 압도적인 감동의 사운드를 설계",
          icon: <Music size={20} className="text-red-500" />,
        },
      ],
    },
  ];

  const handleSelect = (field: "purpose" | "scale" | "mood" | "size", value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({
      purpose: "",
      scale: "",
      mood: "",
      size: "",
      additional: "",
    });
    setIsSubmitted(false);
  };

  // 사용자가 선택한 결과를 기반으로 동적인 추천 데이터 도출
  const getRecommendation = () => {
    const { purpose, mood, size } = answers;

    // Default 추천 구성
    let ensembleName = "부디 클래식 현악 4중주 (Classic Quartet)";
    let instruments = ["바이올린 I", "바이올린 II", "비올라", "첼로"];
    let description = "어떤 무대에서나 조화롭고 완벽한 소리의 조화를 전해주는 정통 클래식 악기 구성입니다. 가장 대중적이면서도 품격 있는 소리를 구현합니다.";
    let playlist = [
      { title: "사랑의 인사 (Salut d'Amour)", composer: "E. Elgar", reason: "관객의 마음을 부드럽게 열어주는 화사하고 감미로운 오프닝 곡" },
      { title: "미뉴에트 (Minuet)", composer: "L. v. Beethoven", reason: "우아하고 규칙적인 리듬감으로 무대의 격조를 한껏 끌어올리는 악곡" },
      { title: "인생의 회전목마 (하울의 움직이는 성 OST)", composer: "Hisaishi Joe", reason: "대중적이면서 아련한 현악의 울림으로 큰 몰입감을 불러일으키는 클라이맥스곡" },
    ];
    let estimatedCost = "120만원 ~ 180만원대 (연주 시간 및 연주자 프로필 기준 편차 존재)";

    // 조건별 맞춤 매핑
    if (size === "compact" || (size === "" && mood === "classic")) {
      ensembleName = "부디 피아노 트리오 (Piano Trio)";
      instruments = ["바이올린", "첼로", "피아노"];
      description = "현악기의 서정성과 피아노의 풍부한 화성이 어우러져, 소규모 홀이나 카페/리셉션 장소에서 최상의 가성비와 따뜻함을 들려주는 구성입니다.";
      playlist = [
        { title: "시네마 천국 메들리 (Cinema Paradiso)", composer: "E. Morricone", reason: "피아노와 첼로의 서정성이 가장 돋보이는 낭만적인 편곡" },
        { title: "피아노 삼중주 제1번 2악장", composer: "F. Mendelssohn", reason: "평온함과 우아함의 정점을 보여주는 앙상블" },
        { title: "Over The Rainbow", composer: "H. Arlen", reason: "누구나 알 수 있는 멜로디에 부드러운 하모니를 얹은 명곡" },
      ];
      estimatedCost = "80만원 ~ 120만원대";
    }

    if (mood === "jazz") {
      ensembleName = "부디 재즈 & 크로스오버 퀸텟 (Jazz & Cross Quin-tet)";
      instruments = ["바이올린", "첼로", "피아노", "콘트라베이스 / 아코디언", "퍼커션 (선택)"];
      description = "정열적인 탱고 리듬이나 감각적인 재즈 코드를 클래식 터치로 풀어냅니다. 리듬 파트가 추가되어 한층 더 리드미컬하고 다채로운 무대 장악력을 보여줍니다.";
      playlist = [
        { title: "리베르탱고 (Libertango)", composer: "A. Piazzolla", reason: "폭발적인 리듬과 바이올린의 날카로운 선율로 현장 분위기를 뜨겁게 고조" },
        { title: "Fly Me to the Moon", composer: "B. Howard", reason: "가을밤 혹은 칵테일 파티에 어울리는 감미로운 스윙 재즈" },
        { title: "Por una Cabeza (영화 '여인의 향기' OST)", composer: "C. Gardel", reason: "대중에게 잘 알려진 애절하고 세련된 탱고의 대명사" },
      ];
      estimatedCost = "150만원 ~ 220만원대";
    }

    if (mood === "crossover") {
      ensembleName = "부디 팝 & 크로스오버 스트링즈 (Crossover Strings)";
      instruments = ["바이올린 I", "바이올린 II", "비올라", "첼로", "피아노 / 신디사이저"];
      description = "콜드플레이, 아이유 등 전 세대를 아우르는 명곡들을 화려한 클래식 사운드로 재해석합니다. 젊고 에너제틱하며 트렌디한 기업 행사와 리셉션에 강력 추천합니다.";
      playlist = [
        { title: "Viva La Vida", composer: "Coldplay", reason: "루프 스테이션 느낌의 현악 리프가 터져 나오며 관객의 박수와 호응을 이끌어냄" },
        { title: "밤편지", composer: "아이유", reason: "서정적이고 따뜻한 한국적 감성을 현악 4중주 편곡으로 감동적으로 전달" },
        { title: "Another Day of Sun (라라랜드 OST)", composer: "J. Hurwitz", reason: "톡톡 튀는 활기와 설렘으로 행사의 밝은 기운을 돋우는 엔딩곡" },
      ];
      estimatedCost = "140만원 ~ 190만원대";
    }

    if (size === "orchestra" || (purpose === "concert" && size === "premium")) {
      ensembleName = "부디 체임버 오케스트라 (Chamber Orchestra)";
      instruments = ["바이올린 파트 (4-6명)", "비올라 파트 (2명)", "첼로 파트 (2명)", "더블베이스 (1명)", "목관악기 (플루트/클라리넷 선택)"];
      description = "대강당 또는 중대형 콘서트홀에 적합한 웅장하고 깊이 있는 구성입니다. 음압과 울림이 풍부하며 격조 높은 공식 기념식이나 클래식 메인 콘서트에 어울립니다.";
      playlist = [
        { title: "현을 위한 세레나데 (Serenade for Strings)", composer: "P. I. Tchaikovsky", reason: "오케스트라 현악의 화려하고 압도적인 질감을 극대화해 보여주는 오프닝" },
        { title: "가브리엘의 오보에 (Gabriel's Oboe)", composer: "E. Morricone", reason: "목관 독주 악기와 현악 오케스트라가 빚어내는 천상의 하모니" },
        { title: "캐리비안의 해적 메들리 (He's a Pirate)", composer: "Hans Zimmer", reason: "모든 악기가 하나되어 몰아치는 가슴 벅찬 엔딩" },
      ];
      estimatedCost = "300만원 ~ 500만원대 이상 (인원 편성 규모별 상이)";
    }

    return { ensembleName, instruments, description, playlist, estimatedCost };
  };

  const rec = getRecommendation();

  // 결과 생성 시 팡파레 효과 터뜨리기
  useEffect(() => {
    if (step === 5) {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // confetti 터치
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);

    // 임시 1.5초 딜레이 후 성공 처리 (추후 데이터베이스 저장 연동 예정)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const currentField = steps[step - 1]?.field;
  const isSelected = currentField ? !!answers[currentField] : false;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #05261D 0%, #0A4030 40%, #153E35 100%)",
        padding: "120px 24px 80px",
        color: "#FFFFFF",
        fontFamily: "Pretendard, sans-serif"
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(242, 175, 41, 0.15)",
            border: "1px solid rgba(242, 175, 41, 0.3)",
            padding: "6px 16px",
            borderRadius: 20,
            marginBottom: 16
          }}>
            <Sparkles size={16} color="#F2AF29" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#F2AF29", letterSpacing: "1px" }}>
              BUDI ARTIFICIAL INTELLIGENCE
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-1px", color: "#FFFFFF" }}>
            AI 공연 기획 & 큐레이터
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255, 255, 255, 0.7)", marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
            단 몇 번의 선택만으로 장소, 장르, 분위기에 알맞는 부디 앙상블의 최적 악기 편성과 오리지널 추천 플레이리스트를 즉석 설계합니다.
          </p>
        </div>

        {/* Progress bar (step 1 to 4, 5 is result) */}
        {step < 5 && (
          <div style={{ maxWidth: 600, margin: "0 auto 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              <span>기획 진행도</span>
              <span>{step} / 4단계</span>
            </div>
            <div style={{ width: "100%", height: 6, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
              <div
                style={{
                  width: `${(step / 4) * 100}%`,
                  height: "100%",
                  backgroundColor: "#F2AF29",
                  borderRadius: 3,
                  transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              />
            </div>
          </div>
        )}

        {/* Main interactive panel */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: 24,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "clamp(24px, 5vw, 48px)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Step 1 ~ 4 Question layout */}
          {step < 5 ? (
            <div className="transition-all duration-300 transform">
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, marginBottom: 12, color: "#FFFFFF" }}>
                {steps[step - 1].title}
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 36 }}>
                {steps[step - 1].subtitle}
              </p>

              {/* Grid Options */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 20,
                  marginBottom: 40
                }}
              >
                {steps[step - 1].options.map((option) => {
                  const isCurrentSelected = answers[steps[step - 1].field] === option.value;
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(steps[step - 1].field, option.value)}
                      style={{
                        backgroundColor: isCurrentSelected ? "rgba(27, 122, 99, 0.3)" : "rgba(255, 255, 255, 0.03)",
                        border: isCurrentSelected ? "2px solid #F2AF29" : "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 16,
                        padding: "24px",
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                        boxShadow: isCurrentSelected ? "0 8px 24px rgba(242, 175, 41, 0.15)" : "none",
                        transform: isCurrentSelected ? "scale(1.02)" : "scale(1)"
                      }}
                      onMouseEnter={(e) => {
                        if (!isCurrentSelected) {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
                          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrentSelected) {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.1)";
                        }
                      }}
                    >
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        backgroundColor: isCurrentSelected ? "#F2AF29" : "rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: isCurrentSelected ? "#05261D" : "inherit",
                        transition: "all 0.2s"
                      }}>
                        {option.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: isCurrentSelected ? "#F2AF29" : "#FFFFFF" }}>
                          {option.label}
                        </div>
                        <div style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.5 }}>
                          {option.desc}
                        </div>
                      </div>
                      {isCurrentSelected && (
                        <div style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: "#F2AF29",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          alignSelf: "center"
                        }}>
                          <Check size={12} color="#05261D" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation button panel */}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 30 }}>
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: step === 1 ? "rgba(255,255,255,0.3)" : "#FFFFFF",
                    padding: "12px 24px",
                    borderRadius: 10,
                    cursor: step === 1 ? "not-allowed" : "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    if (step !== 1) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (step !== 1) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <ChevronLeft size={16} />
                  이전 단계
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isSelected}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: isSelected ? "#F2AF29" : "rgba(255,255,255,0.1)",
                    border: "none",
                    color: isSelected ? "#05261D" : "rgba(255,255,255,0.4)",
                    padding: "12px 28px",
                    borderRadius: 10,
                    cursor: isSelected ? "pointer" : "not-allowed",
                    fontSize: 14,
                    fontWeight: 700,
                    transition: "all 0.2s",
                    boxShadow: isSelected ? "0 4px 16px rgba(242, 175, 41, 0.3)" : "none"
                  }}
                  onMouseEnter={(e) => {
                    if (isSelected) e.currentTarget.style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    if (isSelected) e.currentTarget.style.opacity = "1";
                  }}
                >
                  {step === 4 ? "큐레이션 분석" : "다음 단계"}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (

            /* Step 5: Beautiful Results Report Panel */
            <div>
              {/* Reset button upper right */}
              <button
                onClick={handleReset}
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#FFFFFF",
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"}
              >
                <RefreshCw size={12} />
                다시 설계하기
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#F2AF29" }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#F2AF29", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                  AI Curation Proposal Report
                </span>
              </div>

              {/* Grid 2 Columns for detailed content and estimation */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.6fr 1fr",
                  gap: 32,
                  alignItems: "start"
                }}
                className="about-grid"
              >
                {/* Result Left: Recommended Ensemble & Playlist */}
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  <div>
                    <h3 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 800, color: "#FFFFFF", marginBottom: 12 }}>
                      {rec.ensembleName}
                    </h3>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 20 }}>
                      {rec.description}
                    </p>

                    {/* Instruments badge list */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {rec.instruments.map((ins, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            backgroundColor: "rgba(27, 122, 99, 0.4)",
                            border: "1px solid rgba(27, 122, 99, 0.7)",
                            color: "#CCEDE6",
                            padding: "6px 14px",
                            borderRadius: 20
                          }}
                        >
                          {ins}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Curated Playlist Section */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#F2AF29", display: "flex", alignItems: "center", gap: 8 }}>
                      <Music size={18} />
                      추천 연주 프로그램 (대표 곡 큐레이션)
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {rec.playlist.map((play, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            borderRadius: 12,
                            padding: "16px 20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 4
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                            <span style={{ fontWeight: 700, fontSize: 15, color: "#FFFFFF" }}>{idx + 1}. {play.title}</span>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>{play.composer}</span>
                          </div>
                          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
                            {play.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Result Right: Cost Estimation & Send inquiry form */}
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20,
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 24
                  }}
                >
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>예상 제안가</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 4 }}>
                      <DollarSign size={20} className="text-amber-500" />
                      <span style={{ fontSize: 22, fontWeight: 800, color: "#F2AF29" }}>{rec.estimatedCost.split(" ")[0]}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginTop: 4 }}>
                      *실제 조율 단가 및 제안서 조건에 따라 상이
                    </span>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
                    <h5 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                      <FileText size={16} color="#1B7A63" />
                      이 편성 제안으로 즉시 문의하기
                    </h5>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginBottom: 16 }}>
                      설정된 기획안(편성, 무드, 장소 등)의 응답지가 함께 담당 기획 실무팀에 접수되어 24시간 내 유선/메일 상담 피드백을 전달해 드립니다.
                    </p>

                    {isSubmitted ? (
                      <div
                        style={{
                          backgroundColor: "rgba(40, 167, 69, 0.15)",
                          border: "1px solid rgba(40, 167, 69, 0.3)",
                          color: "#85F0A4",
                          borderRadius: 10,
                          padding: "16px",
                          textAlign: "center",
                          fontSize: 13
                        }}
                      >
                        <Check size={20} className="mx-auto text-emerald-400 mb-2" style={{ margin: "0 auto 8px" }} />
                        기획 제안 문의가 정상 접수되었습니다!
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                            성함 또는 담당 부서 *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="홍길동"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                              width: "100%",
                              backgroundColor: "rgba(0,0,0,0.2)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              borderRadius: 8,
                              padding: "8px 12px",
                              color: "#FFFFFF",
                              fontSize: 13,
                              outline: "none"
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                            이메일 주소 *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="mail@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                              width: "100%",
                              backgroundColor: "rgba(0,0,0,0.2)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              borderRadius: 8,
                              padding: "8px 12px",
                              color: "#FFFFFF",
                              fontSize: 13,
                              outline: "none"
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                            연락처 (선택)
                          </label>
                          <input
                            type="tel"
                            placeholder="010-0000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              width: "100%",
                              backgroundColor: "rgba(0,0,0,0.2)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              borderRadius: 8,
                              padding: "8px 12px",
                              color: "#FFFFFF",
                              fontSize: 13,
                              outline: "none"
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                            추가 상세 요청사항
                          </label>
                          <textarea
                            rows={3}
                            placeholder="희망 날짜, 시간, 연주 원하는 특정 곡 등이 있다면 자유롭게 남겨주세요."
                            value={answers.additional}
                            onChange={(e) => setAnswers({ ...answers, additional: e.target.value })}
                            style={{
                              width: "100%",
                              backgroundColor: "rgba(0,0,0,0.2)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              borderRadius: 8,
                              padding: "8px 12px",
                              color: "#FFFFFF",
                              fontSize: 13,
                              outline: "none",
                              resize: "none"
                            }}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          style={{
                            width: "100%",
                            backgroundColor: "#F2AF29",
                            border: "none",
                            borderRadius: 8,
                            padding: "12px",
                            color: "#05261D",
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            marginTop: 8,
                            boxShadow: "0 4px 12px rgba(242,175,41,0.2)",
                            transition: "opacity 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                        >
                          {isSubmitting ? (
                            <>전송 중...</>
                          ) : (
                            <>
                              <Send size={14} />
                              제안 요약 전송하기
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Informational tip below card */}
        <div style={{
          display: "flex",
          gap: 12,
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "16px 20px",
          marginTop: 24,
          alignItems: "center"
        }}>
          <Info size={18} className="text-amber-500" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>
            부디 앙상블은 모든 프로그램의 편곡비용이 기본 제공 사항에 포함됩니다. 특별 연주를 원하는 리퀘스트 곡이 있을 경우 섭외 문의 시 추가 기재해 주시기 바랍니다.
          </p>
        </div>

      </div>
    </div>
  );
}
