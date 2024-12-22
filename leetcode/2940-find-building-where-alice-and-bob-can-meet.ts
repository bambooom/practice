// https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet/

// You are given a 0-indexed array heights of positive integers, where heights[i] represents the height of the ith building.
// If a person is in building i, they can move to any other building j if and only if i < j and heights[i] < heights[j].
// You are also given another array queries where queries[i] = [ai, bi]. On the ith query, Alice is in building ai while Bob is in building bi.
// Return an array ans where ans[i] is the index of the leftmost building where Alice and Bob can meet on the ith query. If Alice and Bob cannot move to a common building on query i, set ans[i] to -1.

// Example 1:
// Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
// Output: [2,5,-1,5,2]
// Explanation: In the first query, Alice and Bob can move to building 2 since heights[0] < heights[2] and heights[1] < heights[2].
// In the second query, Alice and Bob can move to building 5 since heights[0] < heights[5] and heights[3] < heights[5].
// In the third query, Alice cannot meet Bob since Alice cannot move to any other building.
// In the fourth query, Alice and Bob can move to building 5 since heights[3] < heights[5] and heights[4] < heights[5].
// In the fifth query, Alice and Bob are already in the same building.
// For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
// For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.

// Example 2:
// Input: heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
// Output: [7,6,-1,4,6]
// Explanation: In the first query, Alice can directly move to Bob's building since heights[0] < heights[7].
// In the second query, Alice and Bob can move to building 6 since heights[3] < heights[6] and heights[5] < heights[6].
// In the third query, Alice cannot meet Bob since Bob cannot move to any other building.
// In the fourth query, Alice and Bob can move to building 4 since heights[3] < heights[4] and heights[0] < heights[4].
// In the fifth query, Alice can directly move to Bob's building since heights[1] < heights[6].
// For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
// For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.

import { MinPriorityQueue } from '@datastructures-js/priority-queue';

interface Query {
  element: any;
  height: number;
  queryIndex: number;
}

//  https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet/solutions/4306717/group-by-index-and-minpriorityqueue-by-height/
function leftmostBuildingQueries(
  heights: number[],
  queries: number[][],
): number[] {
  const ans = new Array(queries.length).fill(-1);

  const remain: Query[][] = new Array(heights.length).fill(1).map((x) => []);
  for (let i = 0; i < queries.length; i++) {
    const [q1, q2] = queries[i];

    const left = q1 < q2 ? q1 : q2;
    const right = q1 < q2 ? q2 : q1;

    if (left === right) {
      ans[i] = right;
      continue;
    }

    const heightLeft = heights[left];
    const heightRight = heights[right];

    if (heightLeft < heightRight) {
      ans[i] = right;
      continue;
    }

    // Group remaining queries by index
    remain[right].push({
      height: Math.max(heightLeft, heightRight),
      queryIndex: i,
    } as Query);
  }

  const minPQ = new MinPriorityQueue<Query>((item) => item.height);

  for (let j = 0; j < heights.length; j++) {
    while (!minPQ.isEmpty() && minPQ.front().element.height < heights[j]) {
      ans[minPQ.dequeue().element.queryIndex] = j;
    }

    // Push new queries that meet index conditions
    // So we just need to check the height later
    for (const r of remain[j]) {
      minPQ.enqueue(r);
    }
  }

  return ans;
}

// https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet/solutions/6172493/binary-search-queries-handling/
// Binary Search+ Queries Handling
function leftmostBuildingQueries2(
  heights: number[],
  queries: number[][],
): number[] {
  const n = heights.length;
  // build a sparse table for efficiently find the maximum value in any given range.
  // each range query can then be answered in constant time by looking up the appropriate entry in the sparse table
  const st = Array.from({ length: n }, () => Array(20).fill(0));
  // logarithmic precomputation for fast access, precompute log values for fast access during sparce table queries.
  const Log = Array(n + 1).fill(0);
  Log[0] = -1;

  for (let i = 1; i <= n; i++) {
    Log[i] = Log[i >> 1] + 1;
  }

  for (let i = 0; i < n; i++) {
    st[i][0] = heights[i];
  }

  for (let i = 1; i < 20; i++) {
    for (let j = 0; j + (1 << i) <= n; j++) {
      st[j][i] = Math.max(st[j][i - 1], st[j + (1 << (i - 1))][i - 1]);
    }
  }

  const res: number[] = [];

  // binary search

  for (let i = 0; i < queries.length; i++) {
    let [l, r] = queries[i];
    if (l > r) {
      [l, r] = [r, l];
    }

    if (l === r) {
      res.push(l);
      continue;
    }

    if (heights[r] > heights[l]) {
      res.push(r);
      continue;
    }

    const maxHeight = Math.max(heights[l], heights[r]);
    let left = r + 1;
    let right = n;
    let mid: number;

    while (left < right) {
      mid = Math.floor((left + right) / 2);
      const k = Log[mid - r + 1];
      const maxInRange = Math.max(st[r][k], st[mid - (1 << k) + 1][k]);

      if (maxInRange > maxHeight) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    res.push(left === n ? -1 : left);
  }

  return res;
}
