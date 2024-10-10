// https://leetcode.com/problems/top-k-frequent-elements
// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
// #hash-table

function topKFrequentElems(nums: number[], k: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], map.get(nums[i]) ? (map.get(nums[i]) as number) + 1 : 1);
  }

  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);

  const res: number[] = [];
  for (let i = 0; i < k; i++) {
    res.push(sorted[i][0]);
  }

  return res;
}

// https://leetcode.com/problems/top-k-frequent-elements/solutions/3551664/typescript-frequency-count-and-then-sort-runtime-97-memory-70/?envType=study-plan-v2&envId=top-100-liked
// a little faster maybe
function topKFrequentElems2(nums: number[], k: number): number[] {
  const freq: { [key: number]: number } = {};
  for (const n of nums) {
    if (freq[n] === undefined) freq[n] = 0;
    freq[n] += 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((v) => Number(v[0]));
}
