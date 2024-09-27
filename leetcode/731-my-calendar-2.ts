// https://leetcode.com/problems/my-calendar-ii
// You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a triple booking.
// A triple booking happens when three events have some non-empty intersection (i.e., some moment is common to all the three events.).
// The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.

// Implement the MyCalendarTwo class:
// MyCalendarTwo() Initializes the calendar object.
// boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a triple booking. Otherwise, return false and do not add the event to the calendar.

// Example 1:

// Input
// ["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
// [[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
// Output
// [null, true, true, true, false, true, true]

// Explanation
// MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
// myCalendarTwo.book(10, 20); // return True, The event can be booked.
// myCalendarTwo.book(50, 60); // return True, The event can be booked.
// myCalendarTwo.book(10, 40); // return True, The event can be double booked.
// myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
// myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
// myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.

// https://leetcode.com/problems/my-calendar-ii/solutions/5838118/99-beats-code-working-27-09-2024-python-explained/
class MyCalendarTwo {
  private events: number[];
  private overlaps: number[];
  constructor() {
    this.events = [0];
    this.overlaps = [0];
  }

  book(start: number, end: number): boolean {
    const bisect = (target: number): number => {
      let low = 0;
      let high = this.events.length - 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (this.events[mid] < target) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      if (low < this.events.length && this.events[low] === target) {
        return low;
      } else {
        this.events.splice(low, 0, target);
        this.overlaps.splice(low, 0, this.overlaps[low - 1]);
      }

      return low;
    };

    const left = bisect(start);
    const right = bisect(end);
    let i = 0;

    for (i = left; i < right; i++) {
      if (this.overlaps[i] === 2) {
        return false;
      }
    }

    if (i === right) {
      for (i = left; i < right; i++) {
        this.overlaps[i] += 1;
      }
    }

    return true;
  }
}

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */
