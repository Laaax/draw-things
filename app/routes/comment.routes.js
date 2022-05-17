module.exports = app => {
  const comments = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  // Create a new Comment
  router.post("/", comments.create);

  // Retrieve comments by drawing
  router.get("/:drawing", comments.getCommentsByDrawing);

  router.get("/count/:drawing", comments.getCommentCount);

  app.use('/api/comments', router);
};