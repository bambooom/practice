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

// https://scontent-hkt1-1.cdninstagram.com/v/t51.2885-19/337507059_180554704765162_4567657305623737826_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hkt1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=HxLHA11UiCYAX9Hlmao&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCALa9vy3G-F-ynZNiOyimR1c6V1Fa37kRpxvC0U23EPw&oe=64235BC8&_nc_sid=8fd12b
// https://instagram.ffjr1-5.fna.fbcdn.net/v/t51.2885-19/337507059_180554704765162_4567657305623737826_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ffjr1-5.fna.fbcdn.net&_nc_cat=110&_nc_ohc=HxLHA11UiCYAX8vcNTz&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDikPba4Hd6HTwWZyoZqOVIM_X92CSYii6_gHkGUJnZCA&oe=64235BC8&_nc_sid=8fd12b&dl=1
