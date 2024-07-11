import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "./Error/Error";
import Loader from "./Loader/Loader";

const Profile = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`https://flight-booking-backend-ten.vercel.app/api/user/${token}`);
          setUser(response.data); 
          setLoading(false); 
        } catch (error) {
          console.error("Error fetching user:", error);
          navigate("/error");
        }
      }
    };
    fetchUser();
  }, []);

  if (!isLoggedIn) {
    return <Error />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      <div className="row gutters">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center" style={{ backgroundColor: "#D6EFD8" }}>
              <img
                src={user.image}
                alt="User"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card h-100 shadow-sm">
            <div className="card-body" style={{ backgroundColor: "#D6EFD8" }}>
              <h4 className="card-title">Profile Details</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item h5" style={{ backgroundColor: "#D6EFD8" }}><strong>Name:</strong> {user.name}</li>
                <li className="list-group-item h5" style={{ backgroundColor: "#D6EFD8" }}><strong>Email:</strong> {user.email}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
