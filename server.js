const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');

const bodyParser = require("body-parser")
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();


//body parser middlewear
app.use(bodyParser.urlencoded({etended:false}))
app.use(bodyParser.json())


//DB config
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });
//passport middlewear
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport)

//Use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get("/", (req, res) => {
  res.send("HELLO");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
