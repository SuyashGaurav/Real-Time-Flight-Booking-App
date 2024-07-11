import { useForm } from "react-hook-form";
import { useState } from "react";

const PaymentMethod = ({onPayment}) => {
  const { handleSubmit } = useForm();
  return (
    <div
      className="card shadow-lg p-4 mb-4 mb-md-0"
      style={{ backgroundColor: "#d6efd8", flex: "2" }}
    >
      <h3 className="mb-4 text-center">Choose Payment Method [Test Mode]</h3>
      <form onSubmit={handleSubmit(onPayment)}>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="credit"
            value="credit"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="credit">
          <i className="fas fa-credit-card me-2"></i>
          Credit Card
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="wallet"
            value="wallet"
          />
          <label className="form-check-label" htmlFor="wallet">
          <i className="fas fa-wallet me-2"></i>
          Wallet
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
