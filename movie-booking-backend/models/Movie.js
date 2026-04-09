import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  poster: String,
  genre: [String],
  language: String,
  duration: String,
  releaseDate: String,
  description: String,
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
