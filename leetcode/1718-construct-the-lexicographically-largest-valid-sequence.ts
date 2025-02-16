// https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence/description/

// Given an integer n, find a sequence that satisfies all of the following:
// The integer 1 occurs once in the sequence.
// Each integer between 2 and n occurs twice in the sequence.
// For every integer i between 2 and n, the distance between the two occurrences of i is exactly i.
// The distance between two numbers on the sequence, a[i] and a[j], is the absolute difference of their indices, |j - i|.
// Return the lexicographically largest sequence. It is guaranteed that under the given constraints, there is always a solution.
// A sequence a is lexicographically larger than a sequence b (of the same length) if in the first position where a and b differ, sequence a has a number greater than the corresponding number in b. For example, [0,1,9,0] is lexicographically larger than [0,1,5,6] because the first position they differ is at the third number, and 9 is greater than 5.

// Example 1:
// Input: n = 3
// Output: [3,1,2,3,2]
// Explanation: [2,3,2,1,3] is also a valid sequence, but [3,1,2,3,2] is the lexicographically largest valid sequence.

// Example 2:
// Input: n = 5
// Output: [5,3,1,4,3,5,2,4,2]

// https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence/solutions/6427404/backtracking/
// backtracking
function constructDistancedSequence(n: number): number[] {
  // init result array, size 2n-1
  const resultSequence: number[] = new Array(n * 2 - 1).fill(0);
  const isNumberUsed: boolean[] = new Array(n + 1);

  const backtrack = (i: number): boolean => {
    if (i === resultSequence.length) {
      return true; // stop when all numbers are used and valid
    }
    if (resultSequence[i] !== 0) {
      // already has value. track next
      return backtrack(i + 1);
    }

    for (let num = n; num >= 1; num--) {
      if (isNumberUsed[num]) {
        continue;
      }

      isNumberUsed[num] = true;
      resultSequence[i] = num;

      if (num === 1) {
        if (backtrack(i + 1)) {
          return true;
        }
      } else if (
        i + num < resultSequence.length &&
        resultSequence[i + num] === 0
      ) {
        resultSequence[i + num] = num;
        if (backtrack(i + 1)) {
          return true;
        }
        resultSequence[i + num] = 0;
      }

      resultSequence[i] = 0;
      isNumberUsed[num] = false;
    }

    return false;
  };

  backtrack(0);
  return resultSequence;
}
