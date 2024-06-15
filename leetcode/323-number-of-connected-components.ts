// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
// You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.
// Return the number of connected components in the graph.

// Example 1:
// Input: n = 5, edges = [[0,1],[1,2],[3,4]]
// Output: 2
// Example 2:
// Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
// Output: 1

// dfs solution
function dfs(
  adjList: Map<number, number[]>,
  visited: Set<number>,
  startNode: number,
) {
  visited.add(startNode);

  if (!adjList.get(startNode)) return;
  const vertices = adjList.get(startNode) as number[];
  for (let i = 0; i < vertices.length; i++) {
    if (!visited.has(vertices[i])) {
      dfs(adjList, visited, vertices[i]);
    }
  }
}

function countComponents(n: number, edges: number[][]): number {
  if (n === 0) return 0;
  let count = 0;
  const adjList: Map<number, number[]> = new Map();
  const visited: Set<number> = new Set();
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    adjList.set(a, [...(adjList.get(a) || []), b]);
    adjList.set(b, [...(adjList.get(b) || []), a]);
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      count++;
      dfs(adjList, visited, i);
    }
  }

  return count;
}

// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/solutions/2895679/2-simplest-typescript-solutions-union-set-dfs/?envType=study-plan-v2&envId=premium-algo-100
// Union Find Set: Define each union set with given edge, Then run an algorithm to group them up
function countComponents2(n: number, edges: number[][]): number {
  // ✅ 1 <= n <= 2000
  // ✅ 1 <= edges.length <= 5000
  // ✅ edges[i].length == 2
  //  0 <= ai <= bi < n
  //  OR, "0 <= ai < bi < n", with given constraint "ai != bi"
  // ✅ ai != bi
  // ✅ There are no repeated edges.

  //  O(N)
  // the negative one represents "Indepdent Node"
  const nums = Array(n).fill(-1);

  //  O(log N)
  const find = (i: number) => {
    // gets the independent node edge
    if (nums[i] === -1) return i;
    return find(nums[i]);
  };

  //  O(N)
  edges.forEach(([a, b]) => {
    const x = find(a);
    const y = find(b);

    if (x !== y) nums[x] = y;
  });

  //  O(N)
  return nums.filter((num) => num === -1).length;
}

// DFS
function countComponents3(n: number, edges: number[][]): number {
  if (n === 0) return 0;

  const map = new Map<number, number[]>(); // \U0001f7e0 O(N ^ 2)
  const visited: number[] = []; // \U0001f7e0 O(N) //  Required to avoid looping each other
  let connectedComponentsCount = 0;

  // \U0001f534 O(N)
  edges.forEach(([a, b]) => {
    // push bidirectional map relationship for each edge
    map.set(a, [...(map.get(a) || []), b]);
    map.set(b, [...(map.get(b) || []), a]);
  });

  const dfs = (nodeId: number) => {
    if (visited.includes(nodeId)) return;
    visited.push(nodeId);

    const got = map.get(nodeId);
    if (got === undefined) return;

    got.forEach((eachId) => dfs(eachId));
    map.delete(nodeId);
  };

  // \U0001f534 O(log N)
  while (map.size > 0) {
    connectedComponentsCount++;

    // const firstKey = map.keys().next().value
    dfs(map.keys().next().value);
  }
  // const independentNode: number = n - visited.length
  return connectedComponentsCount + n - visited.length;
}
