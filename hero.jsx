// ---------- hero ----------
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

// --- 3D villa variant: isometric SVG villa floating with palms
function IsoVilla() {
  const ref = useRefH(null);
  useEffectH(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const mx = (e.clientX - r.left - r.width/2) / r.width;
      const my = (e.clientY - r.top - r.height/2) / r.height;
      ref.current.style.setProperty("--tx", mx);
      ref.current.style.setProperty("--ty", my);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} style={{
      position:"relative", width:"100%", aspectRatio:"1/1",
      transform:"perspective(1400px) rotateX(calc(var(--ty,0) * -4deg)) rotateY(calc(var(--tx,0) * 6deg))",
      transition: "transform .3s ease-out",
    }}>
      <svg viewBox="0 0 520 520" width="100%" height="100%" style={{overflow:"visible"}}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--sand)"/>
            <stop offset="1" stopColor="var(--paper)"/>
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B8D9D2"/>
            <stop offset="1" stopColor="#7CB6AC"/>
          </linearGradient>
          <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--terra)"/>
            <stop offset="1" stopColor="var(--terra-2)"/>
          </linearGradient>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FAF4E6"/>
            <stop offset="1" stopColor="#E9DDC2"/>
          </linearGradient>
          <linearGradient id="wallside" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E7D9BB"/>
            <stop offset="1" stopColor="#C9B890"/>
          </linearGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12"/>
          </filter>
        </defs>

        {/* platform shadow */}
        <ellipse cx="260" cy="440" rx="210" ry="36" fill="rgba(20,12,0,.12)" filter="url(#soft)"/>

        {/* isometric island tile */}
        <g>
          <polygon points="260,160 470,280 260,400 50,280" fill="var(--sand)" stroke="rgba(0,0,0,.08)"/>
          <polygon points="260,400 50,280 50,310 260,430" fill="#D8C69D"/>
          <polygon points="260,400 470,280 470,310 260,430" fill="#C0AB7E"/>
        </g>

        {/* pool */}
        <g>
          <polygon points="260,300 380,230 400,240 280,310" fill="url(#water)" stroke="rgba(0,0,0,.12)" strokeWidth=".6"/>
          <polyline points="290,295 370,248" stroke="rgba(255,255,255,.55)" strokeWidth="1" fill="none"/>
        </g>

        {/* villa base */}
        <g>
          {/* side wall */}
          <polygon points="160,285 260,227 260,320 160,378" fill="url(#wallside)"/>
          {/* front wall */}
          <polygon points="260,227 360,285 360,378 260,320" fill="url(#wall)"/>
          {/* windows front */}
          <polygon points="280,265 300,276 300,308 280,296" fill="#2E505A" opacity=".85"/>
          <polygon points="318,286 338,298 338,330 318,318" fill="#2E505A" opacity=".85"/>
          {/* door */}
          <polygon points="263,302 275,309 275,342 263,335" fill="#1F2E36"/>
          {/* roof */}
          <polygon points="150,285 260,220 260,190 150,250" fill="url(#roof)" opacity=".95"/>
          <polygon points="260,220 370,285 370,250 260,190" fill="var(--terra-2)" />
          <polyline points="260,190 260,220" stroke="rgba(0,0,0,.25)"/>
        </g>

        {/* little palm trees */}
        {[{x:420, y:260, s:1}, {x:90, y:300, s:0.9}, {x:130, y:210, s:0.75}].map((p, i) => (
          <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s})`}>
            <path d="M0 0 Q-2 -30 -4 -60" stroke="#5B3A1C" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M-4 -60 Q-20 -68 -34 -60" stroke="#2E7A4A" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M-4 -60 Q 10 -70 24 -58" stroke="#357F4F" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M-4 -60 Q -10 -82 -20 -92" stroke="#3B8852" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M-4 -60 Q 6 -82 20 -94" stroke="#2F7245" strokeWidth="5" fill="none" strokeLinecap="round"/>
          </g>
        ))}

        {/* floating sun */}
        <circle cx="400" cy="110" r="40" fill="var(--terra)" opacity=".15"/>
        <circle cx="400" cy="110" r="24" fill="var(--terra)" opacity=".3"/>
        <circle cx="400" cy="110" r="10" fill="var(--terra)"/>

        {/* compass mark (brand) */}
        <g transform="translate(80,120)" opacity=".9">
          <circle r="22" fill="none" stroke="var(--navy)" strokeWidth="1"/>
          <path d="M0 -18 L3 0 L0 18 L-3 0 Z" fill="var(--navy)"/>
          <circle r="2" fill="var(--terra)"/>
        </g>
      </svg>
    </div>
  );
}

// --- orbit variant: floating abstract geometric objects
function OrbitScene() {
  const ref = useRefH(null);
  useEffectH(() => {
    let raf, t = 0;
    const tick = () => {
      t += 0.006;
      if (ref.current) {
        ref.current.style.setProperty("--t", t);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div ref={ref} style={{position:"relative", width:"100%", aspectRatio:"1/1"}}>
      <style>{`
        .orbitObj { transform-origin: 50% 50%; }
      `}</style>
      <svg viewBox="0 0 520 520" width="100%" height="100%" style={{overflow:"visible"}}>
        <defs>
          <radialGradient id="ball" cx=".35" cy=".35" r=".7">
            <stop offset="0" stopColor="#fff"/>
            <stop offset=".5" stopColor="var(--terra)"/>
            <stop offset="1" stopColor="var(--terra-2)"/>
          </radialGradient>
        </defs>
        <circle cx="260" cy="260" r="200" fill="none" stroke="var(--line)"/>
        <circle cx="260" cy="260" r="140" fill="none" stroke="var(--line)"/>
        <circle cx="260" cy="260" r="90" fill="none" stroke="var(--line)"/>
        <g style={{transform:"translate(260px,260px) rotate(calc(var(--t,0) * 40deg))"}}>
          <circle r="80" fill="url(#ball)"/>
        </g>
        <g style={{transform:"translate(410px,260px) rotate(calc(var(--t,0) * -80deg))"}}>
          <rect x="-22" y="-22" width="44" height="44" fill="var(--navy)" transform="rotate(45)"/>
        </g>
        <g style={{transform:"translate(120px,180px) rotate(calc(var(--t,0) * 60deg))"}}>
          <polygon points="0,-26 24,14 -24,14" fill="var(--sea)"/>
        </g>
        <g style={{transform:"translate(160px,380px) rotate(calc(var(--t,0) * -40deg))"}}>
          <circle r="22" fill="none" stroke="var(--navy)" strokeWidth="2"/>
        </g>
      </svg>
    </div>
  );
}

function Hero({ audience, heroVariant }) {
  const owner = audience === "owners";
  const useScene = heroVariant === "scene" || heroVariant === "villa";
  return (
    <section id="top" style={{position:"relative", minHeight: "92vh", paddingTop: 40, paddingBottom: 80, overflow:"hidden"}}>
      {useScene && <PuntaCanaScene/>}
      <div className="container" style={{position:"relative", zIndex:30, display:"grid", gridTemplateColumns: heroVariant==="orbit" ? "1.1fr .9fr" : "1fr", gap: 64, alignItems:"center", minHeight:"82vh", paddingTop: 40}}>
        <div style={{maxWidth: 760}}>
          <div className="tag reveal" style={{marginBottom:24}}>
            <span className="dot"/> Punta Cana · Dominican Republic
          </div>
          <h1 className="display reveal" style={{fontSize:"clamp(54px, 7vw, 112px)", margin:"0 0 28px"}}>
            {owner ? (
              <>Your property,<br/><span className="serif" style={{color:"var(--terra)"}}>working for you.</span></>
            ) : (
              <>Stays that feel<br/><span className="serif" style={{color:"var(--terra)"}}>like a second home.</span></>
            )}
          </h1>
          <p className="reveal" style={{fontSize:19, lineHeight:1.5, maxWidth:520, color:"color-mix(in oklab, var(--fg) 78%, transparent)", margin:"0 0 36px"}}>
            {owner
              ? "Amano blends AI-driven pricing, reservations, and guest care with a local team on the ground in Punta Cana. Higher occupancy, happier guests, clearer numbers."
              : "Handpicked villas, condos, and lofts across the Dominican Republic — managed with the kind of quiet care that turns a stay into a story."}
          </p>
          <div className="reveal" style={{display:"flex", gap:12, flexWrap:"wrap"}}>
            <Btn href="#contact">{owner ? "List your property" : "Browse stays"}</Btn>
            <Btn href="#map" variant="ghost">{owner ? "See the market" : "Find a neighborhood"}</Btn>
          </div>

          {/* micro-stats under hero */}
          <div className="reveal" style={{display:"flex", gap:36, marginTop:56, paddingTop: 28, borderTop:"1px solid var(--line)"}}>
            {[
              { k:"4.94★", v:"avg rating" },
              { k:"90%",   v:"response rate" },
              { k:"300+",  v:"stays hosted" },
            ].map((s,i) => (
              <div key={i}>
                <div className="display" style={{fontSize:30, letterSpacing:"-.02em"}}>{s.k}</div>
                <div className="kicker" style={{marginTop:4}}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {heroVariant === "orbit" && (
          <div className="reveal" style={{position:"relative"}}>
            <OrbitScene/>
          </div>
        )}
      </div>
    </section>
  );
}

// Why Amano — editorial section
function WhyAmano({ audience }) {
  const owner = audience === "owners";
  return (
    <section id="why" className="section" style={{background:"var(--paper)", borderTop:"1px solid var(--line)", borderBottom:"1px solid var(--line)"}}>
      <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:80, alignItems:"start"}}>
        <div className="reveal" style={{position:"sticky", top:100}}>
          <div className="eyebrow">Why Amano</div>
          <h2 className="display" style={{fontSize:"clamp(40px, 5vw, 72px)", margin:"16px 0 0"}}>
            Tech-driven,<br/><span className="serif">human-touched.</span>
          </h2>
        </div>
        <div className="reveal">
          <p style={{fontSize:22, lineHeight:1.5, margin:"0 0 28px", color:"var(--fg)", textWrap:"pretty"}}>
            Most companies fail to understand how technology and automation can be leveraged to
            <em className="serif" style={{color:"var(--terra)"}}> truly </em>
            enhance the human experience.
          </p>
          <p style={{fontSize:17, lineHeight:1.65, margin:"0 0 28px", color:"color-mix(in oklab, var(--fg) 82%, transparent)"}}>
            At Amano, we harness AI to ensure a superior journey for both property owners and their guests — while
            maximizing revenue and creating an environment where investors can flourish.
          </p>
          <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:24, marginTop:40}}>
            {[
              owner ? ["Revenue, compounded", "Dynamic pricing, optimized listings, and tight ops raise every line on your P&L."] :
                      ["A stay, not a checklist", "Thoughtful arrivals, hotel-grade linens, and a local team that actually answers."],
              owner ? ["Hands-off ownership", "Cleaning, maintenance, support, and communication — handled, with live dashboards."] :
                      ["Every corner, guest-ready", "Smart scheduling means the house is as welcoming on day six as it was at check-in."],
              owner ? ["Direct payments", "You're added to the rental platform and paid directly. No middle month-end statements."] :
                      ["Lightning-fast answers", "Integrated platforms with automated alerts mean replies in minutes, not hours."],
              owner ? ["Market-local insight", "Neighborhood-level data — demand, seasonality, comparables — drives every decision."] :
                      ["Local knowledge, baked in", "Restaurants, beaches, logistics — the stuff a good neighbor tells you over coffee."],
            ].map(([title, body], i) => (
              <div key={i} style={{paddingTop:20, borderTop:"1px solid var(--line)"}}>
                <div className="kicker" style={{marginBottom:8}}>{`0${i+1}`}</div>
                <div style={{fontFamily:"var(--display)", fontSize:18, fontWeight:500, letterSpacing:"-.01em", marginBottom:6}}>{title}</div>
                <div style={{fontSize:14, lineHeight:1.55, color:"color-mix(in oklab, var(--fg) 72%, transparent)"}}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, WhyAmano, IsoVilla, OrbitScene });
