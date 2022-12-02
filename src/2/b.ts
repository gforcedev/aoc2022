import { readFileSync } from "fs";

const input = readFileSync("src/2/input.txt").toString();

type Shape = "ROCK" | "PAPER" | "SCISSORS";
type Result = "WIN" | "LOSS" | "DRAW";

const INPUT_MAPPINGS = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
  X: "LOSS",
  Y: "DRAW",
  Z: "WIN",
} as { [k: string]: string };

const WIN_TABLE: { [k in Shape]: Shape } = {
  ROCK: "PAPER",
  PAPER: "SCISSORS",
  SCISSORS: "ROCK",
};

const LOSS_TABLE: { [k in Shape]: Shape } = {
  ROCK: "SCISSORS",
  PAPER: "ROCK",
  SCISSORS: "PAPER",
};

const SHAPE_SCORES: { [k in Shape]: number } = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const OUTCOME_SCORES: { [k in Result]: number } = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0,
};

const answer = input
  .split("\n")
  .slice(0, -1)
  .map((s) =>
    s.split(" ").map((inputChar) => INPUT_MAPPINGS[inputChar] as string)
  )
  .map((game) => {
    const them = game[0] as Shape;
    const result = game[1] as Result;

    let you: Shape | undefined;

    if (result === "DRAW") {
      you = them;
    } else if (result === "WIN") {
      you = WIN_TABLE[them];
    } else {
      you = LOSS_TABLE[them];
    }

    return OUTCOME_SCORES[result] + SHAPE_SCORES[you];
  })
  .reduce((a, b) => a + b, 0);

console.log(answer);
