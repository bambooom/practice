//https://leetcode.com/problems/largest-color-value-in-a-directed-graph/
// There is a directed graph of n colored nodes and m edges. The nodes are numbered from 0 to n - 1.
// You are given a string colors where colors[i] is a lowercase English letter representing the color of the ith node in this graph (0-indexed). You are also given a 2D array edges where edges[j] = [aj, bj] indicates that there is a directed edge from node aj to node bj.
// A valid path in the graph is a sequence of nodes x1 -> x2 -> x3 -> ... -> xk such that there is a directed edge from xi to xi+1 for every 1 <= i < k. The color value of the path is the number of nodes that are colored the most frequently occurring color along that path.
// Return the largest color value of any valid path in the given graph, or -1 if the graph contains a cycle.

// Example 1:
// Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
// Output: 3
// Explanation: The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a" (red in the above image).

// Example 2:
// Input: colors = "a", edges = [[0,0]]
// Output: -1
// Explanation: There is a cycle from 0 to 0.

// give up on this

// https://leetcode.com/problems/largest-color-value-in-a-directed-graph/solutions/3398905/typescript-javascript-easy-to-understand-solution/?envType=daily-question&envId=2025-05-26
interface AdjList {
  [node: number]: number[];
}

interface ColorsGraph {
  [color: string]: number;
  longest: number;
}

interface NodeColorsGraph {
  [node: number]: ColorsGraph;
}

function largestPathValue(colors: string, edges: number[][]): number {
  // Step1: Crete adjacency list
  const graph: AdjList = {};
  for (const [node1, node2] of edges) {
    if (!graph[node1]) {
      graph[node1] = [];
    }
    if (!graph[node2]) {
      graph[node2] = [];
    }
    graph[node1].push(node2);
  }

  // Step2: Verify the graph is a valid directed acyclic graph (DAG)

  function isValidGraph(
    graph: AdjList,
    node: number,
    traversed: { [node: number]: boolean },
    nodeValidMemo: { [node: number]: boolean },
  ) {
    if (traversed[node]) {
      return false;
    }
    if (nodeValidMemo[node]) {
      return true;
    }
    traversed[node] = true;

    const neighbors = graph[node];
    let isValid = true;

    for (const neighbor of neighbors) {
      const _isValid = isValidGraph(graph, neighbor, traversed, nodeValidMemo);
      if (!_isValid) {
        isValid = false;
        break;
      }
    }

    traversed[node] = false;
    nodeValidMemo[node] = true;
    return isValid;
  }

  const nodes = Object.keys(graph);
  const nodeValidMemo = {};
  for (const node of nodes) {
    const isValid = isValidGraph(graph, Number(node), {}, nodeValidMemo);
    if (!isValid) {
      return -1;
    }
  }

  // Step3: Find the longest colors in the DAG at each node
  function combineColorGraphs(
    node1ColorGraph: ColorsGraph,
    node2ColorGraph: ColorsGraph,
  ): void {
    for (const color of Object.keys(node2ColorGraph)) {
      if (node1ColorGraph[color] == null) {
        node1ColorGraph[color] = 0;
      }
      if (node2ColorGraph[color] > node1ColorGraph[color]) {
        node1ColorGraph[color] = node2ColorGraph[color];
      }
    }
  }

  function findLongestColors(
    colors: string,
    graph: AdjList,
    node: number,
    nodeColorsGraph: NodeColorsGraph,
    trueLongest: { longest: number },
  ): ColorsGraph {
    if (nodeColorsGraph[node] != null) {
      // This node's been traversed before, return memoized info
      return nodeColorsGraph[node];
    }

    const currentNodeColorGraph: ColorsGraph = { longest: 0 };
    nodeColorsGraph[node] = currentNodeColorGraph;

    // Recursively get the ColorsGraph of each child
    for (const neighbor of graph[node]) {
      const neighborColorsGraph = findLongestColors(
        colors,
        graph,
        neighbor,
        nodeColorsGraph,
        trueLongest,
      );

      // Compare all children's with each other
      combineColorGraphs(currentNodeColorGraph, neighborColorsGraph);
    }

    // Add this node's color to `currentNodeColorGraph`
    const color = colors[node];
    if (!currentNodeColorGraph[color]) {
      currentNodeColorGraph[color] = 0;
    }
    currentNodeColorGraph[color]++;

    // Memoize the longest
    for (const _color of Object.keys(currentNodeColorGraph)) {
      if (_color === 'longest') {
        continue;
      }
      if (currentNodeColorGraph[_color] > currentNodeColorGraph.longest) {
        currentNodeColorGraph.longest = currentNodeColorGraph[_color];
        if (trueLongest.longest < currentNodeColorGraph.longest) {
          trueLongest.longest = currentNodeColorGraph.longest;
        }
      }
    }

    return currentNodeColorGraph;
  }

  const nodeColorsGraph = {};
  // `trueLongest` is not strictly necessary, but helps prevent us to loop one more time to make comparisons of all colors in all nodes
  const trueLongest = { longest: 1 };
  for (const node of nodes) {
    findLongestColors(
      colors,
      graph,
      Number(node),
      nodeColorsGraph,
      trueLongest,
    );
  }

  return trueLongest.longest;
}

