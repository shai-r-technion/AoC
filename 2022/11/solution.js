const max2product = (arr) => {
  let a = 0;
  let b = 0;
  for (const x of arr)
    if (x > a) [a, b] = [x, a];
    else if (x > b) b = x;
  return a * b;
};

const business = (monkeys, rounds, modifier) => {
  monkeys.forEach((m) => (m.inspects = 0));

  for (let r = 0; r < rounds; ++r) {
    for (const mon of monkeys) {
      mon.inspects += mon.items.length;
      while (mon.items.length) {
        const item = mon.items.shift();
        const worry = modifier(mon.operation(item));
        monkeys[mon.test[worry % mon.test.c === 0]].items.push(worry);
      }
    }
  }

  return max2product(monkeys.map((m) => m.inspects));
};

export function part1(monkeys) {
  return business(monkeys, 20, (worry) => Math.floor(worry / 3));
}

export function part2(monkeys) {
  const mod = monkeys.reduce((a, m) => a * m.test.c, 1);

  return business(monkeys, 10_000, (worry) => worry % mod);
}

export function prepare(input) {
  return input.split('\n\n').map((m) => {
    const split = m.split('\n');
    return {
      items: split[1]
        .split(':')[1]
        .slice(1)
        .split(', ')
        .map((x) => parseInt(x)),
      operation: eval(`old => ${split[2].slice('  Operation: new = '.length)}`),
      test: {
        c: parseInt(split[3].slice('  Test: divisible by '.length)),
        true: parseInt(split[4].slice('    If true: throw to monkey '.length)),
        false: parseInt(split[5].slice('    If false: throw to monkey '.length)),
      },
    };
  });
}
