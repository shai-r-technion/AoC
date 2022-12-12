export function part1({ crates, instructions }) {
  for (const inst of instructions)
    crates[inst.to - 1].push(...crates[inst.from - 1].splice(-inst.count).reverse());

  return crates.map((c) => c.at(-1)).join('');
}

export function part2({ crates, instructions }) {
  for (const inst of instructions)
    crates[inst.to - 1].push(...crates[inst.from - 1].splice(-inst.count));

  return crates.map((c) => c.at(-1)).join('');
}

export function prepare(input) {
  const [crateLines, instructionLines] = input.split('\n\n').map((ls) => ls.split('\n'));
  const n = (crateLines[0].length + 1) / 4;
  const crates = Array.from({ length: n }, () => []);

  for (const line of crateLines.slice(0, -1))
    for (let i = 0; i < n; ++i)
      if (line[4 * i + 1] !== ' ') crates[i].unshift(line[4 * i + 1]);

  return {
    crates,
    instructions: instructionLines.map((l) => {
      const ns = l.match(/\d+/g).map((i) => parseInt(i));
      return { count: ns[0], from: ns[1], to: ns[2] };
    }),
  };
}
