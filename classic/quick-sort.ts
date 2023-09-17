// https://www.hello-algo.com/chapter_sorting/quick_sort/

/* 元素交换 */
function swap(nums: number[], i: number, j: number): void {
  const tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
}

/* 哨兵划分 */
function partition(nums: number[], left: number, right: number): number {
  // 以 nums[left] 作为基准数
  let i = left,
    j = right;
  while (i < j) {
    while (i < j && nums[j] >= nums[left]) {
      j -= 1; // 从右向左找首个小于基准数的元素
    }
    while (i < j && nums[i] <= nums[left]) {
      i += 1; // 从左向右找首个大于基准数的元素
    }
    // 元素交换
    this.swap(nums, i, j); // 交换这两个元素
  }
  this.swap(nums, i, left); // 将基准数交换至两子数组的分界线
  return i; // 返回基准数的索引
}

function quickSort2(nums: number[], left: number, right: number): void {
  // 子数组长度为 1 时终止递归
  if (left >= right) {
    return;
  }
  // 哨兵划分
  const pivot = this.partition(nums, left, right);
  // 递归左子数组、右子数组
  this.quickSort2(nums, left, pivot - 1);
  this.quickSort2(nums, pivot + 1, right);
}
