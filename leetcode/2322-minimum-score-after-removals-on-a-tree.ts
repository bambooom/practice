// https://leetcode.com/problems/minimum-score-after-removals-on-a-tree/
// There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.
// You are given a 0-indexed integer array nums of length n where nums[i] represents the value of the ith node. You are also given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
// Remove two distinct edges of the tree to form three connected components. For a pair of removed edges, the following steps are defined:
// Get the XOR of all the values of the nodes for each of the three components respectively.
// The difference between the largest XOR value and the smallest XOR value is the score of the pair.
// For example, say the three components have the node values: [4,5,7], [1,9], and [3,3,3]. The three XOR values are 4 ^ 5 ^ 7 = 6, 1 ^ 9 = 8, and 3 ^ 3 ^ 3 = 3. The largest XOR value is 8 and the smallest XOR value is 3. The score is then 8 - 3 = 5.
// Return the minimum score of any possible pair of edge removals on the given tree.

// Example 1:
// Input: nums = [1,5,5,4,11], edges = [[0,1],[1,2],[1,3],[3,4]]
// Output: 9
// Explanation: The diagram above shows a way to make a pair of removals.
// - The 1st component has nodes [1,3,4] with values [5,4,11]. Its XOR value is 5 ^ 4 ^ 11 = 10.
// - The 2nd component has node [0] with value [1]. Its XOR value is 1 = 1.
// - The 3rd component has node [2] with value [5]. Its XOR value is 5 = 5.
// The score is the difference between the largest and smallest XOR value which is 10 - 1 = 9.
// It can be shown that no other pair of removals will obtain a smaller score than 9.

// Example 2:
// Input: nums = [5,5,2,4,4,2], edges = [[0,1],[1,2],[5,2],[4,3],[1,3]]
// Output: 0
// Explanation: The diagram above shows a way to make a pair of removals.
// - The 1st component has nodes [3,4] with values [4,4]. Its XOR value is 4 ^ 4 = 0.
// - The 2nd component has nodes [1,0] with values [5,5]. Its XOR value is 5 ^ 5 = 0.
// - The 3rd component has nodes [2,5] with values [2,2]. Its XOR value is 2 ^ 2 = 0.
// The score is the difference between the largest and smallest XOR value which is 0 - 0 = 0.
// We cannot obtain a smaller score than 0.

// give up on this one

// https://leetcode.com/problems/minimum-score-after-removals-on-a-tree/solutions/2200093/javascript-dfs-solution/?envType=daily-question&envId=2025-07-24
function minimumScore(nums: number[], edges: number[][]): number {
  const n = nums.length; // number of nodes in the tree
  let ans = Infinity; // init the answer as infinity
  const visited = Array(n).fill(0); // keep track of visited nodes

  // store the parent-child relationships
  const pc: number[][] = [];
  // adjacency list to represent the tree
  const adj: number[][] = Array.from({ length: n }, () => []);
  // store the XOR values of child nodes for each node
  const child_xor = Array(n).fill(0);
  // 2D array to store the child relationships between nodes
  const childs = Array.from({ length: n }, () => Array(n).fill(false));
  // store the parent nodes
  const par = Array(n).fill(0);

  // Populate the adjacency list with edges
  for (const edge of edges) {
    adj[edge[0]].push(edge[1]), adj[edge[1]].push(edge[0]);
  }

  dfs(0); // dfs from 0

  // Iterate over all pairs of parent-child relationships
  for (let i = 0; i < pc.length; i++)
    for (let j = i + 1; j < pc.length; j++) {
      // removing an edge i and j
      const a = pc[i][1]; // node that will come below when you delete an edge i
      const b = pc[j][1]; // node that will come below when you delete an edge j
      let xa = child_xor[a]; // XOR value of child nodes for node a
      const xb = child_xor[b]; // XOR value of child nodes for node b
      let xc = child_xor[0]; // XOR value of child nodes for the root node
      if (childs[a][b]) {
        // Update XOR values if a is a child of b
        xc ^= xa;
        xa ^= xb;
      } else {
        xc ^= xa;
        xc ^= xb;
      }

      ans = Math.min(
        Math.max(xa, Math.max(xb, xc)) - Math.min(xa, Math.min(xb, xc)),
        ans,
      );
    }

  return ans;

  // DFS function to calculate the XOR values of child nodes for each node
  function dfs(i: number) {
    // Initialize the XOR value for the current node
    let ans = nums[i];
    // Mark the current node as visited
    visited[i] = true;

    for (const p of par) childs[p][i] = true; // Defining this node as the child of all its parents
    // Add the current node to the parent array
    par.push(i);

    // Iterate over all child nodes of the current node
    for (const child of adj[i] || []) {
      if (!visited[child]) {
        // Store the parent-child relationship
        pc.push([i, child]);
        // Recursively calculate the XOR value for the child node
        ans ^= dfs(child);
      }
    }
    // Remove the current node from the parent array
    par.pop();
    // Return the XOR value for the current node
    return (child_xor[i] = ans);
  }
}

