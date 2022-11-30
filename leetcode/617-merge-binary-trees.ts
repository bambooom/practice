// https://leetcode.com/problems/merge-two-binary-trees

import { TreeNode } from './util';

function mergeTrees(
  root1: TreeNode | null,
  root2: TreeNode | null,
): TreeNode | null {
  if (!root1 && !root2) return null;
  if (!root1 && root2) return root2;
  if (root1 && !root2) return root1;

  const mergedRoot = new TreeNode(
    (root1 as TreeNode).val + (root2 as TreeNode).val,
  );
  if (root1?.left && !root2?.left) {
    mergedRoot.left = root1.left;
  } else if (!root1?.left && root2?.left) {
    mergedRoot.left = root2.left;
  } else if (root1?.left && root2?.left) {
    mergedRoot.left = mergeTrees(root1.left, root2.left);
  }

  if (root1?.right && !root2?.right) {
    mergedRoot.right = root1.right;
  } else if (!root1?.right && root2?.right) {
    mergedRoot.right = root2.right;
  } else if (root1?.right && root2?.right) {
    mergedRoot.right = mergeTrees(root1.right, root2.right);
  }

  return mergedRoot;
}
