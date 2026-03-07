import { useState, useRef, useEffect } from "react";

const GROQ_API_KEY = "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";

const C = {
  bg: "#050508", surface: "#0e0e14", surfaceHigh: "#16161f",
  border: "#1e1e2e", borderHigh: "#2a2a3e",
  accent: "#a78bfa", accentDark: "#7c3aed", accentSoft: "#a78bfa18",
  gold: "#f59e0b", green: "#10b981", red: "#f43f5e", yellow: "#fbbf24", blue: "#38bdf8",
  text: "#f1f0ff", mid: "#8b8ba8", dim: "#3d3d55",
};

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{display:none;}
  body{background:#050508;}
  .fade-in{animation:fadeUp 0.35s ease forwards;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
  @keyframes pop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  input:focus,textarea:focus,select:focus{outline:none;}
  input::placeholder,textarea::placeholder{color:#3d3d55;}
  input[type=range]{-webkit-appearance:none;height:4px;border-radius:2px;background:#1e1e2e;}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a78bfa);cursor:pointer;}
  select{appearance:none;}
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

const BtnPrimary = ({ children, onClick, disabled, style }) => (
  <button onClick={onClick} disabled={disabled} style={{ background: disabled ? "#1e1e2e" : `linear-gradient(135deg,${C.accentDark},${C.accent})`, border: "none", borderRadius: 14, color: disabled ? C.dim : "#fff", fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 15, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s", ...style }}>{children}</button>
);

const BackBtn = ({ onBack }) => (
  <div onClick={onBack} style={{ width: 38, height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
  </div>
);

const BottomNav = ({ active, navigate }) => (
  <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 400, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", padding: "10px 0 20px", zIndex: 50 }}>
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

// ── Data ───────────────────────────────────────────────────────────────────────
const APPOINTMENTS = [
  { id: 1, name: "Jasmine Rivera", service: "Knotless Braids", time: "10:00 AM", duration: "3h", status: "confirmed", avatar: "JR", price: "$220", note: "Medium size, waist length", day: "Today" },
  { id: 2, name: "Tasha Monroe", service: "Natural Blowout", time: "1:30 PM", duration: "1.5h", status: "confirmed", avatar: "TM", price: "$85", note: "Low heat preferred", day: "Today" },
  { id: 3, name: "Kendra Blake", service: "Silk Press", time: "3:30 PM", duration: "2h", status: "pending", avatar: "KB", price: "$120", note: "First time client", day: "Today" },
  { id: 4, name: "Monique Steele", service: "Loc Retwist", time: "11:00 AM", duration: "2h", status: "confirmed", avatar: "MS", price: "$95", note: "Regular — every 6 weeks", day: "Tomorrow" },
  { id: 5, name: "Aisha Williams", service: "Box Braids", time: "2:00 PM", duration: "4h", status: "confirmed", avatar: "AW", price: "$180", note: "Small size", day: "Tomorrow" },
];

const MESSAGES_DATA = [
  { id: 1, platform: "whatsapp", name: "Destiny Carter", preview: "Hey do you have anything this Saturday?", time: "2m ago", handled: true, unread: false, reply: "Hey Destiny! 💕 I have a 1pm and 3pm open this Saturday. Which works for you?" },
  { id: 2, platform: "instagram", name: "brianna.hair_", preview: "How much for knotless braids?", time: "18m ago", handled: true, unread: false, reply: "Hi! Knotless start at $180 depending on length & size. DM me to book! ✨" },
  { id: 3, platform: "whatsapp", name: "Kayla Johnson", preview: "I need to reschedule my Thursday appt 😭", time: "1h ago", handled: false, unread: true, reply: "" },
  { id: 4, platform: "instagram", name: "nails.by.ree", preview: "Do you do collab popups?", time: "3h ago", handled: false, unread: true, reply: "" },
];

const CLIENTS_DATA = [
  { id: 1, name: "Jasmine Rivera", avatar: "JR", phone: "+1 (404) 555-0182", instagram: "@jasmine.rivera", joined: "March 2023", totalVisits: 14, totalSpent: "$2,840", avgSpend: "$203", lastVisit: "Today", note: "Loves medium knotless braids. Waist length. Allergic to synthetic hair spray.", badge: "VIP" },
  { id: 2, name: "Tasha Monroe", avatar: "TM", phone: "+1 (404) 555-0193", instagram: "@tasha.monroe", joined: "June 2023", totalVisits: 9, totalSpent: "$1,120", avgSpend: "$124", lastVisit: "Today", note: "Low heat only. Prefers silk press.", badge: null },
  { id: 3, name: "Kendra Blake", avatar: "KB", phone: "+1 (404) 555-0201", instagram: "@kendra.b", joined: "Jan 2024", totalVisits: 3, totalSpent: "$360", avgSpend: "$120", lastVisit: "Today", note: "First time client. Referred by Jasmine.", badge: null },
  { id: 4, name: "Monique Steele", avatar: "MS", phone: "+1 (404) 555-0214", instagram: "@monique.steele", joined: "April 2023", totalVisits: 7, totalSpent: "$890", avgSpend: "$127", lastVisit: "Yesterday", note: "Regular every 6 weeks. Loc retwist only.", badge: null },
  { id: 5, name: "Aisha Williams", avatar: "AW", phone: "+1 (404) 555-0228", instagram: "@aisha.w", joined: "Aug 2023", totalVisits: 5, totalSpent: "$900", avgSpend: "$180", lastVisit: "Mar 3", note: "Small box braids. Takes about 4 hours.", badge: null },
];

// ── LOGIN ──────────────────────────────────────────────────────────────────────
function Login({ navigate }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "60px 24px 40px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 70, height: 70, borderRadius: 22, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px", boxShadow: `0 0 40px ${C.accentDark}44` }}>✦</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800 }}>Pocketflow</div>
          <div style={{ fontSize: 14, color: C.mid, marginTop: 6 }}>Your AI business assistant</div>
        </div>
        <div style={{ display: "flex", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 4, marginBottom: 28 }}>
          {["login", "signup"].map(m => (
            <div key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "11px", borderRadius: 11, background: mode === m ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : "transparent", textAlign: "center", fontSize: 14, fontWeight: 600, color: mode === m ? "#fff" : C.mid, cursor: "pointer", transition: "all 0.2s" }}>{m === "login" ? "Log In" : "Sign Up"}</div>
          ))}
        </div>
        {mode === "signup" && <input placeholder="Business name" style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />}
        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 20 }} />
        {mode === "login" && <div style={{ textAlign: "right", marginBottom: 16, marginTop: -8 }}><span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Forgot password?</span></div>}
        <BtnPrimary onClick={() => navigate(mode === "login" ? "home" : "onboarding")} style={{ width: "100%", padding: 16 }}>{mode === "login" ? "Log In" : "Create Account"}</BtnPrimary>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: C.border }} /><span style={{ fontSize: 12, color: C.dim }}>or continue with</span><div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ icon: "🍎", label: "Apple" }, { icon: "G", label: "Google" }].map(b => (
            <button key={b.label} onClick={() => navigate("onboarding")} style={{ flex: 1, padding: 14, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 14, fontWeight: 600, color: C.text, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>{b.label}
            </button>
          ))}
        </div>
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
      <BtnPrimary onClick={() => navigate("home")} style={{ width: "100%", padding: 16 }}>Go to Dashboard →</BtnPrimary>
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
            <input placeholder="e.g. Luxe Hair Studio" value={bizName} onChange={e => setBizName(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 16 }} />
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>TYPE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {BUSINESS_TYPES.map(t => <div key={t} onClick={() => setBizType(t)} style={{ padding: "9px 16px", borderRadius: 100, background: bizType === t ? C.accentSoft : C.surface, border: `1px solid ${bizType === t ? C.accent : C.border}`, fontSize: 13, color: bizType === t ? C.accent : C.mid, cursor: "pointer", fontWeight: bizType === t ? 600 : 400, transition: "all 0.2s" }}>{t}</div>)}
            </div>
            <div style={{ fontSize: 12, color: C.mid, fontWeight: 600, marginBottom: 8 }}>LOCATION</div>
            <input placeholder="e.g. Atlanta, GA" value={bizLocation} onChange={e => setBizLocation(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif" }} />
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
              <input placeholder="Service name" value={newService.name} onChange={e => setNewService(p => ({ ...p, name: e.target.value }))} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 8 }} />
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input placeholder="Price $" value={newService.price} onChange={e => setNewService(p => ({ ...p, price: e.target.value }))} style={{ flex: 1, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: C.text, fontFamily: "'Outfit',sans-serif" }} />
                <input placeholder="Duration" value={newService.duration} onChange={e => setNewService(p => ({ ...p, duration: e.target.value }))} style={{ flex: 1, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: C.text, fontFamily: "'Outfit',sans-serif" }} />
              </div>
              <button onClick={() => { if (!newService.name) return; setServices(p => [...p, { ...newService, id: Date.now() }]); setNewService({ name: "", price: "", duration: "" }); }} style={{ width: "100%", padding: 11, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.mid, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>+ Add Service</button>
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
                <select value={startTime} onChange={e => setStartTime(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif" }}>
                  {["7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ color: C.dim, marginTop: 16 }}>→</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>Closes at</div>
                <select value={endTime} onChange={e => setEndTime(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif" }}>
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
  const unread = MESSAGES_DATA.filter(m => m.unread);
  const todayAppts = APPOINTMENTS.filter(a => a.day === "Today");
  const activity = [
    { icon: "✦", text: "Sent reminder to 3 clients for tomorrow", time: "Just now" },
    { icon: "✦", text: "Auto-replied to 2 Instagram DMs", time: "8 min ago" },
    { icon: "✦", text: "Kendra Blake booked via WhatsApp link", time: "34 min ago" },
    { icon: "✦", text: "Collected $220 deposit from Jasmine R.", time: "1h ago" },
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 16px", background: `linear-gradient(180deg,#111 0%,${C.bg} 100%)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 12, color: C.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Friday · Mar 6</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>Good morning,<br /><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your business</span><br />is running. ✦</div>
          </div>
          <div style={{ position: "relative", cursor: "pointer" }} onClick={() => navigate("notifications")}>
            <div style={{ width: 44, height: 44, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔔</div>
            {unread.length > 0 && <div style={{ position: "absolute", top: -4, right: -4, width: 20, height: 20, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", border: `2px solid ${C.bg}` }}>{unread.length}</div>}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 20 }}>
          {[{ label: "This Week", value: "$700", sub: "revenue", color: C.gold }, { label: "Today", value: "3", sub: "appointments", color: C.text }, { label: "Handled", value: "47", sub: "by AI this month", color: C.accent }].map((s, i) => (
            <Card key={i} style={{ padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: i === 0 ? 18 : 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 9, color: C.dim, marginTop: 3 }}>{s.sub}</div>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 1.5, textTransform: "uppercase" }}>AI Running</span>
          </div>
          {activity.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < activity.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ color: C.accent, fontSize: 10, marginTop: 2, flexShrink: 0 }}>{a.icon}</span>
              <span style={{ fontSize: 13, color: C.mid, flex: 1 }}>{a.text}</span>
              <span style={{ fontSize: 10, color: C.dim, flexShrink: 0 }}>{a.time}</span>
            </div>
          ))}
        </Card>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2, textTransform: "uppercase" }}>Today's Schedule</span>
          <span style={{ fontSize: 11, color: C.accent, fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("schedule")}>See all →</span>
        </div>
        <Card style={{ padding: "4px 16px", marginBottom: 16 }}>
          {todayAppts.map((a, i) => (
            <div key={a.id} onClick={() => setSelectedAppt(a)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: i < todayAppts.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.accentSoft, border: `1px solid ${C.accentSoft}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0 }}>{a.avatar}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{a.name}</div><div style={{ fontSize: 12, color: C.mid }}>{a.service}</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 600 }}>{a.time}</div><div style={{ fontSize: 11, color: a.status === "confirmed" ? C.green : C.yellow, marginTop: 3 }}>{a.status}</div></div>
            </div>
          ))}
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
          {[{ icon: "💳", label: "Payments", screen: "payments" }, { icon: "⚙️", label: "Settings", screen: "settings" }, { icon: "🎁", label: "Loyalty", screen: "loyalty" }, { icon: "📊", label: "Analytics", screen: "analytics" }, { icon: "📣", label: "Promotions", screen: "promotions" }, { icon: "👥", label: "Staff", screen: "staff" }, { icon: "⏳", label: "Waitlist", screen: "waitlist" }, { icon: "🔗", label: "Share Booking Link", screen: "sharelink" }].map(item => (
            <Card key={item.screen} onClick={() => item.screen === "sharelink" ? alert("Your booking link:\npocketflow.app/book/luxe-hair-studio\n\nShare this with clients so they can book directly!") : navigate(item.screen)} style={{ padding: "16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
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
              <button style={{ flex: 1, padding: 13, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Reschedule</button>
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
  const todayAppts = APPOINTMENTS.filter(a => a.day === "Today");
  const tomorrowAppts = APPOINTMENTS.filter(a => a.day === "Tomorrow");

  const ApptRow = ({ a, last }) => (
    <div onClick={() => setSelectedAppt(a)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: last ? "none" : `1px solid ${C.border}`, cursor: "pointer" }}>
      <div style={{ width: 42, height: 42, borderRadius: 13, background: C.accentSoft, border: `1px solid ${C.accentSoft}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0 }}>{a.avatar}</div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{a.name}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{a.service} · {a.duration}</div></div>
      <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 600 }}>{a.time}</div><div style={{ fontSize: 12, color: C.gold, marginTop: 2, fontWeight: 600 }}>{a.price}</div></div>
    </div>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Schedule</div>
        </div>
        <div style={{ fontSize: 13, color: C.mid }}>5 appointments · $700 confirmed</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <SectionLabel>Today — Friday</SectionLabel>
        <Card style={{ padding: "4px 16px", marginBottom: 8 }}>
          {todayAppts.map((a, i) => <ApptRow key={a.id} a={a} last={i === todayAppts.length - 1} />)}
        </Card>
        <SectionLabel>Tomorrow — Saturday</SectionLabel>
        <Card style={{ padding: "4px 16px" }}>
          {tomorrowAppts.map((a, i) => <ApptRow key={a.id} a={a} last={i === tomorrowAppts.length - 1} />)}
        </Card>
      </div>
      {selectedAppt && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", maxWidth: 400, margin: "0 auto" }} onClick={() => setSelectedAppt(null)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: C.accent }}>{selectedAppt.avatar}</div>
              <div><div style={{ fontSize: 18, fontWeight: 700 }}>{selectedAppt.name}</div><div style={{ fontSize: 13, color: C.mid }}>{selectedAppt.service}</div></div>
            </div>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              {[["Time", selectedAppt.time], ["Duration", selectedAppt.duration], ["Price", selectedAppt.price], ["Status", selectedAppt.status], ["Note", selectedAppt.note]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: k !== "Note" ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: C.mid }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: k === "Price" ? C.gold : k === "Status" ? (selectedAppt.status === "confirmed" ? C.green : C.yellow) : C.text }}>{v}</span>
                </div>
              ))}
            </Card>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { alert(`Reschedule request sent to ${selectedAppt.name}. They'll receive a message to pick a new time.`); setSelectedAppt(null); }} style={{ flex: 1, padding: 13, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Reschedule</button>
              <BtnPrimary onClick={() => { alert(`Reminder sent to ${selectedAppt.name} for their ${selectedAppt.time} appointment! 💕`); setSelectedAppt(null); }} style={{ flex: 1, padding: 13 }}>Send Reminder</BtnPrimary>
            </div>
          </div>
        </div>
      )}
      <BottomNav active="schedule" navigate={navigate} />
    </div>
  );
}

// ── INBOX ──────────────────────────────────────────────────────────────────────
function Inbox({ navigate }) {
  const [msgs, setMsgs] = useState(MESSAGES_DATA);
  const unread = msgs.filter(m => m.unread);

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Inbox</div>
        </div>
        <div style={{ fontSize: 13, color: C.mid }}>AI handled {msgs.filter(m => m.handled).length} of {msgs.length} today</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {unread.length > 0 && <div style={{ background: "#f43f5e11", border: "1px solid #f43f5e22", borderRadius: 12, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#f87171", fontWeight: 500 }}>⚠ {unread.length} message{unread.length > 1 ? "s" : ""} need your input</div>}
        {msgs.map(m => (
          <Card key={m.id} style={{ padding: 16, marginBottom: 12, borderColor: m.unread ? "#f43f5e22" : C.border }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              {m.unread && <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.red, flexShrink: 0 }} />}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>{m.platform === "whatsapp" ? <WA /> : <IG />}<span style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</span></div>
              <span style={{ fontSize: 11, color: C.dim, marginLeft: "auto" }}>{m.time}</span>
            </div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: m.handled ? 12 : 0, lineHeight: 1.5 }}>"{m.preview}"</div>
            {m.handled ? (
              <div style={{ background: "#10b98111", border: "1px solid #10b98122", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: C.green, fontWeight: 700, marginBottom: 6 }}>✓ AI AUTO-REPLIED</div>
                <div style={{ fontSize: 12, color: "#6ee7b7", lineHeight: 1.5 }}>{m.reply}</div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <BtnPrimary onClick={() => setMsgs(p => p.map(x => x.id === m.id ? { ...x, handled: true, unread: false, reply: "Hey! Thanks for reaching out 💕 Let me check on that and get back to you shortly." } : x))} style={{ flex: 1, padding: 10, fontSize: 12 }}>Let AI handle it</BtnPrimary>
                <button style={{ flex: 1, padding: 10, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 12, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Reply myself</button>
              </div>
            )}
          </Card>
        ))}
      </div>
      <BottomNav active="inbox" navigate={navigate} />
    </div>
  );
}

// ── ASSISTANT ──────────────────────────────────────────────────────────────────
function Assistant({ navigate }) {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "assistant", text: "Hey! Everything's running smooth today. You've got 3 appointments, $700 in confirmed revenue, and I've already handled 6 messages for you. What do you need?" }]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, loading]);

  const sendChat = async () => {
    const text = chatInput.trim();
    if (!text || loading) return;
    setChatInput("");
    setChatHistory(p => [...p, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("https://maren-creepier-unepigrammatically.ngrok-free.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 300,
          messages: [
            { role: "system", content: "You are Pocketflow, an AI business assistant for a hair salon owner. Speak casually but professionally. Today: Jasmine Rivera (Knotless Braids 10am $220), Tasha Monroe (Natural Blowout 1:30pm $85), Kendra Blake (Silk Press 3:30pm pending $120). Week revenue: $700. 2 unread messages: Kayla Johnson wants to reschedule Thursday, nails.by.ree asking about collab popups. Keep responses short, 2-4 sentences max." },
            ...chatHistory.map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: text }
          ]
        })
      });
      const data = await res.json();
      if (data.error) {
        setChatHistory(p => [...p, { role: "assistant", text: "Couldn't connect to AI. Check your API key and try again." }]);
      } else {
        setChatHistory(p => [...p, { role: "assistant", text: data.choices?.[0]?.message?.content || "On it." }]);
      }
    } catch {
      setChatHistory(p => [...p, { role: "assistant", text: "Connection failed. Make sure your API key is added at the top of App.js." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 16px" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Assistant</div>
        <div style={{ fontSize: 13, color: C.mid }}>Talk to your AI — it knows everything</div>
      </div>
      <div style={{ padding: "0 20px", overflowY: "auto", paddingBottom: 140 }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16 }}>
          {["Who's next?", "Any urgent messages?", "Send a promo", "This week's revenue", "Block Sunday"].map(c => (
            <div key={c} onClick={() => setChatInput(c)} style={{ padding: "8px 14px", borderRadius: 100, background: C.surface, border: `1px solid ${C.border}`, fontSize: 12, fontWeight: 600, color: C.mid, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{c}</div>
          ))}
        </div>
        {chatHistory.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            {m.role === "assistant" && <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginRight: 8, flexShrink: 0, marginTop: 2 }}>✦</div>}
            <div style={{ maxWidth: "78%", padding: "11px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : C.surface, border: m.role === "user" ? "none" : `1px solid ${C.border}`, fontSize: 14, lineHeight: 1.5, color: m.role === "user" ? "#fff" : C.text }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✦</div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: 5 }}>
              {[0, 1, 2].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, animation: "pulse 1.2s infinite", animationDelay: `${d * 0.2}s` }} />)}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={{ position: "fixed", bottom: 72, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 400, padding: "12px 20px", background: `linear-gradient(0deg,${C.bg} 80%,transparent)`, zIndex: 40 }}>
        <div style={{ display: "flex", gap: 10, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "6px 6px 6px 16px", alignItems: "center" }}>
          <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Ask me anything..." style={{ flex: 1, background: "none", border: "none", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif" }} />
          <BtnPrimary onClick={sendChat} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 11, flexShrink: 0, padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </BtnPrimary>
        </div>
      </div>
      <BottomNav active="assistant" navigate={navigate} />
    </div>
  );
}

