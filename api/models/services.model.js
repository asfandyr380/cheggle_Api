const mongoose = require("mongoose");

const Services = mongoose.model(
    "Services",
    new mongoose.Schema({
        icon: String,
        title: String,
    })
);

module.exports = Services;
