import { Link } from "react-router-dom";
import React from "react";

export function Explore1() {
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
  ];

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 md:px-16 lg:px-24 relative">
      {/* Title */}
      <div className="mb-10">
        <h2 className="text-black text-4xl sm:text-5xl font-semibold font-poppins leading-tight">
          Explore
        </h2>
        <h2 className="text-[#46ADAC] text-4xl sm:text-5xl font-semibold font-poppins leading-tight">
          What WE Checked
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl font-semibold font-open mt-2">
          Discover every legit check we've completed by visiting 'Explore'.
        </p>
      </div>

      {/* Shoes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {shoes.map((shoe, index) => (
          <div
            key={index}
            className="bg-white rounded-[20px] border border-zinc-300 flex flex-col items-start gap-4 p-4 shadow-sm"
          >
            <img
              src={shoe.image}
              alt={shoe.name}
              className="w-full h-[250px] object-cover rounded-md"
            />
            <div className="text-xl font-semibold text-black truncate">
              {shoe.name}
            </div>
            <div className="flex justify-end w-full mt-auto">
              <div
                className={`px-4 py-1 rounded-[20px] text-white text-sm font-bold font-open tracking-wide ${
                  shoe.status === "PASS" ? "bg-[#5CC98D]" : "bg-[#E06262]"
                }`}
              >
                {shoe.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Button */}
      <div className="flex justify-start mt-12">
        <Link to="/explore">
          <button className="bg-[#B56868] text-white uppercase tracking-[2px] font-bold font-open rounded-full px-10 py-4 flex items-center gap-2">
            ExploRe more
            <img
              src="/icons/arrow-right.svg"
              alt="Arrow Right"
              className="w-5 h-5"
            />
          </button>
        </Link>
      </div>
    </section>
  );
}
