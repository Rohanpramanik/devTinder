const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const validateSignup = require("./utils/validation");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json()); // middleware to convert json to js obj

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    // Validate sign up
    validateSignup(req);

    // encrypt password
    const safePassword = await bcrypt.hash(password, 10);

    // creating new instance of user model
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: safePassword,
    });
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

// Delete user from database
app.delete("/user", async (req, res) => {
  const id = req.body.userId;
  try {
    if (id) {
      const user = await User.findByIdAndDelete(id);
      res.send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("Somthing went wrong");
  }
});

// Update user details with ID
app.patch("/user/:id", async (req, res) => {
  const id = req.params?.id;
  const user = req.body;
  const ALLOWED_UPDATE = [
    "skills",
    "lastName",
    "password",
    "age",
    "gender",
    "photoUrl",
    "about",
  ];
  const isAllowed = Object.keys(user).every((key) =>
    ALLOWED_UPDATE.includes(key)
  );

  try {
    if (id) {
      if (!isAllowed) {
        throw new Error("Can't update these field");
      }
      if (user?.skills.length > 10) {
        throw new Error("You cannot enter more than 10 skills");
      }
      await User.findByIdAndUpdate(id, user, { runValidators: true });
      res.send("User details updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("Somthing went wrong : " + err.message);
  }
});

// Update user details with Email
app.patch("/userEmail", async (req, res) => {
  const id = req.body.emailId;
  const user = req.body;
  try {
    if (id) {
      await User.findOneAndUpdate({ emailId: id }, user, {
        runValidators: true,
      });
      res.send("User details updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("UPDATE FAILED : " + err.message);
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
