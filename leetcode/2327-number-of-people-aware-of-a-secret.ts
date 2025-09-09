// https://leetcode.com/problems/number-of-people-aware-of-a-secret/
// You are given an integer delay, which means that each person will share the secret with a new person every day, starting from delay days after discovering the secret. You are also given an integer forget, which means that each person will forget the secret forget days after discovering it. A person cannot share the secret on the same day they forgot it, or on any day afterwards.
// Given an integer n, return the number of people who know the secret at the end of day n. Since the answer may be very large, return it modulo 10^9 + 7.

// Example 1:
// Input: n = 6, delay = 2, forget = 4
// Output: 5
// Explanation:
// Day 1: Suppose the first person is named A. (1 person)
// Day 2: A is the only person who knows the secret. (1 person)
// Day 3: A shares the secret with a new person, B. (2 people)
// Day 4: A shares the secret with a new person, C. (3 people)
// Day 5: A forgets the secret, and B shares the secret with a new person, D. (3 people)
// Day 6: B shares the secret with E, and C shares the secret with F. (5 people)

// Example 2:
// Input: n = 4, delay = 1, forget = 3
// Output: 6
// Explanation:
// Day 1: The first person is named A. (1 person)
// Day 2: A shares the secret with B. (2 people)
// Day 3: A and B share the secret with 2 new people, C and D. (4 people)
// Day 4: A forgets the secret. B, C, and D share the secret with 3 new people. (6 people)

// Constraints:
// 2 <= n <= 1000
// 1 <= delay < forget <= n

// https://leetcode.com/problems/number-of-people-aware-of-a-secret/solutions/3022723/typescript-javascript-recursion-runtime-71ms-beats-100/?envType=daily-question&envId=2025-09-09
function peopleAwareOfSecret(n: number, delay: number, forget: number): number {
  const MOD = 10 ** 9 + 7;
  // Initialize an array to keep track of the number of people who know the secret each day
  const peopleKnowSecret: number[] = [];

  // Initialize the first 'forget - 1' days with 0 people knowing the secret
  for (let i = 0; i < forget - 1; i++) {
    peopleKnowSecret.push(0);
  }
  // On the 'forget'th day, 1 person knows the secret
  peopleKnowSecret.push(1);
  // Calculate the range of people who can share the secret
  let range = peopleKnowSecret.length - delay;

  /**
   * Recursively calculate the number of people who know the secret each day.
   *
   * @param n The number of days remaining.
   * @param people The array of people who know the secret each day.
   * @param range The range of people who can share the secret.
   * @returns The updated array of people who know the secret each day.
   */
  const knowSecret = (n: number, people: number[], range: number): number[] => {
    // Base case: if there are no more days, return the array
    if (n === 0) return people;

    // Remove the first person from the array (they've forgotten the secret)
    people.shift();

    // Calculate the number of new people who know the secret
    let newPeopleKnowSecret = 0;
    for (let i = 0; i < range; i++) {
      newPeopleKnowSecret += people[i];
    }
    // Add the new people to the array, modulo the large number
    people.push(newPeopleKnowSecret % MOD);
    // Recursively call the function for the next day
    return knowSecret(n - 1, people, range);
  };

  // Call the recursive function and calculate the total number of people who know the secret
  const result: number[] = knowSecret(n - 1, peopleKnowSecret, range);
  // Return the total number of people who know the secret, modulo the large number
  return result.reduce((acc, cur) => acc + cur, 0) % MOD;
}

// https://leetcode.com/problems/number-of-people-aware-of-a-secret/solutions/7144800/simulation-o-n-with-explanation-beginner-friendly/?envType=daily-question&envId=2025-09-09
function peopleAwareOfSecret2(
  n: number,
  delay: number,
  forget: number,
): number {
  const mod = 1e9 + 7;
  const forgetSchedule = {
    [1 + forget]: 1,
  };
  const shareSchedule = {
    [1 + delay]: 1,
  };
  let res = 1;
  let currentShareres = 0;
  for (let i = 2; i <= n; i++) {
    // 1. Remove people who forget the secret today.
    if (forgetSchedule[i]) {
      res = (res - forgetSchedule[i] + mod) % mod;
      currentShareres = (currentShareres - forgetSchedule[i] + mod) % mod;
    }

    // 2. Add people who start sharing today.
    const newSharers = shareSchedule[i] ?? 0;
    currentShareres += newSharers;
    currentShareres %= mod;

    // 3. Schedule future sharing and forgetting.
    forgetSchedule[i + forget] = currentShareres;
    shareSchedule[i + delay] = currentShareres;

    // 4. Update the total number of people who know the secrets.
    res += currentShareres;
    res %= mod;
  }
  return res;
}

// https://leetcode.com/problems/number-of-people-aware-of-a-secret/solutions/5855786/typescript-clean-solution-o-n/?envType=daily-question&envId=2025-09-09
function peopleAwareOfSecret3(
  n: number,
  delay: number,
  forget: number,
): number {
  const mod = 1e9 + 7;
  const dp = new Array(n).fill(0);
  dp[0] = 1;
  let share = 0;
  let peopleKnowing = 1;

  for (let i = 1; i < n; i++) {
    const learned = i - delay >= 0 ? dp[i - delay] : 0;
    const forgot = i - forget >= 0 ? dp[i - forget] : 0;

    share = (share + learned - forgot + mod) % mod;

    dp[i] = share;

    peopleKnowing = (peopleKnowing + share - forgot + mod) % mod;
  }

  return peopleKnowing;
}
