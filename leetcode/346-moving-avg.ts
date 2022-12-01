// https://leetcode.com/problems/moving-average-from-data-stream/
// Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

class MovingAverage {
  private _win: number[];
  private _size: number;
  constructor(size: number) {
    this._win = [];
    this._size = size;
  }

  next(val: number): number {
    this._win.push(val);
    if (this._win.length > this._size) {
      this._win.shift();
    }

    return this._win.reduce((acc, cur) => acc + cur, 0) / this._win.length;
  }
}

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */
