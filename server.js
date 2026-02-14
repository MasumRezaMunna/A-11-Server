const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const tuitionRouter = require("./routes/tuitionRoutes"); 
const hireRouter = require("./routes/hireRoutes");

const app = express();

const allowedOrigins = [
  'http://localhost:5173',          
  'https://a-11-teal.vercel.app'    
];

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
  })
);
app.use(helmet({
    contentSecurityPolicy: false, 
}));

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tuitions", tuitionRouter); 
app.use("/api/v1/hire", hireRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Server is running perfectly!");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));