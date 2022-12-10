import { readFileSync } from "fs";

const input = readFileSync("src/10/input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split(" "))
  .slice(0, -1);

let cycle = 0;
let instructionIdx = 0;
let x = 1;
let sum = 0;

let adding: number | undefined;

while (typeof input[instructionIdx] !== "undefined") {
  cycle++;

  const instruction = input[instructionIdx];

  if ((cycle - 20) % 40 === 0) {
    sum += x * cycle;
  }

  if (typeof adding !== "undefined") {
    x += adding;
    adding = undefined;
    instructionIdx++;
  } else if (instruction[0] === "addx") {
    adding = parseInt(instruction[1], 10);
  } else {
    instructionIdx++;
  }
}

console.log(sum);
