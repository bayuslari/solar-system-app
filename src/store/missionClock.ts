// Deliberately NOT a zustand store: elapsed time changes every frame, and we
// don't want every HUD consumer re-rendering at 60fps. The HUD polls this
// plain object on a slow interval instead (see hud/Header.tsx).

export const missionClock = {
  startDate: new Date(),
  elapsedDays: 0,
};

export function advanceMissionClock(days: number) {
  missionClock.elapsedDays += days;
}

export function jumpMissionClockToDate(target: Date) {
  missionClock.elapsedDays =
    (target.getTime() - missionClock.startDate.getTime()) / 86400000;
}
