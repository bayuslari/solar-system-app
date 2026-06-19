import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetData } from '../types';
import { useSafeTexture } from '../hooks/useSafeTexture';
import { useSimStore } from '../store/useSimStore';
import { registerObject3D, unregisterObject3D } from '../store/objectRegistry';
import { missionClock } from '../store/missionClock';
import { OrbitLine } from './OrbitLine';
import { Moon } from './Moon';
import { PlanetRing } from './PlanetRing';

interface Props {
  planet: PlanetData;
}

export function Planet({ planet }: Props) {
  const orbitPivotRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const initialOrbitAngle = useRef(Math.random() * Math.PI * 2);
  const initialSpinAngle = useRef(Math.random() * Math.PI * 2);

  const texture = useSafeTexture(planet.texture);
  const ringTexture = useSafeTexture(planet.ring?.texture);

  const showLabels = useSimStore((s) => s.showLabels);
  const select = useSimStore((s) => s.select);

  useEffect(() => {
    if (meshRef.current) registerObject3D(planet.id, meshRef.current);
    return () => unregisterObject3D(planet.id);
  }, [planet.id]);

  const orbitAngularSpeed = (Math.PI * 2) / planet.periodDays;
  const spinAngularSpeed = (Math.PI * 2) / planet.rotationDays;

  // Absolute position derived from missionClock — enables time-jumping.
  useFrame(() => {
    const days = missionClock.elapsedDays;
    if (orbitPivotRef.current) {
      orbitPivotRef.current.rotation.y =
        initialOrbitAngle.current + orbitAngularSpeed * days;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y =
        initialSpinAngle.current + spinAngularSpeed * days;
    }
  });

  return (
    <>
      <OrbitLine
        radius={planet.sceneDist}
        inclinationDeg={planet.inclinationDeg}
        color={planet.isDwarf ? '#4a3f55' : '#2a3a5c'}
      />
      <group rotation={[THREE.MathUtils.degToRad(planet.inclinationDeg), 0, 0]}>
        <group ref={orbitPivotRef}>
          <group position={[planet.sceneDist, 0, 0]}>
            <mesh
              ref={meshRef}
              onClick={(e) => {
                e.stopPropagation();
                select('planet', planet.id, Math.max(6, planet.sceneSize * 7));
              }}
            >
              <sphereGeometry args={[planet.sceneSize, 40, 40]} />
              {/* Lit by the sun's point light so the sphere has a day side and
                  a dark night side. emissiveMap paints the same texture back at
                  low intensity, so the night side keeps the planet's real
                  colours instead of washing out to grey. */}
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
                  color={planet.color}
                  emissive={planet.color}
                  emissiveIntensity={0.25}
                  roughness={1}
                  metalness={0}
                />
              )}
            </mesh>

            {planet.ring && (
              <PlanetRing
                innerRadius={planet.sceneSize * planet.ring.innerRatio}
                outerRadius={planet.sceneSize * planet.ring.outerRatio}
                texture={ringTexture}
              />
            )}

            {showLabels && (
              <Html distanceFactor={28} zIndexRange={[0, 0]}>
                <div className="label3d">{planet.name}</div>
              </Html>
            )}

            {planet.moons?.map((moon) => <Moon key={moon.id} moon={moon} />)}
          </group>
        </group>
      </group>
    </>
  );
}
