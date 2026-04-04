// import { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [bookings, setBookings] = useState([]);
//   const [movies, setMovies] = useState({});

//   const API_KEY = "62b1eaef5c77431465153161f2f772c1";

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get("http://localhost:5000/api/booking/my", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setBookings(res.data);

//       let movieData = {};

//       for (let b of res.data) {
//         if (!movieData[b.movieId]) {
//           const m = await axios.get(
//             `https://api.themoviedb.org/3/movie/${b.movieId}?api_key=${API_KEY}`,
//           );

//           movieData[b.movieId] = m.data;
//         }
//       }

//       setMovies(movieData);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>🎟 My Bookings</h2>

//       <div className="row">
//         {bookings.map((b) => {
//           const movie = movies[b.movieId];

//           return (
//             <div className="col-md-4" key={b._id}>
//               <div className="card shadow p-3 mb-4">
//                 {movie && (
//                   <img
//                     src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//                     alt=""
//                     className="mb-2"
//                   />
//                 )}

//                 <h5>{movie?.title || "Loading..."}</h5>

//                 <p>💺 {b.seatNumbers.join(", ")}</p>
//                 <p>💰 ₹{b.totalPrice}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Profile;
import axios from "axios";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const Profile = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/booking/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>🎟 My Bookings</h2>

      <div className="row">
        {bookings.map((b) => (
          <div className="col-md-4 mb-4" key={b._id}>
            <div className="card shadow p-3">
              {/* 🎬 Movie Image */}
              <img
                src={`https://image.tmdb.org/t/p/w500/${b.posterPath}`}
                alt="movie"
                className="card-img-top"
              />

              <div className="card-body">
                <h5>{b.movieTitle || "Movie"}</h5>

                <p>💺 {b.seatNumbers.join(", ")}</p>
                <p>💰 ₹{b.totalPrice}</p>

                {/* 📅 */}
                {/* <p>📅 {new Date(b.createdAt).toLocaleString()}</p> */}
                <p>🎭 {b.theatreName}</p>
                <p>
                  📅 {b.showDate} | {b.showTime}
                </p>
                <p>🧾 Booked on: {new Date(b.createdAt).toLocaleString()}</p>

                {/* QR */}
                <div style={{ background: "#fff", padding: "5px" }}>
                  <QRCode value={b._id} size={80} />
                </div>

                <button className="btn btn-primary mt-2 w-100">
                  Download Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
