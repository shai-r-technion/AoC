import { sum } from '../../utils.js';

const A = 'A'.charCodeAt(0);
const a = 'a'.charCodeAt(0);

const priority = (c) =>
  c === c.toUpperCase() ? c.charCodeAt(0) - A + 27 : c.charCodeAt(0) - a + 1;

const intersect = (a, b) => (Array.isArray(a) ? a : a.split('')).filter((c) => b.includes(c));

const unique = (a) => Array.from(new Set(a));

const chunk = (arr, n = 3) => {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
};

export function part1(backpacks) {
  return sum(
    backpacks
      .map((b) => [b.slice(0, b.length / 2), b.slice(b.length / 2)])
      .flatMap(([l, r]) => unique(intersect(l, r)).map(priority))
  );
}

export function part2(backpacks) {
  return sum(chunk(backpacks).map(([a, b, c]) => priority(intersect(intersect(a, b), c)[0])));
}

export function prepare(input) {
  return input.split('\n');
}
