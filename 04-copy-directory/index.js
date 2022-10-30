const fs = require("fs");
const path = require("path");

const dest = path.join(__dirname, "files-copy");
const src = path.join(__dirname, "files");

function copyDir(src) {
  fs.mkdir(dest, { recursive: true }, () => {
    fs.readdir(src, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        const source = path.join(src, file);
        const destination = path.join(dest, file);
        fs.copyFile(source, destination, () => {});
      });
    });
  });
}

fs.rm(dest, { recursive: true }, () => {
  copyDir(src);
});
