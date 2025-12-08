import { readFileSync } from "node:fs";

const junctions = readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(",").map((num) => parseInt(num, 10)));

const distances = [];
const circuits = [];

for (let i = 0; i < junctions.length; i++) {
  for (let j = i + 1; j < junctions.length; j++) {
    const distance = Math.sqrt(
      Math.pow(junctions[i][0] - junctions[j][0], 2) +
        Math.pow(junctions[i][1] - junctions[j][1], 2) +
        Math.pow(junctions[i][2] - junctions[j][2], 2)
    );

    distances.push({
      distance,
      nodes: [junctions[i].join(","), junctions[j].join(",")],
    });
  }
  circuits.push([junctions[i].join(",")]);
}

distances.sort((a, b) => a.distance - b.distance);

for (let i = 0; i < 1000; i++) {
  const connection = distances.shift();
  makeConnections(connection, circuits);
}

const part1circuits = circuits.toSorted((a, b) => a.length - b.length);

const part1 =
  part1circuits[part1circuits.length - 1].length *
  part1circuits[part1circuits.length - 2].length *
  part1circuits[part1circuits.length - 3].length;

let connection;
while (circuits.length > 1) {
  connection = distances.shift();
  makeConnections(connection, circuits);
}

const part2 =
  parseInt(connection.nodes[0].split(",")[0], 10) *
  parseInt(connection.nodes[1].split(",")[0], 10);

console.log({
  part1,
  part2,
});

function makeConnections(connection, circuits) {
  const circuitIdWithNode0 = circuits.findIndex((group) =>
    group?.includes(connection.nodes[0])
  );
  const circuitIdWithNode1 = circuits.findIndex((group) =>
    group?.includes(connection.nodes[1])
  );

  if (circuitIdWithNode0 !== circuitIdWithNode1) {
    circuits[circuitIdWithNode0].push(...circuits[circuitIdWithNode1]);
    circuits.splice(circuitIdWithNode1, 1);
  }
}
