// https://leetcode.com/problems/maximal-score-after-applying-k-operations
// You are given a 0-indexed integer array nums and an integer k. You have a starting score of 0.
// In one operation:
// - choose an index i such that 0 <= i < nums.length,
// - increase your score by nums[i], and
// - replace nums[i] with ceil(nums[i] / 3).
// Return the maximum possible score you can attain after applying exactly k operations.
// The ceiling function ceil(val) is the least integer greater than or equal to val.

// Example 1:
// Input: nums = [10,10,10,10,10], k = 5
// Output: 50
// Explanation: Apply the operation to each array element exactly once.The final score is 10 + 10 + 10 + 10 + 10 = 50.

// Example 2:
// Input: nums = [1,10,3,3,3], k = 3
// Output: 17
// Explanation: You can do the following operations:
// Operation 1: Select i = 1, so nums becomes [1,4,3,3,3]. Your score increases by 10.
// Operation 2: Select i = 1, so nums becomes [1,2,3,3,3]. Your score increases by 4.
// Operation 3: Select i = 2, so nums becomes [1,1,1,3,3]. Your score increases by 3.
// The final score is 10 + 4 + 3 = 17.

// https://leetcode.com/problems/maximal-score-after-applying-k-operations/solutions/5909389/o-n-log-n-time-o-1-space-simple-heap/
// heap
function maxKelements(nums: number[], k: number): number {
  const heapFix = (heap: number[]) => {
    let i = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;

      let target = i;

      if (l < heap.length && heap[l] > heap[target]) {
        target = l;
      }
      if (r < heap.length && heap[r] > heap[target]) {
        target = r;
      }

      if (target === i) {
        break;
      }

      const tmp = heap[i];
      heap[i] = heap[target];
      heap[target] = tmp;
      i = target;
    }
  };

  let score = 0;
  nums.sort((a, b) => b - a);
  for (; k > 0; k--) {
    score += nums[0];
    nums[0] = Math.ceil(nums[0] / 3);
    heapFix(nums); // bubble it down after replacement
  }
  return score;
}

// https://leetcode.com/problems/maximal-score-after-applying-k-operations/solutions/5909284/easy-with-10lines-of-code/
// using builtin MaxPriorityQueue
function maxKelements2(nums: number[], k: number): number {
  const pq = new MaxPriorityQueue({ compare: (a, b) => b - a });
  for (const num of nums) {
    pq.enqueue(num);
  }
  let score = 0;
  while (k) {
    const ele = pq.dequeue();
    score += ele;
    pq.enqueue(Math.ceil(ele / 3));
    k--;
  }
  return score;
}
