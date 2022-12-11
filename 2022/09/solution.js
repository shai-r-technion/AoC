const hash = (x, y) => `${x},${y}`;

const sign = (x) => (x === 0 ? 0 : x > 0 ? 1 : -1);

export function part1(insts) {
  let hx = 0;
  let hy = 0;
  let tx = hx;
  let ty = hy;

  const visited = new Set([hash(tx, ty)]);
  for (const [dir, steps] of insts) {
    for (let i = 0; i < steps; ++i) {
      let px = hx;
      let py = hy;
      if (dir === 'R') ++hx;
      else if (dir === 'L') --hx;
      else if (dir === 'U') ++hy;
      else --hy;

      if (Math.abs(hx - tx) > 1 || Math.abs(hy - ty) > 1) {
        tx = px;
        ty = py;
        visited.add(hash(tx, ty));
      }
    }
  }

  return visited.size;
}

export function part2(insts) {
  const ps = Array.from(Array(10), () => [0, 0]);
  const visited = new Set([hash(...ps[9])]);

  for (const [dir, steps] of insts) {
    for (let s = 0; s < steps; ++s) {
      if (dir === 'R') ++ps[0][0];
      else if (dir === 'L') --ps[0][0];
      else if (dir === 'U') ++ps[0][1];
      else --ps[0][1];

      for (let p = 1; p < ps.length; ++p) {
        const xD = ps[p - 1][0] - ps[p][0];
        const yD = ps[p - 1][1] - ps[p][1];

        if (Math.abs(xD) > 1 || Math.abs(yD) > 1) {
          if (xD === 0) ps[p][1] += sign(yD);
          else if (yD === 0) ps[p][0] += sign(xD);
          else {
            ps[p][0] += xD > 0 ? 1 : -1;
            ps[p][1] += yD > 0 ? 1 : -1;
          }
        }
        visited.add(hash(...ps[9]));
      }
    }
  }

  return visited.size;
}

export function prepare(input) {
  return input.split('\n').map((l) => [l[0], parseInt(l.slice(2))]);
}
