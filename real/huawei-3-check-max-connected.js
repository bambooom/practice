// all [i][i] are 1, check upper triangle enough?
function maxConnected(isConnected) {
  // map: node => set
  const count = isConnected.length;
  const nodeMap = new Map();
  let maxSize = 0;
  for (let i = 0; i < count; i++) {
    let set = new Set();
    if (nodeMap.has(i)) {
      set = nodeMap.get(i);
    }
    for (let j = i; j < count; j++) {
      if (isConnected[i][j] === 1) {
        set.add(j);
        nodeMap.set(j, set);
      }
    }
    nodeMap.set(i, set);
    maxSize = Math.max(maxSize, set.size);
  }

  return maxSize;
}

const isConnected = [
  [1, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 1],
];
console.log(maxConnected(isConnected)); // 3
