const { authJwt } = require("../middlewares");
const controller = require("../controllers/member.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-type, Accept"
    );
    next();
  });
  app.post(
    "/api/member",
    [authJwt.verifyToken, controller.uploadImg],
    controller.create
  );
};
