import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SUN } from '../data/planets';
import { useSafeTexture } from '../hooks/useSafeTexture';
import { getGlowTexture } from '../utils/glowTexture';
import { useSimStore } from '../store/useSimStore';

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useSafeTexture(SUN.texture);
  const select = useSimStore((s) => s.select);
  const paused = useSimStore((s) => s.paused);

  useFrame((_, dt) => {
    if (!paused && meshRef.current) {
      meshRef.current.rotation.y += dt * 0.04;
    }
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        select('sun', 'sun', 14);
      }}
    >
      <pointLight color={0xffe6b3} intensity={450} decay={1.6} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[SUN.sceneSize, 48, 48]} />
        {/* toneMapped={false} shows the sun.jpg in its true vivid orange. The
            earlier washout to white came from the renderer's ACES tone mapping
            desaturating the texture's highlights (and an additive glow piling
            on top) — not from the texture itself. The texture is preloaded, so
            the fallback color is only ever a brief safety net. */}
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshBasicMaterial color={SUN.color} toneMapped={false} />
        )}
      </mesh>
      <sprite scale={[SUN.sceneSize * 6.2, SUN.sceneSize * 6.2, 1]}>
        <spriteMaterial map={getGlowTexture()} transparent depthWrite={false} color={0xf2a93b} />
      </sprite>
    </group>
  );
}
