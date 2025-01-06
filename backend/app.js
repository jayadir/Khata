const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const authMiddleware = require("./middlewares/authMiddleware");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cookieParser());
const allowedOrigins = ['http://localhost:3000', 'https://khata-tau.vercel.app'];
app.use(cors({
  origin: (origin, callback) => {
    console.log(origin);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);  
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use("/api/auth", require("./controllers/authController/userRouter"));
// app.use(authMiddleware.authMiddleware);
app.use("/api/transaction", require("./controllers/transactionController/transactionRouter"));
app.listen(5000, () => {
  console.log("Backend is running");
});
