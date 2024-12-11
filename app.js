const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const User = require("./models/user");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6759b13f3fd6f259a208869d")
    .then((user) => {
      req.user = user
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://puranrana:Puran080@cluster0.066ki.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    User.findOne()
    .then(user=>{
      if(!user){
        const user = new User({
          name: "Puran",
          email: "puran@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    })
    app.listen(3000);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
