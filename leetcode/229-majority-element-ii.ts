// https://leetcode.com/problems/majority-element-ii/
// Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

// straightforward, use hashmap to store frequency
function majorityElement(nums: number[]): number[] {
  const len = nums.length;
  if (len < 1) return [];
  if (len < 2) return nums;
  const map: Record<number, number> = {};
  const res = new Set<number>();
  for (const num of nums) {
    if (map[num]) {
      map[num]++;
    } else {
      map[num] = 1;
    }
    if (map[num] > len / 3 && !res.has(num)) {
      res.add(num);
    }
  }

  return [...res];
}

// Boyer-Moore Voting solution, deal with constant space
// For an array of length n:
//  - There can be at most one majority element which is more than ⌊n/2⌋ times.
//  - There can be at most two majority elements which are more than ⌊n/3⌋ times.
//  - There can be at most three majority elements which are more than ⌊n/4⌋ times.

function majorityElement2(nums: number[]): number[] {
  const n = nums.length;
  if (n < 1) return [];
  if (n < 2) return nums;

  let candidate1 = Number.MAX_SAFE_INTEGER,
    candidate2 = Number.MAX_SAFE_INTEGER,
    count1 = 0,
    count2 = 0;

  for (const num of nums) {
    if (num === candidate1) {
      count1++;
    } else if (num === candidate2) {
      count2++;
    } else if (count1 === 0) {
      candidate1 = num;
      count1 = 1;
    } else if (count2 === 0) {
      candidate2 = num;
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }

  count1 = count2 = 0;

  for (const num of nums) {
    if (num === candidate1) count1++;
    else if (num === candidate2) count2++;
  }

  const threshold = Math.floor(nums.length / 3);
  const result: number[] = [];

  if (count1 > threshold) result.push(candidate1);
  if (count2 > threshold) result.push(candidate2);

  return result;
}
