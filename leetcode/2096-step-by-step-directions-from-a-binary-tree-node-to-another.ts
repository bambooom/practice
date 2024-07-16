// https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another
// You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.

// Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

// 'L' means to go from a node to its left child node.
// 'R' means to go from a node to its right child node.
// 'U' means to go from a node to its parent node.
// Return the step-by-step directions of the shortest path from node s to node t.

// Example 1:
// Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
// Output: "UURL"
// Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.

import { TreeNode } from './util';

// https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/solutions/5485411/solution-in-typescript/?envType=daily-question&envId=2024-07-16
// need to determine the path from the root to both nodes, identify their lowest common ancestor (LCA), and then generate the required directions based on these paths.
function getDirections(
  root: TreeNode | null,
  startValue: number,
  destValue: number,
): string {
  const startPath: string[] = [];
  const destPath: string[] = [];

  findPath(root, startValue, startPath);
  findPath(root, destValue, destPath);

  //determine the LCA, LCA is the deepest node that is an ancestor to both the start and destination nodes
  let i = 0;
  while (
    i < startPath.length &&
    i < destPath.length &&
    startPath[i] === destPath[i]
  ) {
    i++;
  }

  // Once we have the paths from the root to both nodes, the directions to move from the start node to the LCA will involve going up (represented by 'U') the path length of the start node to the LCA.
  const stepsUp = 'U'.repeat(startPath.length - i);
  // Then, from the LCA, follow the path to the destination node directly using 'L' or 'R'.
  const stepsDown = destPath.slice(i).join('');

  return stepsUp + stepsDown;
}

// find the path from the root to a given node.
// This function will return a list of directions('L' or 'R') required to reach the node from the root.
function findPath(
  root: TreeNode | null,
  value: number,
  path: string[],
): boolean {
  if (!root) return false;
  if (root.val === value) return true;

  path.push('L');
  if (findPath(root.left, value, path)) {
    return true;
  }
  path.pop();

  path.push('R');
  if (findPath(root.right, value, path)) {
    return true;
  }
  path.pop();

  return false;
}
