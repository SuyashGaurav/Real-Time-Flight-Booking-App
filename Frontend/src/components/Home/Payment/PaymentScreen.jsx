import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";
import PaymentMethod from "./PaymentMethod";
import FareSummary from "./FareSummary";

const PaymentScreen = () => {
  const [details, setDetails] = useState([]);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 2 minutes countdown
  let { id, seat } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchFlightsDetails = async () => {
    setLoading(true);
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
    setLoading(false);

    // Razorpay
    try {
      let amount = res.price + 150 + 300 + 300;
      let paymentDetails = await axios.post(
        "http://localhost:3000/api/payment",
        { amount }
      );
      // console.log(paymentDetails);
      if (paymentDetails.data.success) {
        let options = {
          key: paymentDetails.data.key_id,
          amount: amount * 100, // Razorpay requires the amount in paise
          currency: "INR",
          name: `${res.from} - ${res.to}`,
          description: "Happy Journey",
          image: "/flight.png",
          order_id: paymentDetails.data.order_id,
          handler: function (response) {
            // console.log(response);
            confirmPayment();
          },
          modal: {
            ondismiss: function () {
              //window closed by user
              cancelPayment();
            }
          },
          theme: {
            color: "#2300a3",
          },
        };
        let razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", function (response) {
          console.log(response.error);
          cancelPayment();
        });
        razorpay.open();
      } else {
        alert(paymentDetails.data.msg);
      }
    } catch (error) {
      console.error("Error with payment gateway:", error);
      navigate("/error");
    }
  };

  const confirmPayment = async () => {
    setLoading(true);
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
    setLoading(true);
    await unlockSeat();
    setLoading(false);
    navigate(`/flight/${id}`);
  };

  if (details.seats && details.seats[seat]) {
    // alert("This seat has already been booked.");
    return <Error />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      {/* {!isPaymentProcessing ? ( */}
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <PaymentMethod onPayment={onPayment} />
        <FareSummary price={details.price} />
      </div>
      <h6 className="text-success mt-5">*Test Payment Gateway powered by Razorpay. You can enter random details.</h6>
      {/* ) : ( */}
      {/* <PaymentGateway
          confirmPayment={confirmPayment}
          cancelPayment={cancelPayment}
          timeLeft={timeLeft}
        /> */}
      {/* )} */}
    </div>
  );
};

export default PaymentScreen;
