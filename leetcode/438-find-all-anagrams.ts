// https://leetcode.com/problems/find-all-anagrams-in-a-string/
// Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
// #hash-table #sliding-window

// Input: s = "cbaebabacd", p = "abc"
// Output: [0,6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".

function findAnagrams(s: string, p: string): number[] {
  // initialize output array to be returned at the end and neededChars object to store the chars in p.
  const output: number[] = [];
  const neededChars: { [key: string]: number } = {};

  // populate neededChars to contain every char in p as a key and how many times that char appears in p as its value.
  for (const char of p) {
    if (char in neededChars) {
      neededChars[char]++;
    } else neededChars[char] = 1;
  }

  // initialize window pointers and the total number of chars needed to form an anagram.
  let left = 0;
  let right = 0;
  let count = p.length;

  // start sliding the window
  while (right < s.length) {
    // if the current char is found in p and is currently needed (meaning that its value in neededChars is bigger than 0),
    // then decrease the count which is the total number of chars that are needed and that still haven't been found.
    if (neededChars[s[right]] > 0) count--;

    // decrease the needed amount for the current char and move the window's right end one step forward.
    neededChars[s[right]]--;
    right++;

    // if the count is 0, this means that there is an anagram starting at the left index so push left into the output array.
    if (count === 0) output.push(left);

    // at first, the window will increase its length by taking steps forward with its right end.
    // after the window length reaches p's length for the first time,
    // the window will start moving forward like a caterpillar with the left end moving first.
    if (right - left == p.length) {
      // if the char left behind was a needed char, increase the total number of chars currently needed to form an anagram.
      if (neededChars[s[left]] >= 0) count++;

      // the lines below are the most important to understand:
      // every time a needed char is left behind (outside the window) as the window moves forward to search the rest of the string,
      // increment that char's value in the neededChars object (restore the need for that char for the window's future reference).
      neededChars[s[left]]++;
      left++;
    }
  }
  return output;
}

// The idea:
// Build a hash map consists of characters and their counts. Save the # of unique characters as uniqueChars
// Iterate the input s using 2 pointers left and right. Make adjustments in hash and uniqueChars
// Keep expanding the right pointer. When the desired searching length is reached, we can start shrinking left pointer as well.
// Unlike other sliding window problems, left pointer, at max, would only move 1 position.

function findAnagrams2(s: string, p: string): number[] {
  const hash: { [key: string]: number } = {};
  let uniqueChars = 0;
  for (const c of p) {
    if (hash[c] == null) {
      uniqueChars++;
      hash[c] = 1;
    } else {
      hash[c]++;
    }
  }

  const res = [];
  let left = 0,
    right = 0;
  for (right; right < s.length; right++) {
    if (hash[s[right]] != null) hash[s[right]]--;
    if (hash[s[right]] == 0) uniqueChars--;
    if (uniqueChars == 0) res.push(left);
    if (right - left + 1 == p.length) {
      if (hash[s[left]] != null) hash[s[left]]++;
      if (hash[s[left++]] == 1) uniqueChars++;
    }
  }
  return res;
}

function findAnagrams3(s: string, p: string): number[] {
  const result: number[] = [];
  if (p.length > s.length) return result;

  let left = 0;
  let right = p.length;

  while (left < s.length) {
    const tmp = s.substring(left, right);
    if (tmp.split('').sort().join('') === p.split('').sort().join('')) {
      result.push(left);
    }
    left++;
    right++;
  }
  return result;
}
