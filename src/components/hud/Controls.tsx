import { useSimStore } from '../../store/useSimStore';

const SPEED_PRESETS = [1, 5, 30, 100, 365] as const;

function formatSpeed(s: number) {
  if (s === 0) return '0 d/s';
  if (s >= 365) return `${(s / 365).toFixed(s % 365 === 0 ? 0 : 1)} yr/s`;
  return `${s} d/s`;
}

export function Controls() {
  const speed = useSimStore((s) => s.speed);
  const paused = useSimStore((s) => s.paused);
  const showOrbits = useSimStore((s) => s.showOrbits);
  const showLabels = useSimStore((s) => s.showLabels);
  const setSpeed = useSimStore((s) => s.setSpeed);
  const togglePause = useSimStore((s) => s.togglePause);
  const toggleOrbits = useSimStore((s) => s.toggleOrbits);
  const toggleLabels = useSimStore((s) => s.toggleLabels);
  const resetView = useSimStore((s) => s.resetView);

  return (
    <div className="panel controls">
      <div className="ctrl-row">
        <div className="ctrl-label">
          <span>Time Speed</span>
          <span>{formatSpeed(speed)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={365}
          step={1}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <div className="speed-presets">
          {SPEED_PRESETS.map((s) => (
            <button
              key={s}
              className={speed === s ? 'active' : ''}
              onClick={() => setSpeed(s)}
            >
              {s >= 365 ? '1yr' : `${s}d`}
            </button>
          ))}
        </div>
      </div>
      <div className="ctrl-row">
        <div className="ctrl-label">
          <span>View</span>
        </div>
        <div className="btn-row">
          <button onClick={togglePause} className={paused ? 'active' : ''}>
            {paused ? 'Play' : 'Pause'}
          </button>
          <button onClick={toggleOrbits} className={showOrbits ? 'active' : ''}>
            Orbits
          </button>
          <button onClick={toggleLabels} className={showLabels ? 'active' : ''}>
            Labels
          </button>
        </div>
      </div>
      <div className="ctrl-row" style={{ marginBottom: 0 }}>
        <button onClick={resetView} style={{ width: '100%' }}>
          Reset View
        </button>
      </div>
    </div>
  );
}
