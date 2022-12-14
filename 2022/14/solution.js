const hash = (x, y) => `${x},${y}`;

export function part1({ blk, maxRow }) {
  let u = 0;
  while (true) {
    let r = 0;
    let c = 500;
    while (true) {
      if (r === maxRow) return u;

      if (!blk.has(hash(r + 1, c))) ++r;
      else if (!blk.has(hash(r + 1, c - 1))) ++r, --c;
      else if (!blk.has(hash(r + 1, c + 1))) ++r, ++c;
      else {
        blk.add(hash(r, c));
        ++u;
        break;
      }
    }
  }
}

export function part2({ blk, maxRow }) {
  let u = 0;
  while (!blk.has(hash(0, 500))) {
    let r = 0;
    let c = 500;
    while (true) {
      if (r === maxRow + 1) break;

      if (!blk.has(hash(r + 1, c))) ++r;
      else if (!blk.has(hash(r + 1, c - 1))) ++r, --c;
      else if (!blk.has(hash(r + 1, c + 1))) ++r, ++c;
      else break;
    }
    blk.add(hash(r, c));
    ++u;
  }
  return u;
}

export function prepare(input) {
  const blk = new Set();
  let maxRow = -1;

  input
    .split('\n')
    .map((l) => l.split(' -> ').map((p) => p.split(',').map((n) => parseInt(n))))
    .forEach((ranges) => {
      for (let i = 1; i < ranges.length; ++i) {
        let [mr, Mr] = [ranges[i - 1][1], ranges[i][1]].sort();
        let [mc, Mc] = [ranges[i - 1][0], ranges[i][0]].sort();
        if (maxRow < Mr) maxRow = Mr;

        for (let r = mr; r <= Mr; ++r) for (let c = mc; c <= Mc; ++c) blk.add(hash(r, c));
      }
    });

  return { blk, maxRow };
}
