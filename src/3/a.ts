import { readFileSync } from "fs";

const input = readFileSync("src/3/input.txt").toString();

function halve(arr: any[]) {
  return {
    left: arr.slice(0, arr.length / 2),
    right: arr.slice(arr.length / 2),
  };
}

const answer = input
  .split("\n")
  .slice(0, -1)
  .map((s) => s.split(""))
  .map(halve)
  .map(({ left, right }) => {
    for (let char of left) {
      if (right.indexOf(char) !== -1) {
        return char;
      }
    }
    return "never";
  })
  .map((c: string) => {
    if (c === c.toLowerCase()) {
      return c.charCodeAt(0) - 96;
    } else {
      return c.charCodeAt(0) - 38;
    }
  })
  .reduce((a, b) => a + b, 0);

console.log(answer);
