const mongoose = require("mongoose");
var schema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    address: String,
    image: String,
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Member = mongoose.model("Member", schema);
module.exports = Member;
