// https://leetcode.com/problems/build-a-matrix-with-conditions
// topological sort, ❎ not understanding

// https://leetcode.com/problems/build-a-matrix-with-conditions/solutions/5510063/explanations-no-one-will-give-you-very-detailed-approach-extremely-simple-and-effective/?envType=daily-question&envId=2024-07-21
function buildMatrix(
  k: number,
  rowConditions: number[][],
  colConditions: number[][],
): number[][] {
  // return True if all okay and return False if cycle was found
  function dfs(
    src: number,
    graph: Map<number, number[]>,
    visited: Set<number>,
    curPath: Set<number>,
    res: number[],
  ) {
    if (curPath.has(src)) return false; // cycle detected
    if (visited.has(src)) return true; // all okay, but we've already visited this node

    visited.add(src);
    curPath.add(src);

    for (const neighbor of graph.get(src) || []) {
      if (!dfs(neighbor, graph, visited, curPath, res))
        // if any child returns false
        return false;
    }

    curPath.delete(src); // backtrack path
    res.push(src);
    return true;
  }

  // if there will be cycle - return empty array, in other case return 1d array as described above
  function topoSort(edges: number[][]) {
    const graph = new Map<number, number[]>();
    for (const [src, dst] of edges) {
      if (!graph.has(src)) graph.set(src, []);
      graph.get(src)!.push(dst);
    }

    const visited = new Set<number>();
    const curPath = new Set<number>();
    const res: number[] = [];

    for (let src = 1; src <= k; ++src) {
      if (!dfs(src, graph, visited, curPath, res)) return [];
    }

    return res.reverse(); // we will have res as reversed so we need to reverse it one more time
  }

  const rowSorting = topoSort(rowConditions);
  const colSorting = topoSort(colConditions);
  if (!rowSorting.length || !colSorting.length) return [];

  const valuePosition: Record<number, number[]> = {};
  for (let n = 1; n <= k; ++n) {
    valuePosition[n] = [0, 0]; // element -> [row_index, col_index]
  }
  rowSorting.forEach((val, ind) => (valuePosition[val][0] = ind));
  colSorting.forEach((val, ind) => (valuePosition[val][1] = ind));

  const res = Array.from({ length: k }, () => Array(k).fill(0));
  for (let value = 1; value <= k; ++value) {
    const [row, column] = valuePosition[value];
    res[row][column] = value;
  }

  return res;
}
