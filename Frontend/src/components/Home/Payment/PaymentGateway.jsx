import { useForm } from "react-hook-form";

const PaymentGateway = ({ confirmPayment, cancelPayment, timeLeft }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="card shadow-lg p-4" style={{ backgroundColor: "#f5f5f5", maxWidth: "500px", margin: "auto", borderRadius: "10px" }}>
      <h3 className="mb-4 text-center">Payment Gateway</h3>
      <div className="text-center">
        <p className="text-danger">
          Time left: {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </p>
        <form onSubmit={handleSubmit(confirmPayment)}>
          <div className="mb-3">
            <label htmlFor="inputFirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputCardNumber" className="form-label">
              Credit Card Number
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCardNumber"
              maxLength="12"
              {...register("cardNumber", { required: "Credit card number is required", pattern: { value: /^\d{12}$/, message: "Credit card number must be 12 digits long" } })}
            />
            {errors.cardNumber && <small className="text-danger">{errors.cardNumber.message}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputExpiryDate" className="form-label">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              className="form-control"
              id="inputExpiryDate"
              maxLength="5"
              {...register("expiryDate", { required: "Expiry date is required", pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "Expiry date must be in MM/YY format" } })}
            />
            {errors.expiryDate && <small className="text-danger">{errors.expiryDate.message}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputCVV" className="form-label">
              CVV
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCVV"
              maxLength="3"
              {...register("cvv", { required: "CVV is required", pattern: { value: /^[0-9]{3}$/, message: "CVV must be 3 digits long" } })}
            />
            {errors.cvv && <small className="text-danger">{errors.cvv.message}</small>}
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button onClick={cancelPayment} type="button" className="btn btn-danger w-50">
              Cancel Payment
            </button>
            <button type="submit" className="btn btn-success w-50 ms-3">
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
