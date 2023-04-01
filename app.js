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

app.listen(port, () => {
  console.log("running running running~");
});
