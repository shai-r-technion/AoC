export function part1(cmds) {
  let cycle = 0;
  let x = 1;
  let out = 0;
  const ao = () => [20, 60, 100, 140, 180, 220].includes(++cycle) && (out += cycle * x);
  for (const [op, im] of cmds) {
    if (op === 'noop') ao();
    else {
      ao();
      ao();
      x += im;
    }
  }
  return out;
}

export function part2(cmds) {
  let p = 0;
  let x = 1;
  let out = '\n';

  const c = () => {
    if ([x - 1, x, x + 1].includes(p)) out += '#';
    else out += '.';

    p = ++p % 40;
    if (p === 0) out += '\n';
  };

  for (const [op, im] of cmds) {
    if (op === 'noop') c();
    else {
      c();
      c();
      x += im;
    }
  }

  return out;
}

export function prepare(input) {
  return input.split('\n').map((l) => [l.slice(0, 4), parseInt(l.slice(4))]);
}
