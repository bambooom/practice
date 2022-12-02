// 3-598-21508-8
// (x1 * 10 + x2 * 9 + x3 * 8 + x4 * 7 + x5 * 6 + x6 * 5 + x7 * 4 + x8 * 3 + x9 * 2 + x10 * 1) mod 11 == 0

export function isValid(isbn: string): boolean {
  if (!isbn) return false;
  const digits = isbn.match(/\d|X/g);
  if (!digits) throw new Error('wrong format');
  if (digits.length !== 10) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const d = digits[i];
    if (i !== 9 && Number.isNaN(Number(d))) {
      return false;
    }
    if (i === 9 && d === 'X') {
      sum += 10 * 1;
    } else {
      sum += Number(d) * (10 - i);
    }
  }

  return sum % 11 === 0;
}

console.log(isValid('3-598-21507-X')); // true
