import { useEffect, useState } from 'react';
import { Scene } from './components/Scene';
import { Header } from './components/hud/Header';
import { Controls } from './components/hud/Controls';
import { Chips } from './components/hud/Chips';
import { DataCard } from './components/hud/DataCard';
import { EclipsePanel } from './components/hud/EclipsePanel';
import { preloadTextures } from './hooks/useSafeTexture';
import { allTexturePaths } from './utils/textureManifest';

function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="loading-screen">
      <div className="loading-eyebrow">Solar System Telemetry</div>
      <div className="loading-title">Initializing simulation…</div>
      <div className="loading-bar">
        <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loading-pct">{progress}%</div>
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const reveal = () => {
      if (active) setReady(true);
    };
    preloadTextures(allTexturePaths(), (loaded, total) => {
      if (active) setProgress(Math.round((loaded / total) * 100));
    }).then(reveal);
    // Safety net: never block startup indefinitely if a texture stalls — the
    // scene falls back to flat colors for anything still in flight.
    const timer = setTimeout(reveal, 10000);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  if (!ready) return <LoadingScreen progress={progress} />;

  return (
    <div className="app app-enter">
      <div className="canvas-wrap">
        <Scene />
      </div>
      <div className="hud">
        <Header />

        {/* Mobile-only: collapse the settings panels behind a hamburger so they
            don't cover the scene. On desktop the button is hidden and the
            drawer lays its children out in their usual fixed positions. */}
        <button
          className={'hamburger' + (menuOpen ? ' open' : '')}
          aria-label="Toggle controls"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        {menuOpen && (
          <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />
        )}
        <div className={'settings-drawer' + (menuOpen ? ' open' : '')}>
          <Controls />
          <EclipsePanel />
        </div>

        <p className="scale-note">
          Sizes &amp; distances adjusted for visibility — not to true scale. Orbital
          inclinations are real.
        </p>
        <DataCard />
        <Chips />
      </div>
    </div>
  );
}
