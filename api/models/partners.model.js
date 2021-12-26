const mongoose = require("mongoose");

const Partners = mongoose.model(
  "Partners",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Partners;
