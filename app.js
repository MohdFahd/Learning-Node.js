const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Define the directory where your static files (like HTML, CSS, JS) are located
// app.use(express.static(path.join(__dirname, "views")));

// register views engin
// app.set("view engine", "ejs");

app.get("/about", (req, res) => {
  res.sendFile("about.html", { root: path.join(__dirname, "views") });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "views") });
});
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
// app.use((req, res) => {
//   res.status(404).sendFile("404.html", { root: path.join(__dirname, "views") });
// });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
