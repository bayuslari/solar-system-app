import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MoonData } from '../types';
import { useSafeTexture } from '../hooks/useSafeTexture';
import { registerObject3D, unregisterObject3D } from '../store/objectRegistry';
import { missionClock } from '../store/missionClock';

interface Props {
  moon: MoonData;
}

// Earth's own orbital pivot rotates its whole subtree (including this moon's
// pivot) around the sun, but always translates the child along its *local*
// +X afterwards — so in that local frame, +X consistently means "radially
// away from the sun" no matter what angle Earth is actually at. That lets us
// point the real Moon at its true calendar phase without ever knowing
// Earth's current orbital angle: angle 0 (local +X, far side of Earth from
// the sun) is full moon — correct geometry for a lunar eclipse — and angle
// π (local -X, sun side) is new moon — correct for a solar eclipse. Without
// this, the moon sat at a random orbital phase and eclipse dates in
// eclipses.ts (real NASA dates) never lined up with the 3D scene.
const SYNODIC_MONTH_DAYS = 29.530588853;
const REFERENCE_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14);

function realMoonOrbitAngle(nowMs: number) {
  const daysSince = (nowMs - REFERENCE_NEW_MOON_MS) / 86400000;
  const phase = ((daysSince % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS;
  const phaseAngle = (phase / SYNODIC_MONTH_DAYS) * Math.PI * 2; // 0 = new moon
  return phaseAngle + Math.PI; // 0 = full moon (away from sun), π = new moon (toward sun)
}

export function Moon({ moon }: Props) {
  const pivotRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const initialOrbitAngle = useRef(Math.random() * Math.PI * 2);
  const initialSpinAngle = useRef(Math.random() * Math.PI * 2);

  const texture = useSafeTexture(moon.texture);

  useEffect(() => {
    if (meshRef.current) registerObject3D(moon.id, meshRef.current);
    return () => unregisterObject3D(moon.id);
  }, [moon.id]);

  const orbitAngularSpeed = (Math.PI * 2) / moon.periodDays;

  const isEarthsMoon = moon.id === 'moon';

  useFrame(() => {
    const days = missionClock.elapsedDays;
    if (pivotRef.current) {
      pivotRef.current.rotation.y = isEarthsMoon
        ? realMoonOrbitAngle(missionClock.startDate.getTime() + days * 86400000)
        : initialOrbitAngle.current + orbitAngularSpeed * days;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = initialSpinAngle.current + 0.3 * days;
    }
  });

  return (
    <group ref={pivotRef}>
      <mesh ref={meshRef} position={[moon.sceneDist, 0, 0]}>
        <sphereGeometry args={[moon.sceneSize, 16, 16]} />
        {/* Same day/night treatment as planets: lit by the sun with an
            emissive texture floor so the dark side stays coloured, not grey. */}
        {texture ? (
          <meshStandardMaterial
            map={texture}
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={0.16}
            roughness={1}
            metalness={0}
          />
        ) : (
          <meshStandardMaterial
            color={'#b8b8b8'}
            emissive={'#b8b8b8'}
            emissiveIntensity={0.16}
            roughness={1}
            metalness={0}
          />
        )}
      </mesh>
    </group>
  );
}
