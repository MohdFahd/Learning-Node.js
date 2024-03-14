const axios = require("axios");
const fs = require("fs");

async function downloadMedia(url, outputPath) {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    // Create a writable stream to save the media
    const fileStream = fs.createWriteStream(outputPath);

    // Pipe the response stream to the file stream
    response.data.pipe(fileStream);

    // Return a promise that resolves when the download is complete
    return new Promise((resolve, reject) => {
      fileStream.on("finish", resolve);
      fileStream.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading media:", error);
    throw error;
  }
}

// Example usage:
const mediaUrl = "https://youtu.be/h3EJICKwITw?si=9ajHwa2dBs921r3R";
const outputFilePath = "you.mp4";

downloadMedia(mediaUrl, outputFilePath)
  .then(() => {
    console.log("Media downloaded successfully!");
  })
  .catch((error) => {
    console.error("Failed to download media:", error);
  });
