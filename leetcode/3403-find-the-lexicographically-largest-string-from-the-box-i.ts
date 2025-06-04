// https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i/
// You are given a string word, and an integer numFriends.
// Alice is organizing a game for her numFriends friends. There are multiple rounds in the game, where in each round:
// word is split into numFriends non-empty strings, such that no previous round has had the exact same split.
// All the split words are put into a box.
// Find the lexicographically largest string from the box after all the rounds are finished.

// Example 1:
// Input: word = "dbca", numFriends = 2
// Output: "dbc"
// Explanation:
// All possible splits are:
// "d" and "bca".
// "db" and "ca".
// "dbc" and "a".

// Example 2:
// Input: word = "gggg", numFriends = 4
// Output: "g"
// Explanation:
// The only possible split is: "g", "g", "g", and "g".

// https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i/solutions/6199706/beats-100-simple-solution/?envType=daily-question&envId=2025-06-04

function answerString(word: string, numFriends: number): string {
  // base case: only 1 friend, return the whole word
  if (numFriends === 1) return word;

  const n = word.length;
  const splitLength = n - numFriends; // length need to do split on, remaining length of the word
  let max = '';
  let cur = '';

  for (let i = 0; i < n; i++) {
    cur = word.slice(i, i + splitLength + 1); // kind of like a sliding window
    if (cur > max) {
      max = cur;
    }
  }

  return max;
}
