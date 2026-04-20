// ---------- cinematic Punta Cana scene (video) ----------
function PuntaCanaScene() {
  return (
    <div className="pc-scene" aria-hidden="true">
      <style>{`
        .pc-scene {
          position: absolute; inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .pc-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .pc-wash {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(250,246,238,.78) 0%, rgba(250,246,238,.38) 42%, rgba(250,246,238,0) 72%);
          z-index: 1;
        }
        .pc-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 120% 100% at 50% 30%, transparent 50%, rgba(20,8,0,.25) 100%);
          z-index: 1; pointer-events: none;
        }
        [data-palette="dark"] .pc-wash {
          background: linear-gradient(90deg, rgba(11,19,28,.78) 0%, rgba(11,19,28,.4) 42%, rgba(11,19,28,0) 72%);
        }
        @media (max-width: 900px) {
          .pc-wash {
            background: linear-gradient(180deg, rgba(250,246,238,.82) 0%, rgba(250,246,238,.55) 55%, rgba(250,246,238,.25) 100%);
          }
        }
      `}</style>
      <video className="pc-video" src="hero.mp4" autoPlay muted loop playsInline preload="auto"/>
      <div className="pc-vignette"/>
      <div className="pc-wash"/>
    </div>
  );
}
Object.assign(window, { PuntaCanaScene });
