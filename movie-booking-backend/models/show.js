import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  movieId: Number,

  seats: [String], // all seats

  bookedSeats: [String], // already booked
});

export default mongoose.model("Show", showSchema);
