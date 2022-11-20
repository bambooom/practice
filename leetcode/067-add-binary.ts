// Q: add 2 binary string, and return binary string
// Input: a = "11", b = "1"
// Output: '100'
// Input: a = "1010", b = "1011"
// Output: "10101"

function addBinary(a: string, b: string): string {
  return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
}

/**
 * BigInt is used to represent Integers greater than 2^53 -1.
(2^53) - 1 is the Maximum Number Primitive which can be safely represented using JavaScript.
This is represented by MAX_SAFE_INTEGER.
We coule use parseInt("number", base) to convert the arguments 'a' and 'b' from binary base to decimal base and then add them together.
But the problem here is, if we have integers, i.e a or b's binary value to be huge (that is if the numbers passed to a or b is really big which is more than 2^52 -1), then javascript can not process it as the max Number primitive it can work with safely is 2^53 -1 or lesser.

Therefore, we make use of BigInt to represent all kind of numbers, small to large Integers.
The BigInt object takes a String Integer literal as argument and then returns us a number which is of theBigInt datatype.

So, here we need to pass the string (which should be an Integer Literal), as whichever base it is currently represented as.
In our case we have 'a' and 'b' as binary numbers(strings).
We need to tell BigInt() that 'a' and 'b' are Binary numbers, so we append '0b' to the beginning of 'a' and 'b' and then pass them to BigInt().
Similarly, if we have Hexadecimal number we prefix '0x' and for Octal numbers we prefix '0o'.

Once we have converted our binary numbers 'a' and 'b' to BigInt datatype, we add them using normal addition (+) operator.

Now, we use the toString method to convert our BigInt number (sum calculated) to String which is a Binary, by passing the base we want to convert our argument to.
str.toString(2) converts the str string to Binary (base 2).

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
 */
