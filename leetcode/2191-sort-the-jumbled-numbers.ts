// https://leetcode.com/problems/sort-the-jumbled-numbers/
// You are given a 0-indexed integer array mapping which represents the mapping rule of a shuffled decimal system. mapping[i] = j means digit i should be mapped to digit j in this system.

// The mapped value of an integer is the new integer obtained by replacing each occurrence of digit i in the integer with mapping[i] for all 0 <= i <= 9.

// You are also given another integer array nums. Return the array nums sorted in non-decreasing order based on the mapped values of its elements.

// Notes:

// Elements with the same mapped values should appear in the same relative order as in the input.
// The elements of nums should only be sorted based on their mapped values and not be replaced by them.

// Example 1:

// Input: mapping = [8,9,4,0,2,1,3,5,7,6], nums = [991,338,38]
// Output: [338,38,991]
// Explanation:
// Map the number 991 as follows:
// 1. mapping[9] = 6, so all occurrences of the digit 9 will become 6.
// 2. mapping[1] = 9, so all occurrences of the digit 1 will become 9.
// Therefore, the mapped value of 991 is 669.
// 338 maps to 007, or 7 after removing the leading zeros.
// 38 maps to 07, which is also 7 after removing leading zeros.
// Since 338 and 38 share the same mapped value, they should remain in the same relative order, so 338 comes before 38.
// Thus, the sorted array is [338,38,991].
// Example 2:

// Input: mapping = [0,1,2,3,4,5,6,7,8,9], nums = [789,456,123]
// Output: [123,456,789]
// Explanation: 789 maps to 789, 456 maps to 456, and 123 maps to 123. Thus, the sorted array is [123,456,789].

// https://leetcode.com/problems/sort-the-jumbled-numbers/solutions/5525856/concise-js-beats-100/?envType=daily-question&envId=2024-07-24
// Map numbers to mappings using modulo 10 and building up result.
// Make a new number array of the same size with each index having the number of it's index ([0, 1, 2, 3, ...]).
// Sort the array of natural numbers by the value of that number indexed into the mapped values, then map those indices back onto the original array to return the result.
function sortJumbled(mapping: number[], nums: number[]): number[] {
  const numToMap = (n: number): number => {
    if (n === 0) return mapping[0];
    let res = 0;
    let m = 1;
    while (n > 0) {
      const rem = n % 10;
      n = (n - rem) / 10;
      res += m * mapping[rem];
      m *= 10;
    }
    return res;
  };

  const m = nums.map(numToMap);
  return Array.from({ length: m.length }, (_, i) => i)
    .sort((a, b) => m[a] - m[b])
    .map((n) => nums[n]);
}

// https://leetcode.com/problems/sort-the-jumbled-numbers/solutions/5525672/easy-understanding-way-in-typescript/?envType=daily-question&envId=2024-07-24
function sortJumbled2(mapping: number[], nums: number[]): number[] {
  const mapped = (num: number, mapping: number[]): number => {
    let sum = '';
    for (const char of num.toString()) {
      const d = mapping[parseInt(char)];
      sum += d; // string concatenation
    }

    return parseInt(sum);
  };
  nums.sort((a, b) => {
    return mapped(a, mapping) - mapped(b, mapping);
  });

  return nums;
}
