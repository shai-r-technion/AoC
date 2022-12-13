import { sum } from '../../utils.js';

const compare = (l, r) => {
  if (typeof l === 'number' && typeof r === 'number') {
    return l - r;
  }

  if (!Array.isArray(l)) l = [l];
  if (!Array.isArray(r)) r = [r];

  for (let i = 0; i < l.length && i < r.length; ++i) {
    const res = compare(l[i], r[i]);
    if (res !== 0) return res;
  }

  return l.length - r.length;
};

export function part1(packetPairs) {
  return sum(packetPairs.map((p, i) => (compare(...p) < 0 ? i + 1 : 0)));
}

export function part2(packetPairs) {
  const flat = packetPairs.flat(1);
  const sorted = [[[2]], [[6]], ...flat].sort(compare);

  const two = sorted.findIndex((p) => p.length === 1 && p[0].length && p[0][0] === 2) + 1;
  const six = sorted.findIndex((p) => p.length === 1 && p[0].length && p[0][0] === 6) + 1;
  return two * six;
}

export function prepare(input) {
  return input.split('\n\n').map((ls) => ls.split('\n').map(eval));
}
