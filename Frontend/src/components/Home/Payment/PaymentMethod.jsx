import { useForm } from "react-hook-form";
import { useState } from "react";

const PaymentMethod = ({onPayment}) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const { handleSubmit } = useForm();
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <div
      className="card shadow-lg p-4 mb-4 mb-md-0"
      style={{ backgroundColor: "#d6efd8", flex: "2" }}
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
  );
};

export default PaymentMethod;
