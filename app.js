const express = require("express");
const mongoose = require('mongoose');
const resList = require("./models/res");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const routes = require('./routes');
const db = require("./config/mongoose");

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(routes);
// app.get("/restaurants/new", (req, res) => {
//   return res.render("new");
// });

// app.post("/restaurants/newrestaurant", (req, res) => {
//   const {
//     id,
//     name,
//     name_en,
//     category,
//     image,
//     location,
//     phone,
//     google_map,
//     rating,
//     description,
//   } = req.body;
//   const newres = new resList({
//     id: id,
//     name,
//     name_en,
//     category,
//     image,
//     location,
//     phone,
//     google_map,
//     rating,
//     description,
//   });
//   newres
//     .save()
//     .then(() => res.redirect("/"))
//     .catch((err) => {
//       console.log(err);
//       res.render("errorPage", { error: err.message });
//     });
// });

// app.get("/", (req, res) => {
//   resList
//     .find()
//     .lean()
//     .then((reses) => res.render("index", { reses: reses, style: "res.css" }))
//     .catch((err) => {
//       console.log(err);
//       res.render("errorPage", { error: err.message });
//     });
// });

// app.get("/restaurants/:res_id", (req, res) => {
//   resList
//     .findOne({ id: Number(req.params.res_id) })
//     .lean()
//     .then((resinfo) => {
//       res.render("show", {
//         title: "Show",
//         resinfo: resinfo,
//         style: "show.css",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.render("errorPage", { error: err.message });
//     });
// });

// app.get("/restaurants/search", (req, res) => {
//   resList
//     .find({
//       $or: [{ name: { $exists: true } }, { category: { $exists: true } }],
//     })
//     .lean()
//     .then((reses) => {
//       const results = reses.filter((res) => {
//         if (
//           res.name.toLowerCase().includes(req.query.yoursearch.toLowerCase()) ||
//           res.category
//             .toLowerCase()
//             .includes(req.query.yoursearch.toLowerCase())
//         ) {
//           return res;
//         }
//       });
//       res.render("index", {
//         reses: results,
//         style: "res.css",
//         yoursearch: req.query.yoursearch,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.render("errorPage", { error: err.message });
//     });
// });

// app.get("/restaurants/:id/edit", (req, res) => {
//   const id = req.params.id;

//   resList
//     .findOne({ id: Number(req.params.id) })
//     .lean()
//     .then((resinfo) => {
//       res.render("edit", {
//         resinfo: resinfo,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.render("errorPage", { error: err.message });
//     });
// });

// app.put("/restaurants/:id", (req, res) => {
//   const id = req.params.id;
//   const name = req.body.name;
//   const category = req.body.category;
//   const location = req.body.location;
//   const phone = req.body.phone;
//   const rating = req.body.rating;
//   const description = req.body.description;
//   resList
//     .findOne({ id: Number(req.params.id) })
//     .then((resinfo) => {
//       resinfo.name = name;
//       resinfo.category = category;
//       resinfo.location = location;
//       resinfo.phone = phone;
//       resinfo.rating = rating;
//       resinfo.description = description;
//       resinfo.save();
//     })
//     .then(() => res.redirect(`/restaurants/${id}`))
//     .catch((err) => {
//       console.log(err);
//       res.render("errorPage", { error: err.message });
//     });
// });

// app.delete("/restaurants/:id", (req, res) => {
//   const id = req.params.id;
//   resList
//     .deleteOne({ id: Number(req.params.id) })
//     .then(() => res.redirect("/"))
//     .catch((err) => {
//       console.log(err);
//       res.render("errorPage", { error: err.message });
//     });
// });

app.listen(port, () => {
  console.log("running running running~");
});
