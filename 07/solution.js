import { readFileSync } from "node:fs";

const map = readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

let part1 = 0;

for (let row = 1; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    if (map[row - 1][col] === "|" || map[row - 1][col] === "S") {
      const current = map[row][col];

      if (current === "." || current === "|") {
        map[row][col] = "|";
        continue;
      }
      if (current === "^") {
        map[row][col - 1] = "|";
        map[row][col + 1] = "|";
        part1 += 1;
        continue;
      }
    }
  }
}
console.log(map.map((line) => line.join("")).join("\n"));

for (let row = map.length - 1; row >= 0; row--) {
  for (let col = 0; col < map[row].length; col++) {
    const current = map[row][col];

    if (current === "|" || current === "S") {
      map[row][col] = map[row + 1]?.[col] ?? 1;
      continue;
    }
  }
  for (let col = 0; col < map[row].length; col++) {
    const current = map[row][col];

    if (current === "^") {
      map[row][col] = map[row][col - 1] + map[row][col + 1];
    }
  }
}

const part2 = map[0].filter((x) => x !== ".")[0];

console.log({ part1, part2 });
