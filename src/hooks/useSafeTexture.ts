import { useEffect, useState } from 'react';
import * as THREE from 'three';

// Per-session cache — keyed by a session ID so hard-reloads always get fresh textures.
const SESSION = Math.random().toString(36).slice(2);
const cache = new Map<string, THREE.Texture>();
const loader = new THREE.TextureLoader();
// Expose for debugging
(globalThis as Record<string, unknown>)._textureSession = SESSION;

/**
 * Loads a texture without suspending and without throwing if the file is
 * missing (e.g. the user hasn't dropped the NASA-derived textures into
 * /public/textures yet). Returns null until loaded, or if it fails —
 * callers should keep a solid base color as a fallback in that case.
 */
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
        cache.set(path, tex);
        if (!cancelled) setTexture(tex);
      },
      undefined,
      () => {
        // Missing/failed texture: silently fall back to the base color material.
        if (!cancelled) setTexture(null);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [path]);

  return texture;
}
