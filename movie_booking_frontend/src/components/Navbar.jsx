import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Only call API if token exists
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">
        🎬 MovieApp
      </Link>

      {/* ✅ Show user name only if logged in */}
      {user && <h5 className="text-white">Welcome, {user.name} 👋</h5>}

      <div>
        <Link to="/" className="btn btn-outline-light me-2">
          Home
        </Link>

        {/* ✅ Show Login if NOT logged in */}
        {!user && (
          <Link to="/login" className="btn btn-warning mx-2">
            Login
          </Link>
        )}

        {/* ✅ Show Profile if logged in */}
        {user && (
          <Link to="/profile" className="btn btn-info mx-2">
            My Bookings
          </Link>
        )}

        {/* ✅ Logout button */}
        {user && (
          <button onClick={handleLogout} className="btn btn-danger mx-2">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
