// ---------- founders ----------

// hand-scribbled "signature" paths for each founder
function Signature({ seed = 0, color = "var(--navy)" }) {
  const paths = [
    "M 6 36 Q 20 6 40 18 Q 55 28 72 14 Q 88 2 100 20 Q 108 30 118 22",
    "M 8 30 Q 18 12 34 22 Q 50 32 60 12 Q 74 -2 92 16 Q 108 32 124 18",
    "M 10 32 Q 24 8 38 24 Q 52 40 66 22 Q 82 6 96 22 Q 110 36 122 20",
  ];
  const d = paths[seed % paths.length];
  return (
    <svg viewBox="0 0 130 44" width="140" height="48" style={{display:"block"}}>
      <path d={d} stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round"
            style={{filter:"drop-shadow(0 1px 0 rgba(0,0,0,.04))"}}/>
      <path d="M 20 38 Q 35 42 58 38" stroke={color} strokeWidth="1" fill="none" opacity=".6"/>
    </svg>
  );
}

function Founders() {
  return (
    <section id="founders" className="section" style={{background:"var(--paper)", borderTop:"1px solid var(--line)", borderBottom:"1px solid var(--line)"}}>
      <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1.2fr", gap: 80, alignItems:"start"}}>
        <div className="reveal">
          <div className="eyebrow">Founders' note</div>
          <h2 className="display" style={{fontSize:"clamp(40px,5vw,68px)", margin:"16px 0 0"}}>
            Thank you <span className="serif">for trusting us</span> with your property.
          </h2>
        </div>
        <div className="reveal">
          <p style={{fontSize:19, lineHeight:1.55, margin:"0 0 22px", textWrap:"pretty"}}>
            We are committed to enhancing property management through innovation and care.
            Our focus is on ensuring exceptional experiences for both property owners and guests —
            and on driving real value for your investments.
          </p>
          <p style={{fontSize:16, lineHeight:1.6, color:"color-mix(in oklab, var(--fg) 78%, transparent)", margin:"0 0 40px"}}>
            Amano exists at the intersection of technology and hospitality. We built the tools we wish
            we had as operators, and we bring the human touch we've always believed in.
          </p>

          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: 28, marginTop: 32}}>
            {FOUNDERS.map((f, i) => (
              <div key={f.name}>
                <Signature seed={i} color="var(--navy)"/>
                <div style={{fontFamily:"var(--display)", fontSize:18, fontWeight:500, marginTop:10, letterSpacing:"-.01em"}}>{f.name}</div>
                <div className="kicker" style={{marginTop:4}}>{f.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Founders, Signature });
