// https://leetcode.com/problems/the-earliest-and-latest-rounds-where-players-compete/
// There is a tournament where n players are participating. The players are standing in a single row and are numbered from 1 to n based on their initial standing position (player 1 is the first player in the row, player 2 is the second player in the row, etc.).
// The tournament consists of multiple rounds (starting from round number 1). In each round, the ith player from the front of the row competes against the ith player from the end of the row, and the winner advances to the next round. When the number of players is odd for the current round, the player in the middle automatically advances to the next round.
// For example, if the row consists of players 1, 2, 4, 6, 7
// Player 1 competes against player 7.
// Player 2 competes against player 6.
// Player 4 automatically advances to the next round.
// After each round is over, the winners are lined back up in the row based on the original ordering assigned to them initially (ascending order).
// The players numbered firstPlayer and secondPlayer are the best in the tournament. They can win against any other player before they compete against each other. If any two other players compete against each other, either of them might win, and thus you may choose the outcome of this round.
// Given the integers n, firstPlayer, and secondPlayer, return an integer array containing two values, the earliest possible round number and the latest possible round number in which these two players will compete against each other, respectively.

// Example 1:
// Input: n = 11, firstPlayer = 2, secondPlayer = 4
// Output: [3,4]
// Explanation:
// One possible scenario which leads to the earliest round number:
// First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
// Second round: 2, 3, 4, 5, 6, 11
// Third round: 2, 3, 4
// One possible scenario which leads to the latest round number:
// First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
// Second round: 1, 2, 3, 4, 5, 6
// Third round: 1, 2, 4
// Fourth round: 2, 4

// Example 2:
// Input: n = 5, firstPlayer = 1, secondPlayer = 5
// Output: [1,1]
// Explanation: The players numbered 1 and 5 compete in the first round.
// There is no way to make them compete in any other round.

// https://leetcode.com/problems/the-earliest-and-latest-rounds-where-players-compete/solutions/5936208/beats-100-on-runtime-and-memory-explained/?envType=daily-question&envId=2025-07-12
function earliestAndLatest(
  n: number,
  firstPlayer: number,
  secondPlayer: number,
): number[] {
  let earliest = n; // init the earlist round to the maximum possible
  let latest = 0; // init the latest round to 0

  const visited: Set<number> = new Set(); // track visited game states

  // recursive function to simulate rounds
  const findRounds = (
    remain: number,
    players: number[],
    currentIndex: number,
    round: number,
  ) => {
    // if this state has already been visited, return early
    if (visited.has(remain)) return;

    const player = players[currentIndex]; // current player in the matchup
    const opponent = players[players.length - currentIndex]; // opponent player from the othe end

    // if firstPlayer and secondPlayer face each other, update earliest and latest round numbers
    if (
      (player === firstPlayer && opponent === secondPlayer) ||
      (player === secondPlayer && opponent === firstPlayer)
    ) {
      earliest = Math.min(earliest, round);
      latest = Math.max(latest, round);
      return;
    }

    // if all matchups are completed for this round, move to next round
    if (opponent <= player) {
      const nextPlayers = players.filter((p) => remain & (1 << p)); // filter advancing players
      findRounds(remain, nextPlayers, 1, round + 1); // Recurse for the next round
      return;
    }

    // simulate both outcomes where player or opponent wins
    const remainIfPlayerWins = remain ^ (1 << opponent); // Player wins, opponent eliminated
    const remainIfOpponentWins = remain ^ (1 << player); // Opponent wins, player eliminated
    const nextIndex = currentIndex + 1;

    // Recursion based on which player is important
    if (player === firstPlayer || player === secondPlayer) {
      findRounds(remainIfPlayerWins, players, nextIndex, round);
      return;
    }
    if (opponent === firstPlayer || opponent === secondPlayer) {
      findRounds(remainIfOpponentWins, players, nextIndex, round);
      return;
    }

    // Recurse for both outcomes
    findRounds(remainIfPlayerWins, players, nextIndex, round);
    findRounds(remainIfOpponentWins, players, nextIndex, round);

    // Mark the current state as visited
    visited.add(remain);
  };

  // create a list of players (1-indexed)
  const players: number[] = Array.from({ length: n + 1 }, (_, i) => i);

  // bitmask to represent all players remaining
  // left shift operator (<<) is a binary operator that shifts bits of the number to the left and fills 0 on voids left as a result.
  // so (1 << (n + 1)) means 2^(n+1)
  // -1 is to exclude the 0th player (the first player is 1-indexed)
  const ALL_PLAYERS_REMAIN = (1 << (n + 1)) - 1;

  // start the search from the first round
  findRounds(ALL_PLAYERS_REMAIN, players, 1, 1);

  // Return the earliest and latest round where the two players meet
  return [earliest, latest];
}

// Editorial
function earliestAndLatest2(
  n: number,
  firstPlayer: number,
  secondPlayer: number,
): number[] {
  const F = Array.from({ length: 30 }, () =>
    Array.from({ length: 30 }, () => Array(30).fill(0)),
  );
  const G = Array.from({ length: 30 }, () =>
    Array.from({ length: 30 }, () => Array(30).fill(0)),
  );

  function dp(n: number, f: number, s: number): [number, number] {
    if (F[n][f][s]) {
      return [F[n][f][s], G[n][f][s]];
    }
    if (f + s === n + 1) {
      return [1, 1];
    }

    // F(n,f,s)=F(n,n+1-s,n+1-f)
    if (f + s > n + 1) {
      const [x, y] = dp(n, n + 1 - s, n + 1 - f);
      F[n][f][s] = x;
      G[n][f][s] = y;
      return [x, y];
    }

    let earliest = Infinity;
    let latest = -Infinity;
    const n_half = Math.floor((n + 1) / 2);

    if (s <= n_half) {
      // On the left or in the middle
      for (let i = 0; i < f; i++) {
        for (let j = 0; j < s - f; j++) {
          const [x, y] = dp(n_half, i + 1, i + j + 2);
          earliest = Math.min(earliest, x);
          latest = Math.max(latest, y);
        }
      }
    } else {
      // s on the right
      const s_prime = n + 1 - s;
      const mid = Math.floor((n - 2 * s_prime + 1) / 2);
      for (let i = 0; i < f; i++) {
        for (let j = 0; j < s_prime - f; j++) {
          const [x, y] = dp(n_half, i + 1, i + j + mid + 2);
          earliest = Math.min(earliest, x);
          latest = Math.max(latest, y);
        }
      }
    }

    F[n][f][s] = earliest + 1;
    G[n][f][s] = latest + 1;
    return [F[n][f][s], G[n][f][s]];
  }

  // F(n,f,s) = F(n,s,f)
  if (firstPlayer > secondPlayer) {
    [firstPlayer, secondPlayer] = [secondPlayer, firstPlayer];
  }

  const [earliest, latest] = dp(n, firstPlayer, secondPlayer);
  return [earliest, latest];
}
