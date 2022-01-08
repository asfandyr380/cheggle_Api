const mongoose = require("mongoose");

const AppPackages = mongoose.model(
    "AppPackages",
    new mongoose.Schema({
        title: String,
        subtitle: String,
        price: Number,
        recursive: Boolean,
        additional_price: Number,
        button_text: String,
        premium: Boolean,
        feature_list: [{ title: String, spacial: Boolean }],
        isSelected: Boolean,
        imagePath: String,
        desc: String,
    })
);


module.exports = AppPackages;
