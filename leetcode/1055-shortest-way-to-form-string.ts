// https://leetcode.com/problems/shortest-way-to-form-string
// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).
// Given two strings source and target, return the minimum number of subsequences of source such that their concatenation equals target. If the task is impossible, return -1.
// #two-pointers

// Example 1:
// Input: source = "abc", target = "abcbc"
// Output: 2
// Explanation: The target "abcbc" can be formed by "abc" and "bc", which are subsequences of source "abc".

// Example 2:
// Input: source = "abc", target = "acdbc"
// Output: -1
// Explanation: The target string cannot be constructed from the subsequences of source string due to the character "d" in target string.

// Example 3:
// Input: source = "xyz", target = "xzyxz"
// Output: 3
// Explanation: The target string can be constructed as follows "xz" + "y" + "xz".

/**
 * Approach - Two pointers
 *
 * Algorithm:
 * 1. Iterate over target and check if all characters of target are present in source or not. This can be done by having a O(1) lookup table for all characters of source. We can use a set or a boolean array of size 26
 *  (for the lowercase English alphabet) which stores true for characters present in source and false otherwise.
 *  If all characters of target are present in source, then proceed with the next step. Otherwise, return -1.
 *
 * 2. Initialize a pointer for the source string, source_iterator to 0.
 *  Also, initialize a counter count to 0. Store the length of the source string in m, as mentioned in the overview section.
 *
 * 3. Iterate over every character of target. If while iterating, source_iterator equals 0, increment count because reaching 0 means we are starting a new subsequence of source.
 *  Try to find the occurrence of character in the source string from source_iterator onwards.
 *  For incrementing source_iterator, use source_iterator = (source_iterator + 1) % m.
 *  Please note that after incrementing source_iterator, if it ever reaches 0, AND we have characters to check in target,
 *  we will increment count. Both these conditions should be met to increment count.
 *
 * 4. When all characters of target are found in source, return count.
 */

function shortestWay(source: string, target: string): number {
  // Boolean array to mark all characters of source
  const sourceChars = new Array(26).fill(false);
  for (const c of source) {
    sourceChars[c.charCodeAt(0) - 'a'.charCodeAt(0)] = true;
  }

  // Check if all characters of target are present in source
  // If any character is not present, return -1
  for (const c of target) {
    if (!sourceChars[c.charCodeAt(0) - 'a'.charCodeAt(0)]) {
      return -1;
    }
  }

  // Length of source to loop back to start of source using mod
  const m = source.length;

  // Pointer for source
  let sourceIterator = 0;

  // Number of times source is traversed. It will be incremented when
  // while finding occurrence of a character in target, sourceIterator
  // reaches the start of source again.
  let count = 0;

  // Find all characters of target in source
  for (const c of target) {
    // If while finding, iterator reaches start of source again,
    // increment count
    if (sourceIterator == 0) {
      count++;
    }

    // Find the first occurrence of c in source
    while (source[sourceIterator] != c) {
      // Formula for incrementing while looping back to start.
      sourceIterator = (sourceIterator + 1) % m;

      // If while finding, iterator reaches start of source again,
      // increment count
      if (sourceIterator == 0) {
        count++;
      }
    }

    // Loop will break when c is found in source. Thus, increment.
    // Don't increment count until it is not clear that target has
    // remaining characters.
    sourceIterator = (sourceIterator + 1) % m;
  }

  // Return count
  return count;
}

/**
 * Approach - 2D Array
 *
 *
 */

function shortestWay2(source: string, target: string): number {
  // Length of source
  const sourceLength = source.length;

  // Next Occurrence of Character after Index
  const nextOccurrence = Array.from({ length: sourceLength }, () =>
    Array(26).fill(-1),
  );

  // Base Case
  for (let c = 0; c < 26; c++) {
    nextOccurrence[sourceLength - 1][c] = -1;
  }
  nextOccurrence[sourceLength - 1][
    source.charCodeAt(sourceLength - 1) - 'a'.charCodeAt(0)
  ] = sourceLength - 1;

  // Fill using recurrence relation
  for (let idx = sourceLength - 2; idx >= 0; idx--) {
    for (let c = 0; c < 26; c++) {
      nextOccurrence[idx][c] = nextOccurrence[idx + 1][c];
    }
    nextOccurrence[idx][source.charCodeAt(idx) - 'a'.charCodeAt(0)] = idx;
  }

  // Pointer to the current index in source
  let sourceIterator = 0;

  // Number of times we need to iterate through source
  let count = 1;

  // Find all characters of target in source
  for (let idx = 0; idx < target.length; idx++) {
    // If the character is not present in source
    if (nextOccurrence[0][target.charCodeAt(idx) - 'a'.charCodeAt(0)] == -1) {
      return -1;
    }

    // If we have reached the end of source, or the character is not in
    // source after source_iterator, loop back to beginning
    if (
      sourceIterator == sourceLength ||
      nextOccurrence[sourceIterator][
        target.charCodeAt(idx) - 'a'.charCodeAt(0)
      ] == -1
    ) {
      count++;
      sourceIterator = 0;
    }

    // Next occurrence of character in source after source_iterator
    sourceIterator =
      nextOccurrence[sourceIterator][
        target.charCodeAt(idx) - 'a'.charCodeAt(0)
      ] + 1;
  }

  // Return the number of times we need to iterate through source
  return count;
}
