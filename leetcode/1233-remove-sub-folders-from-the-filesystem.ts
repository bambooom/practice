// https://leetcode.com/problems/remove-sub-folders-from-the-filesystem
// Given a list of folders folder, return the folders after removing all sub-folders in those folders. You may return the answer in any order.
// If a folder[i] is located within another folder[j], it is called a sub-folder of it. A sub-folder of folder[j] must start with folder[j], followed by a "/". For example, "/a/b" is a sub-folder of "/a", but "/b" is not a sub-folder of "/a/b/c".
// The format of a path is one or more concatenated strings of the form: '/' followed by one or more lowercase English letters.
// For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string and "/" are not.

// Example 1:
// Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
// Output: ["/a","/c/d","/c/f"]
// Explanation: Folders "/a/b" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.

// Example 2:
// Input: folder = ["/a","/a/b/c","/a/b/d"]
// Output: ["/a"]
// Explanation: Folders "/a/b/c" and "/a/b/d" will be removed because they are subfolders of "/a".

// Example 3:
// Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
// Output: ["/a/b/c","/a/b/ca","/a/b/d"]

// https://leetcode.com/problems/remove-sub-folders-from-the-filesystem/solutions/5964641/explained-step-by-step-beats-100-working-25-10-2024/
function removeSubfolders(folder: string[]): string[] {
  // sort folders lexicographically so parent folders come before their subfolders
  folder.sort();

  const ans: string[] = [folder[0]];

  for (let i = 1; i < folder.length; i++) {
    // get the last added folder path and add a trailing slash
    const lastFolder = ans[ans.length - 1] + '/';

    // check if current folder starts with the lastFolder
    // if not ,then it's not a subfolder
    if (!folder[i].startsWith(lastFolder)) {
      ans.push(folder[i]);
    }
  }

  return ans;
}
