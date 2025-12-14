// https://leetcode.com/problems/number-of-ways-to-divide-a-long-corridor/
// Along a long library corridor, there is a line of seats and decorative plants. You are given a 0-indexed string corridor of length n consisting of letters 'S' and 'P' where each 'S' represents a seat and each 'P' represents a plant.
// One room divider has already been installed to the left of index 0, and another to the right of index n - 1. Additional room dividers can be installed. For each position between indices i - 1 and i (1 <= i <= n - 1), at most one divider can be installed.
// Divide the corridor into non-overlapping sections, where each section has exactly two seats with any number of plants. There may be multiple ways to perform the division. Two ways are different if there is a position with a room divider installed in the first way but not in the second way.
// Return the number of ways to divide the corridor. Since the answer may be very large, return it modulo 109 + 7. If there is no way, return 0.

// Example 1:
// Input: corridor = "SSPPSPS"
// Output: 3
// Explanation: There are 3 different ways to divide the corridor.
// The black bars in the above image indicate the two room dividers already installed.
// Note that in each of the ways, each section has exactly two seats.

// Example 2:
// Input: corridor = "PPSPSP"
// Output: 1
// Explanation: There is only 1 way to divide the corridor, by not installing any additional dividers.
// Installing any would create some section that does not have exactly two seats.

// Example 3:
// Input: corridor = "S"
// Output: 0
// Explanation: There is no way to divide the corridor because there will always be a section that does not have exactly two seats.

// Constraints:
// n == corridor.length
// 1 <= n <= 10^5
// corridor[i] is either 'S' or 'P'.

// https://leetcode.com/problems/number-of-ways-to-divide-a-long-corridor/solutions/4337390/using-combinatorial-mathematics-beats-10-6b76/?envType=daily-question&envId=2025-12-14
// Intuition:
// If number of seats is odd, the result will be 0 because there is no way to devide corridor into rooms which contains exactly 2 seats
// If there is no seats at all, the answer is 0 too
// Imagine we have only 2 seats and lots of plans around, so it's only 1 way.
// But if there are more 2 seats after for example "PPPSPSPPPSS" so number of way is 4 like this "PPPSPS|P|P|P|SS".
// With this case "PPPSPS|P|P|P|SS|P|SS" we have 4 ways to devide between SPS|P|P|P|SS and 2 ways to devide between SS|P|SS so the result would be 4 * 2 = 8 ways.
function numberOfWays(corridor: string): number {
  let totalS = 0, // total number of seats in the corridor
    temp = 0, // Number of consecutive seats ('SS')
    ans = 1, // Total number of ways to divide the corridor
    count = 0; // Number of consecutive seats in the current section

  for (let i = 0; i < corridor.length; i++) {
    if (corridor[i] === 'S') {
      if (temp > 0) {
        // if we have already seen 2 seats, we can start to count the number of ways to divide the corridor
        ans = (ans * temp) % (10 ** 9 + 7);
        temp = 0; // reset temp because we have already seen 2 seats
        count = 0; // reset count because we have already seen 2 seats
      }
      totalS++;
      count++; // increase count because we have seen 1 more seat
    }

    if (count === 2) {
      temp++; // increase temp because we have seen 1 more consecutive seat
    }
  }

  // If total number of seats is odd or there is no seat at all, return 0
  return totalS > 0 && totalS % 2 === 0 ? ans : 0;
}
