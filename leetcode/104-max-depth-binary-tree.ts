import { TreeNode } from './util';

/**
 * 1. recursive
 * time: O(N)
 * space: O(logN)
 */
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

/**
 * 2. Tail Recursion + BFS (breadth-first search)
 * specific form of recursion where the recursive call is the last action in the function.
 */

/**
 * 3. iteration
 * time: O(N)
 * space: O(logN)
 */
function maxDepth3(root: TreeNode | null): number {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length !== 0) {
    depth++;
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      if (queue[i].left) queue.push(queue[i].left as TreeNode);
      if (queue[i].right) queue.push(queue[i].right as TreeNode);
    }
    queue.splice(0, len);
  }
  return depth;
}
