import { PLANETS, SUN } from '../data/planets';

// Every texture the scene needs up front, so they can be preloaded behind the
// loading screen and the scene appears fully textured on first paint.
export function allTexturePaths(): string[] {
  const paths: string[] = ['/textures/milkyway.jpg'];
  if (SUN.texture) paths.push(SUN.texture);
  for (const p of PLANETS) {
    if (p.texture) paths.push(p.texture);
    if (p.ring?.texture) paths.push(p.ring.texture);
    p.moons?.forEach((m) => {
      if (m.texture) paths.push(m.texture);
    });
  }
  return paths;
}
