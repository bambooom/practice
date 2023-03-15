// https://leetcode.com/problems/word-pattern/
// Given a pattern and a string s, find if s follows the same pattern.
// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.
// #hash-table

// Input: pattern = "abba", s = "dog cat cat dog"
// Output: true
// Input: pattern = "abba", s = "dog cat cat fish"
// Output: false
// Input: pattern = "aaaa", s = "dog cat cat dog"
// Output: false

function wordPattern(pattern: string, s: string): boolean {
  if (!pattern || !s) return false;
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;

  const wordSet: string[] = [];
  const pacSet: string[] = [];
  let wordT = '';
  let pacT = '';
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (wordSet.includes(word)) {
      const idx = wordSet.indexOf(word);
      wordT += `${idx}`;
    } else {
      wordSet.push(word);
      wordT += `${wordSet.length - 1}`;
    }

    const c = pattern[i];
    if (pacSet.includes(c)) {
      const idx = pacSet.indexOf(c);
      pacT += `${idx}`;
    } else {
      pacSet.push(c);
      pacT += `${pacSet.length - 1}`;
    }

    if (wordT !== pacT) {
      return false;
    }
  }

  return wordT === pacT;
}

console.log(wordPattern('abba', 'dog cat cat dog'));

// using hashmap is better

function wordPattern2(pattern: string, s: string): boolean {
  if (!pattern || !s) return false;
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;
  const patternMap = new Map<string, string>();
  const wordsMap = new Map<string, string>();

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const char = pattern.charAt(i);
    if (patternMap.has(char)) {
      if (patternMap.get(char) !== word) {
        return false;
      }
    } else {
      patternMap.set(char, word);
    }

    if (wordsMap.has(word)) {
      if (wordsMap.get(word) !== char) {
        return false;
      }
    } else {
      wordsMap.set(word, char);
    }
  }

  return true;
}
