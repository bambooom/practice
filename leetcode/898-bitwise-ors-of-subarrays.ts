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

// https://leetcode.com/problems/bitwise-ors-of-subarrays/solutions/4113017/typescript-javascript-beats-100-time-and-50-memory-full-explanation/?envType=daily-question&envId=2025-07-31
// 1. Initialize an empty array bits to store the bitwise OR values of subarrays and a variable l to keep track of the left pointer.
// 2. Start a loop that iterates through each element of the input array arr.
// 3. Inside the loop, get the current length of the bits array and store it in r.
// 4. Push the current element of arr into the bits array. This represents the bitwise OR of a subarray consisting of only the current element.
// 5. Start a while loop with the left pointer l initially set to 0. This loop is used to calculate the bitwise OR of subarrays that include the current element.
// 6. Inside the while loop, calculate the bitwise OR of the element at index l and the last element in the bits array, which is the current element from step 4.
// 7. If the calculated bitwise OR value is not equal to the previous value in the bits array, push this new value into the bits array. This step ensures that we add distinct bitwise OR values to the bits array.
// 8. Increment the left pointer l.
// 9. Repeat steps 6-8 until l is less than r. This loop processes all the subarrays that include the current element.
// 10. Continue with the outer loop, moving to the next element in the input array arr.
// 11. After processing all elements, return the size of a Set created from the bits array. Using a Set ensures that we only count distinct bitwise OR values.
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
