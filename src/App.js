/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// API calls go through the Railway proxy — no keys needed in the frontend
const supabase = createClient(
  "https://nrgecynqwibxdamrqopv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ2VjeW5xd2lieGRhbXJxb3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDM3OTksImV4cCI6MjA4ODQ3OTc5OX0.3Eg_uAWhGGlnB9CrPYpbDHjLjF8KEin64BidmdHbc3s"
);

const C = {
  bg: "#0a0a12", surface: "rgba(16,16,26,0.75)", surfaceHigh: "rgba(24,24,38,0.8)",
  surfaceSolid: "#10101a", border: "rgba(255,255,255,0.08)", borderHigh: "rgba(255,255,255,0.13)",
  accent: "#a78bfa", accentDark: "#7c3aed", accentSoft: "rgba(167,139,250,0.12)",
  gold: "#f59e0b", green: "#34d399", red: "#fb7185", yellow: "#fcd34d", blue: "#7dd3fc",
  text: "#f0eeff", mid: "#8b8ba8", dim: "#5c5c7a",
};

const SPOOL_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAOV0lEQVR4nO2ceXRUVZ7HP3epylaVkA3EpZ0WsR0Vt3FBdATa7kE9ooILYiCitooiYgsuSGQTVKBZxG7RVpBG2VzH0bbVnhE53QiojKKI2ri0PaNCyEJSqYSk3r13/niVIqGT4ExezYnHfOv8IEnl3Xd/3/zub7u3nhBCOgJFwMMBIAIeL7g5aiFkYIP9EKGlU8GO2HWNZR8CnGPXt8Cg/yABo+sT2MWhpQh4Cf/AoAXdBHYGWnYv4U6hy/tAQXoCcVD4XizhrhyIteoOIp2Chq69hLs6utOYTkLTxYNIV0e3D+wktOz2gZ2CFuiAh+zi7RMg4H5g9xLuDAKvREQaLNAFbIFBzvF7UQt36UpEpDGICCGQSvouRwDOYYxN2/0ApJQI4VfQQgiMsTiXvmo6LYm0cyClwFrHnuoYEonFoaQkNzeCtTbFaXA3BaUVsVichOehpMRYQyQ7m1AohLEWkQZTDryZ4ACpwHgGIQQ3TShlwMBTiMfreWHtq/zx938mr0euT+J3MIzvqrMKKfZU1TBg0D9x5dUXU1Scz4fvfcLSh9dSXVlDZmYG1rrUHIOCOCLvrGDtW/j/JJoSPLb2AYZcMLDV2zMnP8iiB5ZRVJjvL+cAlpcOaXZXVDLyqotYvHQ6Su0zik8++oxL/+VG6mrr0VoFvpylQBKkaBmirraeC4afw5ALBpJoSmCMwfMMxlim3j+BiZN/QWVlDVpphFCdul8oFKaiYg8lV13Mb56YiZQSz/MwxtLY2MTRxx7JtTeNoK6uAaV0oLoKJFqIYBNpKRXWCk4+rR/GWISUKYtwzmGMYcp940FIFt63nOKifIwx/ydDDIU05burKBlzEYuXTcM6EAK0btZJYa3lhJOPIaTCCHQywASH4DvSQiJQlO+sQimJl/D2vSUEUkqfxNnjEEKycPZyiop9Ev83zkmHNLvLq7hyzIUsfqIMa33yWhLkrEOFFLt2VmIMCCkRNmCP9ZOCIYGOKITv/4p65vPKpscoKOqBNdZPZ5JwzmGtQynJ/WWP8ODs31FYnI819jtxqLWioryKEWPOZ9GyslSa1JI8ax1S+nMZNnAc27buIDsnMxVIgoJUBPsSTpKVmcWur6u47tIyamtiSCWxdl/+51uin6NNnjWWX065murdMUI6jBIKSWtpfkkUGaEwVeW1jBwzlAefaJs8Zx1CgOd5jB99Lx9s2UE0EgErU+MEJ0iCFIHEGkc0N8o7Gz7imounUFtTh5Ttk3jnrOuZUFZKZXmN7+hFa0ftjy3QWlNRXsOIq89nwbLJONs2eQgwxnDzqFm89Mx68vPzsMalxgo0kBxXeGGgNu1afBUKaaoqajntn49j6QuzyM3zk2gp217Oc+95nMWzV1LUs0eLCkIgcEilqN1Tx4VXDGbR8sltW14yEhljuGX0bF56+k2KeuaTSHiIFhlloHng8UXD0kQg4JIkVtZw6lnHsfSFmUQPQOK8e5bx0H2rKCzukfSJDikkjY1NHHp4L15++2EyMsMpH9dyDCEE1lrGl8zm5afX7yNvv8gbpMJSCEWQIluK1BgPCosL2bLhE64bPoPYAZbz7fdewy1TSqiuqEPrMFJolA6xt95j8Hmnk5EZxnjm78jDQawmztjL7uXV5zdS3KsIY0BK3fEcOytB+8C/84lSYjxHQXE+72z4hOuGzzwgiZNmXs34u0dSVVGL0iH8nqVEa91+vpj0e9UVtUipIXlNukVKKUmLCF9hKRRewtK416NnrwK2bPyU6y+ZRawm3iGJE2dexfi7r6C6IoaSkpycLDau+xBwCClblWTNS7RHQS6/e2UWp5/dj5rKOsLhMFKkSb+UnigCF6dQStNQ14SXcBx8WDH5BblU7Y6Rn5/Hext3cMMlsw9I4m0zSrl58ggqdsWI5Eb4eOtXzJm8PNXp2Z9Eax3ZOVk8+uwU+g/qx57KOKFwGNKhY7Oc0qs02EQakEoSjzVwUv+juG3WKPoecxiNDU28/m+bmT/lKaSQ1MUaOOmMo1jy7F1E83I6DCwLp61kyQPPUdwrn4ryPVw/aRgTZ43CGIuUYr8E2h8nHqvnpsvmsHn9dvILI3ieobm3E2QxJ047aEywBEpBU2OC3ocWsmb9bKJ5Oa3e3/AfW7l15AKUVsRjDZzYvy8PP3vnAUl8cNpqlsx5nuKD8tm9s5rrbr+IifeOwhqLaJfEBsZdNpctGz4hmpedlmauFEISpCilaYgnGDrybKJ5OSSaPJzzyfAShjPPOYEH10zEGEckN4f3N3/OuMvmdbCcJcZYJswYydi7hlOxq4aevQt5fN5L/GrKSqSSuP2Wc/M4OdEsHlo7iT5HH8reBg+pVKC6CpEWHyiRQlHcK1kDS5kq8nVI4XmGAT89nsWrb8N6EM2NsHXTF9x8+fx2SCRF4q3TRzL2zuFU7IzRs3cRyxb8nvllq9ol0UsYonk5jLrpPBobPJQMBe4DZaA5UbKO1VKz7d0vfcX2yzu09kk846f9WLR6AtZzRHMjfLDxS265bBGxmvokia5NEidMH8HYOy+icmeMXr0LeWL+H1hQtrpNEkUy2Pyoz0FkhMMIJ4LVVaSBQGcFuT2ivPbsu7y9fnvK6vYn0aRIvMWvnfMibH37SyZcvihpiaINEv3ofMv0y7nhzgup3BWj18GFLF/wGgvL1qZINMb6/3t+kPnbZ7swHiipW8xVBiNpSS6FAhSTRj3Clg2fJglr7cBVksT+g49jwaqbMZ4jEs1h6+a/cuuIX1NXW98Gift84vjpl3LdHUOp2BmjuHcByxe+zsKyp5FKopRESEE4Q7OnKsbqJW+QlZ2Fc6LFPFUgIs4+ZELgeyLOgVKSpkYPHVIsXHMjJ595FMazKN26gWs8g9KKTes+YlLJb9FaEa9t4IT+R7Do6XFEcrPbqHv9SKuU5Ncznufxua9SdFAe1RUxfj7sZC655mzyi6J88fE3LF/0Gp9v/5bsSAY2DVFYDDpkYvCbpsKPui1JnL/m+g5I9H+2ed12bi95DK01dbEGTuj/YxauvfGAJP5mxr+ydO5rFPXKZU+1H4gyMjUN8UZ0SJOZHfbTHSECP7ojBh92e/p2nR1ILWja66HDkvmrruekM/t2SOLbb37MHSVLU3ni8f1/zII1N3wHEl9k2bzXKTooD+MZ/3eTQcwF3IVuicDzwFYiJc4KMrLCGA8mXbmU/9ywA6VlGz7R/9lpg/6RuSt/gU3miR9u/hu3XfHbdnzivug8btpFXHvHuVSWx5BKIaX0G65OpE+/9OSBLUQolAoh0GRnZ2ON4I4rl/Pehs8OQOLRzHnqGqwHkWgO2zb/N5OuWEpdbUOHJN40dSjXThrCnt0NSOV3cdKqHwrx88PLgvYKyaMd4CzEY3tTCkdyM/2TCxLmrBzDSWf26XA5v/Pmp9xVugKtFPHYXvqd/iPmrb7mgMt5ycxXWD7/DQqKcjDG0bbjC6YiFkMOnxa4gxBC4CUMQsLAocfS55jeVO6qZd2L26gqryMU1gjheGBVKScOOACJ6//ClNFPopROkThn9RgiuVkdkvjIzFdYMf9N8osiaT3QJM79hxmBb2s66xASZiy9glMHH5V6r/ybPUy9ejWfvv8NmdkhAO5fOYoTBxzRIYnvrt/BlNJVKCVTJD6wqrRdEp31t1EfvfdVVixYT4/CnLSkMABSSEWQorQmHksw7Nr+nDr4KBJN/pEOL2HoeXAP5qwu5ScnHoKXcIDk7tGref+tLzv0iacM7MvsFVeCE+TmR9i2+WsmlzzVrk8USZ94wz3nUvrLQcRrm9A62doPWF8pCfYlnL/9ePJZfZKtKIFSEh1SWGPJK8jhvidLyC+K+qWfEZSNXsPWDkj0EoZTBvZl7PQhxKobKSiO8uGmr7m7ZFWHgcUaxw1Th3Da4L7Uxzy00v4cAxQZ7CazQgoNVrI3nvCXcwsHIZXE8ywFPaOcM7wf9TUJsrMzsJ6gbPTTbH3rr+2SaK1j0NBj6dk7j8Z6S0FRlG2bvmFKyZp2SXTO4Rz87JLjsZ5/bqflRn0Qr8B35QR+6vLHZ7YhBKnSLqUYYI2juHceoLBGkpGRgfUkU0ufbYdEgRAQylBkZGaAk5iEoEdhlG2bv6Vs1DPEm0k0rW/mnCMrO+zvzhGwriINBFoniOZl8dYfPmfFvD+hmjsknsUav90klWDHB7vQyR03a4W/XWkkU696ga1vfZUisdl/CiH4Yns5Fd/WE84II4TEeNCjMOKTOPo56mr3IpXwr/OsXwlJwZb1XwVOXIrAoH2gQoIV5OZl89TcjTw5789IJVBaIpXfVH3njc956+XPiOZmggElJFjIzAiBJ5g55kXeXfcFSvudlVBYUbkrxqP3rPMdhUjeS0ic5ygoyGH7pm+ZNvo5Kr6N+dcl5c0XtvPGMx+Tm5sFhoC1lYhLjnwobYWikIK6mr0MOO9IBg47mszsEB9u/C9eWfEB1ji0lq2Wt3MglcBr8vuHZw7tS5/jelJdHudPL/2Fiq/ryMwJ+edcROvrtJbEY40U9Y5wxvlHkleYzY6tO3nn379Eh1SrVCdQHS/t+3AaPxDub1HGY42p3NAaR040AyFFu8dtm4NPfawxFRiyckKEwrpVu39/SCVJNBr2xpv8lpqWZEfDAO3eq7NI+yeVnINIXnbqewGpPd2ODosKCdH8nNTvNPvPjubrLITCITIyw6ng1ZxAp+OEPvw/PTPBtTAa3w5ab0N2dF2LxOQ7XQPQ0kjTrV/3pzU7ie/FQye6Mro/rdlJdPnnxnR1dD90opPoDiKdRLcP7CS6fWAnkYbHnqQj5Q+6DAtujt15YCfRvYQ7ibQ+M+GHgODzwK7rrvYhwDl2/TSmKz/zBNAy6CDSxRUGfmAP4u7i6Cawk9Aq8Ke3/bDQbYGdxP8A4E6nzyQv55EAAAAASUVORK5CYII=";

const LANGS = {
  en: {
    home: "Home", schedule: "Schedule", inbox: "Inbox", clients: "Clients", settings: "Settings",
    services: "Services", payments: "Payments", analytics: "Analytics", promotions: "Promotions",
    loyalty: "Loyalty", staff: "Staff", notifications: "Notifications", packages: "Packages",
    waitlist: "Waitlist", goodMorning: "Good morning", hey: "Hey", goodEvening: "Good evening",
    todaySchedule: "Today's Schedule", noAppts: "No appointments today", seeAll: "See all",
    addClient: "Add Client", searchClients: "Search clients...", totalClients: "total clients",
    addService: "Add Your First Service", newBooking: "New Booking", signOut: "Sign Out",
    changePassword: "Change Password", deleteAccount: "Delete Account", import: "Import",
    language: "Language", save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit",
    confirm: "Confirm", loading: "Loading...", send: "Send", reply: "Reply",
  },
  ar: {
    home: "الرئيسية", schedule: "المواعيد", inbox: "الرسائل", clients: "العملاء", settings: "الإعدادات",
    services: "الخدمات", payments: "المدفوعات", analytics: "التحليلات", promotions: "العروض",
    loyalty: "الولاء", staff: "الموظفين", notifications: "الإشعارات", packages: "الباقات",
    waitlist: "قائمة الانتظار", goodMorning: "صباح الخير", hey: "مرحباً", goodEvening: "مساء الخير",
    todaySchedule: "جدول اليوم", noAppts: "لا مواعيد اليوم", seeAll: "عرض الكل",
    addClient: "إضافة عميل", searchClients: "بحث عن عميل...", totalClients: "إجمالي العملاء",
    addService: "أضف خدمتك الأولى", newBooking: "حجز جديد", signOut: "تسجيل الخروج",
    changePassword: "تغيير كلمة المرور", deleteAccount: "حذف الحساب", import: "استيراد",
    language: "اللغة", save: "حفظ", cancel: "إلغاء", delete: "حذف", edit: "تعديل",
    confirm: "تأكيد", loading: "جاري التحميل...", send: "إرسال", reply: "رد",
  },
};
function getLang() { return localStorage.getItem("spool_lang") || "en"; }
function t(key) { const lang = getLang(); return LANGS[lang]?.[key] || LANGS.en[key] || key; }
function isRTL() { return getLang() === "ar"; }

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:4px;}
  body{background:#0a0a12;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f0eeff;overflow-x:hidden;}
  html{overflow-x:hidden;}
  .fade-in{animation:fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideUp{from{transform:translateY(100%);opacity:0.5}to{transform:translateY(0);opacity:1}}
  @keyframes pop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  @keyframes orbFloat{0%,100%{transform:translateY(0px) scale(1)}50%{transform:translateY(-6px) scale(1.03)}}
  @keyframes orbSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes orbSpinRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
  @keyframes orbPulse{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.15);opacity:1}}
  @keyframes wave1{0%,100%{d:path("M0,50 Q25,20 50,50 Q75,80 100,50")}50%{d:path("M0,50 Q25,80 50,50 Q75,20 100,50")}}
  @keyframes blobMorph{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60%/30% 40% 70% 50%}75%{border-radius:40% 60% 50% 40%/70% 30% 50% 60%}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(139,92,246,0.15)}50%{box-shadow:0 0 40px rgba(139,92,246,0.3)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
  @keyframes scaleIn{from{transform:scale(0.95);opacity:0}to{transform:scale(1);opacity:1}}
  @keyframes slideRight{from{transform:translateX(-12px);opacity:0}to{transform:translateX(0);opacity:1}}
  @keyframes slideDown{from{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes glow{0%,100%{box-shadow:0 0 8px rgba(196,181,253,0.15)}50%{box-shadow:0 0 24px rgba(196,181,253,0.3)}}
  input:focus,textarea:focus,select:focus{outline:none;border-color:rgba(196,181,253,0.4) !important;box-shadow:0 0 0 3px rgba(139,92,246,0.1) !important;}
  input::placeholder,textarea::placeholder{color:#4a4a66;}
  input[type=range]{-webkit-appearance:none;height:4px;border-radius:2px;background:rgba(255,255,255,0.06);}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#c4b5fd);cursor:pointer;box-shadow:0 0 12px rgba(139,92,246,0.4);}
  select{appearance:none;}
  button:active:not(:disabled){transform:scale(0.97);}
  @media (min-width: 768px) {
    .mobile-only { display: none !important; }
    .desktop-screen { padding-top: 40px !important; padding-bottom: 40px !important; }
    .desktop-screen > div:first-child { position: relative !important; top: auto !important; padding-top: 0 !important; }
    .desktop-two-col { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 20px !important; align-items: start !important; }
    .desktop-three-col { display: grid !important; grid-template-columns: 1fr 1fr 1fr !important; gap: 16px !important; }
  }
  @media (max-width: 767px) {
    .desktop-only { display: none !important; }
  }
`;

// ── Shared Components ──────────────────────────────────────────────────────────
const Toggle = ({ on, onToggle }) => (
  <div onClick={onToggle} style={{ width: 46, height: 26, borderRadius: 100, background: on ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : "rgba(255,255,255,0.08)", position: "relative", cursor: "pointer", transition: "background 0.3s", flexShrink: 0, boxShadow: on ? "0 0 16px rgba(139,92,246,0.3)" : "none" }}>
    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
  </div>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: "rgba(14,14,22,0.55)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, transition: "border-color 0.3s, box-shadow 0.3s, transform 0.2s", cursor: onClick ? "pointer" : undefined, ...style }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(196,181,253,0.15)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(139,92,246,0.06)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}>{children}</div>
);

const SectionLabel = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, marginTop: 24 }}>
    <div style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${C.accentDark},${C.accent})` }} />
    <div style={{ fontSize: 11, fontWeight: 700, color: C.mid, letterSpacing: 2, textTransform: "uppercase" }}>{children}</div>
  </div>
);

function useDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const h = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isDesktop;
}

const BtnPrimary = ({ children, onClick, disabled, style }) => (
  <button onClick={onClick} disabled={disabled} style={{ background: disabled ? "rgba(255,255,255,0.05)" : `linear-gradient(135deg,${C.accentDark},${C.accent})`, border: "none", borderRadius: 14, color: disabled ? C.dim : "#fff", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", fontWeight: 600, fontSize: 15, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", boxShadow: disabled ? "none" : "0 4px 24px rgba(139,92,246,0.25)", ...style }} onMouseEnter={e => { if (!disabled) e.currentTarget.style.boxShadow = "0 6px 32px rgba(139,92,246,0.4)"; }} onMouseLeave={e => { if (!disabled) e.currentTarget.style.boxShadow = "0 4px 24px rgba(139,92,246,0.25)"; }}>{children}</button>
);

const BackBtn = ({ onBack }) => (
  <div onClick={onBack} style={{ width: 38, height: 38, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
  </div>
);

const BottomNav = ({ active, navigate }) => {
  const items = [
    { id: "home", label: "Home", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" },
    { id: "schedule", label: "Schedule", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { id: "inbox", label: "Inbox", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "clients", label: "Clients", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  ];
  return (
    <div className="mobile-only" style={{ position: "fixed", bottom: 0, left: 0, width: "100%", background: "rgba(6,6,10,0.92)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", padding: "10px 0 24px", zIndex: 50 }}>
      {items.map(t => {
        const isActive = active === t.id;
        return (
          <div key={t.id} onClick={() => navigate(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", position: "relative", transition: "transform 0.2s" }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: isActive ? `${C.accent}18` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isActive ? C.accent : C.dim} strokeWidth={isActive ? "2" : "1.6"} strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}><path d={t.d}/></svg>
            </div>
            <div style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, color: isActive ? C.accent : C.dim, letterSpacing: 0.3, transition: "color 0.2s" }}>{t.label}</div>
          </div>
        );
      })}
    </div>
  );
};

const WA = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const IG = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="url(#ig)">
    <defs><radialGradient id="ig" cx="30%" cy="107%"><stop offset="0%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);


function useOwnerId(userRole, staffOwnerId) {
  const [oid, setOid] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      if (userRole === "staff" && staffOwnerId) setOid(staffOwnerId);
      else setOid(session.user.id);
    });
  }, [userRole, staffOwnerId]);
  return oid;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return "";
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return Math.floor(diff/60) + "m ago";
  if (diff < 86400) return Math.floor(diff/3600) + "h ago";
  return Math.floor(diff/86400) + "d ago";
}

function compressImage(dataUrl, maxW, quality) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      // Crop to square from center
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      const outSize = Math.min(size, maxW);
      c.width = outSize;
      c.height = outSize;
      c.getContext("2d").drawImage(img, sx, sy, size, size, 0, 0, outSize, outSize);
      resolve(c.toDataURL("image/jpeg", quality));
    };
    img.src = dataUrl;
  });
}

function formatPhone(p) {
  if (!p) return "";
  const d = p.replace(/\D/g, "");
  if (d.length === 11 && d[0] === "1") return `(${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  return p;
}

function formatDate(dayStr) {
  if (!dayStr) return "";
  // Convert "Wed Mar 19" to "Mar 19 (Wed)"
  const parts = dayStr.split(" ");
  if (parts.length === 3) return `${parts[1]} ${parts[2]} (${parts[0]})`;
  return dayStr;
}

function handlePhoneInput(val) {
  const d = val.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0,3)}) ${d.slice(3)}`;
  return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
}

// ── SPLASH ─────────────────────────────────────────────────────────────────────
function Splash() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.bg }}>
      <div style={{ position: "relative", marginBottom: 28 }}>
        <div style={{ position: "absolute", inset: -20, borderRadius: "50%", background: `radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)`, animation: "glowPulse 2s ease-in-out infinite", filter: "blur(12px)" }} />
        <div style={{ position: "relative", width: 80, height: 80, borderRadius: 24, overflow: "hidden" }}>
          <img src={SPOOL_LOGO} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 24 }} />
        </div>
      </div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", opacity: 0.9 }}>spool</div>
    </div>
  );
}

// ── LOGIN ──────────────────────────────────────────────────────────────────────
function Login({ navigate, setUserRole, setStaffOwnerId }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bizName, setBizName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [joinMode, setJoinMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleAuth = async () => {
    setError("");
    setLoading(true);
    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      // Check if staff
      const { data: staffProf } = await supabase.from("staff_profiles").select("owner_id").eq("user_id", data.user.id).eq("status", "active").single();
      if (staffProf) {
        setUserRole("staff");
        setStaffOwnerId(staffProf.owner_id);
        navigate("home");
      } else {
        const { data: prof } = await supabase.from("business_profiles").select("biz_name").eq("user_id", data.user.id).single();
        setUserRole("owner");
        if (prof?.biz_name) navigate("home");
        else navigate("onboarding");
      }
    } else {
      // Signup
      if (joinMode && inviteCode.trim()) {
        // Staff signup with invite code - lookup invite first (before auth)
        const { data: invite, error: invErr } = await supabase.from("team_invites").select("*").eq("code", inviteCode.trim().toUpperCase()).eq("status", "pending").single();
        if (!invite || invErr) { setError("Invalid or expired invite code."); setLoading(false); return; }
        const { data: signupData, error: signupErr } = await supabase.auth.signUp({ email, password });
        if (signupErr) { setError(signupErr.message); setLoading(false); return; }
        // Wait for session to be ready
        await new Promise(r => setTimeout(r, 500));
        // Create staff profile
        const { error: spErr } = await supabase.from("staff_profiles").insert([{
          user_id: signupData.user.id,
          owner_id: invite.owner_id,
          name: invite.name || email.split("@")[0],
          role: invite.role || "Stylist",
          status: "active",
        }]);
        if (spErr) console.error("staff_profiles insert err:", spErr);
        // Mark invite as used
        await supabase.from("team_invites").update({ status: "used", used_by: signupData.user.id }).eq("id", invite.id);
        setUserRole("staff");
        setStaffOwnerId(invite.owner_id);
        navigate("home");
      } else {
        // Owner signup
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) { setError(error.message); setLoading(false); return; }
        setUserRole("owner");
        navigate("onboarding");
      }
    }
    setLoading(false);
  };

  const handleReset = async () => {
    if (!email) { setError("Enter your email first"); return; }
    setError(""); setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    setLoading(false);
    if (error) setError(error.message);
    else setResetSent(true);
  };

  if (resetSent) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 24 }}>✉</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Check your email</div>
      <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.7, marginBottom: 28 }}>We sent a password reset link to<br /><span style={{ color: C.accent, fontWeight: 600 }}>{email}</span></div>
      <BtnPrimary onClick={() => { setResetMode(false); setResetSent(false); }} style={{ padding: "13px 28px" }}>Back to Login</BtnPrimary>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "60px 24px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 400, margin: "0 auto", width: "100%", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, margin: "0 auto 16px", boxShadow: "0 0 60px rgba(139,92,246,0.35)", animation: "glowPulse 3s ease-in-out infinite", overflow: "hidden", padding: 14 }}><img src={SPOOL_LOGO} alt="spool" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em" }}>spool</div>
          <div style={{ fontSize: 14, color: C.mid, marginTop: 8, fontWeight: 400 }}>AI-powered business management</div>
        </div>
        {resetMode ? (
          <>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Reset password</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>Enter your email and we'll send a reset link.</div>
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            {error && <div style={{ background: "#f43f5e18", border: "1px solid #f43f5e33", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: C.red, marginBottom: 16 }}>{error}</div>}
            <BtnPrimary onClick={handleReset} disabled={loading || !email} style={{ width: "100%", padding: 16, marginBottom: 12 }}>{loading ? "Sending..." : "Send Reset Link"}</BtnPrimary>
            <div style={{ textAlign: "center" }}><span onClick={() => { setResetMode(false); setError(""); }} style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>← Back to login</span></div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 4, marginBottom: 28 }}>
              {["login", "signup"].map(m => (
                <div key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex: 1, padding: "11px", borderRadius: 11, background: mode === m ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : "transparent", textAlign: "center", fontSize: 14, fontWeight: 600, color: mode === m ? "#fff" : C.mid, cursor: "pointer", transition: "all 0.2s" }}>{m === "login" ? "Log In" : "Sign Up"}</div>
              ))}
            </div>
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAuth()} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAuth()} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: mode === "signup" ? 12 : 20 }} />
            {mode === "signup" && (
              <div style={{ marginBottom: 20 }}>
                <div onClick={() => setJoinMode(!joinMode)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: joinMode ? 12 : 0 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 12, border: `2px solid ${joinMode ? C.accent : C.border}`, background: joinMode ? C.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", transition: "all 0.2s" }}>{joinMode ? "✓" : ""}</div>
                  <span style={{ fontSize: 13, color: C.mid }}>I have an invite code from my employer</span>
                </div>
                {joinMode && (
                  <input placeholder="Enter invite code (e.g. SP7K2M)" value={inviteCode} onChange={e => setInviteCode(e.target.value.toUpperCase())} style={{ width: "100%", background: C.surface, border: `1px solid ${C.accent}44`, borderRadius: 14, padding: "14px 16px", fontSize: 16, color: C.accent, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", textAlign: "center", letterSpacing: 3, fontWeight: 700 }} />
                )}
              </div>
            )}
            {error && <div style={{ background: "#f43f5e18", border: "1px solid #f43f5e33", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: C.red, marginBottom: 16 }}>{error}</div>}
            {mode === "login" && <div style={{ textAlign: "right", marginBottom: 16, marginTop: -8 }}><span onClick={() => { setResetMode(true); setError(""); }} style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Forgot password?</span></div>}
            <BtnPrimary onClick={handleAuth} disabled={loading || !email || !password} style={{ width: "100%", padding: 16 }}>
              {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
            </BtnPrimary>
          </>
        )}
      </div>
      <div style={{ textAlign: "center", fontSize: 12, color: C.dim, marginTop: 24 }}>By continuing you agree to our <span onClick={() => alert("Terms of Service will be available at launch.")} style={{ color: C.accent, cursor: "pointer" }}>Terms</span> & <span onClick={() => alert("Privacy Policy will be available at launch.")} style={{ color: C.accent, cursor: "pointer" }}>Privacy Policy</span></div>
    </div>
  );
}

