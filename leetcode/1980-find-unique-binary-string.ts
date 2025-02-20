// https://leetcode.com/problems/find-unique-binary-string/description/
// Given an array of strings nums containing n unique binary strings each of length n, return a binary string of length n that does not appear in nums. If there are multiple answers, you may return any of them.

// Example 1:
// Input: nums = ["01","10"]
// Output: "11"
// Explanation: "11" does not appear in nums. "00" would also be correct.

// Example 2:
// Input: nums = ["00","01"]
// Output: "11"
// Explanation: "11" does not appear in nums. "10" would also be correct.

// Example 3:
// Input: nums = ["111","011","001"]
// Output: "101"
// Explanation: "101" does not appear in nums. "000", "010", "100", and "110" would also be correct.

// https://leetcode.com/problems/find-unique-binary-string/solutions/3826608/beats-100-typescript-4-lines/
// Since the problem constraints states thatnums[i].length == n, you can use Cantor's diagonal argumentto solve the problem. This would not work ifnums[i].length > n.
function findDifferentBinaryString(nums: string[]): string {
  let output = '';
  for (let i = 0; i < nums.length; i++) {
    // take byte from appropriate byte in nums as curr
    output += nums[i][i] === '0' ? '1' : '0';
  }

  return output;
}

// https://leetcode.com/problems/find-unique-binary-string/solutions/4295802/2-line-javascript-typescript-solution/
// to ease understanding let's consider that each char at certain index should be different than this index binary number in nums, let's say we take 0th char then we go and check first binary in nums and it's first byte, then we do same for each index and this will give us unique string that will differ from each binary in nums array, then we return ans
function findDifferentBinaryString2(nums: string[]): string {
  const set = new Set(nums.map((s) => Number.parseInt(s, 2)));
  for (let i = 0; ; i++) {
    if (!set.has(i)) {
      return i.toString(2).padStart(nums.length, '0');
    }
  }
}
