import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [])
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top mb-5" style={{ backgroundColor: "#55AD9B", height: "60px", borderRadius: "15px", zIndex: "1000" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <i className="fas fa-plane me-2"></i>
        <span>Book Flight</span>
        </Link>
        <div className="d-flex align-items-center">
          {!isLoggedIn ? (
            <>
              <Link className="nav-link me-3" to="/signup"><b className="mr-3">SignUp</b></Link>
              <Link className="nav-link" to="/login"><b>Login</b></Link>
            </>
          ) : (
            <Link className="nav-link" to="/" onClick={handleLogout}><b>Log Out</b></Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

