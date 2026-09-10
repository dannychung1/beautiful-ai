// tweaks-app.jsx — Tweaks panel for Beautiful.ai Brand Guidelines
// Lets the user explore weight, accent and density variations of the system live.

const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headingWeight": 500,
  "displayWeight": 500,
  "bodyWeight": 400,
  "monoFamily": "post-grotesk",
  "accent": "#00B9FF",
  "tightness": -25,
  "density": "regular"
}/*EDITMODE-END*/;

// Accent palettes — value is [accent, accent-soft]
const ACCENTS = [
  { id: '#00B9FF', label: 'Cyan',    soft: '#52D0FF' },
  { id: '#FF6347', label: 'Orange',  soft: '#FF917E' },
  { id: '#DB2475', label: 'Magenta', soft: '#E5659E' },
  { id: '#96BB47', label: 'Green',   soft: '#B5CF7E' },
];

const MONO_OPTIONS = [
  { id: 'post-grotesk', label: 'Post Grotesk Book', stack: "'Post Grotesk', system-ui, sans-serif", weight: 400 },
  { id: 'martian-mono', label: 'Martian Mono',      stack: "'Martian Mono', ui-monospace, monospace", weight: 400 },
];

const DENSITY = {
  tight:    { section: '64px',  pad: '60px' },
  regular:  { section: '120px', pad: '80px' },
  spacious: { section: '180px', pad: '120px' },
};

function applyTweaks(t) {
  const root = document.documentElement;
  root.style.setProperty('--fw-heading', t.headingWeight);
  root.style.setProperty('--fw-display', t.displayWeight);
  root.style.setProperty('--fw-body', t.bodyWeight);

  // Mono family
  const mono = MONO_OPTIONS.find(o => o.id === t.monoFamily) || MONO_OPTIONS[0];
  root.style.setProperty('--mono', mono.stack);
  root.style.setProperty('--fw-mono', mono.weight);

  // Accent
  const accent = ACCENTS.find(a => a.id === t.accent) || ACCENTS[0];
  root.style.setProperty('--accent', accent.id);
  root.style.setProperty('--accent-soft', accent.soft);

  // Tightness — applied as letter-spacing modifier
  root.style.setProperty('--ls-display', (t.tightness / 1000) + 'em');

  // Density
  const d = DENSITY[t.density] || DENSITY.regular;
  root.style.setProperty('--section-y', d.section);
  root.style.setProperty('--section-y-tight', d.pad);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => { applyTweaks(t); }, [t]);

  const weightLabel = (w) => ({300:'Light',400:'Book',500:'Medium',700:'Bold'}[w] || w);

  return (
    <TweaksPanel title="Tweaks">

      <TweakSection label="Typography" />

      <TweakRadio
        label="Heading weight"
        value={String(t.headingWeight)}
        options={[
          { value: '300', label: 'Light' },
          { value: '400', label: 'Book' },
          { value: '500', label: 'Medium' },
          { value: '700', label: 'Bold' },
        ]}
        onChange={(v) => setTweak('headingWeight', Number(v))}
      />

      <TweakRadio
        label="Display weight"
        value={String(t.displayWeight)}
        options={[
          { value: '300', label: 'Light' },
          { value: '400', label: 'Book' },
          { value: '500', label: 'Medium' },
          { value: '700', label: 'Bold' },
        ]}
        onChange={(v) => setTweak('displayWeight', Number(v))}
      />

      <TweakRadio
        label="Body weight"
        value={String(t.bodyWeight)}
        options={[
          { value: '400', label: 'Book' },
          { value: '500', label: 'Medium' },
        ]}
        onChange={(v) => setTweak('bodyWeight', Number(v))}
      />

      <TweakRadio
        label="Monospace"
        value={t.monoFamily}
        options={[
          { value: 'post-grotesk', label: 'Post Grotesk' },
          { value: 'martian-mono', label: 'Martian Mono' },
        ]}
        onChange={(v) => setTweak('monoFamily', v)}
      />

      <TweakSlider
        label="Display tightness"
        value={t.tightness}
        min={-50}
        max={0}
        step={1}
        unit="‰"
        onChange={(v) => setTweak('tightness', v)}
      />

      <TweakSection label="Theme" />

      <TweakColor
        label="Accent"
        value={t.accent}
        options={ACCENTS.map(a => a.id)}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakRadio
        label="Density"
        value={t.density}
        options={[
          { value: 'tight',    label: 'Tight' },
          { value: 'regular',  label: 'Regular' },
          { value: 'spacious', label: 'Spacious' },
        ]}
        onChange={(v) => setTweak('density', v)}
      />

      <TweakSection label="Presets" />

      <div style={{ display: 'flex', gap: 6 }}>
        <TweakButton
          label="As shipped"
          onClick={() => setTweak({
            headingWeight: 500, displayWeight: 500, bodyWeight: 400,
            monoFamily: 'post-grotesk', accent: '#00B9FF',
            tightness: -25, density: 'regular',
          })}
        />
        <TweakButton
          label="Editorial"
          onClick={() => setTweak({
            headingWeight: 300, displayWeight: 300, bodyWeight: 400,
            monoFamily: 'martian-mono', accent: '#00B9FF',
            tightness: -35, density: 'spacious',
          })}
        />
        <TweakButton
          label="Bold"
          onClick={() => setTweak({
            headingWeight: 700, displayWeight: 700, bodyWeight: 500,
            monoFamily: 'post-grotesk', accent: '#FF6347',
            tightness: -15, density: 'tight',
          })}
        />
      </div>

    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App />);
