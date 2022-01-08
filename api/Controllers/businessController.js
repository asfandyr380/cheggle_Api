const db = require("../models");
const Business = db.business;
const BusinessType = db.businessType;


exports.getBusiness = (req, res) => {
    Business.find().exec((err, business) => {
        if (err) {
            res.status(500).json({ success: false, message: err });
            return;
        }
        BusinessType.find().exec((err, types) => {
            if (err) {
                res.status(500).json({ success: false, message: err });
                return;
            }
            var data = { Business: business, Types: types };
            return res.json({ success: true, message: "Success", data: data });
        });
    });
};