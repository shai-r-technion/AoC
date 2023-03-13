#!/usr/bin/env node

import { argv } from 'node:process';
import { readdir, readFile } from 'node:fs/promises';
import { statSync } from 'fs';

const id = (x) => x;

async function resolveDate(argv) {
  let [, , day, year] = argv;

  day = parseInt(day) || null;
  year = parseInt(year) || null;

  if (year == null) {
    const yearDies = await readdir('.');
    year = Math.max(
      ...yearDies
        .filter((f) => statSync(f).isDirectory())
        .map((f) => parseInt(f))
        .filter((n) => !Number.isNaN(n)),
    );
  }
  if (day == null) {
    const dayDirs = await readdir(`./${year}`);
    day = Math.max(
      ...dayDirs
        .filter((f) => statSync(`./${year}/${f}`).isDirectory())
        .map((f) => parseInt(f))
        .filter((n) => !Number.isNaN(n)),
    );
  }

  return { day, year };
}

async function main() {
  let testFlagIndex = argv.indexOf('--test');
  if (testFlagIndex !== -1) argv.splice(testFlagIndex, 1);
  testFlagIndex = argv.indexOf('-t');
  if (testFlagIndex !== -1) argv.splice(testFlagIndex, 1);

  const { day, year } = await resolveDate(argv);

  const mod = await import(`./${year}/${String(day).padStart(2, '0')}/solution.js`);

  const inputFile = await readFile(
    `./${year}/${String(day).padStart(2, '0')}/${testFlagIndex !== -1 ? 'test' : 'input'}.txt`,
    { encoding: 'utf8' },
  );

  console.log(`${year} Day ${day}:`);
  console.log(` Part 1: ${mod.part1((mod.prepare ?? id)(inputFile))}`);
  console.log(` Part 2: ${mod.part2((mod.prepare ?? id)(inputFile))}`);
}

main();
