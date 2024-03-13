const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Define the directory where your static files (like HTML, CSS, JS) are located
// app.use(express.static(path.join(__dirname, "views")));

// Register views engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Welcome: from the server", blogs: blogs });
});
// Handle "/about" route
app.get("/call", (req, res) => {
  res.render("call"); // Render the "about.ejs" template
});
app.get("/blog/create", (req, res) => {
  res.render("create"); // Render the "about.ejs" template
});

// Redirect "/about-us" to "/about"
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("404"); // Render the "404.ejs" template for all other routes
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
