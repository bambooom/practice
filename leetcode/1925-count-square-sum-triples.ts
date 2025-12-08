// https://leetcode.com/problems/count-square-sum-triples/
// A square triple (a,b,c) is a triple where a, b, and c are integers and a2 + b2 = c2.
// Given an integer n, return the number of square triples such that 1 <= a, b, c <= n.

// Example 1:
// Input: n = 5
// Output: 2
// Explanation: The square triples are (3,4,5) and (4,3,5).

// Example 2:
// Input: n = 10
// Output: 4
// Explanation: The square triples are (3,4,5), (4,3,5), (6,8,10), and (8,6,10).

function countTriples(n: number): number {
  let result = 0;

  for (let i = n; i > 2; i--) {
    let left = 1;
    let right = i - 1;

    while (left < right) {
      if (left * left + right * right < i * i) {
        left++;
        continue;
      }
      if (left * left + right * right > i * i) {
        right--;
        continue;
      }
      if (left * left + right * right === i * i) {
        result++;
        left++;
        right--;
      }
    }
  }
  //  final result is then doubled to account for the fact that (a, b, c) and (b, a, c) are considered the same triplet.
  return result * 2;
}

// trivia
function countTriples2(n: number): number {
  let count: number = 0;

  for (let i = 1; i < n; i++) {
    // j starting from i+1, because we don't have to check same pairs again
    for (let j = i + 1; j <= n; j++) {
      const sumSqrt: number = Math.sqrt(i * i + j * j);

      // if sumSqrt starts to exceed n, we can safely break.
      if (sumSqrt > n) break;

      // if square root is an integer, increment count
      // counting two times, because if a^2 + b^2 = c^2, then b^2 + a^2 = c^2
      if (Number.isInteger(sumSqrt)) count += 2;
    }
  }

  return count;
}
