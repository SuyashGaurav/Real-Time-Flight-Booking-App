import Navbar from "../Navbar";
import FilterNav from "../FilterNav";
import { useState, useEffect } from "react";
import axios from "axios";
import Flight from "./Flight";

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/flights");
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
      }
    };
    fetchFlights();
  }, [from, to, date]);
  return (
    <>
      <FilterNav  handleFrom={setFrom} handleTo={setTo} handleDate={setDate} />
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
    </>
  );
};
export default Home;
