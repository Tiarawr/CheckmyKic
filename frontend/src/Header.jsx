import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  // Logo click: scroll ke atas dengan smooth lalu navigate ke home
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  // Fungsi scroll smooth ke id tertentu, khusus "why" ada offset naik
  const handleSmoothScroll = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = id === "why" ? -80 : 0; // naikkan 80px jika "why"
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
          className="text-white/75 text-[16px] font-semibold uppercase tracking-[0.15em] font-open"
        >
          Explore
        </a>

        <a
          href="#work"
          onClick={handleSmoothScroll("work")}
          className="text-white/75 text-[16px] font-semibold uppercase tracking-[0.15em] font-open cursor-pointer"
        >
          How we work
        </a>

        <a
          href="#why"
          onClick={handleSmoothScroll("why")}
          className="text-white/75 text-[16px] font-semibold uppercase tracking-[0.15em] font-open cursor-pointer"
        >
          Why choose us
        </a>

        <a
          href="#review"
          onClick={handleSmoothScroll("review")}
          className="text-white/75 text-[16px] font-semibold uppercase tracking-[0.15em] font-open cursor-pointer"
        >
          Review
        </a>
      </nav>
    </header>
  );
};

export default Header;