const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./DBConfig/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();
app.use("/api/v1/auth", authRoutes);

app.listen(8000, () => {
});
