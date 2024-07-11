import { useForm } from "react-hook-form";
import Seat from "./Seat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PassengerDetails = ({details, id}) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const handleSeatChange = (index) => {
    setSelectedSeat(index);
  };
  const onBook = (data) => {
    // console.log(data);
    navigate(`/flight/${id}/${selectedSeat}/payment`)
    reset()
  };
  return (
    <>
      <h4 className="text-center my-4">Passenger Details</h4>
      <div className="container d-flex justify-content-center mb-5">
        <form onSubmit={handleSubmit(onBook)} className="w-100" style={{ maxWidth: "500px" }}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              })}
              type="text"
              className="form-control"
              id="inputName"
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputAge" className="form-label">
              Age
            </label>
            <input
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 0,
                  message: "Age cannot be less than 0",
                },
              })}
              type="number"
              className="form-control"
              id="inputAge"
            />
            {errors.age && <p className="text-danger">{errors.age.message}</p>}
          </div>

          <Seat details={details} onSeatChange={handleSeatChange} />
          {selectedSeat !== null && <p>Selected Seat: {selectedSeat + 1}</p>}

          <button type="submit" className="btn btn-success w-100">
            Proceed to payment
          </button>
        </form>
      </div>
    </>
  );
};

export default PassengerDetails;
