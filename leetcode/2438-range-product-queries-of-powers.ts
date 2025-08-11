// https://leetcode.com/problems/range-product-queries-of-powers
// Given a positive integer n, there exists a 0-indexed array called powers, composed of the minimum number of powers of 2 that sum to n. The array is sorted in non-decreasing order, and there is only one way to form the array.
// You are also given a 0-indexed 2D integer array queries, where queries[i] = [lefti, righti]. Each queries[i] represents a query where you have to find the product of all powers[j] with lefti <= j <= righti.
// Return an array answers, equal in length to queries, where answers[i] is the answer to the ith query. Since the answer to the ith query may be too large, each answers[i] should be returned modulo 10^9 + 7.

// Example 1:
// Input: n = 15, queries = [[0,1],[2,2],[0,3]]
// Output: [2,4,64]
// Explanation:
// For n = 15, powers = [1,2,4,8]. It can be shown that powers cannot be a smaller size.
// Answer to 1st query: powers[0] * powers[1] = 1 * 2 = 2.
// Answer to 2nd query: powers[2] = 4.
// Answer to 3rd query: powers[0] * powers[1] * powers[2] * powers[3] = 1 * 2 * 4 * 8 = 64.
// Each answer modulo 109 + 7 yields the same answer, so [2,4,64] is returned.

// Example 2:
// Input: n = 2, queries = [[0,0]]
// Output: [2]
// Explanation:
// For n = 2, powers = [2].
// The answer to the only query is powers[0] = 2. The answer modulo 109 + 7 is the same, so [2] is returned.

// editorial
function productQueries(n: number, queries: number[][]): number[] {
  const mod = 10 ** 9 + 7;
  const bins: number[] = []; // array to store the powers of 2

  let rep = 1; // current power of 2
  while (n > 0) {
    // If n is odd, add the current power of 2 to the bins array
    if (n % 2 === 1) {
      bins.push(rep);
    }
    // Divide n by 2 and update the current power of 2
    n = Math.floor(n / 2);
    rep *= 2;
  }

  // Initialize an array to store the results of each query
  const ans: number[] = [];

  for (const [start, end] of queries) {
    let cur = 1;
    // Loop through the range of each query
    for (let i = start; i <= end; i++) {
      // Multiply the current product by the power of 2 at index i
      cur = (cur * bins[i]) % mod;
      // bins[i] represents the i-th power of 2 that was calculated earlier.
      // cur is the current product of powers of 2 that we've seen so far in the query range [start, end].
      // By multiplying cur by bins[i], we're effectively adding the i-th power of 2 to the product.
    }
    // Add the result of the current query to the ans array
    ans.push(cur);
  }
  return ans;
}
