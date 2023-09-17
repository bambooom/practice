// https://www.hello-algo.com/chapter_divide_and_conquer/build_binary_tree_problem/

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/* 构建二叉树：分治 */
function dfs(
  preorder: number[],
  inorderMap: Map<number, number>,
  i: number,
  l: number,
  r: number,
): TreeNode | null {
  // 子树区间为空时终止
  if (r - l < 0) return null;
  // 初始化根节点
  const root: TreeNode = new TreeNode(preorder[i]);
  // 查询 m ，从而划分左右子树
  const m = inorderMap.get(preorder[i]) as number;
  // 子问题：构建左子树
  root.left = dfs(preorder, inorderMap, i + 1, l, m - 1);
  // 子问题：构建右子树
  root.right = dfs(preorder, inorderMap, i + 1 + m - l, m + 1, r);
  // 返回根节点
  return root;
}

/* 构建二叉树 */
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // 初始化哈希表，存储 inorder 元素到索引的映射
  const inorderMap = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }
  const root = dfs(preorder, inorderMap, 0, 0, inorder.length - 1);
  return root;
}
