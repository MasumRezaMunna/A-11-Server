const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const tuitionRouter = require("./routes/tuitionRoutes");
const helmet = require("helmet");
const hireRouter = require("./routes/hireRoutes");
const tuitionRoutes = require('./routes/tuitionRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to eTuitionBd API!",
    status: "Active",
  });
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "http://localhost:5000",
          "https://*.firebaseio.com",
          "https://*.googleapis.com",
        ],
        imgSrc: ["'self'", "data:", "https://firebasestorage.googleapis.com"],
      },
    },
  }),
);

app.use(express.json());

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tuitions", tuitionRouter);
app.use("/api/v1/hire", hireRouter);
app.use('/api/v1/tuitions', tuitionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    status: "error",
    message: err.message || "Something went wrong",
  });
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
