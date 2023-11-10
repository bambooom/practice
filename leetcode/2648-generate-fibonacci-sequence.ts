// https://leetcode.com/problems/generate-fibonacci-sequence/
// Write a generator function that returns a generator object which yields the fibonacci sequence.
// The fibonacci sequence is defined by the relation Xn = Xn-1 + Xn-2.

// Input: callCount = 5
// Output: [0,1,1,2,3]
// Explanation:
// const gen = fibGenerator();
// gen.next().value; // 0
// gen.next().value; // 1
// gen.next().value; // 1
// gen.next().value; // 2
// gen.next().value; // 3

function* fibGenerator(): Generator<number, any, number> {
  let current = 0,
    next = 1;

  while (true) {
    yield current;
    const tmp = current;
    current = next;
    next += tmp;
  }
}

/**
 * const gen = fibGenerator();
 * gen.next().value; // 0
 * gen.next().value; // 1
 */
