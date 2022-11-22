// simple way, using set, better for small arrays
function containsDuplicate(nums: number[]): boolean {
  const len = nums.length;
  const uniq = new Set(nums).size;
  return len !== uniq;
}

// using Map, maybe better for arrays more than 1w elements
function containDup(nums: number[]): boolean {
  const hash: { [key: number]: boolean } = {};
  for (let i = 0; i < nums.length; i++) {
    if (hash[nums[i]]) {
      return true; // can exit early
    } else {
      hash[nums[i]] = true;
    }
  }

  return false;
}
