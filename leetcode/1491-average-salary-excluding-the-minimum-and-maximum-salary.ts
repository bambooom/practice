// https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/
// You are given an array of unique integers salary where salary[i] is the salary of the i-th employee.
// Return the average salary of employees excluding the minimum and maximum salary. Answers within 10^-5 of the actual answer will be accepted.

function average(salary: number[]): number {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  let sum = 0;
  const len = salary.length;

  for (let i = 0; i < len; i++) {
    min = Math.min(min, salary[i]);
    max = Math.max(max, salary[i]);
    sum += salary[i];
  }

  return (sum - min - max) / (len - 2);
}

function average2(salary: number[]): number {
  const x: number[] = salary.sort((a, b) => a - b).slice(1, -1);
  return x.reduce((a, b) => a + b) / x.length;
}
