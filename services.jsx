// ---------- services ----------

function Services() {
  const [active, setActive] = React.useState(0);
  return (
    <section id="services" className="section">
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom: 56}}>
          <div className="reveal">
            <div className="eyebrow">Services</div>
            <h2 className="display" style={{fontSize:"clamp(40px, 5vw, 72px)", margin:"16px 0 0"}}>
              Everything it takes,<br/>
              <span className="serif">none of the weight.</span>
            </h2>
          </div>
          <div className="reveal" style={{maxWidth: 360, color:"color-mix(in oklab, var(--fg) 72%, transparent)", paddingBottom:8}}>
            Five systems, one team. Each runs in the background so owners can be owners and guests can be guests.
          </div>
        </div>

        <div className="reveal" style={{
          display:"grid", gridTemplateColumns:"1fr 1fr", gap: 0,
          border:"1px solid var(--line)", borderColor:"color-mix(in oklab, var(--fg) 14%, transparent)",
          borderRadius: 12, overflow:"hidden", background:"var(--paper)",
        }}>
          <div>
            {SERVICES.map((s, i) => (
              <button
                key={s.k}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                style={{
                  width:"100%", textAlign:"left", padding:"28px 28px",
                  background: active===i ? "var(--ivory)" : "transparent",
                  border:"none", borderBottom:"1px solid var(--line)",
                  cursor:"pointer", display:"grid", gridTemplateColumns:"48px 1fr 20px", alignItems:"center", gap:14,
                  color: "var(--fg)",
                  transition:"background .2s",
                }}>
                <span className="kicker" style={{color: active===i ? "var(--terra)" : "var(--muted)"}}>{s.k}</span>
                <span style={{fontFamily:"var(--display)", fontSize:22, fontWeight:500, letterSpacing:"-0.015em"}}>{s.title}</span>
                <span style={{opacity: active===i ? 1 : .3, color:"var(--terra)"}}>→</span>
              </button>
            ))}
          </div>
          <div style={{
            padding:"48px", background:"var(--ivory)",
            borderLeft:"1px solid var(--line)",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
            minHeight: 440,
          }}>
            <div>
              <div className="kicker" style={{color:"var(--terra)", marginBottom:16}}>{SERVICES[active].k} / 05</div>
              <h3 className="display" style={{fontSize:34, margin:"0 0 20px", letterSpacing:"-.02em", fontWeight:500}}>
                {SERVICES[active].title}
              </h3>
              <p style={{fontSize:17, lineHeight:1.6, color:"color-mix(in oklab, var(--fg) 82%, transparent)", margin:0, textWrap:"pretty"}}>
                {SERVICES[active].body}
              </p>
            </div>
            <div style={{marginTop:32, display:"flex", gap:24, paddingTop:24, borderTop:"1px solid var(--line)"}}>
              {/* service stat vignettes */}
              {[
                ["< 3 min", "avg reply time"],
                ["+27%", "RevPAR lift"],
                ["Live", "owner dashboard"],
              ].map(([a,b], i) => (
                <div key={i}>
                  <div style={{fontFamily:"var(--display)", fontSize:22, fontWeight:500}}>{a}</div>
                  <div className="kicker" style={{marginTop:2}}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Concierge() {
  return (
    <section id="concierge" className="section" style={{paddingTop: 0}}>
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom: 40, gap: 32, flexWrap:"wrap"}}>
          <div className="reveal" style={{maxWidth: 640}}>
            <div className="eyebrow">For guests · Concierge</div>
            <h2 className="display" style={{fontSize:"clamp(32px, 4vw, 56px)", margin:"16px 0 0", letterSpacing:"-0.02em"}}>
              A little extra,<br/>
              <span className="serif">entirely on island time.</span>
            </h2>
          </div>
          <div className="reveal" style={{maxWidth: 360, color:"color-mix(in oklab, var(--fg) 72%, transparent)", paddingBottom:8}}>
            Ask once at check-in and we'll arrange the rest. Add-ons billed directly — no markups, no guesswork.
          </div>
        </div>

        <div className="reveal" style={{
          display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 20,
        }}>
          {CONCIERGE.map((c) => (
            <article key={c.k} style={{
              border:"1px solid color-mix(in oklab, var(--fg) 14%, transparent)",
              borderRadius: 14, padding: "28px 26px 26px",
              background:"var(--paper)",
              display:"flex", flexDirection:"column", gap: 14,
              minHeight: 260,
            }}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <span style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background:"var(--terra)", color:"var(--paper)",
                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"var(--display)", fontSize: 15, fontWeight: 500,
                }}>{c.k}</span>
                <span className="kicker" style={{color:"var(--muted)"}}>{c.tag}</span>
              </div>
              <h3 className="display" style={{fontSize: 26, margin: "4px 0 0", letterSpacing:"-0.018em", fontWeight: 500}}>
                {c.title}
              </h3>
              <p style={{fontSize: 15.5, lineHeight: 1.55, color:"color-mix(in oklab, var(--fg) 80%, transparent)", margin: 0, textWrap:"pretty"}}>
                {c.body}
              </p>
              <div style={{marginTop:"auto", paddingTop: 16, borderTop:"1px solid color-mix(in oklab, var(--fg) 10%, transparent)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <span className="kicker" style={{color:"var(--muted)"}}>Request via WhatsApp</span>
                <span style={{color:"var(--terra)", fontSize: 18}}>→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Services, Concierge });
