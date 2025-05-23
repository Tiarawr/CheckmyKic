import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Explore() {
  const shoes = [
    {
      name: "Air Jordan 4 Military Black",
      image: "https://placehold.co/225x250",
      status: "PASS",
    },
    {
      name: "Yeezy 350 v2 zebra",
      image: "https://placehold.co/225x250",
      status: "NOT PASS",
    },
    {
      name: "Adidas Gazelle",
      image: "https://placehold.co/225x250",
      status: "PASS",
    },
    {
      name: "New Balance 550",
      image: "https://placehold.co/225x250",
      status: "PASS",
    },
    {
      name: "Yeezy 350 v2 zebra",
      image: "https://placehold.co/225x250",
      status: "NOT PASS",
    },
    {
      name: "Adidas adizero prime x strung",
      image: "https://placehold.co/225x250",
      status: "NOT PASS",
    },
    {
      name: "New Balance 530",
      image: "https://placehold.co/225x250",
      status: "PASS",
    },
    {
      name: "Converse Chuck Taylor All Star High",
      image: "https://placehold.co/225x250",
      status: "PASS",
    },
    {
      name: "Nike shoes Air Jordan 1s dark green",
      image: "https://placehold.co/225x250",
      status: "PASS",
    },
    {
      name: "Adidas Samba",
      image: "https://placehold.co/225x250",
      status: "PASS",
    },
    {
      name: "Reebok Club C 85",
      image: "https://placehold.co/225x250",
      status: "NOT PASS",
    },
    {
      name: "Jordan 1 Low Travis Scott Reverse Mocha",
      image: "https://placehold.co/225x250",
      status: "PASS",
    },
    {
      name: "Asics Gel Kayano 14",
      image: "https://placehold.co/225x250",
      status: "PASS",
    },
  ];

  useEffect(() => {
    // Scroll to the top when the page is loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden">
      {/* Title */}
      <div className="w-[1000px] h-50 left-[265px] top-[60px] absolute justify-center">
        <span className="text-black text-7xl font-semibold font-['Poppins'] leading-[97.50px]">
          Explore{" "}
        </span>
        <span className="text-[#B56868] text-7xl font-semibold font-['Poppins'] leading-[97.50px]">
          What WE Checked
        </span>
      </div>
      <div className="w-[798px] h-9 left-[321px] top-[180px] absolute justify-center text-gray-700 text-xl font-semibold font-open leading-7">
        CheckMyKicks has handled countless sneaker legit checks with precision
        and care.
      </div>

      {/* Shoes Display */}
      <div className="flex flex-wrap justify-start gap-10 px-6 mt-70 max-w-[1200px] mx-auto">
        {shoes.map((shoe, index) => (
          <div
            key={index}
            className="w-64 h-96 bg-white rounded-[20px] border border-zinc-300 flex flex-col items-start gap-4 p-4"
          >
            {/* Shoe Image */}
            <img
              src={shoe.image}
              alt={shoe.name}
              className="w-[250px] h-[250px] object-cover"
            />

            {/* Shoe Name */}
            <div className="text-xl font-semibold text-black text-ellipsis overflow-hidden">
              {shoe.name}
            </div>

            {/* Shoe Status */}
            <div className="flex justify-end w-full mt-auto">
              <div
                className={`px-6 py-2 rounded-[20px] ${
                  shoe.status === "PASS" ? "bg-[#5CC98D]" : "bg-[#E06262]"
                }`}
              >
                <span className="text-[#FAFAFA] text-[20px] font-bold font-open tracking-[0.02em]">
                  {shoe.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
