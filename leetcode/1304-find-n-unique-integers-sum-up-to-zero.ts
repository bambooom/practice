// https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero
// Given an integer n, return any array containing n unique integers such that they add up to 0.

// Example 1:
// Input: n = 5
// Output: [-7,-1,1,3,4]
// Explanation: These arrays also are accepted [-5,-1,1,2,3] , [-3,-1,2,-2,4].

// Example 2:
// Input: n = 3
// Output: [-1,0,1]

// Example 3:
// Input: n = 1
// Output: [0]

function sumZero(n: number): number[] {
  // if n is even, then we can just return an array of n/2 pairs of positive and negative numbers
  // if n is odd, then we can just return an array of n/2 pairs of positive and negative numbers, and add 0 to the end
  const res: number[] = [];
  for (let i = 1; i <= n / 2; i++) {
    res.push(i, -i);
  }
  if (n % 2 !== 0) {
    res.push(0);
  }
  return res;
}

function sumZero2(n: number) {
  const res: number[] = [];
  if (n % 2) res.push(0);
  // use unsigned right shift to get the half of n
  for (let i = 1, half = n >>> 1; i <= half; i++) {
    res.push(-i, i);
  }
  return res;
}
