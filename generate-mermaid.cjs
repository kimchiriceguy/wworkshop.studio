const fs = require("fs");
const path = require("path");

function walk(dir, parent, lines) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items.forEach(item => {
    const id = dir + "/" + item.name;
    const node = id.replace(/[^a-zA-Z0-9]/g, "_");

    lines.push(`    ${parent} --> ${node}`);
    lines.push(`    ${node}["${item.name}"]`);

    if (item.isDirectory()) {
      walk(path.join(dir, item.name), node, lines);
    }
  });
}

function generateMermaid(root) {
  const rootId = root.replace(/[^a-zA-Z0-9]/g, "_");
  const lines = [`flowchart TD`, `    ${rootId}["${path.basename(root)}"]`];

  walk(root, rootId, lines);

  return lines.join("\n");
}

const projectRoot = "."; // change if needed
const output = generateMermaid(projectRoot);

fs.writeFileSync("project_structure.mmd", output);
console.log("Generated: project_structure.mmd");
