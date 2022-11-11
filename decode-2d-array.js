/**
 * our are given a 2-D array of characters. There is a hidden message in it.

I B C A L K A
D R F C A E A
G H O E L A D
The way to collect the message is as follows

start at top left
move diagonally down right
when cannot move any more, try to switch to diagonally up right
when cannot move any more, try switch to diagonally down right, repeat 3
stop when cannot neither move down right or up right. the character on the path is the message
for the input above, IROCLED should be returned.

 */

/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
  let i = 0, j = 0;
  let width = message[0]?.length;
  let height = message.length;
  let decoded = '';
  let down = true;
  while (j < width) {
    decoded += message[i][j];
    if (down) {
      i++;
      if (i === height - 1) {
        down = false;
      }
    } else {
      i--;
      if (i === 0) {
        down = true;
      }
    }
    j++;
  }
  return decoded;
}

// const message =
// `I B C A L K A
// D R F C A E A
// G H O E L A D`.split('\n').map(s => s.split(' '));
message = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'OR_THIS'],
  ['G', 'H', 'O', 'E', 'CHANGE_THIS', 'A', 'D'],
];
console.log(decode(message)); // IROCLED


/** a more compact one */
function decode_compact(message) {
  let msg = '';
  let increasing = true;
  let a1 = message[0] || [];
  let j = 0;

  for (let i = 0; i < a1.length; i++) {
    msg += message[j][i];
    if (increasing && !message[j + 1]) increasing = false;
    if (!increasing && !message[j - 1]) increasing = true;
    j += increasing ? 1 : -1;
  }

  return msg;
}
