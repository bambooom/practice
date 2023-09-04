// https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
// #sliding-window

// mu solution: but slower and memory using too much
function maxVowels(s: string, k: number): number {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  let subs = s.slice(0, k);
  let cur = [...subs].filter((c) => vowels.includes(c)).length;
  let max = cur;

  for (let i = k; i < s.length; i++) {
    if (vowels.includes(subs[0])) {
      cur -= 1;
    }
    if (vowels.includes(s[i])) {
      cur += 1;
    }
    subs = subs.slice(1) + s[i];
    max = Math.max(max, cur);
    if (max === k) {
      return k;
    }
  }

  return max;
}

// https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/solutions/3487175/js-ts-sets-sliding-windows-and-early-returns-beats-97-92-runtime-91-67-memory/
// using sets, early return to quicken the process
function maxVowels2(s: string, k: number): number {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

  let max = 0; // Max number of vowels in any window
  let current = 0; // Number of vowels in the current window

  // Count the total number of vowels from the first window
  for (let i = 0; i < k; i++) {
    if (vowels.has(s[i])) max++;
  }

  if (max === k) return max; // Return if the `k` is hit

  current = max; // Set the current to the max

  // Sliding window technique
  for (let i = 1; i <= s.length - k; i++) {
    if (vowels.has(s[i - 1])) current--; // Remove the left-most vowel
    if (vowels.has(s[i + k - 1])) current++; // Add the right-most vowel

    if (current === k) return current; // Return if the `k` is hit
    if (current > max) max = current; // Set `max` to the `current` value, if greater
  }

  return max;
}
