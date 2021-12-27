const db = require("../models");
const Categories = db.categories;


exports.getCategories = (req, res) => {
    Categories.find().then(data => {
        if (!data) {
            return res.status(404).json({ success: false, message: "Nothing Found" });
        }
        var categories = [];
        for (let i = 0; i < data.length; i++) {
            var category = {
                id: data[i]._id,
                title: data[i].title,
                icon: data[i].icon,
                color: data[i].color,
                type: data[i].type,
                image: data[i].image
            }
            categories.push(category);
        }
        return res.json({ success: true, message: "Success", data: categories });
    }).catch(err => {
        return res.status(500).json({ success: false, message: err });
    });
};


exports.getRecommended_Cate = (req, res) => {
    Categories.find()
        .sort({ _id: -1 })
        .limit(5)
        .then(data => {
            if (!data) {
                return res.status(404).json({ success: false, message: "Nothing Found" });
            }
            var categories = [];
            for (let i = 0; i < data.length; i++) {
                var category = {
                    id: data[i]._id,
                    title: data[i].title,
                    icon: data[i].icon,
                    color: data[i].color,
                    type: data[i].type,
                    image: data[i].image
                }
                categories.push(category);
            }
            return res.json({ success: true, message: "Success", data: categories });
        }).catch(err => {
            return res.status(500).json({ success: false, message: err });
        });
};

exports.create = (req, res) => {
    const cate = new Categories({
        title: req.body.title,
        icon: req.body.icon,
        color: req.body.color,
        type: req.body.type,
        image: req.body.image,
    });

    cate.save().then(data => {
        return res.json({ success: true, message: "Success", data: data });
    }).catch(err => {
        return res.status(500).json({ success: false, message: err });
    });
};