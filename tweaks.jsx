// ---------- Tweaks panel ----------

function Tweaks({ state, set, visible, setVisible }) {
  if (!visible) return null;
  const Row = ({ label, keyName, options }) => (
    <>
      <label>{label}</label>
      <div className="row">
        {options.map(o => (
          <button key={o.v} className={state[keyName] === o.v ? "on" : ""} onClick={() => set(keyName, o.v)}>{o.l}</button>
        ))}
      </div>
    </>
  );
  return (
    <div className="tweaks">
      <button className="close" onClick={() => setVisible(false)} aria-label="close">×</button>
      <h4>Tweaks</h4>
      <Row label="Palette" keyName="palette" options={[
        {v:"caribbean", l:"Caribbean"}, {v:"sand", l:"Sand"}, {v:"navy", l:"Navy"}, {v:"dark", l:"Dark"}
      ]}/>
      <Row label="Map style" keyName="mapStyle" options={[
        {v:"isometric", l:"Iso"}, {v:"flat", l:"Flat"}, {v:"topographic", l:"Topo"}, {v:"satellite", l:"Sat"}
      ]}/>
      <Row label="Typography" keyName="typePair" options={[
        {v:"bricolage_instrument", l:"Bricolage"}, {v:"fraunces_space", l:"Fraunces"}, {v:"dmserif_inter", l:"DM+Inter"}
      ]}/>
      <Row label="Audience mode" keyName="audience" options={[
        {v:"owners", l:"Owners"}, {v:"guests", l:"Guests"}
      ]}/>
      <Row label="Hero scene" keyName="heroVariant" options={[
        {v:"scene", l:"Punta Cana"}, {v:"villa", l:"Villa"}, {v:"orbit", l:"Orbit"}
      ]}/>
    </div>
  );
}

Object.assign(window, { Tweaks });
