

import Divider from "../components/Divider";
import ReserveDomainForm from "../components/Form";
import JointVentureGrid from "../components/JointVentureGrid";
import JVBenefitsSection from "../components/JVBenefits";
import JVProcess from "../components/JVProcess";
import VentureHero from "../components/VentureHero";


const Venture = () => {
  return (
    <main id="venture" className="bg-white text-zinc-900">
      <VentureHero />

     
      {/* <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600">
  You need naming clarity before buying a domain, designing a logo,
  filing a trademark, and going public with your startup.
</p> */}
<JointVentureGrid/>
<JVProcess/>

<Divider/>
<JVBenefitsSection/>
    </main>
  );
};

export default Venture;
