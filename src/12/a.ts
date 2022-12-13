import { readFileSync } from "fs";

const grid = readFileSync("src/12/test.txt")
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((row) => row.split("").map((s) => s.charCodeAt(0)));

const SChar = "S".charCodeAt(0);
const EChar = "E".charCodeAt(0);

const yPos = grid.findIndex((row) => row.indexOf(SChar) !== -1);
const xPos = grid[yPos].indexOf(SChar);

let dists = grid.map((row) => row.map((_) => Infinity));
let visited = grid.map((row) => row.map((_) => false));
dists[yPos][xPos] = 0;

function findSmallestUnvisited() {
  let result;
  let smallest = Infinity;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (visited[y][x]) continue;

      if (dists[y][x] <= smallest) {
        smallest = dists[y][x];
        result = {
          x: x,
          y: y,
        };
      }
    }
  }
  return result;
}

const dirs = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

function doSearch() {
  while (true) {
    const curr = findSmallestUnvisited();
    if (typeof curr === "undefined") return "broke";

    const { x, y } = curr;

    let height = grid[y][x];
    if (height === SChar) height = "a".charCodeAt(0);

    if (height === EChar) return dists[y][x];

    for (let dir of dirs) {
      const oldDist = dists[y + dir.y]?.[x + dir.x];

      let newHeight = grid[y + dir.y]?.[x + dir.x];
      if (newHeight === EChar) newHeight = "z".charCodeAt(0) + 1;

      const newDist = dists[y][x] + 1;
      if (newHeight - height <= 1 && newDist < oldDist) {
        dists[y + dir.y][x + dir.x] = newDist;
      }
    }

    visited[y][x] = true;

    printDists();
    console.log("");
    printVisited();
    console.log("-------");
  }
}

const answer = doSearch();

console.log("answer", answer);

function printDists() {
  console.log(
    dists.map((row) =>
      row
        .map((n) =>
          n === Infinity
            ? "___"
            : n.toLocaleString("en-US", { minimumIntegerDigits: 3 })
        )
        .join(",")
    )
  );
}

function printVisited() {
  console.log(visited.map((row) => row.map((n) => Number(n))).join("\n"));
}
