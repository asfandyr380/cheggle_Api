const mongoose = require("mongoose");

const Categories = mongoose.model(
    "Categories",
    new mongoose.Schema({
        title: String,
        icon: String,
        color: String,
        type: String,
        image: String,
    })
);

module.exports = Categories;
