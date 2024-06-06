// https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree
// Given an array of unique integers preorder, return true if it is the correct preorder traversal sequence of a binary search tree.

function verifyPreorder(preorder: number[]): boolean {
  if (!preorder || preorder.length === 0) return false;

  const stack: number[] = [];
  let lastPopped: number = Number.NEGATIVE_INFINITY;

  for (const node of preorder) {
    if (lastPopped > node) {
      return false;
    }

    // bubble up 'node' to where its parent is larger than x or parent = null
    while (stack[stack.length - 1] < node && stack.length !== 0) {
      lastPopped = stack.pop()!;
    }
    stack.push(node);
  }

  return true;
}

// https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree/editorial
