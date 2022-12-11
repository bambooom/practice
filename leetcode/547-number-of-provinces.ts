// https://leetcode.com/problems/number-of-provinces/
// depth-first search

function findCircleNum(isConnected: number[][]): number {
  const visited: Set<number> = new Set();
  let provinces = 0;

  // iterate thru data
  for (let i = 0; i < isConnected.length; i++) {
    if (!visited.has(i)) {
      dfs(i);
      provinces++;
    }
  }
  return provinces;

  // helper method to do dfs traversal thru isConnected
  function dfs(i: number) {
    for (let j = 0; j < isConnected.length; j++) {
      // check if this is connected, and not visited before
      if (isConnected[i][j] === 1 && !visited.has(j)) {
        // add as visited
        visited.add(j);
        // call dfs
        dfs(j);
      }
    }
  }
}
