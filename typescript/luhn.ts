// https://en.wikipedia.org/wiki/Luhn_algorithm

export function valid(digitString: string): boolean {
  digitString = digitString.replace(/\s/g, '');
  if (!/^\d+$/.test(digitString) || digitString === '0') {
    return false;
  }
  const digits = digitString
    .split('')
    .reverse()
    .map((e, i) => {
      const d = Number(e);
      if (i % 2 === 1) {
        return d * 2 > 9 ? d * 2 - 9 : d * 2;
      } else {
        return d;
      }
    });
  console.log(digits);
  const sum = digits.reduce((acc, cur) => acc + cur, 0);
  console.log(sum);
  return sum % 10 === 0;
}

console.log(valid('059'));
