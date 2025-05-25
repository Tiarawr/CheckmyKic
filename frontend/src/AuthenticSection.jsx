import AutoPlay from "./components/AutoPlay";

export default function AuthenticSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-[99px] py-8 sm:py-[32px] relative">
      {/* Title */}
      <h2 className="text-black text-[18px] sm:text-[20px] md:text-[24px] font-semibold font-open uppercase tracking-[0.15em] sm:tracking-[0.18em] md:tracking-[0.22em] mb-6 sm:mb-8 text-center sm:text-left">
        Authenticate Your Favorite Brands
      </h2>

      {/* Auto sliding brand cards */}
      <AutoPlay />
    </section>
  );
}