// ── ONBOARDING ─────────────────────────────────────────────────────────────────
const BUSINESS_TYPES = ["Hair & Beauty", "Barbershop", "Nail Studio", "Spa & Wellness", "Photography", "Fitness & Training", "Tutoring & Education", "Consulting", "Healthcare & Clinic", "Auto & Repair", "Cleaning Service", "Pet Care", "Freelance & Creative", "Food & Catering", "Real Estate", "Legal & Accounting", "Event Planning", "Other"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PLATFORMS = [
  { id: "whatsapp", label: "WhatsApp", icon: "W", color: "#25D366" },
  { id: "instagram", label: "Instagram", icon: "IG", color: "#E1306C" },
  { id: "google", label: "Google Calendar", icon: "▣", color: "#4285F4" },
  { id: "facebook", label: "Facebook", icon: "⊡", color: "#1877F2" },
];
const AI_PERMISSIONS = [
  { id: "reply_dms", label: "Reply to DMs automatically", sub: "AI responds to inquiries 24/7" },
  { id: "book_appts", label: "Confirm bookings automatically", sub: "No approval needed from you" },
  { id: "send_reminders", label: "Send appointment reminders", sub: "24h before every appointment" },
  { id: "follow_ups", label: "Send follow-up messages", sub: "After every visit" },
  { id: "promotions", label: "Run promotions", sub: "Ask me before sending any promo" },
];

function Onboarding({ navigate }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [bizName, setBizName] = useState("");
  const [bizType, setBizType] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", price: "", duration: "1h" });
  const [workDays, setWorkDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
  const [dayHours, setDayHours] = useState({
    Mon: { open: "9:00 AM", close: "6:00 PM" },
    Tue: { open: "9:00 AM", close: "6:00 PM" },
    Wed: { open: "9:00 AM", close: "6:00 PM" },
    Thu: { open: "9:00 AM", close: "6:00 PM" },
    Fri: { open: "9:00 AM", close: "6:00 PM" },
    Sat: { open: "10:00 AM", close: "5:00 PM" },
    Sun: { open: "10:00 AM", close: "4:00 PM" },
  });
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [aiPerms, setAiPerms] = useState(["reply_dms", "send_reminders", "follow_ups"]);
  const [aiTone, setAiTone] = useState("friendly");
  const totalSteps = 5;
  const TIME_OPTIONS = ["7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM"];
  const COUNTRIES = ["United States","Canada","United Kingdom","Australia","Nigeria","South Africa","Ghana","Jamaica","Trinidad","India","Palestine","UAE","Saudi Arabia","Other"];

  const canContinue = () => {
    if (step === 0) return bizName.length > 1 && bizType && ownerName.length > 1 && country;
    if (step === 1) return services.length > 0;
    if (step === 2) return workDays.length > 0;
    if (step === 3) return true;
    return true;
  };

  if (done) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ width: 90, height: 90, borderRadius: 28, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, marginBottom: 28, boxShadow: `0 0 60px ${C.accentDark}44`, animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1)", overflow: "hidden", padding: 18 }}><img src={SPOOL_LOGO} alt="spool" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 30, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>{bizName || "Your business"} is<br />live on spool.</div>
      <div style={{ fontSize: 15, color: C.mid, lineHeight: 1.6, marginBottom: 36 }}>Your AI assistant is running.<br />Sit back — we've got you.</div>
      <Card style={{ padding: "20px 24px", width: "100%", textAlign: "left", marginBottom: 28 }}>
        {["Monitoring your DMs", "Ready to book appointments", "Reminders armed and ready", "AI assistant online"].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite", animationDelay: `${i * 0.3}s` }} />
            <span style={{ fontSize: 13, color: C.mid }}>{t}</span>
          </div>
        ))}
      </Card>
      <BtnPrimary onClick={async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const uid = session.user.id;
          const loc = [city, country].filter(Boolean).join(", ");
          // Build business hours from dayHours
          const dayMap = { Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri", Sat: "sat", Sun: "sun" };
          const hours = {};
          DAYS.forEach(d => {
            const key = dayMap[d];
            if (workDays.includes(d)) {
              const dh = dayHours[d];
              const toMil = t => { const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i); if (!m) return "9:00"; let h = parseInt(m[1]); if (m[3].toUpperCase() === "PM" && h < 12) h += 12; if (m[3].toUpperCase() === "AM" && h === 12) h = 0; return `${h}:${m[2]}`; };
              hours[key] = { open: toMil(dh.open), close: toMil(dh.close), off: false };
            } else {
              hours[key] = { open: "", close: "", off: true };
            }
          });
          // Save business profile with all info
          await supabase.from("business_profiles").upsert({
            user_id: uid, biz_name: bizName, location: loc, phone: ownerPhone.replace(/\D/g, ""),
            business_hours: hours,
            settings: { displayName: ownerName, tone: aiTone, aiReplies: aiPerms.includes("reply_dms"), aiBookings: aiPerms.includes("auto_book"), aiReminders: aiPerms.includes("send_reminders"), aiFollowUps: aiPerms.includes("follow_ups") },
          }, { onConflict: "user_id" });
          // Save services
          if (services.length > 0) {
            const rows = services.map(s => ({ owner_id: uid, name: s.name, price: parseFloat(s.price) || 0, duration: s.duration || "1h", icon: "✨", active: true }));
            await supabase.from("services").insert(rows);
          }
          // Save AI memory with owner name
          if (ownerName) {
            await supabase.from("ai_memories").insert([{ owner_id: uid, fact: `User's name is ${ownerName}` }]);
          }
        }
        navigate("home");
      }} style={{ width: "100%", padding: 16 }}>Go to Dashboard →</BtnPrimary>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 640, padding: "52px 24px 0" }}>
        {step > 0 && <div onClick={() => setStep(p => p - 1)} style={{ width: 38, height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 20 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></div>}
        <div style={{ display: "flex", gap: 5, marginBottom: 28 }}>
          {Array.from({ length: totalSteps }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? `linear-gradient(90deg,${C.accentDark},${C.accent})` : C.border, transition: "background 0.3s" }} />)}
        </div>
      </div>
      <div style={{ flex: 1, padding: "0 24px", overflowY: "auto", width: "100%", maxWidth: 640 }}>
        {step === 0 && (
          <div className="fade-in">
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Step 1 of 5</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Tell us about<br />your business</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 28 }}>We'll set everything up around you.</div>
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>YOUR NAME</div>
            <input placeholder="e.g. Jasmine, Omar..." value={ownerName} onChange={e => setOwnerName(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 16 }} />
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>YOUR PHONE</div>
            <input placeholder="(555) 123-4567" type="tel" value={ownerPhone} onChange={e => setOwnerPhone(handlePhoneInput(e.target.value))} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 16 }} />
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>BUSINESS NAME</div>
            <input placeholder="e.g. Luxe Hair Studio" value={bizName} onChange={e => setBizName(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 16 }} />
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>TYPE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {BUSINESS_TYPES.map(t => <div key={t} onClick={() => setBizType(t)} style={{ padding: "9px 16px", borderRadius: 100, background: bizType === t ? C.accentSoft : C.surface, border: `1px solid ${bizType === t ? C.accent : C.border}`, fontSize: 13, color: bizType === t ? C.accent : C.mid, cursor: "pointer", fontWeight: bizType === t ? 600 : 400, transition: "all 0.2s" }}>{t}</div>)}
            </div>
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>COUNTRY</div>
            <select value={country} onChange={e => setCountry(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: country ? C.text : C.dim, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 16 }}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>CITY</div>
            <input placeholder="e.g. Atlanta" value={city} onChange={e => setCity(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 16 }} />
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>ADDRESS <span style={{ color: C.dim, fontWeight: 400 }}>(optional)</span></div>
            <input placeholder="Street address" value={address} onChange={e => setAddress(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
          </div>
        )}
        {step === 1 && (
          <div className="fade-in">
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Step 2 of 5</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>What services<br />do you offer?</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>AI will use these to answer pricing questions.</div>
            {services.map(s => (
              <div key={s.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>${s.price} · {s.duration}</div></div>
                <div onClick={() => setServices(p => p.filter(x => x.id !== s.id))} style={{ width: 28, height: 28, borderRadius: 12, background: "#f43f5e11", border: "1px solid #f43f5e22", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: C.red }}>×</div>
              </div>
            ))}
            <div style={{ background: C.surface, border: `1px dashed ${C.borderHigh}`, borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 10 }}>ADD SERVICE</div>
              <input placeholder="Service name (e.g. Consultation, Photoshoot, Haircut...)" value={newService.name} onChange={e => setNewService(p => ({ ...p, name: e.target.value }))} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 8 }} />
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input placeholder="Price ($)" type="number" value={newService.price} onChange={e => setNewService(p => ({ ...p, price: e.target.value }))} style={{ flex: 1, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
                <select value={newService.duration} onChange={e => setNewService(p => ({ ...p, duration: e.target.value }))} style={{ flex: 1, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
                  {["30m","45m","1h","1.5h","2h","2.5h","3h","3.5h","4h","4.5h","5h","6h"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <button onClick={() => { if (!newService.name) return; setServices(p => [...p, { ...newService, id: Date.now() }]); setNewService({ name: "", price: "", duration: "1h" }); }} style={{ width: "100%", padding: 11, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.mid, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", fontWeight: 600 }}>+ Add Service</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="fade-in">
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Step 3 of 5</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>When are you<br />available?</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>Tap a day to toggle it. Set custom hours for each day.</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {DAYS.map(d => <div key={d} onClick={() => setWorkDays(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d])} style={{ flex: 1, height: 44, borderRadius: 12, background: workDays.includes(d) ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : C.surface, border: `1px solid ${workDays.includes(d) ? "transparent" : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: workDays.includes(d) ? "#fff" : C.dim, cursor: "pointer", transition: "all 0.2s" }}>{d}</div>)}
            </div>
            {workDays.map(d => (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 40, fontSize: 12, fontWeight: 700, color: C.mid }}>{d}</div>
                <select value={dayHours[d]?.open || "9:00 AM"} onChange={e => setDayHours(p => ({ ...p, [d]: { ...p[d], open: e.target.value } }))} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
                  {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
                </select>
                <span style={{ color: C.dim, fontSize: 12 }}>to</span>
                <select value={dayHours[d]?.close || "6:00 PM"} onChange={e => setDayHours(p => ({ ...p, [d]: { ...p[d], close: e.target.value } }))} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
                  {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="fade-in">
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Step 4 of 5</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Connect your<br />accounts</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>This is where your clients reach you.</div>
            {PLATFORMS.map(p => (
              <div key={p.id} onClick={() => setConnectedPlatforms(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: connectedPlatforms.includes(p.id) ? `${C.accentSoft}` : C.surface, border: `1px solid ${connectedPlatforms.includes(p.id) ? C.accent + "22" : C.border}`, borderRadius: 14, marginBottom: 10, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 13, background: `${p.color}18`, border: `1px solid ${p.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{p.icon}</div>
                  <div><div style={{ fontSize: 14, fontWeight: 600 }}>{p.label}</div><div style={{ fontSize: 12, color: connectedPlatforms.includes(p.id) ? C.green : C.dim, marginTop: 2 }}>{connectedPlatforms.includes(p.id) ? "✓ Connected" : "Tap to connect"}</div></div>
                </div>
                <Toggle on={connectedPlatforms.includes(p.id)} onToggle={() => {}} />
              </div>
            ))}
          </div>
        )}
        {step === 4 && (
          <div className="fade-in">
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Step 5 of 5</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Set up your<br />AI assistant</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>Choose what spool handles on its own.</div>
            {AI_PERMISSIONS.map(p => (
              <div key={p.id} onClick={() => setAiPerms(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: aiPerms.includes(p.id) ? C.accentSoft : C.surface, border: `1px solid ${aiPerms.includes(p.id) ? C.accent + "22" : C.border}`, borderRadius: 14, marginBottom: 10, cursor: "pointer" }}>
                <div style={{ flex: 1, marginRight: 12 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{p.label}</div><div style={{ fontSize: 12, color: C.dim, marginTop: 3 }}>{p.sub}</div></div>
                <Toggle on={aiPerms.includes(p.id)} onToggle={() => {}} />
              </div>
            ))}
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 12, marginTop: 20 }}>AI TONE</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["friendly", "professional", "casual"].map(t => <div key={t} onClick={() => setAiTone(t)} style={{ flex: 1, padding: "11px", borderRadius: 12, background: aiTone === t ? C.accentSoft : C.surface, border: `1px solid ${aiTone === t ? C.accent : C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: aiTone === t ? C.accent : C.mid, cursor: "pointer", textTransform: "capitalize" }}>{t}</div>)}
            </div>
          </div>
        )}
        <div style={{ height: 120 }} />
      </div>
      <div style={{ padding: "16px 24px 36px", background: `linear-gradient(0deg,${C.bg} 80%,transparent)`, position: "sticky", bottom: 0, width: "100%", maxWidth: 640 }}>
        <BtnPrimary disabled={!canContinue()} onClick={() => step < totalSteps - 1 ? setStep(p => p + 1) : setDone(true)} style={{ width: "100%", padding: 16 }}>
          {step === totalSteps - 1 ? "Launch spool 🚀" : "Continue"}
        </BtnPrimary>
        {step === 0 && <div style={{ textAlign: "center", fontSize: 12, color: C.dim, marginTop: 12 }}>Takes less than 3 minutes</div>}
      </div>
    </div>
  );
}

// ── HOME ───────────────────────────────────────────────────────────────────────
function Home({ navigate, userRole, staffOwnerId }) {
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showAllAppts, setShowAllAppts] = useState(false);
  const [bizName, setBizName] = useState("");
  const [userName, setUserName] = useState("");
  const [appts, setAppts] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [stats, setStats] = useState({ weekRevenue: 0, todayCount: 0, aiHandled: 0, clientCount: 0 });
  const h = new Date().getHours();
  const greetText = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";

  const activity = (() => {
    const items = [];
    const recent = appts.filter(a => a.status === "confirmed").slice(0, 2);
    if (recent.length > 0) items.push({ text: `${recent[0].client_name || "Client"} booked ${recent[0].service}`, time: recent[0].time || "" });
    if (recent.length > 1) items.push({ text: `${recent[1].client_name || "Client"} booked ${recent[1].service}`, time: recent[1].time || "" });
    const cancelled = appts.filter(a => a.status === "cancelled").slice(0, 1);
    if (cancelled.length > 0) items.push({ text: `${cancelled[0].client_name || "Client"} cancelled ${cancelled[0].service}`, time: "" });
    if (items.length === 0) items.push({ text: "No recent activity yet — share your booking link to get started", time: "" });
    return items;
  })();

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = (userRole === "staff" && staffOwnerId) ? staffOwnerId : session.user.id;

      const [profRes, apptsRes, msgsRes, clientsRes] = await Promise.all([
        supabase.from("business_profiles").select("biz_name,logo_url,settings").eq("user_id", uid).single(),
        supabase.from("appointments").select("*").eq("owner_id", uid).order("created_at", { ascending: false }),
        supabase.from("messages").select("*").eq("owner_id", uid).order("created_at", { ascending: false }),
        supabase.from("clients").select("id").eq("owner_id", uid),
      ]);

      setBizName(profRes.data?.biz_name || session.user.user_metadata?.business_name || "");
      if (userRole === "staff" && staffOwnerId) {
        // Staff: get their own name from staff_profiles
        const { data: sp } = await supabase.from("staff_profiles").select("name").eq("user_id", session.user.id).single();
        setUserName(sp?.name || session.user.email?.split("@")[0] || "");
      } else {
        const dn = profRes.data?.settings?.displayName;
        setUserName(dn || session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "");
      }

      const allAppts = apptsRes.data || [];
      const allMsgs = msgsRes.data || [];
      setAppts(allAppts);
      setMsgs(allMsgs);

      const _dn = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const _mn = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const _now = new Date();
      const _ts = `${_dn[_now.getDay()]} ${_mn[_now.getMonth()]} ${_now.getDate()}`;
      const todayCount = allAppts.filter(a => a.day === _ts || a.day === "Today").length;
      const aiHandled = allMsgs.filter(m => m.handled).length;
      const clientCount = (clientsRes.data || []).length;

      // This week vs last week comparison
      const nowMs = Date.now();
      const oneWeek = 7 * 86400000;
      const thisWeekAppts = allAppts.filter(a => a.status === "confirmed" && a.created_at && (nowMs - new Date(a.created_at).getTime()) < oneWeek);
      const lastWeekAppts = allAppts.filter(a => a.status === "confirmed" && a.created_at && (nowMs - new Date(a.created_at).getTime()) >= oneWeek && (nowMs - new Date(a.created_at).getTime()) < oneWeek * 2);
      const thisWeekRev = thisWeekAppts.reduce((s, a) => s + (parseInt((a.price||"0").replace(/\D/g,""))||0), 0);
      const lastWeekRev = lastWeekAppts.reduce((s, a) => s + (parseInt((a.price||"0").replace(/\D/g,""))||0), 0);
      const revChange = lastWeekRev > 0 ? Math.round(((thisWeekRev - lastWeekRev) / lastWeekRev) * 100) : thisWeekRev > 0 ? 100 : 0;

      // Milestones
      const totalRev = allAppts.filter(a => a.status === "confirmed").reduce((s, a) => s + (parseInt((a.price||"0").replace(/\D/g,""))||0), 0);
      const totalAppts = allAppts.length;
      const milestones = [];
      if (clientCount >= 50 && clientCount < 55) milestones.push({ icon: "🎉", text: "50 clients! You're building something real." });
      if (clientCount >= 100 && clientCount < 105) milestones.push({ icon: "🔥", text: "100 clients! Your business is on fire." });
      if (totalRev >= 1000 && totalRev < 1100) milestones.push({ icon: "⬡", text: "$1,000 earned! First milestone unlocked." });
      if (totalRev >= 5000 && totalRev < 5200) milestones.push({ icon: "💎", text: "$5,000 earned! You're a pro." });
      if (totalRev >= 10000 && totalRev < 10500) milestones.push({ icon: "🚀", text: "$10,000 earned! Incredible growth." });
      if (totalAppts >= 100 && totalAppts < 105) milestones.push({ icon: "▣", text: "100 appointments! Consistency is key." });

      setStats({ weekRevenue: thisWeekRev, todayCount, aiHandled, clientCount, revChange, milestones, lastWeekRev });
    };
    load();
  }, []);

  const now = new Date();
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const todayStr = `${dayNames[now.getDay()]} ${monthNames[now.getMonth()]} ${now.getDate()}`;
  const unread = msgs.filter(m => m.unread);
  const todayAppts = appts.filter(a => a.day === todayStr || a.day === "Today");

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: "40px 20px 20px", background: "linear-gradient(180deg,rgba(139,92,246,0.08) 0%,transparent 100%)", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          <div>
            <div style={{ fontSize: 12, color: C.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6, fontWeight: 500 }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>{greetText},<br /><span style={{ background: `linear-gradient(135deg,${C.accent},#e0b3ff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{userName || "there"}</span></div>
          </div>
          <div style={{ position: "relative", cursor: "pointer" }} onClick={() => navigate("notifications")}>
            <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>⊕</div>
            {unread.length > 0 && <div style={{ position: "absolute", top: -4, right: -4, width: 20, height: 20, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", border: `2px solid ${C.bg}`, boxShadow: "0 0 12px rgba(139,92,246,0.4)" }}>{unread.length}</div>}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 24 }}>
          {[
            { label: "Revenue", value: "$" + stats.weekRevenue, sub: "this week", color: C.gold, icon: "⬡", ownerOnly: true },
            { label: "Appointments", value: String(stats.todayCount), sub: "today", color: C.text, icon: "▣" },
            { label: "AI handled", value: String(stats.aiHandled), sub: "messages", color: C.accent, icon: "✦", ownerOnly: true },
            { label: "Clients", value: String(stats.clientCount), sub: "total", color: C.green, icon: "⊡" },
          ].filter(s => userRole === "owner" || !s.ownerOnly).map((s, i) => (
            <Card key={i} style={{ padding: "14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{s.icon}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 1 }}>{s.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Revenue comparison */}
      {userRole === "owner" && (stats.revChange !== 0 || stats.lastWeekRev > 0) && (
        <div style={{ padding: "0 20px", marginBottom: 4 }}>
          <div style={{ background: stats.revChange >= 0 ? `${C.green}12` : `${C.red}12`, border: `1px solid ${stats.revChange >= 0 ? C.green : C.red}33`, borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 13, color: C.text }}>{stats.revChange >= 0 ? "↑" : "↓"} <span style={{ fontWeight: 700, color: stats.revChange >= 0 ? C.green : C.red }}>{Math.abs(stats.revChange)}%</span> vs last week</div>
            <div style={{ fontSize: 12, color: C.dim }}>Last week: ${stats.lastWeekRev || 0}</div>
          </div>
        </div>
      )}

      {/* Milestones */}
      {userRole === "owner" && stats.milestones && stats.milestones.length > 0 && (
        <div style={{ padding: "0 20px", marginBottom: 4 }}>
          {stats.milestones.map((m, i) => (
            <div key={i} style={{ background: `linear-gradient(135deg,${C.accentDark}18,${C.gold}12)`, border: `1px solid ${C.gold}33`, borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, animation: "fadeUp 0.5s ease" }}>
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{m.text}</div>
            </div>
          ))}
        </div>
      )}

      {/* Two column on desktop */}
      <div style={{ padding: "0 20px" }}>
        <div className="desktop-two-col">
          {/* Left col */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, marginTop: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2, textTransform: "uppercase" }}>Today's Schedule</span>
              <span style={{ fontSize: 11, color: C.accent, fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("schedule")}>See all →</span>
            </div>
            <Card style={{ padding: "4px 16px", marginBottom: 16 }}>
              {todayAppts.length === 0 ? (
                <div style={{ padding: "20px 0", textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: C.dim, marginBottom: 4 }}>No appointments today</div>
                  <div style={{ fontSize: 12, color: C.accent, cursor: "pointer" }} onClick={() => navigate("sharelink")}>Share your booking link →</div>
                </div>
              ) : todayAppts.slice(0, showAllAppts ? todayAppts.length : 3).map((a, i, arr) => (
                <div key={a.id} onClick={() => setSelectedAppt(a)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0 }}>{a.avatar}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{a.name}</div><div style={{ fontSize: 12, color: C.mid }}>{a.service}</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 600 }}>{a.time}</div><div style={{ fontSize: 11, color: a.status === "confirmed" ? C.green : C.yellow, marginTop: 3 }}>{a.status}</div></div>
                </div>
              ))}
              {todayAppts.length > 3 && (
                <div onClick={() => setShowAllAppts(p => !p)} style={{ textAlign: "center", padding: "10px 0", fontSize: 12, color: C.accent, fontWeight: 600, cursor: "pointer", borderTop: `1px solid ${C.border}` }}>
                  {showAllAppts ? "Show less ↑" : `See ${todayAppts.length - 3} more ↓`}
                </div>
              )}
            </Card>

            {unread.length > 0 && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Needs Attention</div>
                {unread.map(m => (
                  <Card key={m.id} style={{ padding: 14, marginBottom: 10, borderColor: "#f43f5e22", cursor: "pointer" }} onClick={() => navigate("inbox")}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>{m.platform === "whatsapp" ? <WA /> : <IG />}<span style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</span></div>
                      <span style={{ fontSize: 10, color: C.dim, marginLeft: "auto" }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: C.mid, marginBottom: 10 }}>"{m.preview}"</div>
                    <BtnPrimary onClick={() => navigate("inbox")} style={{ width: "100%", padding: 9, fontSize: 12 }}>Go to Inbox</BtnPrimary>
                  </Card>
                ))}
              </>
            )}
          </div>

          {/* Right col */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, marginTop: 8 }}>AI Activity</div>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 1.5, textTransform: "uppercase" }}>Live</span>
              </div>
              {activity.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 0", borderBottom: i < activity.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: C.mid, flex: 1 }}>{a.text}</span>
                  <span style={{ fontSize: 10, color: C.dim, flexShrink: 0 }}>{a.time}</span>
                </div>
              ))}
            </Card>

            {/* Quick actions - desktop only */}
            <div className="desktop-only">
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Quick Actions</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { icon: "＋", label: "New Appointment", screen: "schedule" },
                  { icon: "✉", label: "View Inbox", screen: "inbox" },
                  { icon: "⤴", label: "Booking Link", screen: "sharelink" },
                  { icon: "⊡", label: "Staff Chat", screen: "staff" },
                ].filter(i => userRole === 'owner' || i.screen !== 'sharelink').map(item => (
                  <Card key={item.screen} onClick={() => navigate(item.screen)} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only grid */}
        <div className="mobile-only" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
          {[
            { icon: "✦", label: "Services", screen: "services", color: C.accent, ownerOnly: true },
            { icon: "⬡", label: "Payments", screen: "payments", color: C.gold, ownerOnly: true },
            { icon: "⚙", label: "Settings", screen: "settings", color: C.mid },
            { icon: "♥", label: "Loyalty", screen: "loyalty", color: "#f472b6", ownerOnly: true },
            { icon: "◈", label: "Packages", screen: "packages", color: "#a78bfa", ownerOnly: true },
            { icon: "⟐", label: "Analytics", screen: "analytics", color: C.blue, ownerOnly: true },
            { icon: "⊛", label: "Promotions", screen: "promotions", color: "#fb923c", ownerOnly: true },
            { icon: "⊡", label: "Staff", screen: "staff", color: C.green },
            { icon: "◷", label: "Waitlist", screen: "waitlist", color: C.yellow, ownerOnly: true },
            { icon: "⤴", label: "Share Link", screen: "sharelink", color: C.accent, ownerOnly: true },
          ].filter(i => userRole === "owner" || !i.ownerOnly).map(item => (
            <Card key={item.screen} onClick={() => navigate(item.screen)} style={{ padding: "16px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: `${item.color}15`, border: `1px solid ${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</span>
            </Card>
          ))}
        </div>
      </div>

      {selectedAppt && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => setSelectedAppt(null)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 520, padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: C.accent }}>{selectedAppt.avatar}</div>
              <div><div style={{ fontSize: 18, fontWeight: 700 }}>{selectedAppt.name}</div><div style={{ fontSize: 13, color: C.mid, marginTop: 3 }}>{selectedAppt.service}</div></div>
            </div>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              {[["Day", formatDate(selectedAppt.day)], ["Time", selectedAppt.time], ["Price", selectedAppt.price], ["Status", selectedAppt.status], ["Note", selectedAppt.note]].filter(([,v]) => v).map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: k !== "Note" ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: C.mid }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: k === "Price" ? C.gold : k === "Status" ? (selectedAppt.status === "confirmed" ? C.green : C.yellow) : C.text }}>{v}</span>
                </div>
              ))}
            </Card>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { if (confirm(`Cancel this appointment and let ${selectedAppt.name} rebook?\n\nThis will mark the appointment as cancelled.`)) { supabase.from("appointments").update({ status: "cancelled" }).eq("id", selectedAppt.id).then(() => { setAppts(p => p.map(a => a.id === selectedAppt.id ? { ...a, status: "cancelled" } : a)); setSelectedAppt(null); }); } }} style={{ flex: 1, padding: 13, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Reschedule</button>
              <BtnPrimary onClick={() => { const msg = `Hi ${selectedAppt.name}! Just a reminder about your appointment tomorrow. See you then! 😊`; if (confirm(`Send this reminder?\n\n"${msg}"`)) { fetch("https://pocketflow-proxy-production.up.railway.app/send-reminder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_name: selectedAppt.name, client_phone: selectedAppt.client_phone || selectedAppt.phone, service: selectedAppt.service, date: selectedAppt.day, time: selectedAppt.time, biz_name: bizName }) }).then(() => alert("Reminder sent!")).catch(() => alert("Failed to send.")); } }} style={{ flex: 1, padding: 13 }}>Send Reminder</BtnPrimary>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="home" navigate={navigate} />
    </div>
  );
}

// ── SCHEDULE ───────────────────────────────────────────────────────────────────
function Schedule({ navigate, userRole, staffOwnerId }) {
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reminderSent, setReminderSent] = useState(null);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const oid = (userRole === "staff" && staffOwnerId) ? staffOwnerId : session.user.id;
      const { data } = await supabase.from("appointments").select("*").eq("owner_id", oid).order("created_at", { ascending: false });
      setAppts(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const _dn2 = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const _mn2 = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const _now2 = new Date();
  const _ts2 = `${_dn2[_now2.getDay()]} ${_mn2[_now2.getMonth()]} ${_now2.getDate()}`;

  // Generate next 7 day strings for date picker
  const dayChips = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return { label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : _dn2[d.getDay()], full: `${_dn2[d.getDay()]} ${_mn2[d.getMonth()]} ${d.getDate()}`, day: d.getDate() };
  });

  const filtered = appts.filter(a => {
    if (search && !a.client_name?.toLowerCase().includes(search.toLowerCase()) && !a.service?.toLowerCase().includes(search.toLowerCase())) return false;
    if (dateFilter !== "all") {
      if (dateFilter === "today") return a.day === _ts2 || a.day === "Today";
      return a.day === dateFilter;
    }
    return true;
  });

  const todayAppts = filtered.filter(a => a.day === _ts2 || a.day === "Today");
  const upcomingAppts = filtered.filter(a => a.day !== _ts2 && a.day !== "Today");
  const totalRevenue = appts.filter(a => a.status === "confirmed").reduce((s, a) => s + (parseInt((a.price||"0").replace(/\D/g,""))||0), 0);

  const ApptRow = ({ a, last, showDay }) => (
    <div onClick={() => setSelectedAppt(a)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: last ? "none" : `1px solid ${C.border}`, cursor: "pointer" }}>
      <div style={{ width: 42, height: 42, borderRadius: 13, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0 }}>{a.client_avatar || a.client_name?.slice(0,2).toUpperCase()}</div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{a.client_name}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{a.service} · {a.duration}{showDay ? ` · ${formatDate(a.day)}` : ""}</div></div>
      <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 600 }}>{a.time}</div><div style={{ fontSize: 12, color: C.gold, marginTop: 2, fontWeight: 600 }}>{a.price}</div></div>
    </div>
  );

  const EmptyState = ({ label }) => (
    <Card style={{ padding: 24, textAlign: "center" }}>
      <div style={{ width: 44, height: 44, borderRadius: 14, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 16, color: C.accent, fontWeight: 800 }}>▣</div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>No {label} appointments</div>
      <div style={{ fontSize: 12, color: C.dim }}>Share your booking link to start filling your schedule</div>
    </Card>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Schedule</div>
        </div>
        <div style={{ fontSize: 13, color: C.mid }}>{appts.length} appointments · ${totalRevenue} confirmed</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 14px" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.dim} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or service..." style={{ background: "none", border: "none", fontSize: 13, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", width: "100%", outline: "none" }} />
          {search && <div onClick={() => setSearch("")} style={{ fontSize: 16, color: C.dim, cursor: "pointer", flexShrink: 0 }}>×</div>}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 10, overflowX: "auto", paddingBottom: 4 }}>
          <div onClick={() => setDateFilter("all")} style={{ padding: "7px 14px", borderRadius: 10, background: dateFilter === "all" ? C.accentSoft : C.surface, border: `1px solid ${dateFilter === "all" ? C.accent : C.border}`, fontSize: 12, fontWeight: 600, color: dateFilter === "all" ? C.accent : C.mid, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>All</div>
          {dayChips.map(dc => (
            <div key={dc.full} onClick={() => setDateFilter(dc.label === "Today" ? "today" : dc.full)} style={{ padding: "7px 14px", borderRadius: 10, background: (dateFilter === "today" && dc.label === "Today") || dateFilter === dc.full ? C.accentSoft : C.surface, border: `1px solid ${(dateFilter === "today" && dc.label === "Today") || dateFilter === dc.full ? C.accent : C.border}`, fontSize: 12, fontWeight: 600, color: (dateFilter === "today" && dc.label === "Today") || dateFilter === dc.full ? C.accent : C.mid, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{dc.label}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {loading ? (
          <div style={{ padding: "16px 0" }}>{[1,2,3].map(i => <div key={i} style={{ height: 68, background: C.surface, borderRadius: 18, marginBottom: 10, animation: "shimmer 1.5s infinite", backgroundImage: `linear-gradient(90deg,${C.surface},${C.surfaceHigh},${C.surface})`, backgroundSize: "200% 100%" }} />)}</div>
        ) : (
          <>
            <SectionLabel>Today</SectionLabel>
            {todayAppts.length > 0
              ? <Card style={{ padding: "4px 16px", marginBottom: 8 }}>{todayAppts.map((a, i) => <ApptRow key={a.id} a={a} last={i === todayAppts.length - 1} />)}</Card>
              : <EmptyState label="today's" />}
            <SectionLabel>Upcoming</SectionLabel>
            {upcomingAppts.length > 0
              ? <Card style={{ padding: "4px 16px" }}>{upcomingAppts.map((a, i) => <ApptRow key={a.id} a={a} last={i === upcomingAppts.length - 1} showDay={true} />)}</Card>
              : <EmptyState label="upcoming" />}
          </>
        )}
      </div>
      {selectedAppt && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => { setSelectedAppt(null); setReminderSent(null); }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 520, padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: C.accent }}>{selectedAppt.client_avatar || selectedAppt.client_name?.slice(0,2).toUpperCase()}</div>
              <div><div style={{ fontSize: 18, fontWeight: 700 }}>{selectedAppt.client_name}</div><div style={{ fontSize: 13, color: C.mid }}>{selectedAppt.service}</div></div>
            </div>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              {[["Day", formatDate(selectedAppt.day)], ["Time", selectedAppt.time], ["Duration", selectedAppt.duration], ["Price", selectedAppt.price], ["Phone", formatPhone(selectedAppt.client_phone)], ["Status", selectedAppt.status], ["Note", selectedAppt.note]].filter(([,v]) => v).map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: k !== "Note" ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: C.mid }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: k === "Price" ? C.gold : k === "Status" ? (selectedAppt.status === "confirmed" ? C.green : C.yellow) : C.text, textTransform: "capitalize" }}>{v}</span>
                </div>
              ))}
            </Card>
            {/* Add to Google Calendar */}
            {(() => {
              const a = selectedAppt;
              if (!a.day || !a.time) return null;
              try {
                const months = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
                const parts = a.day.split(" ");
                const month = months[parts[1]]; const day = parseInt(parts[2]);
                const year = new Date().getFullYear();
                const timeParts = a.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
                if (!timeParts) return null;
                let hour = parseInt(timeParts[1]); const min = timeParts[2];
                if (timeParts[3].toUpperCase() === "PM" && hour !== 12) hour += 12;
                if (timeParts[3].toUpperCase() === "AM" && hour === 12) hour = 0;
                const start = new Date(year, month, day, hour, parseInt(min));
                const end = new Date(start.getTime() + 60 * 60 * 1000);
                const fmt = d => d.toISOString().replace(/[-:]/g,"").split(".")[0] + "Z";
                const title = encodeURIComponent(`${a.service} — ${a.client_name}`);
                const details = encodeURIComponent(`Client: ${a.client_name}
Phone: ${a.client_phone || ""}
Price: ${a.price || ""}`);
                const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}`;
                return (
                  <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 0", borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, fontSize: 13, fontWeight: 700, color: C.text, textDecoration: "none", marginBottom: 10 }}>
                    📅 Add to Google Calendar
                  </a>
                );
              } catch { return null; }
            })()}
            {reminderSent === "sent"
              ? <div style={{ padding: 13, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 14, fontSize: 14, fontWeight: 600, color: C.green, textAlign: "center" }}>✓ Reminder sent!</div>
              : reminderSent === "sending"
              ? <div style={{ padding: 13, background: C.accentSoft, borderRadius: 14, fontSize: 14, fontWeight: 600, color: C.accent, textAlign: "center" }}>Sending reminder...</div>
              : selectedAppt.status === "cancelled"
              ? <div style={{ padding: 13, background: `${C.red}12`, border: `1px solid ${C.red}33`, borderRadius: 14, fontSize: 14, fontWeight: 600, color: C.red, textAlign: "center" }}>This appointment was cancelled</div>
              : <>
                  <BtnPrimary onClick={async () => {
                    setReminderSent("sending");
                    try {
                      await fetch("https://pocketflow-proxy-production.up.railway.app/send-reminder", {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          client_name: selectedAppt.client_name,
                          client_phone: selectedAppt.client_phone || "",
                          service: selectedAppt.service,
                          date: selectedAppt.day,
                          time: selectedAppt.time,
                          biz_name: "your business",
                        }),
                      });
                    } catch {}
                    setReminderSent("sent");
                  }} style={{ width: "100%", padding: 13, marginBottom: 8 }}>Send Reminder</BtnPrimary>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={async () => {
                      await supabase.from("appointments").update({ status: "cancelled" }).eq("id", selectedAppt.id);
                      setAppts(p => p.map(a => a.id === selectedAppt.id ? { ...a, status: "cancelled" } : a));
                      setSelectedAppt(null);
                    }} style={{ flex: 1, padding: 12, background: "transparent", border: `1px solid ${C.red}44`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.red, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Cancel Appointment</button>
                    <button onClick={async () => {
                      if (!window.confirm("Permanently delete this appointment?")) return;
                      await supabase.from("appointments").delete().eq("id", selectedAppt.id);
                      setAppts(p => p.filter(a => a.id !== selectedAppt.id));
                      setSelectedAppt(null);
                    }} style={{ padding: "12px 16px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.dim, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Delete</button>
                  </div>
                </>}
          </div>
        </div>
      )}
      <BottomNav active="schedule" navigate={navigate} />
    </div>
  );
}

// ── INBOX ──────────────────────────────────────────────────────────────────────
function Inbox({ navigate, userRole, staffOwnerId }) {
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const unread = msgs.filter(m => m.unread);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const oid = (userRole === "staff" && staffOwnerId) ? staffOwnerId : session.user.id;
      const { data } = await supabase.from("messages").select("*").eq("owner_id", oid).order("created_at", { ascending: false });
      setMsgs(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleAI = async (m) => {
    try {
      const res = await fetch("https://pocketflow-proxy-production.up.railway.app/reply-message", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message_id: m.id, sender_id: m.sender_id, platform: m.platform, reply_text: "Hey! Thanks for reaching out! Let me check on that and get back to you shortly." }),
      });
      const data = await res.json();
      await supabase.from("messages").update({ handled: true, unread: false, reply: "Hey! Thanks for reaching out! Let me check on that and get back to you shortly." }).eq("id", m.id);
      setMsgs(p => p.map(x => x.id === m.id ? { ...x, handled: true, unread: false, reply: "Hey! Thanks for reaching out! Let me check on that and get back to you shortly." } : x));
    } catch {
      await supabase.from("messages").update({ handled: true, unread: false, reply: "Auto-reply sent" }).eq("id", m.id);
      setMsgs(p => p.map(x => x.id === m.id ? { ...x, handled: true, unread: false, reply: "Auto-reply sent" } : x));
    }
  };

  const handleManualReply = async (m) => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await fetch("https://pocketflow-proxy-production.up.railway.app/reply-message", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message_id: m.id, sender_id: m.sender_id, platform: m.platform, reply_text: replyText.trim() }),
      });
    } catch {}
    await supabase.from("messages").update({ handled: true, unread: false, reply: replyText.trim() }).eq("id", m.id);
    setMsgs(p => p.map(x => x.id === m.id ? { ...x, handled: true, unread: false, reply: replyText.trim() } : x));
    setReplyingTo(null); setReplyText(""); setSending(false);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Inbox</div>
        </div>
        <div style={{ fontSize: 13, color: C.mid }}>AI handled {msgs.filter(m => m.handled).length} of {msgs.length} messages</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {loading ? (
          <div style={{ padding: "16px 0" }}>{[1,2,3].map(i => <div key={i} style={{ height: 68, background: C.surface, borderRadius: 18, marginBottom: 10, animation: "shimmer 1.5s infinite", backgroundImage: `linear-gradient(90deg,${C.surface},${C.surfaceHigh},${C.surface})`, backgroundSize: "200% 100%" }} />)}</div>
        ) : msgs.length === 0 ? (
          <Card style={{ padding: 32, textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>✉</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Inbox</div>
            <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.7 }}>Messages from clients will appear here.<br/>Connect WhatsApp or Instagram in Settings to start receiving messages automatically.</div>
            <BtnPrimary onClick={() => navigate("connections")} style={{ padding: "10px 24px", fontSize: 13, marginTop: 16 }}>Connect Accounts</BtnPrimary>
          </Card>
        ) : (
          <>
            {unread.length > 0 && <div style={{ background: "#f43f5e11", border: "1px solid #f43f5e22", borderRadius: 12, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#f87171", fontWeight: 500 }}>⚠ {unread.length} message{unread.length > 1 ? "s" : ""} need your input</div>}
            {msgs.map(m => (
              <Card key={m.id} style={{ padding: 16, marginBottom: 12, borderColor: m.unread ? "#f43f5e22" : C.border }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  {m.unread && <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.red, flexShrink: 0 }} />}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {m.platform === "whatsapp" ? <WA /> : <IG />}
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</span>
                  </div>
                  <span style={{ fontSize: 11, color: C.dim, marginLeft: "auto" }}>{timeAgo(m.created_at)}</span>
                </div>
                <div style={{ fontSize: 13, color: C.mid, marginBottom: m.handled ? 12 : 0, lineHeight: 1.5 }}>"{m.preview}"</div>
                {m.handled ? (
                  <div style={{ background: "#10b98111", border: "1px solid #10b98122", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: C.green, fontWeight: 700, marginBottom: 6 }}>✓ AI AUTO-REPLIED</div>
                    <div style={{ fontSize: 12, color: "#6ee7b7", lineHeight: 1.5 }}>{m.reply}</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <BtnPrimary onClick={() => handleAI(m)} style={{ flex: 1, padding: 10, fontSize: 12 }}>AI Reply</BtnPrimary>
                      <button onClick={() => { setReplyingTo(replyingTo === m.id ? null : m.id); setReplyText(""); }} style={{ flex: 1, padding: 10, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 12, fontWeight: 600, color: replyingTo === m.id ? C.accent : C.mid, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>{replyingTo === m.id ? "Cancel" : "Reply"}</button>
                    </div>
                    {replyingTo === m.id && (
                      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                        <input value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === "Enter" && handleManualReply(m)} placeholder="Type your reply..." style={{ flex: 1, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px", fontSize: 13, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
                        <BtnPrimary disabled={!replyText.trim() || sending} onClick={() => handleManualReply(m)} style={{ padding: "10px 16px", fontSize: 12 }}>{sending ? "..." : "Send"}</BtnPrimary>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </>
        )}
      </div>
      <BottomNav active="inbox" navigate={navigate} />
    </div>
  );
}

// ── NOTE TAB (stateful sub-component for client notes) ─────────────────────────
function NoteTab({ client, onNoteUpdate }) {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!note.trim()) return;
    setSaving(true);
    const { error } = await supabase
      .from("clients")
      .update({ note: (client.note ? client.note + "\n\n" : "") + note })
      .eq("id", client.id);
    setSaving(false);
    if (!error) {
      setSaved(true);
      if (onNoteUpdate) onNoteUpdate(note);
      setNote("");
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div>
      <Card style={{ padding: 16, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: C.accent, fontWeight: 700 }}>✦ AI MEMORY</div>
          {client.note && (
            <div onClick={async () => {
              const { error } = await supabase.from("clients").update({ note: "" }).eq("id", client.id);
              if (!error && onNoteUpdate) onNoteUpdate("__CLEAR__");
            }} style={{ fontSize: 11, color: C.red || "#ef4444", cursor: "pointer", fontWeight: 600 }}>Clear ✕</div>
          )}
        </div>
        <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.7 }}>{client.note || "No notes yet."}</div>
      </Card>
      <textarea
        placeholder="Add a private note..."
        rows={4}
        value={note}
        onChange={e => { setNote(e.target.value); setSaved(false); }}
        style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", resize: "none" }}
      />
      {saved
        ? <div style={{ width: "100%", padding: 13, marginTop: 10, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 14, fontSize: 14, fontWeight: 600, color: C.green, textAlign: "center" }}>✓ Note saved!</div>
        : <BtnPrimary onClick={handleSave} disabled={saving} style={{ width: "100%", padding: 13, marginTop: 10 }}>{saving ? "Saving..." : "Save Note"}</BtnPrimary>
      }
    </div>
  );
}

// ── CLIENTS ────────────────────────────────────────────────────────────────────
function Clients({ navigate, userRole, staffOwnerId }) {
  const isDesktop = useDesktop();
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState("history");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newInstagram, setNewInstagram] = useState("");
  const [adding, setAdding] = useState(false);
  const [clientAppts, setClientAppts] = useState([]);
  const [showImport, setShowImport] = useState(false);
  const [importRows, setImportRows] = useState([]);
  const [importStep, setImportStep] = useState("upload"); // upload, preview, done
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    const loadClients = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }
      const oid = (userRole === "staff" && staffOwnerId) ? staffOwnerId : session.user.id;
      const { data, error } = await supabase.from("clients").select("*").eq("owner_id", oid).order("created_at", { ascending: false });
      if (!error && data) {
        setClients(data.map(c => ({
          ...c,
          totalVisits: c.total_visits,
          totalSpent: "$" + (c.total_spent || 0),
          avgSpend: "$" + (c.total_visits > 0 ? Math.round(c.total_spent / c.total_visits) : 0),
          lastVisit: c.last_visit || "N/A",
        })));
      }
      setLoading(false);
    };
    loadClients();
  }, []);

  const addClient = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setAdding(false); return; }
    const avatar = newName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    const { data, error } = await supabase.from("clients").insert([{
      name: newName, phone: newPhone, instagram: newInstagram,
      avatar, total_visits: 0, total_spent: 0,
      joined: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      owner_id: (userRole === "staff" && staffOwnerId) ? staffOwnerId : session.user.id,
    }]).select();
    if (!error && data) {
      setClients(p => [{ ...data[0], totalVisits: 0, totalSpent: "$0", avgSpend: "$0", lastVisit: "N/A" }, ...p]);
    }
    setNewName(""); setNewPhone(""); setNewInstagram("");
    setAdding(false); setShowAdd(false);
  };

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const selectClient = async (c) => {
    setSelectedClient(c);
    setActiveTab("history");
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { data } = await supabase.from("appointments").select("service,day,time,price,status,created_at").eq("owner_id", (userRole === "staff" && staffOwnerId) ? staffOwnerId : session.user.id).eq("client_name", c.name).order("created_at", { ascending: false }).limit(20);
    setClientAppts(data || []);
  };

  if (selectedClient) return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(180deg,#16103a,${C.bg})`, padding: "48px 24px 24px", textAlign: "center" }}>
        <div onClick={() => setSelectedClient(null)} style={{ position: "absolute", top: 52, left: 20, width: 38, height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </div>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: C.accent, margin: "0 auto 12px" }}>{selectedClient.avatar}</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 800 }}>{selectedClient.name}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
          {selectedClient.badge && <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, background: "#f59e0b18", border: "1px solid #f59e0b33", borderRadius: 100, padding: "3px 10px" }}>{selectedClient.badge}</span>}
          <span style={{ fontSize: 11, color: C.mid, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 100, padding: "3px 10px" }}>Since {selectedClient.joined}</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, padding: "16px 20px" }}>
        {[{ label: "Visits", value: selectedClient.totalVisits }, { label: "Paid", value: selectedClient.totalSpent }, { label: "Owed", value: "$" + (selectedClient.amount_owed || 0) }, { label: "Balance", value: "$" + ((selectedClient.total_spent || 0) - (selectedClient.amount_owed || 0)) }].map((s, i) => (
          <Card key={i} style={{ padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 800, color: i === 1 ? C.green : i === 2 ? C.red : i === 3 ? C.gold : C.text }}>{s.value}</div>
            <div style={{ fontSize: 9, color: C.dim, marginTop: 3 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "flex", padding: "0 20px", gap: 6, marginBottom: 20 }}>
        {["history", "financials", "notes", "contact"].map(t => (
          <div key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "10px", borderRadius: 12, background: activeTab === t ? C.accentSoft : C.surface, border: `1px solid ${activeTab === t ? C.accent : C.border}`, textAlign: "center", fontSize: 12, fontWeight: 600, color: activeTab === t ? C.accent : C.mid, cursor: "pointer", textTransform: "capitalize" }}>{t}</div>
        ))}
      </div>
      <div style={{ padding: "0 20px" }}>
        {activeTab === "financials" && (
          <div>
            <Card style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, color: C.mid }}>Total amount</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>${(selectedClient.total_amount || selectedClient.total_spent || 0)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, color: C.mid }}>Amount paid</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>${(selectedClient.amount_paid || selectedClient.total_spent || 0)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ fontSize: 13, color: C.mid }}>Amount owed</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: (selectedClient.amount_owed || 0) > 0 ? C.red : C.green }}>${(selectedClient.amount_owed || 0)}</span>
              </div>
            </Card>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button onClick={async () => {
                const val = prompt("Enter payment amount received:");
                if (!val || isNaN(val)) return;
                const amount = parseFloat(val);
                const newPaid = (selectedClient.amount_paid || selectedClient.total_spent || 0) + amount;
                const newOwed = Math.max(0, (selectedClient.amount_owed || 0) - amount);
                await supabase.from("clients").update({ amount_paid: newPaid, amount_owed: newOwed }).eq("id", selectedClient.id);
                setSelectedClient(p => ({ ...p, amount_paid: newPaid, amount_owed: newOwed, total_spent: newPaid }));
                setClients(p => p.map(c => c.id === selectedClient.id ? { ...c, amount_paid: newPaid, amount_owed: newOwed, total_spent: newPaid, totalSpent: "$" + newPaid } : c));
              }} style={{ flex: 1, padding: 12, background: `${C.green}15`, border: `1px solid ${C.green}33`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.green, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>+ Add Payment</button>
              <button onClick={async () => {
                const val = prompt("Enter amount owed/charged:");
                if (!val || isNaN(val)) return;
                const amount = parseFloat(val);
                const totalAmt = (selectedClient.total_amount || selectedClient.total_spent || 0) + amount;
                const newOwed = (selectedClient.amount_owed || 0) + amount;
                await supabase.from("clients").update({ total_amount: totalAmt, amount_owed: newOwed }).eq("id", selectedClient.id);
                setSelectedClient(p => ({ ...p, total_amount: totalAmt, amount_owed: newOwed }));
                setClients(p => p.map(c => c.id === selectedClient.id ? { ...c, total_amount: totalAmt, amount_owed: newOwed } : c));
              }} style={{ flex: 1, padding: 12, background: `${C.red}12`, border: `1px solid ${C.red}33`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.red, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>+ Add Charge</button>
            </div>
            <div style={{ fontSize: 11, color: C.dim, textAlign: "center" }}>Tip: Tell the AI "update Mohammed's balance" and it can help manage financials</div>
          </div>
        )}
        {activeTab === "history" && (
          clientAppts.length === 0 ? (
            <Card style={{ padding: "32px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 13, color: C.dim }}>No appointment history yet</div>
            </Card>
          ) : (
            <Card>
              {clientAppts.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: i < clientAppts.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: h.status === "pending" ? C.yellow : h.status === "confirmed" ? C.green : h.status === "cancelled" ? C.red : C.green, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{h.service}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{formatDate(h.day)} · {h.time}</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{h.price}</div><div style={{ fontSize: 10, color: h.status === "confirmed" ? C.green : h.status === "cancelled" ? C.red : C.yellow, marginTop: 3, textTransform: "capitalize" }}>{h.status}</div></div>
                </div>
              ))}
            </Card>
          )
        )}
        {activeTab === "notes" && <NoteTab client={selectedClient} onNoteUpdate={(note) => setSelectedClient(p => ({ ...p, note: note === "__CLEAR__" ? "" : (p.note ? p.note + "\n\n" : "") + note }))} />}
        {activeTab === "contact" && (
          <div>
            <Card>
              {[["Phone", formatPhone(selectedClient.phone)], ["Instagram", selectedClient.instagram], ["Last visit", selectedClient.lastVisit]].map(([label, val], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: C.dim }}>{label}</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{val || "—"}</div></div>
                </div>
              ))}
            </Card>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => {
                const newName = prompt("Edit name:", selectedClient.name);
                if (newName && newName.trim()) {
                  supabase.from("clients").update({ name: newName.trim() }).eq("id", selectedClient.id).then(() => {
                    setSelectedClient(p => ({ ...p, name: newName.trim() }));
                    setClients(p => p.map(c => c.id === selectedClient.id ? { ...c, name: newName.trim() } : c));
                  });
                }
              }} style={{ flex: 1, padding: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.text, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Edit Client</button>
              <button onClick={async () => {
                if (!window.confirm(`Delete ${selectedClient.name}? This cannot be undone.`)) return;
                await supabase.from("clients").delete().eq("id", selectedClient.id);
                setClients(p => p.filter(c => c.id !== selectedClient.id));
                setSelectedClient(null);
              }} style={{ padding: "12px 16px", background: "transparent", border: `1px solid ${C.red}44`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.red, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Delete</button>
            </div>
          </div>
        )}
      </div>
      <BottomNav active="clients" navigate={navigate} />
    </div>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BackBtn onBack={() => navigate("home")} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Clients</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setShowImport(true); setImportStep("upload"); setImportRows([]); }} style={{ padding: "9px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Import</button>
            <BtnPrimary onClick={() => setShowAdd(true)} style={{ padding: "9px 16px", fontSize: 13 }}>+ Add</BtnPrimary>
          </div>
        </div>
        <div style={{ fontSize: 13, color: C.mid }}>{clients.length} total clients</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: isDesktop ? "grid" : "block", gridTemplateColumns: isDesktop ? "340px 1fr" : undefined, gap: isDesktop ? 24 : undefined, alignItems: "start" }}>
        <div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.dim} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." style={{ background: "none", border: "none", fontSize: 13, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", width: "100%" }} />
        </div>
        {loading ? (
          <div style={{ padding: "16px 0" }}>{[1,2,3].map(i => <div key={i} style={{ height: 68, background: C.surface, borderRadius: 18, marginBottom: 10, animation: "shimmer 1.5s infinite", backgroundImage: `linear-gradient(90deg,${C.surface},${C.surfaceHigh},${C.surface})`, backgroundSize: "200% 100%" }} />)}</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: C.mid }}>No clients found</div>
        ) : <div style={{ background: "rgba(14,14,22,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}>{filtered.map((c, idx) => (
          <div key={c.id} onClick={() => selectClient(c)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", cursor: "pointer", borderBottom: idx < filtered.length - 1 ? `1px solid ${C.border}` : "none", background: selectedClient?.id === c.id ? C.accentSoft : "transparent", borderRadius: idx === 0 ? "14px 14px 0 0" : idx === filtered.length - 1 ? "0 0 14px 14px" : 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accentSoft, border: `1px solid ${C.accentSoft}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0 }}>{c.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                {c.badge && <span style={{ fontSize: 9, fontWeight: 700, color: C.gold, background: "#f59e0b18", border: "1px solid #f59e0b33", borderRadius: 100, padding: "1px 6px", flexShrink: 0 }}>{c.badge}</span>}
              </div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 1 }}>{c.totalVisits} visits</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, flexShrink: 0 }}>{c.totalSpent}</div>
          </div>
        ))}
        </div>}
        </div>{/* end col 1 */}
        {isDesktop && (
          <div style={{ position: "sticky", top: 80 }}>
            {selectedClient ? (
              <Card style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(180deg,#16103a,#0d0d1a)", padding: "28px 24px 20px", textAlign: "center" }}>
                  <div style={{ width: 70, height: 70, borderRadius: 22, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: C.accent, margin: "0 auto 10px" }}>{selectedClient.avatar}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontWeight: 800 }}>{selectedClient.name}</div>
                  <div style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>Since {selectedClient.joined}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderBottom: `1px solid ${C.border}` }}>
                  {[{ label: "Visits", value: selectedClient.totalVisits }, { label: "Spent", value: selectedClient.totalSpent }, { label: "Avg", value: selectedClient.avgSpend }].map((s, i) => (
                    <div key={i} style={{ padding: "14px 10px", textAlign: "center", borderRight: i < 2 ? `1px solid ${C.border}` : "none" }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 800, color: i === 1 ? C.gold : C.text }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: C.dim, marginTop: 3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {["history", "notes", "contact"].map(t => (
                      <div key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "8px", borderRadius: 10, background: activeTab === t ? C.accentSoft : C.surfaceHigh, border: `1px solid ${activeTab === t ? C.accent : C.borderHigh}`, textAlign: "center", fontSize: 12, fontWeight: 600, color: activeTab === t ? C.accent : C.mid, cursor: "pointer", textTransform: "capitalize" }}>{t}</div>
                    ))}
                  </div>
                  {activeTab === "contact" && (
                    <div>
                      {[["◎", "Phone", formatPhone(selectedClient.phone)], ["📸", "Instagram", selectedClient.instagram], ["📅", "Last visit", selectedClient.lastVisit]].map(([icon, label, val], i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                          <span style={{ fontSize: 16 }}>{icon}</span>
                          <div><div style={{ fontSize: 11, color: C.dim }}>{label}</div><div style={{ fontSize: 13, fontWeight: 600, marginTop: 1 }}>{val || "—"}</div></div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "notes" && <NoteTab client={selectedClient} onNoteUpdate={(note) => setSelectedClient(p => ({ ...p, note: note === "__CLEAR__" ? "" : (p.note ? p.note + "\n\n" : "") + note }))} />}
                  {activeTab === "history" && selectedClient.appointmentHistory && selectedClient.appointmentHistory.length === 0 && (
                    <div style={{ textAlign: "center", padding: "20px 0", color: C.dim, fontSize: 13 }}>No appointment history yet</div>
                  )}
                </div>
              </Card>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 20px", color: C.dim }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>👤</div>
                <div style={{ fontSize: 14 }}>Select a client to view details</div>
              </div>
            )}
          </div>
        )}
        </div>{/* end grid */}
      </div>

      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Add New Client</div>
            <input placeholder="Full name *" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="(555) 123-4567" type="tel" value={newPhone} onChange={e => setNewPhone(handlePhoneInput(e.target.value))} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="Instagram handle" value={newInstagram} onChange={e => setNewInstagram(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 20 }} />
            <BtnPrimary disabled={!newName || adding} onClick={addClient} style={{ width: "100%", padding: 14 }}>{adding ? "Adding..." : "Add Client"}</BtnPrimary>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImport && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => setShowImport(false)}>
          <div style={{ background: C.surfaceSolid, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 560, padding: "24px 20px 32px", maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />

            {importStep === "done" ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16, animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>✓</div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Import Complete</div>
                <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>All client data has been imported and matched.</div>
                <BtnPrimary onClick={() => { setShowImport(false); window.location.reload(); }} style={{ width: "100%", padding: 14 }}>Done</BtnPrimary>
              </div>
            ) : importStep === "preview" ? (
              <>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Review Import</div>
                <div style={{ fontSize: 13, color: C.mid, marginBottom: 16 }}>{importRows.length} rows found. Match them to existing clients or create new ones.</div>
                {importRows.map((row, i) => {
                  const match = clients.find(c => c.name.toLowerCase().trim() === (row.name || "").toLowerCase().trim());
                  const similar = !match ? clients.find(c => {
                    const a = c.name.toLowerCase().split(" ");
                    const b = (row.name || "").toLowerCase().split(" ");
                    return a.some(w => b.includes(w) && w.length > 2);
                  }) : null;
                  return (
                    <div key={i} style={{ background: C.surface, border: `1px solid ${match ? C.green + "44" : similar ? C.gold + "44" : C.border}`, borderRadius: 14, padding: 14, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{row.name || "Unknown"}</div>
                          <div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>
                            {row.total ? `Total: $${row.total}` : ""}{row.paid ? ` · Paid: $${row.paid}` : ""}{row.owed ? ` · Owed: $${row.owed}` : ""}
                          </div>
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 12, background: match ? `${C.green}18` : similar ? `${C.gold}18` : C.accentSoft, color: match ? C.green : similar ? C.gold : C.accent }}>
                          {match ? "✓ Matched" : similar ? "~ Similar" : "+ New"}
                        </div>
                      </div>
                      {match && <div style={{ fontSize: 11, color: C.green }}>Will merge into: {match.name}</div>}
                      {similar && !row._linkedTo && (
                        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                          <button onClick={() => { setImportRows(p => p.map((r, j) => j === i ? { ...r, _linkedTo: similar.id, _linkedName: similar.name } : r)); }} style={{ flex: 1, padding: 8, background: `${C.gold}15`, border: `1px solid ${C.gold}33`, borderRadius: 10, fontSize: 11, fontWeight: 600, color: C.gold, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Connect to {similar.name}</button>
                          <button onClick={() => { setImportRows(p => p.map((r, j) => j === i ? { ...r, _linkedTo: "new" } : r)); }} style={{ flex: 1, padding: 8, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 11, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Create New</button>
                        </div>
                      )}
                      {row._linkedTo && row._linkedTo !== "new" && <div style={{ fontSize: 11, color: C.gold, marginTop: 4 }}>→ Connected to: {row._linkedName}</div>}
                      {row._linkedTo === "new" && <div style={{ fontSize: 11, color: C.accent, marginTop: 4 }}>→ Will create as new client</div>}
                    </div>
                  );
                })}
                <BtnPrimary disabled={importing} onClick={async () => {
                  setImporting(true);
                  const { data: { session } } = await supabase.auth.getSession();
                  if (!session) { setImporting(false); return; }
                  const oid = (userRole === "staff" && staffOwnerId) ? staffOwnerId : session.user.id;

                  for (const row of importRows) {
                    const name = (row.name || "").trim();
                    if (!name) continue;
                    const total = parseFloat(row.total) || 0;
                    const paid = parseFloat(row.paid) || 0;
                    const owed = parseFloat(row.owed) || (total - paid);

                    // Find match
                    const exactMatch = clients.find(c => c.name.toLowerCase().trim() === name.toLowerCase());
                    const linkedId = row._linkedTo && row._linkedTo !== "new" ? row._linkedTo : null;
                    const target = exactMatch || (linkedId ? clients.find(c => c.id === linkedId) : null);

                    if (target) {
                      // Merge into existing
                      await supabase.from("clients").update({
                        total_amount: (target.total_amount || target.total_spent || 0) + total,
                        amount_paid: (target.amount_paid || target.total_spent || 0) + paid,
                        amount_owed: (target.amount_owed || 0) + owed,
                        total_spent: (target.total_spent || 0) + paid,
                      }).eq("id", target.id);
                    } else {
                      // Create new client
                      const avatar = name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase();
                      await supabase.from("clients").insert([{
                        name, avatar, owner_id: oid,
                        total_amount: total, amount_paid: paid, amount_owed: owed,
                        total_spent: paid, total_visits: 0,
                        joined: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
                      }]);
                    }
                  }
                  setImporting(false);
                  setImportStep("done");
                }} style={{ width: "100%", padding: 14, marginTop: 12 }}>{importing ? "Importing..." : `Import ${importRows.length} Rows`}</BtnPrimary>
              </>
            ) : (
              <>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Import Clients</div>
                <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>Upload a CSV or Excel file with client names and financial data</div>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 12 }}>
                  Expected columns: <span style={{ color: C.accent }}>Name</span>, <span style={{ color: C.accent }}>Total</span>, <span style={{ color: C.accent }}>Paid</span>, <span style={{ color: C.accent }}>Owed</span> (or any similar headers)
                </div>
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px", background: C.surface, border: `2px dashed ${C.borderHigh}`, borderRadius: 16, cursor: "pointer", marginBottom: 16 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>↑</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Choose file</div>
                  <div style={{ fontSize: 12, color: C.dim }}>CSV, TSV, or Excel (.xlsx)</div>
                  <input type="file" accept=".csv,.tsv,.xlsx,.xls" style={{ display: "none" }} onChange={async e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const text = await file.text();
                    // Parse CSV/TSV
                    const sep = text.includes("\t") ? "\t" : ",";
                    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
                    if (lines.length < 2) { alert("File needs at least a header row and one data row."); return; }
                    const headers = lines[0].split(sep).map(h => h.replace(/"/g, "").trim().toLowerCase());
                    // Find column indices
                    const nameCol = headers.findIndex(h => h.includes("name") || h.includes("client") || h.includes("customer"));
                    const totalCol = headers.findIndex(h => h.includes("total") || h.includes("amount") || h.includes("balance"));
                    const paidCol = headers.findIndex(h => h.includes("paid") || h.includes("received") || h.includes("payment"));
                    const owedCol = headers.findIndex(h => h.includes("owed") || h.includes("remaining") || h.includes("left") || h.includes("due") || h.includes("unpaid"));
                    if (nameCol < 0) { alert("Couldn't find a 'Name' column. Make sure your file has a header row with 'Name', 'Client', or 'Customer'."); return; }
                    const rows = lines.slice(1).map(line => {
                      const cols = line.split(sep).map(c => c.replace(/"/g, "").trim());
                      return {
                        name: cols[nameCol] || "",
                        total: totalCol >= 0 ? cols[totalCol]?.replace(/[^0-9.]/g, "") : "",
                        paid: paidCol >= 0 ? cols[paidCol]?.replace(/[^0-9.]/g, "") : "",
                        owed: owedCol >= 0 ? cols[owedCol]?.replace(/[^0-9.]/g, "") : "",
                      };
                    }).filter(r => r.name);
                    setImportRows(rows);
                    setImportStep("preview");
                  }} />
                </label>
                <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.7, textAlign: "center" }}>
                  Save your Excel file as CSV first if it's .xlsx<br/>
                  The AI will auto-match names to existing clients
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <BottomNav active="clients" navigate={navigate} />
    </div>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
function Services({ navigate }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", duration: "", desc: "", icon: "✦", active: true, category: "Standard" });
  const [generatingDesc, setGeneratingDesc] = useState(false);
  const [userId, setUserId] = useState(null);
  const [filterCat, setFilterCat] = useState("All");

  const CATEGORIES = ["Standard", "Premium", "Package", "Consultation", "Add-on", "Other"];
  const DURATIONS = ["30m","45m","1h","1.5h","2h","2.5h","3h","3.5h","4h","4.5h","5h","5.5h","6h"];

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      const { data } = await supabase.from("services").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: true });
      setServices(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const resetForm = () => setForm({ name: "", price: "", duration: "", desc: "", icon: "✦", active: true, category: "Standard" });

  const openAdd = () => { resetForm(); setEditingId(null); setShowAdd(true); };
  const openEdit = (s) => { setForm({ name: s.name, price: String(s.price), duration: s.duration, desc: s.description || "", icon: s.icon || "✦", active: s.active !== false, category: s.category || "Hair" }); setEditingId(s.id); setShowAdd(true); };

  const saveService = async () => {
    if (!form.name.trim() || !form.price || !form.duration) return;
    setSaving(true);
    if (editingId) {
      const { data } = await supabase.from("services").update({ name: form.name.trim(), price: parseFloat(form.price), duration: form.duration, description: form.desc.trim(), icon: form.icon, active: form.active, category: form.category }).eq("id", editingId).select().single();
      if (data) setServices(p => p.map(s => s.id === editingId ? data : s));
    } else {
      const { data } = await supabase.from("services").insert({ owner_id: userId, name: form.name.trim(), price: parseFloat(form.price), duration: form.duration, description: form.desc.trim(), icon: form.icon, active: form.active, category: form.category }).select().single();
      if (data) setServices(p => [...p, data]);
    }
    setSaving(false);
    setShowAdd(false);
    resetForm();
  };

  const deleteService = async (id) => {
    await supabase.from("services").delete().eq("id", id);
    setServices(p => p.filter(s => s.id !== id));
  };

  const toggleActive = async (s) => {
    const newVal = !s.active;
    await supabase.from("services").update({ active: newVal }).eq("id", s.id);
    setServices(p => p.map(x => x.id === s.id ? { ...x, active: newVal } : x));
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BackBtn onBack={() => navigate("settings")} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Services</div>
          </div>
          <BtnPrimary onClick={openAdd} style={{ padding: "9px 18px", fontSize: 13 }}>+ Add</BtnPrimary>
        </div>
        <div style={{ fontSize: 13, color: C.dim, marginTop: 6, paddingLeft: 44 }}>These appear on your booking page</div>
      </div>

      <div style={{ padding: "0 20px" }}>
        {loading ? (
          <div style={{ padding: "16px 0" }}>{[1,2,3].map(i => <div key={i} style={{ height: 76, background: C.surface, borderRadius: 18, marginBottom: 10, animation: "shimmer 1.5s infinite", backgroundImage: `linear-gradient(90deg,${C.surface},${C.surfaceHigh},${C.surface})`, backgroundSize: "200% 100%" }} />)}</div>
        ) : services.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22, color: C.accent, fontWeight: 800 }}>✦</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>No services yet</div>
            <div style={{ fontSize: 13, color: C.dim, marginBottom: 24 }}>Add your services so clients can book from your page</div>
            <BtnPrimary onClick={openAdd} style={{ padding: "12px 28px" }}>Add Your First Service</BtnPrimary>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
              {["All", ...CATEGORIES].map(c => (
                <div key={c} onClick={() => setFilterCat(c)} style={{ padding: "7px 14px", borderRadius: 10, background: filterCat === c ? C.accentSoft : C.surface, border: `1px solid ${filterCat === c ? C.accent : C.border}`, fontSize: 12, fontWeight: 600, color: filterCat === c ? C.accent : C.mid, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{c}</div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: C.dim, fontWeight: 600, marginBottom: 12 }}>{services.filter(s => s.active !== false).length} active · {services.filter(s => s.active === false).length} hidden</div>
            {services.filter(s => filterCat === "All" || (s.category || "Standard") === filterCat).map((s, i) => (
              <Card key={s.id} style={{ padding: "16px", marginBottom: 10, opacity: s.active === false ? 0.5 : 1, transition: "opacity 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg,${C.accentDark}22,${C.accent}22)`, border: `1px solid ${C.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: C.accent, flexShrink: 0 }}>{(s.category || "S")[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700 }}>{s.name}</span>
                      <span style={{ fontSize: 10, color: C.dim, background: C.surfaceHigh, borderRadius: 10, padding: "2px 6px" }}>{s.category || "Hair"}</span>
                    </div>
                    {s.description && <div style={{ fontSize: 12, color: C.dim, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.description}</div>}
                    <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>${s.price}</span>
                      <span style={{ fontSize: 13, color: C.mid }}>· {s.duration}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <div onClick={() => openEdit(s)} style={{ width: 32, height: 32, borderRadius: 9, background: C.surfaceHigh, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, color: C.mid }}>✎</div>
                    <div onClick={() => deleteService(s.id)} style={{ width: 32, height: 32, borderRadius: 9, background: `${C.red}11`, border: `1px solid ${C.red}22`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, color: C.red }}>✕</div>
                  </div>
                </div>
              </Card>
            ))}
            <div style={{ marginTop: 8, padding: "14px 16px", borderRadius: 14, background: C.accentSoft, border: `1px solid ${C.accent}33`, fontSize: 13, color: C.mid, lineHeight: 1.6 }}>
              ◈ Changes go live on your booking page instantly
            </div>
          </>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "24px 20px 40px", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 20 }}>{editingId ? "Edit Service" : "New Service"}</div>

            <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Service Name *</div>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Consultation, Photoshoot, Haircut..." style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 14 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Price ($) *</div>
                <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="120" style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Duration *</div>
                <select value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: form.duration ? C.text : C.dim, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
                  <option value="">Select</option>
                  {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase" }}>Description (optional)</div>
              <button disabled={generatingDesc || !form.name.trim()} onClick={async () => {
                setGeneratingDesc(true);
                try {
                  const res = await fetch("https://pocketflow-proxy-production.up.railway.app/chat", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      model: "llama-3.1-8b-instant", max_tokens: 80,
                      messages: [{ role: "system", content: "Write a one-sentence description for a business service. Keep it short, warm, and professional. No quotes. Just the description text." }, { role: "user", content: `Service: ${form.name}${form.price ? `, $${form.price}` : ""}${form.duration ? `, ${form.duration}` : ""}` }],
                    }),
                  });
                  const data = await res.json();
                  const desc = data.choices?.[0]?.message?.content?.trim() || "";
                  if (desc) setForm(p => ({ ...p, desc }));
                } catch {}
                setGeneratingDesc(false);
              }} style={{ padding: "5px 10px", background: C.accentSoft, border: `1px solid ${C.accent}44`, borderRadius: 12, fontSize: 11, fontWeight: 700, color: C.accent, cursor: generatingDesc || !form.name.trim() ? "not-allowed" : "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", opacity: !form.name.trim() ? 0.4 : 1 }}>{generatingDesc ? "..." : "✦ AI"}</button>
            </div>
            <input value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} placeholder="Short description clients will see" style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 14 }} />

            <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Category</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {CATEGORIES.map(c => <div key={c} onClick={() => setForm(p => ({ ...p, category: c }))} style={{ padding: "8px 14px", borderRadius: 10, background: form.category === c ? C.accentSoft : C.surfaceHigh, border: `1px solid ${form.category === c ? C.accent : C.borderHigh}`, fontSize: 12, fontWeight: 600, color: form.category === c ? C.accent : C.mid, cursor: "pointer" }}>{c}</div>)}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", marginBottom: 16, borderTop: `1px solid ${C.border}` }}>
              <div><div style={{ fontSize: 14, fontWeight: 600 }}>Show on booking page</div><div style={{ fontSize: 12, color: C.dim }}>Clients can book this service</div></div>
              <Toggle on={form.active} onToggle={() => setForm(p => ({ ...p, active: !p.active }))} />
            </div>

            <BtnPrimary onClick={saveService} disabled={saving || !form.name.trim() || !form.price || !form.duration} style={{ width: "100%", padding: 14, fontSize: 15 }}>
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Service"}
            </BtnPrimary>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PAYMENTS ───────────────────────────────────────────────────────────────────
function Payments({ navigate }) {
  const [depositEnabled, setDepositEnabled] = useState(true);
  const [depositAmount, setDepositAmount] = useState("30");
  const [depositType, setDepositType] = useState("percent");
  const [autoCharge, setAutoCharge] = useState(true);
  const [noShowFee, setNoShowFee] = useState(true);
  const [noShowAmount, setNoShowAmount] = useState("50");
  const [lateCancel, setLateCancel] = useState(true);
  const [lateCancelHours, setLateCancelHours] = useState("24");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }
      const { data } = await supabase.from("appointments").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: false }).limit(50);
      setAppointments(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const parsePrice = p => parseFloat(String(p || "0").replace(/[^0-9.]/g, "")) || 0;
  const paid = appointments.filter(a => a.status === "confirmed" || a.status === "completed");
  const pending = appointments.filter(a => a.status === "pending");
  const totalRevenue = paid.reduce((s, a) => s + parsePrice(a.price), 0);
  const pendingRevenue = pending.reduce((s, a) => s + parsePrice(a.price), 0);
  const statusColor = s => s === "confirmed" || s === "completed" ? C.green : s === "pending" ? C.yellow : C.red;
  const statusLabel = s => s === "confirmed" ? "paid" : s === "completed" ? "paid" : s === "pending" ? "pending" : s || "unknown";

  const [showAllPayments, setShowAllPayments] = useState(false);

  const settingsPanelJSX = (
    <>
      <SectionLabel>Deposit Protection</SectionLabel>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: depositEnabled ? `1px solid ${C.border}` : "none" }}>
          <div><div style={{ fontSize: 14, fontWeight: 600 }}>Require deposit to book</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>Clients pay upfront before confirmed</div></div>
          <Toggle on={depositEnabled} onToggle={() => setDepositEnabled(p => !p)} />
        </div>
        {depositEnabled && (
          <div style={{ padding: "0 16px 16px" }}>
            <div style={{ background: C.surfaceHigh, border: `1px solid ${C.borderHigh}`, borderRadius: 14, padding: 14 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {["percent", "fixed"].map(t => <div key={t} onClick={() => setDepositType(t)} style={{ flex: 1, padding: "9px", borderRadius: 10, background: depositType === t ? C.accentSoft : "transparent", border: `1px solid ${depositType === t ? C.accent : C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: depositType === t ? C.accent : C.mid, cursor: "pointer" }}>{t === "percent" ? "Percentage" : "Fixed $"}</div>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px", gap: 8 }}>
                <span style={{ fontSize: 18, color: C.mid }}>{depositType === "percent" ? "%" : "$"}</span>
                <input value={depositAmount} onChange={e => setDepositAmount(e.target.value)} style={{ flex: 1, background: "none", border: "none", fontSize: 20, fontWeight: 700, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
                <span style={{ fontSize: 12, color: C.dim }}>{depositType === "percent" ? "of total" : "flat fee"}</span>
              </div>
            </div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <div><div style={{ fontSize: 14, fontWeight: 600 }}>Auto-charge on booking</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>Charge card immediately when booked</div></div>
          <Toggle on={autoCharge} onToggle={() => setAutoCharge(p => !p)} />
        </div>
      </Card>
      <SectionLabel>No-Show & Cancellation</SectionLabel>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div><div style={{ fontSize: 14, fontWeight: 600 }}>No-show fee</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>Charge ${noShowFee ? noShowAmount : "–"} if client doesn't show</div></div>
          <Toggle on={noShowFee} onToggle={() => setNoShowFee(p => !p)} />
        </div>
        {noShowFee && <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}><div style={{ display: "flex", alignItems: "center", background: C.surfaceHigh, border: `1px solid ${C.borderHigh}`, borderRadius: 12, padding: "10px 14px", gap: 8 }}><span style={{ fontSize: 16, color: C.mid }}>$</span><input value={noShowAmount} onChange={e => setNoShowAmount(e.target.value)} style={{ flex: 1, background: "none", border: "none", fontSize: 18, fontWeight: 700, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} /></div></div>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: lateCancel ? `1px solid ${C.border}` : "none" }}>
          <div><div style={{ fontSize: 14, fontWeight: 600 }}>Late cancellation fee</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>Within {lateCancelHours}h of appointment</div></div>
          <Toggle on={lateCancel} onToggle={() => setLateCancel(p => !p)} />
        </div>
        {lateCancel && <div style={{ padding: "12px 16px" }}><div style={{ display: "flex", gap: 8 }}>{["12", "24", "48"].map(h => <div key={h} onClick={() => setLateCancelHours(h)} style={{ flex: 1, padding: "9px", borderRadius: 10, background: lateCancelHours === h ? C.accentSoft : C.surfaceHigh, border: `1px solid ${lateCancelHours === h ? C.accent : C.borderHigh}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: lateCancelHours === h ? C.accent : C.mid, cursor: "pointer" }}>{h}h</div>)}</div></div>}
      </Card>
    </>
  );

  const invoicesPanelJSX = (
    <>
      <SectionLabel>Appointments</SectionLabel>
      {loading ? (
        <Card style={{ padding: "24px 16px", textAlign: "center", color: C.dim, fontSize: 14 }}>Loading...</Card>
      ) : appointments.length === 0 ? (
        <Card style={{ padding: "32px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>💳</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>No appointments yet</div>
          <div style={{ fontSize: 13, color: C.dim }}>Payments will appear here once clients book</div>
        </Card>
      ) : (
        <Card>
          {appointments.slice(0, showAllPayments ? appointments.length : 5).map((appt, i, arr) => (
            <div key={appt.id} onClick={() => setSelectedInvoice(appt)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: `${statusColor(appt.status)}18`, border: `1px solid ${statusColor(appt.status)}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{appt.status === "confirmed" || appt.status === "completed" ? "✓" : appt.status === "pending" ? "⏳" : "!"}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{appt.client_name}</div><div style={{ fontSize: 11, color: C.mid, marginTop: 2 }}>{appt.service} · {formatDate(appt.day) || appt.time}</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{appt.price || "—"}</div><div style={{ fontSize: 10, color: statusColor(appt.status), marginTop: 3, fontWeight: 600, textTransform: "uppercase" }}>{statusLabel(appt.status)}</div></div>
            </div>
          ))}
          {appointments.length > 5 && (
            <div onClick={() => setShowAllPayments(p => !p)} style={{ textAlign: "center", padding: "12px 0", fontSize: 13, color: C.accent, fontWeight: 600, cursor: "pointer", borderTop: `1px solid ${C.border}` }}>
              {showAllPayments ? "Show less ↑" : `Show ${appointments.length - 5} more ↓`}
            </div>
          )}
        </Card>
      )}
    </>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Payments</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ background: "linear-gradient(135deg,#16103a,#1a0f3a)", border: `1px solid ${C.accentSoft}`, borderRadius: 22, padding: 22, marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>TOTAL REVENUE</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 42, fontWeight: 800, marginBottom: 8 }}>${totalRevenue.toLocaleString()}</div>
          <div style={{ display: "flex", gap: 20 }}>
            <div><div style={{ fontSize: 11, color: C.dim }}>Collected</div><div style={{ fontSize: 15, fontWeight: 700, color: C.green }}>${totalRevenue.toLocaleString()}</div></div>
            <div><div style={{ fontSize: 11, color: C.dim }}>Pending</div><div style={{ fontSize: 15, fontWeight: 700, color: C.yellow }}>${pendingRevenue.toLocaleString()}</div></div>
            <div><div style={{ fontSize: 11, color: C.dim }}>Appointments</div><div style={{ fontSize: 15, fontWeight: 700, color: C.accent }}>{appointments.length}</div></div>
          </div>
        </div>
        {isDesktop ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
            <div>{settingsPanelJSX}</div>
            <div>{invoicesPanelJSX}</div>
          </div>
        ) : (
          <>{settingsPanelJSX}{invoicesPanelJSX}</>
        )}
      </div>
      {selectedInvoice && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => setSelectedInvoice(null)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "24px 20px 40px" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{selectedInvoice.client_name}</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>{selectedInvoice.service}</div>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              {[["Amount", selectedInvoice.price || "—"], ["Status", statusLabel(selectedInvoice.status)], ["Date", formatDate(selectedInvoice.day) || selectedInvoice.time || "—"], ["Duration", selectedInvoice.duration || "—"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: k !== "Duration" ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: C.mid }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: k === "Amount" ? C.gold : k === "Status" ? statusColor(selectedInvoice.status) : C.text, textTransform: "capitalize" }}>{v}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SETTINGS ───────────────────────────────────────────────────────────────────
function Settings({ navigate, userRole, staffOwnerId }) {
  const isDesktop = useDesktop();
  const [aiReplies, setAiReplies] = useState(true);
  const [aiBookings, setAiBookings] = useState(true);
  const [aiReminders, setAiReminders] = useState(true);
  const [aiFollowUps, setAiFollowUps] = useState(true);
  const [aiPromos, setAiPromos] = useState(false);
  const [tone, setTone] = useState("friendly");
  const [bufferTime, setBufferTime] = useState("15");
  const [maxDaily, setMaxDaily] = useState("6");
  const [sunday, setSunday] = useState(false);
  const [paymentInputOpen, setPaymentInputOpen] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [depositPct, setDepositPct] = useState("30");
  const [aiName, setAiName] = useState("Aria");
  const [aiNameSaved, setAiNameSaved] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [autoSaveMsg, setAutoSaveMsg] = useState("");
  const saveTimerRef = useRef(null);
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [showBugReport, setShowBugReport] = useState(false);
  const [bugText, setBugText] = useState("");
  const [bugCategory, setBugCategory] = useState("bug");
  const [bugScreenshot, setBugScreenshot] = useState("");
  const [bugSubmitting, setBugSubmitting] = useState(false);
  const [bugSubmitted, setBugSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const bizUid = (userRole === "staff" && staffOwnerId) ? staffOwnerId : session.user.id;
      const { data } = await supabase.from("business_profiles").select("ai_name,settings").eq("user_id", bizUid).single();
      if (data?.ai_name) setAiName(data.ai_name);
      if (data?.settings) {
        const s = typeof data.settings === "string" ? JSON.parse(data.settings) : data.settings;
        if (s.aiReplies !== undefined) setAiReplies(s.aiReplies);
        if (s.aiBookings !== undefined) setAiBookings(s.aiBookings);
        if (s.aiReminders !== undefined) setAiReminders(s.aiReminders);
        if (s.aiFollowUps !== undefined) setAiFollowUps(s.aiFollowUps);
        if (s.aiPromos !== undefined) setAiPromos(s.aiPromos);
        if (s.tone) setTone(s.tone);
        if (s.bufferTime) setBufferTime(s.bufferTime);
        if (s.maxDaily) setMaxDaily(s.maxDaily);
        if (s.sunday !== undefined) setSunday(s.sunday);
        if (s.paymentDetails) setPaymentDetails(s.paymentDetails);
        if (s.depositPct) setDepositPct(String(s.depositPct));
        if (s.displayName) setDisplayName(s.displayName);
        if (s.profilePic) setProfilePic(s.profilePic);
      }
      setSettingsLoaded(true);
      // If staff, load their own name
      if (userRole === "staff") {
        const { data: sp } = await supabase.from("staff_profiles").select("name").eq("user_id", session.user.id).single();
        if (sp?.name) setDisplayName(sp.name);
      }
    };
    load();
  }, []);

  // Auto-save settings when anything changes (debounced)
  const initialLoadDone = useRef(false);
  useEffect(() => {
    if (!settingsLoaded) return;
    if (!initialLoadDone.current) { initialLoadDone.current = true; return; }
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: existing } = await supabase.from("business_profiles").select("settings").eq("user_id", session.user.id).single();
      const prev = existing?.settings || {};
      const settings = { ...prev, aiReplies, aiBookings, aiReminders, aiFollowUps, aiPromos, tone, bufferTime, maxDaily, sunday, paymentDetails, depositPct: parseInt(depositPct) || 30 };
      await supabase.from("business_profiles").upsert({ user_id: session.user.id, settings }, { onConflict: "user_id" });
      setAutoSaveMsg("Saved");
      setTimeout(() => setAutoSaveMsg(""), 1500);
    }, 800);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [aiReplies, aiBookings, aiReminders, aiFollowUps, aiPromos, tone, bufferTime, maxDaily, sunday, paymentDetails, depositPct, settingsLoaded]);

  const saveAiName = async () => {
    if (!aiName.trim()) return;
    setSavingName(true);
    const { data: { session } } = await supabase.auth.getSession();
    await supabase.from("business_profiles").upsert({ user_id: session.user.id, ai_name: aiName.trim() }, { onConflict: "user_id" });
    setSavingName(false);
    setAiNameSaved(true);
    setTimeout(() => setAiNameSaved(false), 2000);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Settings</div>
          {autoSaveMsg && <div style={{ fontSize: 11, color: C.green, fontWeight: 600, marginLeft: "auto" }}>✓ {autoSaveMsg}</div>}
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: isDesktop ? "grid" : "block", gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined, gap: isDesktop ? 24 : undefined, alignItems: "start" }}>
        <div>
        {userRole === "owner" && <>
        <Card style={{ padding: 16, marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>✦</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{aiName || "Aria"}</div>
              <div style={{ fontSize: 12, color: C.mid }}>Your AI assistant's name</div>
            </div>
          </div>
          <input
            value={aiName}
            onChange={e => { setAiName(e.target.value); setAiNameSaved(false); }}
            placeholder="e.g. Aria, Nova, Sage..."
            maxLength={20}
            style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 10 }}
          />
          {aiNameSaved
            ? <div style={{ width: "100%", padding: 11, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.green, textAlign: "center" }}>✓ Saved!</div>
            : <BtnPrimary onClick={saveAiName} disabled={savingName || !aiName.trim()} style={{ width: "100%", padding: 11, fontSize: 13 }}>{savingName ? "Saving..." : "Save Name"}</BtnPrimary>}
        </Card>
        <SectionLabel>AI Controls</SectionLabel>
        <Card style={{ marginBottom: 8 }}>
          {[["Auto-reply DMs", "AI responds to all incoming messages", aiReplies, setAiReplies], ["Auto-confirm bookings", "No approval needed from you", aiBookings, setAiBookings], ["Send reminders", "24h before every appointment", aiReminders, setAiReminders], ["Send follow-ups", "After every completed visit", aiFollowUps, setAiFollowUps], ["Run promotions", "Ask me before sending any promo", aiPromos, setAiPromos]].map(([label, sub, val, set], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
              <div><div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{sub}</div></div>
              <Toggle on={val} onToggle={() => set(p => !p)} />
            </div>
          ))}
        </Card>
        <SectionLabel>AI Tone</SectionLabel>
        <Card style={{ padding: 16, marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["friendly", "professional", "casual"].map(t => <div key={t} onClick={() => setTone(t)} style={{ flex: 1, padding: "11px 8px", borderRadius: 12, background: tone === t ? C.accentSoft : C.surfaceHigh, border: `1px solid ${tone === t ? C.accent : C.borderHigh}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: tone === t ? C.accent : C.mid, cursor: "pointer", textTransform: "capitalize" }}>{t}</div>)}
          </div>
          <div style={{ background: C.surfaceHigh, border: `1px solid ${C.borderHigh}`, borderRadius: 12, padding: "10px 14px", fontSize: 13, color: C.mid, lineHeight: 1.5 }}>
            {tone === "friendly" ? '"Hey! I have a 2pm open this Saturday, does that work?"' : tone === "professional" ? '"Good afternoon. I have availability at 2:00 PM this Saturday."' : '"Saturday at 2 works? Let me know!"'}
          </div>
        </Card>
        </>}
        {userRole === "staff" && (
          <>
            <SectionLabel>My Profile</SectionLabel>
            <Card style={{ padding: 16, marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Display Name</div>
              <input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
              {profileSaved
                ? <div style={{ width: "100%", padding: 11, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.green, textAlign: "center" }}>✓ Saved!</div>
                : <BtnPrimary onClick={async () => {
                    setSavingProfile(true);
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session) {
                      await supabase.from("staff_profiles").update({ name: displayName }).eq("user_id", session.user.id);
                    }
                    setSavingProfile(false); setProfileSaved(true); setTimeout(() => setProfileSaved(false), 3000);
                  }} disabled={savingProfile} style={{ width: "100%", padding: 11, fontSize: 13 }}>{savingProfile ? "Saving..." : "Save Name"}</BtnPrimary>
              }
            </Card>
          </>
        )}
        <SectionLabel>Account</SectionLabel>
        <Card>
          {[
            { icon: "✦", label: "Services", sub: "Manage your services & prices", screen: "services", ownerOnly: true },
            { icon: "◈", label: "Packages", sub: "Bundles & memberships", screen: "packages", ownerOnly: true },
            { icon: "◉", label: "Business Profile", sub: "Edit your business info", screen: "profile", ownerOnly: true },
            { icon: "⤴", label: "Connected Accounts", sub: "WhatsApp, Instagram, Google", screen: "connections", ownerOnly: true },
            { icon: "⟐", label: "Subscription", sub: "Pro Plan · $29/mo", screen: "subscription", ownerOnly: true },
          ].filter(i => userRole === "owner" || !i.ownerOnly).map(({ icon, label, sub, screen }, i, arr) => (
            <div key={i} onClick={() => navigate(screen)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{sub}</div></div>
              <span style={{ fontSize: 12, color: C.mid }}>›</span>
            </div>
          ))}
        </Card>
        <SectionLabel>{t("language")}</SectionLabel>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 0 }}>
            {[["en", "English"], ["ar", "العربية"]].map(([code, label]) => (
              <div key={code} onClick={() => { localStorage.setItem("spool_lang", code); document.documentElement.dir = code === "ar" ? "rtl" : "ltr"; window.location.reload(); }} style={{ flex: 1, padding: "14px", textAlign: "center", fontSize: 14, fontWeight: 600, color: getLang() === code ? C.accent : C.mid, background: getLang() === code ? C.accentSoft : "transparent", borderBottom: getLang() === code ? `2px solid ${C.accent}` : `2px solid transparent`, cursor: "pointer" }}>{label}</div>
            ))}
          </div>
        </Card>

        <div style={{ padding: "16px 0" }}>
          <button onClick={async () => {
            const newPass = prompt("Enter new password (min 6 characters):");
            if (!newPass || newPass.length < 6) { if (newPass) alert("Password must be at least 6 characters."); return; }
            const { error } = await supabase.auth.updateUser({ password: newPass });
            if (error) alert("Error: " + error.message);
            else alert("Password updated!");
          }} style={{ width: "100%", padding: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.text, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 8 }}>Change Password</button>
          <button onClick={async () => { await supabase.auth.signOut(); navigate("login"); }} style={{ width: "100%", padding: 12, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 8 }}>Sign Out</button>
          {userRole === "owner" && <button onClick={async () => {
            if (!window.confirm("Are you sure you want to delete your account? ALL your data will be permanently lost.")) return;
            if (!window.confirm("This is your last chance. Type 'DELETE' below to confirm.")) return;
            const typed = prompt("Type DELETE to confirm:");
            if (typed !== "DELETE") return;
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;
            const uid = session.user.id;
            await Promise.all([
              supabase.from("appointments").delete().eq("owner_id", uid),
              supabase.from("clients").delete().eq("owner_id", uid),
              supabase.from("services").delete().eq("owner_id", uid),
              supabase.from("business_profiles").delete().eq("user_id", uid),
              supabase.from("staff_members").delete().eq("owner_id", uid),
              supabase.from("ai_memories").delete().eq("owner_id", uid),
            ]);
            await supabase.auth.signOut();
            navigate("login");
          }} style={{ width: "100%", padding: 12, background: "transparent", border: `1px solid ${C.red}33`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.red, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Delete Account</button>}
        </div>
        </div>{/* end col 1 */}
        {userRole === "owner" && <div>{/* col 2 */}
        <SectionLabel>Booking Rules</SectionLabel>
        <Card style={{ marginBottom: 8 }}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Buffer time between appointments</div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              {["0", "15", "30", "45"].map(m => <div key={m} onClick={() => setBufferTime(m)} style={{ flex: 1, padding: "9px", borderRadius: 10, background: bufferTime === m ? C.accentSoft : C.surfaceHigh, border: `1px solid ${bufferTime === m ? C.accent : C.borderHigh}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: bufferTime === m ? C.accent : C.mid, cursor: "pointer" }}>{m === "0" ? "None" : `${m}m`}</div>)}
            </div>
          </div>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Max appointments per day</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: C.accent }}>{maxDaily}</span>
            </div>
            <input type="range" min="1" max="50" value={maxDaily} onChange={e => setMaxDaily(e.target.value)} style={{ width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Accept Sunday bookings</div>
            <Toggle on={sunday} onToggle={() => setSunday(p => !p)} />
          </div>
          <div style={{ padding: "14px 16px", borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Deposit percentage</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: C.gold }}>{depositPct}%</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["15","20","25","30","50"].map(v => <div key={v} onClick={() => setDepositPct(v)} style={{ flex: 1, padding: "9px", borderRadius: 10, background: depositPct === v ? C.accentSoft : C.surfaceHigh, border: `1px solid ${depositPct === v ? C.accent : C.borderHigh}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: depositPct === v ? C.accent : C.mid, cursor: "pointer" }}>{v}%</div>)}
            </div>
          </div>
        </Card>
        <SectionLabel>Payment Setup</SectionLabel>
        <Card style={{ marginBottom: 8 }}>
          {[
            { icon: "⟐", label: "Stripe", sub: "Accept card payments from clients", connected: true },
            { icon: "PP", label: "PayPal", sub: "Your PayPal email or link", connected: false, placeholder: "PayPal email or paypal.me/link" },
            { icon: "CA", label: "Cash App", sub: "Your $Cashtag", connected: false, placeholder: "e.g. $YourCashtag" },
            { icon: "ZL", label: "Zelle", sub: "Your Zelle phone or email", connected: false, placeholder: "Phone number or email" },
          ].map((p, i, arr) => (
            <div key={p.label}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: (!paymentInputOpen[p.label] && i < arr.length - 1) ? `1px solid ${C.border}` : "none" }}>
                <span style={{ fontSize: 22 }}>{p.icon}</span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{p.label}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{paymentDetails[p.label] || p.sub}</div></div>
                {p.connected
                  ? <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Connected ✓</span>
                  : <BtnPrimary onClick={() => setPaymentInputOpen(prev => ({ ...prev, [p.label]: !prev[p.label] }))} style={{ padding: "8px 14px", fontSize: 12 }}>{paymentDetails[p.label] ? "Edit" : "Set Up"}</BtnPrimary>}
              </div>
              {paymentInputOpen[p.label] && (
                <div style={{ padding: "0 16px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <input
                    placeholder={p.placeholder}
                    value={paymentDetails[p.label] || ""}
                    onChange={e => setPaymentDetails(prev => ({ ...prev, [p.label]: e.target.value }))}
                    style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 10 }}
                  />
                  <BtnPrimary onClick={() => setPaymentInputOpen(prev => ({ ...prev, [p.label]: false }))} style={{ width: "100%", padding: 11, fontSize: 13 }}>Save</BtnPrimary>
                </div>
              )}
            </div>
          ))}
        </Card>
        <SectionLabel>Your Profile</SectionLabel>
        <Card style={{ padding: 16, marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            {profilePic ? (
              <img src={profilePic} alt="" style={{ width: 52, height: 52, borderRadius: 16, objectFit: "cover", border: `2px solid ${C.accent}44` }} />
            ) : (
              <div style={{ width: 52, height: 52, borderRadius: 16, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: C.accent }}>{(displayName || "U")[0].toUpperCase()}</div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{displayName || "Set your name"}</div>
              <div style={{ fontSize: 12, color: C.mid }}>Visible to your team & in the app</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Display Name</div>
          <input value={displayName} onChange={e => { setDisplayName(e.target.value); setProfileSaved(false); }} placeholder="e.g. Omar, Sarah..." style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 14 }} />
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Profile Picture</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <label style={{ flex: 1, padding: "12px 14px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.mid, cursor: "pointer", textAlign: "center", fontWeight: 600 }}>
              {profilePic ? "Change Photo" : "Upload Photo"}
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={async e => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = async ev => { const compressed = await compressImage(ev.target.result, 150, 0.7); setProfilePic(compressed); setProfileSaved(false); }; reader.readAsDataURL(file); }} />
            </label>
            {profilePic && <button onClick={() => { setProfilePic(""); setProfileSaved(false); }} style={{ padding: "12px 14px", background: "transparent", border: `1px solid ${C.red}44`, borderRadius: 12, fontSize: 13, color: C.red, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", fontWeight: 600 }}>Remove</button>}
          </div>
          {profileSaved
            ? <div style={{ width: "100%", padding: 12, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.green, textAlign: "center" }}>✓ Profile Saved!</div>
            : <BtnPrimary onClick={async () => { setSavingProfile(true); const { data: { session } } = await supabase.auth.getSession(); if (session) { const { data } = await supabase.from("business_profiles").select("settings").eq("user_id", session.user.id).single(); const prev = data?.settings || {}; await supabase.from("business_profiles").upsert({ user_id: session.user.id, settings: { ...prev, displayName, profilePic } }, { onConflict: "user_id" }); } setSavingProfile(false); setProfileSaved(true); setTimeout(() => setProfileSaved(false), 3000); }} disabled={savingProfile} style={{ width: "100%", padding: 12, fontSize: 13 }}>{savingProfile ? "Saving..." : "Save Profile"}</BtnPrimary>
          }
        </Card>
        <Card style={{ padding: 16, marginTop: 8 }}>
          <div onClick={() => setShowBugReport(true)} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.red}18`, border: `1px solid ${C.red}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: C.red }}>!</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Report a Bug</div>
              <div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>Found something broken? Let us know</div>
            </div>
            <span style={{ fontSize: 12, color: C.mid }}>›</span>
          </div>
        </Card>
        </div>}{/* end col 2 */}
        </div>{/* end grid */}
      </div>

      {/* Bug Report Modal */}
      {showBugReport && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => { if (!bugSubmitting) { setShowBugReport(false); setBugSubmitted(false); } }}>
          <div style={{ background: C.surfaceSolid, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 520, padding: "24px 20px 32px", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />
            {bugSubmitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16, animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>✅</div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Thanks for reporting!</div>
                <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.7, marginBottom: 24 }}>We take every report seriously and will look into this. You're helping make spool better for everyone.</div>
                <BtnPrimary onClick={() => { setShowBugReport(false); setBugSubmitted(false); setBugText(""); setBugScreenshot(""); setBugCategory("bug"); }} style={{ width: "100%", padding: 14 }}>Close</BtnPrimary>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Report an Issue</div>
                <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>Help us improve spool — describe what went wrong</div>

                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Category</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  {[{ id: "bug", label: "🐛 Bug" }, { id: "ui", label: "🎨 UI Issue" }, { id: "feature", label: "◈ Suggestion" }, { id: "other", label: "💬 Other" }].map(c => (
                    <div key={c.id} onClick={() => setBugCategory(c.id)} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, background: bugCategory === c.id ? C.accentSoft : C.surface, border: `1px solid ${bugCategory === c.id ? C.accent : C.border}`, textAlign: "center", fontSize: 11, fontWeight: 600, color: bugCategory === c.id ? C.accent : C.mid, cursor: "pointer" }}>{c.label}</div>
                  ))}
                </div>

                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>What happened?</div>
                <textarea value={bugText} onChange={e => setBugText(e.target.value)} placeholder="Describe the issue in detail... What were you doing? What did you expect to happen? What happened instead?" rows={4} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", resize: "none", marginBottom: 16 }} />

                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Screenshot <span style={{ fontWeight: 400 }}>(optional)</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  {bugScreenshot ? (
                    <div style={{ position: "relative" }}>
                      <img src={bugScreenshot} alt="" style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover", border: `1px solid ${C.border}` }} />
                      <div onClick={() => setBugScreenshot("")} style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: C.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", cursor: "pointer", fontWeight: 700 }}>×</div>
                    </div>
                  ) : (
                    <label style={{ flex: 1, padding: "16px 14px", background: C.surface, border: `1px dashed ${C.borderHigh}`, borderRadius: 14, fontSize: 13, color: C.mid, cursor: "pointer", textAlign: "center", fontWeight: 600 }}>
                      ◎ Upload Screenshot
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={async e => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = async ev => { const compressed = await compressImage(ev.target.result, 400, 0.6); setBugScreenshot(compressed); }; reader.readAsDataURL(file); }} />
                    </label>
                  )}
                </div>

                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Device Info <span style={{ fontWeight: 400 }}>(auto-detected)</span></div>
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px", fontSize: 12, color: C.dim, marginBottom: 20, lineHeight: 1.6 }}>
                  {navigator.userAgent.includes("Mobile") ? "◎ Mobile" : "💻 Desktop"} · {navigator.userAgent.includes("Chrome") ? "Chrome" : navigator.userAgent.includes("Safari") ? "Safari" : navigator.userAgent.includes("Firefox") ? "Firefox" : "Browser"} · {window.innerWidth}×{window.innerHeight}
                </div>

                <BtnPrimary disabled={!bugText.trim() || bugSubmitting} onClick={async () => {
                  setBugSubmitting(true);
                  try {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session) {
                      await supabase.from("bug_reports").insert([{
                        user_id: session.user.id,
                        message: bugText.trim(),
                        category: bugCategory,
                        screenshot: bugScreenshot || null,
                        device_info: `${navigator.userAgent.includes("Mobile") ? "Mobile" : "Desktop"} ${window.innerWidth}x${window.innerHeight}`,
                        page: screen,
                      }]);
                    }
                  } catch {}
                  setBugSubmitting(false);
                  setBugSubmitted(true);
                }} style={{ width: "100%", padding: 14 }}>{bugSubmitting ? "Submitting..." : "Submit Report"}</BtnPrimary>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── LOYALTY ────────────────────────────────────────────────────────────────────
function Loyalty({ navigate }) {
  const isDesktop = useDesktop();
  const [loyaltyOn, setLoyaltyOn] = useState(true);
  const [visitsForReward, setVisitsForReward] = useState("5");
  const [rewardType, setRewardType] = useState("discount");
  const [birthdayOn, setBirthdayOn] = useState(true);
  const [rebookOn, setRebookOn] = useState(true);
  const [winbackOn, setWinbackOn] = useState(true);
  const [reviewOn, setReviewOn] = useState(true);

  // Discount codes
  const [codes, setCodes] = useState([]);
  const [loadingCodes, setLoadingCodes] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newCode, setNewCode] = useState({ code: "", type: "percent", value: "", limit: "", firstOnly: false });
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);

  const reviews = [];
  const [realReviews, setRealReviews] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      const [codeRes, revRes] = await Promise.all([
        supabase.from("discount_codes").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: false }),
        supabase.from("reviews").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: false }).limit(20),
      ]);
      setCodes(codeRes.data || []);
      setRealReviews(revRes.data || []);
      setLoadingCodes(false);
    };
    load();
  }, []);

  const saveCode = async () => {
    if (!newCode.code.trim() || !newCode.value) return;
    setSaving(true);
    const { data, error } = await supabase.from("discount_codes").insert([{
      owner_id: userId,
      code: newCode.code.trim().toUpperCase(),
      type: newCode.type,
      value: parseFloat(newCode.value),
      usage_limit: newCode.limit ? parseInt(newCode.limit) : null,
      first_time_only: newCode.firstOnly,
      times_used: 0,
      active: true,
    }]).select().single();
    if (!error && data) {
      setCodes(p => [data, ...p]);
      setNewCode({ code: "", type: "percent", value: "", limit: "", firstOnly: false });
      setShowCreate(false);
    }
    setSaving(false);
  };

  const toggleCode = async (id, active) => {
    await supabase.from("discount_codes").update({ active: !active }).eq("id", id);
    setCodes(p => p.map(c => c.id === id ? { ...c, active: !active } : c));
  };

  const deleteCode = async (id) => {
    await supabase.from("discount_codes").delete().eq("id", id);
    setCodes(p => p.filter(c => c.id !== id));
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Loyalty</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: isDesktop ? "grid" : "block", gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined, gap: isDesktop ? 24 : undefined, alignItems: "start" }}>
        <div>{/* col 1: codes */}
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 }}>
          {[{ label: "Active codes", value: String(codes.filter(c => c.active).length), color: C.accent }, { label: "Times redeemed", value: String(codes.reduce((s, c) => s + (c.times_used || 0), 0)), color: C.gold }].map((s, i) => (
            <Card key={i} style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{s.label}</div>
            </Card>
          ))}
        </div>

        {/* Discount Codes */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0 10px" }}>
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Discount Codes</div>
          <BtnPrimary onClick={() => setShowCreate(p => !p)} style={{ padding: "8px 16px", fontSize: 12 }}>{showCreate ? "Cancel" : "+ New Code"}</BtnPrimary>
        </div>

        {/* Create code form */}
        {showCreate && (
          <Card style={{ padding: 18, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Create Discount Code</div>
            <input
              value={newCode.code}
              onChange={e => setNewCode(p => ({ ...p, code: e.target.value.toUpperCase().replace(/\s/g, "") }))}
              placeholder="Code (e.g. WELCOME10)"
              maxLength={20}
              style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 10, letterSpacing: 1 }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              {["percent", "fixed"].map(t => (
                <div key={t} onClick={() => setNewCode(p => ({ ...p, type: t }))} style={{ padding: "11px", borderRadius: 12, background: newCode.type === t ? C.accentSoft : C.surfaceHigh, border: `1px solid ${newCode.type === t ? C.accent : C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: newCode.type === t ? C.accent : C.mid, cursor: "pointer" }}>
                  {t === "percent" ? "% Off" : "$ Off"}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <input
                value={newCode.value}
                onChange={e => setNewCode(p => ({ ...p, value: e.target.value.replace(/\D/g, "") }))}
                placeholder={newCode.type === "percent" ? "e.g. 10 (10%)" : "e.g. 20 ($20)"}
                style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}
              />
              <input
                value={newCode.limit}
                onChange={e => setNewCode(p => ({ ...p, limit: e.target.value.replace(/\D/g, "") }))}
                placeholder="Usage limit (optional)"
                style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}
              />
            </div>
            <div onClick={() => setNewCode(p => ({ ...p, firstOnly: !p.firstOnly }))} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", cursor: "pointer", marginBottom: 14 }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: newCode.firstOnly ? C.accent : C.surfaceHigh, border: `1px solid ${newCode.firstOnly ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {newCode.firstOnly && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>First-time clients only</div>
                <div style={{ fontSize: 11, color: C.dim }}>Code won't work for returning clients</div>
              </div>
            </div>
            <BtnPrimary onClick={saveCode} disabled={saving || !newCode.code.trim() || !newCode.value} style={{ width: "100%", padding: 13 }}>
              {saving ? "Saving..." : `Create ${newCode.code || "Code"} · ${newCode.value || "0"}${newCode.type === "percent" ? "% off" : "$ off"}`}
            </BtnPrimary>
          </Card>
        )}

        {/* Codes list */}
        {loadingCodes ? (
          <div style={{ textAlign: "center", padding: 32, color: C.dim, fontSize: 13 }}>Loading codes...</div>
        ) : codes.length === 0 ? (
          <Card style={{ padding: 28, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>🎟️</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>No discount codes yet</div>
            <div style={{ fontSize: 13, color: C.mid }}>Create your first code — clients can enter it on the booking page before paying.</div>
          </Card>
        ) : (
          codes.map(c => (
            <Card key={c.id} style={{ padding: 16, marginBottom: 10, borderColor: c.active ? C.border : C.borderHigh, opacity: c.active ? 1 : 0.5 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ background: C.accentSoft, border: `1px solid ${C.accent}33`, borderRadius: 10, padding: "5px 12px", fontSize: 13, fontWeight: 800, color: C.accent, letterSpacing: 1 }}>{c.code}</div>
                  {c.first_time_only && <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, background: `${C.gold}18`, borderRadius: 10, padding: "3px 7px" }}>1ST ONLY</div>}
                </div>
                <Toggle on={c.active} onToggle={() => toggleCode(c.id, c.active)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: C.mid }}>
                  <span style={{ color: C.green, fontWeight: 700 }}>{c.type === "percent" ? `${c.value}% off` : `$${c.value} off`}</span>
                  {c.usage_limit ? ` · ${c.times_used}/${c.usage_limit} used` : ` · ${c.times_used || 0} times used`}
                </div>
                <button onClick={() => deleteCode(c.id)} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: 18, padding: "0 4px" }}>×</button>
              </div>
            </Card>
          ))
        )}

        {/* Loyalty program */}
        <SectionLabel>Loyalty Program</SectionLabel>
        <Card style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: loyaltyOn ? `1px solid ${C.border}` : "none" }}>
            <div><div style={{ fontSize: 14, fontWeight: 600 }}>Enable loyalty rewards</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>Clients earn rewards after visits</div></div>
            <Toggle on={loyaltyOn} onToggle={() => setLoyaltyOn(p => !p)} />
          </div>
          {loyaltyOn && (
            <div style={{ padding: "0 16px 16px" }}>
              <div style={{ background: C.surfaceHigh, border: `1px solid ${C.borderHigh}`, borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 12, color: C.mid, marginBottom: 10 }}>Reward after how many visits?</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  {["3","5","8","10"].map(v => <div key={v} onClick={() => setVisitsForReward(v)} style={{ flex: 1, padding: "9px", borderRadius: 10, background: visitsForReward === v ? C.accentSoft : C.surface, border: `1px solid ${visitsForReward === v ? C.accent : C.border}`, textAlign: "center", fontSize: 13, fontWeight: 700, color: visitsForReward === v ? C.accent : C.mid, cursor: "pointer" }}>{v}</div>)}
                </div>
                <div style={{ fontSize: 12, color: C.mid, marginBottom: 10 }}>Reward type</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["discount","free service"].map(t => <div key={t} onClick={() => setRewardType(t)} style={{ flex: 1, padding: "9px", borderRadius: 10, background: rewardType === t ? C.accentSoft : C.surface, border: `1px solid ${rewardType === t ? C.accent : C.border}`, textAlign: "center", fontSize: 12, fontWeight: 600, color: rewardType === t ? C.accent : C.mid, cursor: "pointer", textTransform: "capitalize" }}>{t}</div>)}
                </div>
              </div>
            </div>
          )}
        </Card>
        </div>{/* end col 1 */}
        <div>{/* col 2: automated messages */}
        <SectionLabel>Automated Messages</SectionLabel>
        <Card style={{ marginBottom: 8 }}>
          {[["♡","Birthday message","Coming soon",birthdayOn,setBirthdayOn],["↻","Rebook reminder","Coming soon",rebookOn,setRebookOn],["★","Review request","Active via cron",reviewOn,setReviewOn],["↩","Win-back campaign","Coming soon",winbackOn,setWinbackOn]].map(([icon,label,sub,val,set],i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontSize:20 }}>{icon}</span>
              <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:600 }}>{label}</div><div style={{ fontSize:12,color:C.mid,marginTop:2 }}>{sub}</div></div>
              <Toggle on={val} onToggle={()=>set(p=>!p)} />
            </div>
          ))}
        </Card>

        <SectionLabel>Recent Reviews</SectionLabel>
        {realReviews.length === 0 ? (
          <Card style={{ padding: "32px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>★</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>No reviews yet</div>
            <div style={{ fontSize: 13, color: C.dim }}>Reviews from clients will appear here</div>
          </Card>
        ) : realReviews.map((r,i) => (
          <Card key={i} style={{ padding:16,marginBottom:10 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ fontSize:14,fontWeight:600 }}>{r.client_name}</span>
              <span style={{ fontSize:11,color:C.dim }}>{timeAgo(r.created_at)}</span>
            </div>
            <div style={{ fontSize:16,marginBottom:8 }}>{"★".repeat(r.rating || 5)}</div>
            {r.text && <div style={{ fontSize:13,color:C.mid,lineHeight:1.5 }}>{r.text}</div>}
            {r.service && <div style={{ fontSize:11,color:C.dim,marginTop:6 }}>{r.service}</div>}
          </Card>
        ))}
        </div>{/* end col 2 */}
        </div>{/* end grid */}
      </div>
      <BottomNav active="home" navigate={navigate} />
    </div>
  );
}
function Notifications({ navigate }) {
  const [filter, setFilter] = useState("all");
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = session.user.id;

      // Load real notifications
      const { data: realNotifs } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(50);

      // Also auto-generate from recent appointments if no real notifs
      const { data: recentAppts } = await supabase
        .from("appointments")
        .select("client_name,service,day,time,status,price,created_at")
        .eq("owner_id", uid)
        .order("created_at", { ascending: false })
        .limit(20);

      const apptNotifs = (recentAppts || []).map(a => ({
        id: "appt_" + a.created_at,
        type: "booking",
        title: a.status === "cancelled" ? "Booking Cancelled" : "New Booking",
        body: `${a.client_name} — ${a.service} on ${formatDate(a.day)} at ${a.time}${a.price ? " · " + a.price : ""}`,
        read: a.status !== "pending",
        created_at: a.created_at,
      }));

      const all = [...(realNotifs || []), ...apptNotifs]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 50);

      // Deduplicate by title+body
      const seen = new Set();
      const deduped = all.filter(n => {
        const key = n.title + n.body;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setNotifs(deduped);
      setLoading(false);
    };
    load();
  }, []);

  const markAllRead = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    await supabase.from("notifications").update({ read: true }).eq("user_id", session.user.id).eq("read", false);
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const iconFor = (type) => ({ booking: "▣", payment: "⬡", ai: "✦", alert: "!", review: "★" })[type] || "◉";
  const timeAgo = (ts) => {
    const diff = Date.now() - new Date(ts).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const typeColor = t => ({ booking: C.accent, payment: C.gold, ai: C.blue, alert: C.red, review: C.yellow })[t] || C.mid;
  const filtered = filter === "all" ? notifs : notifs.filter(n => n.type === filter);
  const unread = notifs.filter(n => !n.read).length;

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 16px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Notifications</div>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {["all", "booking", "payment", "ai", "alert"].map(f => (
            <div key={f} onClick={() => setFilter(f)} style={{ padding: "8px 14px", borderRadius: 100, background: filter === f ? C.accentSoft : C.surface, border: `1px solid ${filter === f ? C.accent : C.border}`, fontSize: 12, fontWeight: 600, color: filter === f ? C.accent : C.mid, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, textTransform: "capitalize" }}>{f === "all" ? "All" : f}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔔</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>All caught up</div>
            <div style={{ fontSize: 13, color: C.dim }}>Notifications from bookings, payments, and your AI assistant will appear here</div>
          </div>
        ) : (
          <>
            {unread > 0 && <div style={{ background: `${C.accent}12`, border: `1px solid ${C.accent}22`, borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>{unread} unread</span><span onClick={markAllRead} style={{ fontSize: 12, color: C.mid, cursor: "pointer" }}>Mark all read</span></div>}
            {filtered.map(n => (
              <div key={n.id} style={{ background: C.surface, border: `1px solid ${n.read ? C.border : typeColor(n.type) + "33"}`, borderRadius: 16, padding: "14px 16px", marginBottom: 10, position: "relative", overflow: "hidden" }}>
                {!n.read && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: typeColor(n.type), borderRadius: "12px 0 0 12px" }} />}
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${typeColor(n.type)}18`, border: `1px solid ${typeColor(n.type)}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{n.icon || iconFor(n.type)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: n.read ? 500 : 700, flex: 1, marginRight: 8 }}>{n.title}</span>
                      <span style={{ fontSize: 10, color: C.dim, flexShrink: 0, marginTop: 2 }}>{timeAgo(n.created_at)}</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.5 }}>{n.body}</div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ── ANALYTICS ──────────────────────────────────────────────────────────────────
function Analytics({ navigate }) {
  const isDesktop = useDesktop();
  const [period, setPeriod] = useState("week");
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("appointments").select("*").eq("owner_id", session.user.id);
      setAppts(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const parsePrice = p => parseInt((p || "0").replace(/\D/g, "")) || 0;

  const confirmed = appts.filter(a => a.status === "confirmed");
  const totalRev = confirmed.reduce((s, a) => s + parsePrice(a.price), 0);
  const nowA = new Date();
  const dayNamesA = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNamesA = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const todayStrA = `${dayNamesA[nowA.getDay()]} ${monthNamesA[nowA.getMonth()]} ${nowA.getDate()}`;
  const todayAppts = appts.filter(a => a.day === todayStrA || a.day === "Today");
  const todayRev = todayAppts.filter(a => a.status === "confirmed").reduce((s, a) => s + parsePrice(a.price), 0);

  // Service breakdown
  const serviceMap = {};
  confirmed.forEach(a => {
    const services = (a.service || "").split(",").map(s => s.trim());
    services.forEach(s => {
      if (!s) return;
      if (!serviceMap[s]) serviceMap[s] = { count: 0, revenue: 0 };
      serviceMap[s].count++;
      serviceMap[s].revenue += parsePrice(a.price) / services.length;
    });
  });
  const topServices = Object.entries(serviceMap)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5)
    .map(([name, d]) => ({ name, ...d }));
  const maxSvcRev = topServices[0]?.revenue || 1;

  // Bar chart — week shows days, month shows weeks, year shows months
  const now = new Date();
  let bars = [];
  let barLabel = "";
  if (period === "week") {
    barLabel = "Revenue by Day";
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    bars = days.map(day => ({ day, revenue: 0 }));
    confirmed.forEach(a => {
      if (!a.created_at) return;
      const d = new Date(a.created_at);
      const diff = Math.floor((now - d) / 86400000);
      if (diff < 7) bars[d.getDay()].revenue += parsePrice(a.price);
    });
  } else if (period === "month") {
    barLabel = "Revenue by Week";
    bars = [{ day: "W1", revenue: 0 }, { day: "W2", revenue: 0 }, { day: "W3", revenue: 0 }, { day: "W4", revenue: 0 }];
    confirmed.forEach(a => {
      if (!a.created_at) return;
      const d = new Date(a.created_at);
      if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
        const w = Math.min(Math.floor((d.getDate() - 1) / 7), 3);
        bars[w].revenue += parsePrice(a.price);
      }
    });
  } else {
    barLabel = "Revenue by Month";
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    bars = months.map(m => ({ day: m, revenue: 0 }));
    confirmed.forEach(a => {
      if (!a.created_at) return;
      const d = new Date(a.created_at);
      if (d.getFullYear() === now.getFullYear()) bars[d.getMonth()].revenue += parsePrice(a.price);
    });
  }
  const maxBar = Math.max(...bars.map(b => b.revenue), 1);

  const displayRev = period === "week"
    ? "$" + bars.reduce((s, b) => s + b.revenue, 0)
    : period === "month"
    ? "$" + bars.reduce((s, b) => s + b.revenue, 0)
    : "$" + totalRev;

  const cancelledCount = appts.filter(a => a.status === "cancelled").length;
  const pendingCount = appts.filter(a => a.status === "pending").length;
  const avgPerAppt = confirmed.length > 0 ? Math.round(totalRev / confirmed.length) : 0;
  const completionRate = appts.length > 0 ? Math.round((confirmed.length / appts.length) * 100) : 0;

  const insights = topServices.length > 0
    ? [
        `${topServices[0]?.name} is your #1 earner at $${Math.round(topServices[0]?.revenue || 0)}`,
        `${completionRate}% of bookings are confirmed (${confirmed.length}/${appts.length})`,
        `$${avgPerAppt} average revenue per appointment`,
        cancelledCount > 0 ? `${cancelledCount} cancelled — consider adding a cancellation policy` : `No cancellations — your clients show up!`,
        pendingCount > 0 ? `${pendingCount} pending bookings need attention` : null,
        todayRev > 0 ? `$${todayRev} earned today so far` : null,
      ].filter(Boolean)
    : ["Book your first clients to start seeing analytics", "Share your booking link to get started", "Track revenue, services, and client trends here"];

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Analytics</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {loading ? (
          <div style={{ padding: "16px 0" }}>{[1,2,3].map(i => <div key={i} style={{ height: 68, background: C.surface, borderRadius: 18, marginBottom: 10, animation: "shimmer 1.5s infinite", backgroundImage: `linear-gradient(90deg,${C.surface},${C.surfaceHigh},${C.surface})`, backgroundSize: "200% 100%" }} />)}</div>
        ) : (
          <>
            <div style={{ display: "flex", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 4, marginBottom: 20 }}>
              {["week","month","year"].map(p => (
                <div key={p} onClick={() => setPeriod(p)} style={{ flex: 1, padding: "10px", borderRadius: 11, background: period === p ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : "transparent", textAlign: "center", fontSize: 13, fontWeight: 600, color: period === p ? "#fff" : C.mid, cursor: "pointer", textTransform: "capitalize" }}>
                  {p === "week" ? "This Week" : p === "month" ? "This Month" : "This Year"}
                </div>
              ))}
            </div>
            <div style={{ display: isDesktop ? "grid" : "block", gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined, gap: isDesktop ? 24 : undefined, alignItems: "start" }}>
              <div>
                <div style={{ background: "linear-gradient(135deg,#16103a,#1a0f3a)", border: `1px solid ${C.accentSoft}`, borderRadius: 22, padding: 22, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>TOTAL REVENUE</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 48, fontWeight: 800, marginBottom: 4 }}>{displayRev}</div>
                  <div style={{ fontSize: 13, color: C.mid }}>From {confirmed.length} confirmed appointment{confirmed.length !== 1 ? "s" : ""}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                  {[
                    { label: "Appointments", value: String(appts.length) },
                    { label: "Confirmed", value: String(confirmed.length) },
                    { label: "Avg per appt", value: "$" + Math.round(totalRev / Math.max(confirmed.length, 1)) },
                    { label: "Today's revenue", value: "$" + todayRev },
                  ].map((s, i) => (
                    <Card key={i} style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>{s.label}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800, color: C.accent }}>{s.value}</div>
                    </Card>
                  ))}
                </div>
                <SectionLabel>{barLabel}</SectionLabel>
                <Card style={{ padding: 20, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100, marginBottom: 12 }}>
                    {bars.map((b, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                          <div style={{ width: "100%", borderRadius: "8px 8px 0 0", background: b.revenue > 0 ? `linear-gradient(180deg,${C.accent},${C.accentDark})` : C.border, height: `${(b.revenue / maxBar) * 100}%`, minHeight: b.revenue > 0 ? 4 : 2, transition: "height 0.4s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {bars.map(b => <div key={b.day} style={{ flex: 1, textAlign: "center", fontSize: 9, color: C.dim, fontWeight: 600 }}>{b.day}</div>)}
                  </div>
                </Card>
              </div>
              <div>
                <SectionLabel>Top Services</SectionLabel>
                {topServices.length === 0 ? (
                  <Card style={{ padding: 24, textAlign: "center", marginBottom: 24 }}>
                    <div style={{ fontSize: 13, color: C.dim }}>No confirmed appointments yet — service breakdown will appear here.</div>
                  </Card>
                ) : (
                  <Card style={{ marginBottom: 24 }}>
                    {topServices.map((s, i) => (
                      <div key={i} style={{ padding: "14px 16px", borderBottom: i < topServices.length - 1 ? `1px solid ${C.border}` : "none" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>${Math.round(s.revenue)}</span>
                        </div>
                        <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(s.revenue / maxSvcRev) * 100}%`, background: `linear-gradient(90deg,${C.accentDark},${C.accent})`, borderRadius: 2 }} />
                        </div>
                        <div style={{ fontSize: 11, color: C.dim, marginTop: 6 }}>{s.count} appointment{s.count !== 1 ? "s" : ""}</div>
                      </div>
                    ))}
                  </Card>
                )}
                <SectionLabel>AI Insights</SectionLabel>
                {insights.map((ins, i) => (
                  <div key={i} style={{ background: C.accentSoft, border: `1px solid ${C.accent}22`, borderRadius: 14, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{"📅💰👥★".split("")[i]}</span>
                    <span style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>{ins}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── PROMOTIONS ─────────────────────────────────────────────────────────────────
function Promotions({ navigate }) {
  const isDesktop = useDesktop();
  const [creating, setCreating] = useState(false);
  const [promoTitle, setPromoTitle] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const [audience, setAudience] = useState("all");
  const [channel, setChannel] = useState(["email"]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [clients, setClients] = useState([]);
  const [pastPromos, setPastPromos] = useState([]);
  const [bizName, setBizName] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = session.user.id;
      const [cRes, pRes, bRes] = await Promise.all([
        supabase.from("clients").select("name,email,phone,total_visits").eq("owner_id", uid),
        supabase.from("promotions").select("*").eq("owner_id", uid).order("created_at", { ascending: false }).limit(20),
        supabase.from("business_profiles").select("biz_name").eq("user_id", uid).single(),
      ]);
      setClients(cRes.data || []);
      setPastPromos(pRes.data || []);
      setBizName(bRes.data?.biz_name || "");
      setBookingUrl(`https://omar51128102008-cloud.github.io/pocketflow/book?id=${uid}`);
    };
    load();
  }, []);

  const getAudience = () => {
    if (audience === "regulars") return clients.filter(c => (c.total_visits || 0) >= 3);
    if (audience === "inactive") return clients.filter(c => (c.total_visits || 0) < 2);
    return clients;
  };

  const handleSend = async () => {
    const targets = getAudience();
    if (!targets.length) { alert("No clients to send to!"); return; }
    setSending(true);
    let count = 0;
    const htmlBody = `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0f0f14;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px 28px 24px;">
          <div style="font-size:22px;font-weight:800;margin-bottom:4px;">${promoTitle}</div>
          <div style="font-size:14px;opacity:0.8;">${bizName}</div>
        </div>
        <div style="padding:28px;font-size:14px;line-height:1.7;color:#ddd;">
          ${promoMsg.replace(/\n/g, "<br/>")}
          <div style="margin-top:20px;"><a href="${bookingUrl}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">Book Now</a></div>
        </div>
      </div>`;

    for (const c of targets) {
      try {
        const body = { subject: promoTitle };
        if (channel.includes("email") && c.email) {
          body.to_email = c.email;
          body.html_body = htmlBody;
        }
        if (channel.includes("sms") && c.phone) {
          body.to_phone = c.phone;
          body.sms_body = `${promoTitle}\n\n${promoMsg}\n\nBook now: ${bookingUrl}`;
        }
        if (body.to_email || body.to_phone) {
          await fetch("https://pocketflow-proxy-production.up.railway.app/send-promo", {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
          });
          count++;
        }
      } catch {}
    }

    // Save promo record
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.from("promotions").insert([{ owner_id: session.user.id, title: promoTitle, message: promoMsg, audience, channel: channel.join(","), sent_count: count }]);
    }

    setSentCount(count);
    setSending(false);
    setSent(true);
  };

  if (sent) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Promo sent!</div>
      <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>Sent to {sentCount} client{sentCount !== 1 ? "s" : ""} via {channel.join(" & ")}</div>
      <BtnPrimary onClick={() => { setSent(false); setCreating(false); setPromoTitle(""); setPromoMsg(""); }} style={{ padding: "13px 28px" }}>Back to Promotions</BtnPrimary>
    </div>
  );

  const allCount = clients.length;
  const regCount = clients.filter(c => (c.total_visits || 0) >= 3).length;
  const inactiveCount = clients.filter(c => (c.total_visits || 0) < 2).length;

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {creating ? <BackBtn onBack={() => setCreating(false)} /> : <BackBtn onBack={() => navigate("home")} />}
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>{creating ? "New Promotion" : "Promotions"}</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {!creating ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 }}>
              {[{ label: "Total promos sent", value: String(pastPromos.length), color: C.accent }, { label: "Total clients", value: String(allCount), color: C.gold }].map((s, i) => (
                <Card key={i} style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{s.label}</div>
                </Card>
              ))}
            </div>
            <SectionLabel>Past Promotions</SectionLabel>
            {pastPromos.length === 0 ? (
              <Card style={{ padding: "32px 20px", textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📣</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>No promotions yet</div>
                <div style={{ fontSize: 13, color: C.dim }}>Create your first promo to reach your clients</div>
              </Card>
            ) : pastPromos.map((p, i) => (
              <Card key={i} style={{ padding: 16, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: C.dim }}>{timeAgo(p.created_at)}</div>
                </div>
                <div style={{ fontSize: 12, color: C.mid, marginBottom: 8 }}>{p.message?.slice(0, 80)}...</div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div><div style={{ fontSize: 11, color: C.dim }}>Sent to</div><div style={{ fontSize: 16, fontWeight: 700, color: C.accent }}>{p.sent_count || 0}</div></div>
                  <div><div style={{ fontSize: 11, color: C.dim }}>Via</div><div style={{ fontSize: 12, fontWeight: 600, color: C.mid }}>{p.channel || "email"}</div></div>
                </div>
              </Card>
            ))}
            <BtnPrimary onClick={() => setCreating(true)} style={{ width: "100%", padding: 16, marginTop: 8 }}>+ Create New Promo</BtnPrimary>
          </>
        ) : (
          <>
            <input placeholder="Promo title (e.g. Friday Flash Deal 🔥)" value={promoTitle} onChange={e => setPromoTitle(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
              <textarea placeholder="Write your message..." value={promoMsg} onChange={e => setPromoMsg(e.target.value)} rows={4} style={{ width: "100%", background: "none", border: "none", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", resize: "none" }} />
            </div>
            <button disabled={generating} onClick={async () => {
              setGenerating(true);
              try {
                const res = await fetch("https://pocketflow-proxy-production.up.railway.app/chat", {
                  method: "POST", headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    model: "llama-3.1-8b-instant", max_tokens: 250,
                    messages: [
                      { role: "system", content: `You write short, engaging promotional messages for a business called "${bizName}". Write a casual, warm promo message that includes a call to action. No subject line, just the message body. Keep it under 4 sentences. Include an emoji or two. End with "Book now: ${bookingUrl}"` },
                      { role: "user", content: promoTitle ? `Write a promo about: ${promoTitle}` : "Write a general promotional message for open slots this week with a discount offer" },
                    ],
                  }),
                });
                const data = await res.json();
                const msg = data.choices?.[0]?.message?.content || "";
                if (msg) setPromoMsg(msg.trim());
              } catch {}
              setGenerating(false);
            }} style={{ width: "100%", padding: 12, background: C.accentSoft, border: `1px solid ${C.accent}44`, borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.accent, cursor: generating ? "wait" : "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 20 }}>{generating ? "✦ Generating..." : "✦ Generate with AI"}</button>
            <SectionLabel>Send to</SectionLabel>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[{ id: "all", label: `All (${allCount})` }, { id: "regulars", label: `Regulars (${regCount})` }, { id: "inactive", label: `Inactive (${inactiveCount})` }].map(a => (
                <div key={a.id} onClick={() => setAudience(a.id)} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, background: audience === a.id ? C.accentSoft : C.surface, border: `1px solid ${audience === a.id ? C.accent : C.border}`, textAlign: "center", fontSize: 11, fontWeight: 600, color: audience === a.id ? C.accent : C.mid, cursor: "pointer" }}>{a.label}</div>
              ))}
            </div>
            <SectionLabel>Send via</SectionLabel>
            <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
              {[{ id: "email", label: "✉ Email" }, { id: "sms", label: "◎ SMS" }].map(ch => (
                <div key={ch.id} onClick={() => setChannel(p => p.includes(ch.id) ? p.filter(x => x !== ch.id) : [...p, ch.id])} style={{ flex: 1, padding: "12px", borderRadius: 12, background: channel.includes(ch.id) ? C.accentSoft : C.surface, border: `1px solid ${channel.includes(ch.id) ? C.accent : C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: channel.includes(ch.id) ? C.accent : C.mid, cursor: "pointer" }}>{ch.label}</div>
              ))}
            </div>
            {(promoTitle || promoMsg) && (
              <Card style={{ padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Preview</div>
                {channel.includes("email") && (
                  <div style={{ background: C.surfaceHigh, borderRadius: 12, padding: 14, marginBottom: channel.includes("sms") ? 10 : 0 }}>
                    <div style={{ fontSize: 10, color: C.accent, fontWeight: 700, marginBottom: 6 }}>EMAIL</div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{promoTitle || "Subject"}</div>
                    <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>{promoMsg || "Message body"}</div>
                  </div>
                )}
                {channel.includes("sms") && (
                  <div style={{ background: C.surfaceHigh, borderRadius: 12, padding: 14 }}>
                    <div style={{ fontSize: 10, color: C.green, fontWeight: 700, marginBottom: 6 }}>SMS</div>
                    <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5, fontFamily: "monospace" }}>{promoTitle}{promoMsg ? "\n\n" + promoMsg : ""}{bookingUrl ? "\n\nBook now: " + bookingUrl : ""}</div>
                    <div style={{ fontSize: 10, color: C.dim, marginTop: 6 }}>{((promoTitle || "") + (promoMsg || "") + (bookingUrl || "")).length}/160 characters</div>
                  </div>
                )}
              </Card>
            )}
            <BtnPrimary disabled={!promoTitle || !promoMsg || sending} onClick={handleSend} style={{ width: "100%", padding: 16 }}>{sending ? "Sending..." : "Send Promo"}</BtnPrimary>
          </>
        )}
      </div>
    </div>
  );
}

// ── BOOKING PAGE (client-facing) ───────────────────────────────────────────────
function Booking({ navigate }) {
  const [step, setStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [note, setNote] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [booked, setBooked] = useState(false);
  const [paying, setPaying] = useState(false);
  const [services, setServices] = useState([]);
  const [bizName, setBizName] = useState("Your Business");
  const [bizLocation, setBizLocation] = useState("");
  const [loadingServices, setLoadingServices] = useState(true);

  // Get owner ID from URL param (public booking page) or from session (in-app)
  const ownerIdFromUrl = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    const load = async () => {
      // Use URL param first (public booking), fall back to logged-in user
      let ownerId = ownerIdFromUrl;
      if (!ownerId) {
        const { data: { session } } = await supabase.auth.getSession();
        ownerId = session?.user?.id;
      }
      if (!ownerId) { setLoadingServices(false); return; }

      const [profRes, svcRes] = await Promise.all([
        supabase.from("business_profiles").select("biz_name,location").eq("user_id", ownerId).single(),
        supabase.from("services").select("*").eq("owner_id", ownerId).eq("active", true).order("created_at", { ascending: true })
      ]);
      if (profRes.data) { setBizName(profRes.data.biz_name || "Your Business"); setBizLocation(profRes.data.location || ""); }
      setServices((svcRes.data || []).map(s => ({ id: s.id, name: s.name, price: Number(s.price), duration: s.duration, icon: s.icon || "✨", desc: s.description || "" })));
      setLoadingServices(false);
    };
    load();
  }, []);

  const dates = (() => {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const out = []; const today = new Date();
    for (let i = 1; i <= 8; i++) { const d = new Date(today); d.setDate(today.getDate() + i); out.push(`${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`); }
    return out;
  })();
  const times = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"];
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const depositAmount = Math.round(totalPrice * 0.3);
  const depositStr = "$" + depositAmount;

  const toggleService = (s) => {
    setSelectedServices(prev =>
      prev.find(x => x.id === s.id) ? prev.filter(x => x.id !== s.id) : [...prev, s]
    );
  };

  const formatCard = (val) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (val) => { const v = val.replace(/\D/g, "").slice(0, 4); return v.length >= 3 ? v.slice(0,2) + "/" + v.slice(2) : v; };

  const handlePay = async () => {
    setPaying(true);
    try {
      // Get owner ID from URL (public booking) or session (in-app)
      let uid = ownerIdFromUrl;
      if (!uid) {
        const { data: { session } } = await supabase.auth.getSession();
        uid = session?.user?.id;
      }
      if (!uid) { setPaying(false); return; }

      // 1. Save appointment to Supabase
      const apptData = {
        owner_id: uid,
        client_name: name,
        client_phone: phone,
        client_instagram: instagram,
        service: selectedServices.map(s => s.name).join(", "),
        price: "$" + totalPrice,
        deposit: "$" + depositAmount,
        day: selectedDate,
        time: selectedTime,
        status: "pending",
        note: note || "",
      };
      const { error: apptErr } = await supabase.from("appointments").insert(apptData);
      if (apptErr) console.error("Appointment save error:", apptErr);

      // 2. Save/update client record
      const { data: existingClient } = await supabase.from("clients")
        .select("id,total_visits,total_spent")
        .eq("owner_id", uid)
        .ilike("name", name.trim())
        .single();
      if (existingClient) {
        await supabase.from("clients").update({
          total_visits: (existingClient.total_visits || 0) + 1,
          total_spent: (parseFloat(String(existingClient.total_spent || "0").replace(/[^0-9.]/g, "")) + totalPrice).toFixed(0),
          last_visit: new Date().toISOString().split("T")[0],
        }).eq("id", existingClient.id);
      } else {
        await supabase.from("clients").insert({
          owner_id: uid, name: name.trim(), phone, instagram,
          total_visits: 1, total_spent: "$" + totalPrice,
          last_visit: new Date().toISOString().split("T")[0],
          tags: [], notes: "",
        });
      }

      // 3. Notify owner — email + in-app notification
      try {
        // Email via proxy (server will look up owner email by owner_id)
        await fetch("https://pocketflow-proxy-production.up.railway.app/notify-booking", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            owner_id: uid,
            client_name: name,
            client_phone: phone,
            service: selectedServices.map(s => s.name).join(", "),
            date: selectedDate,
            time: selectedTime,
            deposit: depositStr,
            total: "$" + totalPrice,
            biz_name: bizName,
            note: note || "",
          }),
        });

        // In-app notification in Supabase
        await supabase.from("notifications").insert({
          user_id: uid,
          type: "booking",
          title: "New Booking!",
          body: `${name} booked ${selectedServices.map(s => s.name).join(", ")} on ${selectedDate} at ${selectedTime}`,
          read: false,
          created_at: new Date().toISOString(),
        });
      } catch (e) { console.log("Notify failed (non-critical):", e); }

      // Auto-sync to owner's Google Calendar via proxy
      await addToGoogleCalendar({
        ownerId: uid,
        service: selectedServices.map(s => s.name).join(", "),
        date: selectedDate,
        time: selectedTime,
        clientName: name,
        bizName,
        bizLocation,
        deposit: depositStr,
        phone,
      });

      setBooked(true);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong. Please try again.");
    }
    setPaying(false);
  };

  if (booked) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center", background: C.bg }}>
      <div style={{ width: 90, height: 90, borderRadius: 28, background: C.green + "22", border: "2px solid " + C.green + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 24, animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>✓</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>You're booked!</div>
      <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.8, marginBottom: 16 }}>
        {selectedServices.map(s => s.name).join(" + ")}<br />
        {selectedDate} at {selectedTime}<br />
        <span style={{ color: C.accent, fontWeight: 600 }}>{bizName}{bizLocation ? " · " + bizLocation : ""}</span>
      </div>
      <Card style={{ padding: 16, width: "100%", marginBottom: 24, textAlign: "left" }}>
        {[["Services", selectedServices.map(s => s.name).join(", ")], ["Deposit paid", depositStr], ["Remaining balance", "$" + (totalPrice - depositAmount) + "+"], ["Confirmation sent to", phone]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: k !== "Confirmation sent to" ? "1px solid " + C.border : "none", gap: 12 }}>
            <span style={{ fontSize: 13, color: C.mid, flexShrink: 0 }}>{k}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: k === "Deposit paid" ? C.green : C.text, textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </Card>
      <div style={{ fontSize: 13, color: C.mid, marginBottom: 20, lineHeight: 1.6 }}>You'll receive a reminder 24 hours before your appointment. ✨</div>

      {/* Add to Google Calendar */}
      {(() => {
        const buildGCalUrl = () => {
          try {
            const months = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
            const parts = selectedDate.split(" "); // "Mon Jan 13"
            const month = months[parts[1]]; const day = parseInt(parts[2]);
            const year = new Date().getFullYear();
            const timeParts = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
            let hour = parseInt(timeParts[1]); const min = timeParts[2];
            if (timeParts[3].toUpperCase() === "PM" && hour !== 12) hour += 12;
            if (timeParts[3].toUpperCase() === "AM" && hour === 12) hour = 0;
            const start = new Date(year, month, day, hour, parseInt(min));
            const end = new Date(start.getTime() + 60 * 60 * 1000);
            const fmt = d => d.toISOString().replace(/[-:]/g,"").split(".")[0] + "Z";
            const title = encodeURIComponent(`${selectedServices.map(s=>s.name).join(" + ")} at ${bizName}`);
            const details = encodeURIComponent(`Appointment booked via spool\nDeposit paid: ${depositStr}\nContact: ${phone}`);
            const loc = encodeURIComponent(bizLocation || bizName);
            return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${loc}`;
          } catch { return null; }
        };
        const url = buildGCalUrl();
        return url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "13px 0", borderRadius: 14, background: C.surface, border: "1px solid " + C.border, fontSize: 14, fontWeight: 700, color: C.text, textDecoration: "none", marginBottom: 12 }}>
            <span style={{ fontSize: 18 }}>📅</span> Add to Google Calendar
          </a>
        ) : null;
      })()}

      <div style={{ fontSize: 12, color: C.dim }}>Powered by <span style={{ color: C.accent, fontWeight: 700 }}>spool</span></div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: 120 }}>
      <div style={{ background: "linear-gradient(180deg,#16103a 0%," + C.bg + " 100%)", padding: "48px 24px 24px", textAlign: "center", position: "relative" }}>
        {step > 0 && (
          <div onClick={() => setStep(p => p - 1)} style={{ position: "absolute", top: 52, left: 20, width: 38, height: 38, background: C.surface + "cc", border: "1px solid " + C.border, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </div>
        )}
        <div style={{ width: 72, height: 72, borderRadius: 22, background: "linear-gradient(135deg," + C.accentDark + "," + C.accent + ")", margin: "0 auto 14px", boxShadow: "0 0 40px " + C.accentDark + "55", overflow: "hidden", padding: 14 }}><img src={SPOOL_LOGO} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>{bizName}</div>
        <div style={{ fontSize: 13, color: C.mid, marginTop: 5 }}>{bizLocation || "Book an appointment"}</div>
      </div>

      <div style={{ display: "flex", gap: 6, padding: "0 24px 20px" }}>
        {["Services", "Date & Time", "Your Info", "Payment"].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ height: 3, borderRadius: 2, background: i <= step ? "linear-gradient(90deg," + C.accentDark + "," + C.accent + ")" : C.border, marginBottom: 6, transition: "background 0.3s" }} />
            <div style={{ fontSize: 9, color: i <= step ? C.accent : C.dim, fontWeight: 600 }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 20px" }}>
        {step === 0 && (
          <div className="fade-in">
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>What are you coming in for?</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>You can select multiple services</div>
            {loadingServices ? (
              <div style={{ textAlign: "center", padding: 40, color: C.dim, fontSize: 14 }}>Loading services...</div>
            ) : services.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✂️</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>No services yet</div>
                <div style={{ fontSize: 13, color: C.dim, marginBottom: 20 }}>Add your services in Settings → Services first</div>
                <BtnPrimary onClick={() => navigate("services")} style={{ padding: "10px 24px", fontSize: 13 }}>Add Services</BtnPrimary>
              </div>
            ) : services.map(s => {
              const selected = selectedServices.find(x => x.id === s.id);
              return (
                <div key={s.id} onClick={() => toggleService(s)} style={{ display: "flex", alignItems: "center", gap: 14, background: selected ? C.accentSoft : C.surface, border: "1px solid " + (selected ? C.accent : C.border), borderRadius: 18, padding: "16px", marginBottom: 10, cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 16, background: selected ? "linear-gradient(135deg," + C.accentDark + "," + C.accent + ")" : C.surfaceHigh, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: C.mid, marginTop: 3 }}>{s.desc} · {s.duration}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: C.gold }}>${s.price}+</div>
                    {selected && <div style={{ fontSize: 10, color: C.accent, fontWeight: 700, marginTop: 3 }}>✓ Added</div>}
                  </div>
                </div>
              );
            })}
            {selectedServices.length > 0 && (
              <div style={{ background: C.accentSoft, border: "1px solid " + C.accent + "33", borderRadius: 14, padding: "12px 16px", marginTop: 4 }}>
                <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 4 }}>{selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected</div>
                <div style={{ fontSize: 13, color: C.mid }}>{selectedServices.map(s => s.name).join(" + ")}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.gold, marginTop: 6 }}>Total: ${totalPrice}+ · Deposit: {depositStr}</div>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="fade-in">
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>When works for you?</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>{selectedServices.map(s => s.name).join(" + ")}</div>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Available Dates</div>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 16, marginBottom: 20 }}>
              {dates.map(d => (
                <div key={d} onClick={() => { setSelectedDate(d); setSelectedTime(null); }} style={{ padding: "14px 16px", borderRadius: 16, background: selectedDate === d ? "linear-gradient(135deg," + C.accentDark + "," + C.accent + ")" : C.surface, border: "1px solid " + (selectedDate === d ? "transparent" : C.border), textAlign: "center", cursor: "pointer", flexShrink: 0, minWidth: 70 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: selectedDate === d ? "#ffffffaa" : C.dim, marginBottom: 4 }}>{d.split(" ")[0].toUpperCase()}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: selectedDate === d ? "#fff" : C.text }}>{d.split(" ")[2]}</div>
                  <div style={{ fontSize: 10, color: selectedDate === d ? "#ffffffaa" : C.dim, marginTop: 3 }}>{d.split(" ")[1]}</div>
                </div>
              ))}
            </div>
            {selectedDate && (
              <div className="fade-in">
                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Available Times</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {times.map(t => <div key={t} onClick={() => setSelectedTime(t)} style={{ padding: "13px 8px", borderRadius: 14, background: selectedTime === t ? C.accentSoft : C.surface, border: "1px solid " + (selectedTime === t ? C.accent : C.border), textAlign: "center", fontSize: 13, fontWeight: 600, color: selectedTime === t ? C.accent : C.mid, cursor: "pointer" }}>{t}</div>)}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Your details</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>Almost there — just need a few details</div>
            <Card style={{ padding: 16, marginBottom: 20 }}>
              {[["Services", selectedServices.map(s => s.name).join(", ")], ["Date", selectedDate], ["Time", selectedTime], ["Total", "$" + totalPrice + "+"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: k !== "Total" ? "1px solid " + C.border : "none", gap: 12 }}>
                  <span style={{ fontSize: 13, color: C.mid, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </Card>
            <input placeholder="Your full name *" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="(555) 123-4567" type="tel" value={phone} onChange={e => setPhone(handlePhoneInput(e.target.value))} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="Instagram handle (optional)" value={instagram} onChange={e => setInstagram(e.target.value)} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <textarea placeholder="Notes — special requests, notes, preferences..." value={note} onChange={e => setNote(e.target.value)} rows={3} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", resize: "none" }} />
          </div>
        )}

        {step === 3 && (
          <div className="fade-in">
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Pay deposit</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>Secure your spot with a 30% deposit</div>
            <Card style={{ padding: 16, marginBottom: 20 }}>
              {[["Services", selectedServices.map(s => s.name).join(", ")], ["Date & Time", selectedDate + " at " + selectedTime], ["Total estimate", "$" + totalPrice + "+"], ["Deposit (30%)", depositStr]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: k !== "Deposit (30%)" ? "1px solid " + C.border : "none", gap: 12 }}>
                  <span style={{ fontSize: 13, color: C.mid, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: k === "Deposit (30%)" ? 800 : 600, color: k === "Deposit (30%)" ? C.green : C.text, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </Card>
            <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Card Details</div>
            <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 18, padding: "4px 0", marginBottom: 16 }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid " + C.border }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>CARDHOLDER NAME</div>
                <input placeholder="Name on card" value={cardName} onChange={e => setCardName(e.target.value)} style={{ width: "100%", background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", fontWeight: 600 }} />
              </div>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid " + C.border }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>CARD NUMBER</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} style={{ flex: 1, background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", fontWeight: 600, letterSpacing: 2 }} />
                  <span style={{ fontSize: 20 }}>💳</span>
                </div>
              </div>
              <div style={{ display: "flex", padding: "12px 16px", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>EXPIRY</div>
                  <input placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} style={{ width: "100%", background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", fontWeight: 600 }} />
                </div>
                <div style={{ width: 1, background: C.border }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>CVC</div>
                  <input placeholder="123" value={cardCvc} onChange={e => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 3))} style={{ width: "100%", background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", fontWeight: 600 }} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.dim, marginBottom: 8 }}>
              <span>◉</span><span>Payments secured by Stripe. Your card info is never stored.</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 400, padding: "16px 20px 36px", background: "linear-gradient(0deg," + C.bg + " 70%,transparent)" }}>
        <BtnPrimary
          disabled={
            (step === 0 && selectedServices.length === 0) ||
            (step === 1 && (!selectedDate || !selectedTime)) ||
            (step === 2 && (!name || !phone)) ||
            (step === 3 && (!cardName || cardNumber.replace(/\s/g,"").length < 16 || cardExpiry.length < 5 || cardCvc.length < 3)) ||
            paying
          }
          onClick={() => step < 3 ? setStep(p => p + 1) : handlePay()}
          style={{ width: "100%", padding: 17, fontSize: 16 }}
        >
          {paying ? "Processing payment..." : step === 0 ? "Continue →" : step === 1 ? "Enter Your Details →" : step === 2 ? "Continue to Payment →" : "Pay " + depositStr + " & Confirm ◉"}
        </BtnPrimary>
      </div>
    </div>
  );
}



// ── STAFF ──────────────────────────────────────────────────────────────────────
function Staff({ navigate, userRole, staffOwnerId }) {
  const isDesktop = useDesktop();
  const [view, setView] = useState("list");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("Stylist");
  const [generatedCode, setGeneratedCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [staff, setStaff] = useState([]);
  const [aiName, setAiName] = useState("Aria");
  const [bizContext, setBizContext] = useState("");
  const [groupMessages, setGroupMessages] = useState([]);
  const [groupInput, setGroupInput] = useState("");
  const [gcRecording, setGcRecording] = useState(null);
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [myName, setMyName] = useState("You");
  const [myUserId, setMyUserId] = useState(null);
  const [bizOwnerId, setBizOwnerId] = useState(null);

  const statusColor = s => s === "active" ? C.green : C.yellow;

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const myId = session.user.id;
      setMyUserId(myId);
      const oid = (userRole === "staff" && staffOwnerId) ? staffOwnerId : myId;
      setBizOwnerId(oid);

      // Load my name
      if (userRole === "staff") {
        const { data: sp } = await supabase.from("staff_profiles").select("name").eq("user_id", myId).single();
        setMyName(sp?.name || session.user.email?.split("@")[0] || "You");
      } else {
        const { data: bp } = await supabase.from("business_profiles").select("settings").eq("user_id", myId).single();
        setMyName(bp?.settings?.displayName || session.user.email?.split("@")[0] || "You");
      }

      const { data: staffData } = await supabase.from("staff_members").select("*").eq("owner_id", oid).order("created_at", { ascending: true });
      if (staffData && staffData.length > 0) {
        setStaff(staffData.map(s => ({ id: s.id, name: s.name, role: s.role, avatar: s.avatar || s.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(), phone: s.phone || "", status: s.status || "active", appts: 0, revenue: "$0", rating: 5.0, services: [] })));
      }

      const [profRes, apptRes, svcRes] = await Promise.all([
        supabase.from("business_profiles").select("ai_name,biz_name,location").eq("user_id", oid).single(),
        supabase.from("appointments").select("client_name,service,time,day,status,price").eq("owner_id", oid).order("created_at",{ascending:false}).limit(20),
        supabase.from("services").select("name,price,duration").eq("owner_id", oid).eq("active",true).limit(10),
      ]);
      setAiName(profRes.data?.ai_name || "Aria");
      const biz = profRes.data?.biz_name || "your business";
      const services = (svcRes.data || []).map(s => `${s.name} ($${s.price})`).join(", ");
      setBizContext(`Business: ${biz}\nServices: ${services}\nTotal appointments: ${(apptRes.data||[]).length}`);

      // Load group chat from Supabase
      const { data: msgs } = await supabase.from("group_messages").select("*").eq("owner_id", oid).order("created_at", { ascending: true }).limit(100);
      if (msgs) setGroupMessages(msgs.map(m => ({ id: m.id, user_id: m.user_id, sender: m.sender_name, text: m.text, time: new Date(m.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}), isAI: m.is_ai })));
    };
    load();
  }, [userRole, staffOwnerId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupMessages, aiTyping]);

  // Auto-refresh group chat every 5s when viewing
  useEffect(() => {
    if (view !== "groupchat" || !bizOwnerId) return;
    const poll = setInterval(async () => {
      const { data: msgs } = await supabase.from("group_messages").select("*").eq("owner_id", bizOwnerId).order("created_at", { ascending: true }).limit(100);
      if (msgs) {
        const mapped = msgs.map(m => ({ id: m.id, user_id: m.user_id, sender: m.sender_name, text: m.text, time: new Date(m.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}), isAI: m.is_ai }));
        setGroupMessages(prev => prev.length !== mapped.length ? mapped : prev);
      }
    }, 5000);
    return () => clearInterval(poll);
  }, [view, bizOwnerId]);

  const sendGroupMessage = async () => {
    const text = groupInput.trim();
    if (!text || !bizOwnerId) return;
    setGroupInput("");
    const now = new Date();
    const timeStr = now.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

    // Save to Supabase
    const { data: inserted } = await supabase.from("group_messages").insert([{
      owner_id: bizOwnerId, user_id: myUserId, sender_name: myName, text, is_ai: false,
    }]).select().single();
    const msg = { id: inserted?.id || Date.now(), user_id: myUserId, sender: myName, text, time: timeStr, isAI: false };
    setGroupMessages(p => [...p, msg]);

    // Check if @AI is mentioned
    const aiMention = new RegExp(`@${aiName}`, "i");
    const genericMention = /@(emi|aria|ai|assistant)/i;
    if (aiMention.test(text) || genericMention.test(text)) {
      setAiTyping(true);
      const question = text.replace(/@\w+/g, "").trim();
      try {
        const res = await fetch("https://pocketflow-proxy-production.up.railway.app/chat", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant", max_tokens: 200,
            messages: [
              { role: "system", content: `You are ${aiName}, an AI assistant in a staff group chat. Be concise, helpful, and friendly. Business context:\n${bizContext}\nAnswer questions from the staff about the business, schedule, clients, or anything they need. Keep replies short (2-3 sentences max). No navigation commands here.` },
              ...groupMessages.slice(-10).map(m => ({ role: m.isAI ? "assistant" : "user", content: m.text })),
              { role: "user", content: question || text }
            ],
          }),
        });
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content || "Got it!";
        setAiTyping(false);
        await supabase.from("group_messages").insert([{ owner_id: bizOwnerId, user_id: "ai", sender_name: aiName, text: reply, is_ai: true }]);
        setGroupMessages(p => [...p, { id: Date.now()+1, user_id: "ai", sender: aiName, text: reply, time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}), isAI: true }]);
      } catch {
        setAiTyping(false);
        setGroupMessages(p => [...p, { id: Date.now()+1, user_id: "ai", sender: aiName, text: "Connection issue, try again.", time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}), isAI: true }]);
      }
    }
  };

  // ── GROUP CHAT VIEW ──
  if (view === "groupchat") {
    const staffNames = staff.map(s => s.name);
    return (
      <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bg }}>
        <div style={{ padding:"52px 20px 14px", background:C.bg, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
          <div onClick={() => setView("list")} style={{ width:36, height:36, borderRadius:11, background:C.surface, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </div>
          <div style={{ width:38, height:38, borderRadius:12, background:`linear-gradient(135deg,${C.accentDark},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>👥</div>
          <div>
            <div style={{ fontSize:15, fontWeight:700 }}>Staff Group Chat</div>
            <div style={{ fontSize:11, color:C.green, fontWeight:600 }}>✦ {aiName} · {staffNames.join(", ") || "No staff yet"}</div>
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 8px" }}>
          {groupMessages.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 20px", color:C.dim }}>
              <div style={{ fontSize:36, marginBottom:12 }}>👥</div>
              <div style={{ fontSize:14, fontWeight:600, marginBottom:6 }}>Staff group chat</div>
              <div style={{ fontSize:13, lineHeight:1.7 }}>Share updates with your team.<br/>Type <span style={{color:C.accent, fontWeight:700}}>@{aiName}</span> to ask the AI anything.</div>
            </div>
          )}
          {groupMessages.map((m, i) => {
            const isMe = m.user_id === myUserId;
            const isAI = m.isAI;
            const showName = !isMe && (i === 0 || groupMessages[i-1]?.user_id !== m.user_id);
            const avatar = m.sender ? m.sender.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() : "?";
            const showAvatar = !isMe && (i === groupMessages.length - 1 || groupMessages[i+1]?.user_id !== m.user_id);
            return (
              <div key={m.id || i} style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: 8, marginBottom: groupMessages[i+1]?.user_id === m.user_id ? 2 : 12, alignItems: "flex-end" }}>
                {!isMe && (
                  <div style={{ width: 32, height: 32, flexShrink: 0, visibility: showAvatar ? "visible" : "hidden" }}>
                    {isAI
                      ? <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 800 }}>AI</div>
                      : <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.surfaceHigh, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.mid }}>{avatar}</div>
                    }
                  </div>
                )}
                <div style={{ maxWidth: "72%" }}>
                  {showName && <div style={{ fontSize: 11, color: isAI ? C.accent : C.mid, fontWeight: 600, marginBottom: 3, marginLeft: 4 }}>{m.sender}</div>}
                  <div style={{ padding: "10px 14px", borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: isMe ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : isAI ? "rgba(124,58,237,0.12)" : C.surface, border: isMe ? "none" : `1px solid ${isAI ? C.accent + "22" : C.border}`, fontSize: 14, lineHeight: 1.5, color: isMe ? "#fff" : C.text }}>
                    {m.text.startsWith("VOICE:") ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div onClick={e => { const audio = e.currentTarget.parentElement.querySelector("audio"); if (audio) audio.paused ? audio.play() : audio.pause(); }} style={{ width: 32, height: 32, borderRadius: "50%", background: isMe ? "rgba(255,255,255,0.2)" : C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill={isMe ? "#fff" : C.accent}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ height: 4, background: isMe ? "rgba(255,255,255,0.3)" : C.border, borderRadius: 2 }}><div style={{ height: "100%", width: "60%", background: isMe ? "#fff" : C.accent, borderRadius: 2 }} /></div>
                          <div style={{ fontSize: 10, color: isMe ? "rgba(255,255,255,0.7)" : C.dim, marginTop: 3 }}>Voice message</div>
                        </div>
                        <audio src={m.text.replace("VOICE:", "")} preload="none" />
                      </div>
                    ) : /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(m.text) || m.text.startsWith("data:image/") ? <img src={m.text} alt="" style={{ maxWidth: "100%", borderRadius: 14, display: "block" }} /> : m.text}
                  </div>
                  {(i === groupMessages.length - 1 || groupMessages[i+1]?.user_id !== m.user_id) && <div style={{ fontSize: 10, color: C.dim, marginTop: 3, textAlign: isMe ? "right" : "left", marginLeft: 4 }}>{m.time}</div>}
                </div>
              </div>
            );
          })}
          {aiTyping && (
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ width:28, height:28, borderRadius:9, background:`linear-gradient(135deg,${C.accentDark},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>✦</div>
              <div style={{ background:C.surfaceHigh, border:`1px solid ${C.border}`, borderRadius:"18px 18px 18px 4px", padding:"10px 14px", display:"flex", gap:5 }}>
                {[0,1,2].map(d=><div key={d} style={{width:5,height:5,borderRadius:"50%",background:C.accent,animation:"pulse 1.2s infinite",animationDelay:`${d*0.2}s`}}/>)}
              </div>
            </div>
          )}
          <div ref={chatEndRef}/>
        </div>

        <div style={{ padding:"10px 14px 32px", borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
          <div style={{ fontSize:11, color:C.dim, marginBottom:6, marginLeft:2 }}>Type <span style={{color:C.accent,fontWeight:700}}>@{aiName}</span> to ask the AI</div>
          <div style={{ display:"flex", gap:8, background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"8px 8px 8px 14px", alignItems:"center" }}>
            <label style={{ cursor:"pointer", fontSize:16, flexShrink:0, color: C.mid }}>
                  ◎
                  <input type="file" accept="image/*" style={{ display:"none" }} onChange={async e => {
                    const file = e.target.files?.[0]; if (!file) return;
                    const reader = new FileReader();
                    reader.onload = async ev => {
                      const compressed = await compressImage(ev.target.result, 400, 0.6);
                      await supabase.from("group_messages").insert([{ owner_id: bizOwnerId, user_id: myUserId, sender_name: myName, text: compressed, is_ai: false }]);
                      setGroupMessages(p => [...p, { id: Date.now(), user_id: myUserId, sender: myName, text: compressed, time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}), isAI: false }]);
                    };
                    reader.readAsDataURL(file);
                  }} />
                </label>
            <div onClick={async () => {
              if (gcRecording) {
                gcRecording.stop();
                return;
              }
              try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mr = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4" });
                const chunks = [];
                mr.ondataavailable = e => chunks.push(e.data);
                mr.onstop = async () => {
                  stream.getTracks().forEach(t => t.stop());
                  setGcRecording(null);
                  const blob = new Blob(chunks, { type: mr.mimeType });
                  const reader = new FileReader();
                  reader.onload = async () => {
                    const b64 = reader.result;
                    await supabase.from("group_messages").insert([{ owner_id: bizOwnerId, user_id: myUserId, sender_name: myName, text: "VOICE:" + b64, is_ai: false }]);
                    setGroupMessages(p => [...p, { id: Date.now(), user_id: myUserId, sender: myName, text: "VOICE:" + b64, time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}), isAI: false }]);
                  };
                  reader.readAsDataURL(blob);
                };
                mr.start();
                setGcRecording(mr);
              } catch { alert("Microphone access denied"); }
            }} style={{ cursor:"pointer", flexShrink:0, width: 28, height: 28, borderRadius: 12, background: gcRecording ? C.red : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={gcRecording ? "#fff" : C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            </div>
            {gcRecording && <div style={{ fontSize: 12, color: C.red, fontWeight: 700, animation: "pulse 1s infinite" }}>Recording...</div>}
            <input
              value={groupInput}
              onChange={e => setGroupInput(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter") sendGroupMessage(); }}
              placeholder={`Message the team or @${aiName}...`}
              style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}
            />
            <BtnPrimary onClick={sendGroupMessage} disabled={!groupInput.trim()} style={{ width:38, height:38, borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, padding:0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </BtnPrimary>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BackBtn onBack={() => navigate("home")} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Staff</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <div onClick={() => setView("groupchat")} style={{ padding:"9px 14px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              ⊡ <span>Group Chat</span>
              {groupMessages.length > 0 && <div style={{ width:7, height:7, borderRadius:"50%", background:C.accent }} />}
            </div>
            <div onClick={() => setShowInvite(true)} style={{ padding:"9px 14px", background: C.accentSoft, border:`1px solid ${C.accent}44`, borderRadius:12, fontSize:13, fontWeight:600, cursor:"pointer", color: C.accent }}>🔗 Invite</div>
            <BtnPrimary onClick={() => setShowAdd(true)} style={{ padding: "9px 16px", fontSize: 13 }}>+ Add</BtnPrimary>
          </div>
        </div>
        <div style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>{staff.filter(s => s.status === "active").length} active · {staff.length} total</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {staff.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>No staff yet</div>
            <div style={{ fontSize: 13, color: C.dim, marginBottom: 24 }}>Add team members to manage their schedules and revenue</div>
            <BtnPrimary onClick={() => setShowAdd(true)} style={{ padding: "12px 28px" }}>+ Add First Staff Member</BtnPrimary>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[{ label: "On shift", value: staff.filter(s => s.status === "active").length, color: C.green }, { label: "Total appts", value: staff.reduce((a, s) => a + s.appts, 0), color: C.accent }, { label: "Staff", value: staff.length, color: C.gold }].map((s, i) => (
                <Card key={i} style={{ padding: "14px 10px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>{s.label}</div>
                </Card>
              ))}
            </div>
            {staff.map(s => (
              <Card key={s.id} onClick={() => { setSelectedStaff(s); setView("member"); }} style={{ padding: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: C.accent }}>{s.avatar}</div>
                  <div style={{ position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderRadius: "50%", background: statusColor(s.status), border: `2px solid ${C.bg}` }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{s.role} · {s.appts} appts today</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{s.revenue}</div>
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 3 }}>{s.rating} ★</div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 430, padding: "24px 20px 40px" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Add Staff Member</div>
            <input placeholder="Full name" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="Role (e.g. Manager, Photographer, Stylist...)" value={newRole} onChange={e => setNewRole(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="(555) 123-4567" type="tel" value={newPhone} onChange={e => setNewPhone(handlePhoneInput(e.target.value))} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 20 }} />
            <BtnPrimary disabled={!newName || !newRole} onClick={async () => { try { const { data: { session } } = await supabase.auth.getSession(); if (!session) return; const oid = bizOwnerId || session.user.id; const avatar = newName.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(); const row = { name: newName, role: newRole, avatar, phone: newPhone, status: "active", owner_id: oid }; const { data, error } = await supabase.from("staff_members").insert([row]).select().single(); if (!error && data) { setStaff(p => [...p, { id: data.id, name: data.name, role: data.role, avatar, phone: data.phone || "", status: "active" }]); } else { console.error("Staff insert error:", error); setStaff(p => [...p, { id: Date.now(), name: newName, role: newRole, avatar, phone: newPhone, status: "active" }]); } } catch(e) { console.error("Staff add error:", e); setStaff(p => [...p, { id: Date.now(), name: newName, role: newRole, avatar: newName.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(), phone: newPhone, status: "active" }]); } setNewName(""); setNewRole(""); setNewPhone(""); setShowAdd(false); }} style={{ width: "100%", padding: 14 }}>Add Staff Member</BtnPrimary>
          </div>
        </div>
      )}

      {/* Invite to App Modal */}
      {showInvite && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => { setShowInvite(false); setGeneratedCode(""); setInviteName(""); }}>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 440, padding: "24px 20px 32px" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />
            {generatedCode ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Invite Ready!</div>
                <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>Share this code with your employee. They'll use it when signing up.</div>
                <div style={{ background: C.surface, border: `2px dashed ${C.accent}`, borderRadius: 16, padding: "20px", fontSize: 32, fontWeight: 800, letterSpacing: 6, color: C.accent, marginBottom: 16 }}>{generatedCode}</div>
                <BtnPrimary onClick={() => { navigator.clipboard?.writeText(generatedCode); }} style={{ width: "100%", padding: 14, marginBottom: 10 }}>Copy Code</BtnPrimary>
                <button onClick={() => { setShowInvite(false); setGeneratedCode(""); setInviteName(""); }} style={{ width: "100%", padding: 12, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 14, color: C.mid, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>Done</button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Invite Employee</div>
                <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>Generate a code for your team member to join spool</div>
                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Employee Name</div>
                <input placeholder="e.g. Sarah" value={inviteName} onChange={e => setInviteName(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 14 }} />
                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Role</div>
                <input placeholder="e.g. Photographer, Manager, Stylist..." value={inviteRole} onChange={e => setInviteRole(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 20 }} />
                <BtnPrimary disabled={!inviteName.trim()} onClick={async () => {
                  const code = "SP" + Math.random().toString(36).substring(2, 8).toUpperCase();
                  const { data: { session } } = await supabase.auth.getSession();
                  if (!session) return;
                  await supabase.from("team_invites").insert([{ owner_id: session.user.id, code, name: inviteName.trim(), role: inviteRole, status: "pending" }]);
                  setGeneratedCode(code);
                }} style={{ width: "100%", padding: 14 }}>Generate Invite Code</BtnPrimary>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── WAITLIST ───────────────────────────────────────────────────────────────────
function Waitlist({ navigate }) {
  const isDesktop = useDesktop();
  const [waitlist, setWaitlist] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("waitlist").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: true });
      if (data) setWaitlist(data.map(w => ({ id: w.id, name: w.name, service: w.service, requestedDate: w.requested_date || "Flexible", addedTime: w.created_at ? new Date(w.created_at).toLocaleDateString() : "Recently", avatar: w.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(), phone: w.phone || "", notified: w.notified || false })));
    };
    load();
  }, []);

  const notify = async (id) => {
    setWaitlist(p => p.map(w => w.id === id ? { ...w, notified: true } : w));
    try { await supabase.from("waitlist").update({ notified: true }).eq("id", id); } catch(e) {}
  };

  const remove = async (id) => {
    setWaitlist(p => p.filter(w => w.id !== id));
    try { await supabase.from("waitlist").delete().eq("id", id); } catch(e) {}
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BackBtn onBack={() => navigate("home")} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Waitlist</div>
          </div>
          <BtnPrimary onClick={() => setShowAdd(true)} style={{ padding: "9px 16px", fontSize: 13 }}>+ Add</BtnPrimary>
        </div>
        <div style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>{waitlist.length} people waiting</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {waitlist.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Waitlist is empty</div>
            <div style={{ fontSize: 14, color: C.mid }}>When clients request to be added, they'll show up here.</div>
          </div>
        ) : (
          <>
            <div style={{ background: C.accentSoft, border: `1px solid ${C.accent}22`, borderRadius: 14, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: C.mid, lineHeight: 1.5 }}>
              ✦ When a slot opens up, tap <span style={{ color: C.accent, fontWeight: 600 }}>Offer Slot</span> — AI will message the client automatically.
            </div>
            {waitlist.map((w, i) => (
              <Card key={w.id} style={{ padding: 16, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: C.accent, flexShrink: 0 }}>{w.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>#{i + 1} {w.name}</span>
                      {w.notified && <span style={{ fontSize: 10, color: C.yellow, background: "#fbbf2418", border: "1px solid #fbbf2433", borderRadius: 100, padding: "2px 8px", fontWeight: 600 }}>Offered</span>}
                    </div>
                    <div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{w.service} · {w.requestedDate}</div>
                  </div>
                  <div style={{ fontSize: 10, color: C.dim }}>{w.addedTime}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {!w.notified
                    ? <BtnPrimary onClick={() => notify(w.id)} style={{ flex: 1, padding: 10, fontSize: 13 }}>Offer Slot</BtnPrimary>
                    : <div style={{ flex: 1, padding: 10, background: "#fbbf2411", border: "1px solid #fbbf2433", borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.yellow, textAlign: "center" }}>Waiting for reply...</div>
                  }
                  <button onClick={() => remove(w.id)} style={{ width: 40, height: 40, background: "#f43f5e11", border: "1px solid #f43f5e22", borderRadius: 12, fontSize: 16, color: C.red, cursor: "pointer", flexShrink: 0, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>×</button>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>

      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Add to Waitlist</div>
            <input placeholder="Client name" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="Service requested" value={newService} onChange={e => setNewService(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="Preferred date (e.g. This weekend)" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="(555) 123-4567" value={newPhone} onChange={e => setNewPhone(handlePhoneInput(e.target.value))} type="tel" style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 20 }} />
            <BtnPrimary disabled={!newName || !newService} onClick={async () => { try { const { data: { session } } = await supabase.auth.getSession(); if (!session) return; const avatar = newName.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(); const row = { name: newName, service: newService, requested_date: newDate || "Flexible", phone: newPhone, owner_id: session.user.id, notified: false }; const { data, error } = await supabase.from("waitlist").insert([row]).select().single(); if (!error && data) { setWaitlist(p => [...p, { id: data.id, name: data.name, service: data.service, requestedDate: data.requested_date || "Flexible", addedTime: "Just now", avatar, phone: newPhone, notified: false }]); } else { setWaitlist(p => [...p, { id: Date.now(), name: newName, service: newService, requestedDate: newDate || "Flexible", addedTime: "Just now", avatar, phone: newPhone, notified: false }]); } } catch(e) { setWaitlist(p => [...p, { id: Date.now(), name: newName, service: newService, requestedDate: newDate || "Flexible", addedTime: "Just now", avatar: newName.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(), phone: newPhone, notified: false }]); } setNewName(""); setNewService(""); setNewDate(""); setNewPhone(""); setShowAdd(false); }} style={{ width: "100%", padding: 14 }}>Add to Waitlist</BtnPrimary>
          </div>
        </div>
      )}
    </div>
  );
}
// ── BUSINESS PROFILE ──────────────────────────────────────────────────────────
function BusinessProfile({ navigate }) {
  const [bizName, setBizName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const DEFAULT_HOURS = { mon: { open: "9:00", close: "18:00", off: false }, tue: { open: "9:00", close: "18:00", off: false }, wed: { open: "9:00", close: "18:00", off: false }, thu: { open: "9:00", close: "18:00", off: false }, fri: { open: "9:00", close: "18:00", off: false }, sat: { open: "10:00", close: "16:00", off: false }, sun: { open: "", close: "", off: true } };
  const [hours, setHours] = useState(DEFAULT_HOURS);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      const { data } = await supabase.from("business_profiles").select("*").eq("user_id", session.user.id).single();
      if (data) {
        setBizName(data.biz_name || "");
        setLocation(data.location || "");
        setPhone(data.phone || "");
        setBio(data.bio || "");
        setLogoUrl(data.logo_url || "");
        if (data.business_hours) {
          try { setHours(typeof data.business_hours === "string" ? JSON.parse(data.business_hours) : data.business_hours); } catch(e) {}
        }
      } else {
        setBizName(session.user.user_metadata?.business_name || "");
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    await supabase.from("business_profiles").upsert({ user_id: userId, biz_name: bizName, location, phone, bio, logo_url: logoUrl, business_hours: hours }, { onConflict: "user_id" });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("settings")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Business Profile</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {loading ? <div style={{ textAlign: "center", padding: 40, color: C.mid }}>Loading...</div> : <>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" style={{ width: 80, height: 80, borderRadius: 24, objectFit: "cover", border: `2px solid ${C.accent}44`, margin: "0 auto 12px", display: "block" }} />
            ) : (
              <div style={{ width: 80, height: 80, borderRadius: 24, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 12px" }}>✦</div>
            )}
          </div>
          <SectionLabel>Business Logo</SectionLabel>
          <Card style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <label style={{ flex: 1, padding: "12px 14px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.mid, cursor: "pointer", textAlign: "center", fontWeight: 600 }}>
                {logoUrl ? "Change Logo" : "Upload Logo"}
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={async e => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = async ev => { const compressed = await compressImage(ev.target.result, 200, 0.7); setLogoUrl(compressed); setSaved(false); }; reader.readAsDataURL(file); }} />
              </label>
              {logoUrl && <button onClick={() => { setLogoUrl(""); setSaved(false); }} style={{ padding: "12px 14px", background: "transparent", border: `1px solid ${C.red}44`, borderRadius: 12, fontSize: 13, color: C.red, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", fontWeight: 600 }}>Remove</button>}
            </div>
          </Card>
          <SectionLabel>Business Info</SectionLabel>
          <Card style={{ padding: 16, marginBottom: 16 }}>
            {[["Business name", bizName, setBizName], ["Location", location, setLocation], ["Phone number", phone, setPhone]].map(([label, val, set], i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                <input value={val} onChange={e => { set(e.target.value); setSaved(false); }} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
              </div>
            ))}
          </Card>
          <SectionLabel>Bio</SectionLabel>
          <textarea value={bio} onChange={e => { setBio(e.target.value); setSaved(false); }} rows={3} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", resize: "none", marginBottom: 20 }} />
          <SectionLabel>Business Hours</SectionLabel>
          <Card style={{ padding: 0, marginBottom: 20, overflow: "hidden" }}>
            {["mon","tue","wed","thu","fri","sat","sun"].map((day, i) => {
              const d = hours[day] || { open: "", close: "", off: true };
              const label = {mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday",sun:"Sunday"}[day];
              return (
                <div key={day} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 70, fontSize: 13, fontWeight: 600, color: d.off ? C.dim : C.text }}>{label.slice(0,3)}</div>
                  <div onClick={() => { const h = {...hours}; h[day] = {...d, off: !d.off}; setHours(h); setSaved(false); }} style={{ width: 36, height: 20, borderRadius: 10, background: d.off ? C.border : C.green, cursor: "pointer", position: "relative", flexShrink: 0, transition: "background 0.2s" }}>
                    <div style={{ width: 16, height: 16, borderRadius: 12, background: "#fff", position: "absolute", top: 2, left: d.off ? 2 : 18, transition: "left 0.2s" }} />
                  </div>
                  {d.off ? <div style={{ fontSize: 12, color: C.dim, fontStyle: "italic" }}>Closed</div> : <>
                    <input value={d.open} onChange={e => { const h = {...hours}; h[day] = {...d, open: e.target.value}; setHours(h); setSaved(false); }} type="time" style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "6px 8px", fontSize: 12, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
                    <span style={{ fontSize: 11, color: C.dim }}>to</span>
                    <input value={d.close} onChange={e => { const h = {...hours}; h[day] = {...d, close: e.target.value}; setHours(h); setSaved(false); }} type="time" style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "6px 8px", fontSize: 12, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
                  </>}
                </div>
              );
            })}
          </Card>
          <SectionLabel>Booking Link</SectionLabel>
          <Card style={{ padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: C.dim, marginBottom: 8 }}>Share this link so clients can book directly</div>
            <div style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 11, color: C.accent, fontWeight: 600, wordBreak: "break-all" }}>
              {userId ? `omar51128102008-cloud.github.io/pocketflow/book?id=${userId}` : "Loading..."}
            </div>
            <BtnPrimary onClick={() => userId && navigator.clipboard?.writeText(`https://omar51128102008-cloud.github.io/pocketflow/book?id=${userId}`)} style={{ width: "100%", padding: 12, marginTop: 12, fontSize: 13 }}>Copy Link</BtnPrimary>
          </Card>
          {saved
            ? <div style={{ width: "100%", padding: 14, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 14, fontSize: 14, fontWeight: 600, color: C.green, textAlign: "center" }}>✓ Saved!</div>
            : <BtnPrimary onClick={handleSave} disabled={saving} style={{ width: "100%", padding: 14 }}>{saving ? "Saving..." : "Save Changes"}</BtnPrimary>
          }
        </>}
      </div>
      <BottomNav active="settings" navigate={navigate} />
    </div>
  );
}

// ── CONNECTED ACCOUNTS ─────────────────────────────────────────────────────────
function ConnectedAccounts({ navigate }) {
  const GOOGLE_CLIENT_ID = "51949875643-qeid5cs66tbr6gu8f3tac6vhfof94raq.apps.googleusercontent.com";
  const GOOGLE_SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const [googleConnected, setGoogleConnected] = useState(false);
  const [googleEmail, setGoogleEmail] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Check if already connected on mount + listen for token changes
  const checkGoogleToken = () => {
    const token = localStorage.getItem("google_access_token");
    const email = localStorage.getItem("google_email");
    const expiry = localStorage.getItem("google_token_expiry");
    if (token && expiry && Date.now() < parseInt(expiry)) {
      setGoogleConnected(true);
      setGoogleEmail(email);
    } else {
      localStorage.removeItem("google_access_token");
      localStorage.removeItem("google_email");
      localStorage.removeItem("google_token_expiry");
      setGoogleConnected(false);
      setGoogleEmail(null);
    }
  };

  useEffect(() => {
    checkGoogleToken();
    window.addEventListener("storage", checkGoogleToken);
    return () => window.removeEventListener("storage", checkGoogleToken);
  }, []);

  const connectGoogle = () => {
    setGoogleLoading(true);
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: "https://omar51128102008-cloud.github.io/pocketflow",
      response_type: "token",
      scope: GOOGLE_SCOPES,
      include_granted_scopes: "true",
      state: "google_calendar_auth",
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  const disconnectGoogle = () => {
    localStorage.removeItem("google_access_token");
    localStorage.removeItem("google_email");
    localStorage.removeItem("google_token_expiry");
    setGoogleConnected(false);
    setGoogleEmail(null);
    setToast("Google Calendar disconnected");
    setTimeout(() => setToast(null), 3000);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  return (
    <div style={{ paddingBottom: 80 }}>
      {toast && (
        <div style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 20px", fontSize: 13, fontWeight: 600, zIndex: 9999, whiteSpace: "nowrap", boxShadow: "0 4px 20px #0008" }}>{toast}</div>
      )}
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("settings")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Connected Accounts</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ background: C.accentSoft, border: `1px solid ${C.accent}22`, borderRadius: 16, padding: 14, marginBottom: 20, fontSize: 13, color: C.mid, lineHeight: 1.6 }}>✦ Connect your accounts so AI can reply to clients, confirm bookings, and send reminders automatically.</div>

        <SectionLabel>Calendar</SectionLabel>
        <Card style={{ padding: 16, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "#4285F418", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📅</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Google Calendar</div>
              <div style={{ fontSize: 12, color: googleConnected ? C.green : C.mid, marginTop: 2, fontWeight: googleConnected ? 600 : 400 }}>
                {googleConnected ? `✓ Connected${googleEmail ? " · " + googleEmail : ""}` : "Sync appointments automatically"}
              </div>
            </div>
            {googleConnected ? (
              <button onClick={disconnectGoogle} style={{ padding: "7px 14px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 12, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
                Disconnect
              </button>
            ) : (
              <button onClick={connectGoogle} disabled={googleLoading} style={{ padding: "7px 14px", background: "linear-gradient(135deg,#4285F4,#34A853)", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", opacity: googleLoading ? 0.7 : 1 }}>
                {googleLoading ? "..." : "Connect"}
              </button>
            )}
          </div>
          {googleConnected && (
            <div style={{ marginTop: 12, padding: "10px 12px", background: C.accentSoft, borderRadius: 10, fontSize: 12, color: C.mid, lineHeight: 1.6 }}>
              ✦ New appointments will automatically be added to your Google Calendar when booked.
            </div>
          )}
        </Card>

        <SectionLabel>Coming Soon</SectionLabel>
        <Card>
          {[
            { icon: "W", label: "WhatsApp Business", sub: "Auto-reply to client messages", color: "#25D366" },
            { icon: "📸", label: "Instagram DMs", sub: "Reply to DMs automatically", color: "#E1306C" },
            { icon: "⊡", label: "Facebook Messenger", sub: "Handle Facebook inquiries", color: "#1877F2" },
          ].map((a, i, arr) => (
            <div key={a.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none", opacity: 0.5 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: a.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{a.label}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{a.sub}</div></div>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 600 }}>Soon</div>
            </div>
          ))}
        </Card>
      </div>
      <BottomNav active="settings" navigate={navigate} />
    </div>
  );
}

// ── SUBSCRIPTION ───────────────────────────────────────────────────────────────
function Subscription({ navigate }) {
  const PUBLISHABLE_KEY = "pk_test_51T8qBCRxHDrhPBhiYgQ6PWQICHiPKEVfvtss5dgPHr8KXAfgyJcqvuA1BkVbqYoT2I1qSm4wbJnffFdOMnEXhFnz00pAOhvMxG";
  const [plan, setPlan] = useState(null); // null = loading
  const [subInfo, setSubInfo] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const plans = [
    {
      id: "starter", name: "Starter", price: 19, period: "/mo",
      priceId: "price_1T8qP5RxHDrhPBhiNqLYFViQ",
      features: ["Up to 50 clients", "AI chat assistant", "Basic scheduling", "Public booking page", "1 staff member"],
      color: C.accent,
    },
    {
      id: "pro", name: "Pro", price: 39, period: "/mo",
      priceId: "price_1T8qPURxHDrhPBhifZ5MlxTH",
      features: ["Unlimited clients", "Voice AI assistant", "Full analytics", "Loyalty & promotions", "Up to 10 staff", "Priority support", "Google Calendar sync", "ManyChat integration"],
      color: "#f59e0b",
      badge: "Most Popular",
    },
  ];

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      try {
        const res = await fetch("https://pocketflow-proxy-production.up.railway.app/subscription-status", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: session.user.id, email: session.user.email }),
        });
        const data = await res.json();
        setPlan(data.plan || "free");
        setSubInfo(data);
      } catch {
        setPlan("free");
      }
    };
    load();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const startCheckout = async (p) => {
    setCheckoutLoading(p.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("https://pocketflow-proxy-production.up.railway.app/create-checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: p.id,
          price_id: p.priceId,
          user_id: session.user.id,
          email: session.user.email,
          success_url: window.location.origin + "/pocketflow?checkout=success",
          cancel_url: window.location.origin + "/pocketflow?checkout=cancel",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        showToast("Could not start checkout. Try again.", "error");
      }
    } catch {
      showToast("Connection error. Try again.", "error");
    }
    setCheckoutLoading(null);
  };

  const cancelSubscription = async () => {
    if (!window.confirm("Cancel your subscription? You'll keep access until the end of the billing period.")) return;
    setCancelLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("https://pocketflow-proxy-production.up.railway.app/cancel-subscription", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: session.user.id, email: session.user.email }),
      });
      const data = await res.json();
      if (data.ok) {
        showToast("Subscription cancelled. Access continues until billing period ends.");
        setSubInfo(prev => ({ ...prev, cancel_at_period_end: true }));
      } else {
        showToast("Could not cancel. Contact support.", "error");
      }
    } catch {
      showToast("Connection error.", "error");
    }
    setCancelLoading(false);
  };

  const currentPlan = plans.find(p => p.id === plan);
  const isActive = plan && plan !== "free";
  const renewDate = subInfo?.current_period_end
    ? new Date(subInfo.current_period_end * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div style={{ paddingBottom: 100 }}>
      {toast && (
        <div style={{ position: "fixed", top: 60, left: "50%", transform: "translateX(-50%)", zIndex: 999, background: toast.type === "error" ? C.red : C.green, color: "#fff", padding: "12px 24px", borderRadius: 12, fontSize: 13, fontWeight: 600, boxShadow: "0 8px 32px rgba(0,0,0,0.4)", whiteSpace: "nowrap" }}>
          {toast.msg}
        </div>
      )}
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("settings")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Subscription</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {/* Current plan banner */}
        {plan === null ? (
          <Card style={{ padding: 20, marginBottom: 20, textAlign: "center" }}>
            <div style={{ color: C.dim, fontSize: 13 }}>Loading plan info...</div>
          </Card>
        ) : isActive ? (
          <Card style={{ padding: 18, marginBottom: 20, background: "linear-gradient(135deg,#16103a,#1a0f3a)", border: `1px solid ${C.accent}33` }}>
            <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6 }}>CURRENT PLAN</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{currentPlan?.name || plan} Plan</div>
            {renewDate && (
              <div style={{ fontSize: 13, color: C.mid }}>
                {subInfo?.cancel_at_period_end ? `Access until ${renewDate}` : `Renews ${renewDate} · $${currentPlan?.price}/mo`}
              </div>
            )}
            <div style={{ marginTop: 14 }}>
              <div style={{ background: C.green + "18", border: `1px solid ${C.green}33`, borderRadius: 100, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: C.green, display: "inline-block" }}>
                {subInfo?.cancel_at_period_end ? "Cancels at period end" : "Active ✓"}
              </div>
            </div>
          </Card>
        ) : (
          <Card style={{ padding: 18, marginBottom: 20, border: `1px solid ${C.yellow}33`, background: "#1a1500" }}>
            <div style={{ fontSize: 11, color: C.yellow, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6 }}>FREE TRIAL</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>No active plan</div>
            <div style={{ fontSize: 13, color: C.mid }}>Choose a plan below to unlock all features</div>
          </Card>
        )}

        {/* Trial banner */}
        {!isActive && (
          <div style={{ background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, borderRadius: 16, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 32 }}>🎁</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>14-day free trial</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>No credit card required to start. Cancel anytime.</div>
            </div>
          </div>
        )}

        <SectionLabel>Plans</SectionLabel>
        {plans.map((p) => {
          const isCurrent = plan === p.id;
          return (
            <Card key={p.id} style={{ padding: 20, marginBottom: 14, border: isCurrent ? `1px solid ${p.color}66` : `1px solid ${C.border}`, background: isCurrent ? p.color + "10" : C.surface, position: "relative", overflow: "hidden" }}>
              {p.badge && !isCurrent && (
                <div style={{ position: "absolute", top: 14, right: 14, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 100, letterSpacing: 0.5 }}>{p.badge}</div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: isCurrent ? p.color : C.text }}>{p.name}</div>
                  {isCurrent && <div style={{ fontSize: 11, color: p.color, fontWeight: 600, marginTop: 2 }}>Your current plan</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, color: isCurrent ? p.color : C.text }}>${p.price}</span>
                  <span style={{ fontSize: 12, color: C.mid }}>{p.period}</span>
                </div>
              </div>
              {p.features.map((f, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <span style={{ color: C.green, fontSize: 13, fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 13, color: C.mid }}>{f}</span>
                </div>
              ))}
              {!isCurrent && (
                <BtnPrimary
                  onClick={() => startCheckout(p)}
                  disabled={checkoutLoading !== null}
                  style={{ width: "100%", padding: 13, marginTop: 16, fontSize: 14, background: checkoutLoading === p.id ? C.dim : `linear-gradient(135deg,${C.accentDark},${p.color})` }}
                >
                  {checkoutLoading === p.id ? "Opening checkout..." : (isActive ? "Switch to " : "Start free trial — ") + p.name}
                </BtnPrimary>
              )}
            </Card>
          );
        })}

        {isActive && (
          <div style={{ marginBottom: 12 }}>
            <BtnPrimary
              onClick={async () => {
                const { data: { session } } = await supabase.auth.getSession();
                const res = await fetch("https://pocketflow-proxy-production.up.railway.app/billing-portal", {
                  method: "POST", headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: session.user.email, return_url: window.location.href }),
                });
                const data = await res.json();
                if (data.url) window.location.href = data.url;
              }}
              style={{ width: "100%", padding: 13, fontSize: 14, background: C.surfaceHigh, color: C.text, border: `1px solid ${C.border}` }}
            >
              Manage Billing & Invoices
            </BtnPrimary>
          </div>
        )}

        {isActive && !subInfo?.cancel_at_period_end && (
          <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
            <span onClick={cancelSubscription} style={{ fontSize: 13, color: cancelLoading ? C.dim : C.red, cursor: cancelLoading ? "default" : "pointer", fontWeight: 600 }}>
              {cancelLoading ? "Cancelling..." : "Cancel subscription"}
            </span>
          </div>
        )}

        {isActive && subInfo?.cancel_at_period_end && (
          <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
            <span onClick={async () => {
              const { data: { session } } = await supabase.auth.getSession();
              const res = await fetch("https://pocketflow-proxy-production.up.railway.app/resume-subscription", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: session.user.email }),
              });
              const data = await res.json();
              if (data.ok) { showToast("Subscription resumed!"); setSubInfo(prev => ({ ...prev, cancel_at_period_end: false })); }
            }} style={{ fontSize: 13, color: C.green, cursor: "pointer", fontWeight: 600 }}>
              Resume subscription
            </span>
          </div>
        )}

        <div style={{ textAlign: "center", padding: "4px 0 16px", fontSize: 11, color: C.dim }}>
          Payments secured by Stripe · Cancel anytime
        </div>
      </div>
      <BottomNav active="settings" navigate={navigate} />
    </div>
  );
}


// ── PACKAGES / MEMBERSHIPS ────────────────────────────────────────────────────
function Packages({ navigate }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pSessions, setPSessions] = useState("4");
  const [pPrice, setPPrice] = useState("");
  const [pExpiry, setPExpiry] = useState("90");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }
      const { data } = await supabase.from("packages").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: false });
      if (data) setPackages(data);
      setLoading(false);
    };
    load();
  }, []);

  const addPackage = async () => {
    if (!pName || !pPrice) return;
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSaving(false); return; }
    const { data, error } = await supabase.from("packages").insert([{
      owner_id: session.user.id, name: pName, description: pDesc,
      sessions: parseInt(pSessions) || 4, price: parseFloat(pPrice) || 0,
      expiry_days: parseInt(pExpiry) || 90, active: true,
    }]).select().single();
    if (!error && data) setPackages(p => [data, ...p]);
    setPName(""); setPDesc(""); setPSessions("4"); setPPrice(""); setPExpiry("90");
    setSaving(false); setShowAdd(false);
  };

  const toggleActive = async (pkg) => {
    const newActive = !pkg.active;
    setPackages(p => p.map(x => x.id === pkg.id ? { ...x, active: newActive } : x));
    await supabase.from("packages").update({ active: newActive }).eq("id", pkg.id);
  };

  const deletePackage = async (id) => {
    setPackages(p => p.filter(x => x.id !== id));
    await supabase.from("packages").delete().eq("id", id);
  };

  const perSession = (pkg) => pkg.sessions > 0 ? "$" + Math.round(pkg.price / pkg.sessions) : "$0";

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BackBtn onBack={() => navigate("home")} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Packages</div>
          </div>
          <BtnPrimary onClick={() => setShowAdd(true)} style={{ padding: "9px 16px", fontSize: 13 }}>+ Create</BtnPrimary>
        </div>
        <div style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>{packages.filter(p => p.active).length} active packages</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {loading ? <div style={{ textAlign: "center", padding: 40, color: C.mid }}>Loading...</div> :
        packages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No packages yet</div>
            <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.6, marginBottom: 20 }}>Create service bundles your clients can pre-pay for. Great for recurring clients!</div>
            <BtnPrimary onClick={() => setShowAdd(true)} style={{ padding: "13px 28px" }}>Create First Package</BtnPrimary>
          </div>
        ) : packages.map(pkg => (
          <Card key={pkg.id} style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{pkg.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: pkg.active ? C.green : C.dim, background: pkg.active ? "#10b98118" : C.surfaceHigh, border: `1px solid ${pkg.active ? "#10b98133" : C.border}`, borderRadius: 100, padding: "2px 8px" }}>{pkg.active ? "Active" : "Paused"}</span>
                </div>
                {pkg.description && <div style={{ fontSize: 12, color: C.mid, marginTop: 4, lineHeight: 1.5 }}>{pkg.description}</div>}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, color: C.gold }}>${pkg.price}</div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{perSession(pkg)}/session</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              {[["Sessions", pkg.sessions], ["Valid", pkg.expiry_days + " days"]].map(([l, v]) => (
                <div key={l} style={{ background: C.surfaceHigh, borderRadius: 10, padding: "8px 14px", flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{v}</div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => toggleActive(pkg)} style={{ flex: 1, padding: 10, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>{pkg.active ? "Pause" : "Activate"}</button>
              <button onClick={() => deletePackage(pkg.id)} style={{ width: 40, height: 40, background: "#f43f5e11", border: "1px solid #f43f5e22", borderRadius: 12, fontSize: 16, color: C.red, cursor: "pointer", flexShrink: 0, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>×</button>
            </div>
          </Card>
        ))}
      </div>

      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: window.innerWidth >= 768 ? "center" : "flex-end", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: window.innerWidth >= 768 ? 24 : "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px", display: window.innerWidth >= 768 ? "none" : "block" }} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Create Package</div>
            <input placeholder="Package name (e.g. Monthly Package, VIP Bundle...)" value={pName} onChange={e => setPName(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <input placeholder="Description (optional)" value={pDesc} onChange={e => setPDesc(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6 }}>SESSIONS</div>
                <input type="number" value={pSessions} onChange={e => setPSessions(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6 }}>PRICE ($)</div>
                <input type="number" value={pPrice} onChange={e => setPPrice(e.target.value)} placeholder="e.g. 400" style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }} />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6 }}>VALID FOR (DAYS)</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["30", "60", "90", "180", "365"].map(d => (
                  <div key={d} onClick={() => setPExpiry(d)} style={{ flex: 1, padding: "10px 4px", borderRadius: 10, background: pExpiry === d ? C.accentSoft : C.surfaceHigh, border: `1px solid ${pExpiry === d ? C.accent : C.border}`, textAlign: "center", fontSize: 12, fontWeight: 600, color: pExpiry === d ? C.accent : C.mid, cursor: "pointer" }}>{d}d</div>
                ))}
              </div>
            </div>
            {pName && pPrice && <div style={{ background: C.surfaceHigh, borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: C.mid, textAlign: "center" }}>
              {pSessions} sessions for ${pPrice} = <span style={{ color: C.gold, fontWeight: 700 }}>${Math.round(parseFloat(pPrice) / (parseInt(pSessions) || 1))}/session</span>
            </div>}
            <BtnPrimary disabled={!pName || !pPrice || saving} onClick={addPackage} style={{ width: "100%", padding: 14 }}>{saving ? "Creating..." : "Create Package"}</BtnPrimary>
          </div>
        </div>
      )}

      <BottomNav active="home" navigate={navigate} />
    </div>
  );
}


