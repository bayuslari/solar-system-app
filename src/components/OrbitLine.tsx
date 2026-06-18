import { useMemo } from 'react';
import * as THREE from 'three';
import { useSimStore } from '../store/useSimStore';

interface Props {
  radius: number;
  /** real orbital inclination relative to the ecliptic, in degrees */
  inclinationDeg?: number;
  color?: string;
}

const SEGMENTS = 128;

export function OrbitLine({ radius, inclinationDeg = 0, color = '#2a3a5c' }: Props) {
  const showOrbits = useSimStore((s) => s.showOrbits);

  const positions = useMemo(() => {
    const arr = new Float32Array((SEGMENTS + 1) * 3);
    for (let i = 0; i <= SEGMENTS; i++) {
      const a = (i / SEGMENTS) * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * radius;
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = Math.sin(a) * radius;
    }
    return arr;
  }, [radius]);

  if (!showOrbits) return null;

  return (
    <group rotation={[THREE.MathUtils.degToRad(inclinationDeg), 0, 0]}>
      <lineLoop>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.55} />
      </lineLoop>
    </group>
  );
}
