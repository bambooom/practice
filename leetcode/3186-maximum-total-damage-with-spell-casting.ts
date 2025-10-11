// https://leetcode.com/problems/maximum-total-damage-with-spell-castings
// A magician has various spells.
// You are given an array power, where each element represents the damage of a spell. Multiple spells can have the same damage value.
// It is a known fact that if a magician decides to cast a spell with a damage of power[i], they cannot cast any spell with a damage of power[i] - 2, power[i] - 1, power[i] + 1, or power[i] + 2.
// Each spell can be cast only once.
// Return the maximum possible total damage that a magician can cast.

// Example 1:
// Input: power = [1,1,3,4]
// Output: 6
// Explanation:
// The maximum possible damage of 6 is produced by casting spells 0, 1, 3 with damage 1, 1, 4.

// Example 2:
// Input: power = [7,1,6,6]
// Output: 13
// Explanation:
// The maximum possible damage of 13 is produced by casting spells 1, 2, 3 with damage 1, 6, 6.

// Constraints:
// 1 <= power.length <= 10^5
// 1 <= power[i] <= 10^9

// https://leetcode.com/problems/maximum-total-damage-with-spell-casting/solutions/7265510/maximum-total-damage-w-spell-casting-most-efficient-java-c-c-c-python3-go-js-ts/?envType=daily-question&envId=2025-10-11
// dp[i] = max(dp[i - 1], dp[prev] + freq[keys[i]] * keys[i]);
// dp[i - 1]: skip current damage
// dp[prev] + ...: take current damage and add best result before the conflict zone
function maximumTotalDamage(power: number[]): number {
  // Create a map to store the frequency of each damage level in the power array
  const freq = new Map<number, number>();

  // Sort the keys of the freq map in ascending order
  for (const p of power) {
    freq.set(p, (freq.get(p) || 0) + 1);
  }

  const keys = Array.from(freq.keys()).sort((a, b) => a - b);

  const n = keys.length;
  const dp: number[] = new Array(n).fill(0);
  // Set the first element of dp to the product of the first damage level and its frequency
  dp[0] = keys[0] * freq.get(keys[0])!;

  for (let i = 1; i < n; i++) {
    // Calculate the maximum damage that can be achieved by casting the spell at index i,
    // considering the spells that cannot be cast due to the restrictions
    let take = freq.get(keys[i])! * keys[i];
    let l = 0;
    let r = i - 1;
    let ans = -1;

    // Use a binary search to find the index ans of the last spell
    // that can be cast before the current spell i
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      // find the rightmost damage value that’s ≤ keys[i] - 3,
      // since any damage within 2 difference is invalid.
      if (keys[mid] <= keys[i] - 3) {
        ans = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    // If such a spell exists, add its damage to the current damage
    if (ans >= 0) {
      take += dp[ans];
    }

    // Set the damage at index i in dp to the maximum of take and the damage at index i-1 in dp
    dp[i] = Math.max(take, dp[i - 1]);
  }

  // Return the maximum damage that can be achieved by casting all the spells
  return dp[n - 1];
}
