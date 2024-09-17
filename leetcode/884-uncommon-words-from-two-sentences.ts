// https://leetcode.com/problems/uncommon-words-from-two-sentences
// A sentence is a string of single-space separated words where each word consists only of lowercase letters.
// A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.
// Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.

function uncommonFromSentences(s1: string, s2: string): string[] {
  const words1: string[] = s1.split(' ');
  const words2: string[] = s2.split(' ');
  const map = new Map<string, number>();

  for (const word of words1) {
    if (map.has(word)) {
      map.set(word, map.get(word)! + 1);
    } else {
      map.set(word, 1);
    }
  }

  for (const word of words2) {
    if (map.has(word)) {
      map.set(word, map.get(word)! + 1);
    } else {
      map.set(word, 1);
    }
  }

  const result: string[] = [];

  for (const [key, val] of map) {
    if (val === 1) {
      result.push(key);
    }
  }

  return result;
}
