// // export default Ticket;
// import { useLocation } from "react-router-dom";
// import { QRCode } from "react-qr-code";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const Ticket = () => {
//   const { state } = useLocation();

//   console.log("TICKET STATE:", state);
//   console.log("QRCode:", QRCode);
//   if (!state || !state.seatNumbers) {
//     return <h3 className="text-center mt-5">No Ticket Found ❌</h3>;
//   }

//   const downloadTicket = () => {
//     const input = document.getElementById("ticket");

//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF();
//       pdf.addImage(imgData, "PNG", 10, 10);
//       pdf.save("MovieTicket.pdf");
//     });
//   };
//   const { booking, movie, show } = location.state || {};
//   return (
//     <div className="container mt-5 text-center">
//       <div id="ticket" className="card p-4 shadow-lg">
//         {/* <h2>🎉 Booking Confirmed</h2>

//         <h4>🎬 Movie ID: {state.movieId}</h4>
//         <p>💺 Seats: {state.seatNumbers.join(", ")}</p>
//         <p>💰 ₹{state.totalPrice}</p> */}
//         <h2>{booking?.movieTitle || movie?.title}</h2>

//         <img
//           src={booking?.posterPath || movie?.poster_path}
//           alt="poster"
//           style={{ width: "120px" }}
//         />

//         <p>🎭 {show?.theatreName}</p>
//         <p>
//           📅 {show?.showDate} | {show?.showTime}
//         </p>
//         <p>
//           💺{" "}
//           {booking?.seatNumbers?.join(", ") || movie?.seatNumbers?.join(", ")}
//         </p>
//         <p>💰 ₹{booking?.totalPrice || movie?.totalPrice}</p>

//         <div style={{ background: "white", padding: "10px" }}>
//           <QRCode
//             value={`Movie:${state.movieId}, Seats:${state.seatNumbers}`}
//           />
//         </div>
//       </div>

//       <button className="btn btn-primary mt-3" onClick={downloadTicket}>
//         Download Ticket 🎟
//       </button>
//     </div>
//   );
// };

// export default Ticket;
import { useLocation } from "react-router-dom";
import { QRCode } from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Ticket = () => {
  const { state } = useLocation();

  console.log("TICKET STATE:", state);

  // ✅ correct destructuring
  const booking = state?.booking;
  const movie = state?.movie;
  const show = state?.show;

  // ❗ correct validation
  if (!booking) {
    return <h3 className="text-center mt-5">No Ticket Found ❌</h3>;
  }

  const downloadTicket = () => {
    const input = document.getElementById("ticket");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("MovieTicket.pdf");
    });
  };

  return (
    <div className="container mt-5 text-center">
      <div id="ticket" className="card p-4 shadow-lg">
        <h2>🎉 Booking Confirmed</h2>

        {/* 🎬 Movie */}
        <h3>{booking.movieTitle || movie?.title}</h3>

        <img
          src={`https://image.tmdb.org/t/p/w200${
            booking.posterPath || movie?.poster_path
          }`}
          alt="poster"
          style={{ width: "150px", borderRadius: "10px" }}
        />

        {/* 🎭 Show Details */}
        <p>🎭 {booking.theatreName}</p>
        <p>📅 {booking.showDate}</p>
        <p>⏰ {booking.showTime}</p>

        {/* 🎟 Seats */}
        <p>💺 {booking.seatNumbers.join(", ")}</p>

        {/* 💰 Price */}
        <p>💰 ₹{booking.totalPrice}</p>

        {/* 📱 QR */}
        <div style={{ background: "white", padding: "10px" }}>
          <QRCode
            value={`Movie:${booking.movieTitle}, Seats:${booking.seatNumbers}, Total:${booking.totalPrice}`}
          />
        </div>
      </div>

      <button className="btn btn-primary mt-3" onClick={downloadTicket}>
        Download Ticket 🎟
      </button>
    </div>
  );
};

export default Ticket;
