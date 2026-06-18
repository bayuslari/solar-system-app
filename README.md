# Solar System Telemetry

Interactive 3D solar system built with React + TypeScript + Vite + react-three-fiber.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL. `npm run build` produces a production build in `dist/`.

## What's real vs. simplified

**Real data:**
- Distances (AU), orbital periods, diameters, axial rotation periods, and moon counts for all 8 planets and Pluto.
- Orbital inclination relative to the ecliptic for every body (Mercury 7.0°, Venus 3.39°, Earth 0° by definition, Mars 1.85°, Jupiter 1.3°, Saturn 2.49°, Uranus 0.77°, Neptune 1.77°, Pluto 17.16°) — each orbit is actually tilted in the scene, not flattened onto one plane.
- 14 real moons (Earth's Moon, Phobos/Deimos, the 4 Galilean moons, Titan/Enceladus/Rhea, Titania/Oberon, Triton, Charon) with real distance-from-planet, period, and diameter.
- The starfield: 921 real stars (HYG-derived open catalog, magnitude ≤ 4.5), placed using actual RA/Dec and colored from actual B-V color index — not randomly scattered.
- Planet/Sun/Moon/ring textures: real NASA-derived imagery (Solar System Scope, CC BY 4.0), sourced via an MIT-licensed open repo and bundled in `public/textures/`.

**Simplified on purpose:**
- Distances and sizes are compressed (`sceneDist` / `sceneSize` in `src/data/planets.ts`) so everything fits in one legible view. The real values are stored separately (`auDist`, `diameterKm`, etc.) and shown in the data card.
- Orbits are tilted by inclination only, not by the longitude of ascending node — so the *tilt angle* is real but the *direction* it tilts toward is stylized. Full Keplerian elements (eccentricity, argument of periapsis, etc.) aren't modeled; orbits are circular, not elliptical.
- The asteroid belt is a procedurally scattered field (2,200 instanced rocks across the real 2.1–3.3 AU span), not a catalog of actual asteroids — there's no practical way to embed positions for the ~1-2 million real bodies. It's a statistical representation, not literal data, and the whole belt rotates at one representative period rather than each rock's individual real period.
- Moons other than Earth's use a generic grey material (no individual texture available in the source asset pack).

## Attribution

- Textures: Solar System Scope (https://www.solarsystemscope.com/textures/), CC BY 4.0, derived from NASA imagery. Bundled via the MIT-licensed repo `dogahwisdom/solar-system`.
- Star catalog: HYG-derived dataset from the open-source `d3-celestial` project (ofrohn/d3-celestial), itself built on the Hipparcos/Yale/Gliese catalogs.

## Tuning knobs if you keep building on this

- `src/components/Sun.tsx` — `pointLight intensity` controls overall scene brightness; three.js's photometric lighting means this number doesn't map 1:1 to older three.js versions you may have used before.
- `src/data/planets.ts` — `sceneDist`/`sceneSize` per body if you want a different visual balance (e.g. more realistic relative spacing at the cost of outer planets being far off-screen).
- Bundle size is ~1MB JS after minification (mostly three.js) — fine for a dev/portfolio project, but consider `manualChunks` or dynamic imports if this becomes part of a larger app.
- No texture for Uranus/Neptune rings (they have faint real rings, omitted here for scope).
