const mongoose = require("mongoose");
const encodedPassword = encodeURIComponent(process.env.DB_PASS);

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://Moiz:${encodedPassword}@travel.whjtvv5.mongodb.net/?retryWrites=true&w=majority`
  );
  // console.log("MONGO CONNECTED");
};

module.exports = connectDB;
