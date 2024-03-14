const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const db = require("./db");
const blog = require("./routes/blogRoute");
// express app
const app = express();
// listen for requests
app.listen(3000);

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');
app.use(morgan("dev"));

// MiddleWare & static files
app.use(express.static("public"));
// handle request from post from
app.use(express.urlencoded({ extended: true }));

const ddb = {
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
};
const database = new db.Database(ddb);

// app.use((req, res, next) => {
//   console.log("hostname " + req.hostname);
//   console.log("path " + req.path);
//   console.log("method " + req.method);
//   console.log(next());
//   next();
// });

app.get("/", (req, res) => {
  res.redirect("/blog");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Define Blog route
app.use("/blog", blog);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
