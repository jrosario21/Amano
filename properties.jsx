// ---------- properties grid ----------

function PropertyGallery({ images, title }) {
  const [idx, setIdx] = React.useState(0);
  const go = (d) => (e) => {
    e.preventDefault(); e.stopPropagation();
    setIdx((i) => (i + d + images.length) % images.length);
  };
  return (
    <div style={{position:"relative", aspectRatio:"4/3", overflow:"hidden", background:"var(--bg)"}}>
      {images.map((src, i) => (
        <img key={src} src={src} alt={`${title} — photo ${i+1}`}
          loading={i === 0 ? "eager" : "lazy"}
          style={{
            position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover",
            opacity: i === idx ? 1 : 0,
            transition:"opacity .5s ease",
          }}/>
      ))}
      <button onClick={go(-1)} aria-label="previous photo" style={{
        position:"absolute", top:"50%", left:12, transform:"translateY(-50%)",
        width:34, height:34, borderRadius:"50%", border:"none",
        background:"rgba(255,253,246,.92)", color:"var(--navy)", cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 4px 14px rgba(0,0,0,.18)", fontSize:16,
      }}>‹</button>
      <button onClick={go(1)} aria-label="next photo" style={{
        position:"absolute", top:"50%", right:12, transform:"translateY(-50%)",
        width:34, height:34, borderRadius:"50%", border:"none",
        background:"rgba(255,253,246,.92)", color:"var(--navy)", cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 4px 14px rgba(0,0,0,.18)", fontSize:16,
      }}>›</button>
      <div style={{
        position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)",
        display:"flex", gap:6,
      }}>
        {images.map((_, i) => (
          <span key={i} style={{
            width: i === idx ? 18 : 6, height:6, borderRadius:3,
            background: i === idx ? "var(--paper)" : "rgba(255,253,246,.55)",
            transition:"width .25s, background .25s",
          }}/>
        ))}
      </div>
    </div>
  );
}

function PropertyCard({ p, i }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={p.link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration:"none", color:"inherit",
        display:"flex", flexDirection:"column",
        background:"var(--paper)",
        border:"1px solid var(--line)",
        borderColor:"color-mix(in oklab, var(--fg) 12%, transparent)",
        borderRadius: 14, overflow:"hidden",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "transform .3s ease, box-shadow .3s ease",
        boxShadow: hover ? "0 24px 50px -20px rgba(20,10,0,.18)" : "0 2px 0 rgba(0,0,0,.02)",
      }}
    >
      <div style={{position:"relative"}}>
        {p.gallery ? (
          <PropertyGallery images={p.gallery} title={p.title}/>
        ) : (
          <ImgPlaceholder label={`photo · ${p.title.toLowerCase()}`} ratio="4/3" tone={i%2 === 0 ? "warm" : "sea"}/>
        )}
        <div style={{position:"absolute", top:14, left:14, display:"flex", gap:6}}>
          <span className="tag" style={{background:"rgba(255,253,246,.86)", color:"var(--navy)", borderColor:"transparent"}}>
            <span className="dot"/> {p.area}
          </span>
        </div>
        <div style={{position:"absolute", top:14, right:14}}>
          <span className="tag" style={{background:"var(--navy)", color:"var(--ivory)", borderColor:"var(--navy)"}}>
            ★ {p.rating}
          </span>
        </div>
      </div>
      <div style={{padding: 22, display:"flex", flexDirection:"column", flex:1}}>
        <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:10}}>
          <h3 className="display" style={{margin:0, fontSize:26, letterSpacing:"-.02em", fontWeight:500}}>
            {p.title}
            {p.subtitle && <span style={{display:"block", fontSize:13, color:"var(--muted)", fontFamily:"var(--body)", fontWeight:400, letterSpacing:0, marginTop:2}}>{p.subtitle}</span>}
          </h3>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--display)", fontSize:20, fontWeight:500}}>${p.nightly}<span style={{fontSize:12, color:"var(--muted)", fontWeight:400}}>/night</span></div>
          </div>
        </div>
        <div className="kicker" style={{marginTop:2}}>{p.beds} bed · {p.baths} bath · Sleeps {p.guests}</div>
        <p style={{fontSize:14, lineHeight:1.55, color:"color-mix(in oklab, var(--fg) 78%, transparent)", margin:"14px 0 16px", textWrap:"pretty"}}>
          {p.desc}
        </p>
        <div style={{display:"flex", flexWrap:"wrap", gap:6, marginTop:"auto"}}>
          {p.features.map(f => <span key={f} className="chip" style={{fontSize:11}}>{f}</span>)}
        </div>
        <div style={{marginTop:18, paddingTop:14, borderTop:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:13, color:"var(--muted)"}}>
          <span>{p.reviews} reviews</span>
          <span style={{color:"var(--terra)", display:"inline-flex", alignItems:"center", gap:8, fontWeight:500}}>View on Airbnb ↗</span>
        </div>
      </div>
    </a>
  );
}

function Properties() {
  const [filter, setFilter] = React.useState("all");
  const filtered = PROPERTIES.filter(p => filter === "all" ? true : p.neighborhoodId === filter);
  const areas = [...new Set(PROPERTIES.map(p => p.neighborhoodId))];

  return (
    <section id="properties" className="section" style={{background:"var(--bg)"}}>
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom: 48, flexWrap:"wrap", gap:24}}>
          <div className="reveal">
            <div className="eyebrow">Portfolio</div>
            <h2 className="display" style={{fontSize:"clamp(40px, 5vw, 72px)", margin:"16px 0 0"}}>
              Handpicked homes,<br/>
              <span className="serif">five-star reviews.</span>
            </h2>
          </div>
          <div className="reveal" style={{display:"flex", gap:6, flexWrap:"wrap"}}>
            <button className={"chip " + (filter==="all" ? "on" : "")} onClick={() => setFilter("all")} style={{cursor:"pointer"}}>All</button>
            {areas.map(a => {
              const n = NEIGHBORHOODS.find(x => x.id === a);
              return (
                <button key={a} className={"chip " + (filter===a ? "on" : "")} onClick={() => setFilter(a)} style={{cursor:"pointer"}}>{n?.name}</button>
              );
            })}
          </div>
        </div>
        <div className="reveal" style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap: 24}}>
          {filtered.map((p, i) => <PropertyCard key={p.id} p={p} i={i}/>)}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Properties, PropertyCard });
