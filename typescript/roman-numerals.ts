// type Roman = 'I' | 'V' | 'X' | 'L' | 'C' | 'D' | 'M';

const SYMBOLS: { [key: string]: number } = {
  I: 1,
  IV: 4,
  V: 5,
  IX: 9,
  X: 10,
  XL: 40,
  L: 50,
  XC: 90,
  C: 100,
  CD: 400,
  D: 500,
  CM: 900,
  M: 1000,
};

export const toRoman = (num: number): string => {
  if (num > 3000) {
    throw new Error('cannot convert integer > 3000');
  }
  const romans = Object.keys(SYMBOLS).reverse();
  let res = '';

  for (let i = 0; i < romans.length; i++) {
    const roman = romans[i];
    const cur = SYMBOLS[roman];
    if (num < cur) continue;
    while (num >= cur) {
      res += roman;
      num -= cur;
    }
    if (num === 0) break;
  }

  return res;
};

// console.log(toRoman(1));
