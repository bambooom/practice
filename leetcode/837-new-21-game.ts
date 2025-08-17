// https://leetcode.com/problems/new-21-game/
// Alice plays the following game, loosely based on the card game "21".
// Alice starts with 0 points and draws numbers while she has less than k points. During each draw, she gains an integer number of points randomly from the range [1, maxPts], where maxPts is an integer. Each draw is independent and the outcomes have equal probabilities.
// Alice stops drawing numbers when she gets k or more points.
// Return the probability that Alice has n or fewer points.
// Answers within 10-5 of the actual answer are considered accepted.

// Example 1:
// Input: n = 10, k = 1, maxPts = 10
// Output: 1.00000
// Explanation: Alice gets a single card, then stops.

// Example 2:
// Input: n = 6, k = 1, maxPts = 10
// Output: 0.60000
// Explanation: Alice gets a single card, then stops.
// In 6 out of 10 possibilities, she is at or below 6 points.

// Example 3:
// Input: n = 21, k = 17, maxPts = 10
// Output: 0.73278

// https://leetcode.com/problems/new-21-game/solutions/3562953/61ms-100-beats-runtime-typescript-javascript/?envType=daily-question&envId=2025-08-17
function new21Game(n: number, k: number, maxPts: number): number {
  // Base case: if we can't reach k points or k is 0, probability is 1
  if (k + maxPts <= n || k === 0) {
    return 1;
  }

  let dp: number[] = new Array(n + 1);
  dp[0] = 1; // Probability of having 0 points is 1

  // Initialize sum variable s
  let s = k > 0 ? 1 : 0;

  // Calculate probabilities for each point from 1 to n
  for (let i = 1; i <= n; i++) {
    // Probability of having i points is the average of probabilities of having i-1, i-2, ..., i-maxPts points, all the possible ways to reach i points
    dp[i] = s / maxPts;
    // If we haven't reached k points yet, add the current probability to the sum
    if (i < k) {
      s += dp[i];
    }
    // If we've reached a point where we can subtract a probability from the sum, do so
    if (i - maxPts >= 0 && i - maxPts < k) {
      s -= dp[i - maxPts];
    }
  }
  // By adding and subtracting from s in this way, we're effectively maintaining a "window" of probabilities that contribute to the overall probability of reaching k points. This window moves forward as i increases, and the probabilities that fall outside the window are no longer considered.
  // Think of it like a sliding window of size maxPts that moves forward as i increases. The probabilities within the window contribute to the overall probability, and the probabilities outside the window are ignored.

  // Calculate the probability of having k or more points
  let ans = 0;
  for (let i = k; i <= n; i++) {
    ans += dp[i];
  }

  return ans;
}
