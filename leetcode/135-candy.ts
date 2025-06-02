// https://leetcode.com/problems/candy
// There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.
// You are giving candies to these children subjected to the following requirements:
// Each child must have at least one candy.
// Children with a higher rating get more candies than their neighbors.
// Return the minimum number of candies you need to have to distribute the candies to the children.

// Example 1:
// Input: ratings = [1,0,2]
// Output: 5
// Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

// Example 2:
// Input: ratings = [1,2,2]
// Output: 4
// Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
// The third child gets 1 candy because it satisfies the above two conditions.

// https://leetcode.com/problems/candy/solutions/5679459/explained-runtime-beats-98-73-memory-beats-45-65/?envType=daily-question&envId=2025-06-02
//Initialize: Start with 1 candy for each child.
// Left to Right: Increase candies if a child’s rating is higher than the previous one.
// Right to Left: Adjust candies if a child’s rating is higher than the next one.
// Sum Up: Add all candies.

function candy(ratings: number[]): number {
  const n = ratings.length;
  if (n === 0) return 0;

  // Step 1: initialize the candies array where each child gets at least 1 candy
  const candies = new Array(n).fill(1);

  // Step 2: left to right pass
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Step 3: right to left pass
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  // Step 4: sum up the candies
  return candies.reduce((acc, cur) => acc + cur, 0);
}
