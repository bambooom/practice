// https://leetcode.com/problems/bitwise-ors-of-subarrays
// Given an integer array arr, return the number of distinct bitwise ORs of all the non-empty subarrays of arr.
// The bitwise OR of a subarray is the bitwise OR of each integer in the subarray. The bitwise OR of a subarray of one integer is that integer.
// A subarray is a contiguous non-empty sequence of elements within an array.

// Example 1:
// Input: arr = [0]
// Output: 1
// Explanation: There is only one possible result: 0.

// Example 2:
// Input: arr = [1,1,2]
// Output: 3
// Explanation: The possible subarrays are [1], [1], [2], [1, 1], [1, 2], [1, 1, 2].
// These yield the results 1, 1, 2, 1, 3, 3.
// There are 3 unique values, so the answer is 3.

// Example 3:
// Input: arr = [1,2,4]
// Output: 6
// Explanation: The possible results are 1, 2, 3, 4, 6, and 7.

function subarrayBitwiseORs(arr: number[]): number {
  const bits: number[] = []; // store the bitwise ORs
  let l = 0; // a pointer to the start of the bits array

  // Iterate through each element in the input array
  for (let i = 0; i < arr.length; i++) {
    const r = bits.length; // Store the current length of the bits array
    bits.push(arr[i]); // Add the current element to the bits array

    // Iterate through the existing elements in the bits array
    while (l < r) {
      const prev = bits[bits.length - 1]; // Get the previous bitwise OR
      const bitwise = bits[l] | prev; // Calculate the bitwise OR of the current element and the previous bitwise OR

      // If the new bitwise OR is different from the previous one, add it to the bits array
      if (bitwise !== prev) {
        bits.push(bitwise);
      }
      // Move the pointer to the next element in the bits array
      l++;
    }
  }
  // Return the number of unique bitwise ORs (using a Set to remove duplicates)
  return new Set(bits).size;
}
