import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Error from "../../Error/Error";
import { useForm } from "react-hook-form";
import Loader from "../../Loader/Loader";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const { handleSubmit } = useForm();
  const [details, setDetails] = useState([]);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
  let { id, seat } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const fetchFlightsDetails = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:3000/api/flights/${id}`
      );
      setDetails(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching flights:", error);
      navigate("/error");
      return null;
    } finally {
      setLoading(false);
    }
  };
  const unlockSeat = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/flights/${id}/unlock-seat`, {
        seat,
      });
    } catch (error) {
      console.error("Error unlocking seat:", error);
      navigate("/error");
    }
  };

  useEffect(() => {
    fetchFlightsDetails();
  }, [id]);

  useEffect(() => {
    if (isPaymentProcessing) {
      if (timeLeft === 0) {
        alert("Payment time expired. Please try again.");
        unlockSeat();
        navigate(`/flight/${id}`);
      } else {
        const timer = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [isPaymentProcessing, timeLeft, navigate, id]);
  
  const onPayment = async (data) => {
    setLoading(true);
    const res = await fetchFlightsDetails();
    // console.log(res);
    if (res.seats && res.seats[seat] === 1) {
      alert("This seat has already been booked.");
      navigate(`/flight/${id}`);
      return;
    }
    if (res.locks && res.locks[seat] === 1) {
      alert("This seat is not available at this moment. Try Again.");
      navigate(`/flight/${id}`);
      return;
    }
    const lockSeat = async () => {
      try {
        await axios.patch(`http://localhost:3000/api/flights/${id}/lock-seat`, {
          seat,
        });
      } catch (error) {
        console.error("Error locking seat:", error);
        navigate("/error");
      }
    };
    await lockSeat();
    setIsPaymentProcessing(true);
    setLoading(false)
  };

  const confirmPayment = async () => {
    setLoading(true)
    const seatBooked = async () => {
      try {
        await axios.patch(`http://localhost:3000/api/flights/${id}/seat-book`, {
          seat,
        });
      } catch (error) {
        console.error("Error unlocking seat:", error);
        navigate("/error");
      }
    };
    await seatBooked();
    await unlockSeat();
    alert("Payment confirmed!");
    setLoading(false);
    navigate(`/flight/${id}`);
  };

  const cancelPayment = async () => {
    setLoading(true)
    await unlockSeat();
    setLoading(false)
    navigate(`/flight/${id}`);
  };

  if (details.seats && details.seats[seat]) {
    // alert("This seat has already been booked.");
    return <Error />;
  }

  if(loading){
    return <Loader />
  }

  return (
    <div className="container mt-5">
      {!isPaymentProcessing ? (
        <div
          className="card shadow-lg p-4"
          style={{ backgroundColor: "#d6efd8" }}
        >
          <h3 className="mb-4 text-center">Choose Payment Method</h3>
          <form onSubmit={handleSubmit(onPayment)}>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="paypal"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={handlePaymentChange}
              />
              <label className="form-check-label" htmlFor="paypal">
                <i className="fab fa-paypal"></i> PayPal
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Continue
            </button>
          </form>
        </div>
      ) : (
        <div
          className="card shadow-lg p-4"
          style={{ backgroundColor: "#d6efd8" }}
        >
          <h3 className="mb-4 text-center">Payment Gateway</h3>
          <div className="text-center">
            <p className="text-danger">
              Time left: {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? "0" : ""}
              {timeLeft % 60}
            </p>
            <form onSubmit={handleSubmit(confirmPayment)}>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button onClick={cancelPayment} className="btn btn-danger w-50">
                  Cancel Payment
                </button>
                <button type="submit" className="btn btn-success w-50 ms-3">
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;

