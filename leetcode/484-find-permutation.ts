// https://leetcode.com/problems/find-permutation/
// A permutation perm of n integers of all the integers in the range [1, n] can be represented as a string s of length n - 1 where:
// s[i] == 'I' if perm[i] < perm[i + 1], and
// s[i] == 'D' if perm[i] > perm[i + 1].
// Given a string s, reconstruct the lexicographically smallest permutation perm and return it.

// Example 1:
// Input: s = "I"
// Output: [1,2]
// Explanation: [1,2] is the only legal permutation that can represented by s, where the number 1 and 2 construct an increasing relationship.

// Example 2:
// Input: s = "DI"
// Output: [2,1,3]
// Explanation: Both [2,1,3] and [3,1,2] can be represented as "DI", but since we want to find the smallest lexicographical permutation, you should return [2,1,3]

// https://leetcode.com/problems/find-permutation/solutions/2035298/javascript-two-solutions-w-comments/?envType=study-plan-v2&envId=premium-algo-100
// 1. stack
function findPermutation(s: string): number[] {
  const result: number[] = []
  const stack: number[] = []

  for (let i = 1; i < s.length + 1; i++) {
    // push the curr num to stack
    stack.push(i)
    // if curr char is I, pop the number from stack and add it to result
    if (s[i - 1] === 'I') {
      while (stack.length) {
        result.push(stack.pop()!)
      }
    }
  }

  // push the last num to stack since the loop will only goes to s.length
  stack.push(s.length + 1)
  // add the remaining nums to result
  while (stack.length) {
    result.push(stack.pop()!)
  }
  return result
};

// 2.reverse
function findPermutation2(s: string): number[] {
  let res = []
  // generate the list of number with increasing order
  for (let i = 0; i < s.length + 1; i++){
    res[i] = i + 1
  }

  let i = 1
  while (i < s.length + 1){
    // find the interval that needed to be reverse aka while it is D
    let j = i
    while (i < s.length + 1 && s[i-1] === "D"){
        i ++
    }
    // reverse the d interval
    reverseOrder(res, j- 1, i)
    i++
  }
  return res
};

function reverseOrder(target: number[], start: number, end: number){
  for (let i = 0; i < (end - start) / 2; i++){
    const temp = target[i + start]
    target[i + start] = target[end - i - 1]
    target[end - i - 1] = temp
  }
}
