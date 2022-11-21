// post: left, right, root
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const stack: TreeNode[] = [root];
  const res: number[] = [];

  while (stack.length) {
    const node = stack.pop() as TreeNode;
    res.unshift(node.val); // insert start
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
    // using pop(), then get right first, and insert right at start
    // then array order it's behind left
  }

  return res;
}

// recurvise
function postorderTraversal2(root: TreeNode | null): number[] {
  const result: number[] = [];
  const recursive = (node: TreeNode | null) => {
    if (!node) return;

    if (node.left) recursive(node.left);
    if (node.right) recursive(node.right);
    result.push(node.val);
  };

  recursive(root);
  return result;
}
