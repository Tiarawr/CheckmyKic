import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import AuthenticSection from "./AuthenticSection";
import CheckMyKicks from "./CheckMyKicks";
import WhyChooseUs from "./WhyChooseUs";
import { Explore1 } from "./Explore1";
import Review from "./Review";
import Footer from "./Footer";
import Explore from "./Explore";
import CheckNow from "./CheckNow";
import Payment from "./Payments";
import Paynow from "./PayNow";
import PaymentStatus from "./PaymentStatus";

function App() {
  const location = useLocation();

  // List route tanpa header
  const noHeaderRoutes = ["/payment", "/paynow", "/payment-status"];
  const hideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}

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
        <Route path="/paynow" element={<Paynow />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
      </Routes>
    </>
  );
}
export default App;
