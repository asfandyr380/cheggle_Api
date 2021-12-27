const mongoose = require("mongoose");

const Categories = mongoose.model(
    "Categories",
    new mongoose.Schema({
        title: String,
        icon: String,
        color: String,
        type: String,
    })
);

module.exports = Categories;
