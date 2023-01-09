// https://leetcode.com/problems/decode-string/
// Given an encoded string, return its decoded string.
// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
// #stack #recursion

// Input: s = "3[a]2[bc]"
// Output: "aaabcbc"
// Input: s = "3[a2[c]]"
// Output: "accaccacc"
// Input: s = "2[abc]3[cd]ef"
// Output: "abcabccdcdcdef"

// Traversal the string s and push into a stack for non-] character
// When we meets the ] character, we should do these steps
//    pop all characters until meets [
//    pop all numbers to get the repeat count
//    repeat the substring and push it back to stack
// Finally, we join all the pieces in the stack
function decodeString(s: string): string {
  const stack = [];
  for (const char of s) {
    if (char !== ']') {
      stack.push(char);
      continue;
    }
    let cur = stack.pop();
    let str = '';
    while (cur !== '[') {
      str = cur + str;
      cur = stack.pop();
    }
    let num = '';
    cur = stack.pop();
    while (!Number.isNaN(Number(cur))) {
      num = cur + num;
      cur = stack.pop();
    }
    stack.push(cur);
    stack.push(str.repeat(Number(num)));
  }
  return stack.join('');
}

/*
        we have 4 possibilities
        1) opening braces -> new sequence starts, so
        add curr string and curr number to the stack, reassign both
        to initial values
        2) closing braces -> the sequence is over, it is time to create a substring
        by getting prev string and prev number from the stack, add prev string(repeated prev num times)
        to curr string
        3) if it is number add to curr num
        4) if it is char add to curr string
    */

function decodeString2(str: string): string {
  const stack = [];
  let currStr = '';
  let currNum: string | number = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '[') {
      stack.push(currStr);
      stack.push(currNum);
      currStr = '';
      currNum = 0;
    } else if (str[i] === ']') {
      const prevNum = stack.pop() as number;
      const prevStr = stack.pop();
      currStr = prevStr + currStr.repeat(prevNum);
    } else if (!isNaN(Number(str[i]))) {
      currNum = `${currNum}${str[i]}`;
    } else {
      currStr += str[i];
    }
  }
  return currStr;
}

// using regex
const decodeString3 = (s: string): string => {
  while (s.includes('[')) {
    s = s.replace(/(\d+)\[(\w+)\]/g, (_, number, word) => word.repeat(number));
  }
  return s;
};
