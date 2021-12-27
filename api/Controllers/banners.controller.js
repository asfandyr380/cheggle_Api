const db = require("../models");
const Banners = db.banners;


exports.getBanners = (req, res) => {
    Banners.find().then(data => {
        if (!data) {
            return res.status(404).json({ success: false, message: "Nothing Found" });
        }
        var banners = [];
        for (let i = 0; i < data.length; i++) {
            var banner = {
                id: data[i]._id,
                image: data[i].image
            }
            banners.push(banner);
        }
        return res.json({ success: true, message: "Success", data: banners });
    }).catch(err => {
        return res.status(500).json({ success: false, message: err });
    });
};