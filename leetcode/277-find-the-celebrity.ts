// https://leetcode.com/problems/find-the-celebrity/
// #graph
// Suppose you are at a party with n people labeled from 0 to n - 1 and among them, there may exist one celebrity. The definition of a celebrity is that all the other n - 1 people know the celebrity, but the celebrity does not know any of them.
// Now you want to find out who the celebrity is or verify that there is not one. You are only allowed to ask questions like: "Hi, A. Do you know B?" to get information about whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).
// You are given a helper function bool knows(a, b) that tells you whether a knows b. Implement a function int findCelebrity(n). There will be exactly one celebrity if they are at the party.
// Return the celebrity's label if there is a celebrity at the party. If there is no celebrity, return -1.

// Example 1:
// Input: graph = [[1,1,0],[0,1,0],[1,1,1]]
// Output: 1
// Explanation: There are three persons labeled with 0, 1 and 2. graph[i][j] = 1 means person i knows person j, otherwise graph[i][j] = 0 means person i does not know person j.
// The celebrity is the person labeled as 1 because both 0 and 2 know him but 1 does not know anybody.

/**
 * The knows API is defined in the parent class Relation.
 * knows(a: number, b: number): boolean {
 *     ...
 * };
 */

// https://leetcode.com/problems/find-the-celebrity/solutions/1227212/traversal-2-times-1st-round-find-a-celebrity-2nd-verify-it-is-celebrity-o-n/?envType=study-plan-v2&envId=premium-algo-100
// traversal 2 times, 1st round find a celebrity, 2nd, verify it is celebrity.
// O(3n)
// Imagine people lined up and you ask from the first person `c` whether he/she knows `i` person, two situations are going to happen:
// - he/she doesn't, this means, c person has the potential to become the celebrity while i person does not, we move on
// - If he/she does, this automatically mark him/her as unqualified and we can mark i person as our new c, and the people in between automatically disqualified. Why? because in order to become a celebrity, everybody has to know you. and because of the set up, between c & i at least one person doesnt know him/her.
const findCelebrity = function (knows: any) {
  // n is total people, return the celebrity number
  return function (n: number): number {
    let cl = 0;
    for (let i = 1; i < n; i++) {
      if (knows(cl, i)) {
        // 这里的 cl knows i，则 i 有可能才是 celebrity，这里的 cl 的值就不可能是 celebrity
        // 所以赋值给新的 cl
        cl = i;
      }
    }
    // qualify cl
    for (let i = 0; i < n; i++) {
      if (i === cl) continue;
      if (knows(cl, i)) return -1; // if cl knows any of i，then is not qualified
      if (!knows(i, cl)) return -1; // if anyone does not know cl, then not qualified
    }
    return cl;
  };
};
