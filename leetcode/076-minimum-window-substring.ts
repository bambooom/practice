// https://leetcode.com/problems/minimum-window-substring
// Given two strings s and t of lengths m and n respectively, return the minimum window substring
// of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
// #hash-table #sliding-window

// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
// Input: s = "a", t = "aa"
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.

// https://leetcode.com/problems/minimum-window-substring/solutions/2301430/javascript-simple-sliding-window-hash-map-solution/
function minWindow(s: string, t: string): string {
  if (t.length > s.length) return '';

  const neededChars: Record<string, number> = {};

  for (const char of t) {
    neededChars[char] = (neededChars[char] || 0) + 1;
  }

  let left = 0;
  let right = 0;
  let neededLength = Object.keys(neededChars).length;
  let substring = '';

  while (right < s.length) {
    const rightChar = s[right];
    neededChars[rightChar]--;
    if (neededChars[rightChar] === 0) neededLength--;

    while (neededLength === 0) {
      if (!substring || substring.length > right - left + 1) {
        substring = s.slice(left, right + 1);
      }

      const leftChar = s[left];
      // If the leftChar in charMap is at exactly 0 before being
      // incremented, we now need more leftChars so that its count
      // in charMap goes down to exactly 0
      if (neededChars[leftChar] === 0) {
        neededLength++;
      }
      neededChars[leftChar]++;
      left++;
    }

    right++;
  }

  return substring;
}

// https://leetcode.com/problems/minimum-window-substring/solutions/411388/javascript-solution-w-detailed-comments/
function minWindow2(s: string, t: string): string {
  // `right` is -1 since every loop, we start by expanding the right boundary
  // setting this to -1 ensures that we will check the first char on the first time
  let min = '',
    left = 0,
    right = -1;
  const map: Record<string, number> = {};

  // this creates a map for the characters we need to include in the substring
  // we store the character and its count since it can be repeated
  // for example: "BAAC"
  t.split('').forEach((element) => {
    if (map[element] == null) map[element] = 1;
    else map[element] = map[element] + 1;
  });

  // sets how many different characters we still have
  // for example: given the input "BAAC", we still have 3 different characters need to check
  let count = Object.keys(map).length;

  while (right <= s.length) {
    // found a valid substring
    if (count == 0) {
      // try to shift left boudary to the right, this means the very left character will be removed
      // because of this, we need to check whats the affect by removing that character,
      const current = s[left];

      // if this chacter is in our map, it means we ll need to find another one in the future
      if (map[current] != null) map[current]++;

      // * we must have the condition `>0` because for case like "BBBA...", count for B could be negative
      if (map[current] > 0) count++;

      const temp = s.substring(left, right + 1);
      if (min == '') min = temp;
      else min = min.length < temp.length ? min : temp;

      left++;
    } else {
      right++;
      const current = s[right];

      // decrease the count for this character
      if (map[current] != null) map[current]--;

      if (map[current] == 0) count--;
    }
  }
  return min;
}
