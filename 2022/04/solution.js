export function part1(pairs) {
  return pairs.filter(
    ([[a1, b1], [a2, b2]]) => (a1 <= a2 && b2 <= b1) || (a2 <= a1 && b1 <= b2)
  ).length;
}

export function part2(pairs) {
  return pairs.filter(
    ([[a1, b1], [a2, b2]]) => (a1 <= a2 && a2 <= b1) || (a2 <= a1 && a1 <= b2)
  ).length;
}

export function prepare(input) {
  return input
    .split('\n')
    .map((l) => l.split(',').map((p) => p.split('-').map((n) => parseInt(n))));
}
