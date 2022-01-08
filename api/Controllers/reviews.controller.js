const db = require("../models");
const Reviews = db.reviews;
const User = db.user;


exports.create = (req, res) => {
    const review = new Reviews({
        user: req.body.user,
        title: req.body.title,
        comment: req.body.comment,
        rate: req.body.rate,
    });

    review.save().then(data => {
        const id = req.body.user;
        User.findByIdAndUpdate(id, { $push: { reviews: data._id } }).exec((err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: err });
            }
            var rev = {
                id: data._id,
                user: {
                    id: user._id,
                    full_name: `${user.firstname} ` + `${user.lastname}`,
                    photo: user.photo
                },
                title: data.title,
                comment: data.comment,
                created_date: data.created_date,
                rate: data.rate,
            }
            return res.json({ success: true, message: "Success", data: rev });
        });

    }).catch(err => {
        console.log(err);
        return res.status(500).json({ success: false, message: err });
    });

};


