module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/signup", user.create);
  

  router.post("/signup", (req, res) => {
    console.log('req session', req.session);
  });

  router.post("/login", user.logIn);

  router.post("/logout", user.logOut);

  // get session username
  router.get("/username", user.getUsername);

  router.post("/setpic", user.setPicture);

  router.get("/getavatar/:username", user.getAvatar);

  router.get("/check/:username", user.checkUser);

  app.use('/api/user', router);
};