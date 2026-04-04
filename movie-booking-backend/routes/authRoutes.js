import express from "express";
import { register, login } from "../controllers/authController.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router(); // ✅ MUST BE FIRST

// ✅ GET LOGGED-IN USER
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

export default router;
