//Read from filesystem

const fs = require("fs");

fs.readFile("./docs/read.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data.toString());
});
//----------------------------------------------------------------

//Write to filesystem

fs.writeFile("./docs/write.txt", (err, data) => {});

//----------------------------------------------------------------

//Direction of write from filesystem

//----------------------------------------------------------------

//Delete from filesystem

//----------------------------------------------------------------
