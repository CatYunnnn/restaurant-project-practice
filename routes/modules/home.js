const express = require("express");
const router = express.Router();
const resList = require("../../models/res");
router.get("/", (req, res) => {
  const userId = req.user._id;
  resList
    .find({ userId })
    .lean()
    .sort({ name: "asc" })
    .then((reses) => res.render("index", { reses: reses, style: "res.css" }))
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});
router.get("/desc", (req, res) => {
  resList
    .find()
    .lean()
    .sort({ name: "desc" })
    .then((reses) => res.render("index", { reses: reses, style: "res.css" }))
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});
router.get("/category", (req, res) => {
  resList
    .find()
    .lean()
    .sort({ category: "asc" })
    .then((reses) => res.render("index", { reses: reses, style: "res.css" }))
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});
router.get("/location", (req, res) => {
  resList
    .find()
    .lean()
    .sort({ location: "asc" })
    .then((reses) => res.render("index", { reses: reses, style: "res.css" }))
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

module.exports = router;
