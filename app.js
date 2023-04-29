const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const usePassport = require("./config/passport");
const resList = require("./models/res");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const routes = require("./routes");
const db = require("./config/mongoose");
const { use } = require("passport");
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg"); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash("warning_msg"); // 設定 warning_msg 訊息
  next();
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});
app.use(routes);
app.listen(process.env.PORT, () => {
  console.log("running running running~");
});
