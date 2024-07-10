import React from "react";
import "./Seat.css";

const Seat = ({ details, onSeatChange }) => {
    let seats = details.seats ? details.seats : [0]
    // console.log(seats)
  return (
    <>
    <h4 className="text-center my-4">Seat Availability</h4>
    <div className="seat-container mb-4">
      {seats.map((seat, index) => (
        <label key={index} className="seat-label">
          <input
            type="radio"
            name="seat"
            value={index}
            disabled={seat !== 0} // Disable radio button if seat is not available
            onChange={() => onSeatChange(index)}
            className={`seat-input ${seat === 0 ? "available" : "unavailable"}`}
            required
          />
          <span className={`seat ${seat === 0 ? "seat-available" : "seat-unavailable"}`}></span>
        </label>
      ))}
    </div>
    </>
  );
};

export default Seat;
