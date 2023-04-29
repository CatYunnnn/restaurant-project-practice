const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const resSchema = new Schema({
  id: {
    type: "number",
  },
  name: {
    type: "string",
  },
  name_en: {
    type: "string",
  },
  category: {
    type: "string",
  },
  image: {
    type: "string",
  },
  location: {
    type: "string",
  },
  phone: {
    type: "string",
  },
  google_map: {
    type: "string",
  },
  rating: {
    type: "number",
  },
  description: {
    type: "string",
  },
  userId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("restaurantList", resSchema);
