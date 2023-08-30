// https://leetcode.com/problems/string-compression/
// #two-pointers

// Given an array of characters chars, compress it using the following algorithm:
// Begin with an empty string s. For each group of consecutive repeating characters in chars:
// If the group's length is 1, append the character to s.
// Otherwise, append the character followed by the group's length.
// The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

// After you are done modifying the input array, return the new length of the array.
// You must write an algorithm that uses only constant extra space.

// 不合要求的solution, 原题要求chars array change in-place
function compress1(chars: string[]): number {
  if (chars.length === 1) return 1;
  let s = '';
  let i = 0;
  let j = 1;
  while (i < chars.length && j < chars.length) {
    const cur = chars[i];
    s += cur;
    while (cur === chars[j]) {
      j++;
    }
    if (j - i > 1) {
      s += j - i;
    }
    i = j;
  }

  return s.length;
}

// change chars in-place
function compress2(chars: string[]): number {
  if (chars.length === 1) return 1;
  let i = 0;
  let j = 1;
  while (i < chars.length && j < chars.length) {
    const cur = chars[i];
    // match the group
    while (cur === chars[j]) {
      j++;
    }
    if (j - i > 1) {
      // if the group is longer than 1
      const len = (j - i).toString();
      // remove the repeated characters and append the length as the string
      chars.splice(i + 1, j - i - 1, ...[...len]);
      // also need to update i and j according to the group length
      i += len.length + 1;
      j = i + 1;
    } else {
      i = j;
    }
  }

  return chars.length;
}
