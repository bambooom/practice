// https://leetcode.com/problems/water-bottles
// There are numBottles water bottles that are initially full of water. You can exchange numExchange empty water bottles from the market with one full water bottle.
// The operation of drinking a full water bottle turns it into an empty bottle.
// Given the two integers numBottles and numExchange, return the maximum number of water bottles you can drink.

function numWaterBottles(numBottles: number, numExchange: number): number {
  let max = numBottles;
  while (numBottles >= numExchange) {
    max++;
    numBottles = numBottles - numExchange + 1; // plus 1 is the bottle just exchanged
  }
  return max;
}

function numWaterBottles2(numBottles: number, numExchange: number): number {
  let result = numBottles;
  let d = Math.floor(numBottles / numExchange);
  let r = numBottles - d * numExchange;
  for (;;) {
    if (d === 0) {
      break;
    }
    result += d;
    const n = d + r;
    d = Math.floor(n / numExchange);
    r = n - d * numExchange;
  }
  return result;
}
