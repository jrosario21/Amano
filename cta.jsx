// ---------- CTA / contact form ----------

function CTA({ audience }) {
  const owner = audience === "owners";
  const [form, setForm] = React.useState({
    name: "", email: "", propertyType: "villa", location: "cap-cana", bedrooms: 3, goals: ""
  });
  const [sent, setSent] = React.useState(false);
  const [focused, setFocused] = React.useState(null);

  const field = (k) => ({
    value: form[k],
    onChange: (e) => setForm(s => ({...s, [k]: e.target.value})),
    onFocus: () => setFocused(k),
    onBlur: () => setFocused(null),
    style: {
      width:"100%", background:"transparent", border:"none",
      borderBottom: "1px solid " + (focused===k ? "var(--terra)" : "color-mix(in oklab, var(--ivory) 30%, transparent)"),
      padding:"14px 0", fontSize:17, color:"var(--ivory)",
      fontFamily:"var(--body)", outline:"none",
      transition:"border-color .2s"
    }
  });

  return (
    <section id="contact" className="section" style={{background:"var(--ink)", color:"var(--ivory)", position:"relative", overflow:"hidden"}}>
      {/* decorative corner accent */}
      <div aria-hidden style={{position:"absolute", right:-120, top:-80, width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle, var(--terra) 0%, transparent 60%)", opacity:.25}}/>
      <div aria-hidden style={{position:"absolute", left:-80, bottom:-80, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, var(--sea) 0%, transparent 60%)", opacity:.2}}/>

      <div className="container" style={{position:"relative", display:"grid", gridTemplateColumns:"1fr 1fr", gap: 80, alignItems:"start"}}>
        <div className="reveal">
          <div className="eyebrow" style={{color:"#C9B991"}}>Let's get started</div>
          <h2 className="display" style={{fontSize:"clamp(48px,6vw,96px)", margin:"16px 0 28px", letterSpacing:"-.03em"}}>
            Your property<br/>should work <span className="serif" style={{color:"#E08452"}}>for you,</span><br/>not the other way around.
          </h2>
          <p style={{fontSize:17, lineHeight:1.6, maxWidth: 440, color:"color-mix(in oklab, var(--ivory) 78%, transparent)", marginBottom: 40}}>
            {owner
              ? "Share a few details and we'll come back within 24 hours with a revenue estimate and a plan tailored to your property."
              : "Tell us what kind of stay you're looking for and we'll match you with a home — and the local team to take care of you."}
          </p>

          <div style={{display:"flex", flexDirection:"column", gap:18, marginTop:40, fontSize:14}}>
            <a href="https://api.whatsapp.com/send/?phone=16462392656&text&type=phone_number&app_absent=0"
               target="_blank" rel="noreferrer"
               style={{display:"inline-flex", alignItems:"center", gap:12, color:"var(--ivory)", textDecoration:"none", padding:"14px 18px", border:"1px solid color-mix(in oklab, var(--ivory) 25%, transparent)", borderRadius:999, alignSelf:"flex-start", transition:"background .2s"}}
               onMouseEnter={e => e.currentTarget.style.background = "color-mix(in oklab, var(--ivory) 6%, transparent)"}
               onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4a10 10 0 00-16 12l-2 6 6-2a10 10 0 0012-16zM12 20a8 8 0 01-4-1l-3 1 1-3a8 8 0 1110-8 8 8 0 01-4 11zm4-6c0 1-1 2-2 2s-4-1-6-4-2-5-1-6 2-1 2 0 1 2 1 2-1 1 0 2 2 2 3 2 1 0 2 0 1 1 1 2z"/></svg>
              WhatsApp: +1 (646) 239-2656
            </a>
            <div style={{fontFamily:"var(--mono)", fontSize:11, letterSpacing:".14em", textTransform:"uppercase", color:"color-mix(in oklab, var(--ivory) 55%, transparent)"}}>
              Punta Cana · Dominican Republic
            </div>
          </div>
        </div>

        <div className="reveal" style={{background:"color-mix(in oklab, var(--ivory) 5%, transparent)", border:"1px solid color-mix(in oklab, var(--ivory) 12%, transparent)", borderRadius:16, padding:40}}>
          {sent ? (
            <div style={{padding:"40px 0"}}>
              <div className="kicker" style={{color:"#E08452", marginBottom:14}}>Sent</div>
              <h3 className="display" style={{fontSize:32, margin:"0 0 12px", fontWeight:500}}>Thanks, {form.name.split(" ")[0] || "friend"}.</h3>
              <p style={{color:"color-mix(in oklab, var(--ivory) 78%, transparent)"}}>
                We'll be in touch within 24 hours. In the meantime, feel free to message us on WhatsApp.
              </p>
              <button className="btn btn-ghost" style={{color:"var(--ivory)", borderColor:"color-mix(in oklab, var(--ivory) 30%, transparent)", marginTop:18}}
                      onClick={() => setSent(false)}>Send another →</button>
            </div>
          ) : (
            <form onSubmit={(e) => {e.preventDefault(); setSent(true);}}>
              <div style={{display:"grid", gap: 8}}>
                <label className="kicker" style={{marginTop:6}}>Your name</label>
                <input {...field("name")} placeholder="Jane Martinez" required/>

                <label className="kicker" style={{marginTop:16}}>Email</label>
                <input type="email" {...field("email")} placeholder="jane@email.com" required/>

                {owner && (
                  <>
                    <label className="kicker" style={{marginTop:16}}>Property type</label>
                    <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:4, marginBottom:8}}>
                      {["villa","condo","loft","apartment"].map(t => (
                        <button type="button" key={t}
                                onClick={() => setForm(s => ({...s, propertyType:t}))}
                                style={{
                                  padding:"8px 14px", borderRadius:999, cursor:"pointer",
                                  border: "1px solid " + (form.propertyType===t ? "var(--terra)" : "color-mix(in oklab, var(--ivory) 25%, transparent)"),
                                  background: form.propertyType===t ? "var(--terra)" : "transparent",
                                  color: form.propertyType===t ? "#fff" : "var(--ivory)",
                                  fontSize:13, textTransform:"capitalize", fontFamily:"var(--body)"
                                }}>{t}</button>
                      ))}
                    </div>

                    <label className="kicker" style={{marginTop:16}}>Location</label>
                    <select {...field("location")} style={{...field("location").style, appearance:"none", cursor:"pointer"}}>
                      {NEIGHBORHOODS.map(n => <option key={n.id} value={n.id} style={{background:"var(--ink)"}}>{n.name}</option>)}
                    </select>

                    <label className="kicker" style={{marginTop:18, display:"flex", justifyContent:"space-between"}}>
                      <span>Bedrooms</span>
                      <span style={{color:"var(--terra)"}}>{form.bedrooms}</span>
                    </label>
                    <input type="range" min="1" max="8" value={form.bedrooms}
                           onChange={(e) => setForm(s => ({...s, bedrooms: e.target.value}))}
                           style={{width:"100%", accentColor:"var(--terra)", marginTop:4}}/>
                  </>
                )}

                <label className="kicker" style={{marginTop:18}}>{owner ? "Your goals" : "What you're looking for"}</label>
                <textarea {...field("goals")} rows="3" placeholder={owner ? "e.g. Maximize occupancy while keeping the place available for family in December." : "Dates, group size, must-haves..."} style={{...field("goals").style, resize:"vertical"}}/>
              </div>

              <button type="submit" className="btn btn-terra" style={{marginTop: 30, width:"100%", justifyContent:"center"}}>
                <span>{owner ? "Request a revenue estimate" : "Plan my stay"}</span>
                <span className="arrow" style={{background:"var(--ivory)", color:"var(--terra)"}}>↗</span>
              </button>
              <div style={{textAlign:"center", marginTop:12, fontFamily:"var(--mono)", fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"color-mix(in oklab, var(--ivory) 50%, transparent)"}}>
                Reply within 24 hours
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{background:"var(--bg)", padding:"48px 0 40px", borderTop:"1px solid var(--line)"}}>
      <div className="container" style={{display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap: 16}}>
        <Wordmark variant="serif"/>
        <div className="kicker">© 2026 Amano · Punta Cana, DR</div>
        <div style={{display:"flex", gap:16, fontSize:13, color:"var(--muted)"}}>
          <a href="#" style={{color:"inherit"}}>Privacy</a>
          <a href="#" style={{color:"inherit"}}>Terms</a>
          <a href="https://api.whatsapp.com/send/?phone=16462392656" target="_blank" rel="noreferrer" style={{color:"var(--terra)", textDecoration:"none"}}>WhatsApp ↗</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { CTA, Footer });
