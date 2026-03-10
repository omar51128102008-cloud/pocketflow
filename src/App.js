/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// API calls go through the Railway proxy — no keys needed in the frontend
const supabase = createClient(
  "https://nrgecynqwibxdamrqopv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ2VjeW5xd2lieGRhbXJxb3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDM3OTksImV4cCI6MjA4ODQ3OTc5OX0.3Eg_uAWhGGlnB9CrPYpbDHjLjF8KEin64BidmdHbc3s"
);

const C = {
  bg: "#050508", surface: "#0e0e14", surfaceHigh: "#16161f",
  border: "#1e1e2e", borderHigh: "#2a2a3e",
  accent: "#a78bfa", accentDark: "#7c3aed", accentSoft: "#a78bfa18",
  gold: "#f59e0b", green: "#10b981", red: "#f43f5e", yellow: "#fbbf24", blue: "#38bdf8",
  text: "#f1f0ff", mid: "#8b8ba8", dim: "#3d3d55",
};

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
  ::-webkit-scrollbar{display:none;}
  body{background:#050508;}
  .fade-in{animation:fadeUp 0.35s ease forwards;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
  @keyframes pop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  @keyframes orbFloat{0%,100%{transform:translateY(0px) scale(1)}50%{transform:translateY(-6px) scale(1.03)}}
  @keyframes orbSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes orbSpinRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
  @keyframes orbPulse{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.15);opacity:1}}
  @keyframes wave1{0%,100%{d:path("M0,50 Q25,20 50,50 Q75,80 100,50")}50%{d:path("M0,50 Q25,80 50,50 Q75,20 100,50")}}
  @keyframes blobMorph{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60%/30% 40% 70% 50%}75%{border-radius:40% 60% 50% 40%/70% 30% 50% 60%}}
  input:focus,textarea:focus,select:focus{outline:none;}
  input::placeholder,textarea::placeholder{color:#3d3d55;}
  input[type=range]{-webkit-appearance:none;height:4px;border-radius:2px;background:#1e1e2e;}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a78bfa);cursor:pointer;}
  select{appearance:none;}
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
  <div onClick={onToggle} style={{ width: 46, height: 26, borderRadius: 100, background: on ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : C.border, position: "relative", cursor: "pointer", transition: "background 0.25s", flexShrink: 0 }}>
    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.25s" }} />
  </div>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, ...style }}>{children}</div>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, marginTop: 24 }}>{children}</div>
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
  <button onClick={onClick} disabled={disabled} style={{ background: disabled ? "#1e1e2e" : `linear-gradient(135deg,${C.accentDark},${C.accent})`, border: "none", borderRadius: 14, color: disabled ? C.dim : "#fff", fontFamily: "'Red Hat Display',sans-serif", fontWeight: 600, fontSize: 15, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s", ...style }}>{children}</button>
);

const BackBtn = ({ onBack }) => (
  <div onClick={onBack} style={{ width: 38, height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
  </div>
);

const BottomNav = ({ active, navigate }) => (
  <div className="mobile-only" style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 400, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", padding: "10px 0 20px", zIndex: 50 }}>
    {[
      { id: "home", icon: "⌂", label: "Home" },
      { id: "schedule", icon: "◫", label: "Schedule" },
      { id: "inbox", icon: "◻", label: "Inbox" },
      { id: "assistant", icon: "✦", label: "AI" },
      { id: "clients", icon: "◯", label: "Clients" },
    ].map(t => (
      <div key={t.id} onClick={() => navigate(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", position: "relative" }}>
        <div style={{ fontSize: t.id === "assistant" ? 16 : 18, color: active === t.id ? C.accent : C.dim, transition: "color 0.2s" }}>{t.icon}</div>
        <div style={{ fontSize: 9, fontWeight: 600, color: active === t.id ? C.accent : C.dim, letterSpacing: 0.5, transition: "color 0.2s" }}>{t.label}</div>
        {active === t.id && <div style={{ position: "absolute", bottom: -10, width: 20, height: 2, background: C.accent, borderRadius: 2 }} />}
      </div>
    ))}
  </div>
);

const WA = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const IG = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="url(#ig)">
    <defs><radialGradient id="ig" cx="30%" cy="107%"><stop offset="0%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

// ── Helpers ────────────────────────────────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return "";
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return Math.floor(diff/60) + "m ago";
  if (diff < 86400) return Math.floor(diff/3600) + "h ago";
  return Math.floor(diff/86400) + "d ago";
}

// ── LOGIN ──────────────────────────────────────────────────────────────────────
function Login({ navigate }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bizName, setBizName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmSent, setConfirmSent] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleAuth = async () => {
    setError("");
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else navigate("home");
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { business_name: bizName } }
      });
      if (error) setError(error.message);
      else setConfirmSent(true);
    }
    setLoading(false);
  };

  const handleReset = async () => {
    if (!email) { setError("Enter your email first"); return; }
    setError(""); setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/pocketflow"
    });
    setLoading(false);
    if (error) setError(error.message);
    else setResetSent(true);
  };

  if (resetSent) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 24 }}>📧</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Check your email</div>
      <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.7, marginBottom: 28 }}>We sent a password reset link to<br /><span style={{ color: C.accent, fontWeight: 600 }}>{email}</span></div>
      <BtnPrimary onClick={() => { setResetMode(false); setResetSent(false); }} style={{ padding: "13px 28px" }}>Back to Login</BtnPrimary>
    </div>
  );

  if (confirmSent) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 24 }}>📧</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Check your email</div>
      <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.7, marginBottom: 28 }}>We sent a confirmation link to<br /><span style={{ color: C.accent, fontWeight: 600 }}>{email}</span><br />Click it to activate your account.</div>
      <BtnPrimary onClick={() => setConfirmSent(false)} style={{ padding: "13px 28px" }}>Back to Login</BtnPrimary>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "60px 24px 40px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 400, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 70, height: 70, borderRadius: 22, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px", boxShadow: `0 0 40px ${C.accentDark}44` }}>✦</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800 }}>Pocketflow</div>
          <div style={{ fontSize: 14, color: C.mid, marginTop: 6 }}>Your AI business assistant</div>
        </div>
        {resetMode ? (
          <>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Reset password</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>Enter your email and we'll send a reset link.</div>
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
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
            {mode === "signup" && <input placeholder="Business name" value={bizName} onChange={e => setBizName(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />}
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAuth()} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAuth()} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 20 }} />
            {error && <div style={{ background: "#f43f5e18", border: "1px solid #f43f5e33", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: C.red, marginBottom: 16 }}>{error}</div>}
            {mode === "login" && <div style={{ textAlign: "right", marginBottom: 16, marginTop: -8 }}><span onClick={() => { setResetMode(true); setError(""); }} style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Forgot password?</span></div>}
            <BtnPrimary onClick={handleAuth} disabled={loading || !email || !password} style={{ width: "100%", padding: 16 }}>
              {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
            </BtnPrimary>
          </>
        )}
      </div>
      <div style={{ textAlign: "center", fontSize: 12, color: C.dim, marginTop: 24 }}>By continuing you agree to our <span style={{ color: C.accent }}>Terms</span> & <span style={{ color: C.accent }}>Privacy Policy</span></div>
    </div>
  );
}

