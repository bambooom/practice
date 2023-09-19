// https://leetcode.com/problems/dota2-senate/description
// #greedy

// The best strategy" for a senator is to ban the next closest opponent senator.

// Approach 1: greedy, time O(n^2), space O(n)
function predictPartyVictory(senate: string): string {
  // Count of Each Type of Senator to check for Winner
  let rCount = 0,
    dCount = 0;
  for (let i = 0; i < senate.length; i++) {
    if (senate[i] == 'R') {
      rCount++;
    } else {
      dCount++;
    }
  }

  // Ban the candidate "toBan", immediate next to "startAt"
  // If have to loop around, then it means next turn will be of
  // senator at same index. Returns loop around boolean
  const ban = (toBan: 'D' | 'R', startAt: number) => {
    let loopAround = false;
    let pointer = startAt;

    while (true) {
      if (pointer == 0) {
        loopAround = true;
      }
      if (senate[pointer] == toBan) {
        senate = senate.slice(0, pointer) + senate.slice(pointer + 1);
        break;
      }
      pointer = (pointer + 1) % senate.length;
    }

    return loopAround;
  };

  // Turn of Senator at this index
  let turn = 0;

  // While No Winner
  while (rCount > 0 && dCount > 0) {
    // Ban the next opponent, starting at one index ahead
    // Taking MOD to loop around.
    // If index of banned senator is before current index,
    // then we need to decrement turn by 1, as we have removed
    // a senator from list
    if (senate[turn] == 'R') {
      const bannedSenatorBefore = ban('D', (turn + 1) % senate.length);
      dCount--;
      if (bannedSenatorBefore) {
        turn--;
      }
    } else {
      const bannedSenatorBefore = ban('R', (turn + 1) % senate.length);
      rCount--;
      if (bannedSenatorBefore) {
        turn--;
      }
    }

    // Increment turn by 1
    turn = (turn + 1) % senate.length;
  }

  // Return Winner depending on count
  return dCount == 0 ? 'Radiant' : 'Dire';
}

// Approach 2: Two queues, time O(n), space O(n)
function predictPartyVictory2(senate: string): string {
  // Number of Senator
  const n = senate.length;

  // Queues with Senator's Index.
  // Index will be used to find the next turn of Senator
  const rQueue = [];
  const dQueue = [];

  // Populate the Queues
  for (let i = 0; i < n; i++) {
    if (senate[i] == 'R') {
      rQueue.push(i);
    } else {
      dQueue.push(i);
    }
  }

  // While both parties have at least one Senator
  while (rQueue.length > 0 && dQueue.length > 0) {
    // Pop the Next-Turn Senate from both Q.
    const rTurn = rQueue.shift() as number;
    const dTurn = dQueue.shift() as number;

    // ONE having a larger index will be banned by a lower index
    // Lower index will again get Turn, so EN-Queue again
    // But ensure its turn comes in the next round only
    if (dTurn < rTurn) {
      dQueue.push(dTurn + n); // enqueue with plus n, next round
    } else {
      rQueue.push(rTurn + n);
    }
  }

  // One's which Empty is not winner
  return rQueue.length == 0 ? 'Dire' : 'Radiant';
}

// Approach 3: Single queue, time O(n), space O(n)
function predictPartyVictory3(senate: string): string {
  // Number of Senators of each party
  let rCount = 0,
    dCount = 0;

  // Floating Ban Count
  let dFloatingBan = 0,
    rFloatingBan = 0;

  // Queue of Senators
  const q = [];
  for (let i = 0; i < senate.length; i++) {
    q.push(senate[i]);
    if (senate[i] == 'R') rCount++;
    else dCount++;
  }

  // While any party has eligible Senators
  while (rCount > 0 && dCount > 0) {
    // Pop the senator with turn
    const curr = q.shift();

    // If eligible, float the ban on the other party, enqueue again.
    // If not, decrement the floating ban and count of the party.
    if (curr === 'D') {
      if (dFloatingBan > 0) {
        dFloatingBan--;
        dCount--;
      } else {
        rFloatingBan++;
        q.push('D');
      }
    } else {
      if (rFloatingBan > 0) {
        rFloatingBan--;
        rCount--;
      } else {
        dFloatingBan++;
        q.push('R');
      }
    }
  }

  // Return the party with eligible Senators
  return rCount > 0 ? 'Radiant' : 'Dire';
}
