// ---------- primitives ----------
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// scroll reveal: any element with .reveal class fades in when in view
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    // anything already in view OR near the top becomes visible immediately
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95) el.classList.add("in");
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ornament — the "A" mark
const AmanoMark = ({ size = 28, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{display:"block"}} aria-hidden>
    <path d="M6 34 L20 6 L34 34" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/>
    <path d="M12 24 L28 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="2.2" fill={color}/>
  </svg>
);

const Wordmark = ({ variant = "serif" }) => {
  if (variant === "geo") {
    return (
      <span className="wordmark" style={{fontFamily:"var(--display)", fontWeight:600, letterSpacing:"-0.04em"}}>
        amano<span className="dot">.</span>
      </span>
    );
  }
  if (variant === "mark") {
    return (
      <span style={{display:"inline-flex", alignItems:"center", gap:10}}>
        <AmanoMark size={26} color="var(--terra)"/>
        <span className="wordmark" style={{fontSize:22}}>Amano</span>
      </span>
    );
  }
  // serif (default)
  return (
    <span className="wordmark">
      <span style={{fontStyle:"italic"}}>A</span>mano<span className="dot">.</span>
    </span>
  );
};

// decorative image placeholder — subtly striped
const ImgPlaceholder = ({ label, ratio = "4/3", tone = "warm", overlayText, style }) => {
  const bg = tone === "warm"
    ? "linear-gradient(135deg, #E8D5B2 0%, #D4B890 40%, #B8946A 100%)"
    : tone === "sea"
      ? "linear-gradient(135deg, #B8D4D0 0%, #7FAEA8 100%)"
      : "linear-gradient(135deg, #E8DFC9 0%, #C9B891 100%)";
  return (
    <div style={{
      position: "relative",
      aspectRatio: ratio,
      background: bg,
      borderRadius: 6,
      overflow: "hidden",
      ...style,
    }}>
      <div style={{
        position:"absolute", inset:0,
        backgroundImage: "repeating-linear-gradient(135deg, rgba(0,0,0,.03) 0 6px, transparent 6px 14px)",
      }}/>
      <div style={{
        position:"absolute", inset:0, display:"grid", placeItems:"center",
        color:"rgba(30,20,10,.55)", fontFamily:"var(--mono)", fontSize:11, letterSpacing:".14em", textTransform:"uppercase",
      }}>
        {label}
      </div>
      {overlayText && (
        <div style={{
          position:"absolute", left:18, bottom:16,
          color:"#fff", fontFamily:"var(--serif)", fontSize:22, textShadow:"0 1px 10px rgba(0,0,0,.25)"
        }}>{overlayText}</div>
      )}
    </div>
  );
};

// button
const Btn = ({ children, variant = "solid", href, onClick, icon = true, style }) => {
  const cls = variant === "ghost" ? "btn btn-ghost" : variant === "terra" ? "btn btn-terra" : "btn";
  const inner = (
    <>
      <span>{children}</span>
      {icon && <span className="arrow" aria-hidden>↗</span>}
    </>
  );
  if (href) return <a className={cls} href={href} style={style} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>;
  return <button className={cls} onClick={onClick} style={style}>{inner}</button>;
};

// nav
function Nav({ audience, setAudience }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" style={{textDecoration:"none"}}>
          <Wordmark variant="serif"/>
        </a>
        <nav className="nav-links" aria-label="primary">
          <a href="#why">Why Amano</a>
          <a href="#services">Services</a>
          <a href="#map">Map</a>
          <a href="#properties">Properties</a>
          <a href="#founders">Founders</a>
        </nav>
        <div style={{display:"flex", gap:10, alignItems:"center"}}>
          <div style={{display:"inline-flex", padding:3, borderRadius:999, border:"1px solid var(--line)", borderColor:"color-mix(in oklab, var(--fg) 18%, transparent)"}}>
            <button
              className="chip"
              onClick={() => setAudience("owners")}
              style={{
                border:"none", padding:"6px 12px",
                background: audience==="owners" ? "var(--navy)" : "transparent",
                color: audience==="owners" ? "var(--ivory)" : "var(--fg)"
              }}>Owners</button>
            <button
              className="chip"
              onClick={() => setAudience("guests")}
              style={{
                border:"none", padding:"6px 12px",
                background: audience==="guests" ? "var(--navy)" : "transparent",
                color: audience==="guests" ? "var(--ivory)" : "var(--fg)"
              }}>Guests</button>
          </div>
          <Btn href="#contact" icon={false} style={{whiteSpace:"nowrap"}}>{audience==="owners" ? "List with us" : "Stay with us"}</Btn>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { useReveal, AmanoMark, Wordmark, ImgPlaceholder, Btn, Nav });
