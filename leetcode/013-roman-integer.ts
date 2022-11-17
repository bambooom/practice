/**
 * Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
 */

type Roman = 'I' | 'V' | 'X' | 'L' | 'C' | 'D' | 'M';

const SYMBOLS: Record<Roman, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

export function romanToInt(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const cur: number = SYMBOLS[s[i] as Roman];
    if (i + 1 === s.length) {
      n += cur;
      break;
    } else {
      const next = SYMBOLS[s[i + 1] as Roman];
      if (cur < next) {
        n += next - cur;
        i++;
      } else {
        n += cur;
      }
    }
  }
  return n;
}
