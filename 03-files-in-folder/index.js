const fs = require("fs");
const path = require("path");
const folderPath = path.join(__dirname, "secret-folder");

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  for (let file of files) {
    const filePath = path.join(folderPath, `${file}`);

    fs.stat(filePath, (err, stat) => {
      if (err) throw err;

      if (stat.isFile()) {
        console.log(
          `${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${(
            stat.size / 1024
          ).toFixed(3)}kb`
        );
      }
    });
  }
});
