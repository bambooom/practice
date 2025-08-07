// https://leetcode.com/problems/find-the-maximum-number-of-fruits-collected
// There is a game dungeon comprised of n x n rooms arranged in a grid.
// You are given a 2D array fruits of size n x n, where fruits[i][j] represents the number of fruits in the room (i, j). Three children will play in the game dungeon, with initial positions at the corner rooms (0, 0), (0, n - 1), and (n - 1, 0).
// The children will make exactly n - 1 moves according to the following rules to reach the room (n - 1, n - 1):
// The child starting from (0, 0) must move from their current room (i, j) to one of the rooms (i + 1, j + 1), (i + 1, j), and (i, j + 1) if the target room exists.
// The child starting from (0, n - 1) must move from their current room (i, j) to one of the rooms (i + 1, j - 1), (i + 1, j), and (i + 1, j + 1) if the target room exists.
// The child starting from (n - 1, 0) must move from their current room (i, j) to one of the rooms (i - 1, j + 1), (i, j + 1), and (i + 1, j + 1) if the target room exists.
// When a child enters a room, they will collect all the fruits there. If two or more children enter the same room, only one child will collect the fruits, and the room will be emptied after they leave.
// Return the maximum number of fruits the children can collect from the dungeon.

// Example 1:
// Input: fruits = [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]]
// Output: 100
// Explanation:
// In this example:
// The 1st child (green) moves on the path (0,0) -> (1,1) -> (2,2) -> (3, 3).
// The 2nd child (red) moves on the path (0,3) -> (1,2) -> (2,3) -> (3, 3).
// The 3rd child (blue) moves on the path (3,0) -> (3,1) -> (3,2) -> (3, 3).
// In total they collect 1 + 6 + 11 + 16 + 4 + 8 + 12 + 13 + 14 + 15 = 100 fruits.

// Example 2:
// Input: fruits = [[1,1],[1,1]]
// Output: 4
// Explanation:
// In this example:
// The 1st child moves on the path (0,0) -> (1,1).
// The 2nd child moves on the path (0,1) -> (1,1).
// The 3rd child moves on the path (1,0) -> (1,1).
// In total they collect 1 + 1 + 1 + 1 = 4 fruits.

// https://leetcode.com/problems/find-the-maximum-number-of-fruits-collected/solutions/7049188/dp-with-sliding-window-optimization-beats-100/?envType=daily-question&envId=2025-08-07
// dynamic programming
// We compute:
// 1. Fruits collected on the fixed diagonal path
// 2. Fruits collected from dynamic DP paths:
//    - From top-right to bottom-right
//    - From bottom-left to bottom-right
// Final answer:
// fruits on diagonal+max path from top-right+max path from bottom-left

function maxCollectedFruits(fruits: number[][]): number {
  const size = fruits.length;
  let total = 0;

  // Calculate the total number of fruits on the diagonal path
  for (let i = 0; i < size; i++) {
    total += fruits[i][i];
  }
  // Initialize the arrays to store the maximum number of fruits collected from the top-right and bottom-left paths
  let rightPath = [fruits[0][size - 1], 0, 0];
  let bottomPath = [fruits[size - 1][0], 0, 0];
  // Initialize the window size for the dynamic programming approach
  let window = 2;

  // Iterate through the grid to calculate the maximum number of fruits collected from the top-right and bottom-left paths
  for (let step = 1; step < size - 1; step++) {
    // Initialize new arrays to store the updated maximum number of fruits collected from the top-right and bottom-left paths
    const newRight = Array(window + 2).fill(0);
    const newBottom = Array(window + 2).fill(0);

    // Calculate the maximum number of fruits collected from the top-right and bottom-left paths for the current step
    for (let dist = 0; dist < window; dist++) {
      // Calculate the maximum number of fruits collected from the bottom-left path
      newBottom[dist] =
        Math.max(
          // Consider the maximum number of fruits collected from the previous steps
          bottomPath[dist - 1] || 0,
          bottomPath[dist],
          bottomPath[dist + 1] || 0,
        ) + fruits[size - 1 - dist][step];

      // Calculate the maximum number of fruits collected from the top-right path
      newRight[dist] =
        Math.max(
          // Consider the maximum number of fruits collected from the previous steps
          rightPath[dist - 1] || 0,
          rightPath[dist],
          rightPath[dist + 1] || 0,
        ) + fruits[step][size - 1 - dist];
    }

    // Update the arrays to store the maximum number of fruits collected from the top-right and bottom-left paths
    bottomPath = newBottom;
    rightPath = newRight;

    // Adjust the window size based on the current step
    if (window - size + 4 + step <= 1) {
      window += 1;
    } else if (window - size + 3 + step > 1) {
      window -= 1;
    }
  }

  // Return the total number of fruits collected, which is the sum of the fruits on the diagonal path and the maximum number of fruits collected from the top-right and bottom-left paths
  return total + rightPath[0] + bottomPath[0];
}
