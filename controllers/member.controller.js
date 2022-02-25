const db = require("../models");
const Member = db.member;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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
    image: req.file.path,
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
exports.findAll = (req, res) => {};
// Find a single Member with an id
exports.findOne = (req, res) => {};
// Update a Member by the id in the request
exports.update = (req, res) => {};
// Delete a Member with the specified id in the request
exports.delete = (req, res) => {};
