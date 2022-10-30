const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, err => {
  if (err) throw err;
});
fs.readdir(
  path.join(__dirname, "files"),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      let src = path.join(__dirname, "files", file.name);
      let dest = path.join(__dirname, "files-copy", file.name);
      fs.copyFile(src, dest, err => {
        if (err) throw err;
      });
    });
  }
);
