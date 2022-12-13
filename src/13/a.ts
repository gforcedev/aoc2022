import { readFileSync } from "fs";

type Fragment = number | Fragment[];

const input = readFileSync("src/13/test.txt").toString();
const pairs = input
  .split("\n\n")
  .map((row) => row.split("\n").slice(0, 2).map(eval)) as Fragment[][];

console.log(pairs);

function compare(left: Fragment, right: Fragment): boolean | undefined {
  console.log(
    `compare ${JSON.stringify(left)} versus ${JSON.stringify(right)}`
  );

  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return true;
    if (left > right) return false;
    return undefined;
  }

  if (typeof left === "number") {
    return compare([left], right);
  }
  if (typeof right === "number") {
    return compare(left, [right]);
  }

  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (typeof left[i] === "undefined") {
      return true;
    }

    if (typeof right[i] === "undefined") {
      return false;
    }

    const comparison = compare(left[i], right[i]);
    if (typeof comparison === "boolean") return comparison;
  }

  return true;
}

let count = 1;
let sum = 0;
for (let pair of pairs) {
  console.log(JSON.stringify(pair));
  console.log(compare(pair[0], pair[1]));
  if (compare(pair[0], pair[1])) {
    sum += count;
  }
  count++;
  console.log("\n");
}

console.log(sum);
