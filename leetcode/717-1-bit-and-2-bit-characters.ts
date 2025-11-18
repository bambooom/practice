// https://leetcode.com/problems/1-bit-and-2-bit-characters/
// We have two special characters:
// The first character can be represented by one bit 0.
// The second character can be represented by two bits (10 or 11).
// Given a binary array bits that ends with 0, return true if the last character must be a one-bit character.

// Example 1:
// Input: bits = [1,0,0]
// Output: true
// Explanation: The only way to decode it is two-bit character and one-bit character.
// So the last character is one-bit character.

// Example 2:
// Input: bits = [1,1,1,0]
// Output: false
// Explanation: The only way to decode it is two-bit character and two-bit character.
// So the last character is not one-bit character.

// Constraints:
// 1 <= bits.length <= 1000
// bits[i] is either 0 or 1.

// Approach
// Start from index i = 0.
// If bits[i] == 1, then this is the start of a 2-bit character, so skip two indices.
// If bits[i] == 0, it's a 1-bit character, so skip one index.
// Continue until reaching the second-last index.
// After the loop, if i == n - 1, the last character is a 1-bit character.
// Otherwise, it was consumed as part of a 2-bit character.
function isOneBitCharacter(bits: number[]): boolean {
  for (let i = 0; i < bits.length; i++) {
    if (i === bits.length - 1) {
      return true;
    }
    if (bits[i] === 1) {
      i++;
    }
  }

  return false;
}
