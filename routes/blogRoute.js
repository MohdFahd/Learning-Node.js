const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("../db");

const ddb = {
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
};
const database = new db.Database(ddb);
router.get("/", (req, res) => {
  database.select("SELECT * FROM blogs ", (err, results) => {
    if (err) {
      console.error("Error selecting data: " + err);
      return res.status(500).send("Error selecting data");
    }
    console.log(results);
    res.render("index", { title: "Blog Details", blogs: results }); // Pass results to the template
  });
});
router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

router.post("/store", (req, res) => {
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
router.get("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
