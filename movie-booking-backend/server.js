import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import showRoutes from "./routes/showRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/show", showRoutes);
// app.use("/api/admin", adminRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));
