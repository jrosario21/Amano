// ---------- interactive DR map ----------

const MAP_STYLES = ["isometric", "flat", "topographic", "satellite"];

// Real Dominican Republic outline, projected into 1000x560 viewBox (minX/minY at top-left, axis flipped for screen)
const DR_OUTLINE = "M195.8 92.8 L219.8 60.0 L370.1 60.9 L484.1 110.4 L534.8 105.6 L569.7 173.9 L675.0 170.0 L668.8 227.4 L754.4 234.3 L849.0 304.9 L777.5 383.3 L686.0 341.4 L597.7 349.5 L534.4 340.3 L499.7 375.4 L425.8 387.3 L396.5 340.6 L332.9 368.2 L255.8 500.0 L206.3 469.4 L196.6 414.1 L200.5 361.8 L151.0 304.0 L197.9 271.6 L212.6 197.6 L195.8 92.8 Z";

// real projected positions (from lat/lng) on the country map
const N_COORDS_COUNTRY = {
  "cap-cana":           { x: 831, y: 328 },
  "punta-cana-village": { x: 828, y: 315 },
  "vista-cana":         { x: 810, y: 313 },
  "los-corales":        { x: 835, y: 292 },
  "el-cortecito":       { x: 833, y: 290 },
  "el-cocotal":         { x: 824, y: 298 },
  "santo-domingo":      { x: 539, y: 332 },
  "cabrera":            { x: 545, y: 128 },
};

// zoomed-in Punta Cana inset coords (0-1000 x 0-620) — spread out so pins are distinct
const N_COORDS_INSET = {
  "cap-cana":           { x: 560, y: 520 },
  "punta-cana-village": { x: 520, y: 420 },
  "vista-cana":         { x: 360, y: 450 },
  "los-corales":        { x: 620, y: 270 },
  "el-cortecito":       { x: 540, y: 200 },
  "el-cocotal":         { x: 420, y: 340 },
};

