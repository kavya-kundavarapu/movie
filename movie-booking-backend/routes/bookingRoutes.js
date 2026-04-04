// import express from "express";
// import Booking from "../models/Booking.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import { getMyBookings } from "../controllers/bookingControllers.js";

// const router = express.Router();

// // ✅ GET USER BOOKINGS
// router.get("/my", authMiddleware, async (req, res) => {
//   try {
//     const bookings = await Booking.find({
//       userId: req.user.id,
//     }).sort({ createdAt: -1 });

//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get("/my-bookings", authMiddleware, getMyBookings);
// router.post("/book", authMiddleware, async (req, res) => {
//   try {
//     const {
//       movieId,
//       seatNumbers,
//       pricePerSeat,
//       movieTitle,
//       posterPath,
//       showDate, // ✅ NEW
//       showTime, // ✅ NEW
//       theatreName, // ✅ NEW
//     } = req.body;

//     // ❗ VALIDATION
//     if (!seatNumbers || seatNumbers.length === 0) {
//       return res.status(400).json({ error: "No seats selected" });
//     }

//     if (!pricePerSeat) {
//       return res.status(400).json({ error: "pricePerSeat required" });
//     }

//     // 💰 CALCULATE
//     const totalPrice = seatNumbers.length * pricePerSeat;

//     // ✅ SAVE
//     const booking = await Booking.create({
//       userId: req.user.id,
//       movieId,
//       movieTitle,
//       posterPath,

//       showDate, // 🔥 FIX
//       showTime, // 🔥 FIX
//       theatreName, // 🔥 FIX

//       seatNumbers,
//       pricePerSeat,
//       totalPrice,
//     });

//     res.json(booking);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
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
