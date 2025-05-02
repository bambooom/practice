// https://leetcode.com/problems/push-dominoes
// There are n dominoes in a line, and we place each domino vertically upright. In the beginning, we simultaneously push some of the dominoes either to the left or to the right.
// After each second, each domino that is falling to the left pushes the adjacent domino on the left. Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.
// When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.
// For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.
// You are given a string dominoes representing the initial state where:
// dominoes[i] = 'L', if the ith domino has been pushed to the left,
// dominoes[i] = 'R', if the ith domino has been pushed to the right, and
// dominoes[i] = '.', if the ith domino has not been pushed.
// Return a string representing the final state.

// Example 1:
// Input: dominoes = "RR.L"
// Output: "RR.L"
// Explanation: The first domino expends no additional force on the second domino.

// Example 2:
// Input: dominoes = ".L.R...LR..L.."
// Output: "LL.RR.LLRRLL.."

// https://leetcode.com/problems/push-dominoes/solutions/6706315/two-pointer-simulation-explanation-24-33ms-beats-85-71-100-o-n-space-o-n/?envType=daily-question&envId=2025-05-02
// two pointers
// behaviours:
// When the forces from both sides are the same (e.g., L...L or R...R), all dominoes in between will fall in that direction.
// When the forces from both sides are opposite and form R...L, the dominoes will fall inward simultaneously until they meet at the middle. If there is exactly one domino in the middle, it will remain standing.
// When the forces from both sides are opposite and form L...R, the dominoes in between will remain upright and unaffected.
// set 2 virtual boundaries:
// At index -1, we set a virtual force 'L' to conveniently handle the beginning segment where dominoes have not been pushed.
// At index n, we set a virtual force 'R' to conveniently handle the ending segment where dominoes have not been pushed.
function pushDominoes(dominoes: string): string {
  const length = dominoes.length;
  const resultChars = dominoes.split('');

  let prevForceIndex = -1; //The previousForceIndex points to the last seen 'L' or 'R'
  let prevForce = 'L'; // The previousForce holds that character ('L' or 'R'); we treat the virtual
  // domino at index -1 as 'L' so that leading dots before an 'L' all fall left

  for (let i = 0; i <= length; i++) {
    const currForce = i < length ? resultChars[i] : 'R'; // scan one extra step with virtual R force to handle trailing dots

    if (currForce === '.') {
      continue;
    }

    if (prevForce === currForce) {
      // same direction, fill everything between prevForceIndex and i with the same force
      for (let j = prevForceIndex + 1; j < i; j++) {
        resultChars[j] = prevForce;
      }
    } else if (prevForce === 'R' && currForce === 'L') {
      // opposite direction: fill inwards from both ends
      let left = prevForceIndex + 1;
      let right = i - 1;
      while (left < right) {
        resultChars[left++] = 'R';
        resultChars[right--] = 'L';
      }
      // If they meet exactly in the middle, it stays '.'
    }
    // If previousForce === 'L' and currentForce === 'R', we leave the in-between as '.'

    prevForce = currForce;
    prevForceIndex = i;
  }

  return resultChars.join('');
}

// https://leetcode.com/problems/push-dominoes/solutions/6706240/javascript-typescript-simulation-boring-solution-just-simulate-what-happens/?envType=daily-question&envId=2025-05-02
// just simulation what happens
function pushDominoes2(dominoes: string): string {
  let arr: string[] = [];
  let i = 0;
  let res = '';

  while (i < dominoes.length) {
    if (dominoes[i] === '.') {
      arr.push('.');
      i++;
      continue;
    }

    if (dominoes[i] === 'L') {
      if (arr.length && arr[0] === 'R') {
        let numV = 0;
        let numR = 0;
        for (const c of arr) {
          if (c === '.') numV++;
          if (c === 'R') numR++;
        }

        res +=
          'R'.repeat(numR + Math.floor(numV / 2)) +
          '.'.repeat(numV % 2) +
          'L'.repeat(Math.floor(numV / 2) + 1);
      } else {
        res += 'L'.repeat(arr.length + 1);
      }

      arr = [];
      i++;
      continue;
    }

    if (arr[0] === '.') {
      res += arr.join('');
    } else {
      res += 'R'.repeat(arr.length);
    }

    arr = [];
    arr.push(dominoes[i]);
    i++;
  }

  if (arr[0] === 'R') {
    res += 'R'.repeat(arr.length);
  } else {
    res += arr.join('');
  }

  return res;
}
