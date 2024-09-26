// https://leetcode.com/problems/my-calendar-i/
// You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.
// A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).
// The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.

// Implement the MyCalendar class:
// MyCalendar() Initializes the calendar object.
// boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.

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

// this seems faster than previous
class MyCalendar3 {
  private booked: number[][];
  constructor() {
    this.booked = [];
  }

  book(start: number, end: number): boolean {
    if (this.booked.filter((e) => e[0] < end && e[1] > start).length !== 0)
      return false;
    this.booked.push([start, end]);
    return true;
  }
}

// Tree, seems fastest solution
class CalendarNode {
  private _start: number;
  private _end: number;
  private _left: CalendarNode | null;
  private _right: CalendarNode | null;

  constructor(start: number, end: number) {
    this._start = start;
    this._end = end;
    this._left = null;
    this._right = null;
  }

  public add(start: number, end: number): boolean {
    if (start >= this._end) {
      if (!this._right) {
        this._right = new CalendarNode(start, end);
        return true;
      }
      return this._right.add(start, end);
    } else if (end <= this._start) {
      if (!this._left) {
        this._left = new CalendarNode(start, end);
        return true;
      }
      return this._left.add(start, end);
    }
    return false;
  }
}

class MyCalendar4 {
  private root: CalendarNode | null;
  constructor() {
    this.root = null;
  }

  book(start: number, end: number): boolean {
    if (!this.root) {
      this.root = new CalendarNode(start, end);
      return true;
    }
    return this.root.add(start, end);
  }
}
