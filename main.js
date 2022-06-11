const express = require("express");
const { json } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./route");
const { actions: seed } = require("./seedUsers");

mongoose.connect("mongodb://localhost:27017/MongoDating", (e) => {
  if (e) {
    console.log("error", e);
    return;
  }
  console.log("connected");
  seed()
    .then((e) => console.log("Seed users done", e))
    .catch((err) => console.log("Seed Error", err));
});

const app = express();

app.use(cors());
app.use(json({ limit: "5mb" }));
app.use("/api", routes);
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});
app.listen(2002, () => console.log("App listening on 2002"));
