// https://leetcode.com/problems/minimum-number-of-people-to-teach
// On a social network consisting of m users and some friendships between users, two users can communicate with each other if they know a common language.
// You are given an integer n, an array languages, and an array friendships where:
// There are n languages numbered 1 through n,
// languages[i] is the set of languages the i​​​​​​th​​​​ user knows, and
// friendships[i] = [u​​​​​​i​​​, v​​​​​​i] denotes a friendship between the users u​​​​​​​​​​​i​​​​​ and vi.
// You can choose one language and teach it to some users so that all friends can communicate with each other. Return the minimum number of users you need to teach.
// Note that friendships are not transitive, meaning if x is a friend of y and y is a friend of z, this doesn't guarantee that x is a friend of z.

// Example 1:
// Input: n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
// Output: 1
// Explanation: You can either teach user 1 the second language or user 2 the first language.

// Example 2:
// Input: n = 3, languages = [[2],[1,3],[1,2],[3]], friendships = [[1,4],[1,2],[3,4],[2,3]]
// Output: 2
// Explanation: Teach the third language to users 1 and 3, yielding two users to teach.

// Constraints:
// 2 <= n <= 500
// languages.length == m
// 1 <= m <= 500
// 1 <= languages[i].length <= n
// 1 <= languages[i][j] <= n
// 1 <= u​​​​​​i < v​​​​​​i <= languages.length
// 1 <= friendships.length <= 500
// All tuples (u​​​​​i, v​​​​​​i) are unique
// languages[i] contains only unique values

// https://leetcode.com/problems/minimum-number-of-people-to-teach/solutions/7174307/beats-super-easy-beginners-java-c-c-python-javascript-dart/?envType=daily-question&envId=2025-09-10
function minimumTeachings(
  n: number,
  languages: number[][],
  friendships: number[][],
): number {
  // Create a set to store the users who need to be taught a new language
  const usersToTeach = new Set<number>();

  // step 1: identify users who can't communicate with their frieds
  for (const [u1, u2] of friendships) {
    // Adjust user indices to match 0-based indexing
    const user1 = u1 - 1;
    const user2 = u2 - 1;
    let canCommunicate = false;

    // Check if user1 and user2 share a common language
    for (const lang1 of languages[user1]) {
      if (languages[user2].includes(lang1)) {
        canCommunicate = true;
        break;
      }
    }

    // If they can't communicate, add them to the set of users to teach
    if (!canCommunicate) {
      usersToTeach.add(user1);
      usersToTeach.add(user2);
    }
  }

  // step 2: try teaching each language
  let minUsersToTeach = languages.length + 1;

  // Iterate over each language
  for (let lang = 1; lang <= n; lang++) {
    // Count of users who don't know the current language
    let count = 0;

    // Iterate over each user who needs to be taught
    for (const user of usersToTeach) {
      // If the user doesn't know the current language, increment the count
      if (!languages[user].includes(lang)) {
        count++;
      }
    }

    minUsersToTeach = Math.min(minUsersToTeach, count);
  }

  // Update the minimum number of users to teach
  return minUsersToTeach;
}

// https://leetcode.com/problems/minimum-number-of-people-to-teach/solutions/7174909/100-medium-problem-with-easy-approach-with-5-languages-c-python3-java-js-ts/?envType=daily-question&envId=2025-09-10
function minimumTeachings2(
  n: number,
  languages: number[][],
  friendships: number[][],
): number {
  const m = languages.length;
  const dp: boolean[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(false),
  );
  for (let i = 0; i < m; i++) {
    for (const lang of languages[i]) dp[i + 1][lang] = true;
  }

  const visited = new Set<number>();
  for (const [u, v] of friendships) {
    let share = false;
    for (let lang = 1; lang <= n; lang++) {
      if (dp[u][lang] && dp[v][lang]) {
        share = true;
        break;
      }
    }
    if (!share) {
      visited.add(u);
      visited.add(v);
    }
  }
  if (visited.size === 0) return 0;

  const cnt: number[] = Array(n + 1).fill(0);
  for (const u of visited) {
    for (let lang = 1; lang <= n; lang++) {
      if (dp[u][lang]) cnt[lang]++;
    }
  }
  const best = Math.max(...cnt);
  return visited.size - best;
}
