import { PLANETS } from '../data/planets';

// Every texture the scene needs up front, so they can be preloaded behind the
// loading screen. The sun is rendered as a flat warm color + glow, so its
// texture is intentionally not included.
export function allTexturePaths(): string[] {
  const paths: string[] = ['/textures/milkyway.jpg'];
  for (const p of PLANETS) {
    if (p.texture) paths.push(p.texture);
    if (p.ring?.texture) paths.push(p.ring.texture);
    p.moons?.forEach((m) => {
      if (m.texture) paths.push(m.texture);
    });
  }
  return paths;
}
