const { default: mongoose } = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
