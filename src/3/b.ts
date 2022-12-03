import { readFileSync } from "fs";

const input = readFileSync("src/3/input.txt").toString();

function partition(arr: any[], len: number) {
  return arr.reduce(
    (partitions: any[][], curr: any) => {
      if (partitions[partitions.length - 1].length === len) {
        return [...partitions, [curr]];
      }
      const last = partitions.pop() as any[];
      return [...partitions, [...last, curr]];
    },
    [[]]
  );
}

const processed = input
  .split("\n")
  .slice(0, -1)
  .map((s) => s.split(""));

const answer = partition(processed, 3)
  .map((arr: any[][]) => {
    for (let c of arr[0] as string[]) {
      let missing = false;
      for (let i = 1; i < arr.length && !missing; i++) {
        if (arr[i].indexOf(c) === -1 || missing) {
          missing = true;
        }
      }
      if (!missing) {
        return c;
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
