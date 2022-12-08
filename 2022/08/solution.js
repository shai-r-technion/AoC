const column = (arr, j) => Array.from(arr[0], (_, i) => arr[i][j]);

const isMax = (slice, value) =>
  Math.max(...slice) === value && slice.indexOf(value) === slice.lastIndexOf(value);

const isVisible1d = (row, p) =>
  isMax(row.slice(0, p + 1), row[p]) || isMax(row.slice(p), row[p]);

export function part1(trees) {
  let visible = 0;
  for (let i = 0; i < trees.length; ++i)
    for (let j = 0; j < trees[i].length; ++j)
      if (isVisible1d(trees[i], j) || isVisible1d(column(trees, j), i)) ++visible;
  return visible;
}

const scenicScore1d = (row, ti) => {
  let score = 1;

  let tmp, i;
  for (tmp = 1, i = ti - 1; row[i] < row[ti] && i > 0; --i, ++tmp);
  if (i < 0) --tmp;
  score *= tmp;

  for (tmp = 1, i = ti + 1; row[i] < row[ti] && i < row.length; ++i, ++tmp);
  if (i === row.length) --tmp;
  score *= tmp;

  return score;
};

const scenicScore = (trees, ti, tj) =>
  scenicScore1d(trees[ti], tj) * scenicScore1d(column(trees, tj), ti);

export function part2(trees) {
  let max = 0;
  for (let i = 0; i < trees.length; ++i)
    for (let j = 0; j < trees[i].length; ++j)
      max = Math.max(max, scenicScore(trees, i, j));
  return max;
}

export function prepare(input) {
  return input.split('\n').map((l) => l.split('').map((h) => parseInt(h)));
}
