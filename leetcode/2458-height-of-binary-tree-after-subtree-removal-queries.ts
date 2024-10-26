// https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries
// You are given the root of a binary tree with n nodes. Each node is assigned a unique value from 1 to n. You are also given an array queries of size m.
// You have to perform m independent queries on the tree where in the ith query you do the following:
// Remove the subtree rooted at the node with the value queries[i] from the tree. It is guaranteed that queries[i] will not be equal to the value of the root.
// Return an array answer of size m where answer[i] is the height of the tree after performing the ith query.
// Note:
// The queries are independent, so the tree returns to its initial state after each query.
// The height of a tree is the number of edges in the longest simple path from the root to some node in the tree.

// Example1:
// Input: root = [1,3,4,2,null,6,5,null,null,null,null,null,7], queries = [4]
// Output: [2]
// Explanation: The diagram above shows the tree after removing the subtree rooted at node with value 4.
// The height of the tree is 2 (The path 1 -> 3 -> 2).

// Example2:
// Input: root = [5,8,9,2,1,3,7,4,6], queries = [3,2,4,8]
// Output: [3,2,3,2]
// Explanation: We have the following queries:
// - Removing the subtree rooted at node with value 3. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 4).
// - Removing the subtree rooted at node with value 2. The height of the tree becomes 2 (The path 5 -> 8 -> 1).
// - Removing the subtree rooted at node with value 4. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 6).
// - Removing the subtree rooted at node with value 8. The height of the tree becomes 2 (The path 5 -> 9 -> 3).

import { TreeNode } from './util';

// https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries/solutions/5968836/explained-step-by-step-beats-100-working-26-10-2024/
// 没看懂
function treeQueries(root: TreeNode | null, queries: number[]): number[] {
  const heights: number[] = new Array(50000).fill(0); // store heights of leaf nodes
  const d: number[] = new Array(100001).fill(0); // store depth of each node
  const l: number[] = new Array(100001).fill(0); // store left boundary index of each node
  const r: number[] = new Array(100001).fill(0); // store right boundary index of each node
  let len = 0;

  // dfs function
  const search = (p: TreeNode, h: number): void => {
    d[p.val] = h;

    // if current node is a leaf node
    if (!p.left && !p.right) {
      heights[len] = h; // store its height
      l[p.val] = r[p.val] = len; // Set left and right boundaries to current index
      len++; // increment leaf counter
    }

    // store left boundary for current node
    l[p.val] = len;

    // recursively process left and right subtrees
    if (p.left) search(p.left, h + 1);
    if (p.right) search(p.right, h + 1);

    // store right boundary for current node
    r[p.val] = len - 1;
  };

  if (!root) return [];
  search(root, 0);

  const n = len;
  // arrays for store maximum heights from left and right
  const maxl = new Array(n).fill(0);
  const maxr = new Array(n).fill(0);

  // compute maximum heights from left to right and right to left
  for (let i = 0; i < n; i++) {
    maxl[i] = Math.max(maxl[i - 1], heights[i - 1]); // left to right maximum
    maxr[n - i - 1] = Math.max(maxr[n - i], heights[n - 1]); // right to left maximum
  }

  const res: number[] = [];
  const k = queries.length;

  for (let i = 0; i < k; i++) {
    // for each query, find maximum height possible when removing the queries node
    const maxxl = maxl[l[queries[i]]]; // max height to the left
    const maxxr = maxr[r[queries[i]]]; // max height to the right
    // Result is maximum of:
    // 1. maximum height to the left of node
    // 2. maximum height to the right of node
    // 3. node's depth - 1 (representing parent's path)
    res.push(Math.max(maxxl, maxxr, d[queries[i]] - 1));
  }

  return res;
}

// https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries/solutions/4147247/intuition-approach-pseudo-code-code-typescript/
