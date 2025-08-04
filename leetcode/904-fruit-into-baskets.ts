// https://leetcode.com/problems/fruit-into-baskets
// You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.
// You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:
// You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
// Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
// Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
// Given the integer array fruits, return the maximum number of fruits you can pick.

// Example 1:
// Input: fruits = [1,2,1]
// Output: 3
// Explanation: We can pick from all 3 trees.

// Example 2:
// Input: fruits = [0,1,2,2]
// Output: 3
// Explanation: We can pick from trees [1,2,2].
// If we had started at the first tree, we would only pick from trees [0,1].

// Example 3:
// Input: fruits = [1,2,3,2,2]
// Output: 4
// Explanation: We can pick from trees [2,3,2,2].
// If we had started at the first tree, we would only pick from trees [1,2].

// https://leetcode.com/problems/fruit-into-baskets/solutions/5493895/typescript-solution-illustration-step-by-step/?envType=daily-question&envId=2025-08-04
// sliding window
function totalFruit(fruits: number[]): number {
  const fruitsLen = fruits.length;
  // Create a Map to store the frequency of each fruit in the current window
  const backets: Map<number, number> = new Map();

  let result = 0;
  // Initialize two pointers, left and right, to represent the sliding window
  for (let left = 0, right = 0; right < fruitsLen; right++) {
    const rightFruit = fruits[right];
    // Increment the frequency of the right fruit in the Map
    backets.set(rightFruit, (backets.get(rightFruit) ?? 0) + 1);

    // Shrink the window from the left if there are more than two types of fruits
    while (backets.size > 2) {
      const leftFruit = fruits[left];
      // Decrement the frequency of the left fruit in the Map
      backets.set(leftFruit, backets.get(leftFruit)! - 1);

      // Remove the left fruit from the Map if its frequency is zero
      if (backets.get(leftFruit) === 0) {
        backets.delete(leftFruit);
      }
      // Move the left pointer to the right
      left++;
    }
    // Update the result with the maximum size of the window
    result = Math.max(result, right - left + 1);
  }

  return result;
}
