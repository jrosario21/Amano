// ---------- app ----------
const { useState: useS, useEffect: useE } = React;

function App() {
  const [state, setState] = useS(() => ({ ...TWEAK_DEFAULTS }));
  const [tweaksVisible, setTweaksVisible] = useS(false);

  // apply palette/type to <html>
  useE(() => {
    document.documentElement.dataset.palette = state.palette;
    document.documentElement.dataset.type = state.typePair;
  }, [state.palette, state.typePair]);

  // edit mode plumbing
  useE(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweaksVisible(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", handler);
    window.parent?.postMessage({type:"__edit_mode_available"}, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const set = (k, v) => {
    setState(s => ({...s, [k]: v}));
    window.parent?.postMessage({type:"__edit_mode_set_keys", edits:{[k]:v}}, "*");
  };

  // reveal on scroll
  useReveal();

  return (
    <>
      <Nav audience={state.audience} setAudience={(v) => set("audience", v)}/>
      <Hero audience={state.audience} heroVariant={state.heroVariant}/>
      <WhyAmano audience={state.audience}/>
      <Services/>
      <Concierge/>
      <InteractiveMap mapStyle={state.mapStyle} setMapStyle={(v) => set("mapStyle", v)}/>
      <Properties/>
      <Social/>
      <Founders/>
      <CTA audience={state.audience}/>
      <Footer/>
      <Tweaks state={state} set={set} visible={tweaksVisible} setVisible={setTweaksVisible}/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
