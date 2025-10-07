// https://leetcode.com/problems/avoid-flood-in-the-city
// Your country has an infinite number of lakes. Initially, all the lakes are empty, but when it rains over the nth lake, the nth lake becomes full of water. If it rains over a lake that is full of water, there will be a flood. Your goal is to avoid floods in any lake.
// Given an integer array rains where:
// rains[i] > 0 means there will be rains over the rains[i] lake.
// rains[i] == 0 means there are no rains this day and you can choose one lake this day and dry it.
// Return an array ans where:
// ans.length == rains.length
// ans[i] == -1 if rains[i] > 0.
// ans[i] is the lake you choose to dry in the ith day if rains[i] == 0.
// If there are multiple valid answers return any of them. If it is impossible to avoid flood return an empty array.
// Notice that if you chose to dry a full lake, it becomes empty, but if you chose to dry an empty lake, nothing changes.

// Example 1:
// Input: rains = [1,2,3,4]
// Output: [-1,-1,-1,-1]
// Explanation: After the first day full lakes are [1]
// After the second day full lakes are [1,2]
// After the third day full lakes are [1,2,3]
// After the fourth day full lakes are [1,2,3,4]
// There's no day to dry any lake and there is no flood in any lake.

// Example 2:
// Input: rains = [1,2,0,0,2,1]
// Output: [-1,-1,2,1,-1,-1]
// Explanation: After the first day full lakes are [1]
// After the second day full lakes are [1,2]
// After the third day, we dry lake 2. Full lakes are [1]
// After the fourth day, we dry lake 1. There is no full lakes.
// After the fifth day, full lakes are [2].
// After the sixth day, full lakes are [1,2].
// It is easy that this scenario is flood-free. [-1,-1,1,2,-1,-1] is another acceptable scenario.

// Example 3:
// Input: rains = [1,2,0,1,2]
// Output: []
// Explanation: After the second day, full lakes are  [1,2]. We have to dry one lake in the third day.
// After that, it will rain over lakes [1,2]. It's easy to prove that no matter which lake you choose to dry in the 3rd day, the other one will flood.

// Constraints:
// 1 <= rains.length <= 10^5
// 0 <= rains[i] <= 10^9

// https://leetcode.com/problems/avoid-flood-in-the-city/solutions/3924837/typescript-solution-o-n-log-n-beats-100-time-and-space/?envType=daily-question&envId=2025-10-07
function avoidFlood(rains: number[]): number[] {
  // Map to store the index of the last time a lake was filled
  const filledLakes = new Map<number, number>(); // key is lake, value is index
  // Array to store the indices of dry days
  const dryDays: number[] = []; // index of dry days
  const result: number[] = []; // result array

  // Helper function to find the first index greater than a given number in an array
  // binary search
  const getFirstIndexGreater = (
    arr: number[],
    k: number,
  ): number | undefined => {
    if (arr.length === 0) return undefined;
    if (k > arr[arr.length - 1]) return undefined; // k is greater than all elements in arr

    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
      const mid = low + Math.floor((high - low) / 2);
      if (arr[mid] > k) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return low;
  };

  for (let i = 0; i < rains.length; i++) {
    // If it's a dry day, add the index to dryDays and set the result to 1
    if (rains[i] === 0) {
      dryDays.push(i); // store index of dry days
      result.push(1); //
    } else {
      // If the lake is not full, fill it and add -1 to the result
      if (!filledLakes.has(rains[i])) {
        result.push(-1);
        filledLakes.set(rains[i], i);
      } else {
        // If the lake is already full, find the first dry day after the current one
        const dryIndex = getFirstIndexGreater(
          dryDays,
          filledLakes.get(rains[i])!,
        );

        if (dryIndex !== undefined) {
          // If a dry day exists, mark it as filled, update the result, and remove it from dryDays
          const [dryDay] = dryDays.splice(dryIndex, 1);
          result[dryDay] = rains[i];
          filledLakes.set(rains[i], i);
          result.push(-1);
        } else {
          // If no dry day exists, it's impossible to avoid flooding, so return an empty array
          return [];
        }
      }
    }
  }

  return result;
}
