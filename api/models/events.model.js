const mongoose = require("mongoose");

const Events = mongoose.model(
    "Events",
    new mongoose.Schema({
        title: String,
        day_num: String,
        day: String,
        month: String,
        image: String,
        video: String,
        owner_Id: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
        joined_users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", }],
    })
);

module.exports = Events;
