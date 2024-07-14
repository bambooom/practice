// https://leetcode.com/problems/factor-combinations
// Numbers can be regarded as the product of their factors.
// For example, 8 = 2 x 2 x 2 = 2 x 4.
// Given an integer n, return all possible combinations of its factors. You may return the answer in any order.
// Note that the factors should be in the range [2, n - 1].

// Example 1:
// Input: n = 1
// Output: []
// Example 2:
// Input: n = 12
// Output: [[2,6],[3,4],[2,2,3]]
// Example 3:
// Input: n = 37
// Output: []

// https://leetcode.com/problems/factor-combinations/solutions/4484801/typescript-simple-solution-backtrack/?envType=study-plan-v2&envId=premium-algo-100
function getFactors(n: number): number[][] {
  const answer: number[][] = [];
  const stack: number[] = [];

  const backtrack = (n: number, min = 2) => {
    if (n < 2) {
      if (stack.length > 1) {
        answer.push([...stack]);
      }
      return;
    }

    for (let i = min; i <= n; i++) {
      if (n % i !== 0) continue;
      stack.push(i);
      backtrack(n / i, i);
      stack.pop();
    }
  };

  backtrack(n);
  return answer;
}
