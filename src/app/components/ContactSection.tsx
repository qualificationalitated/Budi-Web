import { Mail, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";

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
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left: Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                icon: <Mail size={20} color="#1B7A63" />,
                label: "이메일",
                value: "booking@boodiensemble.com",
              },
              {
                icon: <Phone size={20} color="#1B7A63" />,
                label: "전화",
                value: "02-1234-5678",
              },
              {
                icon: <Clock size={20} color="#1B7A63" />,
                label: "상담 시간",
                value: "평일 10:00 – 18:00",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "20px 22px",
                  backgroundColor: "#E6F2F0",
                  borderRadius: 12,
                  border: "1px solid #CCEDE6",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: "#FFFFFF",
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
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#95a5a6",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#2D3436",
                    }}
                  >
                    {item.value}
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

          {/* Right: Form */}
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
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "#28A745",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <Send size={28} color="#FFFFFF" />
              </div>
              <div
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#2D3436",
                  marginBottom: 12,
                }}
              >
                문의가 접수되었습니다!
              </div>
              <div
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  color: "#636e72",
                }}
              >
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
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}
              >
                {[
                  { id: "name", label: "담당자 성함 *", placeholder: "홍길동" },
                  { id: "org", label: "기관/회사명", placeholder: "OO 주식회사" },
                ].map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#2D3436",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type="text"
                      placeholder={f.placeholder}
                      required={f.id === "name"}
                      value={form[f.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      style={{
                        width: "100%",
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: 14,
                        color: "#2D3436",
                        backgroundColor: "#F9FBFA",
                        border: "1px solid #CCEDE6",
                        borderRadius: 8,
                        padding: "11px 14px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  htmlFor="email"
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#2D3436",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  이메일 주소 *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="contact@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: "100%",
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: 14,
                    color: "#2D3436",
                    backgroundColor: "#F9FBFA",
                    border: "1px solid #CCEDE6",
                    borderRadius: 8,
                    padding: "11px 14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  htmlFor="eventType"
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#2D3436",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  행사 유형
                </label>
                <select
                  id="eventType"
                  value={form.eventType}
                  onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                  style={{
                    width: "100%",
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: 14,
                    color: form.eventType ? "#2D3436" : "#95a5a6",
                    backgroundColor: "#F9FBFA",
                    border: "1px solid #CCEDE6",
                    borderRadius: 8,
                    padding: "11px 14px",
                    outline: "none",
                    boxSizing: "border-box",
                    appearance: "none",
                  }}
                >
                  <option value="" disabled>
                    선택해 주세요
                  </option>
                  <option value="corporate">기업 행사</option>
                  <option value="concert">콘서트 / 공연</option>
                  <option value="broadcast">방송 / 미디어</option>
                  <option value="wedding">웨딩 / 연회</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#2D3436",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  문의 내용 *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="행사 날짜, 장소, 예상 규모, 원하시는 레퍼토리 등을 자유롭게 적어주세요."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%",
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: 14,
                    color: "#2D3436",
                    backgroundColor: "#F9FBFA",
                    border: "1px solid #CCEDE6",
                    borderRadius: 8,
                    padding: "11px 14px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    lineHeight: 1.7,
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#05261D",
                  backgroundColor: "#F2AF29",
                  border: "none",
                  borderRadius: 8,
                  padding: "15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 4px 16px rgba(242,175,41,0.3)",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                <Send size={18} />
                문의 보내기
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
