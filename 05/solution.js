import { readFileSync } from "node:fs";

const inventory = readFileSync("./input.txt", "utf8").split("\n");

const freshRanges = [];
const availableIngredients = new Set();

for (const line of inventory) {
  if (line.trim() === "") continue;

  if (line.includes("-")) {
    const [start, end] = line.split("-").map((x) => parseInt(x, 10));
    freshRanges.push([start, end]);
    continue;
  }

  availableIngredients.add(parseInt(line, 10));
}

freshRanges.sort((a, b) => (a[0] < b[0] ? (a[0] === b[0] ? 0 : -1) : 1));

const mergedRanges = [];
for (let i = 0; i < freshRanges.length; i++) {
  const [currentStart, currentEnd] = freshRanges[i];
  if (mergedRanges.length === 0) {
    mergedRanges.push([currentStart, currentEnd]);
    continue;
  }

  const [, lastEnd] = mergedRanges[mergedRanges.length - 1];
  if (currentStart <= lastEnd) {
    mergedRanges[mergedRanges.length - 1][1] = Math.max(lastEnd, currentEnd);
  } else {
    mergedRanges.push([currentStart, currentEnd]);
  }
}

console.log(mergedRanges);

const freshAvailableIngredients = new Set();

for (const ingredient of availableIngredients) {
  for (const [start, end] of mergedRanges) {
    if (ingredient >= start && ingredient <= end) {
      freshAvailableIngredients.add(ingredient);
      break;
    }
  }
}

let freshIngredientsCount = 0;

for (const [start, end] of mergedRanges) {
  freshIngredientsCount += end - start + 1;
}

console.log({
  part1: freshAvailableIngredients.size,
  part2: freshIngredientsCount,
});
