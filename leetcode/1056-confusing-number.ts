// https://leetcode.com/problems/confusing-number/
// A confusing number is a number that when rotated 180 degrees becomes a different number with each digit valid.
// When 0, 1, 6, 8, and 9 are rotated 180 degrees, they become 0, 1, 9, 8, and 6 respectively.
// When 2, 3, 4, 5, and 7 are rotated 180 degrees, they become invalid.
// Given an integer n, return true if it is a confusing number, or false otherwise.

// 比较直接的方法，拆成 digits，包含 2, 3, 4, 5, 6, 7 的肯定不是 confusing number
// 然后再 reverse 数字，得到的和原来的数字对比即可
function confusingNumber(n: number): boolean {
  const map: { [key: number]: number } = {
    0: 0,
    1: 1,
    6: 9,
    8: 8,
    9: 6,
  };
  const digits = n.toString().split('').map(Number);
  if (digits.some((d) => [2, 3, 4, 5, 7].includes(d))) {
    return false;
  }
  const res: number[] = [];
  digits.forEach((d) => {
    res.unshift(map[d]);
  });
  return Number(res.join('')) !== n;
}

function confusingNumber2(n: number): boolean {
  let k = n;
  const map = new Map([
    [0, 0],
    [1, 1],
    [6, 9],
    [8, 8],
    [9, 6],
  ]);
  let rotated = 0;
  while (k) {
    const num = k % 10;
    if (!map.has(num)) return false;
    rotated = rotated * 10 + (map.get(num) as number);
    k = Math.floor(k / 10);
  }
  return rotated !== n;
}
