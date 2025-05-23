import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Header />

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
      </Routes>
    </>
  );
}

export default App;
