module.exports = mongoose => {
  const Comment = mongoose.model(
    "comment",
    mongoose.Schema(
      {
        drawing: String,
        description: String,
        author: String,
        picture: String,
      },
      { timestamps: true }
    )
  );

  return Comment;
};