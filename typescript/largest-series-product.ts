export const largestProduct = (digitsStr: string, length: number) => {
  if (length > digitsStr.length)
    throw new Error('Span must be smaller than string length');

  if (length < 0) throw new Error('Span must be greater than zero');

  if (digitsStr.length == 0) return 1;

  const digits = digitsStr.split('').map((e) => Number(e));

  if (digits.some((e) => isNaN(e)))
    throw new Error('Digits input must only contain digits');

  // Map into windows, calculate the product of each window
  const products = digits
    .map((_, i, a) => (i + length <= a.length ? a.slice(i, i + length) : null))
    .filter((e) => !!e)
    .map((v) => v!.reduce((acc, cur) => acc * cur, 1));

  return Math.max(...products);
};
