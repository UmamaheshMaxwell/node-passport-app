const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user");

router.post("/login", (req, res) => {
  const body = req.body;
  User.findByName(body.username, (err, user) => {
    if (err) {
      throw err;
    } else if (!user) {
      res.json({ message: "Invalid user" });
    } else {
      bcrypt.compare(body.password, user.password, (err, valid) => {
        if (valid) {
          res.json({ message: "Logged in Successfully" });
        } else {
          res.json({ message: "Invalid user" });
        }
      });
    }
  });
});

router.post("/create", (req, res) => {
  const body = req.body;
  bcrypt.hash(body.password, 10, (err, hash) => {
    User.createUser(
      { username: body.username, password: hash },
      (err, data) => {
        if (err) {
          res.json({ message: err });
        }
        res.json(data);
      }
    );
  });
});

router.get("/users", (req, res) => {
  User.getUsers((err, users) => {
    if (err) {
      res.json({
        message: `Issue finding users ${err}`
      });
    }
    res.json(users);
  });
});

module.exports = router;
