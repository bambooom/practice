// https://leetcode.com/problems/delete-nodes-and-return-forest
// Given the root of a binary tree, each node in the tree has a distinct value.
// After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).
// Return the roots of the trees in the remaining forest. You may return the result in any order.

// Example 1:
// Input: root = [1, 2, 3, 4, 5, 6, 7], to_delete = [3, 5]
// Output: [[1,2,null,4],[6],[7]]
// Example 2:
// Input: root = [1,2,4,null,3], to_delete = [3]
// Output: [[1,2,4]]

import { TreeNode } from './util';

// https://leetcode.com/problems/delete-nodes-and-return-forest/solutions/861092/typescript-javascript-easy-dfs-solution-w-comments/?envType=daily-question&envId=2024-07-17
function delNodes(
  root: TreeNode | null,
  to_delete: number[],
): Array<TreeNode | null> {
  // create a set of to_delete for o(1) lookups
  const toDelete = new Set(to_delete);
  const res: (TreeNode | null)[] = [];

  const dfs = (node: TreeNode | null, isRoot: boolean): TreeNode | null => {
    if (!node) return null;

    // check if this node should be pruned
    const deleted = toDelete.has(node.val);

    // check if root and shouldn't be deleted
    if (isRoot && !deleted) {
      res.push(node);
    }

    // build left and right subtrees, left and right will be ROOTS if this was deleted
    node.left = dfs(node.left, deleted);
    node.right = dfs(node.right, deleted);

    // if this one was pruned, return null, if not, return this node
    return deleted ? null : node;
  };

  dfs(root, true);

  return res;
}
