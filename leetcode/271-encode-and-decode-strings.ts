// https://leetcode.com/problems/encode-and-decode-strings
// Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

/**
 * Encodes a list of strings to a single string.
 */
function encode(strs: string[]): string {
  // String.fromCharCode(257) = 'ā', Non-ascii character
  return strs.join(String.fromCharCode(257));
}

/**
 * Decodes a single string to a list of strings.
 */
function decode(s: string): string[] {
  return s.split(String.fromCharCode(257));
}

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */
