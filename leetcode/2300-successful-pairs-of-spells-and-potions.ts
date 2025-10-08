// https://leetcode.com/problems/successful-pairs-of-spells-and-potions/

// You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.
// You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.
// Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.

// Example 1:
// Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
// Output: [4,0,3]
// Explanation:
// - 0th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
// - 1st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
// - 2nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
// Thus, [4,0,3] is returned.

// Example 2:
// Input: spells = [3,1,2], potions = [8,5,8], success = 16
// Output: [2,0,2]
// Explanation:
// - 0th spell: 3 * [8,5,8] = [24,15,24]. 2 pairs are successful.
// - 1st spell: 1 * [8,5,8] = [8,5,8]. 0 pairs are successful.
// - 2nd spell: 2 * [8,5,8] = [16,10,16]. 2 pairs are successful.
// Thus, [2,0,2] is returned.

// Constraints:
// n == spells.length
// m == potions.length
// 1 <= n, m <= 10^5
// 1 <= spells[i], potions[i] <= 10^5
// 1 <= success <= 10^10

// brutal force, but Time Limit Exceeded
function successfulPairs(
  spells: number[],
  potions: number[],
  success: number,
): number[] {
  return spells.map((s) => {
    return potions.filter((p) => p * s >= success).length;
  });
}

// https://leetcode.com/problems/successful-pairs-of-spells-and-potions/solutions/3371111/master-the-art-of-spell-and-potion-pairing-a-typescript-binary-search-approach-100-87-50/?envType=study-plan-v2&envId=leetcode-75
// #binary-search
// Performs binary search on a sorted array to find the index where the target value should be inserted.
function binarySearch2(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  // Iterate until the left and right pointers converge.
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Return the index where the target value should be inserted.
  return left;
}
// time:  O(n logn), space O(1)
function successfulPairs2(
  spells: number[],
  potions: number[],
  success: number,
): number[] {
  // Sort the potions list in ascending order to allow for efficient binary search.
  potions.sort((a, b) => a - b);

  // Iterate over each spell in the spells list and use binary search to find the index of the first potion
  // that forms a successful pair, then calculate the number of successful pairs for each spell.
  // The map function creates a new array with the results of calling the provided function on every element in the original spells array.
  return spells.map(
    // Calculate the minimum potion strength required to form a successful pair
    // with the current spell, and use binary search to find the index where the target value should be inserted.
    (spell) =>
      potions.length - binarySearch2(potions, Math.ceil(success / spell)),
  );
}

// binary search
function successfulPairs3(
  spells: number[],
  potions: number[],
  success: number,
): number[] {
  let ans: number[] = [];

  // sort arrays in ascending order
  potions.sort((a, b) => a - b);

  // loop through spells
  for (let i = 0; i < spells.length; i++) {
    let cnt = 0; // count of successful pairs
    let left = 0;
    let right = potions.length - 1;

    while (left <= right) {
      let mid = left + ((right - left) >> 1);

      if (spells[i] * potions[mid] >= success) {
        // if the product of the current spell and potion is greater than or equal to success,
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // update count of successful pairs
    cnt = potions.length - left;
    ans.push(cnt);
  }

  return ans;
}
