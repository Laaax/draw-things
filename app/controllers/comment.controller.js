const db = require("../models");
const Comment = db.comments;
const User = db.user;

// Create and Save a new Comment
exports.create = (req, res) => {

  User.findOne({username: req.session.username})
    .then(data => {
      // Create a vomment
      const comment = new Comment({
        drawing: req.body.drawing,
        description: req.body.description,
        author: req.body.author,
        picture: data.picture
      });
      comment
      .save(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while posting comment."
        });
      });
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Error" });
    });
};

exports.getCommentsByDrawing = (req, res) => {
  const page = req.query.page;
  Comment.find({drawing: req.params.drawing}).sort({ createdAt: -1}).skip((page - 1) * 10).limit(10)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error" });
  });
}

exports.getCommentCount = (req, res) => {
  let query = Comment.find({drawing: req.params.drawing});
  query.count()
  .then(data => {
    res.send({pages: Math.ceil(data/10)});
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error" });
  });
}