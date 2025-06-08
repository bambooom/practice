// https://leetcode.com/problems/lexicographical-numbers
// Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.
// You must write an algorithm that runs in O(n) time and uses O(1) extra space.

// Example 1:
// Input: n = 13
// Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
// Example 2:
// Input: n = 2
// Output: [1,2]

// my solution, straightforward, but slow
function lexicalOrder(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => (i + 1).toString());
  arr.sort();
  return arr.map(Number);
}

// https://leetcode.com/problems/lexicographical-numbers/solutions/4837546/simple-dfs-approach/
// simple dfs
function lexicalOrder2(n: number): number[] {
  const res: number[] = [];

  const backtracking = (prev: number): void => {
    if (prev > n) {
      return;
    }

    res.push(prev);

    prev *= 10;

    for (let i = prev === 0 ? 1 : 0; i <= 9; i++) {
      backtracking(prev + i);
    }
  };

  backtracking(0);
  return res.slice(1);
}

// iterative
function lexicalOrder3(n: number): number[] {
  const res: number[] = [];

  for (let i = 0, curr = 1; i < n; i++) {
    res.push(curr);
    curr *= 10;

    if (curr > n) {
      while (curr % 10 === 9 || curr >= n) {
        curr = Math.floor(curr / 10);
      }
      curr++;
    }
  }

  return res;
}
