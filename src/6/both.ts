import { readFileSync } from "fs";

// Set to 14 instead of 4 for part B
const MARKER_LENGTH = 4;

const input = readFileSync("src/6/input.txt").toString().split("");

let answer = 0;
let seen: string[] = new Array(MARKER_LENGTH).fill("TEST");

for (let char of input) {
  answer++;
  seen[answer % MARKER_LENGTH] = char;

  console.log(seen);

  if (
    Array.from(new Set(seen).values()).length === seen.length &&
    seen.indexOf("TEST") === -1
  ) {
    break;
  }
}

console.log(answer);
