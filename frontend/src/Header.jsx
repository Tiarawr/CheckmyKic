import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(""); // state untuk menu aktif

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
    setActiveMenu(""); // reset menu aktif jika klik logo
  };

  const handleSmoothScroll = (id) => (e) => {
    e.preventDefault();
    setActiveMenu(id); // set menu aktif
    const el = document.getElementById(id);
    if (el) {
      const yOffset = id === "why" ? -80 : 0;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="w-full h-[90px] bg-[#B56868] flex items-center justify-between px-[60px] z-10 sticky top-0">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <img
          src="./vector-50.svg"
          alt="Logo Vector"
          className="w-[40px] h-[44px]"
        />
        <a href="/" onClick={handleLogoClick}>
          <span className="text-white text-[24px] font-semibold font-poppins">
            checkmykicks
          </span>
        </a>
      </div>

      {/* Right: Menu */}
      <nav className="flex gap-12">
        <a
          href="/explore"
          className={`text-white/75 text-[16px] uppercase tracking-[0.15em] font-open ${
            activeMenu === "explore" ? "font-black" : "font-semibold"
          }`}
          onClick={() => setActiveMenu("explore")}
        >
          Explore
        </a>

        <a
          href="#work"
          onClick={handleSmoothScroll("work")}
          className={`text-white/75 text-[16px] uppercase tracking-[0.15em] font-open cursor-pointer ${
            activeMenu === "work" ? "font-black" : "font-semibold"
          }`}
        >
          How we work
        </a>

        <a
          href="#why"
          onClick={handleSmoothScroll("why")}
          className={`text-white/75 text-[16px] uppercase tracking-[0.15em] font-open cursor-pointer ${
            activeMenu === "why" ? "font-black" : "font-semibold"
          }`}
        >
          Why choose us
        </a>

        <a
          href="#review"
          onClick={handleSmoothScroll("review")}
          className={`text-white/75 text-[16px] uppercase tracking-[0.15em] font-open cursor-pointer ${
            activeMenu === "review" ? "font-black" : "font-semibold"
          }`}
        >
          Review
        </a>
      </nav>
    </header>
  );
};

export default Header;