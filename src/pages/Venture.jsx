import { useState } from "react";
import CtaVenture from "../components/Ctaventure";
import JointVentureGrid from "../components/JointVentureGrid";
import VentureHero from "../components/VentureHero";
import CoVentureBrandListingForm from "./CoventureForm";

const Venture = () => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const handleFormSuccess = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return (
    <main id="venture">
      <VentureHero />

      {/* ✅ Add form with onSuccess callback */}
      <CoVentureBrandListingForm onSuccess={handleFormSuccess} />

      {/* ✅ Grid will refetch when key changes */}
      <JointVentureGrid key={refetchTrigger} />

      <CtaVenture />
    </main>
  );
};

export default Venture;
