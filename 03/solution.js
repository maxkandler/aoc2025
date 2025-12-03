import { assert } from "node:console";
import { readFileSync } from "node:fs";

const batteries = readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((x) => x.split("").map((y) => parseInt(y, 10)));

let totalJoltage = 0;
let totalJoltagePart2 = 0;

for (const battery of batteries) {
  const highest = Math.max(...battery.slice(0, battery.length - 1));
  const remainingOptions = battery.slice(battery.indexOf(highest) + 1);
  const secondHighest = Math.max(...remainingOptions);

  const joltage = highest * 10 + secondHighest;
  totalJoltage += joltage;

  // Part 2
  let toRemoveCount = battery.length - 12;

  const origbattery = battery.slice();

  const newBattery = [];

  while (newBattery.length < 12) {
    for (let search = 9; search >= 0; search--) {
      const posHighest = battery.indexOf(search);
      if (
        posHighest === -1 ||
        newBattery.length + 1 + (battery.length - posHighest - 1) < 12
      ) {
        continue;
      }
      newBattery.push(search);
      battery.splice(0, posHighest + 1);

      break;
    }
  }

  assert(
    newBattery.length === 12,
    "Final battery should have 12 cells, has " + battery.length
  );

  const part2Joltage = parseInt(newBattery.join(""), 10);
  totalJoltagePart2 += part2Joltage;
}

console.log({ part1: totalJoltage, part2: totalJoltagePart2 });
