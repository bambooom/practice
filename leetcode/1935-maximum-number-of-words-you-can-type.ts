// https://leetcode.com/problems/maximum-number-of-words-you-can-type/
// There is a malfunctioning keyboard where some letter keys do not work. All other keys on the keyboard work properly.
// Given a string text of words separated by a single space (no leading or trailing spaces) and a string brokenLetters of all distinct letter keys that are broken, return the number of words in text you can fully type using this keyboard.

// Example 1:
// Input: text = "hello world", brokenLetters = "ad"
// Output: 1
// Explanation: We cannot type "world" because the 'd' key is broken.

// Example 2:
// Input: text = "leet code", brokenLetters = "lt"
// Output: 1
// Explanation: We cannot type "leet" because the 'l' and 't' keys are broken.

// Example 3:
// Input: text = "leet code", brokenLetters = "e"
// Output: 0
// Explanation: We cannot type either word because the 'e' key is broken.

function canBeTypedWords(text: string, brokenLetters: string): number {
  const broken = new Set(brokenLetters.split(''));
  let res = 0;
  for (const word of text.split(' ')) {
    if (!word.split('').some((c) => broken.has(c))) {
      res++;
    }
  }

  return res;
}

// https://leetcode.com/problems/maximum-number-of-words-you-can-type/solutions/7190638/solution-with-bitmask/?envType=daily-question&envId=2025-09-15
// solution with bitmask
function canBeTypedWords2(text: string, brokenLetters: string): number {
  let brokenMask = 0;
  for (const ch of brokenLetters) brokenMask |= 1 << (ch.charCodeAt(0) - 97);
  let validWordCount = 0,
    wordValid = true;
  for (let i = 0; i <= text.length; i++) {
    const ch = text[i] || ' ';
    if (ch === ' ') {
      if (wordValid) validWordCount++;
      wordValid = true;
    } else if (brokenMask & (1 << (ch.charCodeAt(0) - 97))) {
      wordValid = false;
    }
  }
  return validWordCount;
}

// https://leetcode.com/problems/maximum-number-of-words-you-can-type/solutions/2373075/typescript-javascript-a-one-liner-with-fastest-runtime-100-00/?envType=daily-question&envId=2025-09-15
function canBeTypedWords3(text: string, brokenLetters: string): number {
  return text
    .split(' ')
    .reduce(
      (prev, cur) =>
        brokenLetters.split('').some((a) => cur.indexOf(a) > -1)
          ? prev
          : prev + 1,
      0,
    );
}
