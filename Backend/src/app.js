const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json()); // middleware to convert json to js obj

app.post("/signup", async (req, res) => {
  const userData = req.body;
  try {
    // creating new instance of user model
    const newUser = new User(userData);
    await newUser.save();
    res.send("Profile created successfully");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});

// Get one user by emailId
app.post("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    // creating new instance of user model
    const user = await User.findOne({ emailId: userEmail });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(404).send("Something went wrong" + err.message);
  }
});

// Get feed data - all the user
app.get("/feed", async (req, res) => {
  try {
    // creating new instance of user model
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("there is no user currently");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("Something went wrong" + err.message);
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
