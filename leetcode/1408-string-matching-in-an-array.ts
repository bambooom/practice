// https://leetcode.com/problems/string-matching-in-an-array/
// Given an array of string words, return all strings in words that is a substring of another word. You can return the answer in any order.
// A substring is a contiguous sequence of characters within a string

// Example 1:
// Input: words = ["mass","as","hero","superhero"]
// Output: ["as","hero"]
// Explanation: "as" is substring of "mass" and "hero" is substring of "superhero".
// ["hero","as"] is also a valid answer.

// Example 2:
// Input: words = ["leetcode","et","code"]
// Output: ["et","code"]
// Explanation: "et", "code" are substring of "leetcode".

// Example 3:
// Input: words = ["blue","green","bu"]
// Output: []
// Explanation: No string of words is substring of another string.

function stringMatching(words: string[]): string[] {
  words.sort((a, b) => a.length - b.length);

  const matched = new Set<string>();

  for (let i = 0; i < words.length; i++) {
    if (words.some((w) => w.includes(words[i]) && w !== words[i])) {
      matched.add(words[i]);
    }
  }

  return Array.from(matched);
}

function stringMatching2(words: string[]): string[] {
  return words.filter((word) =>
    words.some((match) => match.includes(word) && match !== word),
  );
}
