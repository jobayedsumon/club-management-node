const db = require("../models");
const Member = db.member;
const checkDuplicateEmailOrPhone = (req, res, next) => {
  //Check for Email
  Member.findOne({
    email: req.body.email,
  }).exec((err, member) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (member) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    //Check for phone number
    Member.findOne({
      phone: req.body.phone,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (member) {
        res
          .status(400)
          .send({ message: "Failed! Phone number is already in use!" });
        return;
      }
      next();
    });
  });
};

const verifyMemberCreate = {
  checkDuplicateEmailOrPhone,
};

module.exports = verifyMemberCreate;