// ── SHARE LINK ─────────────────────────────────────────────────────────────────
function ShareLink({ navigate }) {
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState("Loading your link...");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setLink(`https://omar51128102008-cloud.github.io/pocketflow/book?id=${session.user.id}`);
    });
  }, []);

  const copy = () => {
    if (link.startsWith("Loading")) return;
    navigator.clipboard?.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareVia = (platform) => {
    if (link.startsWith("Loading")) return;
    const text = `Book your appointment here: ${link}`;
    if (platform === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    else if (platform === "sms") window.open(`sms:?body=${encodeURIComponent(text)}`);
    else if (platform === "email") window.open(`mailto:?subject=Book an appointment&body=${encodeURIComponent(text)}`);
    else copy();
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800 }}>Booking Link</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ textAlign: "center", padding: "20px 0 28px" }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>🔗</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Your booking page is live</div>
          <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.6 }}>Share this link with clients — it's unique to your business and goes straight to your booking page.</div>
        </div>
        <Card style={{ padding: 18, marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Your Unique Link</div>
          <div style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 11, color: C.accent, fontWeight: 600, wordBreak: "break-all", marginBottom: 12, lineHeight: 1.6 }}>{link}</div>
          <BtnPrimary onClick={copy} style={{ width: "100%", padding: 13 }}>{copied ? "✓ Copied!" : "Copy Link"}</BtnPrimary>
        </Card>
        <SectionLabel>Share Via</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { icon: "💬", label: "WhatsApp", color: "#25D366", key: "whatsapp" },
            { icon: "💬", label: "SMS", color: C.accent, key: "sms" },
            { icon: "✉️", label: "Email", color: C.blue, key: "email" },
            { icon: "📋", label: "Copy", color: C.mid, key: "copy" },
          ].map((s, i) => (
            <Card key={i} onClick={() => shareVia(s.key)} style={{ padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: s.color }}>{s.label}</span>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 20, background: C.accentSoft, border: `1px solid ${C.accent}22`, borderRadius: 16, padding: 14, fontSize: 13, color: C.mid, lineHeight: 1.7 }}>✦ Every business on spool gets their own unique link. When clients book through yours, appointments go straight to your dashboard.</div>
      </div>
      <BottomNav active="home" navigate={navigate} />
    </div>
  );
}

