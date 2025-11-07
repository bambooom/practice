// https://leetcode.com/problems/maximize-the-minimum-powered-city/
// You are given a 0-indexed integer array stations of length n, where stations[i] represents the number of power stations in the ith city.
// Each power station can provide power to every city in a fixed range. In other words, if the range is denoted by r, then a power station at city i can provide power to all cities j such that |i - j| <= r and 0 <= i, j <= n - 1.
// Note that |x| denotes absolute value. For example, |7 - 5| = 2 and |3 - 10| = 7.
// The power of a city is the total number of power stations it is being provided power from.
// The government has sanctioned building k more power stations, each of which can be built in any city, and have the same range as the pre-existing ones.
// Given the two integers r and k, return the maximum possible minimum power of a city, if the additional power stations are built optimally.
// Note that you can build the k power stations in multiple cities.

// Example 1:
// Input: stations = [1,2,4,5,0], r = 1, k = 2
// Output: 5
// Explanation:
// One of the optimal ways is to install both the power stations at city 1.
// So stations will become [1,4,4,5,0].
// - City 0 is provided by 1 + 4 = 5 power stations.
// - City 1 is provided by 1 + 4 + 4 = 9 power stations.
// - City 2 is provided by 4 + 4 + 5 = 13 power stations.
// - City 3 is provided by 5 + 4 = 9 power stations.
// - City 4 is provided by 5 + 0 = 5 power stations.
// So the minimum power of a city is 5.
// Since it is not possible to obtain a larger power, we return 5.

// Example 2:
// Input: stations = [4,4,4,4], r = 0, k = 3
// Output: 4
// Explanation:
// It can be proved that we cannot make the minimum power of a city greater than 4.

// Constraints:
// n == stations.length
// 1 <= n <= 10^5
// 0 <= stations[i] <= 10^5
// 0 <= r <= n - 1
// 0 <= k <= 10^9

// https://leetcode.com/problems/maximize-the-minimum-powered-city/solutions/7331668/all-language-solutions0msbeat-100all-in-z8n2v/?envType=daily-question&envId=2025-11-07
// Editorial

// Approach: Binary Search + Difference Array
// Intuition:
// According to the problem statement, we need to find the maximum possible value of the minimum power supply.
// It is intuitive to use binary search to determine the highest possible minimum power supply across all cities.
// The key is to verify whether a given power level x can satisfy the problem’s requirement;
// that is, whether it is possible for every city’s power supply to be at least x after adding k additional power stations.

// Since the power station in the i-th city covers the range [i−r,i+r],
// we can use a difference array to efficiently calculate the total power for each city.
// The critical part is deciding where to place the k additional power stations, which can be determined using a greedy strategy.

// Suppose the target minimum power for each city is x. We traverse the cities from left to right:
//  - If the power at index i is greater than or equal to x, we move on to the next city (i+1).
//  - If the power at index i is less than x, we theoretically need to add power stations within the interval [i−r,i+r].
//    Since we are traversing in order, by the time we reach city i, all cities before it already have sufficient power.
//    Therefore, adding power stations to earlier cities would be redundant.
//    To maximize efficiency, we should add power stations to cities after i.
//    If we add a power station at position i+r, it will cover the range [i,i+2r],
//    thereby benefiting as many cities after i as possible. Hence, the optimal choice is to add a power station at i+r.

// The actual calculation proceeds as follows:
//  - For convenience, precompute the difference array diff based on the given stations array.
//    Use binary search to find the maximum value.
//    According to the problem statement, the lower bound of the binary search can start at lo=min(stations),
//    and the upper bound can be hi=sum(stations)+k, since no city’s power can exceed this limit.
//    Then, use binary search to test the candidate value mid.
//  - For each binary search iteration, calculate the prefix sum of the difference array from left to right.
//    When traversing to index i, if the current sum is less than mid, it means the city’s power is insufficient.
//    In that case, we need to add add = mid - sum power stations at position i + r to ensure that city i reaches at least mid.
//    The total power sum increases by add, and the remaining number of available stations decreases by add. U
//    Update the difference array accordingly and continue the traversal.
//    If all cities can reach at least mid power, we can try increasing mid.
//    If the number of remaining power stations becomes insufficient before completing the traversal, it means mid is too high, and we must reduce it.
//  - The final answer is the maximum value of mid that satisfies the condition, found through binary search.
//  - The target value of binary search is the answer.
function maxPower(stations: number[], r: number, k: number): number {
  const n = stations.length;
  // Create an array to store the cumulative sum of stations within the range r.
  const cnt: number[] = new Array(n + 1).fill(0);

  // Iterate over the stations array and update the cnt array based on the range r.
  for (let i = 0; i < n; i++) {
    const left = Math.max(0, i - r); // left boundary of the range
    const right = Math.min(n, i + r + 1); // right boundary
    cnt[left] += stations[i];
    cnt[right] -= stations[i];
  }

  // Helper function to check if it is possible to achieve the value val by building additional power stations.
  const check = (val: number): boolean => {
    const diff: number[] = [...cnt]; // Create a copy of the cnt array.
    let sum = 0; // Initialize the sum of power within the range r.
    let remaining = k; // Initialize the remaining power.

    for (let i = 0; i < n; i++) {
      sum += diff[i]; // Add the power at the current index to the sum.
      if (sum < val) {
        // If the sum is less than the value, calculate the additional power needed.
        const add = val - sum;
        if (remaining < add) {
          // If the remaining power is less than the additional power needed, return false.
          return false;
        }

        remaining -= add; // Subtract the additional power needed from the remaining power.
        const end = Math.min(n, i + 2 * r + 1); // Calculate the end boundary of the range.
        diff[end] -= add; // Subtract the additional power needed from the end boundary.
        sum += add; // Add the additional power needed to the sum.
      }
    }

    return true;
  };

  // binary search
  let low = Math.min(...stations); // lower bound with the minimum value in the stations array.
  let high = stations.reduce((a, b) => a + b, 0) + k; // upper bound with the sum of the stations array plus the remaining power k.
  let res = 0;

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (check(mid)) {
      // If it is possible to achieve the value mid, update the result and set the lower bound to mid + 1.
      res = mid;
      low = mid + 1;
    } else {
      // If it is not possible to achieve the value mid, set the upper bound to mid - 1.
      high = mid - 1;
    }
  }

  return res;
}
