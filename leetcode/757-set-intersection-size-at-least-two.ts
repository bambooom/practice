// https://leetcode.com/problems/set-intersection-size-at-least-two/
// You are given a 2D integer array intervals where intervals[i] = [starti, endi] represents all the integers from starti to endi inclusively.
// A containing set is an array nums where each interval from intervals has at least two integers in nums.
// For example, if intervals = [[1,3], [3,7], [8,9]], then [1,2,4,7,8,9] and [2,3,4,8,9] are containing sets.
// Return the minimum possible size of a containing set.

// Example 1:
// Input: intervals = [[1,3],[3,7],[8,9]]
// Output: 5
// Explanation: let nums = [2, 3, 4, 8, 9].
// It can be shown that there cannot be any containing array of size 4.

// Example 2:
// Input: intervals = [[1,3],[1,4],[2,5],[3,5]]
// Output: 3
// Explanation: let nums = [2, 3, 4].
// It can be shown that there cannot be any containing array of size 2.

// Example 3:
// Input: intervals = [[1,2],[2,3],[2,4],[4,5]]
// Output: 5
// Explanation: let nums = [1, 2, 3, 4, 5].
// It can be shown that there cannot be any containing array of size 4.

// Constraints:
// 1 <= intervals.length <= 3000
// intervals[i].length == 2
// 0 <= starti < endi <= 10^8

function intersectionSizeTwo(intervals: number[][]): number {
  // Sort the intervals by their end points in ascending order
  intervals.sort((a, b) => a[1] - b[1]);

  // Initialize an array to hold the elements of the containing set
  const containingSet: number[] = [];

  // Helper function to check if an interval intersects with any intervals in the containing set
  const checkIntersection = (interval: number[]) => {
    let intersectionCount = 0;

    // Iterate over the intervals in the containing set in reverse order
    for (let i = containingSet.length - 1; i >= 0; i--) {
      // If the current interval intersects with the interval in the containing set
      if (containingSet[i] >= interval[0] && containingSet[i] <= interval[1]) {
        intersectionCount++;
      }
      // If the current interval does not intersect with the interval in the containing set
      if (containingSet[i] < interval[0]) {
        return intersectionCount;
      }
    }
    return intersectionCount;
  };

  for (let currentInterval of intervals) {
    // Check if the current interval intersects with any intervals in the containing set
    const intersectionCount = checkIntersection(currentInterval);

    // If the current interval does not intersect with any intervals in the containing set
    if (intersectionCount === 0) {
      // Add the end point of the current interval to the containing set
      containingSet.push(currentInterval[1] - 1);
      containingSet.push(currentInterval[1]);
    }
    // If the current interval intersects with exactly one interval in the containing set
    else if (intersectionCount === 1) {
      // If the last element in the containing set is the same as the end point of the current interval
      if (containingSet[containingSet.length - 1] === currentInterval[1]) {
        // Add the end point minus one to the containing set
        containingSet.push(currentInterval[1] - 1);
      } else {
        // Add the end point to the containing set
        containingSet.push(currentInterval[1]);
      }

      // Sort the containing set in ascending order
      containingSet.sort((a, b) => a - b);
    }
  }

  return containingSet.length;
}

// https://leetcode.com/problems/set-intersection-size-at-least-two/solutions/4448028/onlogn-with-explanation-using-sort-by-ah-3jyo/?envType=daily-question&envId=2025-11-20
function intersectionSizeTwo2(intervals: number[][]): number {
  // sort intervals by end time, if end times are the same, sort by start
  intervals = intervals.sort(([s1, e1], [s2, e2]) =>
    e1 == e2 ? s1 - s2 : e1 - e2,
  );

  // make an array of the numbers we add, this array must be sorted ascendingly
  // for the first interval we will add the last element, and the one previous to last
  let arr = [intervals[0][1] - 1, intervals[0][1]];

  for (let i = 1; i < intervals.length; i++) {
    let [s, e] = intervals[i];
    // if the start of the new interval is bigger than last, then there is no overlap between
    // this interval and anything before it. we add 2 points to the array (again, sorted)
    if (s > arr.at(-1)!) {
      // add 2 points at the end
      arr.push(e - 1);
      arr.push(e);
    } else if (s === arr.at(-1)) {
      // if the start is the same as the last element entered, then the
      // start of this interval is already taken in a previous run. we just add another number
      // from this interval. we will take the last as it will probably be the start of another
      // or it may be included in another one
      arr.push(e);
    } else if (s > arr.at(-2)!) {
      // we arrive here in case the start is not the same as the end we took. it must be smaller than it.
      // but maybe in the last interval we took only 1 element..
      // maybe we will need to take another to fulfil the 2 elements per interval.
      // thats when the start of the new interval is greater than the second to last element we took.
      // thats when we have to take the last element from this interval

      arr.push(e);
    } else continue;
  }
  return arr.length;
}
