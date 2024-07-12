import FilterNav from "../FilterNav";
import { useState, useEffect } from "react";
import axios from "axios";
import Flight from "./Flight";
import Loader from "../Loader/Loader";

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchFlights = async () => {
      try {
        const response = await axios.get("https://real-time-flight-booking-app-n9v1.vercel.app/api/flights");
        // console.log(response.data)
        const filteredFlights = response.data.filter((flight) => {
          const flightDate = new Date(flight.date).toISOString().split("T")[0]; // Standardize to YYYY-MM-DD format
          const todayDate = new Date().toISOString().split("T")[0];
          return (
            (!from || flight.from === from) &&
            (!to || flight.to === to) &&
            (!date ? flightDate >= todayDate : flightDate === date)
          );
        });
        setFlights(filteredFlights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [from, to, date]);
  return (
    <>
      <FilterNav handleFrom={setFrom} handleTo={setTo} handleDate={setDate} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          {flights.length ? (
            <div>
              <h4 className="mt-4">Available Flights</h4>
              {flights.map((flight) => (
                <Flight key={flight._id} flight={flight} />
              ))}
            </div>
          ) : (
            <h4 className="mt-4">No Available Flights</h4>
          )}
        </div>
      )}
    </>
  );
};
export default Home;
