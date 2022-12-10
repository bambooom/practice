// https://leetcode.com/problems/my-calendar-i/

class MyCalendar {
  private booked: number[][];
  constructor() {
    this.booked = [];
  }

  book(start: number, end: number): boolean {
    if (this.booked.length === 0) {
      this.booked.push([start, end]);
      return true;
    }
    // let low = 0;
    // let high = this.booked.length - 1;
    // while (low < high) {
    //   const mid = Math.floor((low + high) / 2);
    //   if (this.booked[mid][0] === start) {
    //     return false;
    //   } else if (this.booked[mid][0] < start) {
    //     low = mid + 1;
    //   } else {
    //     high = mid - 1;
    //   }
    // }

    for (const event of this.booked) {
      if (checkIntersect(event, [start, end])) {
        return false;
      }
    }
    this.booked.push([start, end]);
    return true;
  }
}

function checkIntersect([start1, end1]: number[], [start2, end2]: number[]) {
  const maxStart = Math.max(start1, start2);
  const minEnd = Math.min(end1, end2);

  return maxStart < minEnd;
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

// ============= use binary search

class MyCalendar2 {
  private booked: number[][];
  constructor() {
    this.booked = [];
  }

  book(start: number, end: number): boolean {
    let low = 0;
    let high = this.booked.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (checkIntersect(this.booked[mid], [start, end])) {
        return false;
      } else if (this.booked[mid][1] <= start) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (low > 0 && checkIntersect([start, end], this.booked[low - 1]))
      return false;

    this.booked.push([start, end]);
    this.booked.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    return true;
  }
}
