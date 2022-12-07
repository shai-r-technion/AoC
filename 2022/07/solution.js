import { sum } from '../../utils.js';

const dirSizesImpl = (dir, sizes) => {
  let totalSize = 0;
  for (const [name, size] of Object.entries(dir))
    if (typeof size === 'number') totalSize += size;
    else totalSize += dirSizesImpl(dir[name], sizes);
  sizes.push(totalSize);
  return totalSize;
};

const dirSizes = (dirs) => {
  const sizes = [];
  dirSizesImpl(dirs, sizes);
  return sizes;
};

export function part1(dirs) {
  return sum(dirSizes(dirs).filter((size) => size < 100000));
}

export function part2(dirs) {
  return Math.min(
    ...dirSizes(dirs).filter((size, _, arr) => arr.at(-1) - size <= 40000000),
  );
}

const accessByArray = (obj, arr) => arr.reduce((ret, key) => ret[key], obj);

export function prepare(input) {
  const dirs = {};
  const pwd = [];
  let dir = dirs;

  const lines = input.split('\n');
  for (let i = 0; i < lines.length; ) {
    // first lines must be commands, lines that are not command are handled by inner loops
    const [cmd, arg] = lines[i].slice(2).split(' ');
    if (cmd === 'cd') {
      ++i;
      if (arg === '..') {
        pwd.pop();
        dir = accessByArray(dirs, pwd);
      } else {
        pwd.push(arg);
        dir = dir[arg] = {};
      }
    } else if (cmd == 'ls') {
      for (++i; i < lines.length && lines[i][0] !== '$'; ++i) {
        const [sizeS, name] = lines[i].split(' ');
        if (sizeS === 'dir') dir[name] = {};
        else dir[name] = parseInt(sizeS);
      }
    }
  }
  return dirs['/'];
}
