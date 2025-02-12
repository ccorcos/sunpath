const fs = require("fs");

// Read SVG file
const svgContent = fs.readFileSync("sunpath.svg", "utf-8");

// Helper function to parse path data into points
function parsePathData(d) {
  const commands = d.match(/[A-Z][^A-Z]*/gi);
  const points = [];
  let currentX = 0;
  let currentY = 0;

  commands.forEach((cmd) => {
    const type = cmd[0];
    const coords = cmd
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(Number);

    if (type === "M" || type === "L") {
      currentX = coords[0];
      currentY = coords[1];
      points.push([currentX, currentY]);
    }
  });

  return points;
}

// Extract path data using regex
const pathRegex = /<path[^>]*d="([^"]*)"[^>]*>/g;
const pathPoints = [];
let match;

while ((match = pathRegex.exec(svgContent)) !== null) {
  const pathData = match[1];
  const points = parsePathData(pathData);
  pathPoints.push(points);
}

// Output points for each path
console.log("Path points:");
pathPoints.forEach((points, index) => {
  console.log(`\nPath ${index + 1}:`);
  points.forEach((point) => {
    console.log(`[${point[0]}, ${point[1]}]`);
  });
});
