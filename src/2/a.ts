import { readFileSync } from "fs";

const input = readFileSync("src/2/input.txt").toString();

const SHAPE_CHARS = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
} as { [k: string]: string };

const WIN_TABLE = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

const SHAPE_SCORES = {
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
    const you = game[1] as "rock" | "paper" | "scissors";

    let outcomeScore: number;
    if (you === them) {
      outcomeScore = OUTCOME_SCORES.DRAW;
    } else if (you === WIN_TABLE[them]) {
      outcomeScore = OUTCOME_SCORES.WIN;
    } else {
      outcomeScore = OUTCOME_SCORES.LOSS;
    }

    return outcomeScore + SHAPE_SCORES[you];
  })
  .reduce((a, b) => a + b, 0);

console.log(answer);
