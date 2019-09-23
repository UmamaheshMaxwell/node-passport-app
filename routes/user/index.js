const User = require("../../models/user");

module.exports = (router, passport, bcrypt) => {
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

  router.post("/login", (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
      res.json(err ? err : user ? user : info);
    })(req, res, next);
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
};
