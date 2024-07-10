import { useForm } from "react-hook-form";

const PaymentGateway = ({confirmPayment, cancelPayment, timeLeft}) => {
  const { handleSubmit } = useForm();
    return ( 
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
     );
}
 
export default PaymentGateway;