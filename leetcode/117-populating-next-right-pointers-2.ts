// https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/

// binary tree node, .val, .left, .right, .next
import { Node } from './util';

// Populate each next pointer to point to its next right node.
// If there is no next right node, the next pointer should be set to NULL.
// Initially, all next pointers are set to NULL.

// Input: root = [1,2,3,4,5,null,7]
// Output: [1,#,2,3,#,4,5,7,#]
function connect(root: Node | null): Node | null {
  if (!root) return null;
  // level 0 , just root
  const lastValueBylevel: { [key in number]: Node | null } = {};
  const traveling = (leaf: Node, level = 0): Node => {
    leaf.next = null;

    if (leaf.right) {
      leaf.right = traveling(leaf.right, level + 1);
    }
    if (leaf.left) {
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
