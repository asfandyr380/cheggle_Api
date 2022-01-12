const mongoose = require("mongoose");

const Jobs = mongoose.model(
    "Jobs",
    new mongoose.Schema({
        title: String,
        logo: String,
        video: String,
        category: String,
        job_type: String,
        location: String,
        email: String,
        mobile: String,
        description: String,
    })
);

module.exports = Jobs;