function InteractiveMap({ mapStyle, setMapStyle }) {
  const [hoverId, setHoverId] = React.useState(null);
  const [activeId, setActiveId] = React.useState("cap-cana");
  const [view, setView] = React.useState("country"); // country | punta
  const active = NEIGHBORHOODS.find(n => n.id === activeId) || NEIGHBORHOODS[0];

  const visibleN = view === "punta"
    ? NEIGHBORHOODS.filter(n => n.region !== "other")
    : NEIGHBORHOODS;

  const propPinsCountry = PROPERTIES.map(p => {
    const nc = N_COORDS_COUNTRY[p.neighborhoodId];
    return nc ? { ...p, x: nc.x + (p.id.charCodeAt(1)%5 - 2) * 4, y: nc.y + (p.id.charCodeAt(1)%3 - 1) * 4 } : null;
  }).filter(Boolean);
  const propPinsInset = PROPERTIES.filter(p => N_COORDS_INSET[p.neighborhoodId]).map(p => {
    const nc = N_COORDS_INSET[p.neighborhoodId];
    return { ...p, x: nc.x + (p.id.charCodeAt(1)%5 - 2) * 16, y: nc.y + (p.id.charCodeAt(1)%3 - 1) * 16 };
  });

  const bgByStyle = {
    isometric: "var(--paper)",
    flat: "var(--sand)",
    topographic: "#F3ECDA",
    satellite: "#0A1828",
  };
  const landColor = {
    isometric: "#E9DDC2",
    flat: "#E2D5B6",
    topographic: "#E8D9B6",
    satellite: "#2A4031",
  }[mapStyle];
  const seaColor = {
    isometric: "#D9E9E4",
    flat: "#C9DDD7",
    topographic: "#DDE9E5",
    satellite: "#061526",
  }[mapStyle];

  const COORDS = view === "country" ? N_COORDS_COUNTRY : N_COORDS_INSET;
  const isSat = mapStyle === "satellite";
  const fgOnMap = isSat ? "#F2EAD9" : "var(--navy)";

  return (
    <section id="map" className="section" style={{background:"var(--ivory)", borderTop:"1px solid var(--line)"}}>
      <div className="wide">
        <div className="container" style={{padding: 0}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom: 40, flexWrap:"wrap", gap: 20}}>
            <div className="reveal">
              <div className="eyebrow">Learn about your market</div>
              <h2 className="display" style={{fontSize:"clamp(40px, 5vw, 72px)", margin:"16px 0 0"}}>
                Six neighborhoods,<br/>
                <span className="serif">one expert team.</span>
              </h2>
              <p style={{maxWidth:560, fontSize:16, lineHeight:1.6, color:"color-mix(in oklab, var(--fg) 72%, transparent)", marginTop:16}}>
                Hover or tap a neighborhood to see performance. Zoom in on Punta Cana or step back for the country view.
              </p>
            </div>
            <div className="reveal" style={{display:"flex", gap:18, alignItems:"flex-end", flexWrap:"wrap"}}>
              <div>
                <div className="kicker" style={{marginBottom:6}}>View</div>
                <div style={{display:"flex", gap:6}}>
                  {[["country","Dominican Republic"],["punta","Punta Cana"]].map(([k,l]) => (
                    <button key={k} className={"chip " + (view===k ? "on" : "")} onClick={() => setView(k)} style={{cursor:"pointer", border: view===k ? "1px solid var(--navy)" : "1px solid var(--line)"}}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="kicker" style={{marginBottom:6}}>Style</div>
                <div style={{display:"flex", gap:6}}>
                  {MAP_STYLES.map(s => (
                    <button key={s} className={"chip " + (mapStyle===s ? "on" : "")} onClick={() => setMapStyle(s)} style={{cursor:"pointer", textTransform:"capitalize", border: mapStyle===s ? "1px solid var(--navy)" : "1px solid var(--line)"}}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal" style={{
          display:"grid", gridTemplateColumns: "1.6fr .9fr", gap: 0,
          border:"1px solid var(--line)", borderColor:"color-mix(in oklab, var(--fg) 14%, transparent)",
          borderRadius: 14, overflow:"hidden", background: bgByStyle[mapStyle],
          color: isSat ? "#F2EAD9" : "var(--fg)",
        }}>
          {/* MAP */}
          <div style={{
            position:"relative", minHeight: 640, overflow:"hidden",
            background: bgByStyle[mapStyle],
            perspective: "1400px",
          }}>
            {/* topographic rings */}
            {mapStyle === "topographic" && (
              <svg viewBox="0 0 1000 620" width="100%" height="100%" style={{position:"absolute", inset:0, opacity:.3, pointerEvents:"none"}}>
                {[...Array(10)].map((_,i) => (
                  <ellipse key={i} cx={view==="country"?820:500} cy={view==="country"?310:340} rx={40 + i*38} ry={20 + i*22} fill="none" stroke="var(--terra-2)" strokeWidth=".5"/>
                ))}
              </svg>
            )}

            <svg viewBox={view === "country" ? "0 0 1000 560" : "0 0 1000 620"} width="100%" height="100%" style={{
              display:"block",
              transform: mapStyle === "isometric" ? "rotateX(22deg) rotateZ(-2deg) scale(1)" : "none",
              transformOrigin: "50% 55%",
              transition: "transform .6s ease",
            }}>
              <defs>
                <linearGradient id="satSea" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#041628"/>
                  <stop offset="1" stopColor="#072D45"/>
                </linearGradient>
                <pattern id="wave" width="16" height="8" patternUnits="userSpaceOnUse">
                  <path d="M0 4 Q 4 0 8 4 T 16 4" stroke={isSat ? "rgba(90,140,180,.25)" : "rgba(46,122,122,.18)"} strokeWidth=".6" fill="none"/>
                </pattern>
                <filter id="landShadow">
                  <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgba(20,10,0,.22)"/>
                </filter>
              </defs>

              {/* sea */}
              <rect x="0" y="0" width="1000" height="620" fill={isSat ? "url(#satSea)" : seaColor}/>
              <rect x="0" y="0" width="1000" height="620" fill="url(#wave)" opacity=".5"/>

              {view === "country" ? (
                <>
                  {/* iso base shadow */}
                  {mapStyle === "isometric" && (
                    <path d={DR_OUTLINE} transform="translate(6,12)" fill="rgba(0,0,0,.2)" filter="url(#landShadow)"/>
                  )}
                  {/* land */}
                  <path d={DR_OUTLINE} fill={landColor} stroke={isSat ? "#1F3A2A" : "rgba(14,32,51,.35)"} strokeWidth="1.2" filter={mapStyle==="isometric" ? "url(#landShadow)" : undefined}/>
                  {/* coastal accent */}
                  {!isSat && (
                    <path d={DR_OUTLINE} fill="none" stroke="rgba(46,122,122,.28)" strokeWidth="3" transform="translate(0,4)" opacity=".55"/>
                  )}
                  {/* satellite land texture */}
                  {isSat && [...Array(40)].map((_,i) => {
                    const cx = 200 + (i * 37) % 600, cy = 120 + (i * 19) % 280;
                    return <circle key={i} cx={cx} cy={cy} r={2 + (i%4)} fill="#1B2E20" opacity={.55}/>;
                  })}

                  {/* place labels */}
                  <text x={260} y={440} fontSize="11" fill={isSat ? "#9bb3a1" : "rgba(14,32,51,.45)"} fontFamily="var(--mono)" letterSpacing="0.16em">HAITI →</text>
                  <text x={750} y={430} fontSize="12" fill={isSat ? "#C9B991" : "var(--terra)"} fontFamily="var(--mono)" letterSpacing="0.14em" fontWeight="600">PUNTA CANA</text>
                  <line x1="755" y1="420" x2="820" y2="330" stroke={isSat ? "#C9B991" : "var(--terra)"} strokeWidth="1" strokeDasharray="2 2" opacity=".6"/>
                  <text x={480} y={365} fontSize="10" fill={fgOnMap} fontFamily="var(--mono)" letterSpacing="0.14em" opacity=".55">SANTO DOMINGO</text>

                  {/* compass rose */}
                  <g transform="translate(940, 80)" opacity=".7" stroke={fgOnMap} fill={fgOnMap}>
                    <circle r="18" fill="none" strokeWidth=".8"/>
                    <path d="M0 -14 L3 0 L0 14 L-3 0 Z"/>
                    <text y="-22" textAnchor="middle" fontSize="9" fontFamily="var(--mono)" stroke="none">N</text>
                  </g>

                  {/* scale */}
                  <g transform="translate(40, 520)" stroke={fgOnMap} fill={fgOnMap}>
                    <line x1="0" y1="0" x2="90" y2="0" strokeWidth="1.4"/>
                    <line x1="0" y1="-4" x2="0" y2="4" strokeWidth="1.4"/>
                    <line x1="90" y1="-4" x2="90" y2="4" strokeWidth="1.4"/>
                    <text x="45" y="16" textAnchor="middle" fontSize="10" fontFamily="var(--mono)" letterSpacing=".12em" stroke="none">50 KM</text>
                  </g>
                </>
              ) : (
                <>
                  {/* Punta Cana inset — zoomed beach-line + neighborhoods */}
                  {/* land */}
                  <path d="M -20 620 L -20 450 Q 80 430 180 440 Q 260 448 320 430 Q 400 410 480 420 Q 560 428 640 420 Q 720 412 780 400 Q 840 390 900 380 Q 970 370 1020 365 L 1020 620 Z"
                        fill={landColor} stroke={isSat ? "#1F3A2A" : "rgba(14,32,51,.3)"} strokeWidth="1"/>
                  {/* beach strip */}
                  <path d="M -20 450 Q 80 430 180 440 Q 260 448 320 430 Q 400 410 480 420 Q 560 428 640 420 Q 720 412 780 400 Q 840 390 900 380 Q 970 370 1020 365"
                        fill="none" stroke={isSat ? "#E6D7A4" : "#F6EBCB"} strokeWidth="10" strokeLinecap="round" opacity=".9"/>

                  {/* reef dots */}
                  {[...Array(28)].map((_,i) => {
                    const x = 20 + i * 34, y = 200 + (i*13)%80;
                    return <circle key={i} cx={x} cy={y} r={2} fill={isSat ? "#1B3548" : "rgba(46,122,122,.25)"}/>;
                  })}

                  {/* labels */}
                  <text x={60} y={260} fontSize="11" fill={fgOnMap} fontFamily="var(--mono)" letterSpacing="0.16em" opacity=".55">ATLANTIC OCEAN</text>
                  <text x={60} y={600} fontSize="10" fill={fgOnMap} fontFamily="var(--mono)" letterSpacing="0.14em" opacity=".45">↑ NORTH · BAVARO BEACH</text>
                </>
              )}

              {/* pins */}
              {visibleN.map(n => {
                const c = COORDS[n.id];
                if (!c) return null;
                const isActive = activeId === n.id;
                const isHover = hoverId === n.id;
                const lifted = isActive || isHover;
                const labelRight = c.x < 500;
                return (
                  <g key={n.id}
                     onMouseEnter={() => setHoverId(n.id)}
                     onMouseLeave={() => setHoverId(null)}
                     onClick={() => setActiveId(n.id)}
                     style={{cursor:"pointer", transform: `translate(${c.x}px, ${c.y + (lifted ? -6 : 0)}px)`, transition:"transform .25s ease"}}>
                    {/* pulse */}
                    {lifted && <circle r="18" fill={n.color} opacity=".15">
                      <animate attributeName="r" from="10" to="22" dur="1.4s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" from=".35" to="0" dur="1.4s" repeatCount="indefinite"/>
                    </circle>}
                    <circle r={lifted ? 10 : 7} fill={n.color} opacity=".25"/>
                    <circle r={lifted ? 6.5 : 5} fill={n.color} stroke="#fff" strokeWidth="1.5"/>
                    {/* label */}
                    <g transform={`translate(${labelRight ? 12 : -12}, 3)`}>
                      <text fontSize={view === "punta" ? "14" : "11"}
                            fontFamily="var(--display)" fontWeight={lifted ? 600 : 500}
                            textAnchor={labelRight ? "start" : "end"}
                            fill={isSat ? "#F2EAD9" : "var(--navy)"}
                            style={{paintOrder:"stroke"}}
                            stroke={isSat ? "rgba(0,0,0,.8)" : "rgba(255,253,246,.9)"}
                            strokeWidth="3.5" strokeLinejoin="round">{n.name}</text>
                    </g>
                  </g>
                );
              })}

              {/* property pins (terracotta diamonds) */}
              {(view === "country" ? propPinsCountry : propPinsInset).map(p => (
                <g key={p.id} style={{transform:`translate(${p.x}px, ${p.y + (view==='country'?14:24)}px)`, cursor:"pointer"}}
                   onClick={() => document.getElementById("properties")?.scrollIntoView({behavior:"smooth"})}>
                  <rect x={view==='country' ? -3 : -5} y={view==='country' ? -3 : -5}
                        width={view==='country' ? 6 : 10} height={view==='country' ? 6 : 10}
                        fill="var(--terra)" transform="rotate(45)" stroke="#fff" strokeWidth="1.4"/>
                </g>
              ))}
            </svg>

            {/* overlay tags */}
            <div style={{position:"absolute", left:20, top:20, display:"flex", gap:8, alignItems:"center"}}>
              <span className="tag" style={{background:"color-mix(in oklab, var(--bg) 80%, transparent)"}}>
                <span className="dot"/> {view === "country" ? "Dominican Republic" : "Punta Cana region"} · {mapStyle}
              </span>
            </div>
            <div style={{position:"absolute", right:20, bottom:20, display:"flex", gap:12, alignItems:"center", fontSize:11, fontFamily:"var(--mono)", letterSpacing:".12em", textTransform:"uppercase", color: isSat ? "#C9B991" : "var(--muted)"}}>
              <span style={{display:"inline-flex", alignItems:"center", gap:6}}>
                <span style={{width:10, height:10, background:"var(--terra)", transform:"rotate(45deg)", display:"inline-block"}}/>
                Our listings
              </span>
              <span style={{display:"inline-flex", alignItems:"center", gap:6}}>
                <span style={{width:10, height:10, background:"var(--sea)", borderRadius:"50%", display:"inline-block"}}/>
                Neighborhood
              </span>
            </div>
          </div>

          {/* PANEL */}
          <div style={{
            padding: 36, background: isSat ? "#0F1A28" : "var(--paper)",
            borderLeft:"1px solid var(--line)", display:"flex", flexDirection:"column",
            color: isSat ? "#F2EAD9" : "var(--fg)",
          }}>
            <div className="kicker" style={{color: isSat ? "#C9B991" : "var(--terra)"}}>Neighborhood</div>
            <h3 className="display" style={{fontSize: 44, margin:"6px 0 6px", letterSpacing:"-.025em"}}>
              {active.name}
            </h3>
            <div className="serif" style={{fontSize:19, color:"color-mix(in oklab, currentColor 80%, transparent)", marginBottom:18}}>
              {active.short}
            </div>
            <p style={{fontSize:15, lineHeight:1.6, margin:"0 0 24px", color:"color-mix(in oklab, currentColor 78%, transparent)"}}>
              {active.blurb}
            </p>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:"color-mix(in oklab, currentColor 10%, transparent)", borderRadius:10, overflow:"hidden", marginBottom:20}}>
              {[
                ["Avg nightly", `$${active.avgNightly}`],
                ["Occupancy", `${active.occupancy}%`],
                ["Demand", active.demand],
                ["Our listings", `${active.properties}`],
              ].map(([k,v],i) => (
                <div key={i} style={{background: isSat ? "#0F1A28" : "var(--paper)", padding:"14px 16px"}}>
                  <div className="kicker">{k}</div>
                  <div style={{fontFamily:"var(--display)", fontSize:22, fontWeight:500, letterSpacing:"-.02em", marginTop:4}}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{marginBottom: 22}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6}}>
                <span className="kicker">Demand score</span>
                <span style={{fontFamily:"var(--mono)", fontSize:12}}>{active.demandScore}/100</span>
              </div>
              <div style={{height:6, background:"color-mix(in oklab, currentColor 15%, transparent)", borderRadius:999, overflow:"hidden"}}>
                <div style={{width:`${active.demandScore}%`, height:"100%", background:"var(--terra)", transition:"width .6s cubic-bezier(.2,.8,.2,1)"}}/>
              </div>
            </div>

            <div style={{display:"flex", flexWrap:"wrap", gap:6, marginBottom: 22}}>
              {active.highlights.map(h => (
                <span key={h} className="chip" style={{fontSize:11, background:"transparent", color:"currentColor", borderColor:"color-mix(in oklab, currentColor 20%, transparent)"}}>{h}</span>
              ))}
            </div>

            <div style={{display:"flex", gap:6, marginTop:"auto", paddingTop: 18, borderTop:"1px solid color-mix(in oklab, currentColor 15%, transparent)", flexWrap:"wrap"}}>
              {visibleN.map(n => (
                <button key={n.id}
                        onClick={() => setActiveId(n.id)}
                        onMouseEnter={() => setHoverId(n.id)}
                        onMouseLeave={() => setHoverId(null)}
                        style={{
                          border:"none", background:"transparent", padding:"4px 8px", borderRadius: 999,
                          color: "inherit", opacity: activeId===n.id ? 1 : .55,
                          fontFamily:"var(--mono)", fontSize:10, letterSpacing:".14em", textTransform:"uppercase",
                          cursor:"pointer",
                          borderBottom: activeId===n.id ? `2px solid ${n.color}` : "2px solid transparent"
                        }}>{n.name}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { InteractiveMap, MAP_STYLES });
