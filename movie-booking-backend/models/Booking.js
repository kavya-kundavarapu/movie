import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movieId: { type: String, required: true },
    movieTitle: String,
    posterPath: String,

    theatreName: { type: String, required: true },
    showDate: { type: String, required: true },
    showTime: { type: String, required: true },

    seatNumbers: { type: [String], required: true },

    pricePerSeat: Number,
    totalPrice: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
