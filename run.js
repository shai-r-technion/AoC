#!/usr/bin/env node

import { argv } from 'node:process';
import { readFile } from 'node:fs/promises';

const id = (x) => x;

async function main() {
  let testFlagIndex = argv.indexOf('--test');
  if (testFlagIndex === -1) testFlagIndex = argv.indexOf('-t');
  if (testFlagIndex !== -1) argv.splice(testFlagIndex);

  let [, , day, year] = argv;
  day ??= new Date().getDate().toString();
  year ??= new Date().getFullYear().toString();

  const mod = await import(`./${year}/${day.padStart(2, '0')}/solution.js`);

  const inputFile = await readFile(
    `./${year}/${day.padStart(2, '0')}/${testFlagIndex !== -1 ? 'test' : 'input'}.txt`,
    { encoding: 'utf8' },
  );

  console.log(`Part 1: ${mod.part1((mod.prepare ?? id)(inputFile))}`);
  console.log(`Part 2: ${mod.part2((mod.prepare ?? id)(inputFile))}`);
}

main();
