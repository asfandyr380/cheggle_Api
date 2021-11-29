const config = require("../../config/auth.config");
const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id).then(data => {
    if (!data) {
      res.status(404).json({ success: false, data: null, message: "No User Found!" });
    } else {
      // var authorities = [];

      // for (let i = 0; i < data.roles.length; i++) {
      //   authorities.push("ROLE_" + data.roles[i].name);
      // }
      res.status(200).json({
        success: true, data: {
          user: {
            id: data._id,
            email: data.email,
            // roles: authorities,
            full_name: `${data.firstname} ${data.lastname}`,
            nickname: data.lastname,
            firstName: data.firstname,
            lastName: data.lastname,
            photo: data.photo,
            url: data.website,
            level: "Developer",
            description: data.street,
            tag: data.city,
            rate: 5.2,
          },
          value: [
            {
              "title": "feedback",
              "value": `${data.feedback}%`
            },
            {
              "title": "post",
              "value": `${data.post}`
            },
            {
              "title": "follower",
              "value": `${data.follower}`
            }
          ],
        }, message: "Found User Success"
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ success: false, data: null, message: "Something Went Wrong try again" });
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

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
