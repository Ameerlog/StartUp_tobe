import React, { Suspense, lazy, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrolltoTop from "./components/ScrolltoTop";
import Loader from "./components/Loaders";

// memoized versions of static layout components to avoid needless re-renders
const MemoNavbar = memo(Navbar);
const MemoFooter = memo(Footer);

// helper that adds a `.preload` method to a lazy component
function lazyWithPreload(factory) {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
}

// Lazy loaded pages (prefetchable via `.preload`)
const Home = lazyWithPreload(() => import("./components/Home"));
const SignIn = lazyWithPreload(() => import("./pages/SignIn"));
const Marketing = lazyWithPreload(() => import("./pages/Marketing"));
const Branding = lazyWithPreload(() => import("./pages/Branding"));
const Compliance = lazyWithPreload(() => import("./pages/Compliance"));
const Community = lazyWithPreload(() => import("./pages/Community"));
const Venture = lazyWithPreload(() => import("./pages/Venture"));
const AIRoboticsPage = lazyWithPreload(() => import("./pages/AiRobotics"));
const MarketPlace = lazyWithPreload(() => import("./pages/MarketPlace"));
const DomainDetailsLayout = lazyWithPreload(() => import("./pages/DetailsPage"));
const ReserveDomainPage = lazyWithPreload(() => import("./pages/ReserveDomain"));
const Success = lazyWithPreload(() => import("./pages/Success"));
const ReserveDomainForm = lazyWithPreload(() => import("./components/Form"));
const CoventureForm = lazyWithPreload(() => import("./pages/CoventureForm"));
const AboutUs = lazyWithPreload(() => import("./pages/AboutUs"));
const ContactUs = lazyWithPreload(() => import("./pages/ContactUs"));
const Cocreation = lazyWithPreload(() => import("./pages/Create"));
const DomainlistingForm = lazyWithPreload(() => import("./pages/DomainlistingForm"));
const CoworkingForm = lazyWithPreload(() => import("./pages/Coworker"));
const PrivacyPolicy = lazyWithPreload(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazyWithPreload(() => import("./pages/TermsAndConditions"));
const HowItWorks = lazyWithPreload(() => import("./pages/HowItWorks"));
const Careers = lazyWithPreload(() => import("./pages/Careers"));
const GetVentureForm = lazyWithPreload(() => import("./pages/GetVentureform"));
const Bethecobrother = lazyWithPreload(() => import("./pages/BeTheCobrother"));

// central route configuration kept outside the component so it isn't re-created on every render
const routesConfig = [
  { path: "/", element: <Home /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/bethecobrother", element: <Bethecobrother /> },
  { path: "/marketing", element: <Marketing /> },
  { path: "/branding", element: <Branding /> },
  { path: "/compliance", element: <Compliance /> },
  { path: "/ai", element: <AIRoboticsPage /> },
  { path: "/co-creation", element: <Cocreation /> },
  { path: "/venture", element: <Venture /> },
  { path: "/apply", element: <ReserveDomainForm /> },
  { path: "/marketplace", element: <MarketPlace /> },
  { path: "/marketplace/domain/:id", element: <DomainDetailsLayout /> },
  { path: "/marketplace/:slug/payment", element: <ReserveDomainPage /> },
  { path: "/marketplace/:slug/payment/success", element: <Success /> },
  { path: "/community", element: <Community /> },
  { path: "/aboutUs", element: <AboutUs /> },
  { path: "/contact", element: <ContactUs /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsAndConditions /> },
  { path: "/how-it-works", element: <HowItWorks /> },
  { path: "/careers", element: <Careers /> },
  { path: "/get-ventures", element: <GetVentureForm /> },
  { path: "/coventure-form", element: <CoventureForm /> },
  { path: "/domain-form", element: <DomainlistingForm /> },
  { path: "/coworker-form", element: <CoworkingForm /> },
];

const App = () => {
  // as soon as App mounts we can prefetch a couple of heavy routes
  // (homepage is fetched immediately anyway, but marketplace gets a head start)
  React.useEffect(() => {
    MarketPlace.preload?.();
    // add others that make sense, e.g. SignIn.preload?.();
  }, []);

  return (
    <BrowserRouter>
      <ScrolltoTop />

      <div className="min-h-screen flex flex-col bg-black">
        <MemoNavbar />

        <main className="flex-1">
          <Suspense fallback={<Loader />}>
            <Routes>
              {routesConfig.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </Suspense>
        </main>

        <MemoFooter />
      </div>
    </BrowserRouter>
  );
};

export default memo(App);