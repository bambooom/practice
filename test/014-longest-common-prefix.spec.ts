import {
  longestCommonPrefix,
  lcp1,
  lcp3,
  lcp4,
} from '../leetcode/014-longest-common-prefix';

describe('find longest common prefix of an array: easy normal way', () => {
  test('["flower","flow","flight"] => fl', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
  });
  test('["dog","racecar","car"] => ""', () => {
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
  });
});

describe('find longest common prefix of an array: solution1: horizontal approach', () => {
  test('["flower","flow","flight"] => fl', () => {
    expect(lcp1(['flower', 'flow', 'flight'])).toBe('fl');
  });
  test('["dog","racecar","car"] => ""', () => {
    expect(lcp1(['dog', 'racecar', 'car'])).toBe('');
  });
});

describe('find longest common prefix of an array: solution3: divide', () => {
  test('["flower","flow","flight"] => fl', () => {
    expect(lcp3(['flower', 'flow', 'flight'])).toBe('fl');
  });
  test('["dog","racecar","car"] => ""', () => {
    expect(lcp3(['dog', 'racecar', 'car'])).toBe('');
  });
});

describe('find longest common prefix of an array: solution4: binary search', () => {
  test('["flower","flow","flight"] => fl', () => {
    expect(lcp4(['flower', 'flow', 'flight'])).toBe('fl');
  });
  test('["dog","racecar","car"] => ""', () => {
    expect(lcp4(['dog', 'racecar', 'car'])).toBe('');
  });
});
