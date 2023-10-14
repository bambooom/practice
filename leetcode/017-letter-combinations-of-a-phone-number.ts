// https://leetcode.com/problems/letter-combinations-of-a-phone-number
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
// A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

// #permutation

const DIGIT_MAP: Record<string, string> = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
};

function addChar(s: string, index: number, str: string, result: string[]) {
  if (index === s.length) {
    result.push(str);
    return;
  }

  for (const char of DIGIT_MAP[s[index]]) {
    addChar(s, index + 1, str + char, result);
  }
}

function letterCombinations(digits: string): string[] {
  // digit won't be 1
  if (digits.length === 0) {
    return [];
  }
  if (digits.length === 1) {
    return DIGIT_MAP[digits].split('');
  }
  const res: string[] = [];
  addChar(digits, 0, '', res);

  return res;
}
