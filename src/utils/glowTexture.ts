import * as THREE from 'three';

let cached: THREE.CanvasTexture | null = null;

/** A soft white-to-transparent radial gradient, tinted by the sun's color in the shader via the sprite material color. */
export function getGlowTexture(): THREE.CanvasTexture {
  if (cached) return cached;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, 'rgba(255,255,255,0.9)');
  grd.addColorStop(0.3, 'rgba(255,200,120,0.45)');
  grd.addColorStop(1, 'rgba(255,200,120,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 256, 256);
  cached = new THREE.CanvasTexture(c);
  return cached;
}
