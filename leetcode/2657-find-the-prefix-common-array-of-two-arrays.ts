//https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays/description/
// You are given two 0-indexed integer permutations A and B of length n.
// A prefix common array of A and B is an array C such that C[i] is equal to the count of numbers that are present at or before the index i in both A and B.
// Return the prefix common array of A and B.
// A sequence of n integers is called a permutation if it contains all integers from 1 to n exactly once.

// Example 1:
// Input: A = [1,3,2,4], B = [3,1,2,4]
// Output: [0,2,3,4]
// Explanation: At i = 0: no number is common, so C[0] = 0.
// At i = 1: 1 and 3 are common in A and B, so C[1] = 2.
// At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
// At i = 3: 1, 2, 3, and 4 are common in A and B, so C[3] = 4.

// Example 2:
// Input: A = [2,3,1], B = [3,1,2]
// Output: [0,1,3]
// Explanation: At i = 0: no number is common, so C[0] = 0.
// At i = 1: only 3 is common in A and B, so C[1] = 1.
// At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.

function findThePrefixCommonArray(A: number[], B: number[]): number[] {
  const out = new Array<number>(A.length);
  const seen = new Array<number>(A.length + 1).fill(0);

  for (let i = 0; i < A.length; i++) {
    let count = out[i - 1] || 0;
    const a = A[i];
    const b = B[i];

    seen[a]++;
    seen[b]++;

    if (seen[b] === 2) {
      count++;
    }
    if (seen[a] === 2 && a !== b) {
      count++;
    }

    out[i] = count;
  }

  return out;
}

// https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays/solutions/4104084/easy-to-understand-one-set-one-pass/
// use set
// 因为假定了 A 和B 含有相同的 element， permutations，否则任意两个不相关的 array 是不能用这个 set 的 方式的
function findThePrefixCommonArray2(A: number[], B: number[]): number[] {
  const res = new Array<number>(A.length);
  const set = new Set<number>(A);

  for (let i = A.length - 1; i >= 0; i--) {
    res[i] = set.size;
    set.delete(A[i]);
    set.delete(B[i]);
  }

  return res;
}
