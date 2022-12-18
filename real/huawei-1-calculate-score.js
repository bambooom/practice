function calScores(input) {
  const ops = input.split(' ');
  let sum = 0;
  const scores = [];
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    switch (op) {
      case 'C': {
        if (scores.length) {
          const last = scores.pop();
          sum -= last;
        } else {
          return -1;
        }
        break;
      }
      case 'D': {
        if (scores.length) {
          const double = scores[scores.length - 1] * 2;
          scores.push(double);
          sum += double;
        } else {
          return -1;
        }
        break;
      }
      case '+': {
        const len = scores.length;
        if (len >= 2) {
          const plus = scores[len - 1] + scores[len - 2];
          scores.push(plus);
          sum += plus;
        } else {
          return -1;
        }
        break;
      }
      default: {
        const num = parseInt(op);
        if (Number.isNaN(num)) {
          return -1;
        } else {
          scores.push(num);
          sum += num;
        }
      }
    }
  }

  return sum;
}

console.log(calScores('5 7 C D +')); // 30
