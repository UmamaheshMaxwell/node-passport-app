const mongoose = require("mongoose");
//Mongoose Connect
mongoose.connect(
  "mongodb://127.0.0.1/contacts",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to database sucessfully !!!");
  }
);
