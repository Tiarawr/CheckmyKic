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
import AdminDashboard from "./AdminDashboard";
import Login from "./login";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  // List route tanpa header
  const noHeaderRoutes = [
    "/payment",
    "/paynow",
    "/payment-status",
    "/admin",
    "/login-admin",
  ];
  const hideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="home">
                <Home />
              </section>
              <section id="checkmykicks">
                <CheckMyKicks />
              </section>
              <section id="why">
                <WhyChooseUs />
              </section>
              <section id="explore">
                <Explore1 />
              </section>
              <section id="review">
                <Review />
              </section>
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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login-admin" element={<Login />} />
      </Routes>
    </>
  );
}
export default App;
