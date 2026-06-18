import type { ReactNode } from 'react';
import { useSimStore } from '../../store/useSimStore';
import { SUN, ASTEROID_BELT, findPlanet, findMoon } from '../../data/planets';
import { fmtNumber, fmtPeriod } from '../../utils/format';

export function DataCard() {
  const selectedKind = useSimStore((s) => s.selectedKind);
  const selectedId = useSimStore((s) => s.selectedId);
  const deselect = useSimStore((s) => s.deselect);

  const visible = selectedKind !== null && selectedId !== null;

  let body: ReactNode = null;
  let name = '';
  let sub = '';

  if (selectedKind === 'sun') {
    name = SUN.name;
    sub = 'Star';
    body = (
      <>
        <div className="data-row">
          <span>Diameter</span>
          <span>{fmtNumber(SUN.diameterKm)} km</span>
        </div>
        <div className="data-fact">{SUN.fact}</div>
      </>
    );
  } else if (selectedKind === 'planet' && selectedId) {
    const p = findPlanet(selectedId);
    if (p) {
      name = p.name;
      sub = p.isDwarf ? 'Dwarf Planet' : 'Planet';
      body = (
        <>
          <div className="data-row">
            <span>Distance from Sun</span>
            <span>{p.auDist} AU</span>
          </div>
          <div className="data-row">
            <span>Orbital Period</span>
            <span>{fmtPeriod(p.periodDays)}</span>
          </div>
          <div className="data-row">
            <span>Orbital Inclination</span>
            <span>{p.inclinationDeg}°</span>
          </div>
          <div className="data-row">
            <span>Diameter</span>
            <span>{fmtNumber(p.diameterKm)} km</span>
          </div>
          <div className="data-row">
            <span>Known Moons</span>
            <span>{p.moonsCount}</span>
          </div>
          <div className="data-fact">{p.fact}</div>
        </>
      );
    }
  } else if (selectedKind === 'moon' && selectedId) {
    const result = findMoon(selectedId);
    if (result) {
      const { moon, parent } = result;
      name = moon.name;
      sub = `Moon of ${parent.name}`;
      body = (
        <>
          <div className="data-row">
            <span>Distance from {parent.name}</span>
            <span>{fmtNumber(Math.round(moon.realDistKm))} km</span>
          </div>
          <div className="data-row">
            <span>Orbital Period</span>
            <span>{fmtPeriod(moon.periodDays)}</span>
          </div>
          <div className="data-row">
            <span>Diameter</span>
            <span>{fmtNumber(moon.diameterKm)} km</span>
          </div>
        </>
      );
    }
  } else if (selectedKind === 'belt') {
    name = ASTEROID_BELT.name;
    sub = 'Statistical Field';
    body = (
      <>
        <div className="data-row">
          <span>Distance Range</span>
          <span>
            {ASTEROID_BELT.innerAU}-{ASTEROID_BELT.outerAU} AU
          </span>
        </div>
        <div className="data-row">
          <span>Estimated Population</span>
          <span>{ASTEROID_BELT.estimatedCount}</span>
        </div>
        <div className="data-row">
          <span>Largest Object</span>
          <span>{ASTEROID_BELT.largestObject}</span>
        </div>
        <div className="data-row">
          <span>Total Mass</span>
          <span>{ASTEROID_BELT.totalMass}</span>
        </div>
        <div className="data-fact">{ASTEROID_BELT.fact}</div>
      </>
    );
  }

  return (
    <div className={'panel data-card' + (visible ? ' visible' : '')}>
      <div className="data-card-head">
        <div>
          <div className="data-card-name">{name || '—'}</div>
          {sub && <div className="data-card-sub">{sub}</div>}
        </div>
        <button className="data-card-close" onClick={deselect} aria-label="Close">
          ×
        </button>
      </div>
      {body}
    </div>
  );
}
