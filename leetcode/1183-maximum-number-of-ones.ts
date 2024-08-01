// https://leetcode.com/problems/maximum-number-of-ones
// Consider a matrix M with dimensions width * height, such that every cell has value 0 or 1, and any square sub-matrix of M of size sideLength * sideLength has at most maxOnes ones.
// Return the maximum possible number of ones that the matrix M can have.

// Example 1:

// Input: width = 3, height = 3, sideLength = 2, maxOnes = 1
// Output: 4
// Explanation:
// In a 3*3 matrix, no 2*2 sub-matrix can have more than 1 one.
// The best solution that has 4 ones is:
// [1,0,1]
// [0,0,0]
// [1,0,1]
// Example 2:

// Input: width = 3, height = 3, sideLength = 2, maxOnes = 2
// Output: 6
// Explanation:
// [1,0,1]
// [1,0,1]
// [1,0,1]

// https://leetcode.com/problems/maximum-number-of-ones/solutions/3985787/typescript-concise-o-1-solution/
function maximumNumberOfOnes(
  width: number,
  height: number,
  sideLength: number,
  maxOnes: number,
): number {
  let temp: number;

  // make sure width >= height
  if (width < height) {
    temp = width;
    width = height;
    height = temp;
  }

  const modH = height % sideLength;
  const divH = (height - modH) / sideLength;
  const modW = width % sideLength;
  const divW = (width - modW) / sideLength;

  // add ones in full squares
  let count = maxOnes * divH * divW;

  // add ones in top left section of all incomplete squares
  temp = Math.min(maxOnes, modH * modW);
  count += temp * (1 + divH + divW);
  maxOnes -= temp;

  // add ones in remaining section of bottom incomplete squares
  temp = Math.min(maxOnes, modH * (sideLength - modW));
  count += temp * divW;
  maxOnes -= temp;

  // add ones in remaining section of right incomplete squares
  temp = Math.min(maxOnes, modW * (sideLength - modH));
  count += temp * divH;

  return count;
}
