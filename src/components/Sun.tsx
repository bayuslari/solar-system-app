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
        {/* Tint the texture with the warm sun color so the sphere can never
            render white: even a pure-white texel multiplied by this tint comes
            out orange. This keeps the sun warm regardless of how bright the
            loaded sun.jpg is or how tone mapping treats it — the earlier
            toneMapped/additive approach let the bright texture wash out to
            white once it loaded. */}
        {texture ? (
          <meshBasicMaterial map={texture} color={SUN.color} />
        ) : (
          <meshBasicMaterial color={SUN.color} />
        )}
      </mesh>
      <sprite scale={[SUN.sceneSize * 6.2, SUN.sceneSize * 6.2, 1]}>
        <spriteMaterial map={getGlowTexture()} transparent depthWrite={false} color={0xf2a93b} />
      </sprite>
    </group>
  );
}
