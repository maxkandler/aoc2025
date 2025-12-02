import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt", "utf8")
  .split(",")
  .map((x) => x.split("-").map((y) => parseInt(y, 10)));

let part1 = 0;
let part2 = 0;

for (const range of data) {
  for (let i = range[0]; i <= range[1]; i++) {
    const numberString = i.toString();
    if (numberString.length % 2 === 0) {
      const numPart1 = numberString.slice(
        0,
        Math.floor(numberString.length / 2)
      );
      const numPart2 = numberString.slice(Math.floor(numberString.length / 2));
      if (numPart1 === numPart2) {
        part1 += i;
      }
    }

    for (let j = 0; j < numberString.length; j++) {
      if (numberString.length % j !== 0) {
        continue;
      }
      const partial = numberString.slice(0, j);
      const filled = partial.padEnd(numberString.length, partial);
      if (filled === numberString) {
        part2 += i;
        break;
      }
    }
  }
}

console.log({ part1, part2 });
