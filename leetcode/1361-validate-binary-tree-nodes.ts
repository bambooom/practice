// https://leetcode.com/problems/validate-binary-tree-nodes/
// You have n binary tree nodes numbered from 0 to n - 1 where node i has two children leftChild[i] and rightChild[i], return true if and only if all the given nodes form exactly one valid binary tree.
// If node i has no left child then leftChild[i] will equal -1, similarly for the right child.
// Note that the nodes have no values and that we only use the node numbers in this problem.

//https://leetcode.com/problems/validate-binary-tree-nodes/solutions/4177854/typescript-dfs-approach/?envType=daily-question&envId=2023-10-17
// We should check a few criteria:
// - The binary tree have a root (root has no parent)
// - Every node have 1 parent
// - Every node must be connected
// - There are no cycle
// time O(N), space O(N)
function validateBinaryTreeNodes(
  n: number,
  leftChild: number[],
  rightChild: number[],
): boolean {
  const childrenSet: Set<number> = new Set([...leftChild, ...rightChild]);
  let rootNode: number | null = null;
  // find a root node which is not in childrenSet
  for (let i = 0; i < n; i++) {
    if (!childrenSet.has(i)) {
      rootNode = i;
      break;
    }
  }

  // The binary tree have a root (root has no parent)
  if (rootNode === null) {
    return false;
  }

  const visited: Set<number> = new Set([rootNode]);
  const stack: number[] = [rootNode];

  while (stack.length) {
    const node = stack.pop()!; // pop last node
    for (const child of [leftChild[node], rightChild[node]]) {
      if (child === -1) {
        // no left or no right
        continue;
      }

      // Every node have 1 parent + There are no cycle
      if (visited.has(child)) {
        return false;
      }

      stack.push(child);
      visited.add(child);
    }
  }

  // Every node must be connected
  return visited.size === n;
}
