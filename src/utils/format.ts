export function fmtNumber(n: number): string {
  return n.toLocaleString();
}

export function fmtPeriod(days: number): string {
  if (days < 500) return Math.round(days) + ' days';
  return (days / 365.25).toFixed(1) + ' years';
}
