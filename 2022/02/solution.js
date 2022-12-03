import { sum } from '../../utils.js';

const LOSE = 0;
const DRAW = 3;
const WIN = 6;

const ROCK = 1;
const PAPER = 2;
const SCIZZORS = 3;

const outcomes = {
  A: { X: DRAW, Y: WIN, Z: LOSE },
  B: { X: LOSE, Y: DRAW, Z: WIN },
  C: { X: WIN, Y: LOSE, Z: DRAW },
};

const scoreB = {
  A: { X: LOST + SCIZZORS, Y: DRAW + ROCK, Z: WIN + PAPER },
  B: { X: LOST + ROCK, Y: DRAW + PAPER, Z: WIN + SCIZZORS },
  C: { X: LOST + PAPER, Y: DRAW + SCIZZORS, Z: WIN + ROCK },
};

export function part1(strategy) {
  return sum(
    strategy.map(([a, b]) => outcomes[a][b] + (b === 'X' ? ROCK : b === 'Y' ? PAPER : SCIZZORS))
  );
}

export function part2(strategy) {
  return sum(strategy.map(([a, b]) => scoreB[a][b]));
}

export function prepare(input) {
  return input.split('\n').map((m) => m.split(' '));
}
