// ---------- social: stats + testimonials + superhost ----------

function Social() {
  return (
    <section className="section" style={{background:"var(--navy)", color:"var(--ivory)"}}>
      <div className="container">
        <div className="reveal" style={{display:"grid", gridTemplateColumns:"1.1fr .9fr", gap: 80, alignItems:"center"}}>
          <div>
            <div className="eyebrow" style={{color:"#C9B991"}}>Airbnb Superhost</div>
            <h2 className="display" style={{fontSize:"clamp(46px,6vw,92px)", margin:"16px 0 24px", letterSpacing:"-.03em"}}>
              Eight years.<br/>
              <span className="serif" style={{color:"#E08452"}}>Three hundred stays.</span><br/>
              Zero compromises.
            </h2>
            <p style={{fontSize:17, lineHeight:1.6, color:"color-mix(in oklab, var(--ivory) 78%, transparent)", maxWidth: 500}}>
              Before Amano was a company, it was a quiet obsession with hospitality.
              The numbers are the proof — but the details are the point.
            </p>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:"color-mix(in oklab, var(--ivory) 10%, transparent)", border:"1px solid color-mix(in oklab, var(--ivory) 14%, transparent)", borderRadius:12, overflow:"hidden"}}>
            {STATS.map((s,i) => (
              <div key={i} style={{background:"var(--navy)", padding:"40px 32px"}}>
                <div style={{fontFamily:"var(--display)", fontSize:60, fontWeight:500, letterSpacing:"-.03em", lineHeight:1}}>{s.k}</div>
                <div className="kicker" style={{marginTop:10, color:"#C9B991"}}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* testimonials */}
        <div className="reveal" style={{marginTop: 100, paddingTop: 60, borderTop:"1px solid color-mix(in oklab, var(--ivory) 15%, transparent)"}}>
          <div className="eyebrow" style={{color:"#C9B991"}}>What owners say</div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: 32, marginTop: 40}}>
            {TESTIMONIALS.map((t,i) => (
              <figure key={i} style={{margin:0, paddingRight: 12}}>
                <div style={{color:"var(--terra)", fontSize:40, fontFamily:"var(--serif)", lineHeight:0, marginBottom:14}}>“</div>
                <blockquote style={{margin:0, fontFamily:"var(--display)", fontSize:22, lineHeight:1.35, letterSpacing:"-.015em", fontWeight:400, textWrap:"pretty"}}>
                  {t.quote}
                </blockquote>
                <figcaption style={{marginTop:20, fontSize:13, color:"color-mix(in oklab, var(--ivory) 70%, transparent)"}}>
                  <div style={{fontWeight:600, color:"var(--ivory)"}}>{t.name}</div>
                  <div className="kicker" style={{marginTop:2}}>{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Social });
