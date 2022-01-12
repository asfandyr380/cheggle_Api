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
    aboutUs: String,
    facebook: String,
    twitter: String,
    instagram: String,
    linkdin: String,
    num_rate: Number,
    rate: Number,
    hour: String,
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
    services: [{ type: String }],
    partners: [{ type: String }],
    location: {
      name: String,
      lat: Number,
      long: Number,
    },
    hour_details: [{
      title: String,
      time: String,
    }],
    pricing_list: [{ title: String, name: String, services: [{ type: String }], price: Number }],
    menu_list: [{ title: String, price: Number }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
    job_posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }],
  })
);

module.exports = User;
