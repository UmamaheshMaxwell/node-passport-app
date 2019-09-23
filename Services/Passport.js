const LocalStrategy = require("passport-local").Strategy;

module.exports = (User, bcrypt, passport) => {
  const local = new LocalStrategy((username, password, done) => {
    User.findByName(username, (err, user) => {
      if (err) {
        throw err;
      } else if (!user) {
        done(null, false, { message: "Invalid user" });
      } else {
        bcrypt.compare(password, user.password, (err, valid) => {
          if (valid) {
            done(null, user);
          } else {
            done(null, false, { message: "Invalid user" });
          }
        });
      }
    });
  });

  passport.use("local", local);
};
