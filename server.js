require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the 'cors' package
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();

// Database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Not Connected", err));

// Middleware
app.use(express.json());

// Enable CORS for all routes (you can also specify origins as needed)
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
