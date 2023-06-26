// https://leetcode.com/problems/total-cost-to-hire-k-workers/
// #two-pointers #heap

function totalCost(costs: number[], k: number, candidates: number): number {
  if (candidates >= costs.length) {
    let sum = 0;
    for (let i = 0; i < k; i++) {
      const min = Math.min(...costs);
      sum += min;
    }
    return sum;
  }
  let sum = 0;
  for (let i = 0; i < k; i++) {
    if (candidates >= costs.length) {
      const min = Math.min(...costs);
      const idx = costs.indexOf(min);
      costs.splice(idx, 1);
      sum += min;
    } else {
      const pref = costs.slice(0, candidates);
      const pMin = Math.min(...pref);
      const pIdx = pref.indexOf(pMin);
      const suff = costs.slice(-candidates);
      const sMin = Math.min(...suff);
      const sIdx = suff.indexOf(sMin) + (costs.length - candidates);
      if (pMin < sMin) {
        sum += pMin;
        costs.splice(pIdx, 1);
      } else if (pMin > sMin) {
        sum += sMin;
        costs.splice(sIdx, 1);
      } else {
        sum += pMin;
        costs.splice(Math.min(pIdx, sIdx), 1);
      }
    }
  }

  return sum;
}

// console.log(totalCost([17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4)); // 11
// console.log(totalCost([1, 2, 4, 1], 3, 3)); // 4
// expected 829, but the above get 21, the above solution is wrong
console.log(
  totalCost(
    [
      69, 10, 63, 24, 1, 71, 55, 46, 4, 61, 78, 21, 85, 52, 83, 77, 42, 21, 73,
      2, 80, 99, 98, 89, 55, 94, 63, 50, 43, 62, 14,
    ],
    21,
    31,
  ),
);

// https://leetcode.com/problems/total-cost-to-hire-k-workers/solutions/3683467/beats-100-runtime-memory-javascript-beginner-friendly/
/**
Intuition:
The given problem requires us to hire exactly k workers with the lowest cost based on certain rules. We can approach this problem by dividing the workers into two groups: the candidates from which we will hire the workers with the lowest cost, and the remaining workers. We maintain two separate heaps, one for each group, to efficiently retrieve the workers with the lowest cost.

Explanation:
Initialize the left and right pointers:

The left pointer represents the number of workers to consider from the beginning (candidates) with the lowest cost.
The right pointer represents the number of workers to consider from the end (remaining workers) with the lowest cost.
Adjust the left and right pointers:

If the number of remaining workers (costs.length - candidates) is less than the number of candidates, it means we don't have enough remaining workers. In this case, set both left and right pointers to 0 since we won't have any remaining workers to consider.
Create two heaps:

Create a heap (heapL) containing the first 'left' workers from the costs array. This heap will contain the candidates with the lowest cost.
Create a heap (heapR) containing the last 'right' workers from the costs array. This heap will contain the remaining workers.
Define the siftDown function:

The siftDown function is responsible for maintaining the heap property by moving the element down to its appropriate position in the heap.
It takes a heap array and an index as input.
It compares the current element with its left and right child elements (if present) and swaps them if necessary to maintain the heap property.
This function ensures that the minimum element is always at the top of the heap.
Define the heapify function:

The heapify function is responsible for building the heap from an array.
It starts from the parent of the last element and calls the siftDown function on each parent node, moving up to the root node.
This function transforms the given array into a valid heap structure.
Heapify both heaps:

Call the heapify function on heapL and heapR to transform them into valid heaps.
Iterate k times to hire workers:

In each iteration, compare the top elements of heapL and heapR to find the worker with the lowest cost.
If the top element of heapR is smaller than the top element of heapL, hire the worker from heapR and update the result accordingly.
If there are more remaining workers (right > left), replace the top element of heapR with the worker at index 'right' from the costs array and decrease the 'right' pointer.
If there are no more remaining workers, remove the top element from heapR.
After making any changes, call the siftDown function on heapR to maintain the heap property.
If the top element of heapL is smaller or equal to the top element of heapR, hire the worker from heapL and update the result accordingly.
If there are more candidates, replace the top element of heapL with the worker at index 'left' from the costs array and increase the 'left' pointer.
If there are no more candidates, remove the top element from heapL.
After making any changes, call the siftDown function on heapL to maintain the heap property.
Return the total cost:

After hiring k workers, the result variable will store the total cost of hiring them.
Return the result as the final output.
The solution uses two heaps to efficiently find the workers with the lowest cost while considering the given rules. By maintaining two separate heaps for candidates

and remaining workers, we can easily extract the workers with the lowest cost in each iteration and update the heaps accordingly. This approach ensures an optimal solution to the problem.

*/

function totalCost2(costs: number[], k: number, candidates: number): number {
  let left = candidates;
  let right = costs.length - candidates;
  if (right < left) {
    left = 0;
    right = 0;
  }
  const heapL = costs.slice(0, left);
  const heapR = costs.slice(right);
  const siftDown = (heap: number[], i: number) => {
    const l = 2 * i + 1;
    const r = l + 1;
    if (l >= heap.length) {
      return;
    }
    if (r === heap.length) {
      if (heap[l] < heap[i]) {
        [heap[l], heap[i]] = [heap[i], heap[l]];
      }
      return;
    }
    if (heap[l] > heap[r]) {
      if (heap[r] < heap[i]) {
        [heap[r], heap[i]] = [heap[i], heap[r]];
        siftDown(heap, r);
      }
    } else {
      if (heap[l] < heap[i]) {
        [heap[l], heap[i]] = [heap[i], heap[l]];
        siftDown(heap, l);
      }
    }
  };
  const heapify = (arr: number[]) => {
    for (let i = Math.floor((arr.length - 2) / 2); i >= 0; i -= 1) {
      siftDown(arr, i);
    }
  };
  heapify(heapL);
  heapify(heapR);
  let result = 0;
  for (let i = 0; i < k; i += 1) {
    if ((heapR[0] ?? Infinity) < (heapL[0] ?? Infinity)) {
      result += heapR[0];
      if (right > left) {
        right -= 1;
        heapR[0] = costs[right];
      } else {
        heapR[0] = heapR.at(-1) as number;
        heapR.pop();
      }
      siftDown(heapR, 0);
    } else {
      result += heapL[0];
      if (right > left) {
        heapL[0] = costs[left];
        left += 1;
      } else {
        heapL[0] = heapL.at(-1) as number;
        heapL.pop();
      }
      siftDown(heapL, 0);
    }
  }
  return result;
}
