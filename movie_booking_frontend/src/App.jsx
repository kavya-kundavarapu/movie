import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking_Movie from "./pages/BookingMovie";
import Profile from "./pages/Profile";
import BookingMovie from "./pages/BookingMovie";
import Ticket from "./pages/Ticket";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:id" element={<BookingMovie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ticket" element={<Ticket />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
