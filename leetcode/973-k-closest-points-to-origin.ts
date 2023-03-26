// https://leetcode.com/problems/k-closest-points-to-origin/
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k,
// return the k closest points to the origin(0, 0).
// #quick-select  #divide-conquer

function kClosest(points: number[][], k: number): number[][] {
  const swap = (i: number, j: number) => {
    [points[i], points[j]] = [points[j], points[i]];
  };
  const distance = (point: number[]): number => point[0] ** 2 + point[1] ** 2;

  const partition = (lo: number, hi: number): number => {
    // pick last one as pivot
    const pivotDist = distance(points[hi]);
    let targetPivot = lo;
    let searchIdx = lo;
    // compare from lo to hi
    while (searchIdx < hi) {
      const dist = distance(points[searchIdx]);
      if (dist <= pivotDist) {
        swap(searchIdx, targetPivot);
        targetPivot += 1;
      }
      searchIdx += 1;
    }
    // hi goes to target pivot
    swap(hi, targetPivot);
    return targetPivot;
  };

  const quickSelect = (lo: number, hi: number, target: number): void => {
    const pivot = partition(lo, hi);
    if (pivot === target - 1) return;
    if (pivot < target - 1) {
      quickSelect(pivot + 1, hi, target);
    } else {
      quickSelect(lo, pivot - 1, target);
    }
  };

  quickSelect(0, points.length - 1, k);
  return points.slice(0, k);
}
