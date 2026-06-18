// Shared type definitions for the simulation.

export interface MoonData {
  id: string;
  name: string;
  /** distance from planet center, compressed for visibility (scene units) */
  sceneDist: number;
  sceneSize: number;
  /** real average orbital distance from parent planet, in km */
  realDistKm: number;
  periodDays: number;
  diameterKm: number;
  texture?: string;
}

export interface RingData {
  innerRatio: number;
  outerRatio: number;
  texture?: string;
}

export interface PlanetData {
  id: string;
  name: string;
  /** fallback base color if texture is missing, as a hex string e.g. "#9c9c94" */
  color: string;
  texture?: string;
  /** distance from the Sun, compressed for visibility (scene units) */
  sceneDist: number;
  sceneSize: number;
  /** real average distance from the Sun, in AU */
  auDist: number;
  diameterKm: number;
  periodDays: number;
  /** axial rotation period in (Earth) days, negative = retrograde */
  rotationDays: number;
  moonsCount: number;
  /** real orbital inclination relative to the ecliptic plane, in degrees */
  inclinationDeg: number;
  fact: string;
  ring?: RingData;
  moons?: MoonData[];
  isDwarf?: boolean;
}

export type SelectedKind = 'sun' | 'planet' | 'moon' | 'belt' | null;

export interface SelectedObject {
  kind: SelectedKind;
  id: string | null;
}
