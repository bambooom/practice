// https://www.hello-algo.com/chapter_searching/replace_linear_by_hashing/

/* 方法二：辅助哈希表 */
function twoSumHashTable(nums: number[], target: number): number[] {
  // 辅助哈希表，空间复杂度 O(n)
  const m: Map<number, number> = new Map();
  // 单层循环，时间复杂度 O(n)
  for (let i = 0; i < nums.length; i++) {
    const index = m.get(target - nums[i]);
    if (index !== undefined) {
      return [index, i];
    } else {
      m.set(nums[i], i);
    }
  }
  return [];
}