// ── NOTE TAB (stateful sub-component for client notes) ─────────────────────────
function NoteTab({ client }) {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!note.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <Card style={{ padding: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 8 }}>✦ AI MEMORY</div>
        <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.7 }}>{client.note}</div>
      </Card>
      <textarea
        placeholder="Add a private note..."
        rows={4}
        value={note}
        onChange={e => { setNote(e.target.value); setSaved(false); }}
        style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", resize: "none" }}
      />
      {saved
        ? <div style={{ width: "100%", padding: 13, marginTop: 10, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 14, fontSize: 14, fontWeight: 600, color: C.green, textAlign: "center" }}>✓ Note saved!</div>
        : <BtnPrimary onClick={handleSave} style={{ width: "100%", padding: 13, marginTop: 10 }}>Save Note</BtnPrimary>
      }
    </div>
  );
}

// ── CLIENTS ────────────────────────────────────────────────────────────────────
function Clients({ navigate }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState("history");

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
        {activeTab === "notes" && (
          <NoteTab client={selectedClient} />
        )}
        {activeTab === "contact" && (
          <Card>
            {[["📱", "Phone", selectedClient.phone], ["📸", "Instagram", selectedClient.instagram], ["📅", "Last visit", selectedClient.lastVisit]].map(([icon, label, val], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: C.dim }}>{label}</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{val}</div></div>
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
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Clients</div>
        </div>
        <div style={{ fontSize: 13, color: C.mid }}>{CLIENTS_DATA.length} total clients</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.dim} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: 13, color: C.dim }}>Search clients...</span>
        </div>
        {CLIENTS_DATA.map((c, i) => (
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
      </div>
      <BottomNav active="clients" navigate={navigate} />
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

  const invoices = [
    { id: 1, name: "Jasmine Rivera", service: "Knotless Braids", amount: "$220", status: "paid", date: "Today" },
    { id: 2, name: "Tasha Monroe", service: "Natural Blowout", amount: "$85", status: "paid", date: "Today" },
    { id: 3, name: "Kendra Blake", service: "Silk Press", amount: "$120", status: "pending", date: "Today" },
    { id: 4, name: "Monique Steele", service: "Loc Retwist", amount: "$95", status: "paid", date: "Yesterday" },
    { id: 5, name: "Aisha Williams", service: "Box Braids", amount: "$180", status: "overdue", date: "Mar 3" },
  ];
  const statusColor = s => s === "paid" ? C.green : s === "pending" ? C.yellow : C.red;

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
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>THIS WEEK</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 800, marginBottom: 8 }}>$700</div>
          <div style={{ display: "flex", gap: 16 }}>
            {[["Collected", "$605", C.green], ["Pending", "$120", C.yellow], ["Overdue", "$180", C.red]].map(([l, v, color]) => (
              <div key={l}><div style={{ fontSize: 11, color: C.dim }}>{l}</div><div style={{ fontSize: 15, fontWeight: 700, color }}>{v}</div></div>
            ))}
          </div>
        </div>
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
                  <input value={depositAmount} onChange={e => setDepositAmount(e.target.value)} style={{ flex: 1, background: "none", border: "none", fontSize: 20, fontWeight: 700, color: C.text, fontFamily: "'Outfit',sans-serif" }} />
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
          {noShowFee && <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}><div style={{ display: "flex", alignItems: "center", background: C.surfaceHigh, border: `1px solid ${C.borderHigh}`, borderRadius: 12, padding: "10px 14px", gap: 8 }}><span style={{ fontSize: 16, color: C.mid }}>$</span><input value={noShowAmount} onChange={e => setNoShowAmount(e.target.value)} style={{ flex: 1, background: "none", border: "none", fontSize: 18, fontWeight: 700, color: C.text, fontFamily: "'Outfit',sans-serif" }} /></div></div>}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: lateCancel ? `1px solid ${C.border}` : "none" }}>
            <div><div style={{ fontSize: 14, fontWeight: 600 }}>Late cancellation fee</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>Within {lateCancelHours}h of appointment</div></div>
            <Toggle on={lateCancel} onToggle={() => setLateCancel(p => !p)} />
          </div>
          {lateCancel && <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}><div style={{ display: "flex", gap: 8 }}>{["12", "24", "48"].map(h => <div key={h} onClick={() => setLateCancelHours(h)} style={{ flex: 1, padding: "9px", borderRadius: 10, background: lateCancelHours === h ? C.accentSoft : C.surfaceHigh, border: `1px solid ${lateCancelHours === h ? C.accent : C.borderHigh}`, textAlign: "center", fontSize: 13, fontWeight: 600, color: lateCancelHours === h ? C.accent : C.mid, cursor: "pointer" }}>{h}h</div>)}</div></div>}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
            <div><div style={{ fontSize: 14, fontWeight: 600 }}>Connected payment</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>Stripe · •••• 4242</div></div>
            <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Active</span>
          </div>
        </Card>
        <SectionLabel>Invoices</SectionLabel>
        <Card>
          {invoices.map((inv, i) => (
            <div key={inv.id} onClick={() => setSelectedInvoice(inv)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: i < invoices.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: `${statusColor(inv.status)}18`, border: `1px solid ${statusColor(inv.status)}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{inv.status === "paid" ? "✓" : inv.status === "pending" ? "⏳" : "!"}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{inv.name}</div><div style={{ fontSize: 11, color: C.mid, marginTop: 2 }}>{inv.service} · {inv.date}</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{inv.amount}</div><div style={{ fontSize: 10, color: statusColor(inv.status), marginTop: 3, fontWeight: 600, textTransform: "uppercase" }}>{inv.status}</div></div>
            </div>
          ))}
        </Card>
      </div>
      {selectedInvoice && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", maxWidth: 400, margin: "0 auto" }} onClick={() => setSelectedInvoice(null)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{selectedInvoice.name}</div>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>{selectedInvoice.service}</div>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              {[["Amount", selectedInvoice.amount], ["Status", selectedInvoice.status], ["Date", selectedInvoice.date]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: k !== "Date" ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: C.mid }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: k === "Amount" ? C.gold : k === "Status" ? statusColor(selectedInvoice.status) : C.text, textTransform: "capitalize" }}>{v}</span>
                </div>
              ))}
            </Card>
            {selectedInvoice.status !== "paid" && (
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { alert(`Reminder sent to ${selectedInvoice.name} via WhatsApp!`); setSelectedInvoice(null); }} style={{ flex: 1, padding: 13, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Send Reminder</button>
                <BtnPrimary onClick={() => { alert(`Payment request sent to ${selectedInvoice.name}. They'll receive a Stripe link to pay ${selectedInvoice.amount}.`); setSelectedInvoice(null); }} style={{ flex: 1, padding: 13 }}>Charge Now</BtnPrimary>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── SETTINGS ───────────────────────────────────────────────────────────────────
function Settings({ navigate }) {
  const [aiReplies, setAiReplies] = useState(true);
  const [aiBookings, setAiBookings] = useState(true);
  const [aiReminders, setAiReminders] = useState(true);
  const [aiFollowUps, setAiFollowUps] = useState(true);
  const [aiPromos, setAiPromos] = useState(false);
  const [tone, setTone] = useState("friendly");
  const [bufferTime, setBufferTime] = useState("15");
  const [maxDaily, setMaxDaily] = useState("6");
  const [sunday, setSunday] = useState(false);

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Settings</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
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
            { icon: "🅿️", label: "PayPal", sub: "Accept PayPal payments", connected: false },
            { icon: "💵", label: "Cash App", sub: "Accept Cash App payments", connected: false },
            { icon: "💱", label: "Zelle", sub: "Accept Zelle transfers", connected: false },
          ].map((p, i, arr) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize: 22 }}>{p.icon}</span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{p.label}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{p.sub}</div></div>
              {p.connected
                ? <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Connected ✓</span>
                : <BtnPrimary onClick={() => alert(`${p.label} connection coming soon! This will let your clients pay you directly.`)} style={{ padding: "8px 14px", fontSize: 12 }}>Connect</BtnPrimary>}
            </div>
          ))}
        </Card>
        <SectionLabel>Account</SectionLabel>
        <Card>
          {[
            { icon: "👤", label: "Business Profile", sub: "Luxe Hair Studio · Atlanta, GA", screen: "profile" },
            { icon: "🔗", label: "Connected Accounts", sub: "WhatsApp, Instagram, Google", screen: "connections" },
            { icon: "💳", label: "Subscription", sub: "Pro Plan · $29/mo", screen: "subscription" },
          ].map(({ icon, label, sub }, i) => (
            <div key={i} onClick={() => alert(`${label} settings — coming soon!`)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < 2 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{sub}</div></div>
              <span style={{ fontSize: 12, color: C.mid }}>›</span>
            </div>
          ))}
        </Card>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <span onClick={() => navigate("login")} style={{ fontSize: 13, color: C.red, fontWeight: 600, cursor: "pointer" }}>Sign Out</span>
        </div>
      </div>
    </div>
  );
}

