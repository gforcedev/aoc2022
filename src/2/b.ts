import { readFileSync } from "fs";

const input = readFileSync("src/2/input.txt").toString();

type Shape = "rock" | "paper" | "scissors";

const SHAPE_CHARS = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "LOSS",
  Y: "DRAW",
  Z: "WIN",
} as { [k: string]: string };

const WIN_TABLE: { [k in Shape]: Shape } = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

const LOSS_TABLE: { [k in Shape]: Shape } = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const SHAPE_SCORES: { [k in Shape]: number } = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const OUTCOME_SCORES = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0,
};

const answer = input
  .split("\n")
  .slice(0, -1)
  .map((s) => s.split(" ").map((shapeChar) => SHAPE_CHARS[shapeChar] as string))
  .map((game) => {
    const them = game[0] as "rock" | "paper" | "scissors";
    const result = game[1] as "LOSS" | "DRAW" | "WIN";

    let you: "rock" | "paper" | "scissors" | undefined;

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
