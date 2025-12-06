import { readFileSync } from "node:fs";

const homework = readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((line) => line.trim().split(/\s+/));

const operations = homework.splice(-1, 1).flat();

let part1 = 0;

for (let i = 0; i < operations.length; i++) {
  const op = operations[i];
  let currentColResult = 0;

  for (let j = 0; j < homework.length; j++) {
    const num = parseInt(homework[j][i], 10);
    if (op === "+") {
      currentColResult += num;
      continue;
    }
    if (op === "*") {
      if (currentColResult === 0) {
        currentColResult = 1;
      }
      currentColResult *= num;
      continue;
    }
  }

  part1 += currentColResult;
}

console.log({ part1 });
