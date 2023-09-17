// https://www.hello-algo.com/chapter_heap/top_k/

/* 基于堆查找数组中最大的 k 个元素 */
function topKHeap(nums: number[], k: number): number[] {
  // 将堆中所有元素取反，从而用大顶堆来模拟小顶堆
  const invertedNums = nums.map((num) => -num);
  // 将数组的前 k 个元素入堆
  const heap = new MaxHeap(invertedNums.slice(0, k));
  // 从第 k+1 个元素开始，保持堆的长度为 k
  for (let i = k; i < invertedNums.length; i++) {
    // 若当前元素小于堆顶元素，则将堆顶元素出堆、当前元素入堆
    if (invertedNums[i] < heap.peek()) {
      heap.pop();
      heap.push(invertedNums[i]);
    }
  }
  // 取出堆中元素
  const maxHeap = heap.getMaxHeap();
  // 对堆中元素取相反数
  const invertedMaxHeap = maxHeap.map((num) => -num);
  return invertedMaxHeap;
}
