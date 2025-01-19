// https://leetcode.com/problems/trapping-rain-water-ii/description/
// Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

// Example1:
// Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
// Output: 4
// Explanation: After the rain, water is trapped between the blocks.
// We have two small ponds 1 and 3 units trapped.
// The total volume of water trapped is 4.

// Example2:
// Input: heightMap = [
//   [3, 3, 3, 3, 3],
//   [3, 2, 2, 2, 3],
//   [3, 2, 1, 2, 3],
//   [3, 2, 2, 2, 3],
//   [3, 3, 3, 3, 3],
// ];
// Output: 10;

// https://leetcode.com/problems/trapping-rain-water-ii/solutions/843410/js-minheap-bfs/
/**
create minheap consisting of all borders

while heap not empty
  take min
  search each direction
  if not visited
    if depth lower than waterline
      add diff to total
    add to visited
    add to heap
return total
 */
function trapRainWater(heightMap: number[][]): number {
  const dirs = (i: number, j: number) => [
    [i + 1, j],
    [i - 1, j],
    [i, j + 1],
    [i, j - 1],
  ];
  const createMinHeap = () => {
    const heap: (number[] | null)[] = [null];
    const leftChild = (x: number) => x * 2;
    const rightChild = (x: number) => x * 2 + 1;
    const parent = (x: number) => Math.floor(x / 2);

    return {
      heap,
      size: () => heap.length - 1,
      takeMin: () => {
        if (heap.length === 2) return heap.pop();
        const min = heap[1];
        const last = heap.length - 1;
        let l,
          r,
          c,
          index = 1;

        // swap w/ last in arr && pop
        heap[1] = heap.pop()!;

        // percolate down
        while (index < last) {
          l = leftChild(index);
          r = rightChild(index);
          c = heap[r] && heap[r]![2] < heap[l]![2] ? r : l;

          if (heap[c] && heap[c]![2] < heap[index]![2]) {
            const hold = heap[c];
            heap[c] = heap[index];
            heap[index] = hold;
            index = c;
          } else {
            break;
          }
        }

        while (!heap[heap.length - 1]) heap.pop();
        return min;
      },
      add: (tile: number[]) => {
        // push to end
        let pi,
          index = heap.length;

        // percolate up until parent <= tile
        while (1 < index) {
          pi = parent(index);

          if (heap[pi] && heap[pi]![2] <= tile[2]) break;

          heap[index] = heap[pi];
          index = pi;
        }
        heap[index] = tile;

        while (!heap[heap.length - 1]) heap.pop();
      },
    };
  };

  const heap = createMinHeap();
  const visited = new Set();
  let total = 0;
  let waterline = 0;

  // add borders
  const endj = heightMap[0].length - 1;
  const endi = heightMap.length - 1;
  for (let i = 1; i < endi; i++) {
    visited.add(i);
    visited.add(i + 0.1 / endj);
    heap.add([i, 0, heightMap[i][0]]);
    heap.add([i, endj, heightMap[i][endj]]);
  }
  for (let j = 1; j < endj; j++) {
    visited.add(0.1 / j);
    visited.add(endi + 0.1 / j);
    heap.add([0, j, heightMap[0][j]]);
    heap.add([endi, j, heightMap[endi][j]]);
  }

  // by working at the min border and moving in
  // its known that any depth below waterline will pool
  while (heap.size()) {
    const [i, j, d] = heap.takeMin()!;
    waterline = Math.max(waterline, d);

    dirs(i, j).forEach(([di, dj]) => {
      const key = di + 0.1 / dj;
      if (visited.has(key) || di <= 0 || dj <= 0 || di >= endi || dj >= endj)
        return;
      visited.add(key);
      const newd = heightMap[di][dj];

      if (newd < waterline) {
        total += waterline - newd;
      }

      heap.add([di, dj, newd]);
    });
  }

  return total;
}
