// https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes/
// You are given a string s consisting of the characters 'N', 'S', 'E', and 'W', where s[i] indicates movements in an infinite grid:
// 'N' : Move north by 1 unit.
// 'S' : Move south by 1 unit.
// 'E' : Move east by 1 unit.
// 'W' : Move west by 1 unit.
// Initially, you are at the origin (0, 0). You can change at most k characters to any of the four directions.
// Find the maximum Manhattan distance from the origin that can be achieved at any time while performing the movements in order.
// The Manhattan Distance between two cells (xi, yi) and (xj, yj) is |xi - xj| + |yi - yj|.

// Example 1:
// Input: s = "NWSE", k = 1
// Output: 3
// Explanation:
// Change s[2] from 'S' to 'N'. The string s becomes "NWNE".
// Movement	    Position(x, y)	  Manhattan Distance	Maximum
// s[0] == 'N'	(0, 1)	          0 + 1 = 1	           1
// s[1] == 'W'	(-1, 1)	          1 + 1 = 2	           2
// s[2] == 'N'	(-1, 2)	          1 + 2 = 3	           3
// s[3] == 'E'	(0, 2)	          0 + 2 = 2	           3
// The maximum Manhattan distance from the origin that can be achieved is 3. Hence, 3 is the output.

// Example 2:
// Input: s = "NSWWEW", k = 3
// Output: 6
// Explanation:
// Change s[1] from 'S' to 'N', and s[4] from 'E' to 'W'. The string s becomes "NNWWWW".
// The maximum Manhattan distance from the origin that can be achieved is 6. Hence, 6 is the output.

// When we try to modify the letters in the string, there are three possible cases:
// - Modifying the letters that appear less frequently (but are not zero) in either the horizontal or vertical direction increases the Manhattan distance by 2.
// - Modifying the letters that appear more frequently in either direction decreases the Manhattan distance by 2.
// - If no modifications are made, the Manhattan distance remains unchanged.

// Step 1: Modify the letters with fewer occurrences in the vertical direction. If the number of such letters exceeds k, then modify only k of them, and set the remaining modification count to t=0. If the number of such letters is less than or equal to k, then modify all of them and set the remaining modification count to t.
// Step 2: Modify the letters with fewer occurrences in the horizontal direction. If the number of such letters exceeds t, then modify only t of them; otherwise, modify all of them.

// Therefore, if we treat the less frequent letters in both the vertical and horizontal directions as a single group, we can reason as follows:
// If the total number of such letters is greater than k, then modifying any k of them increases the Manhattan distance by 2×k.
// If the total number is less than or equal to k, then all the less frequent letters in both directions will be modified, and no further modifications are necessary. In this case, the Manhattan distance becomes equal to the length of the string.
function maxDistance(s: string, k: number): number {
  let latitude = 0;
  let longitude = 0;
  let ans = 0;

  const n = s.length;

  for (let i = 0; i < n; i++) {
    switch (s[i]) {
      case 'N':
        latitude++;
        break;
      case 'S':
        latitude--;
        break;
      case 'E':
        longitude++;
        break;
      case 'W':
        longitude--;
        break;
      default:
        break;
    }

    ans = Math.max(
      ans,
      Math.min(Math.abs(latitude) + Math.abs(longitude) + k * 2, i + 1),
    );
  }

  return ans;
}

// https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes/solutions/6398046/java-javascript-typescript-c-c-kotlin-go-solution/?envType=daily-question&envId=2025-06-20
function maxDistance2(moves: string, maxChange: number): number {
  let eastDistance = 0;
  let westDistance = 0;
  let southDistance = 0;
  let northDistance = 0;

  let maxDistance = 0;

  function getMaxIncreaseInDistance(maxChange: number): number {
    const distanceIncrease =
      Math.min(eastDistance, westDistance) +
      Math.min(southDistance, northDistance);
    return 2 * Math.min(distanceIncrease, maxChange);
  }

  for (const move of moves) {
    switch (move) {
      case 'E':
        eastDistance++;
        break;
      case 'W':
        westDistance++;
        break;
      case 'S':
        southDistance++;
        break;
      case 'N':
        northDistance++;
    }
    maxDistance = Math.max(
      maxDistance,
      Math.abs(eastDistance - westDistance) +
        Math.abs(southDistance - northDistance) +
        getMaxIncreaseInDistance(maxChange),
    );
  }
  return maxDistance;
}
