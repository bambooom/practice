// https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays

// You are given two integer arrays of equal length target and arr. In one step, you can select any non-empty subarray of arr and reverse it. You are allowed to make any number of steps.

// Return true if you can make arr equal to target or false otherwise.

// my solution: use hash table, 2 arrays should have the same elements
function canBeEqual(target: number[], arr: number[]): boolean {
  const hash: Record<number, number> = {};
  for (const v of target) {
    hash[v] = (hash[v] ?? 0) + 1;
  }

  for (const t of arr) {
    if (!hash[t]) {
      return false;
    }
    hash[t] -= 1;
    if (hash[t] === 0) {
      delete hash[t];
    }
  }

  return Object.keys(hash).length === 0;
}

//https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays/solutions/5214726/my-solution/?envType=daily-question&envId=2024-08-03
// more simple, using sorting
function canBeEqual2(target: number[], arr: number[]): boolean {
  const targetSorted = target.sort((a, b) => a - b);
  const arrSorted = arr.sort((a, b) => a - b);

  return targetSorted.every((e, i) => e == arrSorted[i]);
}
