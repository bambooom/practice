// https://leetcode.com/problems/multiply-strings/

/**
 * Algorithm: Sum the products from all pairs of digits

1. Reverse both numbers.
2. Initialize answer with N+M zeros.
3. For each digit at position i in secondNumber:
    - For each digit at position j in firstNumber:
      - Multiply the digit from secondNumber by the digit from firstNumber
      and add previously carried value to the multiplication result.
      The previously carried value can be found at position i + j in the answer.
      - Take the remainder of multiplication with 10 to get the ones place digit of the multiplication result.
      - Put the last digit at current position (position i + j) in answer.
      - Divide the multiplication by 10 to get the new value for carry
      and add it to answer at the next position.
      Note, the next position is located at (i + j + 1).
4. If the last digit in answer is zero, before reversing answer, we must pop the zero from answer.
Otherwise, there would be a leading zero in the final answer.
5. Reverse answer and return it.

Time: O(M*N)
Space: O(M+N)
 */

function multiplyString(num1: string, num2: string): string {
  if (num1 === '0' || num2 === '0') return '0';
  const firstNumber = [...num1];
  const secondNumber = [...num2];

  // Reverse both the numbers.
  firstNumber.reverse();
  secondNumber.reverse();

  // To store the multiplication result of each digit of secondNumber with firstNumber.
  const N = firstNumber.length + secondNumber.length;
  const answer = new Array(N).fill(0);

  for (let place2 = 0; place2 < secondNumber.length; place2++) {
    const digit2 = Number(secondNumber[place2]);

    // For each digit in secondNumber multiply the digit by all digits in firstNumber.
    for (let place1 = 0; place1 < firstNumber.length; place1++) {
      const digit1 = Number(firstNumber[place1]);

      // The number of zeros from multiplying to digits depends on the
      // place of digit2 in secondNumber and the place of the digit1 in firstNumber.
      const currentPos = place1 + place2;

      // The digit currently at position currentPos in the answer string
      // is carried over and summed with the current result.
      const carry = answer[currentPos];
      const multiplication = digit1 * digit2 + carry;

      // Set the ones place of the multiplication result.
      answer[currentPos] = multiplication % 10;

      // Carry the tens place of the multiplication result by
      // adding it to the next position in the answer array.
      answer[currentPos + 1] += Math.floor(multiplication / 10);
    }
  }

  if (answer[answer.length - 1] === 0) {
    answer.pop();
  }

  // Ans is in the reversed order.
  // Reverse it to get the final ans.
  answer.reverse();
  return answer.join('');
}
