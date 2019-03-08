/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// Approach 1: Brute Force
// Complexity Analysis
// Time complexity: O(n^2), For each element, we try to find its complement by
// looping through the rest of array which takes O(n) time.
// Space complexity: O(1).
var twoSum1 = function (nums, target) {
  for (var i = 0; i < nums.length - 1; i++) {
    var first = nums[i];
    for (var j = i + 1; j < nums.length; j++) {
      var second = nums[j];
      if (first + second === target) {
        return [i, j];
      }
    }
  }
};

// Approach 2: Hash Table
// use hash-table to easily find complement, trading space for speed
//  Two-pass Hash Table: use two loop for creating hash and using hash
//  One-pass Hash Table: do both creating and using in one loop
// Time complexity : O(n)
// Space complexity : O(n)

// one-pass
var twoSum2 = function (nums, target) {
  var map = new Map; // using Map or plain object, both OK
  for (var i = 0; i < nums.length; i++) {
    var complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i]
    }
    map.set(nums[i], i);
  }
}
