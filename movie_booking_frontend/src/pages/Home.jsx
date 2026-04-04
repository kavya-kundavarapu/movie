import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const genreMap = {
    28: "Action",
    35: "Comedy",
    18: "Drama",
    27: "Horror",
    10749: "Romance",
    53: "Thriller",
  };
  useEffect(() => {
    getPopularMovies()
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-center">🎬 Popular Movies</h2>

      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-3 mb-4" key={movie.id}>
            <div
              className="card h-100 shadow-sm movie-card"
              style={{ cursor: "pointer", borderRadius: "12px" }}
            >
              {/* IMAGE */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
                style={{
                  height: "350px",
                  objectFit: "cover",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />

              {/* BODY */}
              <div className="card-body d-flex flex-column">
                <h6 className="fw-bold">{movie.title}</h6>

                <p className="mb-2">
                  <span
                    className="bi bi-star-fill me-1"
                    style={{ color: "gold" }}
                  ></span>

                  <span className="badge bg-primary me-2">
                    {movie.vote_average}
                  </span>
                </p>

                <small className="text-muted mb-3">
                  📅 {movie.release_date}
                </small>
                <p>🎭 {movie.genre_ids.map((id) => genreMap[id]).join(", ")}</p>

                <p>💰 ₹{movie.vote_average > 7 ? 250 : 150}</p>
                {/* BUTTON */}
                <button
                  className="btn btn-dark mt-auto"
                  // onClick={() => navigate(`/movie/${movie.id}`)}
                  onClick={() =>
                    // navigate(`/booking/${movie.id}`, { state: { movie } })
                    navigate(`/booking/${movie.id}`, {
                      state: {
                        movie: movie,
                        show: {
                          showDate: "2026-04-05",
                          showTime: "7:00 PM",
                          theatreName: "PVR Cinemas",
                        },
                      },
                    })
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
