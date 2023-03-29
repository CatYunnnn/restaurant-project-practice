const mongoose = require("mongoose");
const resList = require("../../restaurant.json");
const restaurantList = require("../res");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
  for (let i = 0; i < resList.results.length; i++) {
    restaurantList.create({
      id: `${resList.results[i].id}`,
      name: `${resList.results[i].name}`,
      name_en: `${resList.results[i].name_en}`,
      category: `${resList.results[i].category}`,
      image: `${resList.results[i].image}`,
      location: `${resList.results[i].location}`,
      phone: `${resList.results[i].phone}`,
      google_map: `${resList.results[i].google_map}`,
      rating: `${resList.results[i].rating}`,
      description: `${resList.results[i].description}`,
    });
  }
  console.log("done");
});
