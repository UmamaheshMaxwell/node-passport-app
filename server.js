const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const bcrypt = require("bcrypt");

const app = express();
const router = express.Router();
const User = require("./models/user");

require("./Services/db/Connection");
require("./Services/Passport")(User, bcrypt, passport);
require("./routes/user")(router, passport, bcrypt);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to node authentication !!"
  });
});

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
