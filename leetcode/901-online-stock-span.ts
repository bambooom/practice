// https://leetcode.com/problems/online-stock-span/
// Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.
// The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.
// For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days.
// Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.

// https://leetcode.com/problems/online-stock-span/solutions/4208704/monotoic-stack-solution-with-step-by-step-explanation/?envType=study-plan-v2&envId=leetcode-75
// Idea: we create monotoic stack that will be storing [price, span] array, and when we initialize it in constructor with [0, 0], in next method we declare span and set it to 1, next we check if our stack have elements and if top element ptice which is at 0 index are less or equals to current price, if true we add span of this element at index 1 to current span, and pop this element from stack, we repeat those steps until stack is empty or top most element in stack are bigger than current price, if true then we push current [price, span] into stack and return span
class StockSpanner {
  // declare private field stack
  private stack: [[number, number]];
  constructor() {
    // initialize stack
    this.stack = [[0, 0]];
  }

  //  Returns the span of the stock's price given that today's price is price.
  next(price: number): number {
    // declare span and set its value to 1
    let span = 1;
    // iterate in while loop over stack wuntil it has elements and topmost price in stack are less or equals to current price
    while (
      this.stack.length > 0 &&
      this.stack[this.stack.length - 1][0] <= price
    ) {
      // add stack top price span to current span
      span += this.stack[this.stack.length - 1][1];
      // pop element from stack
      this.stack.pop();
    }
    // push current price and span as array into stack
    this.stack.push([price, span]);
    // return current span
    return span;
  }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
