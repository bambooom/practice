// https://leetcode.com/problems/most-profitable-path-in-a-tree/description/
// There is an undirected tree with n nodes labeled from 0 to n - 1, rooted at node 0. You are given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
// At every node i, there is a gate. You are also given an array of even integers amount, where amount[i] represents:
// the price needed to open the gate at node i, if amount[i] is negative, or,
// the cash reward obtained on opening the gate at node i, otherwise.

// The game goes on as follows:
// Initially, Alice is at node 0 and Bob is at node bob.
// At every second, Alice and Bob each move to an adjacent node. Alice moves towards some leaf node, while Bob moves towards node 0.
// For every node along their path, Alice and Bob either spend money to open the gate at that node, or accept the reward. Note that:
// If the gate is already open, no price will be required, nor will there be any cash reward.
// If Alice and Bob reach the node simultaneously, they share the price/reward for opening the gate there. In other words, if the price to open the gate is c, then both Alice and Bob pay c / 2 each. Similarly, if the reward at the gate is c, both of them receive c / 2 each.
// If Alice reaches a leaf node, she stops moving. Similarly, if Bob reaches node 0, he stops moving. Note that these events are independent of each other.
// Return the maximum net income Alice can have if she travels towards the optimal leaf node.

// Example1:
// Input: edges = [[0,1],[1,2],[1,3],[3,4]], bob = 3, amount = [-2,4,2,-4,6]
// Output: 6
// Explanation:
// The above diagram represents the given tree. The game goes as follows:
// - Alice is initially on node 0, Bob on node 3. They open the gates of their respective nodes.
//   Alice's net income is now -2.
// - Both Alice and Bob move to node 1.
//   Since they reach here simultaneously, they open the gate together and share the reward.
//   Alice's net income becomes -2 + (4 / 2) = 0.
// - Alice moves on to node 3. Since Bob already opened its gate, Alice's income remains unchanged.
//   Bob moves on to node 0, and stops moving.
// - Alice moves on to node 4 and opens the gate there. Her net income becomes 0 + 6 = 6.
// Now, neither Alice nor Bob can make any further moves, and the game ends.
// It is not possible for Alice to get a higher net income.

// Example2:
// Input: edges = [[0,1]], bob = 1, amount = [-7280,2350]
// Output: -7280
// Explanation:
// Alice follows the path 0->1 whereas Bob follows the path 1->0.
// Thus, Alice opens the gate at node 0 only. Hence, her net income is -7280.

// https://leetcode.com/problems/most-profitable-path-in-a-tree/solutions/5364057/easy-understand-using-ts-backtracing/
function mostProfitablePath(
  edges: number[][],
  bob: number,
  amount: number[],
): number {
  const graph: Record<number, number[]> = {};
  const parents: Record<number, number> = {};

  // 1. Build graph
  for (const [parent, child] of edges) {
    if (graph[parent]) {
      graph[parent].push(child);
    } else {
      graph[parent] = [child];
    }

    if (graph[child]) {
      graph[child].push(parent);
    } else {
      graph[child] = [parent];
    }
  }

  // 2. Find out each node's parent
  const visited: Set<number> = new Set();

  // DFS on graph, build a parent-child relationship between nodes in the graph
  const parenting = (val: number) => {
    if (!graph[val] || visited.has(val)) return;
    visited.add(val);
    // marks as visited and iterates over children
    for (const child of graph[val]) {
      if (visited.has(child)) continue;

      parents[child] = val;
      parenting(child);
    }
  };

  parenting(0);

  let answer = Number.MIN_SAFE_INTEGER;
  const bobVisited: Set<number> = new Set();

  // 3. Collect the reward during each move until a leaf node is reached
  const dfs = (alice: number, bob: number, profit: number) => {
    if (!graph[alice]) {
      return;
    }

    let income = 0;

    if (!bobVisited.has(alice)) {
      income = alice === bob ? amount[alice] / 2 : amount[alice];
    }

    profit += income;

    const hasChild = graph[alice].length - 1 > 0 || alice === 0;

    if (!hasChild) {
      answer = Math.max(answer, profit);
      return;
    }

    bobVisited.add(bob);

    for (const child of graph[alice]) {
      if (child === parents[alice]) {
        continue;
      }

      dfs(child, parents[bob] ?? 0, profit);
    }

    bobVisited.delete(bob);
  };

  dfs(0, bob, 0);

  return answer;
}
