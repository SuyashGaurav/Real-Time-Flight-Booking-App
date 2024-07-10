import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Bookflight from "./components/Home/Booking/Bookflight";
import PaymentScreen from "./components/Home/Payment/PaymentScreen";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";

const App = () => {
  const location = useLocation();
  const showNavBar = !location.pathname.match(/^\/flight\/[^\/]+\/[^\/]+\/payment$/);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  const ProtectedRoute = ({ isLoggedIn, redirectPath = "/login", children }) => {
    // console.log(isLoggedIn)
    if (!isLoggedIn) {
      alert("Please Login First.")
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };
  return (
    <div>
      {showNavBar && <Navbar isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />}
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup handleLogIn={handleLogIn} />} />
        <Route path="/login" element={<Login handleLogIn={handleLogIn} />} />
        <Route path="/flight/:id" element={<Bookflight />} />
        <Route
          path="/flight/:id/:seat/payment"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PaymentScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
    </div>
  );
};

export default App;
