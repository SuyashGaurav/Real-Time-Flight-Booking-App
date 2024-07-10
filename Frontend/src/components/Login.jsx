import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect } from "react";

const Login = ({setIsLoggedIn}) => {
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
  const onLogin = async (data) => {
    // console.log(data)
    try {
      const response = await axios.post("http://localhost:3000/login", data);
      if (response.data === "notFound") {
        alert("User Does Not Exists!!\nRegister First.");
        navigate("/signup");
      } 
      else if (response.data.status === "success") {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true)
        navigate("/");
      } 
      else if (response.data === "invalidPassword") {
        alert("Incorrect Password!!");
        navigate("/login");
      } else {
        alert("Something went wrong");
        navigate("/error");
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <>
      <h2 className="mt-3 mb-3">Login</h2>
      <form onSubmit={handleSubmit(onLogin)}>
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
            id="inputPassword"
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
        <Link to="/signup">Create a new account?</Link>
      </div>
    </>
  );
};

export default Login;
