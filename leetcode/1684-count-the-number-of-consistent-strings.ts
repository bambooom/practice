// https://leetcode.com/problems/count-the-number-of-consistent-strings/description/
// You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed.
// Return the number of consistent strings in the array words.

// Example 1:
// Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
// Output: 2
// Explanation: Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.

// Example 2:
// Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
// Output: 7
// Explanation: All strings are consistent.

// Example 3:
// Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
// Output: 4
// Explanation: Strings "cc", "acd", "ac", and "d" are consistent.

// my solution, not fast
function countConsistentStrings(allowed: string, words: string[]): number {
  const allowedSet = new Set(allowed);
  let count = 0;

  for (const word of words) {
    if (word.split('').every((c) => allowedSet.has(c))) {
      count++;
    }
  }

  return count;
}

// https://leetcode.com/problems/count-the-number-of-consistent-strings/solutions/5683176/javascript-beats-94-82-set-lookup-approach/

function countConsistentStrings2(allowed: string, words: string[]): number {
  let counter = words.length;
  const allowedSet = new Set(allowed);

  for (const word of words) {
    for (const char of word) {
      if (!allowedSet.has(char)) {
        counter--;
        break;
      }
    }
  }

  return counter;
}

// https://leetcode.com/problems/count-the-number-of-consistent-strings/solutions/2683486/typescript-simple-straightforward-solution/
// compact
function countConsistentStrings3(allowed: string, words: string[]): number {
  const searchSet = new Set(allowed);

  return words.filter(
    (word) => !word.split('').some((letter) => !searchSet.has(letter)),
  ).length;
}
