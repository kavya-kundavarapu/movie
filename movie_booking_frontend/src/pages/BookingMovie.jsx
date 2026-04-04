import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getMovieDetails } from "../services/api";

const BookingMovie = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const location = useLocation();
  const [movie, setMovie] = useState(location.state?.movie || null);
  const [show, setShow] = useState(location.state?.show || null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!show) {
      // ✅ fallback (VERY IMPORTANT)
      console.log("No state found → using fallback");

      setShow({
        showDate: "2026-04-05",
        showTime: "7:00 PM",
        theatreName: "PVR Cinemas",
      });
    }
  }, [show]);

  // Fetch movie if not set
  useEffect(() => {
    if (!movie) {
      const fetchMovie = async () => {
        try {
          const res = await getMovieDetails(id);
          setMovie(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchMovie();
    }
  }, [movie, id]);

  // 🔐 LOGIN CHECK
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Login required");
      navigate("/login");
    }
  }, [navigate]);

  // 📡 FETCH BOOKED SEATS
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/show/${id}`);
        setBookedSeats(res.data.bookedSeats || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookedSeats();
  }, [id]);

  // 🎟 Seat Layout
  const rows = ["A", "B", "C", "D"];
  const cols = [1, 2, 3, 4, 5, 6];

  // 💰 Pricing
  const pricePerSeat = movie ? (movie.vote_average > 7 ? 250 : 150) : 0;

  const totalPrice = selectedSeats.length * pricePerSeat;

  // 🎯 Seat selection
  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  // 💳 PAYMENT + BOOKING
  const handlePayment = async () => {
    if (selectedSeats.length === 0) {
      alert("Select seats");
      return;
    }

    if (!movie) {
      alert("Movie not loaded");
      return;
    }
    console.log("SHOW DATA:", show);
    console.log("MOVIE DATA:", movie);
    console.log("location.state:", location.state);
    try {
      alert("Payment Successful ✅");

      const res = await axios.post(
        "http://localhost:5000/api/booking/book",
        {
          movieId: movie.id,
          movieTitle: movie.title,
          posterPath: movie.poster_path,

          theatreName: show.theatreName,
          showDate: show.showDate,
          showTime: show.showTime,

          seatNumbers: selectedSeats,
          totalPrice: totalPrice,
          pricePerSeat: pricePerSeat,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log("BOOKING RESPONSE:", res.data);

      navigate("/ticket", {
        state: {
          booking: res.data,
          movie: movie,
          show: show,
        },
      });
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  if (!movie) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-4 text-center">
      <h2>{movie.title}</h2>
      <p>⭐ {movie.vote_average}</p>
      <h4>₹{pricePerSeat} / seat</h4>

      {/* 🎬 SCREEN */}
      <div className="bg-dark text-white p-2 w-50 mx-auto rounded">SCREEN</div>

      {/* 🎟 SEATS */}
      {rows.map((row) => (
        <div key={row}>
          {cols.map((col) => {
            const seat = row + col;
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);

            return (
              <button
                key={seat}
                disabled={isBooked}
                onClick={() => handleSeatClick(seat)}
                className={`btn m-2 ${
                  isBooked
                    ? "btn-secondary"
                    : isSelected
                      ? "btn-success"
                      : "btn-outline-dark"
                }`}
              >
                {seat}
              </button>
            );
          })}
        </div>
      ))}

      {/* 📊 SUMMARY */}
      <h5>Seats: {selectedSeats.join(", ") || "None"}</h5>
      <h4>Total: ₹{totalPrice}</h4>

      {/* 💳 BUTTON */}
      <button className="btn btn-success mt-3" onClick={handlePayment}>
        Pay & Book 🎟
      </button>
    </div>
  );
};

export default BookingMovie;
