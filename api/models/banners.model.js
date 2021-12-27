const mongoose = require("mongoose");

const Banners = mongoose.model(
  "Banners",
  new mongoose.Schema({
    image: String
  })
);

module.exports = Banners;
