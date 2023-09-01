// https://leetcode.com/problems/robot-return-to-origin/

function judgeCircle(moves: string): boolean {
  const hash: Record<string, number> = {};
  for (let i = 0; i <= moves.length; i++) {
    hash[moves[i]] = (hash[moves[i]] ?? 0) + 1;
  }

  return (
    (hash['R'] || 0) === (hash['L'] || 0) &&
    (hash['U'] || 0) === (hash['D'] || 0)
  );
}

// another solution
function judgeCircle2(moves: string): boolean {
  let x = 0;
  let y = 0;

  for (const move of moves) {
    if (move === 'R') x++;
    if (move === 'L') x--;
    if (move === 'U') y++;
    if (move === 'D') y--;
  }

  return x === 0 && y === 0;
}
