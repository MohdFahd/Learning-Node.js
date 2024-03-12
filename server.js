const http = require("http");

const server = http.createServer(function (req, res) {
  console.log("server started");
  console.log(req.url, req.method);
  // Setheader content type
  //   res.setHeader("Content-Type", "text/plain");
  //   res.write("hello Mohammed to my page ");
  //   res.end();
  res.setHeader("Content-Type", "text/html");
  const fs = require("fs");
  let path = "./views";

  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about.html");
      //   res.end();
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;

      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      //   console.log(err);
      res.end();
    } else {
      res.write(data, res.url);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000");
});
