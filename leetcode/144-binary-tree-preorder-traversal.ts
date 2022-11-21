// preorder: root, left, right
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

export function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const stack: TreeNode[] = [root];
  const res: number[] = [];

  while (stack.length) {
    const node = stack.pop() as TreeNode;
    res.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
    // right is before left since pop() is used,
    // which pops off the last element that is input to the stack,
    // in this case, usually node.left.
    // Thus, it will continue down the left side
    // until it is null then move on to the right side
  }

  return res;
}
