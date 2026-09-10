// tweaks-feel.jsx — Expressive "feel" controls for the Beautiful.ai Brand Guidelines.
// Three macro dials, each coordinating many properties at once so the whole
// document changes temperament — not single-property pixel-pushing.

const { useEffect } = React;

const FEEL_DEFAULTS = /*EDITMODE-BEGIN*/{
  "temperament": "composed",
  "accent": "cyan",
  "air": "balanced"
}/*EDITMODE-END*/;

// ── TEMPERAMENT — the type voice ──────────────────────────────────────────
// Coordinates display/heading/body weight, display tracking, display
// line-height and the monospace face into one coherent personality.
const TEMPERAMENT = {
  composed: {
    fwDisplay: 500, fwHeading: 500, fwBody: 400,
    lsDisplay: '-0.035em', lsHeading: '-0.025em', displayLh: '1.0',
    mono: "'Post Grotesk', system-ui, sans-serif", fwMono: 400,
  },
  editorial: {
    // Light, airy, refined — gallery-catalogue restraint.
    fwDisplay: 300, fwHeading: 300, fwBody: 400,
    lsDisplay: '-0.045em', lsHeading: '-0.03em', displayLh: '1.06',
    mono: "'Martian Mono', ui-monospace, monospace", fwMono: 400,
  },
  cinematic: {
    // Big, tight, dramatic — type set like a film title.
    fwDisplay: 500, fwHeading: 500, fwBody: 400,
    lsDisplay: '-0.052em', lsHeading: '-0.03em', displayLh: '0.9',
    mono: "'Post Grotesk', system-ui, sans-serif", fwMono: 400,
  },
  bold: {
    // Heavy, punchy, confident — everything leans in.
    fwDisplay: 700, fwHeading: 700, fwBody: 500,
    lsDisplay: '-0.02em', lsHeading: '-0.018em', displayLh: '1.0',
    mono: "'Post Grotesk', system-ui, sans-serif", fwMono: 500,
  },
};

// ── ACCENT — the energy color ─────────────────────────────────────────────
// value is [accent (CTAs / the dot), accent-soft (in-copy highlights)]
const ACCENTS = {
  cyan:    { accent: '#00B9FF', soft: '#52D0FF' },   // Signal cyan — as shipped
  pair:    { accent: '#00B9FF', soft: '#E5659E' },   // You × AI: cyan action, magenta highlight
  warm:    { accent: '#FF6347', soft: '#FF917E' },   // Warm orange
  verdant: { accent: '#96BB47', soft: '#B5CF7E' },   // Verdant green
};
const ACCENT_SWATCH = { cyan: '#00B9FF', pair: '#DB2475', warm: '#FF6347', verdant: '#96BB47' };

// ── AIR — space & scale ───────────────────────────────────────────────────
// Couples vertical section rhythm with display-type drama.
const AIR = {
  spare:    { section: '64px',  tight: '48px',  scale: '0.9' },
  balanced: { section: '120px', tight: '80px',  scale: '1.0' },
  generous: { section: '180px', tight: '120px', scale: '1.08' },
};

function applyFeel(t) {
  const root = document.documentElement;

  const tmp = TEMPERAMENT[t.temperament] || TEMPERAMENT.composed;
  root.style.setProperty('--fw-display', tmp.fwDisplay);
  root.style.setProperty('--fw-heading', tmp.fwHeading);
  root.style.setProperty('--fw-body', tmp.fwBody);
  root.style.setProperty('--ls-display', tmp.lsDisplay);
  root.style.setProperty('--ls-heading', tmp.lsHeading);
  root.style.setProperty('--display-lh', tmp.displayLh);
  root.style.setProperty('--mono', tmp.mono);
  root.style.setProperty('--fw-mono', tmp.fwMono);

  const ac = ACCENTS[t.accent] || ACCENTS.cyan;
  root.style.setProperty('--accent', ac.accent);
  root.style.setProperty('--accent-soft', ac.soft);

  const air = AIR[t.air] || AIR.balanced;
  root.style.setProperty('--section-y', air.section);
  root.style.setProperty('--section-y-tight', air.tight);
  root.style.setProperty('--display-scale', air.scale);
}

function App() {
  const [t, setTweak] = useTweaks(FEEL_DEFAULTS);
  useEffect(() => { applyFeel(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">

      <TweakSection label="Temperament" />
      <TweakRadio
        label="Type voice"
        value={t.temperament}
        options={[
          { value: 'composed',  label: 'Composed' },
          { value: 'editorial', label: 'Editorial' },
          { value: 'cinematic', label: 'Cinematic' },
          { value: 'bold',      label: 'Bold' },
        ]}
        onChange={(v) => setTweak('temperament', v)}
      />

      <TweakSection label="Accent" />
      <TweakColor
        label="Energy color"
        value={ACCENT_SWATCH[t.accent]}
        options={Object.values(ACCENT_SWATCH)}
        onChange={(hex) => {
          const id = Object.keys(ACCENT_SWATCH).find(k => ACCENT_SWATCH[k] === hex) || 'cyan';
          setTweak('accent', id);
        }}
      />

      <TweakSection label="Air" />
      <TweakRadio
        label="Space & scale"
        value={t.air}
        options={[
          { value: 'spare',    label: 'Spare' },
          { value: 'balanced', label: 'Balanced' },
          { value: 'generous', label: 'Generous' },
        ]}
        onChange={(v) => setTweak('air', v)}
      />

    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App />);
