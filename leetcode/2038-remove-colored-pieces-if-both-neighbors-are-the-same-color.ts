// https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color/

// time O(N), space O(1)
function winnerOfGame(colors: string): boolean {
  let alice = 0;
  let bob = 0;

  for (let i = 1; i < colors.length - 1; i++) {
    if (colors[i - 1] === colors[i] && colors[i] === colors[i + 1]) {
      if (colors[i] === 'A') {
        alice++;
      } else {
        bob++;
      }
    }
  }

  return alice > bob;
}
