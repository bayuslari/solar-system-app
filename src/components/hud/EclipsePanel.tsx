import { useEffect, useState } from 'react';
import { ECLIPSES } from '../../data/eclipses';
import type { EclipseEvent } from '../../data/eclipses';
import { missionClock, jumpMissionClockToDate } from '../../store/missionClock';
import { useSimStore } from '../../store/useSimStore';

function simNow(): Date {
  return new Date(missionClock.startDate.getTime() + missionClock.elapsedDays * 86400000);
}

function eclipseMs(e: EclipseEvent) {
  return new Date(e.date + 'T12:00:00Z').getTime();
}

function typeLabel(type: EclipseEvent['type']): string {
  switch (type) {
    case 'solar-total':   return 'Total Solar';
    case 'solar-annular': return 'Annular Solar';
    case 'solar-partial': return 'Partial Solar';
    case 'solar-hybrid':  return 'Hybrid Solar';
    case 'lunar-total':   return 'Total Lunar';
    case 'lunar-partial': return 'Partial Lunar';
  }
}

function typeIcon(type: EclipseEvent['type']): string {
  return type.startsWith('solar') ? '☀' : '◑';
}

function typeColor(type: EclipseEvent['type']): string {
  if (type === 'solar-total' || type === 'solar-hybrid') return '#f2a93b';
  if (type.startsWith('solar')) return '#d4a856';
  if (type === 'lunar-total') return '#4fd1c5';
  return '#7783a0';
}

export function EclipsePanel() {
  const [, tick] = useState(0);
  const setPaused = useSimStore((s) => s.setPaused);
  const paused = useSimStore((s) => s.paused);

  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 400);
    return () => clearInterval(id);
  }, []);

  const now = simNow();
  const nowMs = now.getTime();

  const sorted = ECLIPSES.map((e) => ({ ...e, ms: eclipseMs(e) }))
    .filter((e) => e.ms >= nowMs - 86400000 * 0.6)
    .sort((a, b) => a.ms - b.ms);

  const active = sorted.find((e) => Math.abs(e.ms - nowMs) < 86400000 * 0.6) ?? null;
  const upcoming = sorted.filter((e) => e.ms > nowMs + 86400000 * 0.6).slice(0, 3);

  function jumpTo(ms: number) {
    jumpMissionClockToDate(new Date(ms));
    setPaused(true);
  }

  return (
    <div className="panel eclipse-panel">
      <p className="eyebrow" style={{ marginBottom: active ? 8 : 10 }}>
        Eclipse Events
      </p>

      {active && (
        <div
          className="eclipse-active"
          style={{ borderColor: typeColor(active.type), color: typeColor(active.type), cursor: 'pointer' }}
          onClick={() => jumpTo(active.ms)}
          title="Click to jump to this eclipse"
        >
          <span
            className="eclipse-active-dot"
            style={{ background: typeColor(active.type) }}
          />
          <span>{typeIcon(active.type)} {typeLabel(active.type)} Eclipse</span>
          <span className="eclipse-now-badge">NOW</span>
        </div>
      )}

      {upcoming.length === 0 && !active && (
        <p className="eclipse-empty">No eclipses in data range</p>
      )}

      {upcoming.map((e) => {
        const daysAway = Math.round((e.ms - nowMs) / 86400000);
        return (
          <div
            key={e.date}
            className="eclipse-item eclipse-item-clickable"
            onClick={() => jumpTo(e.ms)}
            title="Click to jump to this eclipse"
          >
            <span className="eclipse-icon" style={{ color: typeColor(e.type) }}>
              {typeIcon(e.type)}
            </span>
            <div className="eclipse-info">
              <span className="eclipse-type">{typeLabel(e.type)}</span>
              <span className="eclipse-date">
                {new Date(e.ms).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <span className="eclipse-countdown">T−{daysAway}d</span>
          </div>
        );
      })}

      {paused && (
        <div className="eclipse-paused-hint">
          ⏸ paused — press Play to resume
        </div>
      )}
    </div>
  );
}
