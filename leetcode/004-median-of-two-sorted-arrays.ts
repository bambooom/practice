// https://leetcode.com/problems/median-of-two-sorted-arrays
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
// The overall run time complexity should be O(log (m+n)).

// Example 1:
// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.
// Example 2:
// Input: nums1 = [1,2], nums2 = [3,4]
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

// divide and conquer
// https://leetcode.com/problems/median-of-two-sorted-arrays/solutions/3486424/o-log-min-m-n-very-concise-easy-vivid-explanation-divide-and-conquer/?envType=study-plan-v2&envId=top-100-liked
// - find kth smallest number in two sorted arrays
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const findKthSmallest = (
    arrA: number[],
    arrAL: number,
    a: number,
    arrB: number[],
    arrBL: number,
    b: number,
    K: number,
  ): number => {
    if (a > b) {
      return findKthSmallest(arrB, arrBL, b, arrA, arrAL, a, K);
    }

    if (a === 0) {
      return arrB[arrBL + K - 1];
    }
    if (K === 1) {
      return Math.min(arrA[arrAL], arrB[arrBL]);
    }

    const aK = Math.min(a, Math.ceil(K / 2)); // A+K/2 > A length
    const bK = K - aK; // aK+bK=K (K/2+K/2=K or a+bK=K)

    if (arrA[arrAL + aK - 1] < arrB[arrBL + bK - 1]) {
      // array index include 0 so index=length-1
      return findKthSmallest(arrA, arrAL + aK, a - aK, arrB, arrBL, b, K - aK);
    } else {
      return findKthSmallest(arrA, arrAL, a, arrB, arrBL + bK, b - bK, K - bK);
    }
  };

  const mn = nums1.length + nums2.length;
  const res = findKthSmallest(
    nums1,
    0,
    nums1.length,
    nums2,
    0,
    nums2.length,
    Math.ceil(mn / 2),
  );
  if (mn % 2) {
    return res;
  }
  return (
    (res +
      findKthSmallest(
        nums1,
        0,
        nums1.length,
        nums2,
        0,
        nums2.length,
        (mn + 2) / 2,
      )) /
    2
  );
}

// https://leetcode.com/problems/median-of-two-sorted-arrays/solutions/1825876/typescript-o-log-min-m-n-with-explanation-link/?envType=study-plan-v2&envId=top-100-liked
// faster solution
// refer explanation: https://takeuforward.org/data-structure/median-of-two-sorted-arrays-of-different-sizes/
function findMedianSortedArrays2(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays2(nums2, nums1);
  }

  const [m, n] = [nums1.length, nums2.length];
  let low = 0;
  let high = m;
  const medianPos = Math.floor((m + n + 1) / 2);

  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = medianPos - cut1;

    const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const r1 = cut1 === m ? Infinity : nums1[cut1];
    const r2 = cut2 === n ? Infinity : nums2[cut2];

    if (l1 <= r2 && l2 <= r1) {
      if ((m + n) % 2 !== 0) {
        return Math.max(l1, l2);
      } else {
        return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
      }
    } else if (l2 > r1) {
      low = cut1 + 1;
    } else {
      high = cut1 - 1;
    }
  }

  return 0;
}
