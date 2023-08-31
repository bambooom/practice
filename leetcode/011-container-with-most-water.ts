// https://leetcode.com/problems/container-with-most-water/
// #two-pointer

// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
// Find two lines that together with the x-axis form a container, such that the container contains the most water.
// Return the maximum amount of water a container can store.
// Notice that you may not slant the container.

// We take two pointers, one at the beginning and one at the end of the array constituting the length of the lines.
// Futher, we maintain a variable maxarea to store the maximum area obtained till now.
// At every step, we find out the area formed between them, update maxarea and move the pointer pointing to the shorter line
// towards the other end by one step.
function maxArea(height: number[]): number {
  let area = 0;
  let left = 0;
  let right: number = height.length - 1;

  while (left < right) {
    const distance = right - left;
    const h = Math.min(height[left], height[right]);

    area = Math.max(area, distance * h);
    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return area;
}
