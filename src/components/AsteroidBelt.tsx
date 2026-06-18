import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ASTEROID_BELT } from '../data/planets';
import { useSimStore } from '../store/useSimStore';
import { registerObject3D, unregisterObject3D } from '../store/objectRegistry';

// There is no practical way to embed real positions for the ~1-1.9 million
// actual bodies in the belt, so this is a procedurally scattered field built
// from the belt's true spatial extent (2.1-3.3 AU) and a representative count,
// rotated at roughly the average orbital period for that distance (~4.4 years,
// via Kepler's third law) rather than each rock's individual real period.

export function AsteroidBelt() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const speed = useSimStore((s) => s.speed);
  const paused = useSimStore((s) => s.paused);
  const select = useSimStore((s) => s.select);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = ASTEROID_BELT.renderCount;

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const radius =
        ASTEROID_BELT.innerScene + Math.random() * (ASTEROID_BELT.outerScene - ASTEROID_BELT.innerScene);
      const angle = Math.random() * Math.PI * 2;
      const yJitter = (Math.random() - 0.5) * 1.4;
      const scale = 0.04 + Math.random() * 0.16;
      dummy.position.set(Math.cos(angle) * radius, yJitter, Math.sin(angle) * radius);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    registerObject3D('belt', meshRef.current);
    return () => unregisterObject3D('belt');
  }, [count, dummy]);

  const angularSpeedPerDay = (Math.PI * 2) / 1618; // ~4.4 real years, representative

  useFrame((_, dt) => {
    if (paused || !groupRef.current) return;
    groupRef.current.rotation.y += angularSpeedPerDay * speed * dt;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        onClick={(e) => {
          e.stopPropagation();
          select('belt', 'belt', 40);
        }}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#8a7d6e" roughness={1} />
      </instancedMesh>
    </group>
  );
}
