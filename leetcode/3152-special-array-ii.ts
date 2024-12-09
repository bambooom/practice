// https://leetcode.com/problems/special-array-ii/
// An array is considered special if every pair of its adjacent elements contains two numbers with different parity.
// You are given an array of integer nums and a 2D integer matrix queries, where for queries[i] = [fromi, toi] your task is to check that
// subarray
//  nums[fromi..toi] is special or not.
// Return an array of booleans answer such that answer[i] is true if nums[fromi..toi] is special.

// Example 1:
// Input: nums = [3,4,1,2,6], queries = [[0,4]]
// Output: [false]
// Explanation:
// The subarray is [3,4,1,2,6]. 2 and 6 are both even.

// Example 2:
// Input: nums = [4,3,1,6], queries = [[0,2],[2,3]]
// Output: [false,true]
// Explanation:
// The subarray is [4,3,1]. 3 and 1 are both odd. So the answer to this query is false.
// The subarray is [1,6]. There is only one pair: (1,6) and it contains numbers with different parity. So the answer to this query is true.

function isArraySpecial(nums: number[], queries: number[][]): boolean[] {
  const map: Record<number, number> = {};
  let subarray = 1;
  map[0] = subarray; // push the 0th index as it is always special

  let last = nums[0] % 2;
  for (let i = 1; i < nums.length; i++) {
    const current = nums[i] % 2;
    // at this point the last special subarray ends and a new one starts
    if (last === current) {
      subarray++; // strong the starting index of the special subarrays in nums
    }

    map[i] = subarray;
    last = current;
  }

  const result: boolean[] = [];

  for (const query of queries) {
    const [from, to] = query;
    // so if we find it is the mixture of 2 special subarrays then it is not special
    result.push(map[from] === map[to]);
  }

  return result;
}

// https://leetcode.com/problems/special-array-ii/solutions/6127461/slice-windows-for-a-prefix-sum/
function isArraySpecial2(nums: number[], queries: number[][]): boolean[] {
  let count = 0;
  const unspecials = nums.map((v, i) => {
    if (i === 0) {
      return 0;
    }
    if (v % 2 === nums[i - 1] % 2) {
      count += 1;
    }
    return count;
  });
  return queries.map(([l, r]) => l === r || unspecials[l] === unspecials[r]);
}
