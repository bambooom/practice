// https://leetcode.com/problems/max-number-of-k-sum-pairs/
// #hash-table

function maxOperations(nums: number[], k: number): number {
  const hash: Record<number, number> = {};
  for (let i = 0; i < nums.length; i++) {
    hash[nums[i]] = (hash[nums[i]] || 0) + 1;
  }

  let count = 0;
  for (const key in hash) {
    const keyN = Number(key);
    const another = k - keyN;
    if (another !== keyN && hash[another]) {
      const min = Math.min(hash[key], hash[another]);
      hash[key] -= min;
      hash[another] -= min;
      count += min;
    } else if (another === keyN && hash[key] >= 2) {
      const mod = hash[key] % 2;
      count += Math.floor(hash[key] / 2);
      hash[key] = mod;
    }
  }

  return count;
}

// sort + two-pointer
function maxOperations2(nums: number[], k: number): number {
  if (nums.length == 1) return 0;
  nums.sort((a, b) => a - b);
  let left = 0,
    right = nums.length - 1;
  let result = 0;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum < k) left++;
    else if (sum > k) right--;
    else {
      result++;
      left++;
      right--;
    }
  }

  return result;
}
