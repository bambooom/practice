// https://leetcode.com/problems/populating-next-right-pointers-in-each-node/

// perfect binary tree node, .val, .left, .right, .next
import { Node } from './util';

// Populate each next pointer to point to its next right node.
// If there is no next right node, the next pointer should be set to NULL.
// Input: root = [1,2,3,4,5,6,7]
// Output: [1,#,2,3,#,4,5,6,7,#]
function connect(root: Node | null): Node | null {
  if (!root) return null;

  // level 0 , just root
  const lastValueBylevel: { [key in number]: Node | null } = {};

  const traveling = (leaf: Node, level = 0): Node => {
    leaf.next = null; // Default next will always be null

    // Giving the "perfect binary tree" so we only need to check on left OR right
    if (leaf.right && leaf.left) {
      leaf.right = traveling(leaf.right, level + 1);
      leaf.left = traveling(leaf.left, level + 1);
    }
    // If there are stored value at current level, we will assign it to the next
    if (lastValueBylevel[level] !== undefined) {
      leaf.next = lastValueBylevel[level];
    }
    lastValueBylevel[level] = leaf; // Storing value at current level
    return leaf;
  };

  return traveling(root);
}

function connect2(root: Node | null): Node | null {
  if (root === null) return null;

  // The original "next"s are "undefined" instead of "null" from the problem description
  // Thus, we need to update the default pointers from "undefined" to "null", thought this
  // step is not strictly required to pass the answer checking
  if (root.next === undefined) root.next = null;

  // Deal with the [only one number] situation
  if (root.left === null) return root;

  root.left.next = root.right;
  if (root.next !== null) {
    (root.right as Node).next = root.next.left;
  }

  if (root.left.left !== null) {
    root.left = connect(root.left);
    root.right = connect(root.right);
  }

  return root;
}
