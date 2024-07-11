import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isLoggedIn, handleLogOut }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`http://localhost:3000/api/user/${token}`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          navigate("/error");
        }
      } else {
        setUser(null); // Reset user state when logged out
      }
    };
    fetchUser();
  }, [isLoggedIn, navigate]); 

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top mb-3" style={{ backgroundColor: "#55AD9B", height: "70px", zIndex: "1000" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-plane me-2"></i>
          <span>Book Flight</span>
        </Link>
        <div className="d-flex align-items-center">
          {!isLoggedIn ? (
            <>
              <Link className="nav-link me-4" to="/signup"><b className="mr-3">SignUp</b></Link>
              <Link className="nav-link" to="/login"><b>Login</b></Link>
            </>
          ) : (
            <>
              <Link className="nav-link me-4" to="/" onClick={handleLogOut}><b>Log Out</b></Link>
              <Link className="nav-link" to="/profile">
                {user ? (
                  <img
                    src={user.image}
                    alt="User"
                    className="img-fluid rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                ) : (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
