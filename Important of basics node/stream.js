const fs = require("fs");

// Read Stream from filesystem.

const readStream = fs.createReadStream("./docs/ReadStream.txt", {
  encoding: "utf8",
});
const writeStream = fs.createWriteStream("./docs/WriteStream.txt");

readStream.on("data", (chunk) => {
  console.log("----New Chunk---- /n");
  console.log(chunk);
  //Write ithe chunk to the output stream
  writeStream.write("\n NEW CHCHUNK\n");
  writeStream.write(chunk);
});
