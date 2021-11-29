const config = require("../../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        person: req.body.person,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        fax: req.body.fax,
        mobile: req.body.mobile,
        website: req.body.website,
        companyName: req.body.company,
        b1: req.body.b1,
        b2: req.body.b2,
        street: req.body.street,
        house: req.body.house,
        postalCode: req.body.postal,
        city: req.body.city,
        district: req.body.district,
        country: req.body.country,
        email: req.body.email,
        photo: '2021-11-29T09-31-26.681Z66906f43adefb3bc553f7601fa7c1ed9--city-logo-manchester-city.jpeg',
        password: bcrypt.hashSync(req.body.password, 8),
        feedback: 0.0,
        post: 0,
        follower: 0,
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).json({ success: false, message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).json({ success: false, message: err });
                            return;
                        }

                        res.json({ success: true, message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).json({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).json({ success: true, message: err });
                        return;
                    }

                    res.json({ success: true, message: "User was registered successfully!" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found.", success: false });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    token: null,
                    success: false,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send(
                {
                    success: true,
                    data: {
                        id: user._id,
                        email: user.email,
                        roles: authorities,
                        full_name: user.firstname + user.lastname,
                        nickname: user.lastname,
                        photo: user.photo,
                        url: user.website,
                        level: "Developer",
                        description: user.street,
                        tag: user.city,
                        rate: 5.2,
                        token: token
                    },
                    message: 'Login Success'
                });
        });
};