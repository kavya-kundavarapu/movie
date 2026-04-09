import Booking from "../models/Booking.js";

// ✅ GET BOOKINGS
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ BOOK TICKET (WITH SEAT CHECK)
export const createBooking = async (req, res) => {
  try {
    const {
      movieId,
      seatNumbers,
      pricePerSeat,
      movieTitle,
      posterPath,
      showDate,
      showTime,
      theatreName,
    } = req.body;

    if (!seatNumbers || seatNumbers.length === 0) {
      return res.status(400).json({ error: "No seats selected" });
    }

    // 🔴 CHECK DUPLICATE SEATS
    const existing = await Booking.find({
      movieId,
      showDate,
      showTime,
    });

    const bookedSeats = existing.flatMap((b) => b.seatNumbers);

    const conflict = seatNumbers.some((seat) => bookedSeats.includes(seat));

    if (conflict) {
      return res.status(400).json({ error: "Seats already booked" });
    }

    const totalPrice = seatNumbers.length * pricePerSeat;

    const booking = await Booking.create({
      userId: req.user.id,
      movieId,
      movieTitle,
      posterPath,
      theatreName,
      showDate,
      showTime,
      seatNumbers,
      pricePerSeat,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
