import { readFileSync } from "fs";

const input = readFileSync("src/10/input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split(" "))
  .slice(0, -1);

console.log("length", input.length);

let cycle = 0;
let instructionIdx = 0;
let x = 1;
let sum = 0;

const crt = new Array(6).fill(undefined).map((_) => new Array(40).fill("."));

let adding: number | undefined;

while (typeof input[instructionIdx] !== "undefined") {
  const instruction = input[instructionIdx];

  if (Math.abs(x - (cycle % 40)) <= 1) {
    crt[Math.floor(cycle / 40)][cycle % 40] = "$";
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

  cycle++;
}

console.log(crt.map((r) => r.join("")).join("\n"));
