
const db = require("../models");
const User = db.user;

const crypto = require('crypto');

function generateSalt() {
  return crypto.randomBytes(16).toString('base64');
}

function generateHash(password, salt) {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('base64');
}

// Sign up
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  User.findOne({username: req.body.username})
    .then(data => {
      if (data) {
        return res.status(400).send({ message: "Username exists" });
      }

      User.findOne({email: req.body.email})
      .then(data => {
        if (data) {
          return res.status(400).send({ message: "Email exists" });
        }

        let salt = generateSalt();

        // Create a User
        const user = new User({
          username: req.body.username,
          salt: salt,
          hash: generateHash(req.body.password, salt),
          email: req.body.email
        });

        user
          .save(user)
          .then(data => {
            req.session.username = data.username;
            return res.send({ message: "Signed up" });
          })
          .catch(err => {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while creating a user."
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating a user."
        });
      });
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Error" });
    });
};

exports.logIn = (req, res) => {

  User.findOne({username: req.body.username})
    .then(data => {
      if (data) {
        if (generateHash(req.body.password, data.salt) === data.hash) {
          req.session.username = data.username;
          return res.send({ message: "Success" });
        }
        // wrong password
        return res.status(400).send({ message: "Invalid username or password" });
      } else {
        return res.status(400).send({ message: "Invalid username or password" });
      }
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Error" });
    });
};

exports.logOut = (req, res) => {
  if (!req.session.username) {
    res.status(400).send({message: 'Already logged out'});
  } else {
    req.session.destroy();
    res.send({message: 'Logged out'});
  }
};

exports.getUsername = (req, res) => {
  res.send({message: req.session.username});
}

// set avatar
exports.setPicture = (req, res) => {
  if (req.session.username) {
    User.findOneAndUpdate({username: req.session.username}, {picture: req.body.picture})
    .then(data => {
      res.send({ message: "Profile picture set" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error"
      });
    }); 
  } else {
    res.status(400).send({
      message:
        "Not logged in"
    });
  }
}

exports.getAvatar = (req, res) => {
  User.find({username: req.params.username})
  .then(data => {
    data = data[0].picture;
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error"
    });
  }); 
}

exports.checkUser = (req, res) => {
  User.findOne({username: req.params.username})
    .then(data => {
      if (data) {
        return res.send({ message: "User exists" });
      } else {
        return res.status(400).send({ message: "User does not exist" });
      }
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Error" });
    });
}