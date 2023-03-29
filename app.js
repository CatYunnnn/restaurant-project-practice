const express = require("express");
const mongoose = require("mongoose");
const resList = require("./models/res");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const db = mongoose.connection;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

app.post("/restaurants/newrestaurant", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const google_map = req.body.google_map;
  const rating = req.body.rating;
  const description = req.body.description;
  const newres = new resList({
    id: id,
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  });
  newres
    .save()
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.get("/", (req, res) => {
  resList
    .find()
    .lean()
    .then((reses) => res.render("index", { reses: reses, style: "res.css" }))
    .catch((error) => console.log(error));
});

app.get("/restaurants/:res_id", (req, res) => {
  resList
    .findOne({ id: Number(req.params.res_id) })
    .lean()
    .then((resinfo) => {
      res.render("show", {
        title: "Show",
        resinfo: resinfo,
        style: "res1.css",
      });
    })
    .catch((error) => console.log(error));
});

app.get("/search", (req, res) => {
  resList
    .find({ name: { $exists: true } })
    .lean()
    .then((reses) => {
      const results = reses.filter((res) =>
        res.name.toLowerCase().includes(req.query.yoursearch.toLowerCase())
      );
      res.render("index", {
        reses: results,
        style: "res.css",
        yoursearch: req.query.yoursearch,
      });
    })
    .catch((error) => console.log(error));
});

app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;

  resList
    .findOne({ id: Number(req.params.id) })
    .lean()
    .then((resinfo) => {
      res.render("edit", {
        resinfo: resinfo,
      });
    })
    .catch((error) => console.log(error));
});

app.post("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const category = req.body.category;
  const location = req.body.location;
  const phone = req.body.phone;
  const rating = req.body.rating;
  const description = req.body.description;
  resList
    .findOne({ id: Number(req.params.id) })
    .then((resinfo) => {
      resinfo.name = name;
      resinfo.category = category;
      resinfo.location = location;
      resinfo.phone = phone;
      resinfo.rating = rating;
      resinfo.description = description;
      resinfo.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  resList
    .findOne({ id: Number(req.params.id) })
    .then((resinfo) => {
      resinfo.deleteOne();
    })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log("running running running~");
});
