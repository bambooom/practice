// https://leetcode.com/problems/koko-eating-bananas/
// Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.
// Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.
// Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
// Return the minimum integer k such that she can eat all the bananas within h hours.

// #binary-search
function minEatingSpeed(piles: number[], h: number): number {
  //helper function to calculate, for a given bananaCount consumed per hour, can koko finish all the banana from the piles
  const canFinish = (bananaCount: number) => {
    const hoursTakenToEat = piles.reduce(
      (acc, curr) => (acc += Math.ceil(curr / bananaCount)),
      0,
    );
    return hoursTakenToEat <= h;
  };

  //in an hour minimum banana koko can eat
  let min = 1;
  //in an hour maximum banana koko can eat
  let max: number = piles.reduce((acc, curr) => Math.max(curr, acc), 0);
  // do binary search
  while (min < max) {
    const k: number = Math.floor((max - min) / 2) + min;

    if (canFinish(k)) max = k;
    else min = k + 1;
  }

  //min & max would be equal this time, return either
  return min;
}
