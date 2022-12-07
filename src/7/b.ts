import { readFileSync } from "fs";

const input = readFileSync("src/7/input.txt").toString();

type File = {
  name: string;
  size: number;
};

type Directory = {
  name: string;
  files: File[];
  subdirs: Directory[];
  totalSize?: number;
};

const dirs: { [k: string]: Directory } = {};
const files: { [k: string]: File } = {};

const parsedInput = input.split("\n").slice(0, -1);
const currentPathStack: string[] = [];

for (let cmd of parsedInput) {
  let currentPath = currentPathStack.join("/"); // We'll start with // but that doesn't matter

  const splitCmd = cmd.split(" ");

  if (splitCmd[0] === "$") {
    if (splitCmd[1] === "ls" && typeof dirs[currentPath] === "undefined") {
      dirs[currentPath] = {
        name: currentPath,
        files: [],
        subdirs: [],
      };
    }

    if (splitCmd[1] === "cd") {
      if (splitCmd[2] === "..") {
        currentPathStack.pop();
      } else {
        currentPathStack.push(splitCmd[2]);
      }
    }

    continue;
  }

  const maybeFileSize = parseInt(splitCmd[0], 10);
  if (!isNaN(maybeFileSize)) {
    const fileName = `${currentPath}/${splitCmd[1]}`;
    files[fileName] = { name: fileName, size: maybeFileSize };
    dirs[currentPath].files.push(files[fileName]);
    continue;
  }

  if (splitCmd[0] === "dir") {
    const dirName = `${currentPath}/${splitCmd[1]}`;
    dirs[dirName] = { name: dirName, files: [], subdirs: [] };
    dirs[currentPath].subdirs.push(dirs[dirName]);
    continue;
  }

  throw new Error(`parsing failure: ${cmd}`);
}

function setTotalSize(node: Directory) {
  if (node.subdirs.length === 0) {
    node.totalSize = node.files.reduce((a, b) => a + b.size, 0);
    return;
  }

  for (let subdir of node.subdirs) {
    setTotalSize(subdir);
  }

  node.totalSize =
    node.files.reduce((a, b) => a + b.size, 0) +
    node.subdirs.reduce((a, b) => a + (b.totalSize as number), 0);
}

setTotalSize(dirs["/"]);

const freeSpace = 70000000 - (dirs["/"].totalSize as number);
const neededSpace = 30000000 - freeSpace;

const answer = Object.values(dirs)
  .filter((dir) => (dir.totalSize as number) >= neededSpace)
  .sort(
    (a, b) => (a.totalSize as number) - (b.totalSize as number)
  )[0].totalSize;

console.log(answer);
