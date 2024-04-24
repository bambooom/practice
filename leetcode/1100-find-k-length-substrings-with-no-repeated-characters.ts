// https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters/
// Given a string s and an integer k, return the number of substrings in s of length k with no repeated characters.

// Example 1:
// Input: s = "havefunonleetcode", k = 5
// Output: 6
// Explanation: There are 6 substrings they are: 'havef','avefu','vefun','efuno','etcod','tcode'.
// Example 2:
// Input: s = "home", k = 5
// Output: 0
// Explanation: Notice k can be larger than the length of s. In this case, it is not possible to find any substring.

// #sliding-window with hash set
function numKLenSubstrNoRepeats(s: string, k: number): number {
  if (k > s.length) return 0;
  const chars = new Set<string>();
  let ans = 0;
  for (let right = s.length - 1, left = right; left >= 0; left--) {
    while (chars.has(s[left]) || chars.size >= k) {
      chars.delete(s[right--]);
    }
    chars.add(s[left]);
    if (chars.size === k) {
      ans++;
    }
  }

  return ans;
}

// https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters/solutions/3649361/two-pointer-solution-using-hash-set/?envType=study-plan-v2&envId=premium-algo-100
function numKLenSubstrNoRepeats2(s: string, k: number): number {
  let p1 = 0;
  let p2 = 0;
  const hs = new Set();
  let ans = 0;

  while (p2 < s.length) {
    const ch = s[p2];

    if (hs.has(ch)) {
      while (hs.has(ch) && hs.size > 0 && p1 < p2) {
        hs.delete(s[p1]);
        p1++;
      }
    }
    hs.add(ch);
    while (hs.size > k) {
      hs.delete(s[p1]);
      p1++;
    }

    if (hs.size == k) ans++;
    p2++;
  }

  return ans;
}

// easy to understand, but not performant well
function numKLenSubstrNoRepeats3(s: string, k: number): number {
  let counter = 0;
  for (let i = 0; i < s.length; i++) {
    const win = new Set([...s.slice(i, i + k)]);
    if (win.size == k) {
      counter++;
    }
  }
  return counter;
}

// https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters/?envType=study-plan-v2&envId=premium-algo-100
function numKLenSubstrNoRepeats4(s: string, k: number): number {
  const substring = []; // Substring window
  let count = 0; // Count of unique substrings

  // Loop through the full string
  for (let i = 0; i < s.length; i++) {
    // Add the current character to the substring window
    substring.push(s[i]);

    // Once our substring is larger than k, we can
    // start counting the number of substrings with
    // no repeated characters
    if (substring.length >= k) {
      // Create a set from the current substring
      // Values in sets can only occur once
      const set = new Set(substring);

      // If the set size is equal to K, we know that
      // there are no repeating characters. We can
      // safely increase our count variable
      if (set.size === k) count++;

      // Important: Remove the character at the back
      // of our substring array so we do not count it
      // again in the next iteration of the loop
      substring.shift();
    }
  }

  return count;
}
