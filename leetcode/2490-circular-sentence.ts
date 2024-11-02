// https://leetcode.com/problems/circular-sentence/description/
// A sentence is a list of words that are separated by a single space with no leading or trailing spaces.
// For example, "Hello World", "HELLO", "hello world hello world" are all sentences.
// Words consist of only uppercase and lowercase English letters. Uppercase and lowercase English letters are considered different.
// A sentence is circular if:
//  - The last character of a word is equal to the first character of the next word.
//  - The last character of the last word is equal to the first character of the first word.
// For example, "leetcode exercises sound delightful", "eetcode", "leetcode eats soul" are all circular sentences. However, "Leetcode is cool", "happy Leetcode", "Leetcode" and "I like Leetcode" are not circular sentences.
// Given a string sentence, return true if it is circular. Otherwise, return false.

function isCircularSentence(sentence: string): boolean {
  const n = sentence.length;
  if (sentence[0] !== sentence[n - 1]) return false;

  const words = sentence.split(' ');

  for (let i = 0; i < words.length - 1; i++) {
    const word = words[i];
    const nextWord = words[i + 1];
    if (word[word.length - 1] !== nextWord[0]) {
      return false;
    }
  }

  return true;
}

// https://leetcode.com/problems/circular-sentence/solutions/5995054/beats-100-working-02-11-2024-explained-step-by-step-most-common-interview-string/
function isCircularSentence2(sentence: string): boolean {
  const n = sentence.length;
  if (sentence[0] !== sentence[n - 1]) return false;

  // iterate from index 1 to n-2
  for (let i = 1; i < n - 1; i++) {
    if (sentence[i] === ' ') {
      // check if the character before space (last char of current word)
      // matches the character after space (first char of next word)
      if (sentence[i - 1] !== sentence[i + 1]) return false;
    }
  }

  return true;
}
