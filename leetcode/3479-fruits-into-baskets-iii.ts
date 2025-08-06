// https://leetcode.com/problems/fruits-into-baskets-iii
// You are given two arrays of integers, fruits and baskets, each of length n, where fruits[i] represents the quantity of the ith type of fruit, and baskets[j] represents the capacity of the jth basket.
// From left to right, place the fruits according to these rules:
// Each fruit type must be placed in the leftmost available basket with a capacity greater than or equal to the quantity of that fruit type.
// Each basket can hold only one type of fruit.
// If a fruit type cannot be placed in any basket, it remains unplaced.
// Return the number of fruit types that remain unplaced after all possible allocations are made.

// Constraints:
// n == fruits.length == baskets.length
// 1 <= n <= 10^5
// 1 <= fruits[i], baskets[i] <= 10^9

// Example 1:
// Input: fruits = [4,2,5], baskets = [3,5,4]
// Output: 1
// Explanation:
// fruits[0] = 4 is placed in baskets[1] = 5.
// fruits[1] = 2 is placed in baskets[0] = 3.
// fruits[2] = 5 cannot be placed in baskets[2] = 4.
// Since one fruit type remains unplaced, we return 1.

// Example 2:
// Input: fruits = [3,6,1], baskets = [6,4,7]
// Output: 0
// Explanation:
// fruits[0] = 3 is placed in baskets[0] = 6.
// fruits[1] = 6 cannot be placed in baskets[1] = 4 (insufficient capacity) but can be placed in the next available basket, baskets[2] = 7.
// fruits[2] = 1 is placed in baskets[1] = 4.
// Since all fruits are successfully placed, we return 0.

// same question with 3477, but with constraints different, n can be much bigger number
// can not do brute force, it'll get TLE

// https://leetcode.com/problems/fruits-into-baskets-iii/solutions/7049266/fruits-into-baskets-season-finale-segment-tree-beats-97-6/?envType=daily-question&envId=2025-08-06
// using segment tree
function numOfUnplacedFruitsIII(fruits: number[], baskets: number[]): number {
  // Check for invalid input
  if (!fruits || !baskets) return -1;
  const size = fruits.length;
  if (size !== baskets.length) return -2;

  // Initialize the segment tree with 4 times the size of the input array
  const tree: number[] = new Array(4 * size).fill(0);

  /**
   * Recursively builds the segment tree by storing the maximum capacity of each subtree in its root node.
   *
   * @param {number[]} tree - The segment tree.
   * @param {number[]} baskets - An array of basket capacities.
   * @param {number} i - The current node index.
   * @param {number} low - The low index of the current subtree.
   * @param {number} high - The high index of the current subtree.
   */
  const buildTree = (
    tree: number[],
    baskets: number[],
    i: number,
    low: number,
    high: number,
  ) => {
    // Base case: if the subtree has only one node, store its capacity in the tree
    if (low === high) {
      tree[i] = baskets[low];
      return;
    }
    // Calculate the mid index of the current subtree
    const mid = (low + high) >> 1;
    const left = 2 * i + 1;
    const right = left + 1;

    // Recursively build the left and right subtrees
    buildTree(tree, baskets, left, low, mid);
    buildTree(tree, baskets, right, mid + 1, high);
    // Store the maximum capacity of the left and right subtrees in the current node
    tree[i] = Math.max(tree[left], tree[right]);
  };

  /**
   * Attempts to place a fruit in the leftmost available basket with sufficient capacity.
   *
   * @param {number[]} tree - The segment tree.
   * @param {number} i - The current node index.
   * @param {number} low - The low index of the current subtree.
   * @param {number} high - The high index of the current subtree.
   * @param {number} value - The fruit type to be placed.
   * @returns {boolean} True if the fruit is placed successfully, false otherwise.
   */
  const placeFruit = (
    tree: number[],
    i: number,
    low: number,
    high: number,
    value: number,
  ): boolean => {
    // If the current node's capacity is less than the fruit type, return false
    if (tree[i] < value) return false;

    // Base case: if the subtree has only one node, place the fruit and return true
    if (low === high) {
      tree[i] = 0;
      return true;
    }

    // Calculate the mid index of the current subtree
    const mid = (low + high) >> 1;
    const left = (i << 1) + 1;
    const right = left + 1;

    // Recursively attempt to place the fruit in the left or right subtree
    let found: boolean;
    if (tree[left] >= value) {
      found = placeFruit(tree, left, low, mid, value);
    } else {
      found = placeFruit(tree, right, mid + 1, high, value);
    }

    // Update the current node's capacity
    tree[i] = Math.max(tree[left], tree[right]);
    return found;
  };

  // Build the segment tree
  buildTree(tree, baskets, 0, 0, size - 1);

  let count = 0;
  // Iterate over the fruit types and attempt to place each one
  for (const fruit of fruits) {
    if (!placeFruit(tree, 0, 0, size - 1, fruit)) {
      count++;
    }
  }
  // Return the count of unplaced fruit types
  return count;
}

// Editorial
// This problem is similar to 3479. Fruits Into Baskets II, but the difference lies in the larger input size, making a direct simulation inefficient.
// To optimize, we apply a square root decomposition approach.
// We divide the baskets array into sqrt(n) blocks, each of size m= sqrt(n)
//   (approximately). For each block, we maintain the maximum value in that block in an auxiliary array maxV.
// For each fruit, we scan these blocks block by block. There are two possibilities for a given block:
// If the maximum basket capacity in the current block is less than the fruit’s quantity, we skip this block entirely.
// If the block contains a basket that can hold the fruit (maxV[sec] >= fruit), we scan that block to find the leftmost basket that can hold the fruit, place it (set it to 0), and update the block’s maximum value.
// If no such basket is found after scanning all blocks, we increment the count of unplaced fruits.
function numOfUnplacedFruitsIII2(fruits: number[], baskets: number[]): number {
  const n = baskets.length;
  const m = Math.floor(Math.sqrt(n));
  const section = Math.ceil(n / m);
  let count = 0;
  const maxV: number[] = new Array(section).fill(0);

  for (let i = 0; i < n; i++) {
    const sec = Math.floor(i / m);
    maxV[sec] = Math.max(maxV[sec], baskets[i]);
  }

  for (const fruit of fruits) {
    let unset = 1;
    for (let sec = 0; sec < section; sec++) {
      if (maxV[sec] < fruit) {
        continue;
      }
      let choose = 0;
      maxV[sec] = 0;
      for (let i = 0; i < m; i++) {
        const pos = sec * m + i;
        if (pos < n && baskets[pos] >= fruit && !choose) {
          baskets[pos] = 0;
          choose = 1;
        }
        if (pos < n) {
          maxV[sec] = Math.max(maxV[sec], baskets[pos]);
        }
      }
      unset = 0;
      break;
    }
    count += unset;
  }
  return count;
}
