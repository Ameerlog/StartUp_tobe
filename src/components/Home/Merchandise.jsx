
import Marquee from "react-fast-marquee";
import { ArrowRight } from "lucide-react";
import { merchandiseData } from "../../data/merchandise";
import { useNavigate } from "react-router-dom";
export default function Merchandise() {
  // const [activeCategory, setActiveCategory] = useState("all");
const navigate = useNavigate();
  // const filteredProducts =
  //   activeCategory === "all"
  //     ? merchandiseData
  //     : merchandiseData.filter((item) => item.category === activeCategory);

  return (
    <section className="w-full bg-black py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
   
      <div className="text-center px-4 flex flex-col items-center gap-4 mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
          Merchandise
        </h2>

        <button
          className="
            group
            flex items-center gap-2
            rounded-full
            border border-white
            bg-white/10
            px-5 sm:px-6 md:px-8
            py-2.5 sm:py-3
            text-xs sm:text-sm
            font-bold text-white
            backdrop-blur-xl
            transition-all duration-300
            hover:border-red-400
            hover:text-red-400
            hover:bg-white/20
            active:scale-[0.98]
            mt-4
          "
        >
          Print Your Brand
        </button>
      </div>

      {/* <div className="px-4 mb-8 sm:mb-10">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  rounded-full
                  px-4 sm:px-6 md:px-8
                  py-2 sm:py-2.5
                  text-xs sm:text-sm
                  font-bold
                  transition-all duration-300
                  active:scale-[0.98]
                  ${
                    isActive
                      ? "bg-red-600 text-white border border-red-500 shadow-lg shadow-red-500/25"
                      : "bg-white/5 text-gray-300 border border-white/20 hover:border-white/40 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div> */}


      <div className="relative">
  
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-black to-transparent" />


        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-black to-transparent" />

        <Marquee

          speed={30}
          gradient={false}
          pauseOnHover
          pauseOnClick
        >
          {merchandiseData.map((item) => (
            <div
              key={item.id}
              className="shrink-0 w-56 sm:w-64 md:w-72 px-2 sm:px-3 md:px-4"
            >
          
              <div
                className="
                  rounded-xl sm:rounded-2xl 
                  border border-white/20 
                  bg-gray-900/60 
                  p-4 sm:p-5 
                  flex flex-col
                  backdrop-blur-sm
                  hover:border-red-400/50
                  hover:shadow-lg
                  hover:shadow-red-500/10
                  transition-all duration-300
                  group
                "
              >
             
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-white">
                    {item.price}
                  </span>
                </div>

                {/* Product Image */}
                <div className="relative h-40 sm:h-48 md:h-52 rounded-lg overflow-hidden mb-4 bg-gray-800">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-white"
                    loading="lazy"
                  />
                </div>

                {/* Product Name */}
                <h3 className="text-sm sm:text-base font-bold text-white mb-4 text-center">
                  {item.name}
                </h3>

                {/* Print Your Brand Button */}
                <button
                  className="
                    w-full 
                    rounded-full 
                    bg-gradient-to-r from-red-600 to-red-500
                    hover:from-red-500 hover:to-red-400
                    px-4 
                    py-2.5 sm:py-3 
                    text-xs sm:text-sm 
                    font-bold text-white 
                    shadow-lg hover:shadow-red-500/25
                    active:scale-[0.98]
                    transition-all duration-200
                  "
                >
                  Print Your Brand
                </button>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center px-4">
        <button
        onClick={()=> navigate("/branding")}
          className="
            group 
            flex items-center gap-2
            rounded-full
            border border-white/30
            bg-white/10
            px-5 sm:px-6 md:px-8 
            py-2.5 sm:py-3
            text-xs sm:text-sm 
            font-semibold text-white
            backdrop-blur-xl
            transition-all duration-300
            hover:border-red-400
            hover:text-red-400
            hover:bg-white/20
            active:scale-[0.98]
          "
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}