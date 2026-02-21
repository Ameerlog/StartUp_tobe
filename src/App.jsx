import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Marketing from "./pages/Marketing";
import Branding from "./pages/Branding";
import Compliance from "./pages/Compliance";
import Community from "./pages/Community";
import Venture from "./pages/Venture";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Funding from "./pages/Funding";
import MarketPlace from "./pages/MarketPlace";
import DomainDetailsLayout from "./pages/DetailsPage";
import ReserveDomainPage from "./pages/ReserveDomain";
import Success from "./pages/Success";
import ReserveDomainForm from "./components/Form";
import Navbar from "./components/Navbar";
import AIRoboticsPage from "./pages/AiRobotics";
import ScrolltoTop from "./components/ScrolltoTop";
import Investors from "../src/components/Home/Investors";
import CoventureForm from "../src/pages/CoventureForm";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Cocreation from "./pages/Create";
import DomainlistingForm from "./pages/DomainlistingForm";
import CoworkingForm from "./pages/Coworker";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import HowItWorks from "./pages/HowItWorks";
import Careers from "./pages/Careers";
import GetVentureForm from "./pages/GetVentureform";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";


const App = () => {
  return (
    <BrowserRouter>
      <ScrolltoTop />
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/branding" element={<Branding />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/ai" element={<AIRoboticsPage />} />
            <Route path="/co-creation" element={<Cocreation />} />
            <Route path="/venture" element={<Venture />} />
       
            <Route path="/apply" element={<ReserveDomainForm />} />
       
            <Route path="/marketplace" element={<MarketPlace />} />
             
            <Route
              path="/marketplace/domain/:id"
              element={<DomainDetailsLayout />}
            />
            <Route
              path="/marketplace/:slug/payment"
              element={<ReserveDomainPage />}
            />
            <Route
              path="/marketplace/:slug/payment/success"
              element={<Success />}
            />

            <Route path="/community" element={<Investors />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsAndConditions />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/careers" element={<Careers />} />
           

            <Route path="/get-ventures" element={<GetVentureForm />} />
            <Route path="/coventure-form" element={<CoventureForm />} />
            <Route path="/domain-form" element={<DomainlistingForm />} />
            <Route path="/coworker-form" element={<CoworkingForm />} />

          
           <Route path="/signin" element={<SignIn />} />
           <Route path="/signup" element={<SignUp/>}/>

          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;