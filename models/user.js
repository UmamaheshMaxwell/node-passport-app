const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("user", userSchema, "user"));

module.exports.findByName = (username, callback) => {
  User.findOne({ username }, callback);
};

module.exports.createUser = (user, callback) => {
  User.create(user, callback);
};

module.exports.getUsers = callback => {
  User.find(callback);
};

// module.exports.login = (callb);
