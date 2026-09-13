import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ShieldCheck, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { getCurrentUser, isAdmin, signInWithGoogle, signOutAdmin } from "../../../lib/boardApi";
import { supabase } from "../../../lib/supabase";

export function AdminLoginPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkCurrentAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        verifyAdminStatus(session.user);
      } else {
        setUser(null);
        setIsUserAdmin(null);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function checkCurrentAuth() {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      if (currentUser) {
        await verifyAdminStatus(currentUser);
      } else {
        setLoading(false);
      }
    } catch (err: any) {
      console.error("인증 확인 실패:", err);
      setLoading(false);
    }
  }

  async function verifyAdminStatus(authUser: any) {
    setUser(authUser);
    const email = authUser.email;
    if (!email) {
      setIsUserAdmin(false);
      setLoading(false);
      return;
    }

    const admin = await isAdmin(email);
    setIsUserAdmin(admin);
    setLoading(false);

    if (admin) {
      navigate("/admin/dashboard", { replace: true });
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setAuthError(null);
      await signInWithGoogle();
    } catch (err: any) {
      console.error("Google 로그인 실패:", err);
      setAuthError(err.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOutAdmin();
      setUser(null);
      setIsUserAdmin(null);
    } catch (err: any) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 12,
          padding: "40px 32px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            backgroundColor: "#ECFDF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: "#1B7A63",
          }}
        >
          <ShieldCheck size={26} />
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#0F172A",
            marginBottom: 8,
          }}
        >
          관리자 로그인
        </h1>

        <p
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontSize: 14,
            color: "#64748B",
            marginBottom: 32,
          }}
        >
          등록된 구글 계정으로 로그인해 주세요.
        </p>

        {loading ? (
          <div style={{ padding: "24px 0" }}>
            <Loader2 className="animate-spin" size={28} color="#1B7A63" style={{ margin: "0 auto 10px" }} />
            <p style={{ fontSize: 13, color: "#94A3B8" }}>확인 중...</p>
          </div>
        ) : user && isUserAdmin === false ? (
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              backgroundColor: "#FEF2F2",
              border: "1px solid #FEE2E2",
              marginBottom: 20,
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#DC2626", marginBottom: 6 }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, fontSize: 14 }}>접근 권한 없음</span>
            </div>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.5, marginBottom: 12 }}>
              <strong>{user.email}</strong> 계정은 관리자로 등록되어 있지 않습니다.
            </p>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "9px",
                borderRadius: 6,
                backgroundColor: "#FFFFFF",
                border: "1px solid #CBD5E1",
                color: "#334155",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              다른 계정으로 로그인
            </button>
          </div>
        ) : (
          <div>
            {authError && (
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 6,
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FEE2E2",
                  color: "#DC2626",
                  fontSize: 13,
                  marginBottom: 16,
                  textAlign: "left",
                }}
              >
                {authError}
              </div>
            )}

            <button
              onClick={handleGoogleLogin}
              style={{
                width: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "12px 16px",
                borderRadius: 8,
                backgroundColor: "#FFFFFF",
                color: "#1E293B",
                border: "1px solid #CBD5E1",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "background-color 0.15s ease, border-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F8FAFC";
                e.currentTarget.style.borderColor = "#94A3B8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.borderColor = "#CBD5E1";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google 계정으로 로그인</span>
            </button>
          </div>
        )}

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #F1F5F9" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              color: "#64748B",
              fontSize: 13,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1B7A63")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
          >
            <ArrowLeft size={14} />
            <span>메인으로 이동</span>
          </button>
        </div>
      </div>
    </div>
  );
}
