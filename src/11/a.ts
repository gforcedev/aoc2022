import { readFileSync } from "fs";

const input = readFileSync("src/11/input.txt").toString();

type Monkey = {
  items: number[];
  operation: (old: number) => number;
  testDivisor: number;
  trueTarget: number;
  falseTarget: number;
  inspectionCount: number;
};

function getOnlyNumber(s: string) {
  return parseInt((s.match(/\d+/) as string[])[0]);
}

function add(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
}

const monkeys: Monkey[] = [];

for (let monkeyInput of input.split("\n\n").map((block) => block.split("\n"))) {
  monkeys.push({
    items: (monkeyInput[1].match(/\d+/g) as string[]).map((s: string) =>
      parseInt(s, 10)
    ),
    operation: (old: number) => {
      const opLine = monkeyInput[2];

      const maybeOperator = opLine.match(/\d+/)?.[0];
      let operator: number;
      if (typeof maybeOperator === "undefined") {
        operator = old;
      } else {
        operator = parseInt(maybeOperator, 10);
      }

      return (opLine.indexOf("+") !== -1 ? add : multiply)(old, operator);
    }, // tricky one leave for now
    testDivisor: getOnlyNumber(monkeyInput[3]),
    trueTarget: getOnlyNumber(monkeyInput[4]),
    falseTarget: getOnlyNumber(monkeyInput[5]),
    inspectionCount: 0,
  });
}

function doStep(monkey: Monkey) {
  for (const item of monkey.items) {
    monkey.inspectionCount++;
    const testVal = Math.floor(monkey.operation(item) / 3);
    monkeys[
      testVal % monkey.testDivisor === 0
        ? monkey.trueTarget
        : monkey.falseTarget
    ].items.push(testVal);
  }
  monkey.items = [];
}

for (let i = 0; i < 20; i++) {
  for (let monkey of monkeys) {
    doStep(monkey);
  }
}

const answer = monkeys
  .map((m) => m.inspectionCount)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((a, b) => a * b);

console.log(answer);
