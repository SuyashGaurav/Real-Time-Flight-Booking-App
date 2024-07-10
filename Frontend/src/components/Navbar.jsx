import { Link } from "react-router-dom";

const Navbar = ({isLoggedIn, handleLogOut}) => {
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
              <Link className="nav-link me-3" to="/signup"><b className="mr-3">SignUp</b></Link>
              <Link className="nav-link" to="/login"><b>Login</b></Link>
            </>
          ) : (
            <Link className="nav-link" to="/" onClick={() => handleLogOut()}><b>Log Out</b></Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

