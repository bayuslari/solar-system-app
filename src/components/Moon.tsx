import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MoonData } from '../types';
import { useSafeTexture } from '../hooks/useSafeTexture';
import { useSimStore } from '../store/useSimStore';
import { registerObject3D, unregisterObject3D } from '../store/objectRegistry';
import { missionClock } from '../store/missionClock';

interface Props {
  moon: MoonData;
}

export function Moon({ moon }: Props) {
  const pivotRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const initialOrbitAngle = useRef(Math.random() * Math.PI * 2);
  const initialSpinAngle = useRef(Math.random() * Math.PI * 2);

  const texture = useSafeTexture(moon.texture);
  const select = useSimStore((s) => s.select);

  useEffect(() => {
    if (meshRef.current) registerObject3D(moon.id, meshRef.current);
    return () => unregisterObject3D(moon.id);
  }, [moon.id]);

  const orbitAngularSpeed = (Math.PI * 2) / moon.periodDays;

  useFrame(() => {
    const days = missionClock.elapsedDays;
    if (pivotRef.current) {
      pivotRef.current.rotation.y =
        initialOrbitAngle.current + orbitAngularSpeed * days;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = initialSpinAngle.current + 0.3 * days;
    }
  });

  return (
    <group ref={pivotRef}>
      <mesh
        ref={meshRef}
        position={[moon.sceneDist, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          select('moon', moon.id, Math.max(2, moon.sceneSize * 9));
        }}
      >
        <sphereGeometry args={[moon.sceneSize, 16, 16]} />
        {/* Same day/night treatment as planets: lit by the sun with an
            emissive texture floor so the dark side stays coloured, not grey. */}
        {texture ? (
          <meshStandardMaterial
            map={texture}
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={0.25}
            roughness={1}
            metalness={0}
          />
        ) : (
          <meshStandardMaterial
            color={'#b8b8b8'}
            emissive={'#b8b8b8'}
            emissiveIntensity={0.25}
            roughness={1}
            metalness={0}
          />
        )}
      </mesh>
    </group>
  );
}
