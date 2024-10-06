// https://leetcode.com/problems/sentence-similarity-iii
// You are given two strings sentence1 and sentence2, each representing a sentence composed of words. A sentence is a list of words that are separated by a single space with no leading or trailing spaces. Each word consists of only uppercase and lowercase English characters.
// Two sentences s1 and s2 are considered similar if it is possible to insert an arbitrary sentence (possibly empty) inside one of these sentences such that the two sentences become equal. Note that the inserted sentence must be separated from existing words by spaces.

// For example,
// s1 = "Hello Jane" and s2 = "Hello my name is Jane" can be made equal by inserting "my name is" between "Hello" and "Jane" in s1.
// s1 = "Frog cool" and s2 = "Frogs are cool" are not similar, since although there is a sentence "s are" inserted into s1, it is not separated from "Frog" by a space.
// Given two sentences sentence1 and sentence2, return true if sentence1 and sentence2 are similar. Otherwise, return false.

// Example 1:
// Input: sentence1 = "My name is Haley", sentence2 = "My Haley"
// Output: true
// Explanation:
// sentence2 can be turned to sentence1 by inserting "name is" between "My" and "Haley".

// Example 2:
// Input: sentence1 = "of", sentence2 = "A lot of words"
// Output: false
// Explanation:
// No single sentence can be inserted inside one of the sentences to make it equal to the other.

// Example 3:
// Input: sentence1 = "Eating right now", sentence2 = "Eating"
// Output: true
// Explanation:
// sentence2 can be turned to sentence1 by inserting "right now" at the end of the sentence.

// https://leetcode.com/problems/sentence-similarity-iii/solutions/5875310/working-06-10-2024-explained/
function areSentencesSimilar(sentence1: string, sentence2: string): boolean {
  // Command 1: Split both input strings into arrays of words
  const words1: string[] = sentence1.split(' ');
  const words2: string[] = sentence2.split(' ');

  // Command 2: If both sentences are identical, return true immediately
  if (JSON.stringify(words1) === JSON.stringify(words2)) return true;

  // Command 3: Initialize empty arrays for common prefixes and suffixes
  // Also get the lengths of both sentences for easier reference
  const prefix: string[] = [],
    suffix: string[] = [];
  const n: number = words1.length,
    m: number = words2.length;

  // Command 4: Find common prefix (matching words from the beginning)
  for (let i = 0; i < Math.min(n, m); i++) {
    if (words1[i] === words2[i]) {
      prefix.push(words1[i]);
    } else {
      break;
    }
  }

  // Command 5: Find common suffix (matching words from the end)
  for (let i = 0; i < Math.min(n, m); i++) {
    if (words1[n - i - 1] === words2[m - i - 1]) {
      suffix.push(words1[n - i - 1]);
    } else {
      break;
    }
  }

  // Command 6: Reverse the suffix to get correct word order
  suffix.reverse();

  // Command 7: Handle overlap between prefix and suffix
  // If combined length is greater than shorter sentence,
  // there might be overlap
  while (suffix.length + prefix.length > Math.min(n, m)) {
    if (
      suffix.length > 0 &&
      prefix.length > 0 &&
      suffix[0] === prefix[prefix.length - 1]
    ) {
      prefix.pop();
    } else {
      break;
    }
  }

  // Command 8: Combine prefix and suffix into one array
  prefix.push(...suffix);

  // Command 9: Check if the combined prefix+suffix equals either original sentence
  return (
    JSON.stringify(prefix) === JSON.stringify(words1) ||
    JSON.stringify(prefix) === JSON.stringify(words2)
  );
}
