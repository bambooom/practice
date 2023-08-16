// Input: actions = ["Calculator", "add", "subtract", "getResult"], values = [10, 5, 7]
// Output: 8
// Explanation:
//  new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8

class Calculator {
  private value: number;
  constructor(value: number) {
    this.value = value;
  }

  add(value: number): Calculator {
    this.value += value;
    return this;
  }

  subtract(value: number): Calculator {
    this.value -= value;
    return this;
  }

  multiply(value: number): Calculator {
    this.value *= value;
    return this;
  }

  divide(value: number): Calculator {
    if (value === 0) {
      throw Error('Division by zero is not allowed');
    }
    this.value /= value;
    return this;
  }

  power(value: number): Calculator {
    this.value = Math.pow(this.value, value);
    return this;
  }

  getResult(): number {
    return this.value;
  }
}
