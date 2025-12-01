import { readFileSync } from "node:fs";

const data = readFileSync("./input/01.txt", "utf8").split("\n");

let timesAtStart = 0;
let timesAtStartDuringRun = 0;
let currentPosition = 50;

function mod(n, m) {
  return ((n % m) + m) % m;
}

for (const instruction of data) {
  const direction = instruction.substring(0, 1) === "L" ? -1 : 1;
  const count = parseInt(instruction.substring(1), 10);
  const move = direction * count;

  const passesOverZero = Math.abs(Math.trunc(move / 100));
  timesAtStartDuringRun += passesOverZero;

  const rest = move % 100;

  if (
    (currentPosition + rest >= 100 || currentPosition + rest <= 0) &&
    rest !== 0 &&
    currentPosition !== 0
  ) {
    timesAtStartDuringRun++;
  }

  const newPosition = mod(currentPosition + move, 100);

  if (newPosition === 0) {
    timesAtStart++;
  }

  currentPosition = newPosition;
}

console.log({
  part1: timesAtStart,
  part2: timesAtStartDuringRun,
});
