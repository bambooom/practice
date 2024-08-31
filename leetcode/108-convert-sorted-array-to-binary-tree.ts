// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
// Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
// A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
import { TreeNode } from './util';

// recursive
function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (!nums.length || nums.length === 0) return null;
  const createBST = (left: number, right: number): TreeNode | null => {
    if (left > right) return null;
    const mid = Math.floor((left + right) / 2);
    const root = new TreeNode(nums[mid]);
    root.left = createBST(left, mid - 1);
    root.right = createBST(mid + 1, right);
    return root;
  };

  return createBST(0, nums.length - 1);
}

// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/solutions/4782680/a-simple-solution-beats-98-77-explained-with-code-comments/?envType=study-plan-v2&envId=top-100-liked
function sortedArrayToBST2(nums: number[]): TreeNode | null {
  const buildTree = (nums: number[]): TreeNode | null => {
    // base case
    if (nums.length === 0) {
      return null;
    }
    // get mid element
    const mid = Math.floor(nums.length / 2);
    const curr = new TreeNode(nums[mid]);
    // split array to left & right
    const left = nums.slice(0, mid);
    const right = nums.slice(mid + 1);
    // recursion
    curr.left = buildTree(left);
    curr.right = buildTree(right);
    return curr;
  };

  return buildTree(nums);
}
