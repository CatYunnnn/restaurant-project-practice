const mongoose = require("mongoose");
const resList = require("../../restaurant.json");
const restaurantList = require("../res");
const userList = require("../user");
const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
const userseeds = [
  { email: "user1@example.com", password: "12345678" },
  { email: "user2@example.com", password: "12345678" },
];

db.once("open", async () => {
  console.log("mongodb connected!");
  const promises = [];
  for (let i = 0; i < userseeds.length; i++) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userseeds[i].password, salt);
    const user = await userList.create({
      email: userseeds[i].email,
      password: hash,
    });
    const userId = user._id;
    // create restaurants for first user
    for (let j = 3 * i; j < 3 * i + 3; j++) {
      promises.push(
        restaurantList.create({
          ...resList.results[j],
          userId,
        })
      );
    }
  }
  try {
    await Promise.all(promises);
    console.log("done.");
    process.exit();
  } catch (error) {
    console.error(error);
  }
});
