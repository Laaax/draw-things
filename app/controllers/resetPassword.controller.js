const crypto = require('crypto');

const db = require("../models");
const User = db.user;

const nodemailer = require('nodemailer');

function generateHash(password, salt) {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('base64');
}

// https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7
exports.reset = (req, res) => {
  if (req.body.email === '') {
    res.status(400).send({ message: "Email is empty" });
    return;
  }
  const token = crypto.randomBytes(20).toString('hex');
  User.findOneAndUpdate({email: req.body.email}, {resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000})
    .then(data => {
      if (data) {

        const transporter = nodemailer.createTransport({
          name: 'smtp.mail.com',
          host: 'smtp.mail.com',
          auth: {
            user: '',
            pass: '',
          },
        });

        const mailOptions = {
          from: 'ResetP4ssword@mail.com',
          to: `${data.email}`,
          subject: 'Link to reset password',
          text:
            `reset password for ${data.username} \n`
            + `http://localhost:8080/reset/${token}`
        };

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            res.status(500).send({message: 'Error'});
          } else {
            res.send({ message: 'Recovery email sent' })
          }
        })
        return;
      } else {
        return res.status(400).send({message: "Email not found"});
      }
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Error" });
    });

}

exports.checkResetLink = (req, res) => {
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  })
  .then(data => {
    if (data) {
      res.send({ username: data.username, message: 'Ok'})
    } else {
      res.send('Password reset link is invalid');
    }
  })
  .catch(err => {
    return res
      .status(500)
      .send({ message: "Error" });
  });
}

exports.updatePassword = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(data => {
      if (data) {
        let hash = generateHash(req.body.password , data.salt);
        User.findOneAndUpdate({ username: req.body.username }, {hash: hash, resetPasswordToken: null, resetPasswordExpires: null})
          .then(data => {
            return res.send({message: 'Updated password'});
          })
          .catch(err => {
            return res.status(500).send({message: 'Error'});
          });
      } else {
        return res.status(404).send({ message: 'No user found' }) 
      }
    }).catch(err => {
      return res
        .status(500)
        .send({ message: 'Error' });
    });
}

// maybe
// Can add token to user db so that other sessions sign out when tokens don't match (not implemented)
// New token when reset password