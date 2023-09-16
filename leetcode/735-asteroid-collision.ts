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
    const last = stack[stack.length - 1];
    const curr = asteroids[i];

    if (last > 0 && curr < 0) {
      // colliding

      if (last + curr === 0) {
        // last and curr collide and cancel each other out
        stack.pop();
      } else if (Math.abs(last) < Math.abs(curr)) {
        // last and curr collide and last is smaller
        stack.pop();
        i--;
      }
    } else {
      // not colliding
      stack.push(curr);
    }
  }

  return stack;
}

console.log(asteroidCollision([-2, -1, 1, 2])); // expected [-2,-1,1,2]
// One asteroid in a negative direction and then one in a positive direction will never collide.
// So in this case, -1 and 1 will never collide. Hence no asteroid is destroyed (other cases being -2,-1 and 1,2 are in the same direction, therefore no collision will occur). If the order was 1 and then -1, then both asteroids would have collided and both would've been destroyed.

//  But, [1, 2, -2, -1] will collide into []
