const mongoose = require("mongoose");const resList = require("../../restaurant.json");
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
    for (let j = 3*i; j < 3 * i + 3; j++) {
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
      } = resList.results[j];
      promises.push(
        restaurantList.create({
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
































// const seed_user1 = {
//   email: "user1@example.com",
//   password: "12345678",
// };
// const seed_user2 = {
//   email: "user2@example.com",
//   password: "12345678",
// };
// db.once("open", () => {
//   console.log("mongodb connected!");
//   bcrypt
//     .genSalt(10)
//     .then((salt) => bcrypt.hash(seed_user1.password, salt))
//     .then((hash) =>
//       userList.create({
//         name: seed_user1.name,
//         email: seed_user1.email,
//         password: hash,
//       })
//     )
//     .then((user) => {
//       let userId = user._id;
//       // create restaurants for first user
//       const firstPromise = [];
//       for (let i = 0; i < 3; i++) {
//         const {
//           id,
//           name,
//           name_en,
//           category,
//           image,
//           location,
//           phone,
//           google_map,
//           rating,
//           description,
//         } = resList.results[i];
//         firstPromise.push(
//           restaurantList.create({
//             id,
//             name,
//             name_en,
//             category,
//             image,
//             location,
//             phone,
//             google_map,
//             rating,
//             description,
//             userId,
//           })
//         );
//       }
//       // 等待所有的 firstPromise 都完成後再繼續下一步
//       return Promise.all(firstPromise);
//     })
//     .then(() =>
//       bcrypt.genSalt(10).then((salt) => bcrypt.hash(seed_user2.password, salt))
//     )
//     .then((hash) =>
//       userList.create({
//         name: seed_user2.name,
//         email: seed_user2.email,
//         password: hash,
//       })
//     )
//     .then((user) => {
//       let userId = user._id;
//       const secondPromise = [];
//       for (let i = 3; i < 6; i++) {
//         const {
//           id,
//           name,
//           name_en,
//           category,
//           image,
//           location,
//           phone,
//           google_map,
//           rating,
//           description,
//         } = resList.results[i];
//         secondPromise.push(
//           restaurantList.create({
//             id,
//             name,
//             name_en,
//             category,
//             image,
//             location,
//             phone,
//             google_map,
//             rating,
//             description,
//             userId,
//           })
//         );
//       }
//       // 等待所有的 secondPromise 都完成後再繼續下一步
//       return Promise.all(secondPromise);
//     })
//     .then(() => {
//       console.log("done.");
//       process.exit();
//     })
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });
// });
