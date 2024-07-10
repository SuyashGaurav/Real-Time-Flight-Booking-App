import "./Flight.css";
import { NavLink } from "react-router-dom";

const Flight = ({ flight }) => {
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    return (
        <NavLink className="flight-card" to={`/flight/${flight._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2 className="flight-name">{flight.name}</h2>
            <div className="flight-route">
                <span>{flight.from}</span>
                <hr className="flight-route-line" />
                <span>{flight.to}</span>
            </div>
            <div className="flight-route">
                <span>{formatTime(flight.start)}</span>
                <span>{formatTime(flight.end)}</span>
            </div>
            <p className="flight-name" style={{ fontSize: "18px", fontWeight: "400" }}>{new Date(flight.date).toLocaleDateString()}</p>
            <div className="flight-info">
                <p><strong>Price:</strong> ₹{flight.price}</p>
            </div>
        </NavLink>
    );
};

export default Flight;
