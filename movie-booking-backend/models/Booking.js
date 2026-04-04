import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movieId: {
      type: String,
      required: true,
    },

    // ✅ ADD THESE
    movieTitle: {
      type: String,
    },

    posterPath: {
      type: String,
    },

    theatreName: {
      type: String,
      required: true,
    },

    showDate: {
      type: String,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },

    seatNumbers: {
      type: [String],
      required: true,
    },

    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
