// https://leetcode.com/problems/asteroid-collision

// We are given an array asteroids of integers representing asteroids in a row.
// For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.
// Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.
// #stack

// Input: asteroids = [10,2,-5]
// Output: [10]
// Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = [];

  for (let i = 0; i < asteroids.length; i++) {
    const current = asteroids[i];

    console.log('current: ', current);

    if (stack.length === 0) {
      stack.push(current);
    } else {
      const last = stack[stack.length - 1];
      console.log('last: ', last);
      if (last * current > 0) {
        // same sign, not colliding
        stack.push(current);
      } else {
        // colliding
        if (last + current === 0) {
          stack.pop();
        } else if (Math.abs(last) < Math.abs(current)) {
          stack.pop();
          i--;
        }
      }
    }

    console.log(stack);
  }

  return stack;
}

console.log(asteroidCollision([-2, -1, 1, 2])); // expected []

// https://leetcode.com/problems/asteroid-collision/solutions/304369/js-javascript-simple-solution-with-single-loop-and-explanation/
