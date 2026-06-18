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
      <p className="eyebrow">Live Simulation</p>
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
