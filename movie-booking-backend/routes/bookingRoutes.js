import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getMyBookings,
  createBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/my", authMiddleware, getMyBookings);
router.post("/book", authMiddleware, createBooking);

export default router;
