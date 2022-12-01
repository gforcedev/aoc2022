import { readFileSync } from "fs";

const input = readFileSync("src/1/input.txt").toString();

const answer = input
  .split("\n\n")
  .slice(0, -1)
  .map((elf) => elf.split("\n").map((s) => parseInt(s, 10)))
  .map((l) => l.reduce((total, curr) => total + curr, 0))
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((total, curr) => total + curr, 0);

console.log(answer);
