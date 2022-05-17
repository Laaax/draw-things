const express = require("express");
const bodyParser = require("body-parser");
const path = __dirname + '/build/';

const app = express();

app.use(express.static(path));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");

const session = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: oneDay }
}));

require("./routes/drawing.routes.js")(app);

require("./routes/user.routes.js")(app);

require("./routes/comment.routes.js")(app);

require("./routes/resetPassword.routes.js")(app);

app.get('/*', (req, res) => {
  res.sendFile(path + "index.html");
});

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
