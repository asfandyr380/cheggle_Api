const config = require("../../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Token = db.token;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userRoute = require("../Routes/user.route");

exports.signup = (req, res) => {
    const user = new User({
        person: req.body.person,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        fax: req.body.fax,
        mobile: req.body.mobile,
        website: req.body.website,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        companyName: req.body.company,
        b1: req.body.b1,
        b2: req.body.b2,
        street: req.body.street,
        house: req.body.house,
        postalCode: req.body.postal,
        city: req.body.city,
        district: req.body.district,
        country: req.body.country,
        photo: req.body.photo === undefined ? 'user_icon.png': req.body.photo,
        aboutUs: req.body.aboutUs === undefined ? "" : req.body.aboutUs,
        facebook: req.body.facebook === undefined ? "" : req.body.facebook,
        twitter: req.body.twitter === undefined ? "" : req.body.twitter,
        instagram: req.body.instagram === undefined ? "" : req.body.instagram,
        linkdin: req.body.linkdin === undefined ? "" : req.body.linkdin,
        rate: 0,
        num_rate: 0,
        hour: req.body.hour === undefined ? "" : req.body.hour,
        wishlist: [],
        reviews: [],
        services: req.body.services === undefined ? [] :  req.body.services,
        partners: req.body.partners === undefined ? [] : req.body.partners,
        location: req.body.location === undefined ? {name: "Alabama", lat: 37.774929, long: -122.419418} : req.body.location,
        hour_details: req.body.hour_details === undefined ? [] : req.body.hour_details,
        pricing_list: req.body.pricing_list === undefined ? [] : req.body.pricing_list,
        menu_list: req.body.menu_list === undefined ? [] : req.body.menu_list,
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ success: false, message: err });
            return;
        }

        // If roles are given then assign those
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

                        res.json({ success: true, id: user._id, message: "User was registered successfully!" });
                    });
                }
            );
        } 
        // if no roles are given set default
        else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).json({ success: false, message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).json({ success: false, message: err });
                        return;
                    }

                    res.json({ success: true, id: user._id, message: "User was registered successfully!" });
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
                res.status(500).send({ success: false, message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ success: false, message: "User Not found." });
            }

            // Compare encrypted password
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

            // if password is Valid then assign jwt token
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            // Populate Roles
            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            res.status(200).send(
                {
                    success: true,
                    data: {
                        id: user._id,
                        person: user.person,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phone: user.phone,
                        fax: user.fax,
                        mobile: user.mobile,
                        website: user.website,
                        email: user.email,
                        company: user.companyName,
                        b1: user.b1,
                        b2: user.b2,
                        address: `${user.street} ` + `${user.house}`,
                        postal: user.postal,
                        city: user.city,
                        ditrict: user.district,
                        country: user.country,
                        photo: user.photo,
                        aboutUs: user.aboutUs,
                        facebook: user.facebook,
                        twitter: user.twitter,
                        instagram: user.instagram,
                        linkdin: user.linkdin,
                        full_name: `${user.firstname} ` + `${user.lastname}`,
                        rate: user.rate,
                        hour: user.hour,
                        wishlist: user.wishlist,
                        roles: authorities,
                        services: user.services,
                        partners: user.partners,
                        // location: user.location,
                        hour_details: user.hour_details,
                        pricing_list: user.pricing_list,
                        menu_list: user.menu_list,
                        token: token
                    },
                    message: 'Login Success'
                });
        });
};

// TODO: Reset password controller
exports.requestReset = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({ success: false, message: "No User Found against that email" });
    }
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");

};