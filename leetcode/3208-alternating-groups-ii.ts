// https://leetcode.com/problems/alternating-groups-ii/
// #sliding-window
// There is a circle of red and blue tiles. You are given an array of integers colors and an integer k. The color of tile i is represented by colors[i]:
// colors[i] == 0 means that tile i is red.
// colors[i] == 1 means that tile i is blue.
// An alternating group is every k contiguous tiles in the circle with alternating colors (each tile in the group except the first and last one has a different color from its left and right tiles).
// Return the number of alternating groups.
// Note that since colors represents a circle, the first and the last tiles are considered to be next to each other

// Example 1:
// Input: colors = [0,1,0,1,0], k = 3
// Output: 3

// Example 2:
// Input: colors = [0,1,0,0,1,0,1], k = 6
// Output: 2

// Example 3:
// Input: colors = [1,1,0,1], k = 4
// Output: 0

// Sliding windows, only you need to circle the array. To do this, you can either duplicate k-1 elements to the end, or use the index mod k to access the elements. You can also use two pointers or a index and the width of the window.
function numberOfAlternatingGroups(colors: number[], k: number): number {
  const n = colors.length;
  let count = 0;
  for (let left = 0, right = 1; left < n; ++right) {
    if (colors[(right - 1) % n] === colors[right % n]) {
      left = right;
    }
    if (right - left < k - 1) {
      continue;
    }
    ++count;
    ++left;
  }
  return count;
}

// concat array
function numberOfAlternatingGroups2(colors: number[], k: number): number {
  colors.push(...colors.slice(0, k - 1));

  let count = 0;
  let left = 0;

  for (let right = 0; right < colors.length; right++) {
    if (right > 0 && colors[right] === colors[right - 1]) {
      left = right;
    }

    if (right - left + 1 >= k) {
      count++;
    }
  }

  return count;
}
