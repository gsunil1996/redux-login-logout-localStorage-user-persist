const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const fileUpload = require('express-fileupload')

// import all routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

require("dotenv").config();
require("./db/database");

const app = express();

const corsOptions = {
  credentials: true, // Allow credentials (cookies)
  origin: 'http://localhost:3000', // Replace with your frontend domain
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(fileUpload());

// routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);

// middleware to handle errors
app.use(errorMiddleware);

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
