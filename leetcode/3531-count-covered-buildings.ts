// https://leetcode.com/problems/count-covered-buildings
// You are given a positive integer n, representing an n x n city. You are also given a 2D grid buildings, where buildings[i] = [x, y] denotes a unique building located at coordinates [x, y].
// A building is covered if there is at least one building in all four directions: left, right, above, and below.
// Return the number of covered buildings.

// Example 1:
// Input: n = 3, buildings = [[1,2],[2,2],[3,2],[2,1],[2,3]]
// Output: 1
// Explanation:
// Only building [2,2] is covered as it has at least one building:
// above ([1,2])
// below ([3,2])
// left ([2,1])
// right ([2,3])
// Thus, the count of covered buildings is 1.

// Example 2:
// Input: n = 3, buildings = [[1,1],[1,2],[2,1],[2,2]]
// Output: 0
// Explanation:
// No building has at least one building in all four directions.

// Example 3:
// Input: n = 5, buildings = [[1,3],[3,2],[3,3],[3,5],[5,3]]
// Output: 1
// Explanation:
// Only building [3,3] is covered as it has at least one building:
// above ([1,3])
// below ([5,3])
// left ([3,2])
// right ([3,5])
// Thus, the count of covered buildings is 1.

// Constraints:
// 2 <= n <= 10^5
// 1 <= buildings.length <= 10^5
// buildings[i] = [x, y]
// 1 <= x, y <= n
// All coordinates of buildings are unique.

// https://leetcode.com/problems/count-covered-buildings/solutions/6691034/typescript-ordered-maps-26-lines-611ms-o-8vxw/?envType=daily-question&envId=2025-12-11
function countCoveredBuildings(n: number, buildings: number[][]): number {
  // Map each row to list of column indices
  const rowMap = new Map<number, number[]>();
  // Map each column to list of row indices
  const colMap = new Map<number, number[]>();

  for (const [x, y] of buildings) {
    if (!rowMap.has(x)) rowMap.set(x, []);
    if (!colMap.has(y)) colMap.set(y, []);
    rowMap.get(x)!.push(y);
    colMap.get(y)!.push(x);
  }

  // sort columns and rows for each row and column respectively
  for (const cols of rowMap.values()) {
    cols.sort((a, b) => a - b);
  }
  for (const rows of colMap.values()) {
    rows.sort((a, b) => a - b);
  }

  let count = 0;

  const binarySeachIndex = (arr: number[], target: number): number => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        return mid;
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1;
  };

  for (const [row, col] of buildings) {
    const colsInRow = rowMap.get(row)!;
    const rowsInCol = colMap.get(col)!;
    const colIdx = binarySeachIndex(colsInRow, col);
    const rowIdx = binarySeachIndex(rowsInCol, row);

    const hasLeft = colIdx > 0;
    const hasRight = colIdx < colsInRow.length - 1;
    const hasUp = rowIdx > 0;
    const hasDown = rowIdx < rowsInCol.length - 1;

    if (hasLeft && hasRight && hasUp && hasDown) {
      count++;
    }
  }

  return count;
}