// Editorial 1 Double DFS to Partition Connected Components
function minimumScore2(nums: number[], edges: number[][]): number {
  const n = nums.length;
  const e: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    e[u].push(v);
    e[v].push(u);
  }

  let sum = 0;
  for (const x of nums) {
    sum ^= x;
  }
  let res = Infinity;

  function calc(part1: number, part2: number, part3: number): number {
    return (
      Math.max(part1, Math.max(part2, part3)) -
      Math.min(part1, Math.min(part2, part3))
    );
  }

  const dfs2 = (x: number, f: number, oth: number, anc: number): number => {
    let son = nums[x];
    for (const y of e[x]) {
      if (y === f) {
        continue;
      }
      son ^= dfs2(y, x, oth, anc);
    }
    if (f === anc) {
      return son;
    }
    res = Math.min(res, calc(oth, son, sum ^ oth ^ son));
    return son;
  };

  const dfs = (x: number, f: number): number => {
    let son = nums[x];
    for (const y of e[x]) {
      if (y === f) {
        continue;
      }
      son ^= dfs(y, x);
    }
    for (const y of e[x]) {
      if (y === f) {
        dfs2(y, x, son, x);
      }
    }
    return son;
  };

  dfs(0, -1);
  return res;
}

// Editorial 2: Enumerate Based on DFS Order
function minimumScore3(nums: number[], edges: number[][]): number {
  const n = nums.length;
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const sum = new Array(n).fill(0);
  const in_ = new Array(n).fill(0);
  const out = new Array(n).fill(0);
  let cnt = 0;

  function dfs(x: number, fa: number) {
    in_[x] = cnt++;
    sum[x] = nums[x];
    for (const y of adj[x]) {
      if (y === fa) {
        continue;
      }
      dfs(y, x);
      sum[x] ^= sum[y];
    }
    out[x] = cnt;
  }

  dfs(0, -1);

  let res = Infinity;
  for (let u = 1; u < n; u++) {
    for (let v = u + 1; v < n; v++) {
      if (in_[v] > in_[u] && in_[v] < out[u]) {
        res = Math.min(res, calc(sum[0] ^ sum[u], sum[u] ^ sum[v], sum[v]));
      } else if (in_[u] > in_[v] && in_[u] < out[v]) {
        res = Math.min(res, calc(sum[0] ^ sum[v], sum[v] ^ sum[u], sum[u]));
      } else {
        res = Math.min(res, calc(sum[0] ^ sum[u] ^ sum[v], sum[u], sum[v]));
      }
    }
  }
  return res;
}

function calc(part1: number, part2: number, part3: number) {
  return (
    Math.max(part1, Math.max(part2, part3)) -
    Math.min(part1, Math.min(part2, part3))
  );
}
