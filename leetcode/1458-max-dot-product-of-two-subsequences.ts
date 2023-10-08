// https://leetcode.com/problems/max-dot-product-of-two-subsequences/

// Given two arrays nums1 and nums2.
// Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.
// A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).

// Example
// Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
// Output: 18
// Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
// Their dot product is (2*3 + (-2)*(-6)) = 18.

// https://leetcode.com/problems/max-dot-product-of-two-subsequences/?envType=daily-question&envId=2023-10-08
// recursive dynamic programming approach with memoization
// The key recursive relation is to compare two options:
// - Include the current elements nums1[i] and nums2[j] in the dot product if they are both positive, or zero, and add it to the maximum dot product achieved by moving to the next elements in both arrays.
// - Skip one of the elements and find the maximum dot product without including either nums1[i] or nums2[j] in the product.
// The function returns the maximum dot product starting from the initial positions i=0 and j=0.
function maxDotProduct(nums1: number[], nums2: number[]): number {
    const n = nums1.length, m = nums2.length;
    let dp = new Array(n + 1).fill(-Infinity).map(() => Array(m + 1).fill(-Infinity));

    const iterate = (i: number, j: number): number => {
        if (i >= n || j >= m) {
            return -Infinity; // Base case: if we go beyond the array bounds, return negative infinity.
        }

        if (dp[i][j] !== -Infinity) {
            return dp[i][j]; // If the result is already computed, return it from the memoization table.
        }

        return dp[i][j] = Math.max(
            (nums1[i] * nums2[j]) + Math.max(iterate(i + 1, j + 1), 0), // Include the current elements if both are positive
            Math.max(iterate(i + 1, j), iterate(i, j + 1)) // Skip one of the elements and find the maximum dot product
        );
    }

    return iterate(0, 0); // start the recursion from initial positions
};
}
