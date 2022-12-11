const max2product = (arr) => {
  let a = 0;
  let b = 0;
  for (const x of arr)
    if (x > a) [a, b] = [x, a];
    else if (x > b) b = x;
  return a * b;
};

export function part1(monkeys) {
  const items = monkeys.map((m) => [...m.startingItems]);
  const inspects = Array(monkeys.length).fill(0);

  for (let r = 0; r < 20; ++r) {
    for (let m = 0; m < items.length; ++m) {
      inspects[m] += items[m].length;
      while (items[m].length) {
        const item = items[m].shift();
        const worry = Math.floor(monkeys[m].operation(item) / 3);
        items[monkeys[m].test[worry % monkeys[m].test.c === 0]].push(worry);
      }
    }
  }
  return max2product(inspects);
}

export function part2(monkeys) {
  const items = monkeys.map((m) => [...m.startingItems]);
  const inspects = Array(monkeys.length).fill(0);

  const mod = monkeys.reduce((a, c) => a * c.test.c, 1);

  for (let r = 0; r < 10000; ++r) {
    for (let m = 0; m < items.length; ++m) {
      inspects[m] += items[m].length;
      while (items[m].length) {
        const item = items[m].shift();
        const worry = monkeys[m].operation(item) % mod;
        items[monkeys[m].test[worry % monkeys[m].test.c === 0]].push(worry);
      }
    }
  }
  return max2product(inspects);
}

export function prepare(input) {
  return input.split('\n\n').map((m) => {
    const split = m.split('\n');
    return {
      startingItems: split[1]
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