// ── ONBOARDING ─────────────────────────────────────────────────────────────────
const BUSINESS_TYPES = ["Hair Salon", "Barbershop", "Nail Salon", "Lash Tech", "Esthetician", "Massage Therapy", "Other"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PLATFORMS = [
  { id: "whatsapp", label: "WhatsApp", icon: "💬", color: "#25D366" },
  { id: "instagram", label: "Instagram", icon: "📸", color: "#E1306C" },
  { id: "google", label: "Google Calendar", icon: "📅", color: "#4285F4" },
  { id: "facebook", label: "Facebook", icon: "👥", color: "#1877F2" },
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
  const [bizLocation, setBizLocation] = useState("");
  const [services, setServices] = useState([{ id: 1, name: "Knotless Braids", price: "180", duration: "4h" }, { id: 2, name: "Silk Press", price: "120", duration: "2h" }]);
  const [newService, setNewService] = useState({ name: "", price: "", duration: "" });
  const [workDays, setWorkDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("7:00 PM");
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [aiPerms, setAiPerms] = useState(["reply_dms", "send_reminders", "follow_ups"]);
  const [aiTone, setAiTone] = useState("friendly");
  const totalSteps = 5;

  const canContinue = () => {
    if (step === 0) return bizName.length > 1 && bizType;
    if (step === 1) return services.length > 0;
    if (step === 2) return workDays.length > 0;
    if (step === 3) return connectedPlatforms.length > 0;
    return true;
  };

  if (done) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ width: 90, height: 90, borderRadius: 28, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 28, boxShadow: `0 0 60px ${C.accentDark}44`, animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>✦</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>{bizName || "Your business"} is<br />live on Pocketflow.</div>
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
          localStorage.setItem("pocketflow_onboarded_" + session.user.id, "true");
          // Save business profile
          await supabase.from("business_profiles").upsert({ user_id: session.user.id, biz_name: bizName, location: bizLocation }, { onConflict: "user_id" });
          // Save services
          if (services.length > 0) {
            const rows = services.map(s => ({ owner_id: session.user.id, name: s.name, price: parseFloat(s.price) || 0, duration: s.duration || "1h", icon: "✨", active: true }));
            await supabase.from("services").insert(rows);
          }
        }
        navigate("home");
      }} style={{ width: "100%", padding: 16 }}>Go to Dashboard →</BtnPrimary>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "52px 24px 0" }}>
        {step > 0 && <div onClick={() => setStep(p => p - 1)} style={{ width: 38, height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 20 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></div>}
        <div style={{ display: "flex", gap: 5, marginBottom: 28 }}>
          {Array.from({ length: totalSteps }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? `linear-gradient(90deg,${C.accentDark},${C.accent})` : C.border, transition: "background 0.3s" }} />)}
        </div>
      </div>
      <div style={{ flex: 1, padding: "0 24px", overflowY: "auto" }}>
        {step === 0 && (
          <div className="fade-in">
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Step 1 of 5</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Tell us about<br />your business</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 28 }}>We'll set everything up around you.</div>
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>BUSINESS NAME</div>
            <input placeholder="e.g. Luxe Hair Studio" value={bizName} onChange={e => setBizName(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 16 }} />
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>TYPE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {BUSINESS_TYPES.map(t => <div key={t} onClick={() => setBizType(t)} style={{ padding: "9px 16px", borderRadius: 100, background: bizType === t ? C.accentSoft : C.surface, border: `1px solid ${bizType === t ? C.accent : C.border}`, fontSize: 13, color: bizType === t ? C.accent : C.mid, cursor: "pointer", fontWeight: bizType === t ? 600 : 400, transition: "all 0.2s" }}>{t}</div>)}
            </div>
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>LOCATION</div>
            <input placeholder="e.g. Atlanta, GA" value={bizLocation} onChange={e => setBizLocation(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }} />
          </div>
        )}
        {step === 1 && (
          <div className="fade-in">
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Step 2 of 5</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>What services<br />do you offer?</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>AI will use these to answer pricing questions.</div>
            {services.map(s => (
              <div key={s.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>${s.price} · {s.duration}</div></div>
                <div onClick={() => setServices(p => p.filter(x => x.id !== s.id))} style={{ width: 28, height: 28, borderRadius: 8, background: "#f43f5e11", border: "1px solid #f43f5e22", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: C.red }}>×</div>
              </div>
            ))}
            <div style={{ background: C.surface, border: `1px dashed ${C.borderHigh}`, borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 10 }}>ADD SERVICE</div>
              <input placeholder="Service name" value={newService.name} onChange={e => setNewService(p => ({ ...p, name: e.target.value }))} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 8 }} />
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input placeholder="Price $" value={newService.price} onChange={e => setNewService(p => ({ ...p, price: e.target.value }))} style={{ flex: 1, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }} />
                <input placeholder="Duration" value={newService.duration} onChange={e => setNewService(p => ({ ...p, duration: e.target.value }))} style={{ flex: 1, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }} />
              </div>
              <button onClick={() => { if (!newService.name) return; setServices(p => [...p, { ...newService, id: Date.now() }]); setNewService({ name: "", price: "", duration: "" }); }} style={{ width: "100%", padding: 11, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.mid, cursor: "pointer", fontFamily: "'Red Hat Display',sans-serif", fontWeight: 600 }}>+ Add Service</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="fade-in">
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Step 3 of 5</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>When are you<br />available?</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>AI will never book outside these hours.</div>
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 12 }}>WORKING DAYS</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {DAYS.map(d => <div key={d} onClick={() => setWorkDays(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d])} style={{ flex: 1, height: 44, borderRadius: 12, background: workDays.includes(d) ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : C.surface, border: `1px solid ${workDays.includes(d) ? "transparent" : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: workDays.includes(d) ? "#fff" : C.dim, cursor: "pointer", transition: "all 0.2s" }}>{d}</div>)}
            </div>
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 12 }}>WORKING HOURS</div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>Opens at</div>
                <select value={startTime} onChange={e => setStartTime(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }}>
                  {["7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ color: C.dim, marginTop: 16 }}>→</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>Closes at</div>
                <select value={endTime} onChange={e => setEndTime(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }}>
                  {["4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="fade-in">
            <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Step 4 of 5</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Connect your<br />accounts</div>
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
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Set up your<br />AI assistant</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>Choose what Pocketflow handles on its own.</div>
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
      <div style={{ padding: "16px 24px 36px", background: `linear-gradient(0deg,${C.bg} 80%,transparent)`, position: "sticky", bottom: 0 }}>
        <BtnPrimary disabled={!canContinue()} onClick={() => step < totalSteps - 1 ? setStep(p => p + 1) : setDone(true)} style={{ width: "100%", padding: 16 }}>
          {step === totalSteps - 1 ? "Launch Pocketflow 🚀" : "Continue"}
        </BtnPrimary>
        {step === 0 && <div style={{ textAlign: "center", fontSize: 12, color: C.dim, marginTop: 12 }}>Takes less than 3 minutes</div>}
      </div>
    </div>
  );
}

// ── HOME ───────────────────────────────────────────────────────────────────────
function Home({ navigate }) {
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showAllAppts, setShowAllAppts] = useState(false);
  const [bizName, setBizName] = useState("");
  const [appts, setAppts] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [stats, setStats] = useState({ weekRevenue: 0, todayCount: 0, aiHandled: 0, clientCount: 0 });

  const activity = [
    { icon: "✦", text: "AI is ready to handle your messages and bookings", time: "Now" },
    { icon: "✦", text: "Booking page is live — share your link with clients", time: "" },
  ];

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = session.user.id;

      const [profRes, apptsRes, msgsRes, clientsRes] = await Promise.all([
        supabase.from("business_profiles").select("biz_name").eq("user_id", uid).single(),
        supabase.from("appointments").select("*").eq("owner_id", uid).order("created_at", { ascending: false }),
        supabase.from("messages").select("*").eq("owner_id", uid).order("created_at", { ascending: false }),
        supabase.from("clients").select("id").eq("owner_id", uid),
      ]);

      setBizName(profRes.data?.biz_name || session.user.user_metadata?.business_name || "");

      const allAppts = apptsRes.data || [];
      const allMsgs = msgsRes.data || [];
      setAppts(allAppts);
      setMsgs(allMsgs);

      const weekRevenue = allAppts
        .filter(a => a.status === "confirmed")
        .reduce((s, a) => s + (parseInt((a.price||"0").replace(/\D/g,""))||0), 0);
      const todayCount = allAppts.filter(a => a.day === "Today").length;
      const aiHandled = allMsgs.filter(m => m.handled).length;
      const clientCount = (clientsRes.data || []).length;

      setStats({ weekRevenue, todayCount, aiHandled, clientCount });
    };
    load();
  }, []);

  const unread = msgs.filter(m => m.unread);
  const todayAppts = appts.filter(a => a.day === "Today");

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: "40px 20px 20px", background: `linear-gradient(180deg,#111 0%,${C.bg} 100%)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 12, color: C.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>Good morning,<br /><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{bizName || "your business"}</span> ✦</div>
          </div>
          <div style={{ position: "relative", cursor: "pointer" }} onClick={() => navigate("notifications")}>
            <div style={{ width: 44, height: 44, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔔</div>
            {unread.length > 0 && <div style={{ position: "absolute", top: -4, right: -4, width: 20, height: 20, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", border: `2px solid ${C.bg}` }}>{unread.length}</div>}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 24 }}>
          {[
            { label: "This week", value: "$" + stats.weekRevenue, sub: "revenue", color: C.gold, icon: "💰" },
            { label: "Today", value: String(stats.todayCount), sub: "appointments", color: C.text, icon: "📅" },
            { label: "AI handled", value: String(stats.aiHandled), sub: "messages", color: C.accent, icon: "✦" },
            { label: "Clients", value: String(stats.clientCount), sub: "total", color: C.green, icon: "👥" },
          ].map((s, i) => (
            <Card key={i} style={{ padding: "16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: C.dim, marginTop: 1 }}>{s.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

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
              {todayAppts.slice(0, showAllAppts ? todayAppts.length : 3).map((a, i, arr) => (
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
                  <span style={{ color: C.accent, fontSize: 10, marginTop: 2, flexShrink: 0 }}>{a.icon}</span>
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
                  { icon: "➕", label: "New Appointment", screen: "schedule" },
                  { icon: "💬", label: "View Inbox", screen: "inbox" },
                  { icon: "🔗", label: "Booking Link", screen: "sharelink" },
                  { icon: "✦", label: "Ask AI", screen: "assistant" },
                ].map(item => (
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
          {[{ icon: "✂️", label: "Services", screen: "services" }, { icon: "💳", label: "Payments", screen: "payments" }, { icon: "⚙️", label: "Settings", screen: "settings" }, { icon: "🎁", label: "Loyalty", screen: "loyalty" }, { icon: "📊", label: "Analytics", screen: "analytics" }, { icon: "📣", label: "Promotions", screen: "promotions" }, { icon: "👥", label: "Staff", screen: "staff" }, { icon: "⏳", label: "Waitlist", screen: "waitlist" }, { icon: "🔗", label: "Share Booking Link", screen: "sharelink" }].map(item => (
            <Card key={item.screen} onClick={() => navigate(item.screen)} style={{ padding: "16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</span>
            </Card>
          ))}
        </div>
      </div>

      {selectedAppt && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", maxWidth: 400, margin: "0 auto" }} onClick={() => setSelectedAppt(null)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: C.accent }}>{selectedAppt.avatar}</div>
              <div><div style={{ fontSize: 18, fontWeight: 700 }}>{selectedAppt.name}</div><div style={{ fontSize: 13, color: C.mid, marginTop: 3 }}>{selectedAppt.service}</div></div>
            </div>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              {[["Time", selectedAppt.time], ["Price", selectedAppt.price], ["Status", selectedAppt.status], ["Note", selectedAppt.note]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: k !== "Note" ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: C.mid }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: k === "Price" ? C.gold : k === "Status" ? (selectedAppt.status === "confirmed" ? C.green : C.yellow) : C.text }}>{v}</span>
                </div>
              ))}
            </Card>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ flex: 1, padding: 13, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'Red Hat Display',sans-serif" }}>Reschedule</button>
              <BtnPrimary style={{ flex: 1, padding: 13 }}>Send Reminder</BtnPrimary>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="home" navigate={navigate} />
    </div>
  );
}

// ── SCHEDULE ───────────────────────────────────────────────────────────────────
function Schedule({ navigate }) {
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reminderSent, setReminderSent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("appointments").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: false });
      setAppts(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const todayAppts = appts.filter(a => a.day === "Today");
  const upcomingAppts = appts.filter(a => a.day !== "Today");
  const totalRevenue = appts.filter(a => a.status === "confirmed").reduce((s, a) => s + (parseInt((a.price||"0").replace(/\D/g,""))||0), 0);

  const ApptRow = ({ a, last }) => (
    <div onClick={() => setSelectedAppt(a)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: last ? "none" : `1px solid ${C.border}`, cursor: "pointer" }}>
      <div style={{ width: 42, height: 42, borderRadius: 13, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0 }}>{a.client_avatar || a.client_name?.slice(0,2).toUpperCase()}</div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{a.client_name}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{a.service} · {a.duration}</div></div>
      <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 600 }}>{a.time}</div><div style={{ fontSize: 12, color: C.gold, marginTop: 2, fontWeight: 600 }}>{a.price}</div></div>
    </div>
  );

  const EmptyState = ({ label }) => (
    <Card style={{ padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>📅</div>
      <div style={{ fontSize: 13, color: C.mid }}>No {label} appointments</div>
    </Card>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Schedule</div>
        </div>
        <div style={{ fontSize: 13, color: C.mid }}>{appts.length} appointments · ${totalRevenue} confirmed</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: C.mid }}>Loading schedule...</div>
        ) : (
          <>
            <SectionLabel>Today</SectionLabel>
            {todayAppts.length > 0
              ? <Card style={{ padding: "4px 16px", marginBottom: 8 }}>{todayAppts.map((a, i) => <ApptRow key={a.id} a={a} last={i === todayAppts.length - 1} />)}</Card>
              : <EmptyState label="today's" />}
            <SectionLabel>Upcoming</SectionLabel>
            {upcomingAppts.length > 0
              ? <Card style={{ padding: "4px 16px" }}>{upcomingAppts.map((a, i) => <ApptRow key={a.id} a={a} last={i === upcomingAppts.length - 1} />)}</Card>
              : <EmptyState label="upcoming" />}
          </>
        )}
      </div>
      {selectedAppt && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", maxWidth: 430, margin: "0 auto" }} onClick={() => { setSelectedAppt(null); setReminderSent(null); }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: C.accent }}>{selectedAppt.client_avatar || selectedAppt.client_name?.slice(0,2).toUpperCase()}</div>
              <div><div style={{ fontSize: 18, fontWeight: 700 }}>{selectedAppt.client_name}</div><div style={{ fontSize: 13, color: C.mid }}>{selectedAppt.service}</div></div>
            </div>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              {[["Day", selectedAppt.day], ["Time", selectedAppt.time], ["Duration", selectedAppt.duration], ["Price", selectedAppt.price], ["Status", selectedAppt.status], ["Note", selectedAppt.note]].filter(([,v]) => v).map(([k, v]) => (
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
            {reminderSent
              ? <div style={{ padding: 13, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 14, fontSize: 14, fontWeight: 600, color: C.green, textAlign: "center" }}>✓ Reminder sent!</div>
              : <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setSelectedAppt(null)} style={{ flex: 1, padding: 13, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'Red Hat Display',sans-serif" }}>Reschedule</button>
                  <BtnPrimary onClick={async () => {
                    setReminderSent(true);
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
                  }} style={{ flex: 1, padding: 13 }}>Send Reminder</BtnPrimary>
                </div>}
          </div>
        </div>
      )}
      <BottomNav active="schedule" navigate={navigate} />
    </div>
  );
}

// ── INBOX ──────────────────────────────────────────────────────────────────────
function Inbox({ navigate }) {
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const unread = msgs.filter(m => m.unread);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("messages").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: false });
      setMsgs(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleAI = async (m) => {
    const reply = "Hey! Thanks for reaching out 💕 Let me check on that and get back to you shortly.";
    await supabase.from("messages").update({ handled: true, unread: false, reply }).eq("id", m.id);
    setMsgs(p => p.map(x => x.id === m.id ? { ...x, handled: true, unread: false, reply } : x));
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Inbox</div>
        </div>
        <div style={{ fontSize: 13, color: C.mid }}>AI handled {msgs.filter(m => m.handled).length} of {msgs.length} messages</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: C.mid }}>Loading messages...</div>
        ) : msgs.length === 0 ? (
          <Card style={{ padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>No messages yet</div>
            <div style={{ fontSize: 13, color: C.mid }}>When clients message you via WhatsApp or Instagram, they'll appear here.</div>
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
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <BtnPrimary onClick={() => handleAI(m)} style={{ flex: 1, padding: 10, fontSize: 12 }}>Let AI handle it</BtnPrimary>
                    <button style={{ flex: 1, padding: 10, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 12, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'Red Hat Display',sans-serif" }}>Reply myself</button>
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

// ── ASSISTANT ──────────────────────────────────────────────────────────────────
function Assistant({ navigate }) {
  const [chatInput, setChatInput] = useState("");
  const [aiName, setAiName] = useState("Aria");
  const [bizContext, setBizContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Thinking...");
  const [speaking, setSpeaking] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("aria_chat_history");
      if (saved) { const parsed = JSON.parse(saved); if (Array.isArray(parsed) && parsed.length > 0) return parsed; }
    } catch {}
    return null;
  });
  const [voiceSupported] = useState(() => "webkitSpeechRecognition" in window || "SpeechRecognition" in window);
  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceSession, setVoiceSession] = useState([]);
  const voiceSessionRef = useRef([]);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceLabel, setVoiceLabel] = useState("Tap to speak");
  const voiceRecogRef = useRef(null);
  const chatEndRef = useRef(null);
  const voiceChatEndRef = useRef(null);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioCtxRef = useRef(null);
  const [orbScale, setOrbScale] = useState(1);
  const isDesktop = useDesktop();
  const [suggestions, setSuggestions] = useState([
    "What's on my schedule today?",
    "Any unread messages?",
    "How's my revenue this week?",
    "Draft a promo for slow days",
    "Which service makes me the most?",
  ]);

  // Single load effect — no duplicates
  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = session.user.id;
      const [profRes, apptRes, clientRes, msgRes, svcRes] = await Promise.all([
        supabase.from("business_profiles").select("ai_name,biz_name,location").eq("user_id", uid).single(),
        supabase.from("appointments").select("client_name,service,time,day,status,price").eq("owner_id", uid).order("created_at", { ascending: false }).limit(30),
        supabase.from("clients").select("name,total_visits,total_spent").eq("owner_id", uid).limit(8),
        supabase.from("messages").select("name,platform,preview,handled").eq("owner_id", uid).eq("handled", false).limit(10),
        supabase.from("services").select("name,price,duration").eq("owner_id", uid).eq("active", true).limit(10),
      ]);
      const name = profRes.data?.ai_name || "Aria";
      const biz = profRes.data?.biz_name || "your business";
      const loc = profRes.data?.location || "";
      const allAppts = apptRes.data || [];
      const todayAppts = allAppts.filter(a => a.day === "Today" || a.status === "pending");
      const confirmedAppts = allAppts.filter(a => a.status === "confirmed");
      const unhandled = (msgRes.data || []).length;
      const services = (svcRes.data || []).map(s => `${s.name} ($${s.price}, ${s.duration})`).join(", ");
      const parseP = p => parseFloat(String(p || "0").replace(/[^0-9.]/g, "")) || 0;
      const revenue = confirmedAppts.reduce((s, a) => s + parseP(a.price), 0);
      const ctx = [
        `Business: ${biz}${loc ? ` in ${loc}` : ""}`,
        services ? `Services: ${services}` : "",
        todayAppts.length
          ? `Today's appointments: ${todayAppts.map(a => `${a.client_name} (${a.service} at ${a.time})`).join("; ")}`
          : "No appointments today yet.",
        `Confirmed revenue (all time): $${revenue.toLocaleString()}`,
        `Total appointments on record: ${allAppts.length}`,
        unhandled ? `Unread messages needing attention: ${unhandled}` : "No unread messages.",
        (clientRes.data || []).length ? `Top clients: ${(clientRes.data || []).map(c => c.name).join(", ")}` : "",
      ].filter(Boolean).join("\n");
      setBizContext(ctx);
      setAiName(name);
      const hour = new Date().getHours();
      const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Hey" : "Good evening";
      const todayLine = todayAppts.length
        ? `You have **${todayAppts.length} appointment${todayAppts.length > 1 ? "s" : ""}** today.`
        : "No appointments booked yet today.";
      const msgLine = unhandled
        ? ` There ${unhandled === 1 ? "is" : "are"} **${unhandled} unread message${unhandled > 1 ? "s" : ""}** waiting.`
        : "";
      // Only set greeting if no existing memory
      setChatHistory(prev => {
        if (prev && prev.length > 0) return prev; // keep memory
        return [{
          role: "assistant",
          text: `${greeting}! I'm **${name}**, your AI assistant for **${biz}**. ${todayLine}${msgLine} What do you need?`,
          time: new Date(),
        }];
      });
      // Smart contextual suggestions
      const s = [];
      if (todayAppts.length) s.push("Who's my next client today?");
      if (unhandled) s.push(`Handle my ${unhandled} unread message${unhandled > 1 ? "s" : ""}`);
      if (!s.length) s.push("What's on my schedule today?");
      s.push("How's my revenue this week?");
      s.push("Draft a promo message");
      s.push("Which service makes me the most?");
      if (revenue === 0) s.push("How do I get my first booking?");
      setSuggestions(s.slice(0, 5));
    };
    load();
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, loading]);
  // Persist chat history to localStorage (AI memory)
  useEffect(() => {
    if (!chatHistory || chatHistory.length === 0) return;
    try { localStorage.setItem("aria_chat_history", JSON.stringify(chatHistory.slice(-60))); } catch {}
  }, [chatHistory]);
  useEffect(() => { voiceChatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [voiceSession, voiceLoading]);

  const getAudioCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  };

  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.onended = null; audioRef.current = null; }
    cancelAnimationFrame(animFrameRef.current);
    analyserRef.current = null;
    setSpeaking(false); setOrbScale(1);
  };

  const handleChatInput = (e) => { if (speaking) stopAudio(); setChatInput(e.target.value); };

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
        setOrbScale(1 + (avg / 255) * 0.6);
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
      audio.onended = () => {
        cancelAnimationFrame(animFrameRef.current);
        setOrbScale(1); setSpeaking(false);
        analyserRef.current = null;
      };
    } catch { audio.onended = () => { setSpeaking(false); setOrbScale(1); }; }
  };

  const speakText = async (text, onDone) => {
    try {
      const plain = text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/\n+/g, " ").trim();
      const sentences = plain.match(/[^.!?]+[.!?]+/g) || [plain];
      const short = sentences.slice(0, 2).join(" ").trim() || plain;

      const audioRes = await fetch("https://pocketflow-proxy-production.up.railway.app/speak", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: short }),
      });
      if (!audioRes.ok) { console.warn("speak endpoint failed:", audioRes.status); onDone?.(); return; }

      const blob = await audioRes.blob();
      const url = URL.createObjectURL(blob);

      const finish = () => {
        setSpeaking(false);
        setOrbScale(1);
        URL.revokeObjectURL(url);
        onDone?.();
      };

      const audio = new Audio(url);
      audioRef.current = audio;
      setSpeaking(true);
      startOrbAnalyser(audio);
      audio.onended = finish;
      audio.onerror = finish;

      try {
        await audio.play();
      } catch (playErr) {
        console.warn("audio.play() failed, trying fallback:", playErr);
        const a2 = new Audio(url);
        a2.onended = finish;
        a2.onerror = finish;
        try { await a2.play(); } catch { finish(); }
      }
    } catch (err) {
      console.error("speakText error:", err);
      onDone?.();
    }
  };

  const buildSystemPrompt = (isVoice = false) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    return `You are ${aiName}, an AI business assistant built into Pocketflow — a beauty & personal care business app.
Today: ${today} at ${time}.

YOUR BUSINESS DATA:
${bizContext || "No business data loaded yet."}

PERSONALITY: Warm, sharp, direct. Like a smart best friend who knows this business inside out. Never robotic.
${isVoice
  ? "VOICE MODE: Reply in 1-2 natural sentences only. No lists, no markdown, no asterisks."
  : "TEXT MODE: Use **bold** for key figures/names. Max 4 sentences unless detail is requested. Use line breaks between points if listing multiple things."}

NAVIGATION: If user asks to open/go to/show a screen, reply with NAV:[screen] on the first line then your message. Valid screens: schedule, inbox, clients, payments, analytics, promotions, loyalty, services, staff, waitlist, settings.

Examples:
- "show me my schedule" → NAV:schedule\\nOpening your schedule now!
- "go to payments" → NAV:payments\\nHere's your payments screen.`;
  };

  const handleNavIntent = (raw, inVoiceMode = false) => {
    const match = raw.match(/^NAV:\s*(\w+)/i);
    if (match) {
      const screen = match[1].toLowerCase();
      const rest = raw.replace(/^NAV:\w+\n?/i, "").trim();
      // Navigate but DON'T close voice mode — stay in voice
      setTimeout(() => navigate(screen), 700);
      return { navigating: true, screen, text: rest || `Opening ${screen} now!` };
    }
    return { navigating: false, text: raw };
  };

  const unlockAudio = () => {
    // Unlock mobile audio by playing a silent buffer inside the tap event
    try {
      const ctx = getAudioCtx();
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    } catch {}
  };

  const openVoiceMode = () => {
    unlockAudio(); // must be called synchronously inside the tap event
    stopAudio();
    setVoiceSession([]); voiceSessionRef.current = [];
    setVoiceLabel("Tap to speak"); setVoiceMode(true);
    setTimeout(() => startVoiceListen(), 400);
  };

  const closeVoiceMode = () => {
    voiceRecogRef.current?.stop(); stopAudio();
    setVoiceMode(false); setVoiceListening(false); setVoiceLoading(false); setVoiceLabel("Tap to speak");
    const session = voiceSessionRef.current;
    if (session.length > 0) {
      setChatHistory(prev => [...(prev || []), ...session.map(m => ({ ...m, time: new Date() }))]);
    }
    voiceSessionRef.current = []; setVoiceSession([]);
  };

  const startVoiceListen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR(); r.lang = "en-US"; r.continuous = false; r.interimResults = false;
    r.onresult = e => {
      const t = e.results[0][0].transcript;
      setVoiceListening(false); setVoiceLabel("Tap to speak");
      if (voiceMode) {
        handleVoiceMessage(t);
      } else {
        // Chat mode: show in chat bubbles AND speak back
        sendChat(t, true);
      }
    };
    r.onerror = () => { setVoiceListening(false); setVoiceLabel("Tap to speak"); };
    r.onend = () => setVoiceListening(false);
    voiceRecogRef.current = r; r.start();
    setVoiceListening(true); setVoiceLabel("Listening...");
  };

  const handleVoiceMessage = async (text) => {
    const userMsg = { role: "user", text };
    const updated = [...voiceSessionRef.current, userMsg];
    voiceSessionRef.current = updated; setVoiceSession([...updated]);
    setVoiceLoading(true); setVoiceLabel("Thinking...");
    try {
      const history = [...(chatHistory || []), ...updated];
      const res = await fetch("https://pocketflow-proxy-production.up.railway.app/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", max_tokens: 120,
          messages: [
            { role: "system", content: buildSystemPrompt(true) },
            ...history.map(m => ({ role: m.role, content: m.text }))
          ],
        }),
      });
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "Got it.";
      const { text: reply } = handleNavIntent(raw);
      const assistantMsg = { role: "assistant", text: reply };
      const withReply = [...voiceSessionRef.current, assistantMsg];
      voiceSessionRef.current = withReply; setVoiceSession([...withReply]);
      setVoiceLoading(false); setVoiceLabel("Speaking...");
      console.log("🔊 speakText called with:", reply.slice(0, 60));
      speakText(reply, () => {
        setVoiceLabel("Tap to speak");
        setTimeout(() => { if (voiceRecogRef.current !== null) startVoiceListen(); }, 600);
      });
    } catch {
      const err = { role: "assistant", text: "Connection issue, try again." };
      voiceSessionRef.current = [...voiceSessionRef.current, err];
      setVoiceSession([...voiceSessionRef.current]);
      setVoiceLoading(false); setVoiceLabel("Tap to speak");
    }
  };

  const sendChat = async (overrideText, shouldSpeak = false) => {
    const text = (typeof overrideText === "string" ? overrideText : chatInput).trim();
    if (!text || loading) return;
    stopAudio(); setChatInput("");
    setChatHistory(p => [...(p || []), { role: "user", text, time: new Date() }]);
    setLoading(true);
    const labels = ["Thinking...", "Checking your data...", "On it..."];
    let li = 0; setLoadingLabel(labels[0]);
    const iv = setInterval(() => { li = (li + 1) % labels.length; setLoadingLabel(labels[li]); }, 1800);
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
      const { navigating, screen, text: reply } = handleNavIntent(raw);
      const displayText = navigating ? `Opening **${screen}**... ${reply}` : reply;
      setChatHistory(p => [...p, { role: "assistant", text: displayText, time: new Date() }]);
      if (shouldSpeak) speakText(reply, null);
    } catch {
      setChatHistory(p => [...p, { role: "assistant", text: "Connection issue. Try again in a second.", time: new Date() }]);
    }
    clearInterval(iv);
    setLoading(false);
  };

  // Render **bold** and line breaks
  const renderText = (text) => {
    if (!text) return null;
    return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
      chunk.startsWith("**") && chunk.endsWith("**")
        ? <strong key={i} style={{ fontWeight: 700 }}>{chunk.slice(2, -2)}</strong>
        : <span key={i}>{chunk.split("\n").map((line, j, arr) =>
            j < arr.length - 1 ? <span key={j}>{line}<br /></span> : <span key={j}>{line}</span>
          )}</span>
    );
  };

  const formatTime = (d) => { try { return new Date(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }); } catch { return ""; } };

  // Orb state
  const orbState = voiceListening ? "listening" : (loading || voiceLoading) ? "loading" : speaking ? "speaking" : "idle";
  const orbColor1 = orbState === "listening" ? "#ef4444" : orbState === "loading" ? "#6366f1" : "#7c3aed";
  const orbColor2 = orbState === "listening" ? "#f97316" : orbState === "loading" ? "#a78bfa" : "#a78bfa";
  const orbColor3 = orbState === "speaking" ? "#38bdf8" : "#4f46e5";
  const orbSize = isDesktop ? 190 : 120;
  const orbBlobSize = isDesktop ? 130 : 82;
  const smoothScale = speaking ? orbScale : 1;

  const orbWidgetJSX = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: isDesktop ? "36px 0 28px" : "6px 0 8px" }}>
      <div
        onClick={() => { if (!isDesktop && voiceSupported && orbState === "idle") openVoiceMode(); }}
        style={{ position: "relative", width: orbSize, height: orbSize, display: "flex", alignItems: "center", justifyContent: "center", cursor: !isDesktop && voiceSupported && orbState === "idle" ? "pointer" : "default" }}
      >
        {[1.6, 1.35, 1.15].map((scale, i) => (
          <div key={i} style={{
            position: "absolute", width: orbSize, height: orbSize, borderRadius: "50%",
            background: `radial-gradient(circle, ${orbColor1}${["08","12","18"][i]}, transparent 70%)`,
            transform: `scale(${scale * smoothScale})`,
            transition: speaking ? "none" : "transform 0.3s ease",
            animation: orbState !== "idle" ? `orbPulse ${1.5 + i * 0.4}s ease-in-out infinite` : "none",
            animationDelay: `${i * 0.2}s`,
          }} />
        ))}
        <div style={{
          width: orbBlobSize, height: orbBlobSize,
          background: `radial-gradient(circle at 35% 35%, ${orbColor2}, ${orbColor1} 50%, ${orbColor3})`,
          borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
          boxShadow: `0 0 ${speaking ? 40 : 20}px ${orbColor1}66, 0 0 ${speaking ? 80 : 40}px ${orbColor1}33, inset 0 0 30px rgba(255,255,255,0.1)`,
          animation: `blobMorph ${orbState === "speaking" ? 1.2 : orbState === "loading" ? 1.8 : 4}s ease-in-out infinite`,
          transform: `scale(${smoothScale})`, transition: speaking ? "transform 0.08s linear" : "transform 0.3s ease, box-shadow 0.3s, background 0.4s",
          position: "relative", zIndex: 2,
        }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 60%)", animation: `orbSpinRev ${orbState === "speaking" ? 2 : 6}s linear infinite` }} />
        </div>
        <div style={{ position: "absolute", width: orbSize - 8, height: orbSize - 8, borderRadius: "50%", border: `1px dashed ${orbColor1}33`, animation: `orbSpin ${orbState === "speaking" ? 2 : 8}s linear infinite` }}>
          {[0, 120, 240].map((deg, i) => (
            <div key={i} style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: orbColor2, opacity: 0.7, top: "50%", left: "50%", transform: `rotate(${deg}deg) translateX(${orbSize / 2 - 6}px) translateY(-50%)`, boxShadow: `0 0 5px ${orbColor2}` }} />
          ))}
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: orbState === "listening" ? "#ef4444" : orbState === "speaking" ? C.accent : C.dim, marginTop: 10, transition: "color 0.3s" }}>
        {orbState === "listening" ? "Listening..." : orbState === "loading" ? loadingLabel : orbState === "speaking" ? "Speaking..." : aiName}
      </div>
      {isDesktop && <div style={{ fontSize: 11, color: C.dim, marginTop: 3, textAlign: "center" }}>AI assistant · online 24/7</div>}
      {!isDesktop && voiceSupported && orbState === "idle" && (
        <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>Tap orb for voice</div>
      )}
      {isDesktop && voiceSupported && (
        <div onClick={openVoiceMode} style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 100, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#fff", boxShadow: `0 4px 18px ${C.accent}44` }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          Voice Chat
        </div>
      )}
      {isDesktop && (
        <div style={{ marginTop: 24, width: "100%", padding: "0 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.dim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Quick Actions</div>
          {suggestions.map(c => (
            <div key={c} onClick={() => sendChat(c)}
              style={{ padding: "9px 14px", borderRadius: 10, background: C.surface, border: `1px solid ${C.border}`, fontSize: 13, color: C.mid, cursor: "pointer", marginBottom: 7, transition: "all 0.15s", fontWeight: 500, lineHeight: 1.4 }}
              onMouseEnter={e => { e.currentTarget.style.background = C.surfaceHigh; e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.accent + "55"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.mid; e.currentTarget.style.borderColor = C.border; }}
            >{c}</div>
          ))}
        </div>
      )}
    </div>
  );

  const chatAreaJSX = (
    <>
      {!isDesktop && (
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 16px 10px", flexShrink: 0 }}>
          {suggestions.map(c => (
            <div key={c} onClick={() => sendChat(c)}
              style={{ padding: "6px 14px", borderRadius: 100, background: C.surface, border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 600, color: C.mid, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{c}</div>
          ))}
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", padding: isDesktop ? "20px 28px" : "0 16px 12px" }}>
        {chatHistory === null ? (
          <div style={{ textAlign: "center", padding: 40, color: C.dim, fontSize: 13 }}>Loading {aiName}...</div>
        ) : chatHistory.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 16, alignItems: "flex-end", gap: 8 }}>
            {m.role === "assistant" && (
              <div style={{ width: 28, height: 28, borderRadius: 9, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>✦</div>
            )}
            <div style={{ maxWidth: isDesktop ? "68%" : "80%" }}>
              <div style={{ padding: "11px 15px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : C.surface, border: m.role === "user" ? "none" : `1px solid ${C.border}`, fontSize: 14, lineHeight: 1.65, color: m.role === "user" ? "#fff" : C.text }}>
                {renderText(m.text)}
              </div>
              {m.time && <div style={{ fontSize: 10, color: C.dim, marginTop: 3, textAlign: m.role === "user" ? "right" : "left", paddingLeft: 3, paddingRight: 3 }}>{formatTime(m.time)}</div>}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: 9, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>✦</div>
            <div>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "18px 18px 18px 4px", padding: "13px 16px", display: "flex", gap: 5, alignItems: "center" }}>
                {[0,1,2].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, animation: "pulse 1.2s infinite", animationDelay: `${d * 0.2}s` }} />)}
              </div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 3, paddingLeft: 4 }}>{loadingLabel}</div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={{ padding: isDesktop ? "12px 28px 24px" : "10px 16px 28px", background: C.bg, borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
        {speaking && (
          <div onClick={stopAudio} style={{ textAlign: "center", marginBottom: 8, fontSize: 12, color: C.accent, cursor: "pointer", fontWeight: 600 }}>
            ⏹ Tap to stop speaking
          </div>
        )}
        <div style={{ display: "flex", gap: 8, background: C.surface, border: `1px solid ${speaking ? C.accent : C.border}`, borderRadius: 16, padding: "6px 6px 6px 16px", alignItems: "center", transition: "border-color 0.2s", boxShadow: speaking ? `0 0 0 2px ${C.accent}22` : "none" }}>
          <input
            value={chatInput} onChange={handleChatInput} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
            placeholder={speaking ? `${aiName} is speaking — type to interrupt...` : `Ask ${aiName} anything...`}
            style={{ flex: 1, background: "none", border: "none", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", outline: "none" }}
          />
          {voiceSupported && !isDesktop && (
            <div onClick={openVoiceMode} style={{ width: 36, height: 36, borderRadius: 10, background: C.surfaceHigh, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2" strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            </div>
          )}
          <BtnPrimary onClick={() => sendChat()} disabled={loading || !chatInput.trim()} style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 11, flexShrink: 0, padding: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </BtnPrimary>
        </div>
        <div style={{ textAlign: "center", marginTop: 7, fontSize: 10, color: C.dim }}>
          Try: "open schedule" · "draft a promo" · "who's my top client?"
        </div>
      </div>
    </>
  );

  const VoiceOverlay = voiceMode ? (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#07070f", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 680, padding: "52px 28px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>{aiName}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Voice conversation</div>
        </div>
        <div onClick={closeVoiceMode} style={{ padding: "9px 22px", borderRadius: 100, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
          End & Save
        </div>
      </div>
      <div style={{ flex: 1, width: "100%", maxWidth: 680, overflowY: "auto", padding: "0 28px 12px" }}>
        {voiceSession.length === 0 && (
          <div style={{ textAlign: "center", marginTop: 60, color: "rgba(255,255,255,0.2)", fontSize: 14, lineHeight: 2 }}>
            Tap the orb to start talking<br/>
            <span style={{ fontSize: 12 }}>Conversation saves to chat when you end</span>
          </div>
        )}
        {voiceSession.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12, alignItems: "flex-end", gap: 8 }}>
            {m.role === "assistant" && <div style={{ width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>✦</div>}
            <div style={{ maxWidth: "76%", padding: "10px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : "rgba(255,255,255,0.07)", border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.1)", fontSize: 14, lineHeight: 1.6, color: "#fff" }}>{m.text}</div>
          </div>
        ))}
        {voiceLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✦</div>
            <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: 5 }}>
              {[0,1,2].map(d => <div key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent, animation: "pulse 1.2s infinite", animationDelay: `${d * 0.2}s` }} />)}
            </div>
          </div>
        )}
        <div ref={voiceChatEndRef} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 52, paddingTop: 8, flexShrink: 0 }}>
        <div
          onClick={() => { if (!voiceListening && !voiceLoading && !speaking) startVoiceListen(); }}
          style={{ position: "relative", width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center", cursor: voiceListening || voiceLoading || speaking ? "default" : "pointer" }}
        >
          {[1.7, 1.4, 1.18].map((scale, i) => {
            const c1 = voiceListening ? "#ef4444" : voiceLoading ? "#6366f1" : speaking ? "#7c3aed" : "#6366f1";
            return <div key={i} style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${c1}${["08","12","18"][i]}, transparent 70%)`, transform: `scale(${scale * (speaking ? smoothScale : 1)})`, transition: speaking ? "none" : "transform 0.3s", animation: (voiceListening || voiceLoading || speaking) ? `orbPulse ${1.5+i*0.4}s ease-in-out infinite` : "none", animationDelay: `${i * 0.2}s` }} />;
          })}
          <div style={{ width: 110, height: 110, borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
            background: voiceListening ? "radial-gradient(circle at 35% 35%,#f97316,#ef4444 50%,#dc2626)" : voiceLoading ? "radial-gradient(circle at 35% 35%,#a78bfa,#6366f1 50%,#4f46e5)" : speaking ? "radial-gradient(circle at 35% 35%,#a78bfa,#7c3aed 50%,#4f46e5)" : "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#4338ca)",
            boxShadow: `0 0 ${speaking ? 50 : 25}px ${voiceListening?"#ef444466":"#7c3aed66"},0 0 ${speaking?100:50}px ${voiceListening?"#ef444422":"#7c3aed22"},inset 0 0 30px rgba(255,255,255,0.1)`,
            animation: `blobMorph ${speaking?1.2:voiceLoading?1.8:4}s ease-in-out infinite`,
            transform: `scale(${speaking ? smoothScale : 1})`,
            transition: speaking ? "transform 0.08s linear" : "transform 0.3s, box-shadow 0.3s, background 0.4s",
            position: "relative", zIndex: 2 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "radial-gradient(circle at 30% 25%,rgba(255,255,255,0.35),transparent 60%)", animation: `orbSpinRev ${speaking?2:6}s linear infinite` }} />
          </div>
        </div>
        <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: voiceListening ? "#ef4444" : speaking ? C.accent : "rgba(255,255,255,0.4)" }}>
          {voiceLabel}
        </div>
        <div style={{ marginTop: 5, fontSize: 11, color: "rgba(255,255,255,0.18)", textAlign: "center" }}>
          {voiceSession.length > 0 ? `${Math.ceil(voiceSession.length / 2)} exchange${voiceSession.length > 2 ? "s" : ""} · tap End & Save when done` : "Tap the orb to start speaking"}
        </div>
      </div>
    </div>
  ) : null;

  if (isDesktop) {
    return (
      <>
      <div style={{ display: "flex", height: "100vh", background: C.bg, overflow: "hidden" }}>
        <div style={{ width: 272, flexShrink: 0, borderRight: `1px solid ${C.border}`, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "32px 20px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800 }}>{aiName}</div>
              <div style={{ fontSize: 11, color: C.green, fontWeight: 600, marginTop: 3 }}>● Online</div>
            </div>
            {chatHistory && chatHistory.length > 1 && (
              <div onClick={() => { setChatHistory(h => [h[0]]); localStorage.removeItem("aria_chat_history"); }} title="Clear chat" style={{ width: 32, height: 32, borderRadius: 9, background: C.surfaceHigh, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, flexShrink: 0 }}>🗑</div>
            )}
          </div>
          {orbWidgetJSX}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "20px 28px 14px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Chat with {aiName}</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>Ask anything · say "open schedule" to navigate · drafts · analytics</div>
          </div>
          {chatAreaJSX}
        </div>
      </div>
      {VoiceOverlay}
      </>
    );
  }

  return (
    <>
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: C.bg }}>
      <div style={{ padding: "52px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800 }}>{aiName}</div>
          <div style={{ fontSize: 11, color: C.green, fontWeight: 600, marginTop: 2 }}>● Online</div>
        </div>
        {chatHistory && chatHistory.length > 1 && (
          <div onClick={() => setChatHistory(h => [h[0]])} style={{ width: 34, height: 34, borderRadius: 10, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }}>🗑</div>
        )}
      </div>
      {orbWidgetJSX}
      {chatAreaJSX}
      <BottomNav active="assistant" navigate={navigate} />
    </div>
    {VoiceOverlay}
    </>
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
        style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", resize: "none" }}
      />
      {saved
        ? <div style={{ width: "100%", padding: 13, marginTop: 10, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 14, fontSize: 14, fontWeight: 600, color: C.green, textAlign: "center" }}>✓ Note saved!</div>
        : <BtnPrimary onClick={handleSave} disabled={saving} style={{ width: "100%", padding: 13, marginTop: 10 }}>{saving ? "Saving..." : "Save Note"}</BtnPrimary>
      }
    </div>
  );
}

// ── CLIENTS ────────────────────────────────────────────────────────────────────
function Clients({ navigate }) {
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

  useEffect(() => {
    const loadClients = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }
      const { data, error } = await supabase.from("clients").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: false });
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
      owner_id: session.user.id,
    }]).select();
    if (!error && data) {
      setClients(p => [{ ...data[0], totalVisits: 0, totalSpent: "$0", avgSpend: "$0", lastVisit: "N/A" }, ...p]);
    }
    setNewName(""); setNewPhone(""); setNewInstagram("");
    setAdding(false); setShowAdd(false);
  };

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const history = [
    { service: "Knotless Braids", date: "Today", price: "$220", status: "upcoming" },
    { service: "Knotless Braids", date: "Jan 28", price: "$220", status: "completed" },
    { service: "Silk Press", date: "Dec 15", price: "$120", status: "completed" },
    { service: "Knotless Braids", date: "Nov 3", price: "$200", status: "completed" },
  ];

  if (selectedClient) return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(180deg,#16103a,${C.bg})`, padding: "48px 24px 24px", textAlign: "center" }}>
        <div onClick={() => setSelectedClient(null)} style={{ position: "absolute", top: 52, left: 20, width: 38, height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </div>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: C.accent, margin: "0 auto 12px" }}>{selectedClient.avatar}</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800 }}>{selectedClient.name}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
          {selectedClient.badge && <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, background: "#f59e0b18", border: "1px solid #f59e0b33", borderRadius: 100, padding: "3px 10px" }}>{selectedClient.badge}</span>}
          <span style={{ fontSize: 11, color: C.mid, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 100, padding: "3px 10px" }}>Since {selectedClient.joined}</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "16px 20px" }}>
        {[{ label: "Visits", value: selectedClient.totalVisits }, { label: "Total spent", value: selectedClient.totalSpent }, { label: "Avg spend", value: selectedClient.avgSpend }].map((s, i) => (
          <Card key={i} style={{ padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: i === 0 ? 24 : 18, fontWeight: 800, color: i === 1 ? C.gold : C.text }}>{s.value}</div>
            <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "flex", padding: "0 20px", gap: 8, marginBottom: 20 }}>
        {["history", "notes", "contact"].map(t => (
          <div key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "10px", borderRadius: 12, background: activeTab === t ? C.accentSoft : C.surface, border: `1px solid ${activeTab === t ? C.accent : C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: activeTab === t ? C.accent : C.mid, cursor: "pointer", textTransform: "capitalize" }}>{t}</div>
        ))}
      </div>
      <div style={{ padding: "0 20px" }}>
        {activeTab === "history" && (
          <Card>
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: i < history.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: h.status === "upcoming" ? C.accent : C.green, flexShrink: 0 }} />
                <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{h.service}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{h.date}</div></div>
                <div style={{ textAlign: "right" }}><div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{h.price}</div><div style={{ fontSize: 10, color: h.status === "upcoming" ? C.accent : C.green, marginTop: 3, textTransform: "capitalize" }}>{h.status}</div></div>
              </div>
            ))}
          </Card>
        )}
        {activeTab === "notes" && <NoteTab client={selectedClient} onNoteUpdate={(note) => setSelectedClient(p => ({ ...p, note: note === "__CLEAR__" ? "" : (p.note ? p.note + "\n\n" : "") + note }))} />}
        {activeTab === "contact" && (
          <Card>
            {[["📱", "Phone", selectedClient.phone], ["📸", "Instagram", selectedClient.instagram], ["📅", "Last visit", selectedClient.lastVisit]].map(([icon, label, val], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: C.dim }}>{label}</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{val || "—"}</div></div>
              </div>
            ))}
          </Card>
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
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Clients</div>
          </div>
          <BtnPrimary onClick={() => setShowAdd(true)} style={{ padding: "9px 16px", fontSize: 13 }}>+ Add</BtnPrimary>
        </div>
        <div style={{ fontSize: 13, color: C.mid }}>{clients.length} total clients</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: isDesktop ? "grid" : "block", gridTemplateColumns: isDesktop ? "340px 1fr" : undefined, gap: isDesktop ? 24 : undefined, alignItems: "start" }}>
        <div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.dim} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." style={{ background: "none", border: "none", fontSize: 13, color: C.text, fontFamily: "'Red Hat Display',sans-serif", width: "100%" }} />
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: C.mid }}>Loading clients...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: C.mid }}>No clients found</div>
        ) : filtered.map((c) => (
          <Card key={c.id} style={{ padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => { setSelectedClient(c); setActiveTab("history"); }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: C.accentSoft, border: `1px solid ${C.accentSoft}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.accent, flexShrink: 0 }}>{c.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</span>
                {c.badge && <span style={{ fontSize: 10, fontWeight: 700, color: C.gold, background: "#f59e0b18", border: "1px solid #f59e0b33", borderRadius: 100, padding: "2px 7px" }}>{c.badge}</span>}
              </div>
              <div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{c.totalVisits} visits · Last: {c.lastVisit}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{c.totalSpent}</div>
          </Card>
        ))}
        </div>{/* end col 1 */}
        {isDesktop && (
          <div style={{ position: "sticky", top: 80 }}>
            {selectedClient ? (
              <Card style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(180deg,#16103a,#0d0d1a)", padding: "28px 24px 20px", textAlign: "center" }}>
                  <div style={{ width: 70, height: 70, borderRadius: 22, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: C.accent, margin: "0 auto 10px" }}>{selectedClient.avatar}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 800 }}>{selectedClient.name}</div>
                  <div style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>Since {selectedClient.joined}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderBottom: `1px solid ${C.border}` }}>
                  {[{ label: "Visits", value: selectedClient.totalVisits }, { label: "Spent", value: selectedClient.totalSpent }, { label: "Avg", value: selectedClient.avgSpend }].map((s, i) => (
                    <div key={i} style={{ padding: "14px 10px", textAlign: "center", borderRight: i < 2 ? `1px solid ${C.border}` : "none" }}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 800, color: i === 1 ? C.gold : C.text }}>{s.value}</div>
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
                      {[["📱", "Phone", selectedClient.phone], ["📸", "Instagram", selectedClient.instagram], ["📅", "Last visit", selectedClient.lastVisit]].map(([icon, label, val], i) => (
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
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Add New Client</div>
            <input placeholder="Full name *" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <input placeholder="Phone number" value={newPhone} onChange={e => setNewPhone(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <input placeholder="Instagram handle" value={newInstagram} onChange={e => setNewInstagram(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 20 }} />
            <BtnPrimary disabled={!newName || adding} onClick={addClient} style={{ width: "100%", padding: 14 }}>{adding ? "Adding..." : "Add Client"}</BtnPrimary>
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
  const [form, setForm] = useState({ name: "", price: "", duration: "", desc: "", icon: "✨", active: true });
  const [userId, setUserId] = useState(null);

  const ICONS = ["✨","💫","🌟","💨","🌀","👑","💅","🪮","💆","🎨","🔥","💎","🌸","✂️","💜"];
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

  const resetForm = () => setForm({ name: "", price: "", duration: "", desc: "", icon: "✨", active: true });

  const openAdd = () => { resetForm(); setEditingId(null); setShowAdd(true); };
  const openEdit = (s) => { setForm({ name: s.name, price: String(s.price), duration: s.duration, desc: s.description || "", icon: s.icon || "✨", active: s.active !== false }); setEditingId(s.id); setShowAdd(true); };

  const saveService = async () => {
    if (!form.name.trim() || !form.price || !form.duration) return;
    setSaving(true);
    if (editingId) {
      const { data } = await supabase.from("services").update({ name: form.name.trim(), price: parseFloat(form.price), duration: form.duration, description: form.desc.trim(), icon: form.icon, active: form.active }).eq("id", editingId).select().single();
      if (data) setServices(p => p.map(s => s.id === editingId ? data : s));
    } else {
      const { data } = await supabase.from("services").insert({ owner_id: userId, name: form.name.trim(), price: parseFloat(form.price), duration: form.duration, description: form.desc.trim(), icon: form.icon, active: form.active }).select().single();
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
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Services</div>
          </div>
          <BtnPrimary onClick={openAdd} style={{ padding: "9px 18px", fontSize: 13 }}>+ Add</BtnPrimary>
        </div>
        <div style={{ fontSize: 13, color: C.dim, marginTop: 6, paddingLeft: 44 }}>These appear on your booking page</div>
      </div>

      <div style={{ padding: "0 20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: C.dim, fontSize: 14 }}>Loading services...</div>
        ) : services.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✂️</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>No services yet</div>
            <div style={{ fontSize: 13, color: C.dim, marginBottom: 24 }}>Add your services so clients can book from your page</div>
            <BtnPrimary onClick={openAdd} style={{ padding: "12px 28px" }}>Add Your First Service</BtnPrimary>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, color: C.dim, fontWeight: 600, marginBottom: 12 }}>{services.filter(s => s.active !== false).length} active · {services.filter(s => s.active === false).length} hidden</div>
            {services.map((s, i) => (
              <Card key={s.id} style={{ padding: "16px", marginBottom: 10, opacity: s.active === false ? 0.5 : 1, transition: "opacity 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg,${C.accentDark}22,${C.accent}22)`, border: `1px solid ${C.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon || "✨"}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{s.name}</div>
                    {s.description && <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.description}</div>}
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>${s.price}</span>
                      <span style={{ fontSize: 13, color: C.mid }}>· {s.duration}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <div onClick={() => toggleActive(s)} style={{ width: 32, height: 32, borderRadius: 9, background: s.active !== false ? C.accentSoft : C.surfaceHigh, border: `1px solid ${s.active !== false ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13 }}>
                      {s.active !== false ? "👁" : "🚫"}
                    </div>
                    <div onClick={() => openEdit(s)} style={{ width: 32, height: 32, borderRadius: 9, background: C.surfaceHigh, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13 }}>✏️</div>
                    <div onClick={() => deleteService(s.id)} style={{ width: 32, height: 32, borderRadius: 9, background: "#f43f5e11", border: "1px solid #f43f5e22", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13 }}>🗑️</div>
                  </div>
                </div>
              </Card>
            ))}
            <div style={{ marginTop: 8, padding: "14px 16px", borderRadius: 14, background: C.accentSoft, border: `1px solid ${C.accent}33`, fontSize: 13, color: C.mid, lineHeight: 1.6 }}>
              💡 Changes go live on your booking page instantly
            </div>
          </>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "24px 20px 40px", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 800, marginBottom: 20 }}>{editingId ? "Edit Service" : "New Service"}</div>

            {/* Icon picker */}
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Icon</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {ICONS.map(ic => (
                <div key={ic} onClick={() => setForm(p => ({ ...p, icon: ic }))} style={{ width: 38, height: 38, borderRadius: 10, background: form.icon === ic ? C.accentSoft : C.surfaceHigh, border: `1px solid ${form.icon === ic ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer" }}>{ic}</div>
              ))}
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Service Name *</div>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Knotless Braids" style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 14 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Price ($) *</div>
                <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="120" style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Duration *</div>
                <select value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: form.duration ? C.text : C.dim, fontFamily: "'Red Hat Display',sans-serif" }}>
                  <option value="">Select</option>
                  {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Description (optional)</div>
            <input value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} placeholder="Short description clients will see" style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 14 }} />

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
                <input value={depositAmount} onChange={e => setDepositAmount(e.target.value)} style={{ flex: 1, background: "none", border: "none", fontSize: 20, fontWeight: 700, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }} />
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
        {noShowFee && <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}><div style={{ display: "flex", alignItems: "center", background: C.surfaceHigh, border: `1px solid ${C.borderHigh}`, borderRadius: 12, padding: "10px 14px", gap: 8 }}><span style={{ fontSize: 16, color: C.mid }}>$</span><input value={noShowAmount} onChange={e => setNoShowAmount(e.target.value)} style={{ flex: 1, background: "none", border: "none", fontSize: 18, fontWeight: 700, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }} /></div></div>}
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
          {appointments.map((appt, i) => (
            <div key={appt.id} onClick={() => setSelectedInvoice(appt)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: i < appointments.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: `${statusColor(appt.status)}18`, border: `1px solid ${statusColor(appt.status)}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{appt.status === "confirmed" || appt.status === "completed" ? "✓" : appt.status === "pending" ? "⏳" : "!"}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{appt.client_name}</div><div style={{ fontSize: 11, color: C.mid, marginTop: 2 }}>{appt.service} · {appt.day || appt.time}</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{appt.price || "—"}</div><div style={{ fontSize: 10, color: statusColor(appt.status), marginTop: 3, fontWeight: 600, textTransform: "uppercase" }}>{statusLabel(appt.status)}</div></div>
            </div>
          ))}
        </Card>
      )}
    </>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Payments</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ background: "linear-gradient(135deg,#16103a,#1a0f3a)", border: `1px solid ${C.accentSoft}`, borderRadius: 22, padding: 22, marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>TOTAL REVENUE</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 800, marginBottom: 8 }}>${totalRevenue.toLocaleString()}</div>
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
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setSelectedInvoice(null)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "24px 20px 40px" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{selectedInvoice.client_name}</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>{selectedInvoice.service}</div>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              {[["Amount", selectedInvoice.price || "—"], ["Status", statusLabel(selectedInvoice.status)], ["Date", selectedInvoice.day || selectedInvoice.time || "—"], ["Duration", selectedInvoice.duration || "—"]].map(([k, v]) => (
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
function Settings({ navigate }) {
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
  const [aiName, setAiName] = useState("Aria");
  const [aiNameSaved, setAiNameSaved] = useState(false);
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("business_profiles").select("ai_name").eq("user_id", session.user.id).single();
      if (data?.ai_name) setAiName(data.ai_name);
    };
    load();
  }, []);

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
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Settings</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: isDesktop ? "grid" : "block", gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined, gap: isDesktop ? 24 : undefined, alignItems: "start" }}>
        <div>
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
            style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 10 }}
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
            {tone === "friendly" ? '"Hey girl! 💕 I have a 2pm open this Saturday, does that work?"' : tone === "professional" ? '"Good afternoon. I have availability at 2:00 PM this Saturday."' : '"Yo! Saturday at 2 works? Let me know 🔥"'}
          </div>
        </Card>
        </div>{/* end col 1 */}
        <div>{/* col 2 */}
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
            <input type="range" min="1" max="12" value={maxDaily} onChange={e => setMaxDaily(e.target.value)} style={{ width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Accept Sunday bookings</div>
            <Toggle on={sunday} onToggle={() => setSunday(p => !p)} />
          </div>
        </Card>
        <SectionLabel>Payment Setup</SectionLabel>
        <Card style={{ marginBottom: 8 }}>
          {[
            { icon: "💳", label: "Stripe", sub: "Accept card payments from clients", connected: true },
            { icon: "🅿️", label: "PayPal", sub: "Your PayPal email or link", connected: false, placeholder: "PayPal email or paypal.me/link" },
            { icon: "💵", label: "Cash App", sub: "Your $Cashtag", connected: false, placeholder: "e.g. $YourCashtag" },
            { icon: "💱", label: "Zelle", sub: "Your Zelle phone or email", connected: false, placeholder: "Phone number or email" },
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
                    style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 10 }}
                  />
                  <BtnPrimary onClick={() => setPaymentInputOpen(prev => ({ ...prev, [p.label]: false }))} style={{ width: "100%", padding: 11, fontSize: 13 }}>Save</BtnPrimary>
                </div>
              )}
            </div>
          ))}
        </Card>
        <SectionLabel>Account</SectionLabel>
        <Card>
          {[
            { icon: "✂️", label: "Services", sub: "Manage your services & prices", screen: "services" },
            { icon: "👤", label: "Business Profile", sub: "Edit your business info", screen: "profile" },
            { icon: "🔗", label: "Connected Accounts", sub: "WhatsApp, Instagram, Google", screen: "connections" },
            { icon: "💳", label: "Subscription", sub: "Pro Plan · $29/mo", screen: "subscription" },
          ].map(({ icon, label, sub, screen }, i) => (
            <div key={i} onClick={() => navigate(screen)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{sub}</div></div>
              <span style={{ fontSize: 12, color: C.mid }}>›</span>
            </div>
          ))}
        </Card>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <span onClick={async () => { await supabase.auth.signOut(); navigate("login"); }} style={{ fontSize: 13, color: C.red, fontWeight: 600, cursor: "pointer" }}>Sign Out</span>
        </div>
        </div>{/* end col 2 */}
        </div>{/* end grid */}
      </div>
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

  const reviews = [
    { name: "Jasmine R.", rating: 5, text: "Best braider in Atlanta! My hair lasted 8 weeks 😍", date: "2 days ago", replied: true },
    { name: "Tasha M.", rating: 5, text: "Always on time and my silk press was PERFECT", date: "1 week ago", replied: false },
  ];

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      const { data } = await supabase.from("discount_codes").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: false });
      setCodes(data || []);
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
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Loyalty</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: isDesktop ? "grid" : "block", gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined, gap: isDesktop ? 24 : undefined, alignItems: "start" }}>
        <div>{/* col 1: codes */}
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 }}>
          {[{ label: "Active codes", value: String(codes.filter(c => c.active).length), color: C.accent }, { label: "Times redeemed", value: String(codes.reduce((s, c) => s + (c.times_used || 0), 0)), color: C.gold }].map((s, i) => (
            <Card key={i} style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
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
              style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 10, letterSpacing: 1 }}
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
                style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }}
              />
              <input
                value={newCode.limit}
                onChange={e => setNewCode(p => ({ ...p, limit: e.target.value.replace(/\D/g, "") }))}
                placeholder="Usage limit (optional)"
                style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }}
              />
            </div>
            <div onClick={() => setNewCode(p => ({ ...p, firstOnly: !p.firstOnly }))} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", cursor: "pointer", marginBottom: 14 }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: newCode.firstOnly ? C.accent : C.surfaceHigh, border: `1px solid ${newCode.firstOnly ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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
            <div style={{ fontSize: 32, marginBottom: 10 }}>🎟️</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>No discount codes yet</div>
            <div style={{ fontSize: 13, color: C.mid }}>Create your first code — clients can enter it on the booking page before paying.</div>
          </Card>
        ) : (
          codes.map(c => (
            <Card key={c.id} style={{ padding: 16, marginBottom: 10, borderColor: c.active ? C.border : C.borderHigh, opacity: c.active ? 1 : 0.5 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ background: C.accentSoft, border: `1px solid ${C.accent}33`, borderRadius: 10, padding: "5px 12px", fontSize: 13, fontWeight: 800, color: C.accent, letterSpacing: 1 }}>{c.code}</div>
                  {c.first_time_only && <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, background: `${C.gold}18`, borderRadius: 6, padding: "3px 7px" }}>1ST ONLY</div>}
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
          {[["🎂","Birthday message","Sent on their birthday",birthdayOn,setBirthdayOn],["🔁","Rebook reminder","After 21 days with no appointment",rebookOn,setRebookOn],["⭐","Review request","After every completed appointment",reviewOn,setReviewOn],["💔","Win-back campaign","Re-engage clients gone 45+ days",winbackOn,setWinbackOn]].map(([icon,label,sub,val,set],i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontSize:20 }}>{icon}</span>
              <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:600 }}>{label}</div><div style={{ fontSize:12,color:C.mid,marginTop:2 }}>{sub}</div></div>
              <Toggle on={val} onToggle={()=>set(p=>!p)} />
            </div>
          ))}
        </Card>

        <SectionLabel>Recent Reviews</SectionLabel>
        {reviews.map((r,i) => (
          <Card key={i} style={{ padding:16,marginBottom:10 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ fontSize:14,fontWeight:600 }}>{r.name}</span>
              <span style={{ fontSize:11,color:C.dim }}>{r.date}</span>
            </div>
            <div style={{ fontSize:16,marginBottom:8 }}>{"⭐".repeat(r.rating)}</div>
            <div style={{ fontSize:13,color:C.mid,lineHeight:1.5,marginBottom:r.replied?10:0 }}>"{r.text}"</div>
            {r.replied
              ? <div style={{ background:"#10b98111",border:"1px solid #10b98122",borderRadius:10,padding:"8px 12px",fontSize:12,color:"#6ee7b7" }}>✓ AI replied</div>
              : <BtnPrimary style={{ width:"100%",marginTop:10,padding:10,fontSize:13 }}>Reply with AI</BtnPrimary>}
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
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(50);
      setNotifs(data || []);
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

  const iconFor = (type) => ({ booking: "📅", payment: "💰", ai: "✦", alert: "⚠️", review: "⭐" })[type] || "🔔";
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
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Notifications</div>
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
                {!n.read && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: typeColor(n.type), borderRadius: "3px 0 0 3px" }} />}
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
  const todayAppts = appts.filter(a => a.day === "Today");
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

  const insights = topServices.length > 0
    ? [`${topServices[0]?.name} is your top earner`, `${confirmed.length} confirmed appointments total`, `$${Math.round(totalRev / Math.max(confirmed.length, 1))} average per appointment`, todayRev > 0 ? `$${todayRev} earned today` : "Add more appointments to see trends"]
    : ["Book your first clients to start seeing analytics", "Share your booking link to get started", "Track revenue, services, and client trends here", "Everything updates automatically as you get bookings"];

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Analytics</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: C.dim }}>Loading analytics...</div>
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
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 800, marginBottom: 4 }}>{displayRev}</div>
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
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: C.accent }}>{s.value}</div>
                    </Card>
                  ))}
                </div>
                <SectionLabel>{barLabel}</SectionLabel>
                <Card style={{ padding: 20, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100, marginBottom: 12 }}>
                    {bars.map((b, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                          <div style={{ width: "100%", borderRadius: "6px 6px 0 0", background: b.revenue > 0 ? `linear-gradient(180deg,${C.accent},${C.accentDark})` : C.border, height: `${(b.revenue / maxBar) * 100}%`, minHeight: b.revenue > 0 ? 4 : 2, transition: "height 0.4s ease" }} />
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
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{"📅💰👥⭐".split("")[i]}</span>
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
  const [channel, setChannel] = useState(["whatsapp"]);
  const [sent, setSent] = useState(false);

  const past = [
    { title: "Valentine's Special 💕", sent: "Feb 10", reach: 47, bookings: 12, revenue: "$1,440" },
    { title: "Slow Monday Deal", sent: "Jan 27", reach: 31, bookings: 7, revenue: "$630" },
    { title: "New Year New Hair 🎉", sent: "Jan 1", reach: 52, bookings: 18, revenue: "$2,160" },
  ];

  if (sent) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Promo sent!</div>
      <div style={{ fontSize: 14, color: C.mid, marginBottom: 24 }}>Sent to 47 clients via WhatsApp & Instagram</div>
      <BtnPrimary onClick={() => { setSent(false); setCreating(false); setPromoTitle(""); setPromoMsg(""); }} style={{ padding: "13px 28px" }}>Back to Promotions</BtnPrimary>
    </div>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {creating ? <BackBtn onBack={() => setCreating(false)} /> : <BackBtn onBack={() => navigate("home")} />}
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>{creating ? "New Promotion" : "Promotions"}</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {!creating ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 }}>
              {[{ label: "Total promos sent", value: "8", color: C.accent }, { label: "Revenue from promos", value: "$4,230", color: C.gold }].map((s, i) => (
                <Card key={i} style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{s.label}</div>
                </Card>
              ))}
            </div>
            <div style={{ background: `${C.accentDark}18`, border: `1px solid ${C.accent}22`, borderRadius: 16, padding: 16, marginTop: 20, marginBottom: 4 }}>
              <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 8 }}>✦ AI SUGGESTION</div>
              <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.6, marginBottom: 12 }}>You have 3 open slots this Friday. Want me to send a flash promo to your last 30 clients?</div>
              <div style={{ display: "flex", gap: 8 }}>
                <BtnPrimary onClick={() => setCreating(true)} style={{ flex: 1, padding: 11, fontSize: 13 }}>Yes, create it</BtnPrimary>
                <button onClick={() => {}} style={{ flex: 1, padding: 11, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.mid, cursor: "pointer", fontFamily: "'Red Hat Display',sans-serif", fontWeight: 600 }}>Not now</button>
              </div>
            </div>
            <SectionLabel>Past Promotions</SectionLabel>
            {past.map((p, i) => (
              <Card key={i} style={{ padding: 16, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: C.dim }}>Sent {p.sent}</div>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  {[["Reached", p.reach, C.text], ["Booked", p.bookings, C.accent], ["Revenue", p.revenue, C.gold]].map(([l, v, color]) => (
                    <div key={l}><div style={{ fontSize: 11, color: C.dim }}>{l}</div><div style={{ fontSize: 16, fontWeight: 700, color }}>{v}</div></div>
                  ))}
                </div>
              </Card>
            ))}
            <BtnPrimary onClick={() => setCreating(true)} style={{ width: "100%", padding: 16, marginTop: 8 }}>+ Create New Promo</BtnPrimary>
          </>
        ) : (
          <>
            <input placeholder="Promo title (e.g. Friday Flash Deal 🔥)" value={promoTitle} onChange={e => setPromoTitle(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
              <textarea placeholder="Write your message..." value={promoMsg} onChange={e => setPromoMsg(e.target.value)} rows={4} style={{ width: "100%", background: "none", border: "none", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", resize: "none" }} />
            </div>
            <button onClick={() => setPromoMsg("Hey gorgeous! 💕 I have a few slots open this Friday and I'm running a special — book any service and get 15% off. Limited spots, first come first served! Book here 👉 [your link]")} style={{ width: "100%", padding: 12, background: C.accentSoft, border: `1px solid ${C.accent}44`, borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.accent, cursor: "pointer", fontFamily: "'Red Hat Display',sans-serif", marginBottom: 20 }}>✦ Write with AI</button>
            <SectionLabel>Send to</SectionLabel>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[{ id: "all", label: "All (47)" }, { id: "regulars", label: "Regulars (18)" }, { id: "inactive", label: "Inactive (12)" }].map(a => (
                <div key={a.id} onClick={() => setAudience(a.id)} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, background: audience === a.id ? C.accentSoft : C.surface, border: `1px solid ${audience === a.id ? C.accent : C.border}`, textAlign: "center", fontSize: 11, fontWeight: 600, color: audience === a.id ? C.accent : C.mid, cursor: "pointer" }}>{a.label}</div>
              ))}
            </div>
            <SectionLabel>Send via</SectionLabel>
            <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
              {[{ id: "whatsapp", label: "💬 WhatsApp" }, { id: "instagram", label: "📸 Instagram" }].map(ch => (
                <div key={ch.id} onClick={() => setChannel(p => p.includes(ch.id) ? p.filter(x => x !== ch.id) : [...p, ch.id])} style={{ flex: 1, padding: "12px", borderRadius: 12, background: channel.includes(ch.id) ? C.accentSoft : C.surface, border: `1px solid ${channel.includes(ch.id) ? C.accent : C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: channel.includes(ch.id) ? C.accent : C.mid, cursor: "pointer" }}>{ch.label}</div>
              ))}
            </div>
            <BtnPrimary disabled={!promoTitle || !promoMsg} onClick={() => setSent(true)} style={{ width: "100%", padding: 16 }}>Send Promo 🚀</BtnPrimary>
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
        // Get owner email from business profile
        const { data: ownerProf } = await supabase.from("business_profiles").select("biz_name").eq("user_id", uid).single();
        const { data: ownerAuth } = await supabase.from("profiles").select("email").eq("id", uid).single();
        const ownerEmail = ownerAuth?.email || (ownerIdFromUrl ? null : null);

        // Email via proxy
        await fetch("https://pocketflow-proxy-production.up.railway.app/notify-booking", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            owner_email: ownerEmail || "omarnassan590@gmail.com",
            client_name: name,
            service: selectedServices.map(s => s.name).join(", "),
            date: selectedDate,
            time: selectedTime,
            phone,
            deposit: depositStr,
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
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>You're booked!</div>
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
            const details = encodeURIComponent(`Appointment booked via Pocketflow\nDeposit paid: ${depositStr}\nContact: ${phone}`);
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

      <div style={{ fontSize: 12, color: C.dim }}>Powered by <span style={{ color: C.accent, fontWeight: 700 }}>Pocketflow</span></div>
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
        <div style={{ width: 72, height: 72, borderRadius: 22, background: "linear-gradient(135deg," + C.accentDark + "," + C.accent + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 14px", boxShadow: "0 0 40px " + C.accentDark + "55" }}>✦</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>{bizName}</div>
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
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>What are you coming in for?</div>
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
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>When works for you?</div>
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
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Your details</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>Almost there — just need a few details</div>
            <Card style={{ padding: 16, marginBottom: 20 }}>
              {[["Services", selectedServices.map(s => s.name).join(", ")], ["Date", selectedDate], ["Time", selectedTime], ["Total", "$" + totalPrice + "+"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: k !== "Total" ? "1px solid " + C.border : "none", gap: 12 }}>
                  <span style={{ fontSize: 13, color: C.mid, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </Card>
            <input placeholder="Your full name *" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <input placeholder="Phone number *" type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <input placeholder="Instagram handle (optional)" value={instagram} onChange={e => setInstagram(e.target.value)} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <textarea placeholder="Notes — hair length, allergies, special requests..." value={note} onChange={e => setNote(e.target.value)} rows={3} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", resize: "none" }} />
          </div>
        )}

        {step === 3 && (
          <div className="fade-in">
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Pay deposit</div>
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
                <input placeholder="Name on card" value={cardName} onChange={e => setCardName(e.target.value)} style={{ width: "100%", background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'Red Hat Display',sans-serif", fontWeight: 600 }} />
              </div>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid " + C.border }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>CARD NUMBER</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} style={{ flex: 1, background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'Red Hat Display',sans-serif", fontWeight: 600, letterSpacing: 2 }} />
                  <span style={{ fontSize: 20 }}>💳</span>
                </div>
              </div>
              <div style={{ display: "flex", padding: "12px 16px", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>EXPIRY</div>
                  <input placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} style={{ width: "100%", background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'Red Hat Display',sans-serif", fontWeight: 600 }} />
                </div>
                <div style={{ width: 1, background: C.border }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>CVC</div>
                  <input placeholder="123" value={cardCvc} onChange={e => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 3))} style={{ width: "100%", background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'Red Hat Display',sans-serif", fontWeight: 600 }} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.dim, marginBottom: 8 }}>
              <span>🔒</span><span>Payments secured by Stripe. Your card info is never stored.</span>
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
          {paying ? "Processing payment..." : step === 0 ? "Continue →" : step === 1 ? "Enter Your Details →" : step === 2 ? "Continue to Payment →" : "Pay " + depositStr + " & Confirm 🔒"}
        </BtnPrimary>
      </div>
    </div>
  );
}



// ── STAFF ──────────────────────────────────────────────────────────────────────
function Staff({ navigate }) {
  const isDesktop = useDesktop();
  const [view, setView] = useState("list"); // "list" | "member" | "groupchat"
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [staff, setStaff] = useState([]);
  const [aiName, setAiName] = useState("Aria");
  const [bizContext, setBizContext] = useState("");

  // Group chat state
  const [groupMessages, setGroupMessages] = useState(() => {
    try { const s = localStorage.getItem("staff_group_chat"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [groupInput, setGroupInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [ownerName, setOwnerName] = useState("You");

  const statusColor = s => s === "active" ? C.green : C.yellow;

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = session.user.id;
      const [profRes, apptRes, svcRes] = await Promise.all([
        supabase.from("business_profiles").select("ai_name,biz_name,location").eq("user_id", uid).single(),
        supabase.from("appointments").select("client_name,service,time,day,status,price").eq("owner_id", uid).order("created_at",{ascending:false}).limit(20),
        supabase.from("services").select("name,price,duration").eq("owner_id", uid).eq("active",true).limit(10),
      ]);
      const name = profRes.data?.ai_name || "Aria";
      const biz = profRes.data?.biz_name || "your business";
      setAiName(name);
      setOwnerName(profRes.data?.biz_name ? biz.split(" ")[0] : "You");
      const allAppts = apptRes.data || [];
      const todayAppts = allAppts.filter(a => a.day === "Today");
      const services = (svcRes.data || []).map(s => `${s.name} ($${s.price})`).join(", ");
      setBizContext(`Business: ${biz}\nServices: ${services}\nToday's appointments: ${todayAppts.map(a=>`${a.client_name} (${a.service} at ${a.time})`).join("; ") || "none"}\nTotal appointments on record: ${allAppts.length}`);
    };
    load();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupMessages, aiTyping]);

  useEffect(() => {
    try { localStorage.setItem("staff_group_chat", JSON.stringify(groupMessages.slice(-100))); } catch {}
  }, [groupMessages]);

  const sendGroupMessage = async () => {
    const text = groupInput.trim();
    if (!text) return;
    setGroupInput("");
    const msg = { id: Date.now(), from: "owner", sender: ownerName, text, time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) };
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
              { role: "system", content: `You are ${aiName}, an AI assistant in a beauty business staff group chat. Be concise, helpful, and friendly. Business context:\n${bizContext}\nAnswer questions from the staff about the business, schedule, clients, or anything they need. Keep replies short (2-3 sentences max). No navigation commands here.` },
              ...groupMessages.slice(-10).map(m => ({ role: m.from === "ai" ? "assistant" : "user", content: m.text })),
              { role: "user", content: question || text }
            ],
          }),
        });
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content || "Got it!";
        setAiTyping(false);
        setGroupMessages(p => [...p, { id: Date.now()+1, from: "ai", sender: aiName, text: reply, time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) }]);
      } catch {
        setAiTyping(false);
        setGroupMessages(p => [...p, { id: Date.now()+1, from: "ai", sender: aiName, text: "Connection issue, try again.", time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) }]);
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
            const isOwner = m.from === "owner";
            const isAI = m.from === "ai";
            return (
              <div key={m.id || i} style={{ marginBottom:14 }}>
                {!isOwner && <div style={{ fontSize:11, color:isAI?C.accent:C.mid, fontWeight:700, marginBottom:4, marginLeft:2 }}>{m.sender}</div>}
                <div style={{ display:"flex", justifyContent:isOwner?"flex-end":"flex-start" }}>
                  {isAI && <div style={{ width:28, height:28, borderRadius:9, background:`linear-gradient(135deg,${C.accentDark},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, flexShrink:0, marginRight:8, alignSelf:"flex-end" }}>✦</div>}
                  <div style={{ maxWidth:"78%", padding:"10px 14px", borderRadius:isOwner?"18px 18px 4px 18px":"18px 18px 18px 4px", background:isOwner?`linear-gradient(135deg,${C.accentDark},${C.accent})`:isAI?C.surfaceHigh:C.surface, border:isOwner?"none":`1px solid ${isAI?C.accent+"33":C.border}`, fontSize:14, lineHeight:1.55, color:isOwner?"#fff":C.text }}>
                    {m.text}
                  </div>
                </div>
                <div style={{ fontSize:10, color:C.dim, marginTop:4, textAlign:isOwner?"right":"left" }}>{m.time}</div>
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
            <input
              value={groupInput}
              onChange={e => setGroupInput(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter") sendGroupMessage(); }}
              placeholder={`Message the team or @${aiName}...`}
              style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'Red Hat Display',sans-serif" }}
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
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Staff</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <div onClick={() => setView("groupchat")} style={{ padding:"9px 14px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              👥 <span>Group Chat</span>
              {groupMessages.length > 0 && <div style={{ width:7, height:7, borderRadius:"50%", background:C.accent }} />}
            </div>
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
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
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
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 3 }}>{s.rating} ⭐</div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, padding: "24px 20px 40px" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Add Staff Member</div>
            <input placeholder="Full name" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <input placeholder="Role (e.g. Braider, Stylist)" value={newRole} onChange={e => setNewRole(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <input placeholder="Phone number" value={newPhone} onChange={e => setNewPhone(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 20 }} />
            <BtnPrimary disabled={!newName || !newRole} onClick={() => { setStaff(p => [...p, { id: Date.now(), name: newName, role: newRole, avatar: newName.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(), phone: newPhone, status: "active", appts: 0, revenue: "$0", rating: 5.0, services: [] }]); setNewName(""); setNewRole(""); setNewPhone(""); setShowAdd(false); }} style={{ width: "100%", padding: 14 }}>Add Staff Member</BtnPrimary>
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

  const notify = (id) => {
    setWaitlist(p => p.map(w => w.id === id ? { ...w, notified: true } : w));
    setWaitlist(p => p.map(w => w.id === id ? { ...w, notified: true } : w));
  };

  const remove = (id) => setWaitlist(p => p.filter(w => w.id !== id));

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BackBtn onBack={() => navigate("home")} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Waitlist</div>
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
                  <button onClick={() => remove(w.id)} style={{ width: 40, height: 40, background: "#f43f5e11", border: "1px solid #f43f5e22", borderRadius: 12, fontSize: 16, color: C.red, cursor: "pointer", flexShrink: 0, fontFamily: "'Red Hat Display',sans-serif" }}>×</button>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>

      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 480, padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Add to Waitlist</div>
            <input placeholder="Client name" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <input placeholder="Service requested" value={newService} onChange={e => setNewService(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 12 }} />
            <input placeholder="Preferred date (e.g. This weekend)" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", marginBottom: 20 }} />
            <BtnPrimary disabled={!newName || !newService} onClick={() => { setWaitlist(p => [...p, { id: Date.now(), name: newName, service: newService, requestedDate: newDate || "Flexible", addedTime: "Just now", avatar: newName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(), phone: "", notified: false }]); setNewName(""); setNewService(""); setNewDate(""); setShowAdd(false); }} style={{ width: "100%", padding: 14 }}>Add to Waitlist</BtnPrimary>
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
      } else {
        // prefill from signup metadata
        setBizName(session.user.user_metadata?.business_name || "");
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    await supabase.from("business_profiles").upsert({ user_id: userId, biz_name: bizName, location, phone, bio }, { onConflict: "user_id" });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("settings")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Business Profile</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {loading ? <div style={{ textAlign: "center", padding: 40, color: C.mid }}>Loading...</div> : <>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 80, height: 80, borderRadius: 24, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 12px" }}>✦</div>
          </div>
          <SectionLabel>Business Info</SectionLabel>
          <Card style={{ padding: 16, marginBottom: 16 }}>
            {[["Business name", bizName, setBizName], ["Location", location, setLocation], ["Phone number", phone, setPhone]].map(([label, val, set], i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                <input value={val} onChange={e => { set(e.target.value); setSaved(false); }} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif" }} />
              </div>
            ))}
          </Card>
          <SectionLabel>Bio</SectionLabel>
          <textarea value={bio} onChange={e => { setBio(e.target.value); setSaved(false); }} rows={3} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, fontSize: 14, color: C.text, fontFamily: "'Red Hat Display',sans-serif", resize: "none", marginBottom: 20 }} />
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
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Connected Accounts</div>
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
              <button onClick={disconnectGoogle} style={{ padding: "7px 14px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 12, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'Red Hat Display',sans-serif" }}>
                Disconnect
              </button>
            ) : (
              <button onClick={connectGoogle} disabled={googleLoading} style={{ padding: "7px 14px", background: "linear-gradient(135deg,#4285F4,#34A853)", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'Red Hat Display',sans-serif", opacity: googleLoading ? 0.7 : 1 }}>
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
            { icon: "💬", label: "WhatsApp Business", sub: "Auto-reply to client messages", color: "#25D366" },
            { icon: "📸", label: "Instagram DMs", sub: "Reply to DMs automatically", color: "#E1306C" },
            { icon: "👥", label: "Facebook Messenger", sub: "Handle Facebook inquiries", color: "#1877F2" },
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
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Subscription</div>
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
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{currentPlan?.name || plan} Plan</div>
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
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>No active plan</div>
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
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: isCurrent ? p.color : C.text }}>${p.price}</span>
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
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Booking Link</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ textAlign: "center", padding: "20px 0 28px" }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>🔗</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Your booking page is live</div>
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
        <div style={{ marginTop: 20, background: C.accentSoft, border: `1px solid ${C.accent}22`, borderRadius: 16, padding: 14, fontSize: 13, color: C.mid, lineHeight: 1.7 }}>✦ Every business on Pocketflow gets their own unique link. When clients book through yours, appointments go straight to your dashboard.</div>
      </div>
      <BottomNav active="home" navigate={navigate} />
    </div>
  );
}

// ── SIDEBAR (desktop only) ─────────────────────────────────────────────────────
function Sidebar({ active, navigate }) {
  const [bizName, setBizName] = useState("My Business");
  const [initials, setInitials] = useState("MB");

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("business_profiles").select("biz_name").eq("user_id", session.user.id).single();
      const name = data?.biz_name || session.user.user_metadata?.business_name || "My Business";
      setBizName(name);
      setInitials(name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase());
    };
    load();
  }, []);
  const mainNav = [
    { id: "home", icon: "⌂", label: "Home" },
    { id: "schedule", icon: "◫", label: "Schedule" },
    { id: "inbox", icon: "◻", label: "Inbox" },
    { id: "clients", icon: "◯", label: "Clients" },
  ];
  const secondaryNav = [
    { id: "services", icon: "✂️", label: "Services" },
    { id: "payments", icon: "💳", label: "Payments" },
    { id: "analytics", icon: "📊", label: "Analytics" },
    { id: "promotions", icon: "📣", label: "Promotions" },
    { id: "loyalty", icon: "🎁", label: "Loyalty" },
    { id: "staff", icon: "👥", label: "Staff" },
    { id: "waitlist", icon: "⏳", label: "Waitlist" },
  ];

  return (
    <div style={{ width: 240, background: C.surface, borderRight: `1px solid ${C.border}`, height: "100vh", position: "fixed", left: 0, top: 0, display: "flex", flexDirection: "column", padding: "24px 0", zIndex: 100 }}>
      {/* Logo */}
      <div style={{ padding: "0 20px 28px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✦</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 800, color: C.text }}>Pocketflow</div>
            <div style={{ fontSize: 10, color: C.mid }}>{bizName}</div>
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

        <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "0 8px", marginBottom: 8, marginTop: 20 }}>Manage</div>
        {secondaryNav.map(item => (
          <div key={item.id} onClick={() => navigate(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, background: active === item.id ? C.accentSoft : "transparent", border: `1px solid ${active === item.id ? C.accent + "33" : "transparent"}`, cursor: "pointer", marginBottom: 4, transition: "all 0.2s" }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <span style={{ fontSize: 14, fontWeight: active === item.id ? 700 : 500, color: active === item.id ? C.accent : C.mid }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: "16px 12px 0", borderTop: `1px solid ${C.border}` }}>
        <div onClick={() => navigate("settings")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, background: active === "settings" ? C.accentSoft : "transparent", cursor: "pointer", marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>⚙️</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: active === "settings" ? C.accent : C.mid }}>Settings</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.accent }}>{initials}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{bizName}</div>
            <div style={{ fontSize: 11, color: C.mid }}>Pro Plan</div>
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
    console.log("🗓 Google Calendar sync:", data.ok ? "✅ success" : "❌ " + data.reason);
    return data.ok;
  } catch (e) {
    console.log("Google Calendar sync failed:", e);
    return false;
  }
}

// ── AI SIDEBAR PANEL (desktop only, persists across all screens) ──────────────
function AISidebarPanel({ navigate }) {
  const [chatInput, setChatInput] = useState("");
  const [aiName, setAiName] = useState("Aria");
  const [bizContext, setBizContext] = useState("");
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
      const uid = session.user.id;
      const [profRes, apptRes, clientRes, msgRes, svcRes] = await Promise.all([
        supabase.from("business_profiles").select("ai_name,biz_name,location").eq("user_id", uid).single(),
        supabase.from("appointments").select("client_name,service,time,day,status,price").eq("owner_id", uid).order("created_at", { ascending: false }).limit(30),
        supabase.from("clients").select("name,total_visits,total_spent").eq("owner_id", uid).limit(8),
        supabase.from("messages").select("name,platform,preview,handled").eq("owner_id", uid).eq("handled", false).limit(10),
        supabase.from("services").select("name,price,duration").eq("owner_id", uid).eq("active", true).limit(10),
      ]);
      const name = profRes.data?.ai_name || "Aria";
      const biz = profRes.data?.biz_name || "your business";
      const loc = profRes.data?.location || "";
      const allAppts = apptRes.data || [];
      const todayAppts = allAppts.filter(a => a.day === "Today" || a.status === "pending");
      const confirmedAppts = allAppts.filter(a => a.status === "confirmed");
      const unhandled = (msgRes.data || []).length;
      const services = (svcRes.data || []).map(s => `${s.name} ($${s.price}, ${s.duration})`).join(", ");
      const parseP = p => parseFloat(String(p || "0").replace(/[^0-9.]/g, "")) || 0;
      const revenue = confirmedAppts.reduce((s, a) => s + parseP(a.price), 0);
      const ctx = [
        `Business: ${biz}${loc ? ` in ${loc}` : ""}`,
        services ? `Services: ${services}` : "",
        todayAppts.length ? `Today appointments: ${todayAppts.map(a => `${a.client_name} (${a.service} at ${a.time})`).join("; ")}` : "No appointments today.",
        `Revenue: $${revenue.toLocaleString()}`,
        `Total appointments: ${allAppts.length}`,
        unhandled ? `Unread messages: ${unhandled}` : "",
        (clientRes.data || []).length ? `Top clients: ${clientRes.data.map(c => c.name).join(", ")}` : "",
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
    const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    return `You are ${aiName}, an AI business assistant inside Pocketflow.
Today: ${today} at ${time}.
BUSINESS DATA:
${bizContext || "Loading..."}
PERSONALITY: Warm, sharp, confident. Like a brilliant friend who knows this business inside out.
${isVoice ? "VOICE MODE: 1-2 short natural sentences only. No markdown. Conversational." : "TEXT MODE: Use **bold** for key numbers/names. Max 3-4 sentences unless asked for more. No bullet spam."}
NAVIGATION RULE — CRITICAL: When the user asks to go to any screen/page, you MUST start your response with "NAV:screenname" on its own line. No exceptions.
FORMAT: NAV:screenname\nYour message here.
SCREENS: schedule, inbox, clients, payments, analytics, promotions, loyalty, services, staff, waitlist, settings, home.
EXAMPLES:
User: "take me to inbox" → NAV:inbox\nHere are your messages!
User: "open schedule" → NAV:schedule\nHere's your schedule!
User: "go to clients" → NAV:clients\nHere are your clients!
The "NAV:screenname" part is invisible to the user — it triggers navigation automatically.
You remember this conversation — reference earlier messages when relevant.`;
  };

  // Strips NAV: prefix, triggers navigation, returns clean display text
  const VALID_SCREENS = ["schedule","inbox","clients","payments","analytics","promotions","loyalty","services","staff","waitlist","settings","home","assistant","notifications"];

  const handleNavIntent = (raw) => {
    // Try explicit NAV: prefix first
    const match = raw.match(/^NAV:\s*(\w+)/i);
    if (match) {
      const screen = match[1].toLowerCase();
      const rest = raw.replace(/^NAV:\s*\w+\s*/i, "").trim();
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
      const m = raw.match(pattern);
      if (m) {
        const candidate = m[1].toLowerCase();
        if (VALID_SCREENS.includes(candidate)) {
          setTimeout(() => navigate(candidate), 700);
          return { navigating: true, screen: candidate, text: raw };
        }
      }
    }
    return { navigating: false, text: raw };
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
          model: "llama-3.1-8b-instant", max_tokens: 100,
          messages: [
            { role: "system", content: buildSystemPrompt(true) },
            ...history.map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: text }
          ],
        }),
      });
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "Got it.";
      console.log("🤖 AI raw (voice):", raw);
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
          model: "llama-3.1-8b-instant", max_tokens: 300,
          messages: [
            { role: "system", content: buildSystemPrompt(false) },
            ...(chatHistory || []).map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: text },
          ],
        }),
      });
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "On it.";
      console.log("🤖 AI raw (chat):", raw);
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
    {/* Toggle tab on the edge */}
    <div onClick={toggleCollapsed} style={{ position:"fixed", top:"50%", right:collapsed?0:300, transform:"translateY(-50%)", zIndex:41, background:C.surface, border:`1px solid ${C.border}`, borderRight:collapsed?`1px solid ${C.border}`:"none", borderRadius:collapsed?"10px 0 0 10px":"10px 0 0 10px", padding:"12px 8px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, transition:"right 0.25s ease", boxShadow:"-2px 0 12px rgba(0,0,0,0.15)" }}>
      <div style={{ fontSize:11, writingMode:"vertical-rl", textOrientation:"mixed", color:C.accent, fontWeight:700, letterSpacing:1 }}>{collapsed?"AI ✦":"hide"}</div>
    </div>
    <div style={{ position:"fixed", top:0, right:0, width:300, height:"100vh", background:C.surface, borderLeft:`1px solid ${C.border}`, display:"flex", flexDirection:"column", zIndex:40, transform:collapsed?"translateX(300px)":"translateX(0)", transition:"transform 0.25s ease" }}>
      {/* Header */}
      <div style={{ padding:"16px 14px 12px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div>
          <div style={{ fontFamily:"'Red Hat Display',sans-serif", fontSize:16, fontWeight:800, letterSpacing:-0.3 }}>{aiName}</div>
          <div style={{ fontSize:10, color:C.green, fontWeight:600, marginTop:1 }}>● Online · AI Assistant</div>
        </div>
        {chatHistory && chatHistory.length > 1 && (
          <div onClick={() => { setChatHistory(h=>[h[0]]); localStorage.removeItem("aria_chat_history"); }} title="Clear chat" style={{ width:28, height:28, borderRadius:8, background:C.surfaceHigh, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:12 }}>🗑</div>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"12px 12px 8px" }}>
        {!chatHistory && <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100%", color:C.dim, fontSize:13 }}>Loading...</div>}
        {(chatHistory||[]).map((m,i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start", marginBottom:10, alignItems:"flex-end", gap:6 }}>
            {m.role==="assistant" && <div style={{ width:22, height:22, borderRadius:7, background:`linear-gradient(135deg,${C.accentDark},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>✦</div>}
            <div style={{ maxWidth:"84%", padding:"9px 12px", borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px", background:m.role==="user"?`linear-gradient(135deg,${C.accentDark},${C.accent})`:C.surfaceHigh, border:m.role==="user"?"none":`1px solid ${C.border}`, fontSize:13, lineHeight:1.55, color:C.text }}>
              {renderText(m.text)}
            </div>
          </div>
        ))}
        {(loading || voiceLoading) && (
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <div style={{ width:22, height:22, borderRadius:7, background:`linear-gradient(135deg,${C.accentDark},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>✦</div>
            <div style={{ background:C.surfaceHigh, border:`1px solid ${C.border}`, borderRadius:"16px 16px 16px 4px", padding:"10px 14px", display:"flex", gap:4 }}>
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
            style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:13, color:C.text, fontFamily:"'Red Hat Display',sans-serif" }}
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
  const [screen, setScreen] = useState("login");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const hasOnboarded = localStorage.getItem("pocketflow_onboarded_" + session.user.id);
        if (!hasOnboarded) setScreen("onboarding");
        else setScreen("home");
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        const hasOnboarded = localStorage.getItem("pocketflow_onboarded_" + session.user.id);
        if (!hasOnboarded) setScreen("onboarding");
        else setScreen("home");
      }
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

  const navigate = (s) => {
    setScreen(s);
    window.scrollTo(0, 0);
  };

  const screens = { login: Login, onboarding: Onboarding, home: Home, schedule: Schedule, inbox: Inbox, assistant: Assistant, clients: Clients, payments: Payments, settings: Settings, loyalty: Loyalty, notifications: Notifications, analytics: Analytics, promotions: Promotions, booking: Booking, staff: Staff, waitlist: Waitlist, profile: BusinessProfile, connections: ConnectedAccounts, subscription: Subscription, sharelink: ShareLink, services: Services };
  const Screen = screens[screen] || Home;

  const isAuthScreen = screen === "login" || screen === "onboarding" || screen === "booking";
  const showSidebar = isDesktop && !isAuthScreen;

  // Screens that are always free (no paywall)
  const freeScreens = ["login", "onboarding", "booking", "subscription", "settings", "sharelink"];
  const needsPaywall = !freeScreens.includes(screen) && subscriptionPlan === "free" && !isAuthScreen;

  const showAISidebar = isDesktop && !isAuthScreen && screen !== "settings" && screen !== "assistant";
  const [aiSidebarCollapsed, setAiSidebarCollapsed] = useState(() => {
    try { return localStorage.getItem("aria_sidebar_collapsed") === "true"; } catch { return false; }
  });
  useEffect(() => {
    const handler = (e) => setAiSidebarCollapsed(e.detail.collapsed);
    window.addEventListener("aria_sidebar_toggle", handler);
    return () => window.removeEventListener("aria_sidebar_toggle", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Red Hat Display',sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      <style>{GLOBAL_STYLES}</style>
      {showSidebar && <Sidebar active={screen} navigate={navigate} />}
      {needsPaywall && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24, padding: "36px 28px", maxWidth: 400, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Start your free trial</div>
            <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.7, marginBottom: 24 }}>
              Get 14 days free — no credit card required.<br />
              Unlock the full Pocketflow experience.
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
        marginRight: showAISidebar && !aiSidebarCollapsed ? 300 : 0,
        minHeight: "100vh",
      }}>
        <div style={{ maxWidth: showSidebar ? "none" : 400, margin: "0 auto", padding: showSidebar ? "0 24px" : "0" }}>
          <Screen navigate={navigate} />
        </div>
      </div>
      {showAISidebar && <AISidebarPanel navigate={navigate} />}
    </div>
  );
}
