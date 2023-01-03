// https://leetcode.com/problems/trapping-rain-water/
// #two-pointer #dynamic-programming #stack
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// two-pointer
function trap(height: number[]): number {
  if (height == null || height.length === 0) return 0;
  let l = 0;
  let r = height.length - 1;
  let lMax = 0;
  let rMax = 0;
  let res = 0;

  while (l < r) {
    lMax = Math.max(lMax, height[l]);
    if (height[l] < lMax) {
      res += lMax - height[l];
    }

    rMax = Math.max(rMax, height[r]);
    if (height[r] < rMax) {
      res += rMax - height[r];
    }

    height[l] < height[r] ? l++ : r--;
  }

  return res;
}

/** 1) Brute force */
// time O(n^2)
// space O(1)
function trap2(height: number[]): number {
  if (height == null || height.length === 0) return 0;

  let res = 0;
  for (let i = 0; i < height.length; i++) {
    let lMax = 0;
    let rMax = 0;

    for (let j = 0; j < i; j++) {
      lMax = Math.max(lMax, height[j]);
    }
    for (let j = i + 1; j < height.length; j++) {
      rMax = Math.max(rMax, height[j]);
    }

    const water = Math.min(lMax, rMax) - height[i];
    if (water > 0) res += water;
  }

  return res;
}

/** 2) Dynamic programming */
// time O(n)
// space O(n)
function trap3(height: number[]): number {
  if (height == null || height.length === 0) return 0;

  let res = 0;
  const l = height.length;
  const lMax: { [key: number]: number } = {};
  const rMax: { [key: number]: number } = {};

  lMax[0] = height[0];
  for (let i = 1; i < l; i++) {
    lMax[i] = Math.max(height[i], lMax[i - 1]);
  }

  rMax[l - 1] = height[l - 1];
  for (let i = l - 2; i >= 0; i--) {
    rMax[i] = Math.max(height[i], rMax[i + 1]);
  }

  for (let i = 0; i < height.length; i++) {
    res += Math.min(lMax[i], rMax[i]) - height[i];
  }

  return res;
}

/** 3) Stack */
// time O(n)
// space O(n)
function trap4(height: number[]): number {
  let res = 0;
  let i = 0;
  const st = [];

  while (i < height.length) {
    while (st.length !== 0 && height[i] > height[st[st.length - 1]]) {
      const top = st[st.length - 1];
      st.pop();

      if (st.length === 0) break;

      const dist = i - st[st.length - 1] - 1;
      const h = Math.min(height[i], height[st[st.length - 1]]) - height[top];
      res += dist * h;
    }
    st.push(i);
    i++;
  }
  return res;
}
