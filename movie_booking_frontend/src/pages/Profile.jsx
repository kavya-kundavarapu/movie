import axios from "axios";
import { useEffect, useState } from "react";
import { QRCode } from "react-qr-code";
import jsPDF from "jspdf";

const Profile = () => {
  const [bookings, setBookings] = useState([]);

  // ✅ Fetch bookings
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    axios
      .get("http://localhost:5000/api/booking/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ DOWNLOAD PDF (FINAL FIXED)
  const downloadTicket = async (booking) => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("🎬 Movie Ticket", 70, 20);

    pdf.setFontSize(12);

    pdf.text(`Movie: ${booking.movieTitle}`, 20, 40);
    pdf.text(`Theatre: ${booking.theatreName}`, 20, 50);
    pdf.text(`Date: ${booking.showDate}`, 20, 60);
    pdf.text(`Time: ${booking.showTime}`, 20, 70);

    pdf.text(`Seats: ${booking.seatNumbers.join(", ")}`, 20, 80);
    pdf.text(`Total Price: ₹${booking.totalPrice}`, 20, 90);

    pdf.text(
      `Booked On: ${new Date(booking.createdAt).toLocaleString()}`,
      20,
      100,
    );

    try {
      // ✅ LOAD IMAGE
      const imgUrl = `https://image.tmdb.org/t/p/w500/${booking.posterPath}`;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imgUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imgData = canvas.toDataURL("image/png");

      // ✅ ADD IMAGE
      pdf.addImage(imgData, "PNG", 140, 10, 50, 60);
    } catch (err) {
      console.log("Image load failed");
    }

    // ✅ QR CODE
    const qrCanvas = document.querySelector(`#qr-${booking._id} canvas`);
    if (qrCanvas) {
      const qrImage = qrCanvas.toDataURL("image/png");
      pdf.addImage(qrImage, "PNG", 150, 80, 40, 40);
    }

    pdf.save(`ticket-${booking._id}.pdf`);
  };

  // ✅ PRINT FUNCTION
  const printTicket = (id) => {
    const content = document.getElementById(`ticket-${id}`);

    if (!content) return;

    const win = window.open("", "", "width=800,height=600");

    win.document.write(`
      <html>
        <head>
          <title>Print Ticket</title>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🎟 My Bookings</h2>

      <div className="row">
        {bookings.length === 0 ? (
          <p className="text-center">No bookings found</p>
        ) : (
          bookings.map((b) => (
            <div className="col-md-4 mb-4" key={b._id}>
              <div
                id={`ticket-${b._id}`}
                className="card shadow p-3"
                style={{ borderRadius: "10px" }}
              >
                <h5 className="text-center">🎬 Movie Ticket</h5>
                <hr />

                {/* 🎬 IMAGE */}
                <img
                  src={`https://image.tmdb.org/t/p/w500/${b.posterPath}`}
                  alt="movie"
                  className="card-img-top"
                  style={{ borderRadius: "10px" }}
                />

                <div className="card-body">
                  <h5>{b.movieTitle}</h5>

                  <p>🎭 {b.theatreName}</p>
                  <p>
                    📅 {b.showDate} | {b.showTime}
                  </p>

                  <p>💺 Seats: {b.seatNumbers.join(", ")}</p>
                  <p>💰 Total: ₹{b.totalPrice}</p>

                  <p>🧾 Booked on: {new Date(b.createdAt).toLocaleString()}</p>

                  {/* QR */}
                  <div
                    id={`qr-${b._id}`}
                    style={{
                      background: "#fff",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <QRCode value={b._id} size={80} />
                  </div>

                  {/* BUTTONS */}
                  <button
                    className="btn btn-success mt-3 w-100"
                    onClick={() => downloadTicket(b)}
                  >
                    Download Ticket 🎫
                  </button>

                  <button
                    className="btn btn-secondary mt-2 w-100"
                    onClick={() => printTicket(b._id)}
                  >
                    Print Ticket 🖨
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
