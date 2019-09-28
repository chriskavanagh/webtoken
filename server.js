require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
//const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
//const auth = require("./middleware/Auth");
const subscribeRouter = require("./routes/subscribers");

const app = express();

const PORT = process.env.PORT;
const DB = process.env.DB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(res => console.log(`Connected To DB ${DB}`))
  .catch(error => console.error(error));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/subscribers", subscribeRouter);

/* const posts = [
  {
    username: "Kyle",
    title: "Post 1"
  },
  {
    username: "Chris",
    title: "Post 2"
  }
];

app.get("/posts", auth, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  //console.log(user.name);

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ token: token });
}); */

app.listen(PORT, () => {
  console.log("Server Running On Port 3000");
});
