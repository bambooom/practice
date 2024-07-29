//https://leetcode.com/problems/count-number-of-teams/
// There are n soldiers standing in a line. Each soldier is assigned a unique rating value.
// You have to form a team of 3 soldiers amongst them under the following rules:
// - Choose 3 soldiers with index (i, j, k) with rating (rating[i], rating[j], rating[k]).
// - A team is valid if: (rating[i] < rating[j] < rating[k]) or (rating[i] > rating[j] > rating[k]) where (0 <= i < j < k < n).
// Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).

// Example 1:
// Input: rating = [2,5,3,4,1]
// Output: 3
// Explanation: We can form three teams given the conditions. (2,3,4), (5,4,1), (5,3,1).
// Example 2:
// Input: rating = [2,1,3]
// Output: 0
// Explanation: We can't form any team given the conditions.
// Example 3:
// Input: rating = [1,2,3,4]
// Output: 4

// #dynamic-programming, #binary indexed tree

// https://leetcode.com/problems/count-number-of-teams/solutions/5542382/beats-100-o-n-log-n-binary-index-tree-java-python-c-javascript-typescript-go-rust/?envType=daily-question&envId=2024-07-29
// Intuition:
// - For ascending order: How many soldiers to the left have a lower rating, and how many to the right have a higher rating.
// - For descending order: How many soldiers to the left have a higher rating, and how many to the right have a lower rating.
// The product of these two counts will give us the number of valid teams for each soldier as the middle element.
// Summing this for all soldiers will give us the total number of valid teams.
function numTeams(rating: number[]): number {
  const n: number = rating.length;
  if (n < 3) return 0;

  const soldiers: number[][] = rating
    .map((r, i) => [r, i])
    .sort((a, b) => a[0] - b[0]);
  const indexMap: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    indexMap[soldiers[i][1]] = i;
  }

  const countTeams = (ascending: boolean): number => {
    const bit: number[] = new Array(n + 1).fill(0);
    let teams = 0;

    for (let i = 0; i < n; i++) {
      const rank: number = indexMap[i] + 1;
      const left: number = ascending
        ? getSum(bit, rank - 1)
        : getSum(bit, n) - getSum(bit, rank);
      const right: number = ascending
        ? n - rank - (getSum(bit, n) - getSum(bit, rank))
        : rank - 1 - getSum(bit, rank - 1);
      teams += left * right; // product of left and right give the total counts for this soldier as the middle element
      update(bit, rank, 1);
    }
    return teams;
  };

  const update = (bit: number[], index: number, val: number): void => {
    while (index < bit.length) {
      bit[index] += val;
      index += index & -index;
    }
  };

  const getSum = (bit: number[], index: number): number => {
    let sum = 0;
    while (index > 0) {
      sum += bit[index];
      index -= index & -index;
    }
    return sum;
  };

  return countTeams(true) + countTeams(false);
}
