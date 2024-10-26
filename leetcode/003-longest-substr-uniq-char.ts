// https://leetcode.com/problems/longest-substring-without-repeating-characters/
// Given a string s, find the length of the longest substring without repeating characters.

// brute force, Time O(n^3), space O(min(n,m))
function lengthOfLongestSubstring(s: string): number {
  const len = s.length;

  function check(start: number, end: number): boolean {
    const chars = new Set();
    for (let i = start; i < end + 1; i++) {
      const c = s[i];
      if (chars.has(c)) return false;
      chars.add(c);
    }
    return true;
  }

  let res = 0;
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (check(i, j)) {
        res = Math.max(res, j - i + 1);
      }
    }
  }

  return res;
}

// Approach 2 - sliding window
// Given a substring with a fixed end index in the string, maintain a HashMap to record the frequency of each character in the current substring.
// If any character occurs more than once, drop the leftmost characters until there are no duplicate characters.

// A sliding window is an abstract concept commonly used in array / string problems.
// A window is a range of elements in the array / string which usually defined by the start and end indices, i.e. [i, j).
// A sliding window is a window "slides" its two boundaries to the certain direction.
// For example, if we slide[i, j) to the right by 11 element, then it becomes[i + 1, j + 1)

// use HashSet to store the characters in current window
// time O(2n)=O(n), space O(min(n,m))
function lengthOfLongestSubstring2(s: string): number {
  const chars: Map<string, number> = new Map();
  let left = 0;
  let right = 0;
  let res = 0;

  while (right < s.length) {
    const r = s[right];
    if (chars.has(r)) {
      chars.set(r, (chars.get(r) as number) + 1);
    } else {
      chars.set(r, 1);
    }

    while ((chars.get(r) as number) > 1) {
      const l = s[left];
      if (chars.has(l) && (chars.get(l) as number) > 0) {
        chars.set(l, (chars.get(l) as number) - 1);
        left += 1;
      }
    }
    res = Math.max(res, right - left + 1);
    right += 1;
  }

  return res;
}

// Approach 3 - sliding window optimized
// we could define a mapping of the characters to its index. Then we can skip the characters immediately when we found a repeated character.
// The reason is that if s[j] have a duplicate in the range [i, j) with index j', we don't need to increase i little by little.
// We can skip all the elements in the range[i, j'] and let ii to be j' + 1 directly.
// time O(n), space O(min(n,m))
function lengthOfLongestSubstring3(s: string): number {
  const chars: { [key: string]: number } = {};
  const len = s.length;
  let res = 0;
  let i = 0;

  for (let j = 0; j < len; j++) {
    if (s[j] in chars) {
      i = Math.max(i, chars[s[j]]);
    }

    res = Math.max(res, j - i + 1);
    chars[s[j]] = j + 1;
  }

  return res;
}
