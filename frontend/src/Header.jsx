import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
    setActiveMenu("");
    setMenuOpen(false);
  };

  const handleSmoothScroll = (id) => (e) => {
    e.preventDefault();
    setActiveMenu(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = id === "why" ? -80 : 0;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <header className="w-full bg-[#B56868] z-50 sticky top-0">
        <div className="h-[90px] flex items-center justify-between px-6 md:px-[60px]">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="./vector-50.svg"
              alt="Logo Vector"
              className="w-[40px] h-[44px]"
            />
            <a href="/" onClick={handleLogoClick}>
              <span className="text-white text-[20px] md:text-[24px] font-semibold font-poppins">
                checkmykicks
              </span>
            </a>
          </div>

          {/* Burger icon on small screens */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-12">
            {["explore", "work", "why", "review"].map((item) => (
              <a
                key={item}
                href={item === "explore" ? "/explore" : `#${item}`}
                onClick={
                  item === "explore"
                    ? () => setActiveMenu("explore")
                    : handleSmoothScroll(item)
                }
                className={`text-white/75 text-[16px] uppercase tracking-[0.15em] font-open ${
                  activeMenu === item ? "font-black" : "font-semibold"
                }`}
              >
                {item === "work"
                  ? "How we work"
                  : item === "why"
                  ? "Why choose us"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col items-center gap-4 pb-4 md:hidden">
            {["explore", "work", "why", "review"].map((item) => (
              <a
                key={item}
                href={item === "explore" ? "/explore" : `#${item}`}
                onClick={
                  item === "explore"
                    ? () => {
                        setActiveMenu("explore");
                        setMenuOpen(false);
                      }
                    : handleSmoothScroll(item)
                }
                className={`text-white text-[16px] uppercase tracking-[0.15em] font-open ${
                  activeMenu === item ? "font-black" : "font-semibold"
                }`}
              >
                {item === "work"
                  ? "How we work"
                  : item === "why"
                  ? "Why choose us"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        )}
      </header>
    </motion.div>
  );
};

export default Header;
