// https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/

// https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/?envType=study-plan-v2&envId=leetcode-75
// Approach 1: queue
function minReorder(n: number, connections: number[][]): number {
  const from = new Map<number, number[]>();
  const to = new Map<number, number[]>();

  // insert values into map
  const insert = (map: Map<number, number[]>, key: number, value: number) => {
    if (map.has(key)) {
      const arr: number[] = map.get(key)!;
      arr.push(value);
      map.set(key, arr);
    } else {
      map.set(key, [value]);
    }
  };

  // build the map
  for (const [a, b] of connections) {
    insert(from, a, b);
    insert(to, b, a);
  }

  // queue: cities to visit
  const queue = [0];
  const visited = new Set<number>();
  let count = 0;

  while (queue.length) {
    const cur = queue.shift()!; // first element in queue

    if (from.has(cur)) {
      for (const x of from.get(cur)!) {
        // if visited, do nothing, else push to queue
        if (visited.has(x)) {
          continue;
        } else {
          queue.push(x);
          count++; // change direction of this path
        }
      }
    }

    if (to.has(cur)) {
      for (const x of to.get(cur)!) {
        if (visited.has(x)) {
          continue;
        } else {
          queue.push(x);
        }
      }
    }

    visited.add(cur); // mark as visited
  }

  return count;
}

// https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/solutions/890379/javascript-solution-dfs-approach/?envType=study-plan-v2&envId=leetcode-75
// Approach 2: DFS
function minReorder2(n: number, connections: number[][]): number {
  const graph: number[][] = [];
  const set = new Set<string>();

  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  for (const [u, v] of connections) {
    graph[u].push(v);
    graph[v].push(u);
    set.add(`${u}#${v}`); // from#to
  }

  let count = 0;

  dfs(0, -1);

  return count;

  function dfs(node: number, parent: number) {
    if (set.has(`${parent}#${node}`)) count++;

    for (const nei of graph[node]) {
      if (nei === parent) continue;

      dfs(nei, node);
    }
  }
}
