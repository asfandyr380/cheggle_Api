const db = require("../models");
const Partners = db.partners;

exports.getPartners = (req, res) => {
    Partners.find().then((data) => {


        return res.status(200).json({ success: true, message: "Success", data: data });

    }).catch(err => {
        if (err) {
            res.status(500).json({ success: false, message: err });
            return;
        }
    });
};