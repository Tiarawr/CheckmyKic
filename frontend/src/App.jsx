import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import AuthenticSection from "./AuthenticSection";
import CheckMyKicks from "./CheckMyKicks";
import WhyChooseUs from "./WhyChooseUs";
import { Explore1 } from "./Explore1";
import { Review } from "./Review";
import { Footer } from "./Footer";
import Explore from "./Explore";
import CheckNow from "./CheckNow";
import Payment from "./Payments";
import QRDisplay from "./QRDisplay";


function App() {
  const location = useLocation();

  return (
    <>
      {/* Show Header on all routes except /payment */}
      {location.pathname !== "/payment" && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <AuthenticSection />
              <CheckMyKicks />
              <WhyChooseUs />
              <Explore1 />
              <Review />
              <Footer />
            </>
          }
        />
        <Route
          path="/explore"
          element={
            <>
              <Explore />
              <Footer />
            </>
          }
        />
        <Route path="/checknow" element={<CheckNow />} />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/qris-display"
          element={<QRDisplay shoeId={64} amount={50000} />}
        />
      </Routes>
    </>
  );
}

export default App;
