const fs = require("fs");
const path = require("path");

let dest = path.join(__dirname, "project-dist");

let stylesWrite = fs.createWriteStream(path.join(dest, "style.css"));

function copyAssets(src, dest) {
  fs.mkdir(dest, { recursive: true }, () => {
    fs.readdir(src, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        let source = path.join(src, file.name);
        let destination = path.join(dest, file.name);

        if (file.isDirectory()) {
          copyAssets(source, destination);
        } else {
          fs.copyFile(source, destination, () => {});
        }
      });
    });
  });
}

fs.mkdir(dest, { recursive: true }, () => {});
fs.readFile(path.join(__dirname, "template.html"), (err, file) => {
  if (err) throw err;

  let template = file.toString();
  let components = path.join(__dirname, "components");
  let html = path.join(dest, "index.html");

  fs.readdir(components, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      if (path.basename(file).split(".")[1] === "html") {
        let fileName =
          "{{" + path.parse(path.join(components, file)).name + "}}";

        fs.readFile(path.join(components, file), (err, file) => {
          if (err) throw err;

          template = template.replace(fileName, file.toString());
          fs.rm(html, { recursive: true, force: true }, () => {
            fs.writeFile(html, template, () => {});
          });
        });
      }
    });
  });
});

fs.readdir(path.join(__dirname, "styles"), (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    if (path.extname(file) === ".css") {
      const stylesRead = fs.createReadStream(
        path.join(__dirname, "styles", file)
      );
      stylesRead.on("data", chunk => stylesWrite.write(chunk + "\n"));
    }
  });
});

fs.rm(path.join(dest, "assets"), { recursive: true }, () => {
  copyAssets(path.join(__dirname, "assets"), path.join(dest, "assets"));
});
