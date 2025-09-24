const fs = require("fs");
const path = "/data/file.txt";

fs.writeFileSync(path, "Hello from container!");

console.log("Wrote to file:", path);
