module.exports = app => {
  const resetPassword = require("../controllers/resetPassword.controller.js");

  var router = require("express").Router();

  router.post("/", resetPassword.reset);

  router.get("/check", resetPassword.checkResetLink);

  router.post("/update", resetPassword.updatePassword);

  app.use('/api/reset', router);
};