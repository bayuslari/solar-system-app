export type EclipseType =
  | 'solar-total'
  | 'solar-annular'
  | 'solar-partial'
  | 'solar-hybrid'
  | 'lunar-total'
  | 'lunar-partial';

export interface EclipseEvent {
  date: string; // YYYY-MM-DD
  type: EclipseType;
  region: string;
}

// Source: NASA Five Millennium Canon of Solar/Lunar Eclipses
export const ECLIPSES: EclipseEvent[] = [
  // ── 2026 ──────────────────────────────────────────────────────────────
  { date: '2026-08-12', type: 'solar-total',    region: 'Greenland, Iceland, Spain, N. Africa' },
  { date: '2026-08-28', type: 'lunar-partial',  region: 'Americas, Europe, Africa' },
  // ── 2027 ──────────────────────────────────────────────────────────────
  { date: '2027-02-06', type: 'solar-annular',  region: 'S. America, Atlantic, W. Africa, Spain' },
  { date: '2027-07-18', type: 'lunar-total',    region: 'Europe, Africa, Asia, Australia' },
  { date: '2027-08-02', type: 'solar-total',    region: 'Morocco, Algeria, Libya, Egypt, Saudi Arabia, Yemen' },
  // ── 2028 ──────────────────────────────────────────────────────────────
  { date: '2028-01-12', type: 'lunar-total',    region: 'Americas, Europe, Africa' },
  { date: '2028-01-26', type: 'solar-annular',  region: 'Ecuador, Peru, Brazil, Portugal, Spain' },
  { date: '2028-07-06', type: 'lunar-partial',  region: 'Americas, Europe, Africa' },
  { date: '2028-07-22', type: 'solar-total',    region: 'Australia, New Zealand' },
  { date: '2028-12-31', type: 'lunar-total',    region: 'Africa, Asia, Australia, Pacific' },
  // ── 2029 ──────────────────────────────────────────────────────────────
  { date: '2029-01-14', type: 'solar-partial',  region: 'N. America, Atlantic' },
  { date: '2029-06-26', type: 'lunar-total',    region: 'Americas, Europe, Africa, W. Asia' },
  { date: '2029-07-11', type: 'solar-partial',  region: 'S. Pacific' },
  { date: '2029-12-20', type: 'lunar-total',    region: 'Americas, Europe, Africa' },
  // ── 2030 ──────────────────────────────────────────────────────────────
  { date: '2030-06-01', type: 'solar-annular',  region: 'Algeria, Tunisia, Greece, Turkey, Russia, China' },
  { date: '2030-06-15', type: 'lunar-partial',  region: 'Europe, Africa, Asia' },
  { date: '2030-11-25', type: 'solar-total',    region: 'Namibia, S. Africa, Indian Ocean, Australia' },
  // ── 2031 ──────────────────────────────────────────────────────────────
  { date: '2031-05-07', type: 'lunar-total',    region: 'Americas, Europe, Africa' },
  { date: '2031-05-21', type: 'solar-annular',  region: 'Indian Ocean, S. Asia' },
  { date: '2031-10-30', type: 'lunar-total',    region: 'Americas, Europe, Africa, W. Asia' },
  { date: '2031-11-14', type: 'solar-hybrid',   region: 'Pacific' },
  // ── 2032 ──────────────────────────────────────────────────────────────
  { date: '2032-04-25', type: 'lunar-total',    region: 'Europe, Africa, Asia, Australia' },
  { date: '2032-10-18', type: 'lunar-total',    region: 'Americas, Europe, Africa, W. Asia' },
  // ── 2033 ──────────────────────────────────────────────────────────────
  { date: '2033-03-30', type: 'solar-total',    region: 'Alaska, Russia' },
  { date: '2033-04-14', type: 'lunar-total',    region: 'Americas, Europe, Africa, W. Asia' },
  { date: '2033-10-08', type: 'lunar-total',    region: 'Americas, Europe, Africa' },
  // ── 2034 ──────────────────────────────────────────────────────────────
  { date: '2034-03-20', type: 'solar-total',    region: 'Nigeria, Sudan, Egypt, Saudi Arabia, India, China' },
  { date: '2034-04-03', type: 'lunar-partial',  region: 'Africa, Europe, Asia' },
  // ── 2035 ──────────────────────────────────────────────────────────────
  { date: '2035-09-02', type: 'solar-total',    region: 'China, Korea, Japan, Pacific' },
  { date: '2035-09-28', type: 'lunar-total',    region: 'Americas, Europe, Africa, Asia' },
];

