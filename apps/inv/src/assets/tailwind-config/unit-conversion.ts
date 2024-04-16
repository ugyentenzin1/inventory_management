

export function customUnit(...values: number[]): Record<number, string> {

  const spacingValues: Record<number, string> = {};
  const baseFontSize: number = 16;
  for (const value of values) {
    spacingValues[value] = `${value / baseFontSize}rem`;
  }
  return spacingValues;
}


export const spacingValues: Record<number, string> =
  customUnit(0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 60);
