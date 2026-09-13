import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  UploadCloud,
  X,
  Loader2,
  Check,
  Calendar,
  Clock,
} from "lucide-react";
import {
  getPostById,
  createPost,
  updatePost,
  uploadPoster,
  getCurrentUser,
  isAdmin,
} from "../../../lib/boardApi";

function formatConcertDate(dateStr: string, timeStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  const dateObj = new Date(year, month - 1, day);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = dayNames[dateObj.getDay()];

  const formattedDate = `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")} (${dayOfWeek})`;
  if (timeStr) {
    return `${formattedDate} ${timeStr}`;
  }
  return formattedDate;
}

export function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [inputMode, setInputMode] = useState<"picker" | "direct">("picker");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("19:00");
  const [directDate, setDirectDate] = useState("");
  const [venue, setVenue] = useState("");
  const [content, setContent] = useState("");
  const [kakaoLink, setKakaoLink] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  // Upload & UI states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkAuthAndInit();
  }, [id]);

  async function checkAuthAndInit() {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user?.email) {
        navigate("/admin", { replace: true });
        return;
      }

      const admin = await isAdmin(user.email);
      if (!admin) {
        navigate("/admin", { replace: true });
        return;
      }

      setUserEmail(user.email);

      if (id) {
        const post = await getPostById(id);
        if (!post) {
          alert("게시글을 찾을 수 없습니다.");
          navigate("/admin/dashboard", { replace: true });
          return;
        }
        setTitle(post.title);
        setVenue(post.venue);
        setContent(post.content);
        setKakaoLink(post.kakao_link || "");
        setIsPublished(post.is_published);
        setPosterUrl(post.poster_url);

        // Parse date and time from existing concert_date
        if (post.concert_date) {
          setDirectDate(post.concert_date);
          const dateMatch = post.concert_date.match(/(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);
          const timeMatch = post.concert_date.match(/(\d{2}:\d{2})/);

          if (dateMatch) {
            const y = dateMatch[1];
            const m = dateMatch[2].padStart(2, "0");
            const d = dateMatch[3].padStart(2, "0");
            setDateValue(`${y}-${m}-${d}`);
            if (timeMatch) {
              setTimeValue(timeMatch[1]);
            }
            setInputMode("picker");
          } else {
            setInputMode("direct");
          }
        }
      }
    } catch (err: any) {
      console.error("초기화 실패:", err);
      navigate("/admin/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("이미지 파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    try {
      setUploadingImage(true);
      const publicUrl = await uploadPoster(file);
      setPosterUrl(publicUrl);
    } catch (err: any) {
      console.error("포스터 업로드 실패:", err);
      alert("이미지 업로드에 실패했습니다: " + (err.message || "권한 또는 네트워크 오류"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemovePoster = () => {
    setPosterUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }

    const finalConcertDate =
      inputMode === "picker"
        ? formatConcertDate(dateValue, timeValue)
        : directDate.trim();

    if (!finalConcertDate) {
      alert("공연 일시를 입력하거나 달력에서 선택해 주세요.");
      return;
    }

    if (!venue.trim()) {
      alert("장소를 입력해 주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }

    try {
      setSaving(true);

      if (isEdit && id) {
        await updatePost(id, {
          title: title.trim(),
          concert_date: finalConcertDate,
          venue: venue.trim(),
          content: content.trim(),
          poster_url: posterUrl,
          kakao_link: kakaoLink.trim() ? kakaoLink.trim() : null,
          is_published: isPublished,
        });
      } else {
        await createPost({
          title: title.trim(),
          concert_date: finalConcertDate,
          venue: venue.trim(),
          content: content.trim(),
          poster_url: posterUrl,
          kakao_link: kakaoLink.trim() ? kakaoLink.trim() : null,
          is_published: isPublished,
          author_email: userEmail,
        });
      }

      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error("저장 실패:", err);
      alert("저장 중 오류가 발생했습니다: " + (err.message || "다시 시도해 주세요"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F8FAFC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        <Loader2 className="animate-spin" size={32} color="#1B7A63" />
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    border: "1px solid #CBD5E1",
    color: "#0F172A",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "Pretendard, sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 6,
    fontFamily: "Pretendard, sans-serif",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
        padding: "32px 20px 80px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Back Link */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            color: "#64748B",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            marginBottom: 20,
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1B7A63")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
        >
          <ArrowLeft size={14} />
          <span>목록으로 돌아가기</span>
        </button>

        {/* Page Title */}
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0F172A",
            }}
          >
            {isEdit ? "공연 수정" : "새 공연 등록"}
          </h1>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 10,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* 1. 제목 */}
          <div>
            <label style={labelStyle}>
              제목 <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="공연 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* 2. 공연 일시 (캘린더 & 시간 피커) */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={labelStyle}>
                공연 일시 <span style={{ color: "#DC2626" }}>*</span>
              </label>
              <button
                type="button"
                onClick={() => setInputMode(inputMode === "picker" ? "direct" : "picker")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#1B7A63",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {inputMode === "picker" ? "직접 텍스트로 입력" : "달력에서 선택"}
              </button>
            </div>

            {inputMode === "picker" ? (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                  {/* 날짜 선택 */}
                  <div>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748B", marginBottom: 4 }}>
                      <Calendar size={13} color="#1B7A63" />
                      <span>날짜 선택</span>
                    </span>
                    <input
                      type="date"
                      value={dateValue}
                      onChange={(e) => setDateValue(e.target.value)}
                      required={inputMode === "picker"}
                      style={inputStyle}
                    />
                  </div>

                  {/* 시간 선택 */}
                  <div>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748B", marginBottom: 4 }}>
                      <Clock size={13} color="#1B7A63" />
                      <span>시작 시간</span>
                    </span>
                    <input
                      type="time"
                      value={timeValue}
                      onChange={(e) => setTimeValue(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* 실시간 미리보기 박스 */}
                {dateValue && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: "8px 12px",
                      backgroundColor: "#ECFDF5",
                      borderRadius: 6,
                      border: "1px solid #A7F3D0",
                      fontSize: 13,
                      color: "#065F46",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>게시판 표시:</span>
                    <span>{formatConcertDate(dateValue, timeValue)}</span>
                  </div>
                )}
              </div>
            ) : (
              <input
                type="text"
                placeholder="예: 2026.10.15 (토) 19:00"
                value={directDate}
                onChange={(e) => setDirectDate(e.target.value)}
                required={inputMode === "direct"}
                style={inputStyle}
              />
            )}
          </div>

          {/* 3. 장소 */}
          <div>
            <label style={labelStyle}>
              장소 <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="예: 영평사 낙화정원"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* 4. 포스터 이미지 */}
          <div>
            <label style={labelStyle}>포스터 이미지 (선택)</label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />

            {posterUrl ? (
              <div
                style={{
                  position: "relative",
                  width: "fit-content",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid #E2E8F0",
                }}
              >
                <img
                  src={posterUrl}
                  alt="포스터 미리보기"
                  style={{ maxHeight: 220, maxWidth: "100%", display: "block", objectFit: "contain" }}
                />
                <button
                  type="button"
                  onClick={handleRemovePoster}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.65)",
                    border: "none",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  title="삭제"
                >
                  <X size={15} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: "1px dashed #CBD5E1",
                  borderRadius: 8,
                  padding: "28px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: "#F8FAFC",
                  transition: "border-color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1B7A63")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#CBD5E1")}
              >
                {uploadingImage ? (
                  <div>
                    <Loader2 className="animate-spin" size={24} color="#1B7A63" style={{ margin: "0 auto 8px" }} />
                    <p style={{ fontSize: 13, color: "#1B7A63", fontWeight: 500 }}>업로드 중...</p>
                  </div>
                ) : (
                  <div>
                    <UploadCloud size={28} color="#64748B" style={{ margin: "0 auto 8px" }} />
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#334155", marginBottom: 2 }}>
                      클릭하여 이미지 업로드
                    </p>
                    <p style={{ fontSize: 12, color: "#94A3B8" }}>
                      JPG, PNG, WEBP (최대 10MB)
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 5. 내용 */}
          <div>
            <label style={labelStyle}>
              내용 <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <textarea
              rows={8}
              placeholder="공연 소개, 프로그램, 관람 안내 등을 작성하세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{
                ...inputStyle,
                lineHeight: 1.6,
                resize: "vertical",
              }}
            />
          </div>

          {/* 6. 카카오톡 링크 */}
          <div>
            <label style={labelStyle}>카카오톡 예매/문의 링크 (선택)</label>
            <input
              type="url"
              placeholder="https://..."
              value={kakaoLink}
              onChange={(e) => setKakaoLink(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* 7. 공개 여부 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              backgroundColor: "#F8FAFC",
              borderRadius: 6,
              border: "1px solid #E2E8F0",
            }}
          >
            <input
              type="checkbox"
              id="is_published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#1B7A63" }}
            />
            <label htmlFor="is_published" style={{ fontSize: 13, fontWeight: 500, color: "#334155", cursor: "pointer" }}>
              즉시 공개
            </label>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, paddingTop: 6 }}>
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              disabled={saving}
              style={{
                padding: "9px 18px",
                borderRadius: 6,
                backgroundColor: "#FFFFFF",
                color: "#475569",
                border: "1px solid #CBD5E1",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              취소
            </button>

            <button
              type="submit"
              disabled={saving}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 22px",
                borderRadius: 6,
                backgroundColor: "#1B7A63",
                color: "#FFFFFF",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#156350")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1B7A63")}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  <span>저장 중...</span>
                </>
              ) : (
                <>
                  <Check size={14} />
                  <span>저장</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
