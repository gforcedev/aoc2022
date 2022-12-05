import { readFileSync } from "fs";

const input = readFileSync("src/5/input.txt").toString();

const crateInput = input.split("\n\n")[0].split("\n");

let crates = [];

let count = 0;
for (let col = 1; col < crateInput[0].length; col += 4) {
  crates.push([] as string[]);
  for (let i = 0; i < crateInput.length - 1; i++) {
    const curr = crateInput[i].charAt(col);
    if (curr !== " ") {
      crates[count].push(curr);
    }
  }
  count++;
}

crates = crates.map((c) => c.reverse());

const instructions = input
  .split("\n\n")[1]
  .split("\n")
  .slice(0, -1)
  .map((instruction: string) =>
    (instruction.match(/\d+/g) as string[]).map((s) => parseInt(s, 10))
  )
  .map((nums: number[]) => ({
    count: nums[0],
    from: nums[1] - 1,
    to: nums[2] - 1,
  }));

for (let { count, from, to } of instructions) {
  let inClaw = [];
  for (let i = 0; i < count; i++) {
    inClaw.push(crates[from].pop());
  }

  for (let i = 0; i < count; i++) {
    crates[to].push(inClaw.pop() as string);
  }
}

console.log(crates);

const answer = crates.map((c) => c[c.length - 1]).join("");

console.log("answer", answer);
