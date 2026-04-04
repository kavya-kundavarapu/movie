import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.get("/:movieId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      movieId: req.params.movieId,
    });

    // ✅ flatten all booked seats
    const bookedSeats = bookings.flatMap((b) => b.seatNumbers);

    res.json({
      bookedSeats,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
