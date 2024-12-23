// https://leetcode.com/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/
// You are given the root of a binary tree with unique values.
// In one operation, you can choose any two nodes at the same level and swap their values.
// Return the minimum number of operations needed to make the values at each level sorted in a strictly increasing order.
// The level of a node is the number of edges along the path between it and the root node.

// Example1:
// Input: root = [1,4,3,7,6,8,5,null,null,null,null,9,null,10]
// Output: 3
// Explanation:
// - Swap 4 and 3. The 2nd level becomes [3,4].
// - Swap 7 and 5. The 3rd level becomes [5,6,8,7].
// - Swap 8 and 7. The 3rd level becomes [5,6,7,8].
// We used 3 operations so return 3.
// It can be proven that 3 is the minimum number of operations needed.

// Example2:
// Input: root = [1,3,2,7,6,5,4]
// Output: 3
// Explanation:
// - Swap 3 and 2. The 2nd level becomes [2,3].
// - Swap 7 and 4. The 3rd level becomes [4,6,5,7].
// - Swap 6 and 5. The 3rd level becomes [4,5,6,7].
// We used 3 operations so return 3.
// It can be proven that 3 is the minimum number of operations needed.

// Example3:
// Input: root = [1,2,3,4,5,6]
// Output: 0
// Explanation: Each level is already sorted in increasing order so return 0.

import { TreeNode } from './util';

// https://leetcode.com/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/solutions/6175808/perfect-solution-with-bfs-sorting-c-java-python-javascript/
// BFS
function minimumOperations(root: TreeNode | null): number {
  if (!root) return 0;

  const q = [root];
  let operations = 0;

  while (q.length > 0) {
    const size = q.length;
    const level: number[] = [];

    for (let i = 0; i < size; i++) {
      const node = q.shift()!;
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }

    const sortLevel = [...level].sort((a, b) => a - b);
    const mp = new Map<number, number>();

    for (let i = 0; i < level.length; i++) {
      mp.set(level[i], i);
    }

    for (let i = 0; i < level.length; i++) {
      while (level[i] !== sortLevel[i]) {
        operations++;
        const cur = mp.get(sortLevel[i])!;
        mp.set(level[i], cur);
        [level[i], level[cur]] = [level[cur], level[i]];
      }
    }
  }

  return operations;
}

// https://leetcode.com/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/solutions/2810374/javascript-bfs-cycle-counting-explained/
// slower
function minimumOperations2(root: TreeNode | null): number {
  if (!root) return 0;
  const minSwaps = (nums: number[]): number => {
    const sorted = [...nums].sort((a, b) => a - b);
    const indexes = sorted.reduce((memo, num, idx) => {
      memo[num] = idx;
      return memo;
    }, {} as Record<number, number>);

    const next: Record<number, number> = {};
    for (const num of nums) {
      next[num] = nums[indexes[num]];
    }

    const seen = new Set<number>();
    let ans = 0;

    for (const num of nums) {
      let cycleSize = 0,
        node = num;
      while (!seen.has(node)) {
        seen.add(node);
        node = next[node];
        cycleSize++;
      }
      ans += Math.max(0, cycleSize - 1);
    }
    return ans;
  };

  let queue: TreeNode[] = [root];
  let ans = 0;

  while (queue.length) {
    const next = [];
    ans += minSwaps(queue.map((node) => node.val));

    while (queue.length) {
      const node = queue.shift()!;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    queue = next;
  }

  return ans;
}
