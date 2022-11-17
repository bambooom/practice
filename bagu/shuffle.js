// how to shuffle aray
// https://javascript.info/task/shuffle
// has fixed algorithm: Fisher-Yates shuffle

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // from end, and then pick random j, then swap
    const j = Math.floor(Math.random() * (i + 1)); // must be i+1,
    if (i !== j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }
}

// const arr = [1, 2, 3];
// shuffle(arr)
// console.log(arr);

const count = {
  123: 0,
  132: 0,
  213: 0,
  231: 0,
  321: 0,
  312: 0,
};

for (let i = 0; i < 1000000; i++) {
  const array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// show counts of all possible permutations
for (const key in count) {
  console.log(`${key}: ${count[key]}`); // each count to be close
}
