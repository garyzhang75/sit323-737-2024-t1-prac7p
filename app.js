const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test";

const connectWithRetry = () => {
  console.log("Attempting MongoDB connection...");
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("MongoDB connected");
  }).catch(err => {
    console.error("MongoDB connection error:", err);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

app.get('/', (req, res) => {
  res.send("Mongo microservice is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
