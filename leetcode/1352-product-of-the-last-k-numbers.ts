// https://leetcode.com/problems/product-of-the-last-k-numbers/description/
// Design an algorithm that accepts a stream of integers and retrieves the product of the last k integers of the stream.

// Example:
// Input
// ["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
// [[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]

// Output
// [null,null,null,null,null,null,20,40,0,null,32]

// Explanation
// ProductOfNumbers productOfNumbers = new ProductOfNumbers();
// productOfNumbers.add(3);        // [3]
// productOfNumbers.add(0);        // [3,0]
// productOfNumbers.add(2);        // [3,0,2]
// productOfNumbers.add(5);        // [3,0,2,5]
// productOfNumbers.add(4);        // [3,0,2,5,4]
// productOfNumbers.getProduct(2); // return 20. The product of the last 2 numbers is 5 * 4 = 20
// productOfNumbers.getProduct(3); // return 40. The product of the last 3 numbers is 2 * 5 * 4 = 40
// productOfNumbers.getProduct(4); // return 0. The product of the last 4 numbers is 0 * 2 * 5 * 4 = 0
// productOfNumbers.add(8);        // [3,0,2,5,4,8]
// productOfNumbers.getProduct(2); // return 32. The product of the last 2 numbers is 4 * 8 = 32

// straightforward, but slow
class ProductOfNumbers {
  stream: number[];
  // Initializes the object with an empty stream.
  constructor() {
    this.stream = [];
  }
  // Appends the integer num to the stream.
  add(num: number): void {
    this.stream.push(num);
  }
  // Returns the product of the last k numbers in the current list. You can assume that always the current list has at least k numbers.
  getProduct(k: number): number {
    let res = 1;
    for (let i = this.stream.length - 1; i > this.stream.length - k - 1; i--) {
      res *= this.stream[i];
    }
    return res;
  }
}

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */

// using prefix, faster
class ProductOfNumbers2 {
  private prefixProducts: number[];

  constructor() {
    this.prefixProducts = [1];
  }

  add(num: number): void {
    if (num === 0) {
      this.prefixProducts = [1];
    } else {
      this.prefixProducts.push(
        this.prefixProducts[this.prefixProducts.length - 1] * num,
      );
    }
  }

  getProduct(k: number): number {
    const n = this.prefixProducts.length - 1;
    if (k > n) {
      return 0;
    }
    return this.prefixProducts[n] / this.prefixProducts[n - k];
  }
}
