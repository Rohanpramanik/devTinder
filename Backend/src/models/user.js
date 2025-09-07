const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, 'First name should be atleast 3 character'],
      maxLength: 20,
    },
    lastName: {
      type: String,
      minLength: [3, 'Last name should be atleast 3 character'],
      maxLength: 20,
    },
    emailId: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate: (value) => {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not correct");
        }
      },
    },
    about: {
      type: String,
      default: "Hi I'm here to meet new people",
      maxLength: [100, 'Character limit is 100']
    },
    photoUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww",
    },
    skills: {
      type: [String],
      validate: (value) => {
        const skillsLength = value.length >= 10;
        const eachskillsLength = value.every(skill => skill.length >= 10)
        if (skillsLength) {
          throw new Error("You can add upto 10 skills");
        }else if(eachskillsLength){
          throw new Error("Each skills limit is 10 character");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
