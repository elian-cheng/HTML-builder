const path = require("path");
const fs = require("fs");
const process = require("process");

const stream = fs.createWriteStream(path.join(__dirname, "text.txt"), "utf-8");

process.stdout.write("Please, write something:\n");

process.stdin.on("data", data => {
  if (data.toString().trim() === "exit") {
    console.log("Done!");
    process.exit();
  }
  stream.write(data);
});

process.on("SIGINT", () => {
  console.log("Done!");
  process.exit();
});
