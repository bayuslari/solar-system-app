import { useEffect, useState } from 'react';
import * as THREE from 'three';

const cache = new Map<string, THREE.Texture>();
const loader = new THREE.TextureLoader();

export function useSafeTexture(path?: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(
    path ? cache.get(path) ?? null : null
  );

  useEffect(() => {
    if (!path) {
      setTexture(null);
      return;
    }
    const cached = cache.get(path);
    if (cached) {
      setTexture(cached);
      return;
    }
    let cancelled = false;
    loader.load(
      path,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        // Disable GPU mipmap generation — Three.js averages mip levels in the
        // wrong (linear) color space for sRGB textures, which turns small/
        // distant planets gray. LinearFilter gives clean results without mipmaps.
        tex.generateMipmaps = false;
        tex.minFilter = THREE.LinearFilter;
        tex.needsUpdate = true;
        cache.set(path, tex);
        if (!cancelled) setTexture(tex);
      },
      undefined,
      () => {
        if (!cancelled) setTexture(null);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [path]);

  return texture;
}
