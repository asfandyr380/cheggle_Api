const mongoose = require("mongoose");

const BusinessType = mongoose.model(
    "BusinessType",
    new mongoose.Schema({
        name: String,
    })
);

const Business = mongoose.model(
    "Business",
    new mongoose.Schema({
        name: String,
    })
);

module.exports = { Business, BusinessType };
