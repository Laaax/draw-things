module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        username: String,
        salt: String,
        hash: String,
        email: String,
        resetPasswordToken: {
          type: String,
          default: null,
        },
        resetPasswordExpires: {
          type: Number,
          default: null,
        },
        picture: {
          type: String,
          default: null,
        }
      },
      { timestamps: true }
    )
  );

  return User;
};