import { readFileSync } from "node:fs";

const homework = readFileSync("./input.txt", "utf8").split("\n");

const operations = homework.splice(-1, 1)[0].split("");

const ranges = [];

let currentStart = 0;
for (let i = 1; i < operations.length; i++) {
  if (operations[i] !== " ") {
    ranges.push([currentStart, i - 2]);
    currentStart = i;
  }
}
ranges.push([currentStart, operations.length - 1]);

let part2 = 0;
for (let range = 0; range < ranges.length; range++) {
  const [start, end] = ranges[range];
  const op = operations[start];

  let currentColResult = op === "*" ? 1 : 0;

  for (let i = end; i >= start; i--) {
    let currentNumber = 0;
    for (let j = 0; j < homework.length; j++) {
      const num = parseInt(homework[j][i], 10);
      if (isNaN(num)) continue;
      currentNumber *= 10;
      currentNumber += num;
    }

    if (op === "+") {
      currentColResult += currentNumber;
      continue;
    }
    if (op === "*") {
      currentColResult *= currentNumber;
      continue;
    }
  }

  part2 += currentColResult;
}

console.log({ part2 });