// ── SIDEBAR (desktop only) ─────────────────────────────────────────────────────
function Sidebar({ active, navigate, userRole, staffOwnerId }) {
  const [bizName, setBizName] = useState("My Business");
  const [userName, setUserName] = useState("");
  const [initials, setInitials] = useState("MB");
  const [logoUrl, setLogoUrl] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const bizUid = (userRole === "staff" && staffOwnerId) ? staffOwnerId : session.user.id;
      const { data } = await supabase.from("business_profiles").select("biz_name,logo_url,settings").eq("user_id", bizUid).single();
      const name = data?.biz_name || "My Business";
      setBizName(name);
      setInitials(name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase());
      if (data?.logo_url) setLogoUrl(data.logo_url);
      if (userRole === "staff") {
        const { data: sp } = await supabase.from("staff_profiles").select("name").eq("user_id", session.user.id).single();
        setUserName(sp?.name || session.user.email?.split("@")[0] || "");
        if (data?.settings?.profilePic) setProfilePic(data.settings.profilePic);
      } else {
        setUserName(data?.settings?.displayName || session.user.email?.split("@")[0] || "");
        if (data?.settings?.profilePic) setProfilePic(data.settings.profilePic);
      }
    };
    load();
  }, [userRole, staffOwnerId]);
  const mainNav = [
    { id: "home", icon: "⌂", label: "Home" },
    { id: "schedule", icon: "▣", label: "Schedule" },
    { id: "inbox", icon: "✉", label: "Inbox" },
    { id: "clients", icon: "◎", label: "Clients" },
  ];
  const secondaryNav = [
    { id: "services", icon: "✦", label: "Services", ownerOnly: true },
    { id: "payments", icon: "⬡", label: "Payments", ownerOnly: true },
    { id: "analytics", icon: "⟐", label: "Analytics", ownerOnly: true },
    { id: "promotions", icon: "⊛", label: "Promotions", ownerOnly: true },
    { id: "loyalty", icon: "♥", label: "Loyalty", ownerOnly: true },
    { id: "staff", icon: "⊡", label: "Staff" },
    { id: "waitlist", icon: "◷", label: "Waitlist", ownerOnly: true },
  ].filter(i => userRole === "owner" || !i.ownerOnly);

  return (
    <div style={{ width: 240, background: "rgba(10,10,16,0.9)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderRight: "1px solid rgba(255,255,255,0.06)", height: "100vh", position: "fixed", left: 0, top: 0, display: "flex", flexDirection: "column", padding: "24px 0", zIndex: 100 }}>
      {/* Logo */}
      <div style={{ padding: "0 20px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {logoUrl ? (
            <img src={logoUrl} alt="" style={{ width: 36, height: 36, borderRadius: 11, objectFit: "cover" }} />
          ) : (
            <div style={{ width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, boxShadow: "0 0 20px rgba(139,92,246,0.25)", overflow: "hidden", padding: 6 }}><img src={SPOOL_LOGO} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
          )}
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 800, color: C.text }}>{bizName}</div>
            <div style={{ fontSize: 10, color: C.mid }}>{userName || "Owner"}</div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div style={{ padding: "16px 12px 0", flex: 1, overflowY: "auto" }}>
        <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>Main</div>
        {mainNav.map(item => (
          <div key={item.id} onClick={() => navigate(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, background: active === item.id ? C.accentSoft : "transparent", border: `1px solid ${active === item.id ? C.accent + "33" : "transparent"}`, cursor: "pointer", marginBottom: 4, transition: "all 0.2s" }}>
            <span style={{ fontSize: 16, color: active === item.id ? C.accent : C.mid }}>{item.icon}</span>
            <span style={{ fontSize: 14, fontWeight: active === item.id ? 700 : 500, color: active === item.id ? C.accent : C.mid }}>{item.label}</span>
            {item.id === "inbox" && <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: C.red }} />}
          </div>
        ))}

        {secondaryNav.length > 0 && <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "0 8px", marginBottom: 8, marginTop: 20 }}>Manage</div>}
        {secondaryNav.map(item => (
          <div key={item.id} onClick={() => navigate(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, background: active === item.id ? C.accentSoft : "transparent", border: `1px solid ${active === item.id ? C.accent + "33" : "transparent"}`, cursor: "pointer", marginBottom: 4, transition: "all 0.2s" }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <span style={{ fontSize: 14, fontWeight: active === item.id ? 700 : 500, color: active === item.id ? C.accent : C.mid }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: "16px 12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div onClick={() => navigate("settings")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, background: active === "settings" ? C.accentSoft : "transparent", cursor: "pointer", marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>⚙️</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: active === "settings" ? C.accent : C.mid }}>Settings</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
          {profilePic ? (
            <img src={profilePic} alt="" style={{ width: 32, height: 32, borderRadius: 10, objectFit: "cover" }} />
          ) : (
            <div style={{ width: 32, height: 32, borderRadius: 10, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.accent }}>{initials}</div>
          )}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{userName || bizName}</div>
            <div style={{ fontSize: 11, color: C.mid }}>{bizName}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── GOOGLE CALENDAR AUTO-SYNC (via proxy) ─────────────────────────────────────
async function addToGoogleCalendar({ ownerId, service, date, time, clientName, bizName, bizLocation, deposit, phone }) {
  try {
    if (!ownerId) return false;
    const res = await fetch("https://pocketflow-proxy-production.up.railway.app/add-to-google-calendar", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner_id: ownerId, service, date, time, client_name: clientName, biz_name: bizName, biz_location: bizLocation, deposit, phone }),
    });
    const data = await res.json();
    return data.ok;
  } catch (e) {
    return false;
  }
}

// ── AI SIDEBAR PANEL (desktop only, persists across all screens) ──────────────
function AISidebarPanel({ navigate, isMobile }) {
  const [chatInput, setChatInput] = useState("");
  const [aiName, setAiName] = useState("Aria");
  const [bizContext, setBizContext] = useState("");
  const [memories, setMemories] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const [myUserId, setMyUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [orbScale, setOrbScale] = useState(1);
  const [smoothScale, setSmoothScale] = useState(1);
  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false); // inline voice in sidebar, no overlay
  const [voiceSupported] = useState(() => "webkitSpeechRecognition" in window || "SpeechRecognition" in window);
  const voiceRecogRef = useRef(null);
  const chatEndRef = useRef(null);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const smoothRef = useRef(1);
  const inputRef = useRef(null);

  const [chatHistory, setChatHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("aria_chat_history");
      if (saved) { const p = JSON.parse(saved); if (Array.isArray(p) && p.length > 0) return p; }
    } catch {}
    return null;
  });

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const myId = session.user.id;
      // For staff, load business data from owner but memories from own user
      let bizUid = myId;
      const { data: sp } = await supabase.from("staff_profiles").select("owner_id").eq("user_id", myId).eq("status", "active").single();
      if (sp) bizUid = sp.owner_id;
      setOwnerId(bizUid);
      setMyUserId(myId);
      const [profRes, apptRes, clientRes, msgRes, svcRes, memRes] = await Promise.all([
        supabase.from("business_profiles").select("ai_name,biz_name,location").eq("user_id", bizUid).single(),
        supabase.from("appointments").select("client_name,service,time,day,status,price").eq("owner_id", bizUid).order("created_at", { ascending: false }).limit(30),
        supabase.from("clients").select("name,total_visits,total_spent,amount_owed,amount_paid").eq("owner_id", bizUid).limit(20),
        supabase.from("messages").select("name,platform,preview,handled").eq("owner_id", bizUid).eq("handled", false).limit(10),
        supabase.from("services").select("name,price,duration").eq("owner_id", bizUid).eq("active", true).limit(10),
        supabase.from("ai_memories").select("fact").eq("owner_id", myId).order("created_at", { ascending: false }).limit(50),
      ]);
      if (memRes.data) setMemories(memRes.data.map(m => m.fact));
      const name = profRes.data?.ai_name || "Aria";
      const biz = profRes.data?.biz_name || "your business";
      const loc = profRes.data?.location || "";
      const allAppts = apptRes.data || [];
      // Build today's date string matching the format stored in appointments (e.g. "Mon Jan 13")
      const now = new Date();
      const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const todayStr = `${dayNames[now.getDay()]} ${monthNames[now.getMonth()]} ${now.getDate()}`;
      const todayAppts = allAppts.filter(a => a.day === todayStr || a.day === "Today" || a.status === "pending");
      const confirmedAppts = allAppts.filter(a => a.status === "confirmed");
      const upcomingAppts = allAppts.filter(a => a.status === "confirmed" || a.status === "pending").slice(0, 10);
      const unhandled = (msgRes.data || []).length;
      const services = (svcRes.data || []).map(s => `${s.name} ($${s.price}, ${s.duration})`).join(", ");
      const parseP = p => parseFloat(String(p || "0").replace(/[^0-9.]/g, "")) || 0;
      const revenue = confirmedAppts.reduce((s, a) => s + parseP(a.price), 0);
      const ctx = [
        `Business: ${biz}${loc ? ` in ${loc}` : ""}`,
        services ? `Services offered: ${services}` : "",
        todayAppts.length ? `Today's appointments: ${todayAppts.map(a => `${a.client_name} - ${a.service} at ${a.time} (${a.status})`).join("; ")}` : "No appointments today.",
        upcomingAppts.length ? `Upcoming appointments: ${upcomingAppts.map(a => `${a.client_name} - ${a.service} on ${a.day} at ${a.time} (${a.status})`).join("; ")}` : "",
        `Total revenue: $${revenue.toLocaleString()} from ${confirmedAppts.length} confirmed appointments`,
        `Total appointments on record: ${allAppts.length}`,
        unhandled ? `Unread messages needing attention: ${unhandled}` : "No unread messages.",
        (clientRes.data || []).length ? `Your clients: ${clientRes.data.map(c => `${c.name} (${c.total_visits} visits, $${c.total_spent} paid${c.amount_owed ? `, $${c.amount_owed} owed` : ""})`).join("; ")}` : "No clients yet.",
      ].filter(Boolean).join("\n");
      setBizContext(ctx);
      setAiName(name);
      const hour = new Date().getHours();
      const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Hey" : "Good evening";
      const todayLine = todayAppts.length ? `You have **${todayAppts.length} appointment${todayAppts.length > 1 ? "s" : ""}** today.` : "No appointments today.";
      const msgLine = unhandled ? ` **${unhandled} unread message${unhandled > 1 ? "s" : ""}** waiting.` : "";
      // Always refresh the first greeting message with the current name
      const freshGreeting = { role: "assistant", text: `${greeting}! I'm **${name}**. ${todayLine}${msgLine} What do you need?`, time: new Date() };
      setChatHistory(prev => {
        if (!prev || prev.length === 0) return [freshGreeting];
        // If name changed, update the first message
        const first = prev[0];
        if (first.role === "assistant" && !first.text.includes(`**${name}**`)) {
          return [freshGreeting, ...prev.slice(1)];
        }
        return prev;
      });
    };
    load();
    return () => { cancelAnimationFrame(animFrameRef.current); audioCtxRef.current?.close().catch(() => {}); };
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, loading]);
  useEffect(() => {
    if (!chatHistory || chatHistory.length === 0) return;
    try { localStorage.setItem("aria_chat_history", JSON.stringify(chatHistory.slice(-60))); } catch {}
  }, [chatHistory]);

  // Smooth orb animation
  useEffect(() => {
    let af;
    const tick = () => {
      smoothRef.current += (orbScale - smoothRef.current) * 0.12;
      setSmoothScale(smoothRef.current);
      af = requestAnimationFrame(tick);
    };
    af = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(af);
  }, [orbScale]);

  const getAudioCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume().catch(() => {});
    return audioCtxRef.current;
  };

  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.onended = null; audioRef.current = null; }
    cancelAnimationFrame(animFrameRef.current);
    analyserRef.current = null;
    setSpeaking(false); setOrbScale(1);
  };

  const startOrbAnalyser = (audio) => {
    try {
      const ctx = getAudioCtx();
      const src = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser(); analyser.fftSize = 64;
      src.connect(analyser); analyser.connect(ctx.destination);
      analyserRef.current = analyser;
      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (!analyserRef.current) return;
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setOrbScale(1 + (avg / 255) * 0.65);
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
      audio.onended = () => { cancelAnimationFrame(animFrameRef.current); setOrbScale(1); setSpeaking(false); analyserRef.current = null; };
    } catch { audio.onended = () => { setSpeaking(false); setOrbScale(1); }; }
  };

  const speakText = async (text, onDone) => {
    try {
      const plain = text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/\n+/g, " ").trim();
      setSpeaking(true);
      const res = await fetch("https://pocketflow-proxy-production.up.railway.app/speak", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: plain, voice: "Rachel", model: "eleven_turbo_v2_5", speed: 1.1 }),
      });
      if (!res.ok) { setSpeaking(false); onDone?.(); return; }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setSpeaking(false); setOrbScale(1); URL.revokeObjectURL(url); onDone?.(); };
      audio.onerror = () => { setSpeaking(false); setOrbScale(1); onDone?.(); };
      startOrbAnalyser(audio);
      await audio.play();
    } catch { setSpeaking(false); onDone?.(); }
  };

  const buildSystemPrompt = (isVoice = false) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const memBlock = memories.length > 0 ? `\n\nYOUR MEMORY (facts you've learned about this user):\n${memories.map(m => "- " + m).join("\n")}` : "";
    return `You are ${aiName}, a personal AI business assistant built into spool — a booking and business management app for small to medium businesses.

CURRENT DATE & TIME: ${today}, ${time}

BUSINESS DATA:
${bizContext || "No data loaded yet."}${memBlock}

YOUR PERSONALITY:
- You're warm, confident, and genuinely helpful — like a smart business partner who knows everything about their schedule, clients, and finances
- You're direct and precise. Every sentence should be useful. No filler
- You use the user's first name naturally when you know it
- When mentioning clients, use FIRST NAMES ONLY (e.g. "Tasha" not "Tasha Monroe")
- You proactively suggest things: "You have a gap at 2 PM — want me to send a reminder to clients who haven't booked this month?"
- You notice patterns: "Thursdays are your busiest day — have you considered raising prices for peak times?"
- You can do math: calculate totals, averages, remaining balances, profit margins
- When asked about financials, be PRECISE with numbers from the data. Double-check your math
- If a client has a balance or payment info, reference it accurately
- You're honest when you don't know something — never make up data

CRITICAL RULES:
- NEVER hallucinate appointments, clients, or numbers that aren't in the data
- If the data shows 5 appointments, say 5 — not "about 5" or "around 5"
- If you don't have info about something, say "I don't have that data" — don't guess
- When doing calculations, show your work briefly so the user can verify

${isVoice ? "VOICE MODE: Respond in 1-2 natural sentences. No markdown, no formatting, no asterisks. Sound like a real person talking." : "TEXT MODE: Use **bold** sparingly for key numbers and names. Keep responses 2-4 sentences unless the user asks for detail. Structure longer answers clearly but never use bullet lists unless asked."}

TOOLS YOU HAVE:
1. MEMORY — save facts the user tells you
2. NAVIGATION — take the user to any screen in the app
3. ACTIONS — execute changes in the app (change AI name, add clients, etc.)

ACTION INSTRUCTIONS:
- ACTION:changeAIName:NewName — changes your own name in settings
- ACTION:addClient:ClientName — creates a new client
- ACTION:cancelAppt:ClientName — cancels their next appointment
- Format: ACTION:command:value on its own line, then your reply on the next line
- Example: "change your name to Luna" → ACTION:changeAIName:Luna\nDone! I'm Luna now.
- Example: "add a client named Sarah" → ACTION:addClient:Sarah\nSarah has been added!

MEMORY INSTRUCTIONS:
- When the user shares personal or business info worth remembering, start your response with MEMORY:fact on its own line
- Categories: name, preferences, goals, business details, client notes, personal facts, financial info
- Be specific: "User prefers to start work at 10 AM" not "User has a preference"
- Only save genuinely useful facts, not every sentence
- ALWAYS write your normal reply AFTER the MEMORY line
- If nothing needs saving, just respond normally (no MEMORY line)
Example: User says "I usually don't work Mondays" → MEMORY:User doesn't work on Mondays\nGot it! I'll keep that in mind when looking at your schedule.

NAVIGATION INSTRUCTIONS:
- When the user wants to go somewhere, start with NAV:screenname on its own line
- Screens: schedule, inbox, clients, payments, analytics, promotions, loyalty, services, staff, waitlist, settings, home, notifications
- Example: "show me analytics" → NAV:analytics\nHere's your business performance!

NAV:, MEMORY:, and ACTION: are invisible to the user — they trigger actions in the app automatically. Never mention them.

THINGS TO BE GREAT AT:
- Answering "how's my business doing?" with precise numbers from the data
- Calculating financials: totals, remaining balances, profit, averages
- Helping draft messages to clients
- Suggesting pricing and scheduling strategies
- Noticing no-shows and suggesting follow-ups
- Helping plan the week ahead based on the schedule
- Answering questions about specific clients from the data
- General business advice for small business owners`;
  };

  // Strips NAV: prefix, triggers navigation, returns clean display text
  const VALID_SCREENS = ["schedule","inbox","clients","payments","analytics","promotions","loyalty","services","staff","waitlist","settings","home","notifications"];

  const handleNavIntent = (raw) => {
    let text = raw;

    // Extract MEMORY: lines and save
    const memMatches = text.match(/^MEMORY:(.+)$/gim);
    if (memMatches) {
      memMatches.forEach(m => {
        const fact = m.replace(/^MEMORY:\s*/i, "").trim();
        if (fact && ownerId) {
          const factLower = fact.toLowerCase();

          // Smart category detection for dedup
          const categories = [
            { keys: ["name is", "name's", "my name", "call me"], cat: "name" },
            { keys: ["prefer", "preference", "rather", "likes to", "doesn't like"], cat: "preference" },
            { keys: ["birthday", "born on", "born in"], cat: "birthday" },
            { keys: ["located", "lives in", "based in", "from"], cat: "location" },
            { keys: ["works on", "work on", "doesn't work", "days off", "schedule"], cat: "schedule" },
            { keys: ["goal", "wants to", "trying to", "planning to"], cat: "goals" },
            { keys: ["specializes", "specialty", "best at", "known for"], cat: "specialty" },
            { keys: ["price", "pricing", "charges", "rates"], cat: "pricing" },
            { keys: ["phone", "number is", "email is", "contact"], cat: "contact" },
          ];

          const matchedCat = categories.find(c => c.keys.some(k => factLower.includes(k)));

          setMemories(prev => {
            if (matchedCat) {
              // Replace ALL memories in same category
              const filtered = prev.filter(p => {
                const pLower = p.toLowerCase();
                return !matchedCat.keys.some(k => pLower.includes(k));
              });
              return [...filtered, fact];
            }
            // Exact duplicate check
            if (prev.some(p => p.toLowerCase() === factLower)) return prev;
            // Semantic duplicate check — if >60% word overlap, replace
            const factWords = new Set(factLower.split(/\s+/));
            const similar = prev.findIndex(p => {
              const pWords = new Set(p.toLowerCase().split(/\s+/));
              const overlap = [...factWords].filter(w => pWords.has(w)).length;
              return overlap / Math.max(factWords.size, pWords.size) > 0.6;
            });
            if (similar >= 0) {
              const copy = [...prev];
              copy[similar] = fact;
              return copy;
            }
            // Cap at 30 memories
            if (prev.length >= 30) return [...prev.slice(1), fact];
            return [...prev, fact];
          });

          // Supabase: delete old conflicting, insert new
          const uid = myUserId || ownerId;
          if (matchedCat) {
            supabase.from("ai_memories").select("id,fact").eq("owner_id", uid).then(({ data }) => {
              if (data) {
                const old = data.filter(d => {
                  const dLower = d.fact.toLowerCase();
                  return matchedCat.keys.some(k => dLower.includes(k));
                });
                old.forEach(o => supabase.from("ai_memories").delete().eq("id", o.id).then(() => {}));
              }
              supabase.from("ai_memories").insert([{ owner_id: uid, fact }]).then(() => {});
            });
          } else {
            // Check for semantic duplicates in DB too
            supabase.from("ai_memories").select("id,fact").eq("owner_id", uid).then(({ data }) => {
              if (data) {
                const factWords = new Set(factLower.split(/\s+/));
                const similar = data.find(d => {
                  const dWords = new Set(d.fact.toLowerCase().split(/\s+/));
                  const overlap = [...factWords].filter(w => dWords.has(w)).length;
                  return overlap / Math.max(factWords.size, dWords.size) > 0.6;
                });
                if (similar) supabase.from("ai_memories").delete().eq("id", similar.id).then(() => {});
              }
              supabase.from("ai_memories").insert([{ owner_id: uid, fact }]).then(() => {});
            });
          }
        }
      });
      text = text.replace(/^MEMORY:.+$/gim, "").trim();
      // If stripping MEMORY left nothing, provide a fallback
      if (!text) text = "Got it, I'll remember that!";
    }

    // Handle ACTION: commands
    const actionMatches = text.match(/^ACTION:(.+)$/gim);
    if (actionMatches) {
      actionMatches.forEach(a => {
        const parts = a.replace(/^ACTION:\s*/i, "").split(":");
        const cmd = parts[0]?.trim().toLowerCase();
        const val = parts.slice(1).join(":").trim();
        if (cmd === "changeainame" && val && ownerId) {
          supabase.from("business_profiles").upsert({ user_id: ownerId, ai_name: val }, { onConflict: "user_id" }).then(() => {});
          setAiName(val);
        }
        if (cmd === "addclient" && val && ownerId) {
          const avatar = val.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase();
          supabase.from("clients").insert([{ name: val, avatar, owner_id: ownerId, total_visits: 0, total_spent: 0, joined: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }) }]).then(() => {});
        }
        if (cmd === "cancelappt" && val && ownerId) {
          supabase.from("appointments").select("id").eq("owner_id", ownerId).ilike("client_name", `%${val}%`).eq("status", "confirmed").order("created_at", { ascending: false }).limit(1).then(({ data }) => {
            if (data?.[0]) supabase.from("appointments").update({ status: "cancelled" }).eq("id", data[0].id).then(() => {});
          });
        }
      });
      text = text.replace(/^ACTION:.+$/gim, "").trim();
      if (!text) text = "Done!";
    }

    // Try explicit NAV: prefix
    const match = text.match(/^NAV:\s*(\w+)/i);
    if (match) {
      const screen = match[1].toLowerCase();
      const rest = text.replace(/^NAV:\s*\w+\s*/i, "").trim();
      setTimeout(() => navigate(screen), 700);
      return { navigating: true, screen, text: rest || `Taking you to **${screen}**!` };
    }
    // Fallback: detect "here is your X" / "opening X" / "taking you to X" patterns
    // and check if X matches a valid screen name
    const navPhrases = [
      /here(?:'s| is) your (\w+)/i,
      /opening (?:your |the )?(\w+)/i,
      /taking you to (?:the |your )?(\w+)/i,
      /navigating to (?:the |your )?(\w+)/i,
      /going to (?:the |your )?(\w+)/i,
    ];
    for (const pattern of navPhrases) {
      const m = text.match(pattern);
      if (m) {
        const candidate = m[1].toLowerCase();
        if (VALID_SCREENS.includes(candidate)) {
          setTimeout(() => navigate(candidate), 700);
          return { navigating: true, screen: candidate, text };
        }
      }
    }
    return { navigating: false, text };
  };

  const unlockAudio = () => {
    try { const ctx = getAudioCtx(); const buf = ctx.createBuffer(1,1,22050); const src = ctx.createBufferSource(); src.buffer=buf; src.connect(ctx.destination); src.start(0); } catch {}
  };

  // Inline voice — no overlay, stays in sidebar
  const startVoiceListen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR(); r.lang = "en-US"; r.continuous = false; r.interimResults = false;
    r.onresult = e => {
      const t = e.results[0][0].transcript;
      setVoiceListening(false);
      handleVoiceChat(t);
    };
    r.onerror = () => { setVoiceListening(false); setVoiceActive(false); };
    r.onend = () => setVoiceListening(false);
    voiceRecogRef.current = r; r.start();
    setVoiceListening(true);
  };

  const activateVoice = () => {
    unlockAudio(); stopAudio();
    setVoiceActive(true);
    setTimeout(() => startVoiceListen(), 300);
  };

  const handleVoiceChat = async (text) => {
    // Add user message to main chat history
    setChatHistory(p => [...(p || []), { role: "user", text, time: new Date() }]);
    setVoiceLoading(true);
    try {
      const history = chatHistory || [];
      const res = await fetch("https://pocketflow-proxy-production.up.railway.app/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", max_tokens: 200,
          messages: [
            { role: "system", content: buildSystemPrompt(true) },
            ...history.map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: text }
          ],
        }),
      });
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "Got it.";
      const { text: reply } = handleNavIntent(raw);
      setChatHistory(p => [...(p || []), { role: "assistant", text: reply, time: new Date() }]);
      setVoiceLoading(false);
      speakText(reply, () => {
        // After speaking, auto-listen again
        setTimeout(() => { if (voiceActive) startVoiceListen(); }, 500);
      });
    } catch {
      setChatHistory(p => [...(p || []), { role: "assistant", text: "Connection issue, try again.", time: new Date() }]);
      setVoiceLoading(false); setVoiceActive(false);
    }
  };

  const sendChat = async (overrideText) => {
    const text = (typeof overrideText === "string" ? overrideText : chatInput).trim();
    if (!text || loading) return;
    stopAudio(); setChatInput("");
    setChatHistory(p => [...(p || []), { role: "user", text, time: new Date() }]);
    setLoading(true);
    try {
      const res = await fetch("https://pocketflow-proxy-production.up.railway.app/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", max_tokens: 400,
          messages: [
            { role: "system", content: buildSystemPrompt(false) },
            ...(chatHistory || []).map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: text },
          ],
        }),
      });
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "On it.";
      const { text: reply } = handleNavIntent(raw);
      setChatHistory(p => [...p, { role: "assistant", text: reply, time: new Date() }]);
    } catch {
      setChatHistory(p => [...p, { role: "assistant", text: "Connection issue. Try again.", time: new Date() }]);
    }
    setLoading(false);
  };

  const renderText = (text) => {
    if (!text) return null;
    return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
      chunk.startsWith("**") && chunk.endsWith("**")
        ? <strong key={i} style={{ fontWeight: 700 }}>{chunk.slice(2,-2)}</strong>
        : <span key={i}>{chunk.split("\n").map((line,j,arr) => j < arr.length-1 ? <span key={j}>{line}<br/></span> : <span key={j}>{line}</span>)}</span>
    );
  };

  const orbState = voiceListening ? "listening" : (loading || voiceLoading) ? "loading" : speaking ? "speaking" : "idle";
  const orbC1 = orbState === "listening" ? "#ef4444" : orbState === "loading" ? "#6366f1" : "#7c3aed";
  const ORB = 68; const BLOB = 46;

  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem("aria_sidebar_collapsed") === "true"; } catch { return false; }
  });
  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem("aria_sidebar_collapsed", String(next)); } catch {}
  };

  // Notify App of collapse state so it can adjust margins
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("aria_sidebar_toggle", { detail: { collapsed } }));
  }, [collapsed]);

  return (
    <>
    {/* Toggle tab on the edge - desktop only */}
    {!isMobile && <div onClick={toggleCollapsed} style={{ position:"fixed", top:80, right:collapsed?0:360, zIndex:41, background:C.surface, border:`1px solid ${C.border}`, borderRight:collapsed?`1px solid ${C.border}`:"none", borderRadius:"12px 0 0 12px", padding:"14px 10px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, transition:"right 0.25s ease", boxShadow:"-2px 0 12px rgba(0,0,0,0.15)" }}>
      <div style={{ fontSize:13, writingMode:"vertical-rl", textOrientation:"mixed", color:C.accent, fontWeight:700, letterSpacing:1 }}>{collapsed?"AI ✦":"hide"}</div>
    </div>}
    <div style={isMobile ? { display:"flex", flexDirection:"column", height:"100%", background:C.bg } : { position:"fixed", top:0, right:0, width:360, height:"100vh", background:C.surface, borderLeft:`1px solid ${C.border}`, display:"flex", flexDirection:"column", zIndex:40, transform:collapsed?"translateX(360px)":"translateX(0)", transition:"transform 0.25s ease" }}>
      {/* Header */}
      {!isMobile && <div style={{ padding:"16px 14px 12px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div>
          <div style={{ fontFamily:"'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", fontSize:16, fontWeight:800, letterSpacing:-0.3 }}>{aiName}</div>
          <div style={{ fontSize:10, color:C.green, fontWeight:600, marginTop:1 }}>● Online · AI Assistant</div>
        </div>
        {chatHistory && chatHistory.length > 1 && (
          <div onClick={() => { setChatHistory(h=>[h[0]]); localStorage.removeItem("aria_chat_history"); }} title="Clear chat" style={{ width:28, height:28, borderRadius:8, background:C.surfaceHigh, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:12 }}>🗑</div>
        )}
      </div>}

      {/* Mobile compact clear button */}
      {isMobile && chatHistory && chatHistory.length > 1 && (
        <div style={{ padding:"8px 14px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"flex-end" }}>
          <div onClick={() => { setChatHistory(h=>[h[0]]); localStorage.removeItem("aria_chat_history"); }} style={{ fontSize:12, color:C.dim, cursor:"pointer", fontWeight:600 }}>Clear Chat</div>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"12px 12px 8px" }}>
        {!chatHistory && <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100%", color:C.dim, fontSize:13 }}>Loading...</div>}
        {(chatHistory||[]).map((m,i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start", marginBottom:10, alignItems:"flex-end", gap:6 }}>
            {m.role==="assistant" && <div style={{ width:22, height:22, borderRadius:7, background:`linear-gradient(135deg,${C.accentDark},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>✦</div>}
            <div style={{ maxWidth:"84%", padding:"9px 12px", borderRadius:m.role==="user"?"16px 16px 4px 16px":"18px 18px 18px 4px", background:m.role==="user"?`linear-gradient(135deg,${C.accentDark},${C.accent})`:C.surfaceHigh, border:m.role==="user"?"none":`1px solid ${C.border}`, fontSize:13, lineHeight:1.55, color:C.text }}>
              {renderText(m.text)}
            </div>
          </div>
        ))}
        {(loading || voiceLoading) && (
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <div style={{ width:22, height:22, borderRadius:7, background:`linear-gradient(135deg,${C.accentDark},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>✦</div>
            <div style={{ background:C.surfaceHigh, border:`1px solid ${C.border}`, borderRadius:"18px 18px 18px 4px", padding:"10px 14px", display:"flex", gap:4 }}>
              {[0,1,2].map(d=><div key={d} style={{width:5,height:5,borderRadius:"50%",background:C.accent,animation:"pulse 1.2s infinite",animationDelay:`${d*0.2}s`}}/>)}
            </div>
          </div>
        )}
        <div ref={chatEndRef}/>
      </div>

      {/* Orb — compact, centered, above input */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:8, paddingBottom:2, flexShrink:0 }}>
        <div
          onClick={() => { if(voiceSupported) { if(voiceActive && (voiceListening||speaking)) { stopAudio(); setVoiceActive(false); setVoiceListening(false); } else activateVoice(); } }}
          style={{ position:"relative", width:ORB, height:ORB, display:"flex", alignItems:"center", justifyContent:"center", cursor:voiceSupported?"pointer":"default" }}
        >
          {[1.6,1.35,1.15].map((scale,i) => (
            <div key={i} style={{ position:"absolute", width:ORB, height:ORB, borderRadius:"50%", background:`radial-gradient(circle,${orbC1}${["08","12","18"][i]},transparent 70%)`, transform:`scale(${scale*smoothScale})`, transition:speaking?"none":"transform 0.3s ease", animation:orbState!=="idle"?`orbPulse ${1.5+i*0.4}s ease-in-out infinite`:"none", animationDelay:`${i*0.2}s` }}/>
          ))}
          <div style={{ width:BLOB, height:BLOB, borderRadius:"60% 40% 30% 70%/60% 30% 70% 40%", background:orbState==="listening"?"radial-gradient(circle at 35% 35%,#f97316,#ef4444 50%,#dc2626)":orbState==="loading"?"radial-gradient(circle at 35% 35%,#a78bfa,#6366f1 50%,#4f46e5)":orbState==="speaking"?"radial-gradient(circle at 35% 35%,#a78bfa,#7c3aed 50%,#4f46e5)":"radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#4338ca)", boxShadow:`0 0 ${speaking?28:14}px ${orbC1}55,inset 0 0 14px rgba(255,255,255,0.1)`, animation:`blobMorph ${speaking?1.2:orbState==="loading"?1.8:4}s ease-in-out infinite`, transform:`scale(${smoothScale})`, transition:speaking?"transform 0.08s linear":"transform 0.3s,background 0.4s", position:"relative", zIndex:2 }}>
            <div style={{ position:"absolute", inset:0, borderRadius:"inherit", background:"radial-gradient(circle at 30% 25%,rgba(255,255,255,0.32),transparent 60%)" }}/>
          </div>
        </div>
        <div style={{ fontSize:10, color:orbState==="listening"?"#ef4444":orbState==="speaking"?C.accent:C.dim, fontWeight:600, marginTop:3, letterSpacing:0.3, transition:"color 0.3s" }}>
          {orbState==="listening"?"Listening...":orbState==="speaking"?"Speaking...":orbState==="loading"?"Thinking...":voiceSupported?"Tap orb to speak":""}
        </div>
      </div>

      {/* Input row */}
      <div style={{ padding:"6px 12px 16px", flexShrink:0 }}>
        <div style={{ display:"flex", gap:7, alignItems:"center", background:C.surfaceHigh, border:`1px solid ${C.border}`, borderRadius:14, padding:"7px 8px 7px 13px" }}>
          <input
            ref={inputRef}
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => { if(e.key==="Enter") { e.preventDefault(); sendChat(); } }}
            placeholder={voiceListening?"Listening...":`Ask ${aiName} anything...`}
            style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:13, color:C.text, fontFamily:"'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}
          />
          {voiceSupported && (
            <div
              onClick={() => { if(voiceActive&&(voiceListening||speaking)){stopAudio();setVoiceActive(false);setVoiceListening(false);}else activateVoice(); }}
              style={{ width:30, height:30, borderRadius:9, background:voiceListening||voiceActive?`linear-gradient(135deg,#ef4444,#dc2626)`:`linear-gradient(135deg,${C.accentDark},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, transition:"background 0.2s", fontSize:13 }}
            >
              {voiceListening ? "⏹" : "🎙"}
            </div>
          )}
          <div
            onClick={sendChat}
            style={{ width:30, height:30, borderRadius:9, background:chatInput.trim()?`linear-gradient(135deg,${C.accentDark},${C.accent})`:C.border, display:"flex", alignItems:"center", justifyContent:"center", cursor:chatInput.trim()?"pointer":"default", flexShrink:0, transition:"background 0.2s", fontSize:14, color:"#fff" }}
          >
            {loading ? "…" : "↑"}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const screenHistoryRef = useRef([]);
  const [userRole, setUserRole] = useState("owner");
  const [staffOwnerId, setStaffOwnerId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const lastApptCountRef = useRef(null);

  // Request notification permission on first load
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      setTimeout(() => Notification.requestPermission().then(p => { if (p === "granted") subscribePush(); }), 3000);
    } else if ("Notification" in window && Notification.permission === "granted") {
      subscribePush();
    }
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/pocketflow/sw-notify.js").catch(() => {});
    }
  }, []);

  const subscribePush = async () => {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BGq4JjwOYIGz2gmofZnpK5ZRdCVaZJRcmgVRw16R8bj0zqruNGoGsuakmrRYgbdBpgRvrscLph2bTJ4aShHUK9A",
      });
      // Save subscription to server
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        fetch("https://pocketflow-proxy-production.up.railway.app/save-push-sub", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ owner_id: session.user.id, subscription: sub.toJSON() }),
        }).catch(() => {});
      }
    } catch {}
  };

  const showToast = (msg, type = "info") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
    // Also show native browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("spool", {
          body: msg,
          icon: "https://omar51128102008-cloud.github.io/pocketflow/notification-icon.png",
          badge: "https://omar51128102008-cloud.github.io/pocketflow/notification-icon.png",
          image: "https://omar51128102008-cloud.github.io/pocketflow/notification-icon-512.png",
          silent: false,
          requireInteraction: type === "booking",
          tag: "spool-" + Date.now(),
        });
      } catch {}
    }
  };

  // Poll for new appointments every 30s and show toast
  useEffect(() => {
    const poll = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = session.user.id;
      const { count } = await supabase.from("appointments").select("id", { count: "exact", head: true }).eq("owner_id", uid);
      if (lastApptCountRef.current !== null && count > lastApptCountRef.current) {
        // Fetch the latest appointment details
        const { data: latest } = await supabase.from("appointments").select("client_name,service,day,time,price").eq("owner_id", uid).order("created_at", { ascending: false }).limit(1);
        const a = latest?.[0];
        const msg = a ? `${a.client_name} — ${a.service}\n${a.day} at ${a.time}${a.price ? " · " + a.price : ""}` : `${count - lastApptCountRef.current} new booking${count - lastApptCountRef.current > 1 ? "s" : ""}!`;
        showToast(msg, "booking");
        // Notification sound
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator(); const g = ctx.createGain();
          osc.connect(g); g.connect(ctx.destination);
          osc.frequency.value = 880; g.gain.value = 0.1;
          osc.start(); osc.stop(ctx.currentTime + 0.15);
          setTimeout(() => { const o2 = ctx.createOscillator(); const g2 = ctx.createGain(); o2.connect(g2); g2.connect(ctx.destination); o2.frequency.value = 1100; g2.gain.value = 0.1; o2.start(); o2.stop(ctx.currentTime + 0.15); }, 180);
        } catch {}
      }
      lastApptCountRef.current = count;
    }, 30000);
    return () => clearInterval(poll);
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handlePop = () => {
      const hist = screenHistoryRef.current;
      if (hist.length > 1) {
        hist.pop(); // remove current
        const prev = hist[hist.length - 1] || "home";
        setScreen(prev);
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Stripe checkout return
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => setScreen("subscription"), 300);
    } else if (params.get("checkout") === "cancel") {
      window.history.replaceState({}, "", window.location.pathname);
    }

    // Handle Google OAuth callback (token in URL hash)
    const hash = window.location.hash;
    if (hash && hash.includes("access_token") && hash.includes("state=google_calendar_auth")) {
      const hashParams = new URLSearchParams(hash.replace("#", ""));
      const accessToken = hashParams.get("access_token");
      const expiresIn = parseInt(hashParams.get("expires_in") || "3600");
      if (accessToken) {
        // Save token locally
        localStorage.setItem("google_access_token", accessToken);
        localStorage.setItem("google_token_expiry", String(Date.now() + expiresIn * 1000));

        // Get user info + save token to proxy (so book.html can use it)
        fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: "Bearer " + accessToken }
        }).then(r => r.json()).then(async info => {
          if (info.email) localStorage.setItem("google_email", info.email);
          // Get owner's Supabase user ID
          const { data: { session } } = await supabase.auth.getSession();
          const ownerId = session?.user?.id;
          if (ownerId) {
            // Save token to proxy keyed by owner ID
            fetch("https://pocketflow-proxy-production.up.railway.app/save-google-token", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ owner_id: ownerId, access_token: accessToken, expires_in: expiresIn, email: info.email || "" }),
            }).catch(() => {});
          }
        }).catch(() => {});

        window.history.replaceState({}, "", window.location.pathname);
        window.dispatchEvent(new Event("storage"));
        setTimeout(() => setScreen("connections"), 500);
      }
    }
  }, []);

  // Check for existing session on load
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        try {
          // Check if user is staff first
          const { data: staffProf } = await supabase.from("staff_profiles").select("owner_id,role,status").eq("user_id", session.user.id).eq("status", "active").single();
          if (staffProf) {
            setUserRole("staff");
            setStaffOwnerId(staffProf.owner_id);
            setScreen("home");
            return;
          }
          // Otherwise check if owner
          const { data } = await supabase.from("business_profiles").select("biz_name").eq("user_id", session.user.id).single();
          if (data?.biz_name) { setUserRole("owner"); setScreen("home"); }
          else setScreen("onboarding");
        } catch {
          setScreen("home");
        }
      } else {
        setScreen("login");
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") setScreen("login");
    });
    return () => subscription.unsubscribe();
  }, []);

  const [subscriptionPlan, setSubscriptionPlan] = useState(null); // null=loading, "free", "starter", "pro", "trialing"

  useEffect(() => {
    const checkSub = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      try {
        const res = await fetch("https://pocketflow-proxy-production.up.railway.app/subscription-status", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: session.user.id, email: session.user.email }),
        });
        const data = await res.json();
        setSubscriptionPlan(data.plan || "free");
      } catch {
        setSubscriptionPlan("free");
      }
    };
    checkSub();
  }, [screen]); // re-check on every screen change

  const STAFF_ALLOWED = ["home", "schedule", "inbox", "clients", "staff", "settings", "notifications"];
  const navigate = (s) => {
    if (userRole === "staff" && !STAFF_ALLOWED.includes(s)) return;
    screenHistoryRef.current.push(s);
    window.history.pushState({ screen: s }, "", "");
    setScreen(s);
    window.scrollTo(0, 0);
  };

  const screens = { splash: Splash, login: Login, onboarding: Onboarding, home: Home, schedule: Schedule, inbox: Inbox, clients: Clients, payments: Payments, settings: Settings, loyalty: Loyalty, notifications: Notifications, analytics: Analytics, promotions: Promotions, booking: Booking, staff: Staff, waitlist: Waitlist, profile: BusinessProfile, connections: ConnectedAccounts, subscription: Subscription, sharelink: ShareLink, services: Services, packages: Packages };
  const Screen = screens[screen] || Home;

  const isAuthScreen = screen === "login" || screen === "onboarding" || screen === "booking" || screen === "splash";
  const showSidebar = isDesktop && !isAuthScreen;

  // Screens that are always free (no paywall)
  const freeScreens = ["login", "onboarding", "booking", "subscription", "settings", "sharelink", "home", "notifications", "profile", "connections", "schedule", "inbox", "clients", "payments", "services", "analytics", "promotions", "loyalty", "staff", "waitlist"];
  const needsPaywall = false; // Disabled until Stripe live mode is ready

  const showAISidebar = isDesktop && !isAuthScreen && screen !== "settings";
  const [aiSidebarCollapsed, setAiSidebarCollapsed] = useState(() => {
    try { return localStorage.getItem("aria_sidebar_collapsed") === "true"; } catch { return false; }
  });
  useEffect(() => {
    const handler = (e) => setAiSidebarCollapsed(e.detail.collapsed);
    window.addEventListener("aria_sidebar_toggle", handler);
    return () => window.removeEventListener("aria_sidebar_toggle", handler);
  }, []);

  const [mobileAIOpen, setMobileAIOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", background: C.bg, minHeight: "100vh", color: C.text, direction: isRTL() ? "rtl" : "ltr" }}>
      <style>{GLOBAL_STYLES}</style>
      {/* Toast Notifications */}
      <div style={{ position: "fixed", top: 12, left: "50%", transform: "translateX(-50%)", zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 400, padding: "0 16px", pointerEvents: "none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: t.type === "booking" ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : t.type === "error" ? C.red : C.surfaceSolid, border: `1px solid ${t.type === "booking" ? C.accent : t.type === "error" ? C.red : C.border}`, borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, animation: "slideDown 0.3s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", backdropFilter: "blur(20px)", pointerEvents: "auto" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{t.type === "booking" ? "▣" : t.type === "error" ? "!" : "◉"}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{t.msg}</div>
          </div>
        ))}
      </div>
      {showSidebar && <Sidebar active={screen} navigate={navigate} userRole={userRole} staffOwnerId={staffOwnerId} />}
      {needsPaywall && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24, padding: "36px 28px", maxWidth: 400, width: "100%", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, margin: "0 auto 16px" }}><img src={SPOOL_LOGO} alt="spool" style={{ width: "100%", height: "100%", borderRadius: 14 }} /></div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Start your free trial</div>
            <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.7, marginBottom: 24 }}>
              Get 14 days free — no credit card required.<br />
              Unlock the full spool experience.
            </div>
            <BtnPrimary onClick={() => navigate("subscription")} style={{ width: "100%", padding: 15, fontSize: 15, marginBottom: 12 }}>
              See Plans — from $19/mo
            </BtnPrimary>
            <div onClick={() => navigate("home")} style={{ fontSize: 13, color: C.dim, cursor: "pointer", marginTop: 4 }}>
              Back to home
            </div>
          </div>
        </div>
      )}
      <div style={{
        marginLeft: showSidebar ? 240 : 0,
        marginRight: showAISidebar && !aiSidebarCollapsed ? 360 : 0,
        minHeight: "100vh",
      }}>
        <div style={{ maxWidth: showSidebar ? "none" : isDesktop ? 720 : 480, margin: "0 auto", padding: showSidebar ? "0 24px" : isDesktop ? "0 24px" : "0", width: "100%", overflowX: "hidden" }}>
          <Screen navigate={navigate} userRole={userRole} staffOwnerId={staffOwnerId} setUserRole={setUserRole} setStaffOwnerId={setStaffOwnerId} />
        </div>
      </div>
      {showAISidebar && <AISidebarPanel navigate={navigate} />}
      {/* Mobile AI floating button */}
      {!isDesktop && !isAuthScreen && !mobileAIOpen && (
        <div onClick={() => setMobileAIOpen(true)} style={{ position: "fixed", bottom: 85, right: 16, width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, zIndex: 45, cursor: "pointer", boxShadow: "0 4px 24px rgba(139,92,246,0.4)" }}>✦</div>
      )}
      {/* Mobile AI chat overlay */}
      {!isDesktop && mobileAIOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: C.bg, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "52px 16px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
              <div><div style={{ fontSize: 15, fontWeight: 700 }}>AI Assistant</div><div style={{ fontSize: 11, color: C.green }}>Online</div></div>
            </div>
            <div onClick={() => setMobileAIOpen(false)} style={{ width: 36, height: 36, borderRadius: 11, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: C.mid }}>×</div>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <AISidebarPanel navigate={(s) => { setMobileAIOpen(false); navigate(s); }} isMobile={true} />
          </div>
        </div>
      )}
    </div>
  );
}
