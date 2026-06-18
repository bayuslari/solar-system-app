import { useEffect, useState } from 'react';
import * as THREE from 'three';

const cache = new Map<string, THREE.Texture>();
const loader = new THREE.TextureLoader();

function configure(tex: THREE.Texture) {
  tex.colorSpace = THREE.SRGBColorSpace;
  // Disable GPU mipmap generation — Three.js averages mip levels in the
  // wrong (linear) color space for sRGB textures, which turns small/
  // distant planets gray. LinearFilter gives clean results without mipmaps.
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
}

/**
 * Warms the shared texture cache so the scene can render fully textured on
 * first paint instead of flashing flat fallback colors while large textures
 * stream in. Resolves once every path has loaded (or failed — a failed
 * texture just falls back to its color, it never blocks startup).
 */
export function preloadTextures(
  paths: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  const unique = [...new Set(paths)];
  const total = unique.length;
  if (total === 0) return Promise.resolve();

  let loaded = 0;
  return new Promise((resolve) => {
    const tick = () => {
      loaded += 1;
      onProgress?.(loaded, total);
      if (loaded === total) resolve();
    };
    for (const path of unique) {
      if (cache.has(path)) {
        tick();
        continue;
      }
      loader.load(
        path,
        (tex) => {
          configure(tex);
          cache.set(path, tex);
          tick();
        },
        undefined,
        tick
      );
    }
  });
}

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
        configure(tex);
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
