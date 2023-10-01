// https://leetcode.com/problems/number-of-provinces/
// #depth-first search

// There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.
// A province is a group of directly or indirectly connected cities and no other cities outside of the group.

// You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
// Return the total number of provinces.

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
