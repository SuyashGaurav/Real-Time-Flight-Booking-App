const FilterNav = ({ handleFrom, handleTo, handleDate }) => {
  const cities = [
    "Patna",
    "Bangalore",
    "Goa",
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Dubai",
    "New York",
    "Doha",
    "London",
    "Frankfurt",
    "Tokyo",
    "Singapore",
    "Sydney",
    "Paris",
    "Rome",
    "Abu Dhabi",
    "Bangkok",
    "Kuala Lumpur",
    "Hong Kong",
    "Seoul",
    "Los Angeles",
    "Amsterdam",
    "Istanbul",
    "Moscow",
  ];
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="search-bar"
      style={{
        backgroundColor: "#95D2B3",
        padding: "10px 0",
        height: "auto",
        borderRadius: "15px",
        position: "sticky",
        top: 73,
        zIndex: 1000
      }}
    >
      <div className="container-fluid">
        <form className="row g-3 align-items-center justify-content-center">
          <div className="col-12 col-md-4">
            <label htmlFor="from" className="form-label">
              From:
            </label>
            <select
              className="form-control"
              id="from"
              required
              onChange={(e) => handleFrom(e.target.value)}
            >
              <option value="">Select departure city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="to" className="form-label">
              To:
            </label>
            <select
              className="form-control"
              id="to"
              required
              onChange={(e) => handleTo(e.target.value)}
            >
              <option value="">Select destination city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="departure-date" className="form-label">
              Departure Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="departure-date"
              min={today}
              onChange={(e) => handleDate(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterNav;
