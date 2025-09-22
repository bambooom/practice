// https://leetcode.com/problems/count-elements-with-maximum-frequency/
// You are given an array nums consisting of positive integers.
// Return the total frequencies of elements in nums such that those elements all have the maximum frequency.
// The frequency of an element is the number of occurrences of that element in the array.

// Example 1:
// Input: nums = [1,2,2,3,1,4]
// Output: 4
// Explanation: The elements 1 and 2 have a frequency of 2 which is the maximum frequency in the array.
// So the number of elements in the array with maximum frequency is 4.

// Example 2:
// Input: nums = [1,2,3,4,5]
// Output: 5
// Explanation: All elements of the array have a frequency of 1 which is the maximum.
// So the number of elements in the array with maximum frequency is 5.

function maxFrequencyElements(nums: number[]): number {
  const freq: Record<number, number> = {};
  const freqCount: Record<number, number> = {};

  for (const num of nums) {
    freq[num] = (freq[num] || 0) + 1;
    freqCount[freq[num]] = (freqCount[freq[num]] || 0) + 1;
  }

  const maxFreq = Math.max(...Object.values(freq));
  return maxFreq * freqCount[maxFreq];
}

// https://leetcode.com/problems/count-elements-with-maximum-frequency/solutions/4841636/well-organised-code-58ms-runtime/?envType=daily-question&envId=2025-09-22
function maxFrequencyElements2(nums: number[]): number {
  // Create a Map to store the frequency of each element
  const freqMap = new Map<number, number>();

  // Populate the freqMap
  for (const num of nums) {
    if (freqMap.has(num)) {
      freqMap.set(num, freqMap.get(num)! + 1);
    } else {
      freqMap.set(num, 1);
    }
  }

  // Find the maximum frequency
  let maxFreq = 0;
  for (const freq of freqMap.values()) {
    if (freq > maxFreq) {
      maxFreq = freq;
    }
  }

  // Count the number of elements with maximum frequency
  let count = 0;
  for (const freq of freqMap.values()) {
    if (freq === maxFreq) {
      count += freq;
    }
  }

  return count;
}

// https://leetcode.com/problems/count-elements-with-maximum-frequency/solutions/4840480/typescript-easy-single-pass/?envType=daily-question&envId=2025-09-22
function maxFrequencyElements3(nums: number[]): number {
  let max = 0;
  let c = 0;
  let a = new Array(101).fill(0);
  for (let n of nums) {
    a[n]++;
    if (a[n] > max) {
      max = a[n];
      c = 0;
    }
    if (a[n] == max) c++;
  }
  return c * max;
}

// https://leetcode.com/problems/count-elements-with-maximum-frequency/solutions/4844672/typescript-javascript-simple-solution/?envType=daily-question&envId=2025-09-22
function maxFrequencyElements4(nums: number[]): number {
  const newMap = new Map<number, number>();
  let maxValue: number = 0;
  let count: number = 0;
  for (let i = 0; i < nums.length; i++) {
    newMap.set(nums[i], (newMap.get(nums[i]) || 0) + 1);
    if (newMap.get(nums[i])! > maxValue) {
      maxValue = newMap.get(nums[i])!;
    }
  }
  for (const [_, key] of newMap) {
    if (maxValue === key) {
      count += key;
    }
  }
  return count;
}
