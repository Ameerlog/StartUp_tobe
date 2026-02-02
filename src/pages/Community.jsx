import Investors from "../components/Home/Investors";
import BackgroundImage from "../assets/domain/bg1.svg";

export default function Community() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden"
    style={{
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity:"0.8"
  }}>
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <Investors />
    </section>
  );
}
