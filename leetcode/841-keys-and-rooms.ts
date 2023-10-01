// https://leetcode.com/problems/keys-and-rooms
// #depth-first search

// There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.
// When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.

// Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.

function canVisitAllRooms(rooms: number[][]): boolean {
  const stack: number[] = [];
  const visited = new Set<number>();

  stack.push(...rooms[0]); // what keys in room0
  visited.add(0);
  while (stack.length) {
    const r = stack.pop() as number;
    if (visited.has(r)) continue; // room r has visited, no need to visit again
    visited.add(r); // add to visited key
    stack.push(...rooms[r]); // add new keys to stack
  }
  return visited.size == rooms.length;
}

// https://scontent-hkt1-1.cdninstagram.com/v/t51.2885-19/337507059_180554704765162_4567657305623737826_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hkt1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=HxLHA11UiCYAX9Hlmao&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCALa9vy3G-F-ynZNiOyimR1c6V1Fa37kRpxvC0U23EPw&oe=64235BC8&_nc_sid=8fd12b
// https://instagram.ffjr1-5.fna.fbcdn.net/v/t51.2885-19/337507059_180554704765162_4567657305623737826_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ffjr1-5.fna.fbcdn.net&_nc_cat=110&_nc_ohc=HxLHA11UiCYAX8vcNTz&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDikPba4Hd6HTwWZyoZqOVIM_X92CSYii6_gHkGUJnZCA&oe=64235BC8&_nc_sid=8fd12b&dl=1
