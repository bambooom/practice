// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
// Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

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
