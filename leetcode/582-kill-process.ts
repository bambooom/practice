// https://leetcode.com/problems/kill-process/
// You have n processes forming a rooted tree structure. You are given two integer arrays pid and ppid, where pid[i] is the ID of the ith process and ppid[i] is the ID of the ith process's parent process.
// Each process has only one parent process but may have multiple children processes. Only one process has ppid[i] = 0, which means this process has no parent process (the root of the tree).
// When a process is killed, all of its children processes will also be killed.
// Given an integer kill representing the ID of a process you want to kill, return a list of the IDs of the processes that will be killed. You may return the answer in any order.

// https://leetcode.com/problems/kill-process/solutions/103184/short-javascript-solution-using-dfs/?envType=study-plan-v2&envId=premium-algo-100
function killProcess(pid: number[], ppid: number[], kill: number): number[] {
  const parents: Record<number, number[]> = {}; // key is parents id, value is the array of its children
  for (let i = 0; i < ppid.length; i++) {
    parents[ppid[i]] = parents[ppid[i]] || [];
    parents[ppid[i]].push(pid[i]);
  }
  const res: number[] = [];

  const dfs = (
    parents: Record<number, number[]>,
    kill: number,
    res: number[],
  ) => {
    res.push(kill);
    if (!parents[kill]) return;
    // if it has children, then push to kill
    for (const pid of parents[kill]) {
      dfs(parents, pid, res);
    }
  };

  dfs(parents, kill, res);
  return res;
}
