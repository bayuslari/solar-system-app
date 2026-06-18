import { Scene } from './components/Scene';
import { Header } from './components/hud/Header';
import { Controls } from './components/hud/Controls';
import { Chips } from './components/hud/Chips';
import { DataCard } from './components/hud/DataCard';
import { EclipsePanel } from './components/hud/EclipsePanel';

export default function App() {
  return (
    <div className="app">
      <div className="canvas-wrap">
        <Scene />
      </div>
      <div className="hud">
        <Header />
        <Controls />
        <p className="scale-note">
          Sizes &amp; distances adjusted for visibility — not to true scale. Orbital
          inclinations are real.
        </p>
        <DataCard />
        <EclipsePanel />
        <Chips />
      </div>
    </div>
  );
}
