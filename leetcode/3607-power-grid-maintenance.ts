// https://leetcode.com/problems/power-grid-maintenance
// You are given an integer c representing c power stations, each with a unique identifier id from 1 to c (1‑based indexing).
// These stations are interconnected via n bidirectional cables, represented by a 2D array connections, where each element connections[i] = [ui, vi] indicates a connection between station ui and station vi. Stations that are directly or indirectly connected form a power grid.
// Initially, all stations are online (operational).
// You are also given a 2D array queries, where each query is one of the following two types:
// [1, x]: A maintenance check is requested for station x. If station x is online, it resolves the check by itself. If station x is offline, the check is resolved by the operational station with the smallest id in the same power grid as x. If no operational station exists in that grid, return -1.
// [2, x]: Station x goes offline (i.e., it becomes non-operational).
// Return an array of integers representing the results of each query of type [1, x] in the order they appear.
// Note: The power grid preserves its structure; an offline (non‑operational) node remains part of its grid and taking it offline does not alter connectivity.

// Example 1:
// Input: c = 5, connections = [[1,2],[2,3],[3,4],[4,5]], queries = [[1,3],[2,1],[1,1],[2,2],[1,2]]
// Output: [3,2,3]
// Explanation:
// Initially, all stations {1, 2, 3, 4, 5} are online and form a single power grid.
// Query [1,3]: Station 3 is online, so the maintenance check is resolved by station 3.
// Query [2,1]: Station 1 goes offline. The remaining online stations are {2, 3, 4, 5}.
// Query [1,1]: Station 1 is offline, so the check is resolved by the operational station with the smallest id among {2, 3, 4, 5}, which is station 2.
// Query [2,2]: Station 2 goes offline. The remaining online stations are {3, 4, 5}.
// Query [1,2]: Station 2 is offline, so the check is resolved by the operational station with the smallest id among {3, 4, 5}, which is station 3.

// Example 2:
// Input: c = 3, connections = [], queries = [[1,1],[2,1],[1,1]]
// Output: [1,-1]
// Explanation:
// There are no connections, so each station is its own isolated grid.
// Query [1,1]: Station 1 is online in its isolated grid, so the maintenance check is resolved by station 1.
// Query [2,1]: Station 1 goes offline.
// Query [1,1]: Station 1 is offline and there are no other stations in its grid, so the result is -1.

// Constraints:
// 1 <= c <= 10^5
// 0 <= n == connections.length <= min(10^5, c * (c - 1) / 2)
// connections[i].length == 2
// 1 <= ui, vi <= c
// ui != vi
// 1 <= queries.length <= 2 * 10^5
// queries[i].length == 2
// queries[i][0] is either 1 or 2.
// 1 <= queries[i][1] <= c

// https://leetcode.com/problems/power-grid-maintenance/solutions/7329561/all-language-solutions0msbeat-100all-in-9bodi/?envType=daily-question&envId=2025-11-06
// perform union-find operations, union-find data structure
// maintain a collection of disjoint sets and perform various operations on them, such as finding the representative element of a set, merging two sets, and checking if two elements belong to the same set.
// DSUP class is used to represent the power grid as a collection of disjoint sets, where each station is a separate set.
// The join method of the DSUP class is used to connect two stations in the power grid by merging their respective sets
class DSUP {
  parent: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }).map((_, i) => i);
  }

  join(u: number, v: number): void {
    this.parent[this.find(v)] = this.find(u);
  }

  find(x: number): number {
    return this.parent[x] === x
      ? x
      : (this.parent[x] = this.find(this.parent[x]));
  }
}

