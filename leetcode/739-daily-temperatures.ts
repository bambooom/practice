// https://leetcode.com/problems/daily-temperatures/
// Monotonic Stack

// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.
// Example 1:
// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]

// Example 2:
// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]

// Example 3:
// Input: temperatures = [30,60,90]
// Output: [1,1,0]

// https://leetcode.com/problems/daily-temperatures/solutions/1501339/typescript-stack-solution-without-stack-solution/?envType=study-plan-v2&envId=leetcode-75
// with stack
function dailyTemperatures(temperatures: number[]): number[] {
  const t = temperatures;
  const answer: number[] = new Array(t.length).fill(0);
  const stack: number[] = [];

  if (t.length <= 1) return answer;

  for (let i = 0; i < t.length; i++) {
    while (t[stack[stack.length - 1]] < t[i]) {
      const top = stack.pop()!;
      answer[top] = i - top;
    }
    stack.push(i);
  }
  return answer;
}
