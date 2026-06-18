import type { PlanetData } from '../types';

// All "scene*" numbers are compressed for a legible view — see README for why.
// Every other field (auDist, diameterKm, periodDays, inclinationDeg, realDistKm,
// rotationDays, moonsCount) is the real measured/observed value.

export const SUN = {
  id: 'sun',
  name: 'Sun',
  color: '#f2a93b',
  texture: '/textures/sun.jpg',
  sceneSize: 3.6,
  diameterKm: 1392700,
  fact: 'Contains about 99.8% of the Solar System\'s total mass. Light from its surface takes 8 minutes 20 seconds to reach Earth.',
};

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#9c9c94',
    texture: '/textures/mercury.jpg',
    sceneDist: 9,
    sceneSize: 0.34,
    auDist: 0.39,
    diameterKm: 4879,
    periodDays: 88,
    rotationDays: 58.6,
    moonsCount: 0,
    inclinationDeg: 7.0,
    fact: 'A year on Mercury is shorter than a single Mercury day — it spins so slowly that one sunrise to the next takes 176 Earth days.',
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#d9c27e',
    texture: '/textures/venus.jpg',
    sceneDist: 13,
    sceneSize: 0.52,
    auDist: 0.72,
    diameterKm: 12104,
    periodDays: 225,
    rotationDays: -243,
    moonsCount: 0,
    inclinationDeg: 3.39,
    fact: 'Rotates backward (retrograde) and is the hottest planet, thanks to a runaway greenhouse atmosphere of carbon dioxide.',
  },
  {
    id: 'earth',
    name: 'Earth',
    color: '#3a6ea5',
    texture: '/textures/earth.jpg',
    sceneDist: 18,
    sceneSize: 0.55,
    auDist: 1.0,
    diameterKm: 12742,
    periodDays: 365.25,
    rotationDays: 1,
    moonsCount: 1,
    inclinationDeg: 0,
    fact: 'The reference plane for every inclination value here — Earth\'s orbit defines the ecliptic, so its own inclination is 0° by definition.',
    moons: [
      {
        id: 'moon',
        name: 'Moon',
        sceneDist: 1.3,
        sceneSize: 0.15,
        realDistKm: 384400,
        periodDays: 27.32,
        diameterKm: 3474,
        texture: '/textures/moon.jpg',
      },
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#c1440e',
    texture: '/textures/mars.jpg',
    sceneDist: 24,
    sceneSize: 0.42,
    auDist: 1.52,
    diameterKm: 6779,
    periodDays: 687,
    rotationDays: 1.03,
    moonsCount: 2,
    inclinationDeg: 1.85,
    fact: 'Home to Olympus Mons, the largest volcano in the Solar System, roughly 2.5x the height of Mount Everest.',
    moons: [
      { id: 'phobos', name: 'Phobos', sceneDist: 0.7, sceneSize: 0.07, realDistKm: 9376, periodDays: 0.319, diameterKm: 22.4 },
      { id: 'deimos', name: 'Deimos', sceneDist: 0.95, sceneSize: 0.05, realDistKm: 23463, periodDays: 1.262, diameterKm: 12.4 },
    ],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#d9b382',
    texture: '/textures/jupiter.jpg',
    sceneDist: 38,
    sceneSize: 2.2,
    auDist: 5.2,
    diameterKm: 139820,
    periodDays: 4333,
    rotationDays: 0.41,
    moonsCount: 95,
    inclinationDeg: 1.3,
    fact: 'So massive that its gravity helps shield the inner planets from comet and asteroid debris.',
    moons: [
      { id: 'io', name: 'Io', sceneDist: 3.0, sceneSize: 0.22, realDistKm: 421700, periodDays: 1.769, diameterKm: 3643 },
      { id: 'europa', name: 'Europa', sceneDist: 3.6, sceneSize: 0.19, realDistKm: 671100, periodDays: 3.551, diameterKm: 3122 },
      { id: 'ganymede', name: 'Ganymede', sceneDist: 4.4, sceneSize: 0.26, realDistKm: 1070400, periodDays: 7.155, diameterKm: 5268 },
      { id: 'callisto', name: 'Callisto', sceneDist: 5.2, sceneSize: 0.24, realDistKm: 1882700, periodDays: 16.69, diameterKm: 4821 },
    ],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#e3c16f',
    texture: '/textures/saturn.jpg',
    sceneDist: 52,
    sceneSize: 1.9,
    auDist: 9.58,
    diameterKm: 116460,
    periodDays: 10759,
    rotationDays: 0.44,
    moonsCount: 146,
    inclinationDeg: 2.49,
    fact: 'Its rings are made almost entirely of ice and rock, ranging from dust-sized grains to house-sized chunks.',
    ring: { innerRatio: 1.4, outerRatio: 2.3, texture: '/textures/saturn_ring.png' },
    moons: [
      { id: 'enceladus', name: 'Enceladus', sceneDist: 4.7, sceneSize: 0.1, realDistKm: 238020, periodDays: 1.37, diameterKm: 504 },
      { id: 'rhea', name: 'Rhea', sceneDist: 5.6, sceneSize: 0.15, realDistKm: 527000, periodDays: 4.518, diameterKm: 1527 },
      { id: 'titan', name: 'Titan', sceneDist: 6.6, sceneSize: 0.25, realDistKm: 1221870, periodDays: 15.945, diameterKm: 5150 },
    ],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#9fe8e0',
    texture: '/textures/uranus.jpg',
    sceneDist: 64,
    sceneSize: 1.2,
    auDist: 19.18,
    diameterKm: 50724,
    periodDays: 30687,
    rotationDays: -0.72,
    moonsCount: 28,
    inclinationDeg: 0.77,
    fact: 'Tilted on its side at 98°, Uranus essentially orbits the Sun rolling like a ball, with poles that take turns facing the Sun.',
    moons: [
      { id: 'titania', name: 'Titania', sceneDist: 3.0, sceneSize: 0.14, realDistKm: 436300, periodDays: 8.706, diameterKm: 1578 },
      { id: 'oberon', name: 'Oberon', sceneDist: 3.6, sceneSize: 0.14, realDistKm: 583500, periodDays: 13.46, diameterKm: 1523 },
    ],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#3454d1',
    texture: '/textures/neptune.jpg',
    sceneDist: 74,
    sceneSize: 1.15,
    auDist: 30.07,
    diameterKm: 49244,
    periodDays: 60190,
    rotationDays: 0.67,
    moonsCount: 16,
    inclinationDeg: 1.77,
    fact: 'The windiest planet, with storms clocked above 2,000 km/h. Its moon Triton orbits backward, opposite Neptune\'s own rotation.',
    moons: [
      { id: 'triton', name: 'Triton', sceneDist: 2.8, sceneSize: 0.16, realDistKm: 354800, periodDays: 5.877, diameterKm: 2706 },
    ],
  },
  {
    id: 'pluto',
    name: 'Pluto',
    color: '#cbb6a3',
    sceneDist: 86,
    sceneSize: 0.28,
    auDist: 39.48,
    diameterKm: 2376,
    periodDays: 90560,
    rotationDays: 6.39,
    moonsCount: 5,
    inclinationDeg: 17.16,
    isDwarf: true,
    fact: 'Reclassified as a dwarf planet in 2006. Its orbit is tilted 17° from the ecliptic — the most dramatic tilt of any body shown here.',
    moons: [
      { id: 'charon', name: 'Charon', sceneDist: 0.6, sceneSize: 0.13, realDistKm: 19596, periodDays: 6.387, diameterKm: 1212 },
    ],
  },
];

export function findPlanet(id: string) {
  return PLANETS.find((p) => p.id === id);
}

export function findMoon(id: string) {
  for (const p of PLANETS) {
    const m = p.moons?.find((m) => m.id === id);
    if (m) return { moon: m, parent: p };
  }
  return undefined;
}

// Real statistical parameters for the main asteroid belt (not a per-object catalog —
// there is no practical way to embed positions for ~1-2 million real objects, so this
// is a procedurally scattered field using the belt's true spatial extent and rough count).
export const ASTEROID_BELT = {
  id: 'belt',
  name: 'Asteroid Belt',
  innerAU: 2.1,
  outerAU: 3.3,
  // scene units mirror the planet sceneDist compression (~6.5 scene units per AU near this range)
  innerScene: 28,
  outerScene: 34,
  renderCount: 2200,
  estimatedCount: '1-1.9 million bodies > 1 km',
  largestObject: 'Ceres (940 km, classified as a dwarf planet)',
  totalMass: "~3% of the Moon's mass",
  fact: 'Despite the dense look in illustrations, the real belt is mostly empty space — spacecraft cross it routinely without a planned course correction for avoidance.',
};
