// https://leetcode.com/problems/rabbits-in-forest
// There is a forest with an unknown number of rabbits. We asked n rabbits "How many OTHER rabbits have the same color as you?" and collected the answers in an integer array answers where answers[i] is the answer of the ith rabbit.
// Given the array answers, return the minimum number of rabbits that could be in the forest.

// Example 1:
// Input: answers = [1,1,2]
// Output: 5
// Explanation:
// The two rabbits that answered "1" could both be the same color, say red.
// The rabbit that answered "2" can't be red or the answers would be inconsistent.
// Say the rabbit that answered "2" was blue.
// Then there should be 2 other blue rabbits in the forest that didn't answer into the array.
// The smallest possible number of rabbits in the forest is therefore 5: 3 that answered plus 2 that didn't.

// Example 2:
// Input: answers = [10,10,10]
// Output: 11

// https://leetcode.com/problems/rabbits-in-forest/solutions/6668371/hash-table-math-greedy-o-n/?envType=daily-question&envId=2025-04-20
// Intuition: if a rabbit answers k, there must be k + 1 rabbits of that same color (including itself). However, multiple rabbits could have given the same answer, and we need to group them efficiently to minimize the total count.
// Approach:
// Count the frequency of each unique answer using a hash map.
// For each unique answer k, we interpret that to mean there are groups of k + 1 rabbits sharing a color.
// The total number of such groups needed is ceil(count / (k + 1)), because we cannot have more than k + 1 rabbits per group.
// Multiply the number of groups by k + 1 to get the minimum number of rabbits required for this answer.
// Sum across all unique answers.
function numRabbits(answers: number[]): number {
  const countMap = new Map<number, number>();
  // count freq of each unique answer
  for (const answer of answers) {
    countMap.set(answer, (countMap.get(answer) || 0) + 1);
  }

  let totalRabbits = 0;

  for (const [answer, freq] of countMap.entries()) {
    const groupSize = answer + 1;
    const groupsNeeded = Math.ceil(freq / groupSize);
    totalRabbits += groupsNeeded * groupSize;
  }

  return totalRabbits;
}
