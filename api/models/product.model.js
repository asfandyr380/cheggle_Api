const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        title: String,
        subtitle: String,
        image: String,
        featured: Boolean,
        auther: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        favorite: Boolean,
        description: String,
        photo: [
            {
                image: String
            }
        ],
    })
);

module.exports = Product;
