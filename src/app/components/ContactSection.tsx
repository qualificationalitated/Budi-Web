import { Mail, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";
import { CONTACT_INFO } from "../sectionConfig";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    eventType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "100px 24px",
        borderTop: "1px solid #E6F2F0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
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
              Contact
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
            공연 섭외 문의
          </h2>
          <p
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#636e72",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            행사 규모, 장르, 예산에 관계없이 먼저 문의해 주세요. 맞춤형 제안을 드립니다.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 48,
            alignItems: "stretch",
          }}
          className="contact-grid"
        >
          {/* Left: Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                icon: <Mail size={20} color="#1B7A63" />,
                label: "이메일",
                value: CONTACT_INFO.email,
              },
              {
                icon: <Phone size={20} color="#1B7A63" />,
                label: "전화",
                value: CONTACT_INFO.phone,
              },
              {
                icon: <Clock size={20} color="#1B7A63" />,
                label: "상담 시간",
                value: CONTACT_INFO.hours,
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: 18,
                  padding: "24px 26px",
                  backgroundColor: "#F9FBFA",
                  borderRadius: 16,
                  border: "1.5px solid #CCEDE6",
                  boxShadow: "0 4px 16px rgba(27,122,99,0.03)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: "#E6F2F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid #CCEDE6",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#1B7A63",
                      marginBottom: 4,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#05261D",
                      letterSpacing: "-0.3px",
                      lineHeight: 1.4,
                    }}
                  >
                    {Array.isArray(item.value) ? (
                      item.value.map((v, i) => <div key={i}>{v}</div>)
                    ) : (
                      item.value
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick response badge */}
            <div
              style={{
                padding: "16px 20px",
                background: "linear-gradient(135deg, #0A4030, #1B7A63)",
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#F2AF29",
                  marginBottom: 4,
                }}
              >
                24h
              </div>
              <div
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                이내 답변 보장
              </div>
            </div>
          </div>

          {/* Right: KakaoTalk Open Chat Consult Banner */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #CCEDE6",
              borderRadius: 20,
              padding: "28px 32px",
              boxShadow: "0 10px 30px rgba(10,64,48,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Title Block */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "rgba(254, 229, 0, 0.15)",
                  borderRadius: 8,
                  padding: "4px 10px",
                  marginBottom: 14,
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#E5A900">
                  <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.923 1.956 5.492 4.904 6.78l-1.026 3.766c-.105.385.344.682.68.458l4.498-2.999c.307.032.62.051.944.051 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                </svg>
                <span
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    color: "#A37800",
                    letterSpacing: "0.5px",
                  }}
                >
                  실시간 카카오톡 상담
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#2D3436",
                  marginBottom: 4,
                }}
              >
                1:1 오픈채팅 섭외 문의
              </h3>
            </div>

            {/* Steps Section */}
            <div
              style={{
                backgroundColor: "#F9FBFA",
                border: "1px solid #E6F2F0",
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {[
                { 
                  step: "01", 
                  text: (
                    <span>
                      아래 <strong>'카카오톡 실시간 상담하기'</strong> 버튼 클릭
                    </span>
                  ) 
                },
                { 
                  step: "02", 
                  text: (
                    <span>
                      부디 앙상블 <strong>1:1 오픈채팅방</strong> 입장
                    </span>
                  ) 
                },
                { 
                  step: "03", 
                  text: (
                    <span style={{ color: "#05261D" }}>
                      <strong>연주 일정, 장소, 행사 형식, 희망 악기 구성 및 연주곡</strong> 전달 <span style={{ color: "#1B7A63", fontWeight: 700, fontSize: 15 }}>(필수)</span>
                    </span>
                  ) 
                },
              ].map((s, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#1B7A63",
                      backgroundColor: "#E6F2F0",
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {s.step}
                  </span>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 500,
                      fontSize: 17,
                      color: "#2D3436",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Kakao Button */}
            <div>
              <a
                href={CONTACT_INFO.kakaoChat}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#191919",
                  backgroundColor: "#FEE500",
                  border: "none",
                  borderRadius: 10,
                  padding: "13px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  boxShadow: "0 6px 20px rgba(254,229,0,0.3)",
                  transition: "transform 0.2s, opacity 0.2s",
                  textDecoration: "none",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLAnchorElement;
                  target.style.opacity = "0.9";
                  target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLAnchorElement;
                  target.style.opacity = "1";
                  target.style.transform = "translateY(0)";
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#191919">
                  <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.923 1.956 5.492 4.904 6.78l-1.026 3.766c-.105.385.344.682.68.458l4.498-2.999c.307.032.62.051.944.051 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                </svg>
                카카오톡 실시간 상담하기
              </a>
              <p
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#95a5a6",
                  textAlign: "center",
                  marginTop: 10,
                  marginBottom: 0,
                  lineHeight: 1.4,
                }}
              >
                * 상담 시 제공해주시는 정보는 섭외 문의 및 견적 안내 목적으로만 활용됩니다.
              </p>
            </div>
          </div>

          {/* 
            [ 가려둔 기존 요청 제출용 폼 (추후 데이터베이스와 연계 예정) ]
            
            {sent ? (
              <div
                style={{
                  backgroundColor: "#E6F2F0",
                  border: "1px solid #CCEDE6",
                  borderRadius: 16,
                  padding: "60px 40px",
                  textAlign: "center",
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#28A745", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Send size={28} color="#FFFFFF" />
                </div>
                <div style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 700, fontSize: 22, color: "#2D3436", marginBottom: 12 }}>
                  문의가 접수되었습니다!
                </div>
                <div style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 400, fontSize: 15, color: "#636e72" }}>
                  24시간 이내에 담당자가 연락드릴 예정입니다. 감사합니다.
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CCEDE6",
                  borderRadius: 16,
                  padding: "36px 40px",
                  boxShadow: "0 4px 24px rgba(10,64,48,0.06)",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  {[
                    { id: "name", label: "담당자 성함 *", placeholder: "홍길동" },
                    { id: "org", label: "기관/회사명", placeholder: "OO 주식회사" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 600, fontSize: 13, color: "#2D3436", display: "block", marginBottom: 8 }}>
                        {f.label}
                      </label>
                      <input id={f.id} type="text" placeholder={f.placeholder} required={f.id === "name"} value={form[f.id as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.id]: e.target.value })} style={{ width: "100%", fontFamily: "Pretendard, sans-serif", fontSize: 14, color: "#2D3436", backgroundColor: "#F9FBFA", border: "1px solid #CCEDE6", borderRadius: 8, padding: "11px 14px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="email" style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 600, fontSize: 13, color: "#2D3436", display: "block", marginBottom: 8 }}>이메일 주소 *</label>
                  <input id="email" type="email" required placeholder="contact@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: "100%", fontFamily: "Pretendard, sans-serif", fontSize: 14, color: "#2D3436", backgroundColor: "#F9FBFA", border: "1px solid #CCEDE6", borderRadius: 8, padding: "11px 14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="eventType" style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 600, fontSize: 13, color: "#2D3436", display: "block", marginBottom: 8 }}>행사 유형</label>
                  <select id="eventType" value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} style={{ width: "100%", fontFamily: "Pretendard, sans-serif", fontSize: 14, color: form.eventType ? "#2D3436" : "#95a5a6", backgroundColor: "#F9FBFA", border: "1px solid #CCEDE6", borderRadius: 8, padding: "11px 14px", outline: "none", boxSizing: "border-box", appearance: "none" }}>
                    <option value="" disabled>선택해 주세요</option>
                    <option value="corporate">기업 행사</option>
                    <option value="concert">콘서트 / 공연</option>
                    <option value="broadcast">방송 / 미디어</option>
                    <option value="wedding">웨딩 / 연회</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label htmlFor="message" style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 600, fontSize: 13, color: "#2D3436", display: "block", marginBottom: 8 }}>문의 내용 *</label>
                  <textarea id="message" required rows={4} placeholder="행사 날짜, 장소, 예상 규모, 원하시는 레퍼토리 등을 자유롭게 적어주세요." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ width: "100%", fontFamily: "Pretendard, sans-serif", fontSize: 14, color: "#2D3436", backgroundColor: "#F9FBFA", border: "1px solid #CCEDE6", borderRadius: 8, padding: "11px 14px", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.7 }} />
                </div>
                <button type="submit" style={{ width: "100%", fontFamily: "Pretendard, sans-serif", fontWeight: 700, fontSize: 16, color: "#05261D", backgroundColor: "#F2AF29", border: "none", borderRadius: 8, padding: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 16px rgba(242,175,41,0.3)", transition: "opacity 0.2s, transform 0.2s" }}>
                  <Send size={18} />
                  문의 보내기
                </button>
              </form>
            )}
          */}
        </div>
      </div>
    </section>
  );
}
