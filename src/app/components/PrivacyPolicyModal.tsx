import { X, ShieldCheck } from "lucide-react";
import { CONTACT_INFO } from "../sectionConfig";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  const phoneText = Array.isArray(CONTACT_INFO.phone)
    ? CONTACT_INFO.phone.join(" / ")
    : CONTACT_INFO.phone;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(5, 38, 29, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          maxWidth: 580,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "36px 32px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
          position: "relative",
          border: "1px solid #CCEDE6",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#E6F2F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShieldCheck size={20} color="#1B7A63" />
            </div>
            <h3
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#05261D",
                margin: 0,
              }}
            >
              개인정보 처리방침 안내
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              borderRadius: "50%",
              color: "#636e72",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F0F5F4")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Intro */}
        <p
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontSize: 14,
            color: "#636e72",
            lineHeight: 1.6,
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: "1px solid #E6F2F0",
          }}
        >
          부디 앙상블은 이용자의 개인정보를 중요시하며, 「개인정보 보호법」을 준수하고 있습니다.
        </p>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h4
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#1B7A63",
                marginBottom: 6,
              }}
            >
              1. 개인정보의 수집 및 이용 목적
            </h4>
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 14,
                color: "#2D3436",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              공연 섭외 문의 상담, 견적 안내 및 계약 이행
            </p>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#1B7A63",
                marginBottom: 6,
              }}
            >
              2. 수집하는 개인정보 항목
            </h4>
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 14,
                color: "#2D3436",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              카카오톡 상담 과정에서 이용자가 직접 제공하는 정보 (성명, 연락처, 행사 일정 및 장소 등)
            </p>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#1B7A63",
                marginBottom: 6,
              }}
            >
              3. 개인정보의 보유 및 이용 기간
            </h4>
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 14,
                color: "#2D3436",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              상담 완료 및 목적 달성 후 지체 없이 파기 (단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관)
            </p>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#1B7A63",
                marginBottom: 6,
              }}
            >
              4. 개인정보 보호책임자
            </h4>
            <div
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 14,
                color: "#2D3436",
                lineHeight: 1.7,
                backgroundColor: "#F9FBFA",
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid #E6F2F0",
              }}
            >
              <div>• 이메일: {CONTACT_INFO.email}</div>
              <div>• 연락처: {phoneText}</div>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div style={{ marginTop: 32, textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#FFFFFF",
              backgroundColor: "#1B7A63",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
