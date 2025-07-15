// https://leetcode.com/problems/valid-word
// A word is considered valid if:
// It contains a minimum of 3 characters.
// It contains only digits (0-9), and English letters (uppercase and lowercase).
// It includes at least one vowel.
// It includes at least one consonant.
// You are given a string word.
// Return true if word is valid, otherwise, return false.

// Notes:
// 'a', 'e', 'i', 'o', 'u', and their uppercases are vowels.
// A consonant is an English letter that is not a vowel.

// Example 1:
// Input: word = "234Adas"
// Output: true
// Explanation:
// This word satisfies the conditions.

// Example 2:
// Input: word = "b3"
// Output: false
// Explanation:
// The length of this word is fewer than 3, and does not have a vowel.

// Example 3:
// Input: word = "a3$e"
// Output: false
// Explanation:
// This word contains a '$' character and does not have a consonant.

function isValid(word: string): boolean {
  if (word.length < 3) return false;
  const vowels = 'aeiouAEIOU';
  const consonants = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
  const chars = word.split('');
  const hasVowel = chars.some((c) => vowels.includes(c));
  const hasConsonant = chars.some((c) => consonants.includes(c));
  const hasOnlyDigitsAndLetters = chars.every((c) => {
    return (
      (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')
    );
  });
  return hasVowel && hasConsonant && hasOnlyDigitsAndLetters;
}

// Editorial
function isValid2(word: string): boolean {
  if (word.length < 3) {
    return false;
  }
  let hasVowel = false;
  let hasConsonant = false;
  for (const c of word) {
    if (/[a-zA-Z]/.test(c)) {
      const ch = c.toLowerCase();
      if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
        hasVowel = true;
      } else {
        hasConsonant = true;
      }
    } else if (!/\d/.test(c)) {
      return false;
    }
  }
  return hasVowel && hasConsonant;
}