// https://leetcode.com/problems/largest-color-value-in-a-directed-graph/solutions/6781376/100-time-and-space-explanation-154-188ms-beats-100-o-n-m-space-o-n-m/?envType=daily-question&envId=2025-05-26
// faster solution
// - Detect if the directed graph contains a cycle. We use in-degree counting and perform topological sorting.
//    If we cannot visit all nodes during topological sorting, a cycle exists, so we return -1.
// - Use Dynamic Programming (DP) to compute the maximum count of colors along any valid path
//    During the topological sort, we traverse from nodes with in-degree zero to their successors, using a DP table to record the maximum count of each color seen from the start node to the current node.

function largestPathValue2(colors: string, edges: number[][]): number {
  const numberOfNodes = colors.length;
  const numberOfEdges = edges.length;
  const LETTER_COUNT = 26;

  // 1. Map each node’s color character to an integer 0…25
  const nodeColorIndices = new Uint8Array(numberOfNodes);
  for (let i = 0; i < numberOfNodes; i++) {
    nodeColorIndices[i] = colors.charCodeAt(i) - 97;
  }

  // 2. Compute in-degree and out-degree for each node
  const inDegreeCounts = new Uint32Array(numberOfNodes);
  const outDegreeCounts = new Uint32Array(numberOfNodes);
  for (let i = 0; i < numberOfEdges; i++) {
    const [sourceNode, targetNode] = edges[i];
    inDegreeCounts[targetNode]++;
    outDegreeCounts[sourceNode]++;
  }

  // 3. Build CSR “head” array of length numberOfNodes+1
  const headIndices = new Uint32Array(numberOfNodes + 1);
  for (let i = 0; i < numberOfNodes; i++) {
    headIndices[i + 1] = headIndices[i] + outDegreeCounts[i];
  }

  // 4. Copy headIndices[0..n) so we can mutate it while filling adjacency
  const writePointers = headIndices.slice(0, numberOfNodes);
  const adjacencyList = new Uint32Array(numberOfEdges);
  for (let i = 0; i < numberOfEdges; i++) {
    const [sourceNode, targetNode] = edges[i];
    adjacencyList[writePointers[sourceNode]++] = targetNode;
  }

  // 5. Prepare DP table and topological-order queue
  //    dpColorCounts[nodeIndex * LETTER_COUNT + colorIndex] = max occurrences
  const dpColorCounts = new Uint32Array(numberOfNodes * LETTER_COUNT);
  const topologicalQueue = new Uint32Array(numberOfNodes);
  let queueHeadIndex = 0;
  let queueTailIndex = 0;
  let visitedNodeCount = 0;
  let maximumColorValue = 0;

  // 6. Initialize queue with all zero in-degree nodes
  for (let i = 0; i < numberOfNodes; i++) {
    if (inDegreeCounts[i] === 0) {
      topologicalQueue[queueTailIndex++] = i;
      const dpIndex = i * LETTER_COUNT + nodeColorIndices[i];
      dpColorCounts[dpIndex] = 1;
      maximumColorValue = 1;
    }
  }

  // Hoist locals for performance
  const colorDPArray = dpColorCounts;
  const headIndexArray = headIndices;
  const adjacencyArray = adjacencyList;
  const inDegreeArray = inDegreeCounts;
  const nodeColorArray = nodeColorIndices;
  const processQueue = topologicalQueue;

  // 7. Topological-BFS with DP propagation
  while (queueHeadIndex < queueTailIndex) {
    const currentNode = processQueue[queueHeadIndex++];
    visitedNodeCount++;
    const baseIndexU = currentNode * LETTER_COUNT;

    const startEdge = headIndexArray[currentNode];
    const endEdge = headIndexArray[currentNode + 1];
    for (let edgePointer = startEdge; edgePointer < endEdge; edgePointer++) {
      const neighborNode = adjacencyArray[edgePointer];
      const baseIndexV = neighborNode * LETTER_COUNT;
      const neighborColorIdx = nodeColorArray[neighborNode];

      // 7.1 Update DP for the neighbor's own color
      const incrementedCount = colorDPArray[baseIndexU + neighborColorIdx] + 1;
      if (incrementedCount > colorDPArray[baseIndexV + neighborColorIdx]) {
        colorDPArray[baseIndexV + neighborColorIdx] = incrementedCount;
        if (incrementedCount > maximumColorValue) {
          maximumColorValue = incrementedCount;
        }
      }

      // 7.2 Propagate all other colors
      for (let i = 0; i < neighborColorIdx; i++) {
        const propagatedValue = colorDPArray[baseIndexU + i];
        if (propagatedValue > colorDPArray[baseIndexV + i]) {
          colorDPArray[baseIndexV + i] = propagatedValue;
          if (propagatedValue > maximumColorValue) {
            maximumColorValue = propagatedValue;
          }
        }
      }
      for (let i = neighborColorIdx + 1; i < LETTER_COUNT; i++) {
        const propagatedValue = colorDPArray[baseIndexU + i];
        if (propagatedValue > colorDPArray[baseIndexV + i]) {
          colorDPArray[baseIndexV + i] = propagatedValue;
          if (propagatedValue > maximumColorValue) {
            maximumColorValue = propagatedValue;
          }
        }
      }

      // 7.3 Enqueue neighbor if all its incoming edges are processed
      if (--inDegreeArray[neighborNode] === 0) {
        processQueue[queueTailIndex++] = neighborNode;
      }
    }
  }

  // 8. Detect cycle: if not all nodes were visited, return -1
  return visitedNodeCount === numberOfNodes ? maximumColorValue : -1;
}
