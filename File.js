//Read from filesystem

const fs = require("fs");

fs.readFile("./docs/read.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data.toString());
});
//----------------------------------------------------------------

//Write to filesystem

fs.writeFile("./docs/write.txt", "Hello Mohammed,Adding some words", () => {
  console.log("The file has written successfully");
});

//----------------------------------------------------------------

//Direction of write from filesystem

if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) return console.error(err);
    console.log("The Folder has been created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) return console.log(err);
  });
  console.log("The Folder has been deleted");
}

//----------------------------------------------------------------

//Delete from filesystem

if (fs.existsSync("./docs/deleted.txt")) {
  fs.unlink("./docs/deleted.txt", (err) => {
    if (err) return console.error(err);
    console.log("The file has been deleted");
  });
}

//----------------------------------------------------------------
