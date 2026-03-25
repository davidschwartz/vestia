import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// VESTIA DEMO APP — demo.joinvestia.com
// Mobile-first interactive prototype
// Persona: Cindy Herd, Stage 2: Landing
// ============================================================

// --- Design Tokens (from Product Requirements) ---
const TOKENS = {
  brand: {
    navy: "#1B365D",
    teal: "#2A7F8E",
    coral: "#C75C3A",
    gold: "#C49A2A",
  },
  stage: {
    1: { bg: "#E8F0F2", text: "#085041", label: "Exploring" },
    2: { bg: "#F0EDE4", text: "#854F0B", label: "Landing" },
    3: { bg: "#EDE8F0", text: "#3C3489", label: "Building" },
    4: { bg: "#F0E8E8", text: "#712B13", label: "Advancing" },
  },
  domain: {
    career: { bg: "#E1F5EE", text: "#085041", label: "Career Navigation" },
    hired: { bg: "#E6F1FB", text: "#0C447C", label: "Getting Hired" },
    performance: { bg: "#EEEDFE", text: "#3C3489", label: "Professional Performance" },
    money: { bg: "#FAEEDA", text: "#854F0B", label: "Money & Negotiation" },
    network: { bg: "#E1F5EE", text: "#085041", label: "Relationships & Network" },
    identity: { bg: "#FBEAF0", text: "#72243E", label: "Identity & Resilience" },
  },
  functional: {
    urgent: "#E24B4A",
    scheduled: "#378ADD",
    action: "#1D9E75",
    warning: "#EF9F27",
  },
};

// --- SVG Icons ---
const Icons = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  explore: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  network: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  messages: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  chevron: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  plus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  mic: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  briefcase: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  star: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  back: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  fire: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  clock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  target: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

// --- Avatar Component ---
function Avatar({ name, size = 36, color = TOKENS.brand.teal }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 500, letterSpacing: "0.02em",
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

// --- Pill Badge ---
function Pill({ label, bg, text, small }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: small ? "1px 6px" : "2px 8px",
      borderRadius: 8, fontSize: small ? 10 : 11,
      fontWeight: 500, background: bg, color: text,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

// --- Progress Bar ---
function ProgressBar({ progress, color, height = 4, segments }) {
  if (segments) {
    return (
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: height + 2, borderRadius: 3,
            background: i < segments ? color : `${color}22`,
            transition: "background 0.3s",
          }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ height, borderRadius: height / 2, background: `${color}22`, overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: height / 2,
        background: color, width: `${progress}%`,
        transition: "width 0.6s ease",
      }} />
    </div>
  );
}

// --- Card wrapper ---
function Card({ children, style, highlight, onClick, offer }) {
  return (
    <div onClick={onClick} style={{
      background: "#fff", borderRadius: 12,
      border: highlight ? `2px solid ${TOKENS.functional.scheduled}` : offer ? `1px solid ${TOKENS.functional.action}` : "0.5px solid #e2e2e2",
      padding: "12px 14px",
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.15s, box-shadow 0.15s",
      ...style,
    }}>
      {children}
    </div>
  );
}

// --- Section Header ---
function SectionHeader({ children, action, onAction }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      marginBottom: 8, marginTop: 4,
    }}>
      <span style={{
        fontSize: 13, fontWeight: 500, color: "#6b7280",
        textTransform: "uppercase", letterSpacing: "0.3px",
      }}>{children}</span>
      {action && (
        <span onClick={onAction} style={{
          fontSize: 12, color: TOKENS.brand.teal, cursor: "pointer", fontWeight: 500,
        }}>{action}</span>
      )}
    </div>
  );
}

// ============================================================
// SCREEN: HOME DASHBOARD
// ============================================================
function HomeScreen({ setTab, setSubScreen }) {
  const stage = TOKENS.stage[2];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>VESTIA</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>Welcome back, Cindy</span>
          <Avatar name="Cindy Herd" size={34} color={TOKENS.brand.coral} />
        </div>
      </div>

      {/* Stage Indicator */}
      <Card style={{ background: stage.bg, border: "none" }} onClick={() => setSubScreen("journey")}>
        <div style={{ fontSize: 11, fontWeight: 500, color: stage.text, textTransform: "uppercase", letterSpacing: "0.3px", marginBottom: 6, opacity: 0.7 }}>YOUR STAGE</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: stage.text }}>Stage 2: Landing</div>
            <div style={{ fontSize: 13, color: stage.text, opacity: 0.75, marginTop: 2 }}>Active job search — week 6</div>
          </div>
          <div style={{ width: 90, paddingTop: 6 }}>
            <ProgressBar segments={2} color={stage.text} height={6} />
          </div>
        </div>
      </Card>

      {/* This Week */}
      <div>
        <SectionHeader>This Week</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Card>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: TOKENS.functional.urgent, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>Mock interview with Dave</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>Tomorrow, 4:00 PM · Stryker final round prep</div>
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: TOKENS.functional.scheduled, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>Cohort check-in</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>Thursday, 7:00 PM · Share one win this week</div>
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: TOKENS.functional.action, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>Complete: First Offer Negotiation</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>2 segments remaining · ~15 min</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Active Goals */}
      <div>
        <SectionHeader action="+ Add goal">Active Goals</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Card onClick={() => setSubScreen("goal-detail")}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>Land my target role</span>
              <Pill label="Getting Hired" bg={TOKENS.domain.hired.bg} text={TOKENS.domain.hired.text} />
            </div>
            <ProgressBar progress={58} color={TOKENS.domain.hired.text} />
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 5 }}>4 of 7 milestones complete</div>
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>Build negotiation confidence</span>
              <Pill label="Money" bg={TOKENS.domain.money.bg} text={TOKENS.domain.money.text} />
            </div>
            <ProgressBar progress={33} color={TOKENS.domain.money.text} />
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 5 }}>1 of 3 milestones complete</div>
          </Card>
        </div>
      </div>

      {/* Target Companies */}
      <div>
        <SectionHeader action="View all" onAction={() => setTab("network")}>Target Companies</SectionHeader>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, margin: "0 -20px", padding: "0 20px 4px 20px" }}>
          {[
            { name: "Stryker", industry: "Medical Devices", status: "Interviewing", color: TOKENS.domain.performance.text, bg: TOKENS.domain.performance.bg },
            { name: "Abbott", industry: "Healthcare", status: "Applied", color: TOKENS.domain.hired.text, bg: TOKENS.domain.hired.bg },
            { name: "Medtronic", industry: "Medical Devices", status: "Researching", color: TOKENS.domain.money.text, bg: TOKENS.domain.money.bg },
            { name: "BD", industry: "Medical Tech", status: "Applied", color: TOKENS.domain.hired.text, bg: TOKENS.domain.hired.bg },
          ].map((c, i) => (
            <Card key={i} style={{ minWidth: 140, flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{c.industry}</div>
              <div style={{ marginTop: 6 }}>
                <Pill label={c.status} bg={c.bg} text={c.color} small />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Pulse */}
      <div>
        <SectionHeader>Community Pulse</SectionHeader>
        <Card style={{ background: "#fafafa", border: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "#4b5563" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: TOKENS.functional.action }}>●</span>
              <span><strong style={{ fontWeight: 500 }}>Claire</strong> just got promoted to Senior Analyst!</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: TOKENS.brand.teal }}>●</span>
              <span><strong style={{ fontWeight: 500 }}>Dylan</strong> completed the Negotiation module</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: TOKENS.brand.gold }}>●</span>
              <span>Your cohort has <strong style={{ fontWeight: 500 }}>5 new messages</strong></span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: EXPLORE (Content Library)
