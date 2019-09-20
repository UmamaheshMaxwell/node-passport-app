const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./Services/db/Connection");
const router = require("./routes/user");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
