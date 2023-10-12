// https://leetcode.com/problems/successful-pairs-of-spells-and-potions/

// You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.
// You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.
// Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.

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
