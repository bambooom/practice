// https://leetcode.com/problems/count-ways-to-build-good-strings

// Given the integers zero, one, low, and high, we can construct a string by starting with an empty string, and then at each step perform either of the following:

// Append the character '0' zero times.
// Append the character '1' one times.
// This can be performed any number of times.

// A good string is a string constructed by the above process having a length between low and high (inclusive).

// Return the number of different good strings that can be constructed satisfying these properties. Since the answer can be large, return it modulo 109 + 7.

// Example 1:

// Input: low = 3, high = 3, zero = 1, one = 1
// Output: 8
// Explanation:
// One possible valid good string is "011".
// It can be constructed as follows: "" -> "0" -> "01" -> "011".
// All binary strings from "000" to "111" are good strings in this example.
// Example 2:

// Input: low = 2, high = 3, zero = 1, one = 2
// Output: 5
// Explanation: The good strings are "00", "11", "000", "110", and "011".

// https://leetcode.com/problems/count-ways-to-build-good-strings/solutions/3518052/javascript-typescript-dynamic-programming-using-recursion-and-memoization/
// dp with recursion
function countGoodStrings(
  low: number,
  high: number,
  zero: number,
  one: number,
): number {
  const MOD = 1e9 + 7;
  const cache: number[] = new Array(high + 1).fill(-1);
  cache[0] = 1; // the only valid string with length 0 is the empty string ""
  let answer = 0;

  const dfs = (i: number): number => {
    if (i < 0) {
      return 0;
    } else if (cache[i] >= 0) {
      return cache[i];
    }

    return (cache[i] = (dfs(i - zero) + dfs(i - one)) % MOD);
  };

  for (let i = low; i <= high; i++) {
    answer += dfs(i);
    answer %= MOD;
  }

  return answer;
}
