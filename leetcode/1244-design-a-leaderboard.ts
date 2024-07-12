// https://leetcode.com/problems/design-a-leaderboard
// Design a Leaderboard class, which has 3 functions:

// addScore(playerId, score): Update the leaderboard by adding score to the given player's score. If there is no player with such id in the leaderboard, add him to the leaderboard with the given score.
// top(K): Return the score sum of the top K players.
// reset(playerId): Reset the score of the player with the given id to 0 (in other words erase it from the leaderboard). It is guaranteed that the player was added to the leaderboard before calling this function.
// Initially, the leaderboard is empty.

class Leaderboard {
  scores: Record<number, number>;
  constructor() {
    this.scores = {};
  }

  addScore(playerId: number, score: number): void {
    this.scores[playerId] = (this.scores[playerId] || 0) + score;
  }

  top(K: number): number {
    const arr = Object.values(this.scores).sort((a, b) => b - a);
    let sum = 0;
    let idx = 0;
    while (K--) {
      sum += arr[idx++];
    }

    return sum;
  }

  reset(playerId: number): void {
    delete this.scores[playerId];
  }
}

/**
 * Your Leaderboard object will be instantiated and called as such:
 * var obj = new Leaderboard()
 * obj.addScore(playerId,score)
 * var param_2 = obj.top(K)
 * obj.reset(playerId)
 */
