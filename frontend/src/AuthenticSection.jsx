import AutoPlay from "./components/AutoPlay";

export default function AuthenticSection() {
  return (
    <section className="w-full px-[99px] py-[32px] relative">
      {/* Title */}
      <h2 className="text-black text-[24px] font-semibold font-open uppercase tracking-[0.22em] mb-8">
        Authenticate Your Favorite Brands
      </h2>

      {/* Auto sliding brand cards */}
      <AutoPlay />
    </section>
  );
}
