const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pramanikrohan336:aYMEWtxYyGKfwi5u@namastenode.wb4oikr.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
