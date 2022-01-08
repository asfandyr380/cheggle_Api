const db = require("../models");
const Product = db.product;


exports.create = (req, res) => {
    const product = new Product({
        title: req.body.title,
        subtitle: req.body.subtitle,
        image: req.body.image,
        featured: req.body.featured,
        favorite: req.body.favorite,
        description: req.body.description,
        photo: req.body.photos,
        auther: req.body.userId
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
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: "Something is Wrong try again" });
                return;
            }
            var d = [];
            for (let i = 0; i < data.length; i++) {
                var dd = {
                    _id: data[i]._id,
                    title: data[i].title,
                    subtitle: data[i].subtitle,
                    image: data[i].image,
                    featured: data[i].featured,
                    favourite: data[i].favourite,
                    description: data[i].description,
                    photo: data[i].photo,
                    created_date: data[i].created_date,
                    auther_Id: data[i].auther._id,
                    phone: data[i].auther.phone,
                    email: data[i].auther.email,
                    address: data[i].auther.street,
                    facebook: data[i].auther.facebook,
                    instagram: data[i].auther.instagram,
                    linkdin: data[i].auther.linkdin,
                    twitter: data[i].auther.twitter,
                    rate: data[i].auther.rate,
                    num_rate: data[i].auther.num_rate,
                };
                d.push(dd);
            }
            res.status(200).json({
                success: true,
                data: d,
                message: "Success",
            });
        });
};

exports.getProduct = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .populate("auther", "-__v")
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: "Something is Wrong try again" });
                return;
            }
            var d = [];
            for (let i = 0; i < data.length; i++) {
                var dd = {
                    _id: data[i]._id,
                    title: data[i].title,
                    subtitle: data[i].subtitle,
                    image: data[i].image,
                    featured: data[i].featured,
                    favourite: data[i].favourite,
                    description: data[i].description,
                    photo: data[i].photo,
                    created_date: data[i].created_date,
                    auther_Id: data[i].auther._id,
                    phone: data[i].auther.phone,
                    email: data[i].auther.email,
                    address: data[i].auther.street,
                    facebook: data[i].auther.facebook,
                    instagram: data[i].auther.instagram,
                    linkdin: data[i].auther.linkdin,
                    twitter: data[i].auther.twitter,
                    rate: data[i].auther.rate,
                    num_rate: data[i].auther.num_rate,
                };
                d.push(dd);
            }
            res.status(200).json({
                success: true,
                data: d,
                message: "Success",
            });
        });
};

exports.getRecent = (req, res) => {
    Product.find()
        .populate("auther", "-__v")
        .sort({ created_date: -1 })
        .limit(15)
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: "Something is Wrong try again" });
                return;
            }
            var d = [];
            for (let i = 0; i < data.length; i++) {
                var dd = {
                    _id: data[i]._id,
                    title: data[i].title,
                    subtitle: data[i].subtitle,
                    image: data[i].image,
                    featured: data[i].featured,
                    favourite: data[i].favourite,
                    description: data[i].description,
                    photo: data[i].photo,
                    created_date: data[i].created_date,
                    auther_Id: data[i].auther._id,
                    phone: data[i].auther.phone,
                    email: data[i].auther.email,
                    address: data[i].auther.street,
                    facebook: data[i].auther.facebook,
                    instagram: data[i].auther.instagram,
                    linkdin: data[i].auther.linkdin,
                    twitter: data[i].auther.twitter,
                    rate: data[i].auther.rate,
                    num_rate: data[i].auther.num_rate,
                };
                d.push(dd);
            }
            res.status(200).json({
                success: true,
                data: d,
                message: "Success",
            });
        });
};


exports.getTrending_hot = (req, res) => {
    Product.find()
        .where('rate').gt(4)
        .populate("auther", "-__v")     
        .limit(15)
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: "Something is Wrong try again" });
                return;
            }
            var d = [];
            for (let i = 0; i < data.length; i++) {
                var dd = {
                    _id: data[i]._id,
                    title: data[i].title,
                    subtitle: data[i].subtitle,
                    image: data[i].image,
                    featured: data[i].featured,
                    favourite: data[i].favourite,
                    description: data[i].description,
                    photo: data[i].photo,
                    created_date: data[i].created_date,
                    auther_Id: data[i].auther._id,
                    phone: data[i].auther.phone,
                    email: data[i].auther.email,
                    address: data[i].auther.street,
                    facebook: data[i].auther.facebook,
                    instagram: data[i].auther.instagram,
                    linkdin: data[i].auther.linkdin,
                    twitter: data[i].auther.twitter,
                    rate: data[i].auther.rate,
                    num_rate: data[i].auther.num_rate,
                };
                d.push(dd);
            }
            res.status(200).json({
                success: true,
                data: d,
                message: "Success",
            });
        });
};
