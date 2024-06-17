// https://leetcode.com/problems/all-paths-from-source-lead-to-destination/
// Given the edges of a directed graph where edges[i] = [ai, bi] indicates there is an edge between nodes ai and bi,
// and two nodes source and destination of this graph, determine whether or not all paths starting from source eventually, end at destination, that is:
// - At least one path exists from the source node to the destination node
// - If a path exists from the source node to a node with no outgoing edges, then that node is equal to destination.
// - The number of possible paths from source to destination is a finite number.
// Return true if and only if all roads from source lead to destination.

// https://leetcode.com/problems/all-paths-from-source-lead-to-destination/solutions/3335616/really-working-solution-with-white-black-gray-marking-of-nodes/?envType=study-plan-v2&envId=premium-algo-100
// Solution is based on basic algorithm for looking of cycles in graph (with marking nodes as BLACK / WHITE / GRAY) and DFS
// Memoization is absolutely needed because of Time Exceeded in another case
function leadsToDestination(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
): boolean {
  // Prepare adjacent list
  // Based on this data structure we can find all adjacent vertices for current vertice in O(1) time
  const graph: number[][] = new Array(n);
  for (let i = 0; i < graph.length; i++) {
    graph[i] = [];
  }
  for (const edge of edges) {
    graph[edge[0]].push(edge[1]); // 可以知道 edge[0] 的节点 指向 [...] 哪些节点
  }

  // Prepare colors for vertices
  // Based on this array we can find cycles in graph
  const color: string[] = new Array(n).fill('WHITE');

  // Initialize cache
  // Memoization for recursive function
  const cache: (null | boolean)[] = new Array(n).fill(null);

  return leadsToDest(source);

  function leadsToDest(curr: number): boolean {
    // Check in cache first
    if (cache[curr] !== null) return cache[curr];

    // Check that we find a least node different from destination
    if (graph[curr].length === 0) {
      // 如果没有其他节点可以去，那现在这个 curr 就是终点，所以 check 是否是 target destination
      return curr === destination;
    }

    // Check that we are not in the cycle
    if (color[curr] === 'GRAY') {
      return false;
    }

    // Mark this node in color array
    // If futher we return to the same node we will see it because it will be "GRAY"
    if (color[curr] === 'WHITE') {
      color[curr] = 'GRAY';
    }

    for (const vert of graph[curr]) {
      if (!leadsToDest(vert)) return false;
    }

    // Save result of this call in cache for Memoization
    cache[curr] = true;

    color[curr] = 'BLACK';
    return true;
  }
}

// https://leetcode.com/problems/all-paths-from-source-lead-to-destination/solutions/4643109/ts-js-backtracking-solution/?envType=study-plan-v2&envId=premium-algo-100
function leadsToDestination2(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
): boolean {
  const graph: number[][] = [];
  const memo: boolean[] = [];

  //build graph
  for (const [from, to] of edges) {
    const mapped = graph[from];

    if (mapped) {
      mapped.push(to);

      continue;
    }

    graph[from] = [to];
  }

  const backtrack = (currNode: number, visited: Set<number>): boolean => {
    if (memo[currNode]) {
      //if we have response in the cache the return it
      return memo[currNode];
    }

    const nextNodes = graph[currNode];

    if (!nextNodes) {
      // if no nextNodes that means we are in leaf node
      return currNode === destination; // return if leaf is the destination
    }

    //traverse next nodes
    for (const node of nextNodes) {
      if (visited.has(node)) {
        //check if next node (candidate) is valid
        return false;
      }

      visited.add(node);
      const validPath = backtrack(node, visited);
      memo[currNode] = validPath; //cache the result

      if (!validPath) {
        // if no valid path then stop traversing
        return false;
      }

      // backtracking to prev candidate to try finding another solution (backtracking concept)
      visited.delete(node);
    }

    // if we traversed all candidates that means all of them are valid
    memo[currNode] = true;
    return true;
  };

  return backtrack(source, new Set([source]));
}
