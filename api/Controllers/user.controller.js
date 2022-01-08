const db = require("../models");
const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate("roles", "-__v")
    .populate("reviews", "-__v")
    .populate({
      path: 'reviews', populate: {
        path: 'user',
        model: 'User'
      }
    })
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ success: false, data: null, message: "Something Went Wrong try again" });
        return;
      }

      // if no user found against that Id
      if (!data) {
        res.status(404).json({ success: false, data: null, message: "No User Found!" });
      }
      else {
        var authorities = [];
        var reviews = [];

        // Populate given roles
        for (let i = 0; i < data.roles.length; i++) {
          authorities.push("ROLE_" + data.roles[i].name);
        }

        // Populate reviews
        for (let i = 0; i < data.reviews.length; i++) {

          // User who gave the review
          var user = {
            id: data.reviews[i].user.id,
            full_name: `${data.reviews[i].user.firstname} ` + `${data.reviews[i].user.lastname}`,
            photo: data.reviews[i].user.photo,
          };
          // review object
          var review = {
            id: data.reviews[i]._id,
            user: user,
            title: data.reviews[i].title,
            comment: data.reviews[i].comment,
            created_date: data.reviews[i].created_date,
            rate: data.reviews[i].rate,
          };
          reviews.push(review);
        }

        res.status(200).json({
          success: true,
          data: {
            user: {
              id: data._id,
              person: data.person,
              firstname: data.firstname,
              lastname: data.lastname,
              phone: data.phone,
              fax: data.fax,
              mobile: data.mobile,
              website: data.website,
              email: data.email,
              company: data.companyName,
              b1: data.b1,
              b2: data.b2,
              address: `${data.street} ` + `${data.house}`,
              postal: data.postal,
              city: data.city,
              ditrict: data.district,
              country: data.country,
              photo: data.photo,
              aboutUs: data.aboutUs,
              facebook: data.facebook,
              twitter: data.twitter,
              instagram: data.instagram,
              linkdin: data.linkdin,
              full_name: `${data.firstname} ` + `${data.lastname}`,
              rate: data.rate,
              hour: data.hour,
              roles: authorities,
              services: data.services,
              partners: data.partners,
              reviews: reviews,
              location: data.location,
              hour_details: data.hour_details,
              pricing_list: data.pricing_list,
              menu_list: data.menu_list,
            },
          }, message: "Found User Success"
        });
      }
    });
};


exports.uploadImg = (req, res) => {

  const id = req.body.id;
  console.log(req.file);
  User.findByIdAndUpdate(id, { photo: req.file.filename }, { useFindAndModify: false }).then((data => {
    if (!data) {
      res.status(404).send({
        success: false,
        message: `Cannot update Image with id=${id}. Maybe User was not found!`
      });
    } else res.send({ success: true, message: "Image was updated successfully." });
  })).catch(err => {
    res.status(500).send({
      success: false,
      message: "Error updating Image with id=" + id
    });
  });
};


exports.updateProfile = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      success: false,
      message: "Data to update can not be empty!"
    });
  }
  const id = req.body.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then((data => {
    if (!data) {
      res.status(404).send({
        success: false,
        message: `Cannot update User with id=${id}. Maybe User was not found!`
      });
    } else res.send({ success: true, message: "User was updated successfully." });
  })).catch(err => {
    res.status(500).send({
      success: false,
      message: "Error updating User with id=" + id
    });
  });
};


exports.changePass = (req, res) => {
  const id = req.body.id;

  User.findByIdAndUpdate(id, { password: bcrypt.hashSync(req.body.password, 8) }).then(data => {
    if (!data) {
      res.status(404).send({
        success: false,
        message: `Cannot update User with id=${id}. Maybe User was not found!`
      });
    } else res.send({ success: true, message: "User was updated successfully." });
  }).catch(err => {
    res.status(500).send({
      success: false,
      message: "Error updating User with id=" + id
    });
  });
};


exports.addToWishlist = (req, res) => {
  const id = req.body.id;
  const productId = req.body.productId;
  User.findByIdAndUpdate(id, { $push: { wishlist: productId } }).exec((err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: "Something went Wrong" });
      return;
    }
    res.json({ success: true, data: result, message: "Success" });
  });
};

exports.getWishlist = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate('wishlist')
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Something is Wrong try again" });
        return;
      }
      res.status(200).json({
        success: true, data: data['wishlist'], message: "Success"
      });
    });
};



exports.addRole = (req, res) => {
  const id = req.params.id;

  Role.find(
    {
      name: req.body.role
    },
    (err, roles) => {

      if (err) {
        res.status(500).json({ success: false, message: err });
        return;
      }

      User.findByIdAndUpdate(id, { $push: { roles: roles[0]._id } }).exec((err, result) => {
        if (err) {
          res.status(500).json({ success: false, message: "Something went Wrong" });
          return;
        }
        res.json({ success: true, data: result, message: "Success" });
      });
    }
  );

};


exports.updateProfileSetup = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  User.findByIdAndUpdate(id, {
    services: body.services,
    aboutUs: body.aboutUs,
    partners: body.partners,
    facebook: body.facebook,
    instagram: body.instagram,
    twitter: body.instagram,
    linkdin: body.linkdin,
    location: body.location,
    hour_details: body.hour_details,
    pricing_list: body.pricing_list,
    menu_list: body.menu_list,
  }).exec((err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: err });
    }
    return res.json({ success: true, message: "success" });
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
