const getNUniqueIndex = (str, n) => {
  for (let i = n; i < str.length; ++i)
    if (new Set(str.slice(i - n, i)).size == n) return i;
};

export function part1(stream) {
  return getNUniqueIndex(stream, 4);
}

export function part2(stream) {
  return getNUniqueIndex(stream, 14);
}
