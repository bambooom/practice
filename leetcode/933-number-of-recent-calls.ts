// https://leetcode.com/problems/number-of-recent-calls/

// Input
// ["RecentCounter", "ping", "ping", "ping", "ping"]
// [[], [1], [100], [3001], [3002]]
// Output
// [null, 1, 2, 3, 3]
// Explanation
// RecentCounter recentCounter = new RecentCounter();
// recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
// recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
// recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
// recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3

class RecentCounter {
  queue: number[];
  // Initializes the counter with zero recent requests.
  constructor() {
    this.queue = [];
  }

  // Adds a new request at time t, where t represents some time in milliseconds,
  // and returns the number of requests that has happened in the past 3000 milliseconds(including the new request).
  // Specifically, return the number of requests that have happened in the inclusive range[t - 3000, t].
  ping(t: number): number {
    this.queue.push(t);

    while (this.queue[0] < t - 3000) {
      this.queue.shift();
    }

    return this.queue.length;
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
