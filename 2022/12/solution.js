const hash = (a, b) => `${a},${b}`;

const shortest = (map, sx, sy, ex, ey) => {
  const todo = [[0, sx, sy]];
  const visited = new Set([hash(sx, sy)]);

  while (todo.length) {
    const [d, x, y] = todo.shift();

    for (const [nx, ny] of [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]) {
      if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[ny].length) continue;
      if (visited.has(hash(nx, ny))) continue;

      if (map[ny][nx].charCodeAt(0) - map[y][x].charCodeAt(0) > 1) continue;

      if (nx === ex && ny === ey) return d + 1;

      todo.push([d + 1, nx, ny]);
      visited.add(hash(nx, ny));
    }
  }

  return Infinity;
};

export function part1(map) {
  let sx, sy;
  let ex, ey;
  for (let i = 0; i < map.length; ++i)
    for (let j = 0; j < map.length; ++j)
      if (map[i][j] === 'S') {
        sx = j;
        sy = i;
        map[i][j] = 'a';
      } else if (map[i][j] === 'E') {
        ex = j;
        ey = i;
        map[i][j] = 'z';
      }

  return shortest(map, sx, sy, ex, ey);
}

export function part2(map) {
  let ex, ey;
  for (let i = 0; i < map.length; ++i)
    for (let j = 0; j < map.length; ++j)
      if (map[i][j] === 'S') map[i][j] = 'a';
      else if (map[i][j] === 'E') {
        ex = j;
        ey = i;
        map[i][j] = 'z';
      }

  let min = Infinity;

  for (let i = 0; i < map.length; ++i)
    for (let j = 0; j < map[i].length; ++j)
      if (map[i][j] === 'a' || map[i][j] === 'S')
        min = Math.min(min, shortest(map, j, i, ex, ey));

  return min;
}

export function prepare(input) {
  return input.split('\n').map((l) => l.split(''));
}
