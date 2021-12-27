const db = require("../models");
const Banners = db.banners;


exports.getBanners = (req, res) => {
    Banners.find().then(data => {
        if (!data) {
            return res.status(404).json({ success: false, message: "Nothing Found" });
        }
        return res.json({ success: true, message: "Success", data: data });
    }).catch(err => {
        return res.status(500).json({ success: false, message: err });
    });
};