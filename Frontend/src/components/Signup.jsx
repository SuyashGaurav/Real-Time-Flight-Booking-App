import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = ({setIsLoggedIn}) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(false);
      localStorage.removeItem("token")
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const onRegister = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      if (response.data.status === "success") {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true)
        navigate("/");
        return;
      } else if (response.data === "exists") {
        alert("Account with this email already exists!! \nPlease Login");
        navigate("/login");
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <>
      <h2 className="mt-3 mb-3">Sign Up</h2>
      <form onSubmit={handleSubmit(onRegister)}>
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
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              minLength: { value: 11, message: "Not a valid Email" },
            })}
            type="email"
            className="form-control"
            id="inputEmail"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Must be atleast 4 characters long",
              },
            })}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
      <div className="mt-5">
        <Link to="/login">Already have an account?</Link>
      </div>
    </>
  );
};

export default Signup;
