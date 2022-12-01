// Given a number, find the sum of all the unique multiples of particular numbers up to but not including that number.
// If we list all the natural numbers below 20 that are multiples of 3 or 5, we get 3, 5, 6, 9, 10, 12, 15, and 18.
// The sum of these multiples is 78.

export function sum(factors: number[], limit: number) {
  if (!factors.length) return 0;
  const nums: Set<number> = new Set();
  factors.forEach((factor) => {
    if (factor === 0) return;
    let i = 1,
      num = 1;
    while (num < limit) {
      num = i * factor;
      if (num < limit) {
        nums.add(num);
      }
      i++;
    }
  });

  return Array.from(nums).reduce((acc, cur) => acc + cur, 0);
}

console.log(sum([2, 3, 5, 7, 11], 10000));

// compact solution
export function sum2(factors: number[], number: number): number {
  return [...Array(number).keys()]
    .filter((i) => factors.some((factor) => i % factor === 0))
    .reduce((sumMulti, i) => sumMulti + i, 0);
}
