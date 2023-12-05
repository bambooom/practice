// https://leetcode.com/problems/count-of-matches-in-tournament/
// You are given an integer n, the number of teams in a tournament that has strange rules:

// If the current number of teams is even, each team gets paired with another team. A total of n / 2 matches are played, and n / 2 teams advance to the next round.
// If the current number of teams is odd, one team randomly advances in the tournament, and the rest gets paired. A total of (n - 1) / 2 matches are played, and (n - 1) / 2 + 1 teams advance to the next round.
// Return the number of matches played in the tournament until a winner is decided.

// Example:
// Input: n = 14
// Output: 13
// Explanation: Details of the tournament:
// - 1st Round: Teams = 14, Matches = 7, and 7 teams advance.
// - 2nd Round: Teams = 7, Matches = 3, and 4 teams advance.
// - 3rd Round: Teams = 4, Matches = 2, and 2 teams advance.
// - 4th Round: Teams = 2, Matches = 1, and 1 team is declared the winner.
// Total number of matches = 7 + 3 + 2 + 1 = 13.

function numberOfMatches(n: number): number {
  let res = 0;
  while (n > 1) {
    if (n % 2 === 0) {
      res += n / 2;
      n = n / 2;
    } else {
      res += (n - 1) / 2;
      n = (n - 1) / 2 + 1;
    }
  }

  return res;
}

// Logic:
// In this tournament, when a team loses, they are eliminated and will no longer play any matches.
// There are n teams, and 1 winner. Thus, n - 1 teams will be eliminated.
// Each match is played between two teams. One team wins, one team loses. Thus, each match eliminates exactly one team.
// As n - 1 teams will be eliminated, there will be n - 1 matches played, with each match eliminating a team.

const numberOfMatches2 = (n: number) => n - 1;
