const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const resList = require("./restaurant.json");
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index", {
    title: "Index",
    style: "res.css",
    reses: resList.results,
  });
});

app.get("/restaurants/:res_id", (req, res) => {
  const resinfo = resList.results.filter((index) => {
    return index.id === Number(req.params.res_id);
  });
  res.render("show", { title: "Show", style: "res1.css", resinfo: resinfo });
});

app.get("/search", (req, res) => {
  console.log("req", req.query.yoursearch);
  const results = resList.results.filter((movie) => {
    return movie.name
      .toLowerCase()
      .includes(req.query.yoursearch.toLowerCase());
  });
  res.render("index", {
    reses: results,
    style: "res.css",
    yoursearch: req.query.yoursearch,
  });
});
app.listen(port, () => {
  console.log("running running running~");
});
