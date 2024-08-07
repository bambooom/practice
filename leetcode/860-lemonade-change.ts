// https://leetcode.com/problems/lemonade-change/
// At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.
// Note that you do not have any change in hand at first.
// Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide every customer with the correct change, or false otherwise.

function lemonadeChange(bills: number[]): boolean {
  if (bills.length === 0) return false;
  if (bills[0] !== 5) return false; // no change in hand first, so if the first one is not 5, then false

  const hash = new Map<number, number>();
  hash.set(5, 1); // first 5
  hash.set(10, 0);

  for (let i = 1; i < bills.length; i++) {
    if (bills[i] === 5) {
      // take 5 directly
      hash.set(5, (hash.get(5) as number) + 1);
    } else if (bills[i] === 10) {
      // when bill is 10, check if we have 5
      if (hash.get(5) === 0) {
        return false;
      } else {
        hash.set(10, (hash.get(10) as number) + 1);
        hash.set(5, (hash.get(5) as number) - 1);
      }
    } else if (bills[i] === 20) {
      // when bill is 20, check if we have 10+5 or 5*3
      if ((hash.get(10) as number) > 0 && (hash.get(5) as number) > 0) {
        hash.set(10, (hash.get(10) as number) - 1);
        hash.set(5, (hash.get(5) as number) - 1);
      } else if ((hash.get(5) as number) >= 3) {
        hash.set(5, (hash.get(5) as number) - 3);
      } else {
        return false;
      }
    }
  }

  return true;
}
