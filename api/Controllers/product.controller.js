const db = require("../models");
const Product = db.product;


exports.create = (req, res) => {
    const product = new Product({
        title: req.body.title,
        subtitle: req.body.subtitle,
        image: req.body.image,
        featured: req.body.featured,
        rate: req.body.rate,
        num_rate: req.body.num_rate,
        rate_text: req.body.rate_text,
        status: req.body.status,
        favorite: req.body.favorite,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        hour: req.body.hour,
        description: req.body.description,
        price_range: req.body.price_range,
        auther: req.body.auther_Id,
        hour_detail: req.body.hour_details,
        photo: req.body.photos,
        service: req.body.service_Ids,
        location: req.body.location,
    });

    product.save(product).then(data => {
        res.status(200).json({ success: true, data: data, message: "Successfully Created" });
    }).catch(err => {
        res.status(500).json({ success: false, message: "Some error occurred while creating the Product" })
    });
};

exports.getPopuler = (req, res) => {
    Product.find({ featured: true })
        .populate("auther", "-__v")
        .populate('service', "-__v")
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: "Something is Wrong try again" });
                return;
            }

            res.status(200).json({
                success: true, data: data, message: "Success"
            });
        });
};

exports.getProduct = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .populate("auther", "-__v")
        .populate('service', "-__v")
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: "Something is Wrong try again" });
                return;
            }
            res.status(200).json({
                success: true, data: data, message: "Success"
            });
        });
};

exports.getRecent = (req, res) => {
    Product.find()
        .populate("auther", "-__v")
        .populate('service', "-__v")
        .sort({ created_date: -1 })
        .limit(15)
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: "Something is Wrong try again" });
                return;
            }
            res.status(200).json({
                success: true, data: data, message: "Success"
            });
        });
};


exports.getTrending_hot = (req, res) => {
    Product.find({ rate: { $gt: 4 } })
        .populate("auther", "-__v")
        .populate('service', "-__v")
        .limit(15)
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: "Something is Wrong try again" });
                return;
            }
            res.status(200).json({
                success: true, data: data, message: "Success"
            });
        });
};
