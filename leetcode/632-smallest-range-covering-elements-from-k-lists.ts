//https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/
// You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.
// We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

// Example 1:
// Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
// Output: [20,24]
// Explanation:
// List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
// List 2: [0, 9, 12, 20], 20 is in range [20,24].
// List 3: [5, 18, 22, 30], 22 is in range [20,24].
// Example 2:
// Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
// Output: [1,1]

// https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/solutions/5905077/beats-100-working-13-10-2024/
type NumElement = {
  num: number;
  index: number;
};
function smallestRange(nums: number[][]): number[] {
  // k is the number of lists
  const k = nums.length;

  // Map to keep track of how many elements from each list are in the current rage
  const coverMap: Map<number, number> = new Map();

  // Flatten the nums array and keep track of which list each element came from
  const elements: NumElement[] = nums.reduce(
    (result: NumElement[], list: number[], index: number) => {
      for (const num of list) {
        result.push({ num, index });
      }
      return result;
    },
    [],
  );

  // initialize variables for the sliding window
  let left = 0;
  let coverCount = 0; // number of lists covered by the current rage
  let minRange = Number.MAX_SAFE_INTEGER;
  let result: number[] = [];

  // sort the flattened array by numeric value
  elements.sort((a, b) => a.num - b.num);

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const count = coverMap.get(element.index) ?? 0;

    // if this is the first element from this list, increment coverCOunt
    if (!count) {
      coverCount++;
    }
    coverMap.set(element.index, count + 1);

    // while the window covers all k lists, try to minimize the range
    while (coverCount === k) {
      const leftElement = elements[left];
      const range = element.num - leftElement.num;
      const leftCount = coverMap.get(leftElement.index)!;

      // update mininum
      if (range < minRange) {
        minRange = range;
        result = [leftElement.num, element.num];
      }

      // move the left pointer of the window
      coverMap.set(leftElement.index, leftCount - 1);
      if (leftCount - 1 === 0) {
        coverCount--;
      }
      left++;
    }
  }

  return result;
}
