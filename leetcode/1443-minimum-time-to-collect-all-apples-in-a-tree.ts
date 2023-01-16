// https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/

// Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,true,true,false]
// Output: 8
// Explanation: The figure above represents the given tree where red vertices have an apple. One optimal path to collect all apples is shown by the green arrows.

// https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/solutions/2864715/minimum-time-to-collect-all-apples-in-a-tree/?orderBy=most_votes

function minTime(n: number, edges: number[][], hasApple: boolean[]): number {
  const parentMap = new Map<number, number>();
  let answer = 0;
  for (let i = 0; i < edges.length; i++) {
    parentMap.set(edges[i][1], edges[i][0]);
  }
  for (let i = 0; i < hasApple.length; i++) {
    if (hasApple[i]) {
      let pointer = i;
      while (pointer !== 0) {
        const parent = parentMap.get(pointer) as number;
        answer += 2;
        if (hasApple[parent]) {
          break;
        }
        hasApple[parent] = true;
        pointer = parent;
      }
    }
  }
  return answer;
}
