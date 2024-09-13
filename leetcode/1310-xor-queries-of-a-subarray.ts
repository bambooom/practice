// https://leetcode.com/problems/xor-queries-of-a-subarray/
// You are given an array arr of positive integers. You are also given the array queries where queries[i] = [lefti, righti].
// For each query i compute the XOR of elements from lefti to righti (that is, arr[lefti] XOR arr[lefti + 1] XOR ... XOR arr[righti] ).
// Return an array answer where answer[i] is the answer to the ith query.

// Example 1:
// Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
// Output: [2,7,14,8]
// Explanation:
// The binary representation of the elements in the array are:
// 1 = 0001
// 3 = 0011
// 4 = 0100
// 8 = 1000
// The XOR values for queries are:
// [0,1] = 1 xor 3 = 2
// [1,2] = 3 xor 4 = 7
// [0,3] = 1 xor 3 xor 4 xor 8 = 14
// [3, 3] = 8

// Example 2:
// Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
// Output: [8,0,4,4]

//https://leetcode.com/problems/xor-queries-of-a-subarray/solutions/4232499/simple-explanation-with-prefix-sum-in-python3-typescript/
// define a prefix of XOR's
// XOR[i] = prefix[left] ^ prefix[right + 1]
//  We include right + 1 to cover all parts of a particular interval.
// Thus we should initialize a Prefix XOR's with [0, arr[i]]
// Approach:
// 1. define ans to store result
// 2. define prefix with [0, arr[i]]
// 3. fill prefix as prefix[i] ^ arr[i]
// 4. iterate over queries and find a calculated XOR at each step
// 5. returnans
function xorQueries(arr: number[], queries: number[][]): number[] {
  const ans: number[] = [];
  const prefix = [0, arr[0]];

  for (let i = 1; i < arr.length; i++) {
    prefix.push(prefix[i] ^ arr[i]);
  }

  for (const [left, right] of queries) {
    ans.push(prefix[left] ^ prefix[right + 1]);
  }

  return ans;
}
