import AnimatedContent from "./components/AnimatedContent";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[rgba(244,236,236,0.13)] to-[#9D8A8A] via-transparent overflow-hidden pt-[80px] md:pt-[100px]">
      {/* Welcome Text */}
      <div className="w-full flex justify-center px-4">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          config={{ tension: 80, friction: 20 }}
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={100}
        >
          <h1 className="text-[32px] sm:text-[40px] md:text-[50px] font-semibold capitalize font-['Poppins'] text-black text-center leading-tight">
            Welcome to{" "}
            <span className="text-[#B56868] font-bold">checkmykicks</span>
          </h1>
        </AnimatedContent>
      </div>

      {/* Hero Image */}
      <div className="flex justify-center mt-6 px-4">
        <AnimatedContent
          distance={100}
          direction="vertical"
          config={{ tension: 80, friction: 20 }}
          initialOpacity={0}
          animateOpacity
          scale={1.05}
          threshold={0.1}
          delay={300}
        >
          <img
            src="/sepatu.png"
            alt="hero"
            className="w-full max-w-[950px] h-auto object-contain"
          />
        </AnimatedContent>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-6 px-4">
        <button
          onClick={() => navigate("/checknow")}
          className="w-full max-w-[201px] h-[60px] bg-[#B56868] text-white font-['Open_Sans'] font-bold text-[16px] sm:text-[18px] uppercase tracking-[0.17em] rounded-full flex items-center justify-center cursor-pointer shadow-md transition duration-200 ease-in-out hover:shadow-lg hover:bg-[#a15454] active:scale-95"
        >
          Check Now
        </button>
      </div>
    </div>
  );
}
