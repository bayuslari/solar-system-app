import { useEffect, useState } from 'react';
import { missionClock } from '../../store/missionClock';

export function Header() {
  const [, forceTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => forceTick((t) => t + 1), 400);
    return () => clearInterval(id);
  }, []);

  const displayDate = new Date(
    missionClock.startDate.getTime() + missionClock.elapsedDays * 86400000
  );

  return (
    <div className="panel header">
      <div className="brand-row">
        <svg width="18" height="18" viewBox="0 0 100 100" aria-hidden="true">
          <ellipse
            cx="42"
            cy="52"
            rx="40"
            ry="17"
            fill="none"
            stroke="var(--signal)"
            strokeWidth="6"
            transform="rotate(-18 42 52)"
          />
          <circle cx="38" cy="54" r="17" fill="var(--ember)" />
          <circle cx="78" cy="36" r="5.5" fill="var(--signal)" />
        </svg>
        <p className="eyebrow">Live Simulation</p>
      </div>
      <p className="title">Solar System Telemetry</p>
      <div className="clock-row">
        <span>Mission Date</span>
        <span className="clock-val">
          {displayDate.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
      <div className="clock-row">
        <span>Elapsed</span>
        <span className="clock-val">T+{Math.round(missionClock.elapsedDays)}d</span>
      </div>
    </div>
  );
}
