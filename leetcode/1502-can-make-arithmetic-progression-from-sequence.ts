// https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence/

// check 是否可以成为等差数列

// general solution: sort the array first and then check the difference
// time: O(n*log n)
function canMakeArithmeticProgression(arr: number[]): boolean {
  arr.sort((a, b) => a - b);
  const d = arr[1] - arr[0];
  for (let i = 2; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] !== d) {
      return false;
    }
  }
  return true;
}

// Another appoach:
// - find max, min, calculate the difference gap for each step
// - check if each step number is in the numbers set
// time: O(n)
function canMakeArithmeticProgression2(arr: number[]): boolean {
  const set = new Set(arr);
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const gap = (max - min) / (arr.length - 1);

  let cur = min;
  while (cur < max) {
    cur += gap;
    if (!set.has(cur)) return false;
  }
  return true;
}