// ── LOYALTY ────────────────────────────────────────────────────────────────────
function Loyalty({ navigate }) {
  const [loyaltyOn, setLoyaltyOn] = useState(true);
  const [visitsForReward, setVisitsForReward] = useState("5");
  const [rewardType, setRewardType] = useState("discount");
  const [birthdayOn, setBirthdayOn] = useState(true);
  const [rebookOn, setRebookOn] = useState(true);
  const [rebookDays, setRebookDays] = useState("21");
  const [reviewOn, setReviewOn] = useState(true);
  const [winbackOn, setWinbackOn] = useState(true);
  const [reviews, setReviews] = useState([
    { name: "Jasmine R.", rating: 5, text: "Best braider in Atlanta! My hair lasted 8 weeks 😍", date: "2 days ago", replied: true },
    { name: "Tasha M.", rating: 5, text: "Always on time and my silk press was PERFECT", date: "1 week ago", replied: false },
  ]);

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Loyalty</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 }}>
          {[{ label: "Repeat clients", value: "68%", color: C.accent }, { label: "Avg. review", value: "4.9 ⭐", color: C.gold }].map((s, i) => (
            <Card key={i} style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{s.label}</div>
            </Card>
          ))}
        </div>
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
                  {["3", "5", "8", "10"].map(v => <div key={v} onClick={() => setVisitsForReward(v)} style={{ flex: 1, padding: "9px", borderRadius: 10, background: visitsForReward === v ? C.accentSoft : C.surface, border: `1px solid ${visitsForReward === v ? C.accent : C.border}`, textAlign: "center", fontSize: 13, fontWeight: 700, color: visitsForReward === v ? C.accent : C.mid, cursor: "pointer" }}>{v}</div>)}
                </div>
                <div style={{ fontSize: 12, color: C.mid, marginBottom: 10 }}>Reward type</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["discount", "free service"].map(t => <div key={t} onClick={() => setRewardType(t)} style={{ flex: 1, padding: "9px", borderRadius: 10, background: rewardType === t ? C.accentSoft : C.surface, border: `1px solid ${rewardType === t ? C.accent : C.border}`, textAlign: "center", fontSize: 12, fontWeight: 600, color: rewardType === t ? C.accent : C.mid, cursor: "pointer", textTransform: "capitalize" }}>{t}</div>)}
                </div>
              </div>
            </div>
          )}
        </Card>
        <SectionLabel>Automated Messages</SectionLabel>
        <Card style={{ marginBottom: 8 }}>
          {[["🎂", "Birthday message", "AI sends a special message on their birthday", birthdayOn, setBirthdayOn], ["🔁", "Rebook reminder", `Message clients after ${rebookDays} days with no appointment`, rebookOn, setRebookOn], ["⭐", "Review request", "Ask for a review after every appointment", reviewOn, setReviewOn], ["💔", "Win-back campaign", "Re-engage clients missing for 45+ days", winbackOn, setWinbackOn]].map(([icon, label, sub, val, set], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{sub}</div></div>
              <Toggle on={val} onToggle={() => set(p => !p)} />
            </div>
          ))}
        </Card>
        <SectionLabel>Recent Reviews</SectionLabel>
        {reviews.map((r, i) => (
          <Card key={i} style={{ padding: 16, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</span>
              <span style={{ fontSize: 11, color: C.dim }}>{r.date}</span>
            </div>
            <div style={{ fontSize: 16, marginBottom: 8 }}>{"⭐".repeat(r.rating)}</div>
            <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5, marginBottom: r.replied ? 10 : 0 }}>"{r.text}"</div>
            {r.replied
              ? <div style={{ background: "#10b98111", border: "1px solid #10b98122", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#6ee7b7" }}>✓ AI replied</div>
              : <BtnPrimary onClick={() => setReviews(prev => prev.map((x, j) => j === i ? { ...x, replied: true } : x))} style={{ width: "100%", marginTop: 10, padding: 10, fontSize: 13 }}>Reply with AI</BtnPrimary>
            }
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── NOTIFICATIONS ──────────────────────────────────────────────────────────────
function Notifications({ navigate }) {
  const [filter, setFilter] = useState("all");
  const notifs = [
    { id: 1, type: "booking", icon: "📅", title: "New booking confirmed", body: "Kendra Blake booked Silk Press for today at 3:30 PM", time: "2 min ago", read: false, action: "View" },
    { id: 2, type: "payment", icon: "💰", title: "Deposit received", body: "Jasmine Rivera paid $66 deposit for tomorrow's appointment", time: "15 min ago", read: false, action: "View" },
    { id: 3, type: "ai", icon: "✦", title: "AI handled 3 messages", body: "Replied to Destiny C., brianna.hair_, and 1 other automatically", time: "1h ago", read: true, action: null },
    { id: 4, type: "review", icon: "⭐", title: "New 5-star review", body: "Tasha Monroe left a review — AI has replied", time: "2h ago", read: true, action: "View" },
    { id: 5, type: "alert", icon: "⚠️", title: "Kayla J. wants to reschedule", body: "She messaged on WhatsApp — needs your attention", time: "3h ago", read: false, action: "Handle" },
    { id: 6, type: "ai", icon: "✦", title: "Slow day detected", body: "You have 2 open slots Friday. Want me to send a promo?", time: "Yesterday", read: true, action: "Send promo" },
    { id: 7, type: "payment", icon: "💰", title: "Overdue payment", body: "Aisha Williams — $180 for Box Braids is 3 days overdue", time: "Yesterday", read: true, action: "Remind" },
  ];
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
          {["all", "booking", "payment", "ai", "alert", "review"].map(f => (
            <div key={f} onClick={() => setFilter(f)} style={{ padding: "8px 14px", borderRadius: 100, background: filter === f ? C.accentSoft : C.surface, border: `1px solid ${filter === f ? C.accent : C.border}`, fontSize: 12, fontWeight: 600, color: filter === f ? C.accent : C.mid, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, textTransform: "capitalize" }}>{f === "all" ? `All (${notifs.length})` : f}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {unread > 0 && <div style={{ background: `${C.accent}12`, border: `1px solid ${C.accent}22`, borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>{unread} unread notifications</span><span style={{ fontSize: 12, color: C.mid, cursor: "pointer" }}>Mark all read</span></div>}
        {filtered.map(n => (
          <div key={n.id} style={{ background: C.surface, border: `1px solid ${n.read ? C.border : typeColor(n.type) + "33"}`, borderRadius: 16, padding: "14px 16px", marginBottom: 10, position: "relative", overflow: "hidden" }}>
            {!n.read && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: typeColor(n.type), borderRadius: "3px 0 0 3px" }} />}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${typeColor(n.type)}18`, border: `1px solid ${typeColor(n.type)}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: n.type === "ai" ? 14 : 18, color: n.type === "ai" ? C.blue : "inherit", flexShrink: 0 }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: n.read ? 500 : 700, flex: 1, marginRight: 8 }}>{n.title}</span>
                  <span style={{ fontSize: 10, color: C.dim, flexShrink: 0, marginTop: 2 }}>{n.time}</span>
                </div>
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.5, marginBottom: n.action ? 10 : 0 }}>{n.body}</div>
                {n.action && <BtnPrimary style={{ padding: "7px 14px", fontSize: 12 }}>{n.action}</BtnPrimary>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ANALYTICS ──────────────────────────────────────────────────────────────────
function Analytics({ navigate }) {
  const [period, setPeriod] = useState("week");

  const data = {
    week: {
      revenue: "$1,585", trend: "+23%", trendLabel: "vs last week",
      appts: "9", newClients: "2", avgClient: "$176", noShows: "1",
      bars: [{ day: "Mon", revenue: 305 }, { day: "Tue", revenue: 0 }, { day: "Wed", revenue: 220 }, { day: "Thu", revenue: 85 }, { day: "Fri", revenue: 700 }, { day: "Sat", revenue: 275 }, { day: "Sun", revenue: 0 }],
      barLabel: "Revenue by Day",
    },
    month: {
      revenue: "$6,240", trend: "+11%", trendLabel: "vs last month",
      appts: "38", newClients: "9", avgClient: "$164", noShows: "3",
      bars: [{ day: "W1", revenue: 1200 }, { day: "W2", revenue: 1850 }, { day: "W3", revenue: 1585 }, { day: "W4", revenue: 1605 }],
      barLabel: "Revenue by Week",
    },
    year: {
      revenue: "$52,800", trend: "+34%", trendLabel: "vs last year",
      appts: "312", newClients: "64", avgClient: "$169", noShows: "18",
      bars: [{ day: "Jan", revenue: 3200 }, { day: "Feb", revenue: 3800 }, { day: "Mar", revenue: 4200 }, { day: "Apr", revenue: 4100 }, { day: "May", revenue: 5200 }, { day: "Jun", revenue: 4800 }, { day: "Jul", revenue: 4100 }, { day: "Aug", revenue: 4600 }, { day: "Sep", revenue: 4900 }, { day: "Oct", revenue: 5100 }, { day: "Nov", revenue: 4800 }, { day: "Dec", revenue: 4000 }],
      barLabel: "Revenue by Month",
    }
  };

  const d = data[period];
  const max = Math.max(...d.bars.map(b => b.revenue));

  const topServices = [
    { name: "Knotless Braids", count: period === "week" ? 8 : period === "month" ? 18 : 142, revenue: period === "week" ? "$1,600" : period === "month" ? "$3,240" : "$28,400", pct: 100 },
    { name: "Box Braids", count: period === "week" ? 4 : period === "month" ? 9 : 74, revenue: period === "week" ? "$720" : period === "month" ? "$1,440" : "$13,320", pct: 45 },
    { name: "Silk Press", count: period === "week" ? 5 : period === "month" ? 7 : 56, revenue: period === "week" ? "$600" : period === "month" ? "$840" : "$6,720", pct: 37 },
    { name: "Natural Blowout", count: period === "week" ? 3 : period === "month" ? 4 : 40, revenue: period === "week" ? "$255" : period === "month" ? "$340" : "$3,400", pct: 16 },
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={() => navigate("home")} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Analytics</div>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 4, marginBottom: 20 }}>
          {["week", "month", "year"].map(p => <div key={p} onClick={() => setPeriod(p)} style={{ flex: 1, padding: "10px", borderRadius: 11, background: period === p ? `linear-gradient(135deg,${C.accentDark},${C.accent})` : "transparent", textAlign: "center", fontSize: 13, fontWeight: 600, color: period === p ? "#fff" : C.mid, cursor: "pointer", textTransform: "capitalize" }}>{p === "week" ? "This Week" : p === "month" ? "This Month" : "This Year"}</div>)}
        </div>
        <div style={{ background: "linear-gradient(135deg,#16103a,#1a0f3a)", border: `1px solid ${C.accentSoft}`, borderRadius: 22, padding: 22, marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>TOTAL REVENUE</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 800, marginBottom: 4 }}>{d.revenue}</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: C.green, fontWeight: 700 }}>↑ {d.trend}</span>
            <span style={{ fontSize: 13, color: C.mid }}>{d.trendLabel}</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[{ label: "Appointments", value: d.appts }, { label: "New clients", value: d.newClients }, { label: "Avg per client", value: d.avgClient }, { label: "No-shows", value: d.noShows }].map((s, i) => (
            <Card key={i} style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: C.accent }}>{s.value}</div>
            </Card>
          ))}
        </div>
        <SectionLabel>{d.barLabel}</SectionLabel>
        <Card style={{ padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100, marginBottom: 12 }}>
            {d.bars.map((b, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                  <div style={{ width: "100%", borderRadius: "6px 6px 0 0", background: b.revenue > 0 ? `linear-gradient(180deg,${C.accent},${C.accentDark})` : C.border, height: `${max > 0 ? (b.revenue / max) * 100 : 0}%`, minHeight: b.revenue > 0 ? 4 : 0, transition: "height 0.4s ease" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {d.bars.map(b => <div key={b.day} style={{ flex: 1, textAlign: "center", fontSize: 9, color: C.dim, fontWeight: 600 }}>{b.day}</div>)}
          </div>
        </Card>
        <SectionLabel>Top Services</SectionLabel>
        <Card style={{ marginBottom: 24 }}>
          {topServices.map((s, i) => (
            <div key={i} style={{ padding: "14px 16px", borderBottom: i < topServices.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{s.revenue}</span>
              </div>
              <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.pct}%`, background: `linear-gradient(90deg,${C.accentDark},${C.accent})`, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 6 }}>{s.count} appointments</div>
            </div>
          ))}
        </Card>
        <SectionLabel>AI Insights</SectionLabel>
        {["Friday is your busiest day — consider adding an extra slot", "Knotless Braids is your top earner at 58% of revenue", "2 clients haven't booked in 6 weeks — want me to reach out?", "Your average rating is 4.9 — top 5% on Pocketflow"].map((ins, i) => (
          <div key={i} style={{ background: C.accentSoft, border: `1px solid ${C.accent}22`, borderRadius: 14, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>{"📅💰👥⭐".split("")[i]}</span>
            <span style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>{ins}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROMOTIONS ─────────────────────────────────────────────────────────────────
function Promotions({ navigate }) {
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
                <button onClick={() => alert("Got it! I'll remind you next time there's a slow day.")} style={{ flex: 1, padding: 11, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.mid, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>Not now</button>
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
            <input placeholder="Promo title (e.g. Friday Flash Deal 🔥)" value={promoTitle} onChange={e => setPromoTitle(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
              <textarea placeholder="Write your message..." value={promoMsg} onChange={e => setPromoMsg(e.target.value)} rows={4} style={{ width: "100%", background: "none", border: "none", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", resize: "none" }} />
            </div>
            <button onClick={() => setPromoMsg("Hey gorgeous! 💕 I have a few slots open this Friday and I'm running a special — book any service and get 15% off. Limited spots, first come first served! Book here 👉 [your link]")} style={{ width: "100%", padding: 12, background: C.accentSoft, border: `1px solid ${C.accent}44`, borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.accent, cursor: "pointer", fontFamily: "'Outfit',sans-serif", marginBottom: 20 }}>✦ Write with AI</button>
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

  const services = [
    { id: 1, name: "Knotless Braids", price: 180, duration: "4h", icon: "✨", desc: "Medium to jumbo, any length" },
    { id: 2, name: "Box Braids", price: 160, duration: "3.5h", icon: "💫", desc: "Small, medium, or large" },
    { id: 3, name: "Silk Press", price: 120, duration: "2h", icon: "🌟", desc: "Sleek and straight finish" },
    { id: 4, name: "Natural Blowout", price: 85, duration: "1.5h", icon: "💨", desc: "Stretched and fluffy" },
    { id: 5, name: "Loc Retwist", price: 95, duration: "2h", icon: "🌀", desc: "Fresh and neat locs" },
    { id: 6, name: "Wig Install", price: 75, duration: "1h", icon: "👑", desc: "Lace front or closure" },
  ];

  const dates = ["Fri Mar 7", "Sat Mar 8", "Mon Mar 10", "Tue Mar 11", "Wed Mar 12", "Thu Mar 13"];
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

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setBooked(true); }, 2000);
  };

  if (booked) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center", background: C.bg }}>
      <div style={{ width: 90, height: 90, borderRadius: 28, background: C.green + "22", border: "2px solid " + C.green + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 24, animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>✓</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>You're booked!</div>
      <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.8, marginBottom: 16 }}>
        {selectedServices.map(s => s.name).join(" + ")}<br />
        {selectedDate} at {selectedTime}<br />
        <span style={{ color: C.accent, fontWeight: 600 }}>Luxe Hair Studio · Atlanta, GA</span>
      </div>
      <Card style={{ padding: 16, width: "100%", marginBottom: 24, textAlign: "left" }}>
        {[["Services", selectedServices.map(s => s.name).join(", ")], ["Deposit paid", depositStr], ["Remaining balance", "$" + (totalPrice - depositAmount) + "+"], ["Confirmation sent to", phone]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: k !== "Confirmation sent to" ? "1px solid " + C.border : "none", gap: 12 }}>
            <span style={{ fontSize: 13, color: C.mid, flexShrink: 0 }}>{k}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: k === "Deposit paid" ? C.green : C.text, textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </Card>
      <div style={{ fontSize: 13, color: C.mid, marginBottom: 24, lineHeight: 1.6 }}>You'll receive a reminder 24 hours before your appointment. ✨</div>
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
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Luxe Hair Studio</div>
        <div style={{ fontSize: 13, color: C.mid, marginTop: 5 }}>Atlanta, GA · ⭐ 4.9 · 128 reviews</div>
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
            {services.map(s => {
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
            <input placeholder="Your full name *" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
            <input placeholder="Phone number *" type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
            <input placeholder="Instagram handle (optional)" value={instagram} onChange={e => setInstagram(e.target.value)} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
            <textarea placeholder="Notes — hair length, allergies, special requests..." value={note} onChange={e => setNote(e.target.value)} rows={3} style={{ width: "100%", background: C.surface, border: "1px solid " + C.border, borderRadius: 14, padding: "14px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", resize: "none" }} />
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
                <input placeholder="Name on card" value={cardName} onChange={e => setCardName(e.target.value)} style={{ width: "100%", background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }} />
              </div>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid " + C.border }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>CARD NUMBER</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} style={{ flex: 1, background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'Outfit',sans-serif", fontWeight: 600, letterSpacing: 2 }} />
                  <span style={{ fontSize: 20 }}>💳</span>
                </div>
              </div>
              <div style={{ display: "flex", padding: "12px 16px", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>EXPIRY</div>
                  <input placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} style={{ width: "100%", background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }} />
                </div>
                <div style={{ width: 1, background: C.border }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>CVC</div>
                  <input placeholder="123" value={cardCvc} onChange={e => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 3))} style={{ width: "100%", background: "none", border: "none", fontSize: 15, color: C.text, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }} />
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
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [staff, setStaff] = useState([
    { id: 1, name: "Aaliyah Brooks", role: "Senior Braider", avatar: "AB", phone: "+1 (404) 555-0311", status: "active", appts: 4, revenue: "$520", rating: 4.9, services: ["Knotless Braids", "Box Braids", "Locs"] },
    { id: 2, name: "Nia Thompson", role: "Stylist", avatar: "NT", phone: "+1 (404) 555-0344", status: "active", appts: 2, revenue: "$180", rating: 4.7, services: ["Silk Press", "Natural Blowout", "Color"] },
    { id: 3, name: "Camille Davis", role: "Nail Tech", avatar: "CD", phone: "+1 (404) 555-0388", status: "day-off", appts: 0, revenue: "$0", rating: 4.8, services: ["Manicure", "Pedicure", "Gel Nails"] },
  ]);

  const statusColor = s => s === "active" ? C.green : C.yellow;

  if (selectedStaff) return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(180deg,#16103a,${C.bg})`, padding: "48px 24px 24px", textAlign: "center" }}>
        <div onClick={() => setSelectedStaff(null)} style={{ position: "absolute", top: 52, left: 20, width: 38, height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </div>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: C.accent, margin: "0 auto 12px" }}>{selectedStaff.avatar}</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800 }}>{selectedStaff.name}</div>
        <div style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>{selectedStaff.role}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: statusColor(selectedStaff.status), background: `${statusColor(selectedStaff.status)}18`, border: `1px solid ${statusColor(selectedStaff.status)}33`, borderRadius: 100, padding: "3px 10px", textTransform: "capitalize" }}>{selectedStaff.status}</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "16px 20px" }}>
        {[{ label: "Today", value: selectedStaff.appts, sub: "appts" }, { label: "Revenue", value: selectedStaff.revenue, sub: "today" }, { label: "Rating", value: `${selectedStaff.rating}⭐`, sub: "avg" }].map((s, i) => (
          <Card key={i} style={{ padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 800, color: i === 1 ? C.gold : C.accent }}>{s.value}</div>
            <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>
      <div style={{ padding: "0 20px" }}>
        <SectionLabel>Services</SectionLabel>
        <Card style={{ padding: "4px 16px", marginBottom: 16 }}>
          {selectedStaff.services.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < selectedStaff.services.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{s}</span>
              <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>✓ Active</span>
            </div>
          ))}
        </Card>
        <SectionLabel>Contact</SectionLabel>
        <Card style={{ padding: "4px 16px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0" }}>
            <span style={{ fontSize: 18 }}>📱</span>
            <div><div style={{ fontSize: 12, color: C.dim }}>Phone</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{selectedStaff.phone}</div></div>
          </div>
        </Card>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => { setStaff(p => p.map(s => s.id === selectedStaff.id ? { ...s, status: s.status === "active" ? "day-off" : "active" } : s)); setSelectedStaff(p => ({ ...p, status: p.status === "active" ? "day-off" : "active" })); }} style={{ flex: 1, padding: 13, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, color: C.mid, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
            {selectedStaff.status === "active" ? "Mark Day Off" : "Mark Active"}
          </button>
          <BtnPrimary onClick={() => alert(`Message sent to ${selectedStaff.name}!`)} style={{ flex: 1, padding: 13 }}>Send Message</BtnPrimary>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "52px 20px 20px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BackBtn onBack={() => navigate("home")} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800 }}>Staff</div>
          </div>
          <BtnPrimary onClick={() => setShowAdd(true)} style={{ padding: "9px 16px", fontSize: 13 }}>+ Add</BtnPrimary>
        </div>
        <div style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>{staff.filter(s => s.status === "active").length} active · {staff.length} total</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[{ label: "On shift", value: staff.filter(s => s.status === "active").length, color: C.green }, { label: "Total appts", value: staff.reduce((a, s) => a + s.appts, 0), color: C.accent }, { label: "Today revenue", value: "$700", color: C.gold }].map((s, i) => (
            <Card key={i} style={{ padding: "14px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>{s.label}</div>
            </Card>
          ))}
        </div>
        {staff.map(s => (
          <Card key={s.id} onClick={() => setSelectedStaff(s)} style={{ padding: "16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: C.accentSoft, border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: C.accent }}>{s.avatar}</div>
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
      </div>

      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", maxWidth: 400, margin: "0 auto" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Add Staff Member</div>
            <input placeholder="Full name" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
            <input placeholder="Role (e.g. Braider, Stylist)" value={newRole} onChange={e => setNewRole(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
            <input placeholder="Phone number" value={newPhone} onChange={e => setNewPhone(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 20 }} />
            <BtnPrimary disabled={!newName || !newRole} onClick={() => { setStaff(p => [...p, { id: Date.now(), name: newName, role: newRole, avatar: newName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(), phone: newPhone, status: "active", appts: 0, revenue: "$0", rating: 5.0, services: [] }]); setNewName(""); setNewRole(""); setNewPhone(""); setShowAdd(false); }} style={{ width: "100%", padding: 14 }}>Add Staff Member</BtnPrimary>
          </div>
        </div>
      )}
    </div>
  );
}

// ── WAITLIST ───────────────────────────────────────────────────────────────────
function Waitlist({ navigate }) {
  const [waitlist, setWaitlist] = useState([
    { id: 1, name: "Priya Patel", service: "Knotless Braids", requestedDate: "This Friday", addedTime: "2h ago", avatar: "PP", phone: "+1 (404) 555-0421", notified: false },
    { id: 2, name: "Zoe Carter", service: "Silk Press", requestedDate: "This Weekend", addedTime: "5h ago", avatar: "ZC", phone: "+1 (404) 555-0432", notified: false },
    { id: 3, name: "Maya Johnson", service: "Box Braids", requestedDate: "Next Week", addedTime: "Yesterday", avatar: "MJ", phone: "+1 (404) 555-0445", notified: true },
    { id: 4, name: "Fatima Diallo", service: "Natural Blowout", requestedDate: "Flexible", addedTime: "2 days ago", avatar: "FD", phone: "+1 (404) 555-0456", notified: false },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState("");

  const notify = (id) => {
    setWaitlist(p => p.map(w => w.id === id ? { ...w, notified: true } : w));
    alert("Slot offer sent! The client has 2 hours to confirm before it goes to the next person.");
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
                  <button onClick={() => remove(w.id)} style={{ width: 40, height: 40, background: "#f43f5e11", border: "1px solid #f43f5e22", borderRadius: 12, fontSize: 16, color: C.red, cursor: "pointer", flexShrink: 0, fontFamily: "'Outfit',sans-serif" }}>×</button>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>

      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", maxWidth: 400, margin: "0 auto" }} onClick={() => setShowAdd(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "24px 24px 0 0", width: "100%", padding: "24px 20px 40px", animation: "slideUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Add to Waitlist</div>
            <input placeholder="Client name" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
            <input placeholder="Service requested" value={newService} onChange={e => setNewService(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
            <input placeholder="Preferred date (e.g. This weekend)" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ width: "100%", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif", marginBottom: 20 }} />
            <BtnPrimary disabled={!newName || !newService} onClick={() => { setWaitlist(p => [...p, { id: Date.now(), name: newName, service: newService, requestedDate: newDate || "Flexible", addedTime: "Just now", avatar: newName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(), phone: "", notified: false }]); setNewName(""); setNewService(""); setNewDate(""); setShowAdd(false); }} style={{ width: "100%", padding: 14 }}>Add to Waitlist</BtnPrimary>
          </div>
        </div>
      )}
    </div>
  );
}
export default function App() {
  const [screen, setScreen] = useState("login");

  const navigate = (s) => {
    setScreen(s);
    window.scrollTo(0, 0);
  };

  const screens = { login: Login, onboarding: Onboarding, home: Home, schedule: Schedule, inbox: Inbox, assistant: Assistant, clients: Clients, payments: Payments, settings: Settings, loyalty: Loyalty, notifications: Notifications, analytics: Analytics, promotions: Promotions, booking: Booking, staff: Staff, waitlist: Waitlist };
  const Screen = screens[screen] || Home;

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 400, margin: "0 auto", color: C.text, position: "relative" }}>
      <style>{GLOBAL_STYLES}</style>
      <Screen navigate={navigate} />
    </div>
  );
}
