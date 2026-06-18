import { useMemo } from 'react';
import * as THREE from 'three';
import starsRaw from '../data/stars.json';
import { useSafeTexture } from '../hooks/useSafeTexture';

// Each entry: [x, y, z, size, colorHex] on a unit sphere.
// Source: HYG-derived open star catalog, filtered to real stars at
// magnitude <= 4.5, positioned from real RA/Dec, colored from real B-V index.
type StarEntry = [number, number, number, number, string];

const STAR_RADIUS = 480;
const SKY_RADIUS = 470;

function buildBucket(stars: StarEntry[], min: number, max: number) {
  const filtered = stars.filter((s) => s[3] >= min && s[3] < max);
  const positions = new Float32Array(filtered.length * 3);
  const colors = new Float32Array(filtered.length * 3);
  filtered.forEach((s, i) => {
    positions[i * 3] = s[0] * STAR_RADIUS;
    positions[i * 3 + 1] = s[1] * STAR_RADIUS;
    positions[i * 3 + 2] = s[2] * STAR_RADIUS;
    const c = new THREE.Color('#' + s[4]);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  });
  return { positions, colors };
}

export function StarField() {
  const skyTexture = useSafeTexture('/textures/milkyway.jpg');
  const stars = starsRaw as StarEntry[];

  const buckets = useMemo(
    () => [
      { ...buildBucket(stars, 1.8, 99), size: 2.6 },
      { ...buildBucket(stars, 1.0, 1.8), size: 1.7 },
      { ...buildBucket(stars, 0, 1.0), size: 1.0 },
    ],
    [stars]
  );

  return (
    <group>
      {skyTexture && (
        <mesh>
          <sphereGeometry args={[SKY_RADIUS, 32, 32]} />
          <meshBasicMaterial
            map={skyTexture}
            side={THREE.BackSide}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      )}
      {buckets.map((b, i) => (
        <points key={i}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[b.positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[b.colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={b.size}
            sizeAttenuation={false}
            vertexColors
            transparent
            depthWrite={false}
          />
        </points>
      ))}
    </group>
  );
}
