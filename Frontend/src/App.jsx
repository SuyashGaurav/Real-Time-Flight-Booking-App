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

const ProtectedRoute = ({ isLoggedIn, redirectPath = "/login", children }) => {
  console.log(isLoggedIn)
  if (!isLoggedIn) {
    alert("Please Login First.")
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const App = () => {
  const location = useLocation();
  const showNavBar = !location.pathname.match(/^\/flight\/[^\/]+\/[^\/]+\/payment$/);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="container mt-3">
      {showNavBar && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
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
  );
};

export default App;
