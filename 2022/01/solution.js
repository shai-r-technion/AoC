import { sum } from '../../utils.js';

export function part1(elves) {
  return Math.max(...elves.map(sum));
}

export function part2(elves) {
  return sum(
    elves
      .map(sum)
      .sort((a, b) => b - a)
      .slice(0, 3),
  );
}

export function prepare(input) {
  return input.split('\n\n').map((s) => s.split('\n').map((x) => parseInt(x)));
}
