const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const db = require("./db");
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
  database.select("SELECT * FROM blogs", (err, results) => {
    if (err) {
      console.error("Error selecting data: " + err);
      return res.status(500).send("Error selecting data");
    }
    console.log("Selected data:", results);
    res.render("index", { title: "Home", blogs: results }); // Pass results to the template
  });
});

app.get("/addBlog", (req, res) => {
  // Connect to the database
  database.connect();
  database.insert(
    "INSERT INTO blogs (name, snippet) VALUES (?, ?)",
    ["Yoshi finds eggs", "Lorem ipsum dolor sit amet consectetur"],
    (err, results) => {
      if (err) {
        console.error("Error inserting data: " + err);
        return;
      }
      console.log("Inserted data:", results);
    }
  );
  database.end();
  res.redirect("/");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});
app.post("/blog/store", (req, res) => {
  const data = req.body;
  database.connect();
  database.insert(
    "INSERT INTO blogs (name, snippet, body) VALUES (?, ?, ?)",
    [data.name, data.snippet, data.body],
    (err, results) => {
      if (err) {
        console.error("Error inserting data: " + err);
        return;
      }
      res.redirect("/");
    }
  );
  // database.end();
});
app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  database.select(`SELECT * FROM blogs where id=${id}`, (err, results) => {
    if (err) {
      console.error("Error selecting data: " + err);
      return res.status(500).send("Error selecting data");
    }
    console.log(results);
    res.render("blog_details", { title: "Blog Details", blog: results }); // Pass results to the template
  });
});
app.delete("/blog/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  database.delete(`DELETE FROM blogs WHERE id=${id}`, (err, results) => {
    if (err) {
      console.error("Error deleting data: " + err);
    }
    res.json({
      redirect: "/",
    });
    console.log("Deleted data:", results);
  });
});
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
