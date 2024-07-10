import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FlightSummary from "./FlightSummary";
import PassengerDetails from "./PasssengerDetails";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import axios from "axios";

const Bookflight = () => {
  let { id } = useParams();
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchFlightsDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/flights/${id}`
        );
        // console.log(response.data);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
        navigate("/error")
      } finally {
        setLoading(false);
      }
    };
    fetchFlightsDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <FlightSummary details={details} />
      <PassengerDetails details={details} id={id} />
    </>
  );
};

export default Bookflight;
