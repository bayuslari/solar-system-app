import { useFrame } from '@react-three/fiber';
import { useSimStore } from '../store/useSimStore';
import { advanceMissionClock } from '../store/missionClock';

export function SimulationDriver() {
  useFrame((_, dt) => {
    const { speed, paused } = useSimStore.getState();
    if (!paused) advanceMissionClock(speed * dt);
  });
  return null;
}
