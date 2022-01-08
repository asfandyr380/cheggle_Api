const db = require("../models");
const AppPackages = db.appPackages;


exports.getPackages = (req, res) => {
    AppPackages.find().limit(3).exec((err, packages) => {
        if (err) {
            res.status(500).json({ success: false, message: err });
            return;
        }
        return res.json({ success: true, message: "Success", data: packages });
    });
};


exports.get_Vpackages = (req, res) => {
    AppPackages.find({ isSelected: false }).exec((err, packages) => {
        if (err) {
            res.status(500).json({ success: false, message: err });
            return;
        }
        return res.json({ success: true, message: "Success", data: packages });
    });
};


exports.createPackages = (req, res) => {
    const package = new AppPackages({
        title: req.body.title,
        subtitle: req.body.subtitle,
        price: req.body.price,
        additional_price: req.body.additional_price,
        recursive: req.body.recursive,
        premium: req.body.premium,
        button_text: req.body.button_text === undefined ? "Purchase Now" : req.body.button_text,
        feature_list: req.body.feature_list,
    });

    package.save((err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: err });
            return;
        }
        return res.json({ success: true, message: "success", data: result });
    });
};


exports.create_VideoPackage = (req, res) => {
    const package = new AppPackages({
        title: req.body.title,
        price: req.body.price,
        isSelected: false,
        imagePath: req.body.image === undefined ? "" : req.body.image,
        desc: req.body.desc,
    });

    package.save((err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: err });
            return;
        }
        return res.json({ success: true, message: "success", data: result });
    });
};