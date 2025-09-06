const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "mansa",
    lastName: "kumari",
    emailId: "mansa@gmail.com",
    password: "mansa123#",
  };

  try {
    // throw new Error("kuch gya");
    const user = new User(userObj);
    await user.save();
    res.send("Profile created successfully");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(5000, () => {
      console.log("server started on port 5000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
  });
