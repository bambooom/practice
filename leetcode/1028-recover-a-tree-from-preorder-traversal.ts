// https://leetcode.com/problems/recover-a-tree-from-preorder-traversal/description/

// We run a preorder depth-first search (DFS) on the root of a binary tree.
// At each node in this traversal, we output D dashes (where D is the depth of this node), then we output the value of this node.  If the depth of a node is D, the depth of its immediate child is D + 1.  The depth of the root node is 0.
// If a node has only one child, that child is guaranteed to be the left child.
// Given the output traversal of this traversal, recover the tree and return its root.

// Example 1:
// Input: traversal = "1-2--3--4-5--6--7"
// Output: [1,2,5,3,4,6,7]

// Example 2:
// Input: traversal = '1-2--3---4-5--6---7';
// Output: [1, 2, 5, 3, null, 6, null, 4, null, 7];

// Example 3:
// traversal = '1-401--349---90--88';
// Output: [1, 401, null, 349, 88, 90];

import { TreeNode } from './util';

// https://leetcode.com/problems/recover-a-tree-from-preorder-traversal/solutions/5778572/both-runtime-and-memory-beats-100-explained/
// The intuition is to use a stack to keep track of nodes as we build the tree from the preorder string:
function recoverFromPreorder(traversal: string): TreeNode | null {
  const stack: TreeNode[] = [];
  let i = 0;

  while (i < traversal.length) {
    let level = 0;

    // count the number of dashes to determine the node level
    while (i < traversal.length && traversal[i] === '-') {
      level++;
      i++;
    }

    // Parse the node value
    let value = 0;
    while (i < traversal.length && traversal[i] >= '0' && traversal[i] <= '9') {
      value = value * 10 + (traversal[i].charCodeAt(0) - '0'.charCodeAt(0));
      i++;
    }

    const node = new TreeNode(value);

    // adjust the stack to match the current node's level
    while (stack.length > level) {
      stack.pop();
    }

    // attach the node to its parent
    if (stack.length > 0) {
      if (!stack[stack.length - 1].left) {
        stack[stack.length - 1].left = node;
      } else {
        stack[stack.length - 1].right = node;
      }
    }

    // push the current node to the stack
    stack.push(node);
  }

  // the root node is the bottom-most element in the stack
  return stack.length > 0 ? stack[0] : null;
}

// Optional helper function to serialize the tree (for testing)
function serialize(root: TreeNode | null): (number | null)[] {
  const result: (number | null)[] = [];
  if (!root) return result;

  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Remove trailing nulls for cleaner output
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}
