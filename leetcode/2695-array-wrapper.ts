class ArrayWrapper {
  nums: number[];
  constructor(nums: number[]) {
    this.nums = nums;
  }

  valueOf() {
    return this.nums.reduce((cum, cur) => cum + cur, 0);
  }

  toString() {
    return JSON.stringify(this.nums);
  }
}

const obj1 = new ArrayWrapper([1, 2]);
const obj2 = new ArrayWrapper([3, 4]);
console.log(obj1 + obj2); // 10
String(obj1); // "[1,2]"
String(obj2); // "[3,4]"

// JavaScript does provide methods, specifically valueOf() and toString(), that influence how objects interact with operators.

const obj = {
  // These methods provide a mechanism to influence JavaScript's built-in type conversion
  // The valueOf() method in JavaScript is an inbuilt function that returns the primitive value of a specified object.
  // By default, the valueOf() method is inherited by every object descended from Object.
  // This method can be used with Number, Boolean, Object, String, and Date objects.

  // When JavaScript tries to convert an object to a primitive value (e.g., during mathematical operations), it first calls the valueOf() method on the object.
  // If valueOf() does not return a primitive value, JavaScript proceeds to call the toString() method.
  // Therefore, by overwriting the valueOf() method, you can control how an object behaves in mathematical operations, thereby emulating operator overloading to a certain extent.
  valueOf: function () {
    return 5;
  },
  toString: function () {
    return 'Hello';
  },
};

console.log(obj + 2); //  7 - due to obj.valueOf()
console.log(String(obj)); // 'Hello' - due to obj.toString()

// example
// Define a constructor function for MyNumber
function MyNumber(number: number) {
  this.number = number;
}

// Adding a valueOf method to the MyNumber prototype
MyNumber.prototype.valueOf = function () {
  return this.number * 2;
};

// Let's create an instance of MyNumber
const myNumberInstance = new MyNumber(5);

console.log(myNumberInstance + 1); // Will output 11, not 6
