// https://leetcode.com/problems/brick-wall/
// #hash-table, #prefix-sum
// Given the 2D array wall that contains the information about the wall,
// return the minimum number of crossed bricks after drawing such a vertical line.

function leastBricks(wall: number[][]): number {
  const counts: { [key: number]: number } = {};
  // const max = 0;
  for (const row of wall) {
    // const sum = 0;
    row.slice(0, -1).reduce((width, cur) => {
      const point = width + cur;
      counts[point] = ++counts[point] || 1;
      return point;
    }, 0);
  }
  return wall.length - Math.max(...Object.values(counts), 0);
}

// calculate hashmap for most freq prefix sum
function leastBricks2(wall: number[][]): number {
  const hmap = new Map<number, number>();

  //for every row in wall, calculate prefixSum array of each row.
  for (const row of wall) {
    const prefixRow: number[] = [];
    let sum = 0;
    for (let i = 0; i < row.length - 1; i++) {
      sum = sum + row[i];
      prefixRow.push(sum);
    }

    //once prefixSum array is calculated then check what is the element that is most occuring in all of the prefixSum arrays of all rows. use hmap for it.
    for (const n of prefixRow) {
      if (!hmap.has(n)) {
        hmap.set(n, 1);
      } else {
        hmap.set(n, (hmap.get(n) as number) + 1);
      }
    }
  }

  //if hmap has size, means if there are more than one elements in hmap.
  if (hmap.size > 0) {
    //return the number of rows in wall where the number with highest frequency doesn't exist.
    return wall.length - Math.max(...hmap.values());
  } else {
    return wall.length;
  }
}
