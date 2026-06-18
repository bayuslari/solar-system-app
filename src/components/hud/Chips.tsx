import { PLANETS, SUN, ASTEROID_BELT } from '../../data/planets';
import { useSimStore } from '../../store/useSimStore';

export function Chips() {
  const select = useSimStore((s) => s.select);
  const selectedId = useSimStore((s) => s.selectedId);

  return (
    <div className="chips">
      <button
        className={'chip' + (selectedId === SUN.id ? ' active' : '')}
        onClick={() => select('sun', SUN.id, 14)}
      >
        <span className="chip-dot" style={{ background: SUN.color }} />
        Sun
      </button>

      {PLANETS.map((p) => (
        <button
          key={p.id}
          className={'chip' + (selectedId === p.id ? ' active' : '')}
          onClick={() => select('planet', p.id, Math.max(6, p.sceneSize * 7))}
        >
          <span className="chip-dot" style={{ background: p.color }} />
          {p.name}
        </button>
      ))}

      <button
        className={'chip' + (selectedId === ASTEROID_BELT.id ? ' active' : '')}
        onClick={() => select('belt', ASTEROID_BELT.id, 40)}
      >
        <span className="chip-dot" style={{ background: '#8a7d6e' }} />
        Belt
      </button>
    </div>
  );
}
