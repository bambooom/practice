// https://leetcode.com/problems/divide-chocolate/
// You have one chocolate bar that consists of some chunks. Each chunk has its own sweetness given by the array sweetness.
// You want to share the chocolate with your k friends so you start cutting the chocolate bar into k + 1 pieces using k cuts, each piece consists of some consecutive chunks.
// Being generous, you will eat the piece with the minimum total sweetness and give the other pieces to your friends.
// Find the maximum total sweetness of the piece you can get by cutting the chocolate bar optimally.

// Example 1:
// Input: sweetness = [1,2,3,4,5,6,7,8,9], k = 5
// Output: 6
// Explanation: You can divide the chocolate to [1,2,3], [4,5], [6], [7], [8], [9]

// Example 2:
// Input: sweetness = [5,6,7,8,9,1,2,3,4], k = 8
// Output: 1
// Explanation: There is only one way to cut the bar into 9 pieces.

// Example 3:
// Input: sweetness = [1,2,2,1,2,2,1,2,2], k = 2
// Output: 5
// Explanation: You can divide the chocolate to [1,2,2], [1,2,2], [1,2,2]

// https://leetcode.com/problems/divide-chocolate/solutions/5220990/maximizing-sweetness-using-binary-search/?envType=study-plan-v2&envId=premium-algo-100
// binary search

function maximizeSweetness(sweetness: number[], k: number): number {
  // define check function: determine if it is possible to divide the array into k + 1 pieces
  // with each piece having at least minSweetness.
  // iterate until reaches or exceeds minSweetness
  // the goal is to ensure we have at most k + 1 pieces

  const check = (minSweetness: number): boolean => {
    let sum = 0;
    let pieces = 0;

    for (let i = 0; i < sweetness.length; i++) {
      sum += sweetness[i];

      if (sum >= minSweetness) {
        sum = 0;
        pieces++;
      }
    }

    return pieces <= k;
  };

  let left = 0;
  let right = sweetness.reduce((a, e) => a + e, 0);
  // binary searh: get middle point mid, check if mid is a valid mininum sweetness
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (check(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left - 1;
}
