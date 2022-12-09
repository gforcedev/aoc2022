import { readFileSync } from "fs";

const input = readFileSync("src/9/input.txt").toString();

type Pos = { x: number; y: number };

const dirs: { [k: string]: Pos } = {
  U: {
    x: 0,
    y: 1,
  },
  D: {
    x: 0,
    y: -1,
  },
  L: {
    x: -1,
    y: 0,
  },
  R: {
    x: 1,
    y: 0,
  },
};

const knots: Pos[] = new Array(10).fill(123).map(() => ({ x: 0, y: 0 }));

const visitedByTail = new Set<string>();

function updateToFollow(head: Pos, tail: Pos) {
  const xDiff = head.x - tail.x;
  const yDiff = head.y - tail.y;

  if (xDiff === 0 || yDiff === 0) {
    tail.x += Math.floor(Math.abs(xDiff) / 2) * Math.sign(xDiff);
    tail.y += Math.floor(Math.abs(yDiff) / 2) * Math.sign(yDiff);
  } else if (Math.abs(xDiff) === 2 || Math.abs(yDiff) === 2) {
    tail.x += Math.sign(xDiff);
    tail.y += Math.sign(yDiff);
  }
}

for (const moveString of input.split("\n").slice(0, -1)) {
  const dir: Pos = dirs[moveString[0]];

  const count = parseInt(
    (moveString.match(/\d+/) as string[])[0] as string,
    10
  ) as number;

  for (let i = 0; i < count; i++) {
    knots[0].x += dir.x;
    knots[0].y += dir.y;

    for (let i = 0; i < 9; i++) {
      updateToFollow(knots[i], knots[i + 1]);
    }

    visitedByTail.add(JSON.stringify(knots[9]));
  }
}

const answer = Array.from(visitedByTail.keys()).length;
console.log(answer);
