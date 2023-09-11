// https://leetcode.com/problems/check-if-it-is-a-straight-line/

// https://leetcode.com/problems/check-if-it-is-a-straight-line/solutions/3265233/easy-js-ts-solution/
// simple clean solution
const checkStraightLine = ([
  [x1, y1],
  [x2, y2],
  ...coordinates
]: number[][]) => {
  const dx = x2 - x1,
    dy = y2 - y1;

  return coordinates.every(([x, y]) => dx * (y - y1) === dy * (x - x1));
};

// https://leetcode.com/problems/check-if-it-is-a-straight-line/solutions/3731128/typescript-javascript-explanation-solution-step-by-step/
function checkStraightLine2(coordinates: number[][]): boolean {
  // deltaX is (x - x') and deltaY is (y - y')
  const [deltaX, deltaY] = [
    coordinates[0][0] - coordinates[1][0],
    coordinates[0][1] - coordinates[1][1],
  ];
  // `a = (x - x')/(y - y')`
  const a = deltaX / deltaY;
  // `b = x - ay`
  const b = coordinates[0][0] - a * coordinates[0][1];

  for (let i = 2; i < coordinates.length; i++) {
    if (deltaX === 0) {
      // If deltaX = 0, we have a horizontal straight line.
      // In a horizontal line, all x-coordinates should be equal.
      if (coordinates[i][0] !== coordinates[i - 1][0]) return false;
    } else if (deltaY === 0) {
      // If deltaY = 0, we have a vertical straight line.
      // In a vertical line, all y-coordinates should be equal.
      if (coordinates[i][1] !== coordinates[i - 1][1]) return false;
    } else if (coordinates[i][0] !== a * coordinates[i][1] + b) {
      // If any coordinate does not satisfy the equation, it is not on the line.
      return false;
    }
  }

  return true;
}
