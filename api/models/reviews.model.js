const mongoose = require("mongoose");

const Review = mongoose.model(
    "Reviews",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: String,
        comment: String,
        created_date: {
            type: Date,
            default: Date.now
        },
        rate: Number,
    })
);

module.exports = Review;
