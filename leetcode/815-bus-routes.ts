// https://leetcode.com/problems/bus-routes/
// #hash-table #breadth-first-search

// Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
// Output: 2
// Explanation: The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.

// https://leetcode.com/problems/bus-routes/solutions/2329031/fully-commented-javascript-version-of-the-most-popular-solution/
// WARNING: NOT CORRECT!!! thinking....
function numBusesToDestination(
  routes: number[][],
  source: number,
  target: number,
): number {
  // This map will hold an adjacency map of all the routes each stop can go to
  const stopRoutes: Map<number, number[]> = new Map();

  // Initialize adjacency map - for each route
  for (let route = 0; route < routes.length; route++) {
    // Look at all of the route's stops
    for (const stop of routes[route]) {
      // If we haven't added this stop yet then create a new entry for it
      if (!stopRoutes.has(stop)) {
        stopRoutes.set(stop, []);
      }
      // Add the current route as a possible route this stop can go to
      (stopRoutes.get(stop) as number[]).push(route);
    }
  }

  // This queue will contain all of the visited stops
  // AND the number of buses it took to get to that stop
  // We start at the source and 0 buses to get there
  const stopsToVisit: number[][] = [[source, 0]];

  // This set will contain all of the stops we've already visited
  const visitedStops: Set<number> = new Set();
  visitedStops.add(source);

  // This set will contain all of the routes we've visited
  const visitedRoutes = new Array(routes.length);

  // While there are more stops to visit
  while (stopsToVisit.length) {
    // Get the queued stop and number of buses it took to get there
    // const stop = stopsToVisit.front()[0],
    //   bus = stopsToVisit.front()[1];
    // stopsToVisit.dequeue();
    const [stop, bus] = stopsToVisit.pop() as number[];

    // If the stop is our target then we return the number of buses it took to get here
    if (stop === target) {
      return bus;
    }

    // Loop over all the routes this stop can go to
    for (const route of stopRoutes.get(stop) as number[]) {
      // If we've already visited this route then don't do it again
      if (visitedRoutes[route]) continue;

      // Loop over all of the stops in this route
      for (const stop of routes[route]) {
        // If we haven't visited this stop before
        if (!visitedStops.has(stop)) {
          // Add it to the stops we've visited
          visitedStops.add(stop);
          // Add it to the queue of stops we need to visit adding 1 more bus stop to get to it
          stopsToVisit.push([stop, bus + 1]);
        }
      }

      // Set the current route as visited
      visitedRoutes[route] = true;
    }
  }

  // If we never got to our target then return -1
  return -1;
}

// https://leetcode.com/problems/bus-routes/solutions/2135985/javascript-iterative-bfs-64-time-19-space/
function numBusesToDestination2(
  routes: number[][],
  source: number,
  target: number,
): number {
  if (source === target) return 0;

  const graph: Record<number, number[]> = {};
  for (let i = 0; i < routes.length; i++) {
    for (let j = 0; j < routes[i].length; j++) {
      const bus = i;
      const stop = routes[i][j];
      if (!graph[stop]) graph[stop] = [];
      graph[stop].push(bus);
    }
  }

  let q = [source];
  let buses = 1;
  const visitedBus: Set<number> = new Set();
  while (q.length) {
    const accessibleStopsQ = [];
    while (q.length) {
      const currentStop = q.pop() as number;
      // Check all unvisited, accessible buses from current stop
      for (const nextBus of graph[currentStop]) {
        if (visitedBus.has(nextBus)) continue;
        visitedBus.add(nextBus);
        // Check for accessible stops from each accessible bus
        for (const nextStop of routes[nextBus]) {
          if (nextStop === target) return buses;
          accessibleStopsQ.push(nextStop);
        }
      }
    }
    buses++;
    q = accessibleStopsQ;
  }
  return -1;
}

const routes = [
  [0, 1, 6, 16, 22, 23],
  [14, 15, 24, 32],
  [4, 10, 12, 20, 24, 28, 33],
  [1, 10, 11, 19, 27, 33],
  [11, 23, 25, 28],
  [15, 20, 21, 23, 29],
  [29],
];

const source = 4;
const target = 21;

console.log(numBusesToDestination(routes, source, target)); // expected 2, but got 4
