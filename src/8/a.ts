import { readFileSync } from "fs";

const input = readFileSync("src/8/input.txt").toString();

const treeMap = input
  .split("\n")
  .map((row) => row.split("").map((s) => parseInt(s, 10)))
  .slice(0, -1);

const visibleMap = [...treeMap].map((r) => new Array(r.length).fill(false));

for (let row = 0; row < treeMap.length; row++) {
  let highest = -Infinity;
  for (let col = 0; col < treeMap[row].length; col++) {
    let currHeight = treeMap[row][col];
    if (currHeight > highest) {
      visibleMap[row][col] = true;
      highest = currHeight;
    }
  }

  highest = -Infinity;
  for (let col = treeMap[row].length - 1; col >= 0; col--) {
    let currHeight = treeMap[row][col];
    if (currHeight > highest) {
      visibleMap[row][col] = true;
      highest = currHeight;
    }
  }
}

for (let col = 0; col < treeMap[0].length; col++) {
  let highest = -Infinity;
  for (let row = 0; row < treeMap.length; row++) {
    let currHeight = treeMap[row][col];
    if (currHeight > highest) {
      visibleMap[row][col] = true;
      highest = currHeight;
    }
  }

  highest = -Infinity;
  for (let row = treeMap.length - 1; row >= 0; row--) {
    let currHeight = treeMap[row][col];
    if (currHeight > highest) {
      visibleMap[row][col] = true;
      highest = currHeight;
    }
  }
}

const answer = visibleMap
  .map((row) => row.reduce((a, b) => a + b, 0))
  .reduce((a, b) => a + b, 0);

console.log(answer);

console.log(
  visibleMap.map((row) => row.map((n) => Number(n)).join("")).join("\n")
);
