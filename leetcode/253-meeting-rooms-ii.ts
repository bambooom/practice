// https://leetcode.com/problems/meeting-rooms-ii/

function minMeetingRooms(intervals: number[][]): number {
  // 先按照 start time 排序
  intervals.sort((a, b) => a[0] - b[0]);

  const result = intervals.reduce((a: number[][], c: number[]) => {
    // 找当前的 start time 比 累积的 end time 大的房间
    const roomIndex = a.findIndex((val) => c[0] >= val[1]);
    if (roomIndex < 0) {
      a.push(c); // 不存在，就需要新建一个房间，所以 push 到 accumulated 结果中
    } else {
      a[roomIndex][1] = c[1]; // 存在，就更新这个房间的 end time
    }
    return a;
  }, []);

  return result.length;
}

//https://leetcode.com/problems/meeting-rooms-ii/solutions/4316040/simple-javasript-typescript-without-heap-priority-queue-o-nlogn/?envType=study-plan-v2&envId=premium-algo-100
function minMeetingRooms2(intervals: number[][]): number {
  const n = intervals.length;
  const startTimes = intervals.map((intv) => intv[0]).sort((a, b) => a - b);
  const endTimes = intervals.map((intv) => intv[1]).sort((a, b) => a - b);

  // by default we start after the start of first interval
  let minRooms = 1;
  let currRooms = 1;
  let sIdx = 1,
    eIdx = 0;

  while (sIdx < n) {
    // find next key time
    if (startTimes[sIdx] < endTimes[eIdx]) {
      // once any meeting is started, we add one room
      sIdx++;
      currRooms++;
      minRooms = Math.max(minRooms, currRooms);
    } else {
      // once any meeting is finished, we remove one room
      eIdx++;
      currRooms--;
    }
  }

  return minRooms;
}
