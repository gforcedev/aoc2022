import { readFileSync } from "fs";

const input = readFileSync("src/4/input.txt").toString();

const answer = input
  .split("\n")
  .slice(0, -1)
  .map((row) =>
    row.split(",").map((pair) => pair.split("-").map((n) => parseInt(n, 10)))
  )
  .filter(
    (arr: number[][]) =>
      (arr[0][0] >= arr[1][0] && arr[0][1] <= arr[1][1]) ||
      (arr[1][0] >= arr[0][0] && arr[1][1] <= arr[0][1])
  ).length;

console.log(answer);
