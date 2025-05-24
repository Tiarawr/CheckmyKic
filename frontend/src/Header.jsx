import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/");
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
          className="text-white/75 text-[16px] font-semibold uppercase tracking-[0.15em] font-open"
        >
          Explore
        </a>

        <a
          href="#work"
          className="text-white/75 text-[16px] font-semibold uppercase tracking-[0.15em] font-open"
        >
          How we work
        </a>

        <a
          href="#why"
          className="text-white/75 text-[16px] font-semibold uppercase tracking-[0.15em] font-open"
        >
          Why choose us
        </a>

        <a
          href="/review"
          className="text-white/75 text-[16px] font-semibold uppercase tracking-[0.15em] font-open"
        >
          Review
        </a>
      </nav>
    </header>
  );
};

export default Header;
