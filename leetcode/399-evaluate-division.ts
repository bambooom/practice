// https://leetcode.com/problems/evaluate-division/
// Graph and Union-Find

// https://leetcode.com/problems/evaluate-division/solutions/3546365/dfs-graph-js-sol-explained-with-approach/?envType=study-plan-v2&envId=leetcode-75
//
// - This below solution code uses a graph representation to store
//   the variable pairs and their corresponding values.
// - It then uses a Depth-First Search (DFS) algorithm to evaluate
//   each query by traversing the graph and calculating the result.
// - The evaluateQuery function takes care of the DFS traversal

function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][],
): number[] {
  // Step 1: Build the graph
  const graph: Record<string, Record<string, number>> = {};

  for (let i = 0; i < equations.length; i++) {
    const [numerator, denominator] = equations[i];

    const value = values[i];

    if (!graph[numerator]) {
      graph[numerator] = {};
    }

    if (!graph[denominator]) {
      graph[denominator] = {};
    }

    graph[numerator][denominator] = value;
    graph[denominator][numerator] = 1 / value;
  }

  // Step 2: Evaluate queries using DFS
  const evaluateQuery = (
    numerator: string,
    denominator: string,
    visited: Set<string>,
  ): number => {
    if (!(numerator in graph) || !(denominator in graph)) {
      return -1.0;
    }

    if (numerator === denominator) {
      return 1.0;
    }

    visited.add(numerator);
    const neighbors = graph[numerator];

    for (const neighbor in neighbors) {
      if (!visited.has(neighbor)) {
        const result = evaluateQuery(neighbor, denominator, visited);

        if (result !== -1.0) {
          return neighbors[neighbor] * result;
        }
      }
    }

    return -1.0;
  };

  // Step 3: Process queries
  const results = [];

  for (const query of queries) {
    const [numerator, denominator] = query;
    const visited = new Set<string>();
    const result = evaluateQuery(numerator, denominator, visited);

    results.push(result);
  }

  return results;
}

// floyd warshall algo
// https://leetcode.com/problems/evaluate-division/solutions/854032/clean-js-graph-solution/?envType=study-plan-v2&envId=leetcode-75
// but it cannot pass all test cases
function calcEquation2(
  equations: string[][],
  values: number[],
  queries: string[][],
): number[] {
  const graph = new Map<string, Map<string, number>>();

  // get direct edges
  equations.forEach(([t, b], i) => {
    if (!graph.get(t)) graph.set(t, new Map());
    if (!graph.get(b)) graph.set(b, new Map());

    graph.get(b)!.set(b, 1);
    graph.get(t)!.set(t, 1);
    graph.get(t)!.set(b, values[i]);
    graph.get(b)!.set(t, 1 / values[i]);
  });

  // build indirect edges via floyd warshall
  graph.forEach((_, k) => {
    graph.get(k)!.forEach((_, i) => {
      graph.get(k)!.forEach((_, j) => {
        graph.get(i)!.set(j, graph.get(i)!.get(k)! * graph.get(k)!.get(j)!);
      });
    });
  });

  return queries.map(([num, denom]) =>
    graph.get(num) ? graph.get(num)!.get(denom) || -1 : -1,
  );
}
