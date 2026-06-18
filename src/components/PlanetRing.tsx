import { useMemo } from 'react';
import * as THREE from 'three';

interface Props {
  innerRadius: number;
  outerRadius: number;
  texture: THREE.Texture | null;
  fallbackColor?: string;
}

/**
 * three.js RingGeometry's default UVs run u=0..1 around the angle and v=0..1
 * from inner to outer radius. The real ring alpha texture we use (a thin
 * horizontal strip from Solar System Scope / NASA-derived imagery) instead
 * encodes its transparency gradient along its WIDTH — i.e. it expects radius
 * to be sampled along u, not v, and has no real angular variation at all.
 * Without this fix the rings render as a rotated/streaked mess.
 */
function buildRadialRingGeometry(innerRadius: number, outerRadius: number) {
  const geo = new THREE.RingGeometry(innerRadius, outerRadius, 80, 1);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const r = Math.sqrt(x * x + y * y);
    const t = THREE.MathUtils.clamp((r - innerRadius) / (outerRadius - innerRadius), 0, 1);
    uv.setXY(i, t, 0.5);
  }
  return geo;
}

export function PlanetRing({ innerRadius, outerRadius, texture, fallbackColor = '#cBB07a' }: Props) {
  const geometry = useMemo(
    () => buildRadialRingGeometry(innerRadius, outerRadius),
    [innerRadius, outerRadius]
  );

  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2.2, 0, 0]}>
      {texture ? (
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.9} />
      ) : (
        <meshBasicMaterial color={fallbackColor} side={THREE.DoubleSide} transparent opacity={0.5} />
      )}
    </mesh>
  );
}
