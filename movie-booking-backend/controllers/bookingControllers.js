export const getMyBookings = async (req, res) => {
  try {
    // const bookings = await Booking.find({ userId: req.user.id }).sort({
    //   createdAt: -1,
    // });

    // res.json(bookings);
    const booking = new Booking({
      userId: req.user.id,
      movieId: req.body.movieId,

      movieTitle: req.body.movieTitle, // ✅ add
      posterPath: req.body.posterPath, // ✅ add

      theatreName: req.body.theatreName,
      showDate: req.body.showDate,
      showTime: req.body.showTime,

      seatNumbers: req.body.seatNumbers,
      totalPrice: req.body.totalPrice,
    });

    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
