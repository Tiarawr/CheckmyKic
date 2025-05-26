import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Update active menu based on current location
  useEffect(() => {
    if (location.pathname === "/explore") {
      setActiveMenu("explore");
    } else if (location.pathname === "/") {
      // Check which section is in view on homepage
      const sections = ["work", "why", "review"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveMenu(currentSection || "");
    } else {
      setActiveMenu("");
    }
  }, [location.pathname]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setActiveMenu("");
    setMenuOpen(false);
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    navigate("/explore");
    setActiveMenu("explore");
    setMenuOpen(false);
  };

  const handleSmoothScroll = (id) => (e) => {
    e.preventDefault();
    setActiveMenu(id);
    setMenuOpen(false);

    // Map menu items to their actual element IDs
    const elementIdMap = {
      work: "checkmykicks", // "How we work" maps to CheckMyKicks component
      why: "why", // "Why choose us" maps to element with id="why"
      review: "review", // "Review" maps to Review component
    };

    const targetId = elementIdMap[id] || id;

    // Debug: log what we're looking for
    console.log(`Looking for element with ID: ${targetId}`);

    // If not on homepage, navigate to homepage first then scroll
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const el = document.getElementById(targetId);
        console.log(`Found element:`, el);
        if (el) {
          const yOffset = getScrollOffset(targetId);
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
          console.warn(`Element with ID "${targetId}" not found!`);
          // Fallback: try to find by component name or class
          const fallbackEl =
            document.querySelector(`[data-component="${id}"]`) ||
            document.querySelector(`.${id}-section`) ||
            document.querySelector(`#${id}`);
          if (fallbackEl) {
            console.log(`Found fallback element:`, fallbackEl);
            const y =
              fallbackEl.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      }, 200); // Increased timeout
    } else {
      // Already on homepage, just scroll
      const el = document.getElementById(targetId);
      console.log(`Found element on current page:`, el);
      if (el) {
        const yOffset = getScrollOffset(targetId);
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        console.warn(`Element with ID "${targetId}" not found!`);
        const fallbackEl =
          document.querySelector(`[data-component="${id}"]`) ||
          document.querySelector(`.${id}-section`) ||
          document.querySelector(`#${id}`);
        if (fallbackEl) {
          console.log(`Found fallback element:`, fallbackEl);
          const y =
            fallbackEl.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
  };

  // Helper function to get scroll offset for different sections
  const getScrollOffset = (targetId) => {
    const offsets = {
      checkmykicks: -100, // CheckMyKicks component
      why: -80, // WhyChooseUs component
      review: -80, // Review component
    };
    return offsets[targetId] || 0;
  };

  const getMenuItemClass = (item) => {
    const isActive = activeMenu === item;
    const baseClass =
      "text-white/75 text-[16px] uppercase tracking-[0.15em] font-open transition-all duration-300 hover:text-white relative";
    const activeClass = isActive ? "font-black text-white" : "font-semibold";

    return `${baseClass} ${activeClass}`;
  };

  const renderMenuItem = (item, isMobile = false) => {
    const isExplore = item === "explore";
    const isActive = activeMenu === item;

    return (
      <a
        key={item}
        href={isExplore ? "/explore" : `#${item}`}
        onClick={isExplore ? handleExploreClick : handleSmoothScroll(item)}
        className={`${getMenuItemClass(item)} ${isMobile ? "py-2" : ""}`}
      >
        {item === "work"
          ? "How we work"
          : item === "why"
          ? "Why choose us"
          : item.charAt(0).toUpperCase() + item.slice(1)}

        {/* Active indicator - underline effect */}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left animate-pulse"></span>
        )}

        {/* Hover effect */}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 hover:w-full"></span>
      </a>
    );
  };

  return (
    <header className="w-full bg-[#B56868] z-50 sticky top-0 shadow-lg">
      <div className="h-[90px] flex items-center justify-between px-6 md:px-[60px]">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src="./vector-50.svg"
            alt="Logo Vector"
            className="w-[40px] h-[44px] transition-transform duration-300 hover:scale-110"
          />
          <a
            href="/"
            onClick={handleLogoClick}
            className="transition-all duration-300 hover:scale-105"
          >
            <span className="text-white text-[20px] md:text-[24px] font-semibold font-poppins">
              checkmykicks
            </span>
          </a>
        </div>

        {/* Burger icon on small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="transition-transform duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6 text-white transition-all duration-300"
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
          {["explore", "work", "why", "review"].map((item) =>
            renderMenuItem(item)
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-center gap-4 pb-4 md:hidden bg-[#B56868] border-t border-white/20">
          {["explore", "work", "why", "review"].map((item) =>
            renderMenuItem(item, true)
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
