// https://leetcode.com/problems/lexicographically-minimum-string-after-removing-stars
// You are given a string s. It may contain any number of '*' characters. Your task is to remove all '*' characters.
// While there is a '*', do the following operation:
// Delete the leftmost '*' and the smallest non-'*' character to its left. If there are several smallest characters, you can delete any of them.
// Return the lexicographically smallest resulting string after removing all '*' characters.

// Example 1:
// Input: s = "aaba*"
// Output: "aab"
// Explanation:
// We should delete one of the 'a' characters with '*'. If we choose s[3], s becomes the lexicographically smallest.

// Example 2:
// Input: s = "abc"
// Output: "abc"
// Explanation:
// There is no '*' in the string.

import { PriorityQueue } from '@datastructures-js/priority-queue';

function clearStars(s: string): string {
  const include: boolean[] = new Array(s.length).fill(true);

  const characterQueue = new PriorityQueue<number>((a: number, b: number) => {
    if (s[a] === s[b]) {
      return a < b ? 1 : -1;
    }
    return s[a] > s[b] ? 1 : -1;
  });

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '*') {
      include[i] = false;
      include[characterQueue.dequeue()] = false;
    } else {
      characterQueue.enqueue(i);
    }
  }

  let result = '';

  for (let i = 0; i < s.length; i++) {
    if (include[i]) result += s[i];
  }

  return result;
}
