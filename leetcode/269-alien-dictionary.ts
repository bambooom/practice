// https://leetcode.com/problems/alien-dictionary
// #graph #bfs
// There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.
// You are given a list of strings words from the alien language's dictionary. Now it is claimed that the strings in words are sorted lexicographically by the rules of this new language.
// If this claim is incorrect, and the given arrangement of string in words cannot correspond to any order of letters, return "".
// Otherwise, return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there are multiple solutions, return any of them.

// Example 1:
// Input: words = ["wrt","wrf","er","ett","rftt"]
// Output: "wertf"

// Example 2:
// Input: words = ["z","x"]
// Output: "zx"

// Example 3:
// Input: words = ["z","x","z"]
// Output: ""
// Explanation: The order is invalid, so return "".

// https://leetcode.com/problems/alien-dictionary/solutions/2275084/typescript-solution-bfs-with-comments/?envType=study-plan-v2&envId=premium-algo-100
/**
 * Example: words = ["wrt","wrf","er","ett","rftt"]

    Algorithm:

        1. Create an Adjacency List + Indegree Map (set indegree map each character to 0)

            Adjacency List will look like:

            0: w
            1: r
            2: t
            3: f
            4: e

            Indegree map will look like:

            0: w -> 0
            1: r -> 0
            2: t -> 0
            3: f -> 0
            4: e -> 0

        2. Set connection + for indegree map: set incerement # of incoming edjes comming to specific vertex

            Adjacency List will look:

            0: w -> e
            1: r -> t
            2: t -> f
            3: f ->
            4: e -> r

            Indegree map will look like:

            0: w -> 0
            1: r -> 1
            2: t -> 1
            3: f -> 1
            4: e -> 1


            The complete graph will look like:

            w -> e -> r -> t -> f

        3. BFS

            3.1 Run through the indegree map, select all characters with indegree 0, push to the queue
            3.2 Peek the fist element from the queue
            3.3 Add char to the result string
            3.4 Run through adjacency list looking for next coonection to curr element, decrement the indegree
                    - If indegree of next element == 0, enquee the element to the queue
                    - Continue until all element setted up to 0

        4. Check if string length is not less than the indegree map size, if less return ""
        5. Return result string.
 */
function alienOrder(words: string[]): string {
  // Step 0: create an adjacent list and find all unique letters
  const adjList = new Map<string, Array<string>>();
  const indegreeMap = new Map<string, number>();

  for (const word of words) {
    for (const char of word) {
      if (!adjList.has(char)) {
        adjList.set(char, []);
        indegreeMap.set(char, 0);
      }
    }
  }

  // Step 1: Find all edges
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    // Check that word2 is not a prefix of word1
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return '';
    }

    // Find the first non match and insert the corresponding relation
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1.charAt(j) !== word2.charAt(j)) {
        adjList.get(word1.charAt(j))?.push(word2.charAt(j));
        indegreeMap.set(word2.charAt(j), indegreeMap.get(word2.charAt(j))! + 1);
        break;
      }
    }
  }

  // Step 2: BFS
  let resultStr = '';
  const queue: string[] = [];

  for (const item of indegreeMap) {
    if (indegreeMap.get(item[0]) === 0) {
      queue.push(item[0]);
    }
  }

  while (queue.length > 0) {
    const current = queue.shift()!;

    resultStr += current;

    for (const next of adjList.get(current)!) {
      indegreeMap.set(next, indegreeMap.get(next)! - 1);
      if (indegreeMap.get(next) === 0) {
        queue.push(next);
      }
    }
  }

  if (resultStr.length < indegreeMap.size) {
    return '';
  }

  return resultStr;
}
