import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const handleBooking = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    } else {
      // navigate(`/booking/${id}`);
      navigate(`/booking/${movie.id}`, {
        state: {
          movie: movie,
          show: {
            showDate: "2026-04-05",
            showTime: "7:00 PM",
            theatreName: "PVR Cinemas",
          },
        },
      });
    }
  };
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie)
    return (
      <h3 className="text-center mt-5">
        <div className="text-center mt-5">
          <div className="spinner-border"></div>
        </div>
      </h3>
    );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>

          <p>
            ⭐ {movie.vote_average} | 📅 {movie.release_date}
          </p>

          <button className="btn btn-danger mt-3" onClick={handleBooking}>
            🎟️ Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
