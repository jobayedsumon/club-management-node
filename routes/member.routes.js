const { authJwt, verifyMemberCreate } = require("../middlewares");
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
    [
      authJwt.verifyToken,
      verifyMemberCreate.checkDuplicateEmailOrPhone,
      controller.uploadImg,
    ],
    controller.create
  );
  app.get("/api/members", [authJwt.verifyToken], controller.findAll);
  app.get("/api/member/:id", [authJwt.verifyToken], controller.findOne);
  app.put(
    "/api/member/:id",
    [
      authJwt.verifyToken,
      verifyMemberCreate.checkDuplicateEmailOrPhone,
      controller.uploadImg,
    ],
    controller.update
  );
  app.delete("/api/member/:id", [authJwt.verifyToken], controller.delete);
};
