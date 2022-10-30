const fs = require("fs");
const path = require("path");

const writeStream = fs.createWriteStream(
  path.join(__dirname, "project-dist", "bundle.css"),
  "utf-8"
);

fs.readdir(path.join(__dirname, "styles"), (err, files) => {
  if (err) throw err;

  for (let file of files) {
    fs.stat(path.join(__dirname, "styles", `${file}`), function (err, stat) {
      if (err) throw err;

      if (stat.isFile() && path.extname(`${file}`) === ".css") {
        const readStream = fs.createReadStream(
          path.join(__dirname, "styles", `${file}`),
          "utf-8"
        );

        readStream.on("data", chunk => {
          writeStream.write(chunk);
        });
      }
    });
  }
});
