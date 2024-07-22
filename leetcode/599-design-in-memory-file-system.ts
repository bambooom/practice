// https://leetcode.com/problems/design-in-memory-file-system
// Design a data structure that simulates an in-memory file system.

// Implement the FileSystem class:
// - FileSystem() Initializes the object of the system.
// - List<String> ls(String path)
//  - If path is a file path, returns a list that only contains this file's name.
//  - If path is a directory path, returns the list of file and directory names in this directory.
// The answer should in lexicographic order.
// - void mkdir(String path) Makes a new directory according to the given path. The given directory path does not exist. If the middle directories in the path do not exist, you should create them as well.
// - void addContentToFile(String filePath, String content)
//  - If filePath does not exist, creates that file containing given content.
//  - If filePath already exists, appends the given content to original content.
// - String readContentFromFile(String filePath) Returns the content in the file at filePath.

// Example 1:
// Input
// ["FileSystem", "ls", "mkdir", "addContentToFile", "ls", "readContentFromFile"]
// [[], ["/"], ["/a/b/c"], ["/a/b/c/d", "hello"], ["/"], ["/a/b/c/d"]]
// Output
// [null, [], null, null, ["a"], "hello"]

// Explanation
// FileSystem fileSystem = new FileSystem();
// fileSystem.ls("/");                         // return []
// fileSystem.mkdir("/a/b/c");
// fileSystem.addContentToFile("/a/b/c/d", "hello");
// fileSystem.ls("/");                         // return ["a"]
// fileSystem.readContentFromFile("/a/b/c/d"); // return "hello"

class File {
  public content: string;
  public name: string;

  constructor(content: string, name: string) {
    this.content = content;
    this.name = name;
  }

  appendContent(content: string): void {
    this.content += content;
  }
}

class Dir {
  public subdirs: Map<string, Dir>; // dirname map to dir objects
  public files: Map<string, File>; // filename map file objects

  constructor() {
    this.subdirs = new Map<string, Dir>();
    this.files = new Map<string, File>();
  }

  public getSubdirs(): string[] {
    return Array.from(this.subdirs.keys());
  }

  public createSubdir(dirName: string): Dir {
    const dir = new Dir();
    this.subdirs.set(dirName, dir);
    return dir;
  }

  public hasSubdir(dirName: string): boolean {
    return this.subdirs.get(dirName) !== undefined;
  }

  public getSubdir(dirName: string): Dir {
    return this.subdirs.get(dirName)!;
  }

  public getFiles(): string[] {
    return Array.from(this.files.keys());
  }

  public createFile(fileName: string, content: string): File {
    const file = new File(content, fileName);
    this.files.set(fileName, file);
    return file;
  }

  public hasFile(fileName: string): boolean {
    return this.files.get(fileName) !== undefined;
  }

  public getFile(fileName: string): File {
    return this.files.get(fileName)!;
  }
}

interface IFilePathInfo {
  path: string;
  dir: string;
  name: string;
}

class FileSystem {
  private root: Dir;
  constructor() {
    this.root = new Dir();
  }

  // traverse through the given path
  private traverse(path: string, createIfNotExists = false): Dir {
    const dirs: string[] = path.split('/').filter((p) => p);
    let curDir: Dir = this.root;
    for (const dirName of dirs) {
      if (createIfNotExists && !curDir.hasSubdir(dirName)) {
        curDir.createSubdir(dirName);
      }

      curDir = curDir.getSubdir(dirName);
    }

    return curDir;
  }

  private getFile(filePath: string) {
    const { name, dir } = this.extractFilePathInfo(filePath);
    const curDir: Dir = this.traverse(dir);
    if (!curDir.hasFile(name)) {
      return curDir.createFile(name, '');
    }

    return curDir.getFile(name);
  }

  private extractFilePathInfo(filePath: string): IFilePathInfo {
    const dirs: string[] = filePath.split('/').filter((p) => p);
    const fileName: string = dirs.pop()!;
    return {
      path: filePath,
      dir: dirs.join('/'),
      name: fileName,
    };
  }

  ls(path: string): string[] {
    const curDir: Dir = this.traverse(path);
    if (curDir === undefined) {
      // means that it's a file
      const { name } = this.extractFilePathInfo(path);
      return [name];
    }

    // return all file and dirs
    return [...curDir.getSubdirs(), ...curDir.getFiles()].sort();
  }

  mkdir(path: string): void {
    this.traverse(path, true);
  }

  addContentToFile(filePath: string, content: string): void {
    const file = this.getFile(filePath);
    file.appendContent(content);
  }

  readContentFromFile(filePath: string): string {
    return this.getFile(filePath).content;
  }
}

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.ls(path)
 * obj.mkdir(path)
 * obj.addContentToFile(filePath,content)
 * var param_4 = obj.readContentFromFile(filePath)
 */