function processQueries(
  c: number,
  connections: number[][],
  queries: number[][],
): number[] {
  const dsu = new DSUP(c + 1);

  // Connect the corresponding stations in the power grid based on the connections.
  connections.forEach(([u, v]) => {
    dsu.join(u, v);
  });

  // Initialize arrays and maps to keep track of the state of the power grid.
  const online = Array.from<boolean>({ length: c + 1 }).fill(true);
  const offlineCounts = Array.from<number>({ length: c + 1 }).fill(0);
  const minOnlineStations = new Map<number, number>();

  // Process the offline queries and update the state of the power grid.
  for (const [op, x] of queries) {
    if (op === 2) {
      online[x] = false;
      offlineCounts[x]++;
    }
  }

  // Find the minimum station id for each root in the power grid.
  for (let i = 1; i <= c; i++) {
    const root = dsu.find(i);

    if (!minOnlineStations.has(root)) {
      minOnlineStations.set(root, -1);
    }

    const station = minOnlineStations.get(root)!;
    if (online[i] && (station === -1 || station > i)) {
      minOnlineStations.set(root, i);
    }
  }

  const ans: number[] = [];

  // Process the queries in reverse order and update the state of the power grid.
  for (const [op, x] of queries.reverse()) {
    const root = dsu.find(x);
    const station = minOnlineStations.get(root)!;

    if (op === 1) {
      if (online[x]) {
        ans.push(x);
      } else {
        ans.push(station);
      }
    }

    if (op === 2) {
      if (offlineCounts[x] > 1) {
        offlineCounts[x]--;
      } else {
        online[x] = true;
        if (station === -1 || station > x) {
          minOnlineStations.set(root, x);
        }
      }
    }
  }

  // Process the queries in reverse order and update the state of the power grid.
  return ans.reverse();
}
// ensure that the state of the power grid is updated correctly after each query. When processing the queries in reverse order, the function can correctly determine the minimum station id for each root in the power grid after each query.

class DisjointSetUnion {
  parent: number[];

  constructor(size: number) {
    this.parent = Array(size + 1);
    for (let id = 1; id <= size; id++) this.parent[id] = id;
  }

  find = (node: number): number =>
    this.parent[node] === node
      ? node
      : (this.parent[node] = this.find(this.parent[node]));

  union = (a: number, b: number): void => {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA !== rootB) this.parent[rootB] = rootA;
  };
}

// https://leetcode.com/problems/power-grid-maintenance/solutions/6930257/typescript-dsu-pointer-sweep-56-lines-oq-k0jc/?envType=daily-question&envId=2025-11-06
// Use DSU to identify connected grids.
// For each grid, precompute and sort its members.
// For each grid, maintain a pointer indicating the smallest currently online station in that grid.
// For each query:
//  - If [1, x]:
//    - If x is online, return x.
//    - Else, return gridMembers[gridRoot][pointer] or -1 if none.
//  - If [2, x]:
//    - Mark x offline.
//    - Advance the pointer in its grid to skip x and any subsequent offline stations.
const processQueries2 = (
  c: number,
  connections: number[][],
  queries: number[][],
): number[] => {
  const dsu = new DisjointSetUnion(c);
  connections.forEach(([u, v]) => dsu.union(u, v));

  const gridMembers: number[][] = Array.from({ length: c + 1 }, () => []);
  for (let station = 1; station <= c; station++) {
    gridMembers[dsu.find(station)].push(station);
  }

  const gridPointers: number[] = Array(c + 1).fill(0);
  const isOnline: boolean[] = Array(c + 1).fill(true);

  const result: number[] = [];

  queries.forEach(([queryType, stationId]) => {
    if (queryType === 2) {
      if (!isOnline[stationId]) return;
      isOnline[stationId] = false;
      const gridRoot = dsu.find(stationId);
      while (
        gridPointers[gridRoot] < gridMembers[gridRoot].length &&
        !isOnline[gridMembers[gridRoot][gridPointers[gridRoot]]]
      ) {
        gridPointers[gridRoot]++;
      }
    } else {
      if (isOnline[stationId]) {
        result.push(stationId);
      } else {
        const gridRoot = dsu.find(stationId);
        const pointer = gridPointers[gridRoot];
        result.push(
          pointer < gridMembers[gridRoot].length
            ? gridMembers[gridRoot][pointer]
            : -1,
        );
      }
    }
  });

  return result;
};
