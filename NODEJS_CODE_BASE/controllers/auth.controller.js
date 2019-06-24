const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var userM = require("../models/users");
// var tokenProvider = require('../providers/token.provider');
const jwt = require("jsonwebtoken");

var secretKey = require("../config/config").secretKey;

module.exports = {
  userLogin: (req, res) => {
    var loginType;
    if (req.body.emailPhone != "" && req.body.password != "") {
      if (isNaN(req.body.emailPhone)) loginType = "email";
      else loginType = "phoneNo";
      userM
        .findOne()
        .where(loginType, req.body.emailPhone)
        .exec((err, data) => {
          if (err) res.status(400).send(err);
          else if (data) {
            // res.send(data.);
            bcrypt.compare(req.body.password, data.password, function(
              err,
              passMatch
            ) {
              if (err) res.status(400).send(err);
              else if (passMatch) {
                let jwtData = {
                  _id: data["_id"],
                  fname: data["fname"],
                  lname: data["lname"],
                  email: data["email"],
                  isAdmin: data["isAdmin"]
                };
                var token = jwt.sign({ user: jwtData }, secretKey);
                res
                  .status(200)
                  .json({ message: "Login Successful", token: token });
              } else res.status(401).json({ message: "Invalid Credentials1" });
            });
          } else res.status(401).json({ message: "Invalid Credentials2" });
        });
    } else res.status(400).json({ message: "Provide all Credentials" });
  },
  userRegistration: (req, res) => {
    // res.send(req.body);
    // res.status(400).send('err')
    users = new userM();

    users.fname = req.body.fname;
    users.lname = req.body.lName;
    users.email = req.body.email;
    users.phoneNo = req.body.phoneNo;
    users.state = req.body.state;
    users.city = req.body.city;
    users.pincode = req.body.pincode;
    users.userType = req.body.user_type;
    users.createdOn = new Date();

    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if (err) res.status(400).send(err);
      else {
        users.password = hash;

        users.save((err, data) => {
          if (err) res.status(400).send(err);
          else
            res
              .status(200)
              .json({ message: "User Added Successfully", id: data._id });
        });
      }
    });
  },
  userList: (req, res) => {
    userM.find().exec((err, data) => {
      if (err)
        res.status(400).json({ message: "Something Went Wrong", data: err });
      else res.status(200).json({ message: "Success", data });
    });
  },
  changePass: (req, res) => {
    userM.findOne({ _id: req.body._id }).exec((err, resp) => {
      if (err)
        res.status(400).json({ message: "Something Went Wrong", data: err });
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) res.status(400).send(err);
          else {
            userM
              .updateOne({ _id: req.body._id }, { password: hash })
              .exec((err, resp) => {
                if (err)
                  res
                    .status(400)
                    .json({ message: "Something Went Wrong", data: err });
                else
                  res
                    .status(200)
                    .json({
                      message: "Password Changed Successfully",
                      id: resp
                    });
              });
          }
        });
      }
    });
    // new Promise((resolve, reject) => {
    //     return userM.findOne({ _id: req.body._id })
    // })
    // .then(resp => {
    //     res.status(200).json({resp});
    // })
    // .catch()
  }
};
