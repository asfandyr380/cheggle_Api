const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    person: String,
    firstname: String,
    lastname: String,
    phone: String,
    fax: String,
    mobile: String,
    website: String,
    email: String,
    password: String,
    companyName: String,
    b1: String,
    b2: String,
    street: String,
    house: String,
    postalCode: String,
    city: String,
    district: String,
    country: String,
    photo: String,
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews"
      }
    ],
    services: [{type: String}],
    aboutUs: String,
    partners: [{type: String}],
  })
);

module.exports = User;
