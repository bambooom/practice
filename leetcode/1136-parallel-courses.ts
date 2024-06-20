// https://leetcode.com/problems/parallel-courses
//You are given an integer n, which indicates that there are n courses labeled from 1 to n.
//You are also given an array relations where relations[i] = [prevCoursei, nextCoursei],
// representing a prerequisite relationship between course prevCoursei and course nextCoursei:
// course prevCoursei has to be taken before course nextCoursei.
// In one semester, you can take any number of courses as long as you have taken all the prerequisites in the previous semester for the courses you are taking.
// Return the minimum number of semesters needed to take all courses. If there is no way to take all the courses, return -1.

// https://leetcode.com/problems/parallel-courses/solutions/4052866/typescript-kahn-s-algorithm-o-n-e-with-comments/?envType=study-plan-v2&envId=premium-algo-100
// BFS
function minimumSemesters(n: number, relations: number[][]): number {
  if (n < 2) {
    // 0 or 1, total courses, so 0 or 1 semester
    return Math.max(0, n);
  }

  if (relations.length < 2) {
    // relations are 0 or 1, means 0 or 1 prerequisite
    // if relations length 0, means no prerequisite, so 1 semester take all courses
    // if relations length 1, means only 1 prerequisite, so need one more semester
    return relations.length + 1;
  }

  // Init prerequisite counts (in degree)
  // Since BFS below starts with all courses,
  // include imaginary edge to each course
  const numReqs: number[] = new Array(n + 1).fill(1);

  // Init list of directed edges
  const edges: number[][] = [];
  for (let i = 0; i <= n; i = edges.push([])) {
    /* empty */
  }

  // Count prerequisites and store edges
  for (let i = 0, N = relations.length; i < N; ++i) {
    const [pre, course] = relations[i];
    ++numReqs[course];
    edges[pre].push(course);
  }

  // Init queue with all courses
  const q: number[] = [];
  for (let i = 0; i < n; q.push(++i)) {
    /* empty */
  }

  let semesters = 0;

  while (q.length > 0) {
    const N = q.length;
    for (let i = 0; i < N; ++i) {
      // get course from queue
      const course = q[i];

      // skip course if prerequisite still needed
      if (--numReqs[course] > 0) {
        continue;
      }

      // count coutse as taken
      --n;

      // add dependent courses to queue
      q.push(...edges[course]);
    }

    q.splice(0, N);

    ++semesters;
  }

  // if any courses missing, return -1, otherwise return number of semesters
  return n === 0 ? semesters : -1;
}

// https://leetcode.com/problems/parallel-courses/solutions/1133197/javascript-w-explanation-good-var-names-commented-code-enjoy/?envType=study-plan-v2&envId=premium-algo-100
function minimumSemesters2(n: number, relations: number[][]): number {
  // graph: a prerequisite class and an array of the classes that depend on it
  const graph: number[][] = new Array(n);
  // count how many prereqs classes exist
  const preReqs: number[] = new Array(n).fill(0);

  // First create graph, and record how many dependencies each class has, btw, converting everything to index 0
  for (let [dep, course] of relations) {
    dep--;
    if (!graph[dep]) graph[dep] = [];
    graph[dep].push(--course);
    preReqs[course]++;
  }

  // next find start points for classes w/o dependency
  const queue: number[] = [];
  let sems = 0;
  let visited = 0;
  for (let i = 0; i < n; i++) {
    if (preReqs[i] === 0) {
      visited++;
      queue.push(i);
    }
  }

  // now for our semester processing loop
  while (queue.length) {
    //process classes with no remaining prereqs
    let curLength = queue.length;
    while (curLength--) {
      const curr = queue.shift()!;
      for (const course of graph[curr] || []) {
        //find all other classes that had the current one as a prerequisite
        preReqs[course]--;
        if (preReqs[course] === 0) {
          //found a class we can take next semester, add to next queue
          queue.push(course);
          visited++;
        }
      }
    }
    sems++;
  }
  // if we have visited all classes, we return the number of semesters taken, if not, return -1 (could not reach all classes)
  return visited == n ? sems : -1;
}
