import { useEffect, useState } from "react";
import { getGenres, getPopularMovies } from "../services/api";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch movies
    getPopularMovies()
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));

    // fetch genres
    getGenres()
      .then((res) => {
        const map = {};
        res.data.genres.forEach((g) => {
          map[g.id] = g.name;
        });
        setGenres(map);
      })
      .catch((err) => console.log(err));
  }, []);
  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre))
    : movies;
  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-center">🎬 Popular Movies</h2>
      <div className="mb-4 text-center">
        <button
          className="btn btn-outline-dark m-1"
          onClick={() => setSelectedGenre(null)}
        >
          All
        </button>

        {Object.entries(genres).map(([id, name]) => (
          <button
            key={id}
            className={`btn m-1 ${
              selectedGenre == id ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setSelectedGenre(Number(id))}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="row">
        {filteredMovies.length === 0 ? (
          <h5 className="text-center mt-4">
            ❌ No movies available for this genre
          </h5>
        ) : (
          filteredMovies.map((movie) => (
            <div className="" key={movie.id}>
              {/* your card */}
            </div>
          ))
        )}
        {filteredMovies.map((movie) => (
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

                <p>
                  🎭{" "}
                  {movie.genre_ids
                    .map((id) => genres[id])
                    .filter(Boolean)
                    .join(", ")}
                </p>

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
