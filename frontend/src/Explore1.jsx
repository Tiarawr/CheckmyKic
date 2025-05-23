import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

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

  // Membatasi hanya menampilkan maksimal 4 sepatu
  const displayedShoes = shoes.slice(0, 4);

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Tombol untuk eksplorasi */}
      <Link to="/explore">
        <button className="w-72 h-16 left-[143px] top-[630px] absolute bg-[#B56868] rounded-[40px] flex justify-center items-center">
          <div className="w-50 h-6 text-center text-white text-lg font-bold font-open uppercase tracking-[2.70px] cursor-pointer">
            ExploRe more
          </div>
        </button>
      </Link>

      {/* Icon Arrow */}
      <div
        data-svg-wrapper
        data-icon-name="Arrow Right"
        data-size="55px"
        data-style="False"
        className="left-[375px] top-[645px] absolute"
      >
        <svg
          width="31"
          height="35"
          viewBox="0 0 31 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.3088 17.5V17.5C28.3049 17.6842 28.2745 17.8665 28.2187 18.0396C28.1889 18.1012 28.1545 18.1598 28.1158 18.2146C28.0821 18.2954 28.0434 18.3734 28 18.4479L20.2794 28.6563C19.9806 29.0522 19.518 29.2375 19.0661 29.1422C18.6141 29.0469 18.2413 28.6855 18.0881 28.1942C17.9349 27.703 18.0247 27.1564 18.3235 26.7604L24.2297 18.9584H3.86025C3.14959 18.9584 2.57349 18.3054 2.57349 17.5C2.57349 16.6946 3.14959 16.0417 3.86025 16.0417H24.2297L18.3235 8.23961C18.0247 7.84364 17.9349 7.29708 18.0881 6.8058C18.2413 6.31453 18.6141 5.95319 19.0661 5.85789C19.518 5.76259 19.9806 5.94781 20.2794 6.34377L28 16.5521C28.0434 16.6267 28.0821 16.7046 28.1158 16.7854C28.1545 16.8403 28.1889 16.8988 28.2187 16.9604C28.2745 17.1335 28.3049 17.3158 28.3088 17.5Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Display Sepatu */}
      <div className="flex flex-wrap justify-center gap-10 px-6 mt-50">
        {displayedShoes.map((shoe, index) => (
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
            <div className="ext-xl font-semibold text-black text-ellipsis overflow-hidden">
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

      {/* Title "Explore What WE Checked" */}
      <div className="w-[467px] h-32 left-[143px] top-[-3px] absolute justify-center">
        <span className="text-black text-5xl font-semibold font-['Poppins'] leading-[69.64px]">
          Explore
          <br />
        </span>
        <span className="text-[#46ADAC] text-5xl font-semibold font-['Poppins'] leading-[69.64px]">
          What WE Checked
        </span>
      </div>
      <div className="w-[619px] h-9 left-[144px] top-[127px] absolute justify-center text-gray-700 text-xl font-semibold font-['Open_Sans'] leading-7">
        Discover every legit check we've completed by visiting 'Explore'.
      </div>
    </div>
  );
}
