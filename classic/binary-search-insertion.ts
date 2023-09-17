// https://www.hello-algo.com/chapter_searching/binary_search_insertion/

/* 二分查找插入点（无重复元素） */
function binarySearchInsertionSimple(
  nums: Array<number>,
  target: number,
): number {
  let i = 0,
    j = nums.length - 1; // 初始化双闭区间 [0, n-1]
  while (i <= j) {
    const m = Math.floor(i + (j - i) / 2); // 计算中点索引 m, 使用 Math.floor() 向下取整
    if (nums[m] < target) {
      i = m + 1; // target 在区间 [m+1, j] 中
    } else if (nums[m] > target) {
      j = m - 1; // target 在区间 [i, m-1] 中
    } else {
      return m; // 找到 target ，返回插入点 m
    }
  }
  // 未找到 target ，返回插入点 i
  return i;
}

/* 二分查找插入点（存在重复元素） */
function binarySearchInsertion(nums: Array<number>, target: number): number {
  let i = 0,
    j = nums.length - 1; // 初始化双闭区间 [0, n-1]
  while (i <= j) {
    const m = Math.floor(i + (j - i) / 2); // 计算中点索引 m, 使用 Math.floor() 向下取整
    if (nums[m] < target) {
      i = m + 1; // target 在区间 [m+1, j] 中
    } else if (nums[m] > target) {
      j = m - 1; // target 在区间 [i, m-1] 中
    } else {
      j = m - 1; // 首个小于 target 的元素在区间 [i, m-1] 中
    }
  }
  // 返回插入点 i
  return i;
}

/* 二分查找最左一个 target */
function binarySearchLeftEdge(nums: Array<number>, target: number): number {
  // 等价于查找 target 的插入点
  const i = binarySearchInsertion(nums, target);
  // 未找到 target ，返回 -1
  if (i === nums.length || nums[i] !== target) {
    return -1;
  }
  // 找到 target ，返回索引 i
  return i;
}

/* 二分查找最右一个 target */
function binarySearchRightEdge(nums: Array<number>, target: number): number {
  // 转化为查找最左一个 target + 1
  const i = binarySearchInsertion(nums, target + 1);
  // j 指向最右一个 target ，i 指向首个大于 target 的元素
  const j = i - 1;
  // 未找到 target ，返回 -1
  if (j === -1 || nums[j] !== target) {
    return -1;
  }
  // 找到 target ，返回索引 j
  return j;
}
