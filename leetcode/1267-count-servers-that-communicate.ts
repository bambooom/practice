// https://leetcode.com/problems/count-servers-that-communicate
// You are given a map of a server center, represented as a m * n integer matrix grid, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.
// Return the number of servers that communicate with any other server.

// Example 1:
// Input: grid = [[1,0],[0,1]]
// Output: 0
// Explanation: No servers can communicate with others.

// Example 2:
// Input: grid = [[1,0],[1,1]]
// Output: 3
// Explanation: All three servers can communicate with at least one other server.

// Example 3:
// Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
// Output: 4
// Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can't communicate with any other server.

function countServers(grid: number[][]): number {
  const hasCommunication = (x: number, y: number): 1 | 0 => {
    // check Y axis
    for (let i = 0; i < grid.length; i++) {
      if (grid[i][y] === 1 && i !== x) {
        return 1;
      }
    }
    // check X axis
    for (let i = 0; i < grid[0].length; i++) {
      if (grid[x][i] === 1 && i !== y) {
        return 1;
      }
    }
    return 0;
  };

  let ans = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        ans += hasCommunication(i, j);
      }
    }
  }
  return ans;
}
