const FlightSummary = ({details}) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMilliseconds = endDate - startDate;

    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${hours}h ${minutes}m`;
  };
  let countSeats = () => {
    let count = 0;
    details.seats.map((seat) => {
      if (seat === 0) count += 1;
    });
    return count;
  };

  return (
    <>
    <h4 className="text-center">Flight Summary</h4>
    <div
      className="flight-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <h2 className="flight-name">{details.name}</h2>
      <div className="flight-route">
        <span>{details.from}</span>
        <hr className="flight-route-line" />
        <span>{calculateDuration(details.start, details.end)}</span>
        <hr className="flight-route-line" />
        <span>{details.to}</span>
      </div>
      <div className="flight-route">
        <span>{formatTime(details.start)}</span>
        <span>{formatTime(details.end)}</span>
      </div>
      <p
        className="flight-name"
        style={{ fontSize: "18px", fontWeight: "400" }}
      >
        {new Date(details.date).toLocaleDateString()}
      </p>
      <div className="flight-info">
        <p>
          <strong>Price:</strong> ₹{details.price}
        </p>
        <p>
          <strong>Available Seats:</strong> {details.seats ? countSeats() : 0}/
          {details.seats ? details.seats.length : 0}
        </p>
      </div>
    </div>
    </>
  );
};

export default FlightSummary;
