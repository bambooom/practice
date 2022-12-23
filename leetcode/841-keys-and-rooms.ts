// https://leetcode.com/problems/keys-and-rooms
// #depth-first search

function canVisitAllRooms(rooms: number[][]): boolean {
  const stack: number[] = [];
  const visited = new Set<number>();

  stack.push(...rooms[0]);
  visited.add(0);
  while (stack.length) {
    const r = stack.pop() as number;
    if (visited.has(r)) continue;
    visited.add(r);
    stack.push(...rooms[r]);
  }
  return visited.size == rooms.length;
}
