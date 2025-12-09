import { readFileSync } from "node:fs";

const coords = readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(",").map((num) => parseInt(num, 10)));

let largestArea = 0;

for (let i = 0; i < coords.length; i++) {
  for (let j = i + 1; j < coords.length; j++) {
    const distX = Math.abs(coords[i][0] - coords[j][0]) + 1;
    const distY = Math.abs(coords[i][1] - coords[j][1]) + 1;
    const area = distX * distY;
    if (area > largestArea) {
      largestArea = area;
    }
  }
}

const part1 = largestArea;

console.log({ part1 });
