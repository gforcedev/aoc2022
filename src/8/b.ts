import { readFileSync } from "fs";

const input = readFileSync("src/8/input.txt").toString();

const treeMap = input
  .split("\n")
  .map((row) => row.split("").map((s) => parseInt(s, 10)))
  .slice(0, -1);

const visibleMap: boolean[][] = [...treeMap].map((r) =>
  new Array(r.length).fill(false)
);

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

// Part 2 stuff starts here - this day was a bit of a mess but we got there

const dirs = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

let bestScenicScore = -Infinity;
let bestStart = {
  x: 0,
  y: 0,
};
let bestDirs: number[] = [];
for (let row = 0; row < treeMap.length; row++) {
  for (let col = 0; col < treeMap[row].length; col++) {
    console.log("trying", row, col);
    let thisHeight = treeMap[row][col];
    let thisDirs = [];

    for (const dir of dirs) {
      let thisDirMultiplier = 0;
      while (true) {
        thisDirMultiplier++;
        if (
          typeof visibleMap[row + dir.x * thisDirMultiplier] === "undefined"
        ) {
          thisDirMultiplier--;
          break;
        }

        const maybeBlocker =
          treeMap[row + dir.x * thisDirMultiplier][
            col + dir.y * thisDirMultiplier
          ];
        if (typeof maybeBlocker === "undefined") {
          thisDirMultiplier--;
          break;
        }

        if (maybeBlocker >= thisHeight) {
          break;
        }
      }
      thisDirs.push(thisDirMultiplier);
    }

    const thisScenicScore = thisDirs.reduce((a, b) => a * b, 1);
    if (thisScenicScore > bestScenicScore) {
      console.log("new best", thisScenicScore);
      bestScenicScore = thisScenicScore;
      bestStart = { x: row, y: col };
      bestDirs = thisDirs;
    }
  }
}

console.log(bestScenicScore, bestStart, bestDirs);

// const answer = visibleMap
// .map((row) => row.reduce((a, b) => a + b, 0))
// .reduce((a, b) => a + b, 0);

// console.log(answer);

// console.log(
// visibleMap.map((row) => row.map((n) => Number(n)).join("")).join("\n")
// );
