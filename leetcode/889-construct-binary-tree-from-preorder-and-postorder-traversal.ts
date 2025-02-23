// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/description/
// Given two integer arrays, preorder and postorder where preorder is the preorder traversal of a binary tree of distinct values and postorder is the postorder traversal of the same tree, reconstruct and return the binary tree.
// If there exist multiple answers, you can return any of them.

// Example 1:
// Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
// Output: [1,2,3,4,5,6,7]

import { TreeNode } from './util';

// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/solutions/6457660/recursive-tree-constructor/
// recursive tree constructor
function constructFromPrePost(
  preorder: number[],
  postorder: number[],
): TreeNode | null {
  const build = (root = new TreeNode(preorder[i++])) => {
    (['left', 'right'] as const).forEach(
      (c) => root.val != postorder[j] && (root[c] = build()),
    );
    j++;
    return root;
  };
  let i = 0,
    j = 0;
  return build();
}

//https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/solutions/6458772/explanation-example-walk-though-array-pointers-1-3ms-20-100-57-8-59-7mb-8-7/
function constructFromPrePost2(
  preorder: number[],
  postorder: number[],
): TreeNode | null {
  // Global indices for traversing preorder and postorder arrays
  let preIndex = 0;
  let postIndex = 0;

  /**
   * Recursively constructs the binary tree using a single DFS traversal.
   * The function uses the current global indices to decide when a subtree is complete.
   *
   * @returns The root node of the constructed subtree.
   */
  function buildTree(): TreeNode | null {
    // If we've processed all nodes in preorder, return null.
    if (preIndex >= preorder.length) {
      return null;
    }

    // Create a new node with the current value in the preorder array.
    const node = new TreeNode(preorder[preIndex++]);

    // If the current node's value does not match the postorder value at postIndex,
    // it indicates that there are nodes in the left subtree that have not been processed.
    if (node.val !== postorder[postIndex]) {
      node.left = buildTree();
    }

    // After processing the left subtree, if the current node's value still
    // does not match the postorder value, then a right subtree exists.
    if (node.val !== postorder[postIndex]) {
      node.right = buildTree();
    }

    // Increment the postorder index after finishing both subtrees,
    // indicating that the current node's subtree is fully constructed.
    postIndex++;

    // Return the constructed node.
    return node;
  }

  // Initiate the recursive construction starting from the global indices.
  return buildTree();
}

// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/solutions/6456934/100-javascript-ts/
// maybe faster
function constructFromPrePost3(
  preorder: number[],
  postorder: number[],
): TreeNode | null {
  function construct(
    preorder: number[],
    postorder: number[],
    preIdxObj: { preIdx: number },
    left: number,
    right: number,
    length: number,
  ): TreeNode | null {
    if (preIdxObj.preIdx >= length || left > right) {
      return null;
    }
    const node = new TreeNode(preorder[preIdxObj.preIdx]);
    preIdxObj.preIdx++;
    if (left === right) {
      return node;
    }
    let index = left;
    while (index <= right && preorder[preIdxObj.preIdx] !== postorder[index]) {
      index++;
    }
    if (index <= right) {
      node.left = construct(
        preorder,
        postorder,
        preIdxObj,
        left,
        index,
        length,
      );
      node.right = construct(
        preorder,
        postorder,
        preIdxObj,
        index + 1,
        right - 1,
        length,
      );
    }
    return node;
  }

  const preIdx = 0;
  return construct(
    preorder,
    postorder,
    { preIdx },
    0,
    preorder.length - 1,
    preorder.length,
  );
}
