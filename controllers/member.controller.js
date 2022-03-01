const db = require("../models");
const Member = db.member;
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

exports.uploadImg = multer({ storage: storage }).single("image");

// Create and Save a new Member
exports.create = (req, res) => {
  if (!req.body.email || !req.body.phone) {
    res
      .status(400)
      .send({ message: "Email and Phone number both must be provided." });
    return;
  }
  const member = new Member({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    image: req.file ? req.file.path : "",
    status: req.body.status,
  });
  member
    .save(member)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the member.",
      });
    });
};
// Retrieve all Members from the database.
exports.findAll = (req, res) => {
  Member.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving members",
      });
    });
};
// Find a single Member with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Member.findById(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "Not found member with id " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving member with id " + id,
      });
    });
};
// Update a Member by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty",
    });
  }
  const id = req.params.id;
  if (req.file && req.file.path) {
    req.body.image = req.file.path;
  }

  Member.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update member with id = " + id,
        });
      } else {
        res.send({
          message: "Member was updated successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updaing member with id " + id,
      });
    });
};
// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Member.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot delete member with id = " + id,
        });
      } else {
        if (data.image) {
          if (fs.existsSync("./" + data.image)) {
            fs.unlinkSync("./" + data.image);
          }
        }
        res.send({
          message: "Member was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting member with id " + id,
      });
    });
};
