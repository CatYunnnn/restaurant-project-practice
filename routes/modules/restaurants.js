const express = require("express");
const router = express.Router();
const resList = require("../../models/res");

router.get("/search", (req, res) => {
  resList
    .find({
      $or: [{ name: { $exists: true } }, { category: { $exists: true } }],
    })
    .lean()
    .then((reses) => {
      const results = reses.filter((res) => {
        if (
          res.name.includes(req.query.yoursearch.toLowerCase()) ||
          res.name.includes(req.query.yoursearch.toUpperCase()) ||
          res.category.includes(req.query.yoursearch.toLowerCase())
        ) {
          return res;
        }
      });
      res.render("index", {
        reses: results,
        style: "res.css",
        yoursearch: req.query.yoursearch,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.get("/new", (req, res) => {
  return res.render("new");
});

router.get("/:res_id", (req, res) => {
  resList
    .findOne({ id: Number(req.params.res_id) })
    .lean()
    .then((resinfo) => {
      res.render("show", {
        title: "Show",
        resinfo: resinfo,
        style: "show.css",
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.get("/:id/edit", (req, res) => {
  resList
    .findOne({ id: Number(req.params.id) })
    .lean()
    .then((resinfo) => {
      res.render("edit", {
        resinfo: resinfo,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, category, location, phone, rating, description } = req.body;
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
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  resList
    .deleteOne({ id: Number(req.params.id) })
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.post("/newrestaurant", (req, res) => {
  let userId = req.user._id;
  const {
    id,
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  const newres = new resList({
    id,
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId,
  });
  newres
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
