import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  { src: "adidas-seeklogo.png", w: 126, h: 98 },
  { src: "b-65-bd-30-e-8530004-ba-3-a-081.svg", w: 135.46, h: 85 },
  { src: "nike-4-logo-black-and-white.svg", w: 181, h: 147 },
  { src: "puma-se-seeklogo.svg", w: 155, h: 93 },
  { src: "reebok-logo-icon-2486691.png", w: 160.61, h: 132 },
];

export default function AutoPlay() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings}>
      {brands.map((brand, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="w-[200px] h-[200px] flex items-center justify-center"
        >
          <div className="w-full h-full rounded-[16px] outline-1 outline-[#27252559] overflow-hidden flex items-center justify-center">
            <img
              src={brand.src}
              alt={`brand-${i}`}
              style={{ width: brand.w, height: brand.h }}
            />
          </div>
        </motion.div>
      ))}
    </Slider>
  );
}