// ============================================================
function ExploreScreen({ setSubScreen }) {
  const [activeDomain, setActiveDomain] = useState("all");
  const domains = [
    { key: "all", label: "All" },
    { key: "career", label: "Career Nav" },
    { key: "hired", label: "Getting Hired" },
    { key: "performance", label: "Performance" },
    { key: "money", label: "Money" },
    { key: "network", label: "Network" },
    { key: "identity", label: "Identity" },
  ];

  const modules = [
    { title: "You Have a Meeting This Week", domain: "hired", segments: 3, duration: "20 min", status: "complete", stage: 1 },
    { title: "First Offer Negotiation", domain: "money", segments: 5, duration: "35 min", status: "in-progress", stage: 2 },
    { title: "Interview Prep Deep Dive", domain: "hired", segments: 6, duration: "40 min", status: "not-started", stage: 2 },
    { title: "Senior Year Launchpad", domain: "career", segments: 4, duration: "30 min", status: "complete", stage: 1 },
    { title: "Your First 90 Days", domain: "performance", segments: 5, duration: "35 min", status: "not-started", stage: 2 },
    { title: "Building Your Board of Directors", domain: "network", segments: 4, duration: "25 min", status: "in-progress", stage: 2 },
    { title: "Student to Professional", domain: "identity", segments: 3, duration: "20 min", status: "not-started", stage: 2 },
    { title: "Salary Research 101", domain: "money", segments: 3, duration: "20 min", status: "not-started", stage: 2 },
  ];

  const filtered = activeDomain === "all" ? modules : modules.filter(m => m.domain === activeDomain);

  const statusIcon = (s) => {
    if (s === "complete") return <div style={{ width: 18, height: 18, borderRadius: "50%", background: TOKENS.functional.action, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>{Icons.check}</div>;
    if (s === "in-progress") return <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${TOKENS.brand.teal}`, background: "#fff" }} />;
    return <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #d1d5db", background: "#fff" }} />;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>VESTIA</div>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>Explore</div>
      </div>

      {/* Search */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>{Icons.search}</div>
        <input placeholder="Search modules, topics, skills..." style={{
          width: "100%", padding: "10px 12px 10px 36px", borderRadius: 10,
          border: "0.5px solid #e2e2e2", fontSize: 14, outline: "none",
          background: "#fff", boxSizing: "border-box",
        }} />
      </div>

      {/* Stage context */}
      <div style={{ fontSize: 13, color: "#6b7280", background: TOKENS.stage[2].bg, padding: "8px 12px", borderRadius: 8 }}>
        Showing content for <strong style={{ fontWeight: 500, color: TOKENS.stage[2].text }}>Stage 2: Landing</strong>
        <span style={{ color: TOKENS.brand.teal, marginLeft: 8, cursor: "pointer", fontSize: 12 }}>Browse all stages</span>
      </div>

      {/* Domain Filters */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", margin: "0 -20px", padding: "0 20px", flexWrap: "nowrap" }}>
        {domains.map(d => {
          const isActive = activeDomain === d.key;
          const domainToken = d.key !== "all" ? TOKENS.domain[d.key] : null;
          return (
            <button key={d.key} onClick={() => setActiveDomain(d.key)} style={{
              padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500,
              border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              background: isActive ? (domainToken ? domainToken.bg : TOKENS.brand.navy) : "#f3f4f6",
              color: isActive ? (domainToken ? domainToken.text : "#fff") : "#6b7280",
              transition: "all 0.2s",
            }}>
              {d.label}
            </button>
          );
        })}
      </div>

      {/* Recommended */}
      <div>
        <SectionHeader>Recommended for You</SectionHeader>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "0 -20px", padding: "0 20px 4px" }}>
          {modules.filter(m => m.status !== "complete").slice(0, 3).map((m, i) => {
            const d = TOKENS.domain[m.domain];
            return (
              <Card key={i} style={{ minWidth: 180, flexShrink: 0 }} onClick={() => setSubScreen("module-detail")}>
                <Pill label={d.label} bg={d.bg} text={d.text} small />
                <div style={{ fontSize: 14, fontWeight: 500, color: "#111", marginTop: 6, lineHeight: 1.3 }}>{m.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: "#6b7280" }}>
                  {Icons.clock} <span>{m.segments} segments · {m.duration}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Module List */}
      <div>
        <SectionHeader>All Modules</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((m, i) => {
            const d = TOKENS.domain[m.domain];
            return (
              <Card key={i} onClick={() => setSubScreen("module-detail")}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ paddingTop: 2 }}>{statusIcon(m.status)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#111", lineHeight: 1.3 }}>{m.title}</div>
                      <Pill label={d.label} bg={d.bg} text={d.text} small />
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                      {m.segments} segments · {m.duration} · Stage {m.stage}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: NETWORK
// ============================================================
function NetworkScreen({ setSubScreen }) {
  const boardRoles = [
    { role: "Mentor", filled: true, name: "Dave Schwartz", title: "Enterprise AE", company: "Tech", desc: "Someone who guides your career decisions with experience", color: TOKENS.brand.teal },
    { role: "Sponsor", filled: false, desc: "Someone who advocates for you in rooms you're not in", color: "#9ca3af" },
    { role: "Connector", filled: true, name: "Claire Grayson", title: "Investment Analyst", company: "Finance", desc: "Someone who opens doors and makes introductions", color: TOKENS.brand.gold },
    { role: "Challenger", filled: false, desc: "Someone who pushes you to think bigger and bolder", color: "#9ca3af" },
    { role: "Coach", filled: false, desc: "Someone who helps you develop specific skills", color: "#9ca3af" },
  ];

  const connections = [
    { name: "Clarissa Osborne", title: "Recent Graduate", color: TOKENS.brand.coral, time: "2 days ago" },
    { name: "Wendy White", title: "Marketing Analytics", color: TOKENS.brand.teal, time: "1 week ago" },
    { name: "Lana Phan", title: "Student, Tech Sales", color: TOKENS.brand.gold, time: "2 weeks ago" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>VESTIA</div>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>Your Network</div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { n: 12, label: "Connections" },
          { n: 1, label: "Mentors" },
          { n: 18, label: "Cohort Peers" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: "#f9fafb", borderRadius: 8,
            padding: "10px 8px", textAlign: "center",
          }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>{s.n}</div>
            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Board of Directors */}
      <div>
        <SectionHeader>Personal Board of Directors</SectionHeader>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {boardRoles.map((b, i) => (
            <div key={i} onClick={() => b.filled && setSubScreen("connection-profile")} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 14px",
              borderBottom: i < boardRoles.length - 1 ? "0.5px solid #f0f0f0" : "none",
              cursor: b.filled ? "pointer" : "default",
            }}>
              {b.filled ? (
                <Avatar name={b.name} size={34} color={b.color} />
              ) : (
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  border: "1.5px dashed #d1d5db", display: "flex",
                  alignItems: "center", justifyContent: "center", color: "#9ca3af",
                  flexShrink: 0,
                }}>
                  {Icons.plus}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                {b.filled ? (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{b.title} · {b.company}</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#6b7280" }}>{b.role}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{b.desc}</div>
                  </>
                )}
              </div>
              <Pill label={b.role} bg={b.filled ? `${b.color}18` : "#f3f4f6"} text={b.filled ? b.color : "#9ca3af"} small />
            </div>
          ))}
        </Card>
        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>
          You'll fill these over time. Most professionals don't have a full board until Stage 3 or 4.
        </div>
      </div>

      {/* Recent Connections */}
      <div>
        <SectionHeader action="View all">Recent Connections</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {connections.map((c, i) => (
            <Card key={i} onClick={() => setSubScreen("connection-profile")}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={c.name} size={34} color={c.color} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{c.title}</div>
                </div>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>{c.time}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Job Tracker Link */}
      <Card onClick={() => setSubScreen("job-tracker")} style={{ background: TOKENS.domain.hired.bg, border: "none" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: TOKENS.domain.hired.text }}>{Icons.briefcase}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: TOKENS.domain.hired.text }}>Job Search Tracker</div>
              <div style={{ fontSize: 12, color: TOKENS.domain.hired.text, opacity: 0.7 }}>12 applications · 1 offer</div>
            </div>
          </div>
          <span style={{ color: TOKENS.domain.hired.text }}>{Icons.chevron}</span>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// SCREEN: JOB TRACKER
// ============================================================
function JobTrackerScreen({ onBack }) {
  const pipeline = [
    { label: "Applied", count: 5, color: TOKENS.domain.hired.text },
    { label: "Screening", count: 4, color: TOKENS.brand.teal },
    { label: "Interview", count: 2, color: TOKENS.domain.performance.text },
    { label: "Offer", count: 1, color: TOKENS.functional.action },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div onClick={onBack} style={{ cursor: "pointer", color: "#6b7280" }}>{Icons.back}</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>VESTIA</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>Job Tracker</div>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div style={{ display: "flex", gap: 6 }}>
        {pipeline.map((p, i) => (
          <div key={i} style={{ flex: 1, background: "#f9fafb", borderRadius: 8, padding: "10px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: p.color }}>{p.count}</div>
            <div style={{ fontSize: 10, color: "#6b7280", marginTop: 1 }}>{p.label}</div>
          </div>
        ))}
      </div>

      {/* Needs Action */}
      <div>
        <SectionHeader>Needs Action</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Card highlight>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>Stryker — Sales Associate</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Tampa Bay, FL</div>
              </div>
              <Pill label="Interview" bg={TOKENS.domain.performance.bg} text={TOKENS.domain.performance.text} small />
            </div>
            <div style={{
              marginTop: 8, padding: "6px 10px", borderRadius: 8,
              background: "#FEF3C7", fontSize: 12, color: "#854F0B",
            }}>
              Final round March 28 — Complete interview prep checklist
            </div>
          </Card>
          <Card highlight>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>Abbott — Associate Rep</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Orlando, FL</div>
              </div>
              <Pill label="Screening" bg={TOKENS.domain.hired.bg} text={TOKENS.domain.hired.text} small />
            </div>
            <div style={{
              marginTop: 8, padding: "6px 10px", borderRadius: 8,
              background: "#DBEAFE", fontSize: 12, color: "#0C447C",
            }}>
              Phone screen scheduled March 26, 2:00 PM
            </div>
          </Card>
        </div>
      </div>

      {/* Offer */}
      <div>
        <SectionHeader>Offers</SectionHeader>
        <Card offer>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>BD — Inside Sales Rep</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Tampa Bay, FL · Medical Tech</div>
            </div>
            <Pill label="Offer" bg="#DCFCE7" text={TOKENS.functional.action} small />
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>Base</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#111" }}>$52,000</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>OTE</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#111" }}>$68,000</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>Deadline</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: TOKENS.functional.urgent }}>Mar 31</div>
            </div>
          </div>
          <div style={{
            marginTop: 10, padding: "8px 10px", borderRadius: 8,
            background: "#DCFCE7", fontSize: 12, color: "#065F46",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span>Complete negotiation prep module before responding</span>
            <span style={{ color: TOKENS.functional.action }}>{Icons.chevron}</span>
          </div>
        </Card>
      </div>

      {/* Rest of Pipeline */}
      <div>
        <SectionHeader>In Pipeline</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { company: "Medtronic", role: "Clinical Sales Rep", loc: "Tampa, FL", status: "Applied" },
            { company: "J&J", role: "Sales Development Rep", loc: "Remote", status: "Applied" },
            { company: "Stryker", role: "Marketing Coordinator", loc: "Fort Lauderdale, FL", status: "Screening" },
          ].map((a, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>{a.company} — {a.role}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{a.loc}</div>
                </div>
                <Pill label={a.status} bg={a.status === "Applied" ? TOKENS.domain.hired.bg : TOKENS.domain.performance.bg} text={a.status === "Applied" ? TOKENS.domain.hired.text : TOKENS.domain.performance.text} small />
              </div>
            </Card>
          ))}
          <div style={{ fontSize: 12, color: TOKENS.brand.teal, textAlign: "center", padding: 8, cursor: "pointer" }}>
            +4 more applications
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: MESSAGES
// ============================================================
function MessagesScreen({ setSubScreen }) {
  const [activeChat, setActiveChat] = useState(null);

  const chats = [
    { type: "mentor", name: "Dave Schwartz", preview: "Great job on the Stryker prep! Let's talk about the BD offer...", time: "2h", unread: 2, color: TOKENS.brand.teal },
    { type: "cohort", name: "Spring 2026 Cohort", preview: "Dylan: Just got my first callback! 🎉", time: "4h", unread: 5, color: TOKENS.brand.coral },
    { type: "mentor", name: "Claire Grayson", preview: "Let me know if you want to do a mock interview for Stryker", time: "1d", unread: 0, color: TOKENS.brand.gold },
    { type: "system", name: "Vestia", preview: "Milestone vested: 4th interview scheduled!", time: "2d", unread: 0, color: TOKENS.brand.navy },
  ];

  if (activeChat !== null) {
    const chat = chats[activeChat];
    const messages = activeChat === 0 ? [
      { from: "dave", text: "Hey Cindy! How are you feeling about the Stryker final round?", time: "2:15 PM" },
      { from: "me", text: "Nervous but excited! I've been reviewing the case study they sent.", time: "2:18 PM" },
      { from: "dave", text: "That's great. Remember what we talked about — lead with the revenue impact of your ideas. Stryker cares about numbers.", time: "2:20 PM" },
      { from: "dave", text: "Also, I want to talk about the BD offer before your deadline. Their OTE is below market for Tampa medical sales. You have room to negotiate.", time: "2:22 PM" },
      { from: "me", text: "That's what I was thinking! The negotiation module said to research the 25th-75th percentile range. I found $65K-$78K OTE for similar roles.", time: "2:25 PM" },
      { from: "dave", text: "Great job on the Stryker prep! Let's talk about the BD offer — I think you can get to $75K OTE if you present the data right. Want to practice the conversation tomorrow after our mock interview?", time: "2:30 PM" },
    ] : activeChat === 1 ? [
      { from: "dylan", text: "Just got my first callback! 🎉", time: "11:30 AM" },
      { from: "wendy", text: "YES Dylan!! Which company?", time: "11:32 AM" },
      { from: "dylan", text: "Marketing coordinator at a digital agency in San Diego!", time: "11:33 AM" },
      { from: "audrey", text: "That's amazing! You've been working so hard on this 💪", time: "11:40 AM" },
      { from: "me", text: "Congrats Dylan! Make sure to use the research sprint template before your call!", time: "12:01 PM" },
    ] : [];

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", margin: "-20px -20px 0", position: "relative" }}>
        {/* Chat Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
          borderBottom: "0.5px solid #e2e2e2", background: "#fff",
        }}>
          <div onClick={() => setActiveChat(null)} style={{ cursor: "pointer", color: "#6b7280" }}>{Icons.back}</div>
          <Avatar name={chat.name} size={32} color={chat.color} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>{chat.name}</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>{chat.type === "cohort" ? "18 members" : chat.type === "mentor" ? "Mentor" : ""}</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px", display: "flex", flexDirection: "column", gap: 8 }}>
          {messages.map((m, i) => {
            const isMe = m.from === "me";
            return (
              <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "78%", padding: "8px 12px", borderRadius: 14,
                  background: isMe ? TOKENS.brand.navy : "#f3f4f6",
                  color: isMe ? "#fff" : "#111", fontSize: 14, lineHeight: 1.4,
                  borderBottomRightRadius: isMe ? 4 : 14,
                  borderBottomLeftRadius: isMe ? 14 : 4,
                }}>
                  {!isMe && activeChat === 1 && (
                    <div style={{ fontSize: 11, fontWeight: 500, color: TOKENS.brand.teal, marginBottom: 2, textTransform: "capitalize" }}>{m.from}</div>
                  )}
                  {m.text}
                  <div style={{ fontSize: 10, marginTop: 3, opacity: 0.6, textAlign: "right" }}>{m.time}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "8px 12px", background: "#fff", borderTop: "0.5px solid #e2e2e2",
          display: "flex", gap: 8, alignItems: "center",
        }}>
          <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: 4 }}>{Icons.mic}</button>
          <input placeholder="Message..." style={{
            flex: 1, padding: "8px 12px", borderRadius: 20,
            border: "0.5px solid #e2e2e2", fontSize: 14, outline: "none",
          }} />
          <button style={{ background: TOKENS.brand.navy, border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer" }}>{Icons.send}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>VESTIA</div>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>Messages</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {chats.map((c, i) => (
          <div key={i} onClick={() => setActiveChat(i)} style={{
            display: "flex", gap: 10, alignItems: "center", padding: "12px 0",
            borderBottom: i < chats.length - 1 ? "0.5px solid #f0f0f0" : "none",
            cursor: "pointer",
          }}>
            <div style={{ position: "relative" }}>
              <Avatar name={c.name} size={40} color={c.color} />
              {c.unread > 0 && (
                <div style={{
                  position: "absolute", top: -2, right: -2, width: 16, height: 16,
                  borderRadius: "50%", background: TOKENS.functional.urgent, color: "#fff",
                  fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {c.unread}
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: c.unread > 0 ? 500 : 400, color: "#111" }}>{c.name}</span>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>{c.time}</span>
              </div>
              <div style={{
                fontSize: 13, color: c.unread > 0 ? "#374151" : "#9ca3af",
                fontWeight: c.unread > 0 ? 450 : 400,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2,
              }}>
                {c.preview}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: SETTINGS / PROFILE
// ============================================================
function SettingsScreen({ setSubScreen }) {
  const stage = TOKENS.stage[2];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>VESTIA</div>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>Profile</div>
      </div>

      {/* Profile Card */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Avatar name="Cindy Herd" size={64} color={TOKENS.brand.coral} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: "#111" }}>Cindy Herd</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Tampa Bay, FL · Pharmaceutical & Medical Sales</div>
        </div>
        <Pill label="Stage 2: Landing" bg={stage.bg} text={stage.text} />
      </div>

      {/* Journey Stats */}
      <Card style={{ background: "#fafafa", border: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: TOKENS.brand.navy }}>6</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Weeks in Stage 2</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: TOKENS.brand.teal }}>5</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Milestones Vested</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: TOKENS.brand.gold }}>3</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Modules Complete</div>
          </div>
        </div>
      </Card>

      {/* Settings Sections */}
      {[
        { label: "Stage Self-Assessment", desc: "Review or update your current stage" },
        { label: "Active Domains", desc: "Getting Hired, Money & Negotiation" },
        { label: "Notification Preferences", desc: "Push, email, and digest settings" },
        { label: "Data Export", desc: "Download your goals, network, and progress" },
        { label: "Account Settings", desc: "Email, password, connected accounts" },
      ].map((item, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 0", borderBottom: "0.5px solid #f0f0f0", cursor: "pointer",
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>{item.label}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{item.desc}</div>
          </div>
          <span style={{ color: "#9ca3af" }}>{Icons.chevron}</span>
        </div>
      ))}

      <div style={{
        textAlign: "center", fontSize: 12, color: "#9ca3af", paddingTop: 8,
      }}>
        Vestia v1.0 · demo.joinvestia.com
      </div>
    </div>
  );
}

// ============================================================
// SUB-SCREEN: GOAL DETAIL
// ============================================================
function GoalDetailScreen({ onBack }) {
  const milestones = [
    { title: "Complete resume review with mentor", done: true },
    { title: "Optimize LinkedIn profile", done: true },
    { title: "Apply to 10 target companies", done: true },
    { title: "Complete 2 mock interviews", done: true },
    { title: "Complete interview prep module", done: false },
    { title: "Negotiate first offer", done: false },
    { title: "Accept a role", done: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div onClick={onBack} style={{ cursor: "pointer", color: "#6b7280" }}>{Icons.back}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>VESTIA</div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>Land my target role</div>
          <Pill label="Getting Hired" bg={TOKENS.domain.hired.bg} text={TOKENS.domain.hired.text} />
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Target: May 2026 · Stage 2</div>
      </div>

      <div>
        <ProgressBar progress={58} color={TOKENS.domain.hired.text} height={6} />
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>4 of 7 milestones vested</div>
      </div>

      <div>
        <SectionHeader>Milestones</SectionHeader>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {milestones.map((m, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              borderBottom: i < milestones.length - 1 ? "0.5px solid #f0f0f0" : "none",
              opacity: m.done ? 0.65 : 1,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                background: m.done ? TOKENS.functional.action : "#fff",
                border: m.done ? "none" : "2px solid #d1d5db",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", flexShrink: 0,
              }}>
                {m.done && Icons.check}
              </div>
              <span style={{
                fontSize: 14, color: "#111",
                textDecoration: m.done ? "line-through" : "none",
              }}>{m.title}</span>
            </div>
          ))}
        </Card>
      </div>

      <Card style={{ background: TOKENS.domain.money.bg, border: "none" }}>
        <div style={{ fontSize: 13, color: TOKENS.domain.money.text }}>
          <strong style={{ fontWeight: 500 }}>What to invest in next:</strong> You have an offer from BD. Complete the negotiation prep module before your March 31 deadline.
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// SUB-SCREEN: MODULE DETAIL (Meeting Prep example)
// ============================================================
function ModuleDetailScreen({ onBack }) {
  const [activeSegment, setActiveSegment] = useState(0);
  const segments = [
    { title: "The 30-Minute Research Sprint", domain: "hired", duration: "5 min read + 25 min action", type: "lesson" },
    { title: "What to Say (and What They're Really Asking)", domain: "hired", duration: "8 min read + 10 min practice", type: "lesson" },
    { title: "After the Meeting: Follow Up Like a Pro", domain: "network", duration: "5 min read + 10 min action", type: "action" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div onClick={onBack} style={{ cursor: "pointer", color: "#6b7280" }}>{Icons.back}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>VESTIA</div>
      </div>

      <div>
        <Pill label="Getting Hired" bg={TOKENS.domain.hired.bg} text={TOKENS.domain.hired.text} />
        <div style={{ fontSize: 20, fontWeight: 500, color: "#111", marginTop: 8 }}>You Have a Meeting This Week</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Stage 1: Exploring · 3 segments · ~20 min total</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2, fontStyle: "italic" }}>
          How to walk in prepared, stand out, and follow up like a pro.
        </div>
      </div>

      {/* Segment Progress */}
      <div style={{ display: "flex", gap: 4 }}>
        {segments.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= activeSegment ? TOKENS.domain.hired.text : "#e2e2e2",
            cursor: "pointer",
          }} onClick={() => setActiveSegment(i)} />
        ))}
      </div>

      {/* Segment List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {segments.map((s, i) => {
          const d = TOKENS.domain[s.domain];
          const isActive = i === activeSegment;
          return (
            <Card key={i} onClick={() => setActiveSegment(i)}
              style={{ border: isActive ? `2px solid ${d.text}` : "0.5px solid #e2e2e2" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: i < activeSegment ? TOKENS.functional.action : isActive ? d.bg : "#f3f4f6",
                  color: i < activeSegment ? "#fff" : isActive ? d.text : "#9ca3af",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 500,
                }}>
                  {i < activeSegment ? Icons.check : i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>Segment {i + 1}: {s.title}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 4, fontSize: 11, color: "#6b7280" }}>
                    <Pill label={d.label} bg={d.bg} text={d.text} small />
                    <span>{s.duration}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Preview content area */}
      <Card style={{ background: "#fafafa", border: "none", minHeight: 120 }}>
        {activeSegment === 0 && (
          <div style={{ fontSize: 14, lineHeight: 1.6, color: "#374151" }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>The Five Things to Know Before Any Meeting</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              You don't need to become an expert on this company. You need to know enough to ask good questions and show that you did the work. Here's exactly what to look up and where to find it, in 30 minutes or less.
            </div>
            <div style={{ marginTop: 12, padding: "8px 12px", borderRadius: 8, background: "#fff", border: "0.5px solid #e2e2e2" }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: TOKENS.brand.teal, marginBottom: 4 }}>YOUR RESEARCH NOTES</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>Company name: _______________</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>What they do (2 sentences): _______________</div>
            </div>
          </div>
        )}
        {activeSegment === 1 && (
          <div style={{ fontSize: 14, lineHeight: 1.6, color: "#374151" }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>The 3-Sentence Formula</div>
            <div style={{ padding: "10px 12px", background: TOKENS.stage[2].bg, borderRadius: 8, fontSize: 13, color: TOKENS.stage[2].text }}>
              <div><strong>Sentence 1:</strong> Where you are now</div>
              <div><strong>Sentence 2:</strong> What you're interested in and why</div>
              <div><strong>Sentence 3:</strong> Why this company specifically</div>
            </div>
          </div>
        )}
        {activeSegment === 2 && (
          <div style={{ fontSize: 14, lineHeight: 1.6, color: "#374151" }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>The Same-Day Follow-Up</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              Within 2–4 hours of your meeting, send a thank-you email or LinkedIn message. The key is specificity — reference a real moment from the conversation.
            </div>
          </div>
        )}
      </Card>

      <button style={{
        width: "100%", padding: "14px", borderRadius: 12,
        background: TOKENS.brand.navy, color: "#fff", border: "none",
        fontSize: 15, fontWeight: 500, cursor: "pointer",
      }}>
        {activeSegment === 2 ? "Complete Module" : "Continue to Next Segment"}
      </button>
    </div>
  );
}

// ============================================================
// SUB-SCREEN: JOURNEY MAP
// ============================================================
function JourneyMapScreen({ onBack }) {
  const stages = [
    { n: 1, label: "Exploring", desc: "Figuring out what I want", status: "complete", duration: "Aug–Dec 2025" },
    { n: 2, label: "Landing", desc: "Active job search & first 90 days", status: "current", duration: "Jan 2026 – present" },
    { n: 3, label: "Building", desc: "Growing in my role, years 1–2", status: "future", duration: "" },
    { n: 4, label: "Advancing", desc: "Pushing for first management role", status: "future", duration: "" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div onClick={onBack} style={{ cursor: "pointer", color: "#6b7280" }}>{Icons.back}</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>VESTIA</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>Your Journey</div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
        Your career is an asset. Invest accordingly. Here's your path from exploring to leading.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {stages.map((s, i) => {
          const st = TOKENS.stage[s.n];
          const isCurrent = s.status === "current";
          const isComplete = s.status === "complete";
          return (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              {/* Timeline line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 24 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: isComplete ? TOKENS.functional.action : isCurrent ? st.text : "#e2e2e2",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 11, fontWeight: 500,
                  boxShadow: isCurrent ? `0 0 0 4px ${st.bg}` : "none",
                }}>
                  {isComplete ? Icons.check : s.n}
                </div>
                {i < stages.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 40, background: isComplete ? TOKENS.functional.action : "#e2e2e2" }} />
                )}
              </div>
              {/* Content */}
              <div style={{ paddingBottom: 20, flex: 1 }}>
                <Card style={{
                  background: isCurrent ? st.bg : "#fff",
                  border: isCurrent ? `1.5px solid ${st.text}40` : "0.5px solid #e2e2e2",
                }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: isCurrent ? st.text : "#111" }}>
                    Stage {s.n}: {s.label}
                  </div>
                  <div style={{ fontSize: 13, color: isCurrent ? st.text : "#6b7280", marginTop: 2, opacity: 0.8 }}>
                    {s.desc}
                  </div>
                  {s.duration && (
                    <div style={{ fontSize: 11, color: isCurrent ? st.text : "#9ca3af", marginTop: 4, opacity: 0.7 }}>
                      {s.duration}
                    </div>
                  )}
                  {isCurrent && (
                    <div style={{ marginTop: 8 }}>
                      <ProgressBar segments={2} color={st.text} height={5} />
                      <div style={{ fontSize: 11, color: st.text, marginTop: 4, opacity: 0.7 }}>Week 6 · 5 milestones vested</div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: ONBOARDING
// ============================================================
function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedNeeds, setSelectedNeeds] = useState([]);

  const stages = [
    { n: 1, label: "I'm still figuring out what I want to do", desc: "Exploring careers, industries, and options" },
    { n: 2, label: "I'm actively looking for a job or just started one", desc: "Applying, interviewing, or in my first weeks" },
    { n: 3, label: "I'm in my role and want to grow", desc: "Past 90 days, thinking about what's next" },
    { n: 4, label: "I'm ready to move into management", desc: "Pushing for first leadership promotion" },
  ];

  const needs = {
    1: ["Figuring out my direction", "Building my first resume", "Growing my network from zero", "Feeling less stuck"],
    2: ["Preparing for interviews", "Figuring out what to negotiate", "Building my professional network", "Feeling confident in a new role"],
    3: ["Getting visibility for my work", "Planning my next career move", "Finding a sponsor", "Negotiating a raise"],
    4: ["Building my case for promotion", "Developing leadership skills", "Navigating organizational politics", "Staying ambitious through setbacks"],
  };

  const steps = [
    // 0: Welcome
    () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 24, padding: "40px 20px", minHeight: 400 }}>
        <div style={{ fontSize: 28, fontWeight: 500, color: TOKENS.brand.navy, letterSpacing: "2px", textTransform: "uppercase" }}>VESTIA</div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#111", lineHeight: 1.4, maxWidth: 280 }}>
          A community of women building careers together.
        </div>
        <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5, maxWidth: 300 }}>
          Structured mentorship, career tracking, and peer community designed for a 10–20 year relationship with your career.
        </div>
        <div style={{ fontSize: 13, color: TOKENS.brand.gold, fontStyle: "italic" }}>
          Your career is an asset. Invest accordingly.
        </div>
        <button onClick={() => setStep(1)} style={{
          padding: "14px 48px", borderRadius: 12, background: TOKENS.brand.navy,
          color: "#fff", border: "none", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 8,
        }}>
          Let's get started
        </button>
      </div>
    ),
    // 1: Stage selection
    () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>Where are you?</div>
        <div style={{ fontSize: 14, color: "#6b7280" }}>Tap the one that fits best. You can always change this later.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {stages.map(s => {
            const st = TOKENS.stage[s.n];
            const selected = selectedStage === s.n;
            return (
              <Card key={s.n} onClick={() => setSelectedStage(s.n)} style={{
                background: selected ? st.bg : "#fff",
                border: selected ? `2px solid ${st.text}` : "0.5px solid #e2e2e2",
                cursor: "pointer",
              }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: selected ? st.text : "#f3f4f6",
                    color: selected ? "#fff" : "#9ca3af",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 500,
                  }}>
                    {s.n}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: selected ? st.text : "#111" }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: selected ? st.text : "#6b7280", marginTop: 2, opacity: 0.75 }}>{s.desc}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <button onClick={() => selectedStage && setStep(2)} disabled={!selectedStage} style={{
          padding: "14px", borderRadius: 12, width: "100%",
          background: selectedStage ? TOKENS.brand.navy : "#e2e2e2",
          color: selectedStage ? "#fff" : "#9ca3af", border: "none",
          fontSize: 15, fontWeight: 500, cursor: selectedStage ? "pointer" : "default",
        }}>
          Continue
        </button>
      </div>
    ),
    // 2: Needs selection
    () => {
      const options = needs[selectedStage] || needs[2];
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>What matters most right now?</div>
          <div style={{ fontSize: 14, color: "#6b7280" }}>Select 1–2 areas where you need the most support.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {options.map((need, i) => {
              const selected = selectedNeeds.includes(need);
              return (
                <Card key={i} onClick={() => {
                  setSelectedNeeds(prev =>
                    prev.includes(need) ? prev.filter(n => n !== need)
                    : prev.length < 2 ? [...prev, need] : [prev[1], need]
                  );
                }} style={{
                  cursor: "pointer",
                  background: selected ? TOKENS.stage[selectedStage].bg : "#fff",
                  border: selected ? `2px solid ${TOKENS.stage[selectedStage].text}` : "0.5px solid #e2e2e2",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                      background: selected ? TOKENS.stage[selectedStage].text : "#fff",
                      border: selected ? "none" : "2px solid #d1d5db",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                    }}>
                      {selected && Icons.check}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: selected ? 500 : 400, color: "#111" }}>{need}</span>
                  </div>
                </Card>
              );
            })}
          </div>
          <button onClick={() => selectedNeeds.length > 0 && setStep(3)} disabled={selectedNeeds.length === 0} style={{
            padding: "14px", borderRadius: 12, width: "100%",
            background: selectedNeeds.length > 0 ? TOKENS.brand.navy : "#e2e2e2",
            color: selectedNeeds.length > 0 ? "#fff" : "#9ca3af", border: "none",
            fontSize: 15, fontWeight: 500, cursor: selectedNeeds.length > 0 ? "pointer" : "default",
          }}>
          Continue
          </button>
        </div>
      );
    },
    // 3: Cohort + Completion
    () => {
      const st = TOKENS.stage[selectedStage || 2];
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 20, padding: "24px 0", minHeight: 380 }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%", background: st.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: st.text, fontSize: 24,
          }}>
            {Icons.fire}
          </div>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>You're in.</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            <Pill label={`Stage ${selectedStage}: ${TOKENS.stage[selectedStage]?.label}`} bg={st.bg} text={st.text} />
          </div>
          <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5, maxWidth: 280 }}>
            You've been added to the <strong style={{ fontWeight: 500 }}>Spring 2026 Cohort</strong> — 18 women at a similar stage. Your first check-in is Thursday at 7 PM.
          </div>
          <div style={{ display: "flex", gap: -4, marginTop: 4 }}>
            {["Claire C", "Dylan D", "Wendy G", "Clarissa R", "Audrey F"].map((n, i) => (
              <div key={i} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 5 - i }}>
                <Avatar name={n} size={32} color={[TOKENS.brand.teal, TOKENS.brand.coral, TOKENS.brand.gold, TOKENS.brand.navy, "#7C3AED"][i]} />
              </div>
            ))}
          </div>
          <button onClick={onComplete} style={{
            padding: "14px 48px", borderRadius: 12, background: TOKENS.brand.navy,
            color: "#fff", border: "none", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 8,
          }}>
            Go to your dashboard
          </button>
        </div>
      );
    },
  ];

  return (
    <div>
      {step > 0 && step < 3 && (
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? TOKENS.brand.navy : "#e2e2e2" }} />
          ))}
        </div>
      )}
      {steps[step]()}
    </div>
  );
}

// ============================================================
// DEMO BANNER
// ============================================================
function DemoBanner({ showOnboarding, setShowOnboarding }) {
  return (
    <div style={{
      background: TOKENS.brand.navy, color: "#fff", padding: "8px 16px",
      fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <span style={{ opacity: 0.8 }}>Vestia Demo · Persona: Cindy Herd, Stage 2</span>
      <button onClick={() => setShowOnboarding(!showOnboarding)} style={{
        background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
        padding: "4px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontWeight: 500,
      }}>
        {showOnboarding ? "Dashboard" : "Onboarding"}
      </button>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function VestiaDemo() {
  const [tab, setTab] = useState("home");
  const [subScreen, setSubScreen] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [tab, subScreen, showOnboarding]);

  const tabs = [
    { key: "home", label: "Home", icon: Icons.home },
    { key: "explore", label: "Explore", icon: Icons.explore },
    { key: "network", label: "Network", icon: Icons.network },
    { key: "messages", label: "Messages", icon: Icons.messages },
    { key: "settings", label: "Profile", icon: Icons.settings },
  ];

  const renderScreen = () => {
    if (showOnboarding) {
      return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
    }
    if (subScreen === "goal-detail") return <GoalDetailScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === "module-detail") return <ModuleDetailScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === "job-tracker") return <JobTrackerScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === "journey") return <JourneyMapScreen onBack={() => setSubScreen(null)} />;
    switch (tab) {
      case "home": return <HomeScreen setTab={(t) => { setTab(t); setSubScreen(null); }} setSubScreen={setSubScreen} />;
      case "explore": return <ExploreScreen setSubScreen={setSubScreen} />;
      case "network": return <NetworkScreen setSubScreen={setSubScreen} />;
      case "messages": return <MessagesScreen setSubScreen={setSubScreen} />;
      case "settings": return <SettingsScreen setSubScreen={setSubScreen} />;
      default: return null;
    }
  };

  return (
    <div style={{
      maxWidth: 430, margin: "0 auto", minHeight: "100vh",
      background: "#f8f8f8", display: "flex", flexDirection: "column",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      position: "relative",
    }}>
      {/* Demo Banner */}
      <DemoBanner showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} />

      {/* Screen Content */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: "auto", padding: "20px 20px 80px",
        WebkitOverflowScrolling: "touch",
      }}>
        {renderScreen()}
      </div>

      {/* Tab Bar */}
      {!showOnboarding && (
        <div style={{
          position: "sticky", bottom: 0, background: "#fff",
          borderTop: "0.5px solid #e2e2e2",
          display: "flex", justifyContent: "space-around", alignItems: "center",
          height: 56, paddingBottom: "env(safe-area-inset-bottom, 0px)",
          zIndex: 50,
        }}>
          {tabs.map(t => {
            const isActive = !subScreen && tab === t.key;
            return (
              <div key={t.key} onClick={() => { setTab(t.key); setSubScreen(null); }} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                cursor: "pointer", opacity: isActive ? 1 : 0.4,
                transition: "opacity 0.2s",
              }}>
                <span style={{ color: "#111" }}>{t.icon}</span>
                <span style={{ fontSize: 10, fontWeight: isActive ? 500 : 400, color: "#111" }}>{t.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
