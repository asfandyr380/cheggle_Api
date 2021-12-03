const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        title: String,
        subtitle: String,
        image: String,
        featured: Boolean,
        rate: Number,
        created_date: {
            type: Date,
            default: Date.now
        },
        num_rate: Number,
        rate_text: String,
        status: String,
        favorite: Boolean,
        address: String,
        phone: String,
        email: String,
        website: String,
        hour: String,
        description: String,
        price_range: String,
        auther: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        hour_detail: [
            {
                title: String,
                time: String,
            }
        ],
        photo: [
            {
                image: String
            }
        ],
        service: [
            {
                type: mongoose.Schema.Types.ObjectId,
                'ref': "Services"
            }
        ],
        location: {
            name: String,
            lat: Number,
            long: Number,
        },
    })
);

module.exports = Product;
