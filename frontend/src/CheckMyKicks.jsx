import React from "react";
import { motion } from "framer-motion";

const CheckMyKicks = () => {
  const steps = [
    {
      number: "1",
      title: "Upload Photo",
      description:
        "Take clear, high-quality images of your item following our guidelines front view, materials, tags, and other key details.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path
            d="M6.04812 30.1586L20.3511 16.697L27.0819 23.4278M6.04812 30.1586H22.8752C25.6632 30.1586 27.9233 27.8985 27.9233 25.1105V16.697M6.04812 30.1586C3.26012 30.1586 1 27.8985 1 25.1105V8.28343C1 5.49543 3.26012 3.23531 6.04812 3.23531H16.9857M26.2406 11.3601L26.2406 6.60072M26.2406 6.60072L26.2406 1.84131M26.2406 6.60072L21.4812 6.60072M26.2406 6.60072L31 6.60072M11.0962 10.8075C11.0962 12.2015 9.96618 13.3315 8.57218 13.3315C7.17818 13.3315 6.04812 12.2015 6.04812 10.8075C6.04812 9.41349 7.17818 8.28343 8.57218 8.28343C9.96618 8.28343 11.0962 9.41349 11.0962 10.8075Z"
            stroke="#41415A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      mockup: (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="M6.04812 30.1586L20.3511 16.697L27.0819 23.4278M6.04812 30.1586H22.8752C25.6632 30.1586 27.9233 27.8985 27.9233 25.1105V16.697M6.04812 30.1586C3.26012 30.1586 1 27.8985 1 25.1105V8.28343C1 5.49543 3.26012 3.23531 6.04812 3.23531H16.9857M26.2406 11.3601L26.2406 6.60072M26.2406 6.60072L26.2406 1.84131M26.2406 6.60072L21.4812 6.60072M26.2406 6.60072L31 6.60072M11.0962 10.8075C11.0962 12.2015 9.96618 13.3315 8.57218 13.3315C7.17818 13.3315 6.04812 12.2015 6.04812 10.8075C6.04812 9.41349 7.17818 8.28343 8.57218 8.28343C9.96618 8.28343 11.0962 9.41349 11.0962 10.8075Z"
                stroke="#41415A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="w-full bg-[#46ADAC] text-white py-2 px-4 rounded-lg font-semibold text-center">
            Upload Photo
          </div>
        </div>
      ),
    },
    {
      number: "2",
      title: "Payment",
      description:
        "Select the service you want and complete the payment to immediately start the authentication process.",
      icon: null,
      mockup: (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="space-y-3 mb-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="flex gap-3">
              <div className="h-4 bg-gray-300 rounded flex-1"></div>
              <div className="h-4 bg-gray-300 rounded flex-1"></div>
            </div>
          </div>
          <div className="w-24 bg-[#46ADAC] text-white py-2 px-4 rounded-lg font-semibold mx-auto text-center">
            Pay
          </div>
        </div>
      ),
    },
    {
      number: "3",
      title: "Expert Check",
      description:
        "Our team of experienced authenticators will carefully review your submission using a multi-step process enhanced with Professional support.",
      icon: (
        <svg
          width="23"
          height="28"
          viewBox="0 0 23 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-7"
        >
          <g clipPath="url(#clip0_210_146)">
            <path
              d="M19 7C19 8.85652 18.2625 10.637 16.9497 11.9497C15.637 13.2625 13.8565 14 12 14C10.1435 14 8.36301 13.2625 7.05025 11.9497C5.7375 10.637 5 8.85652 5 7V1H19V7Z"
              stroke="#41415A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 21C19 19.1435 18.2625 17.363 16.9497 16.0503C15.637 14.7375 13.8565 14 12 14C10.1435 14 8.36301 14.7375 7.05025 16.0503C5.7375 17.363 5 19.1435 5 21V27H19V21Z"
              stroke="#41415A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1H23"
              stroke="#41415A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 27H23"
              stroke="#41415A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_210_146">
              <rect width="23" height="28" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      mockup: (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 flex justify-center">
            <svg
              width="23"
              height="28"
              viewBox="0 0 23 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-7"
            >
              <g clipPath="url(#clip0_210_146)">
                <path
                  d="M19 7C19 8.85652 18.2625 10.637 16.9497 11.9497C15.637 13.2625 13.8565 14 12 14C10.1435 14 8.36301 13.2625 7.05025 11.9497C5.7375 10.637 5 8.85652 5 7V1H19V7Z"
                  stroke="#41415A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 21C19 19.1435 18.2625 17.363 16.9497 16.0503C15.637 14.7375 13.8565 14 12 14C10.1435 14 8.36301 14.7375 7.05025 16.0503C5.7375 17.363 5 19.1435 5 21V27H19V21Z"
                  stroke="#41415A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1H23"
                  stroke="#41415A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 27H23"
                  stroke="#41415A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_210_146">
                  <rect width="23" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="bg-[#46ADAC] text-white py-3 text-center font-medium">
            Waiting for results
          </div>
        </div>
      ),
    },
    {
      number: "4",
      title: "Receive Results",
      description:
        "Receive an accurate and easy-to-understand verdict: Genuine or Replica, along with an official digital certificate.",
      icon: null,
      mockup: (
        <div className="bg-white rounded-2xl p-6 shadow-lg flex gap-4">
          <div className="bg-white border border-gray-200 p-3 rounded flex-shrink-0 w-20">
            <div className="text-center text-[4px] font-semibold text-black mb-2">
              CERTIFICATE OF AUTHENTICITY
            </div>
            <div className="space-y-1">
              <div className="text-[2px] font-semibold text-gray-700">
                ITEM NAME
              </div>
              <div className="h-1 bg-gray-200 rounded"></div>
              <div className="text-[2px] font-semibold text-gray-700">
                Certificate owner
              </div>
              <div className="h-1 bg-gray-200 rounded"></div>
              <div className="text-[2px] font-semibold text-gray-700">
                Verdict
              </div>
              <div className="bg-[#5CC98D] text-white text-[2px] font-bold p-0.5 rounded text-center">
                AUTHENTIC
              </div>
              <div className="text-[2px] font-semibold text-gray-700">
                Details
              </div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="bg-[#46ADAC] text-white p-4 rounded-lg flex-1 text-center">
            <div className="text-sm font-semibold">
              Receive your Certificate of authenticity in Gmail
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="w-full min-h-screen bg-[#B56868] py-8 px-4 md:py-16 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center md:text-left mb-12 md:mb-16">
            <h1 className="text-white text-3xl md:text-6xl font-semibold font-['Poppins'] leading-tight">
              How CheckMyKicks
              <br />
              Works?
            </h1>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Continuous vertical line */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-0 w-px bg-white transform -translate-x-1/2"></div>

            <div className="space-y-12 md:space-y-16">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12 relative"
                >
                  {/* Left side - Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-6">
                      {/* Step number */}
                      <div className="flex-shrink-0 w-14 h-16 flex items-center justify-center">
                        <span className="text-white text-6xl md:text-7xl font-bold font-['Open_Sans']">
                          {step.number}
                        </span>
                      </div>

                      {/* Step content */}
                      <div className="flex-1">
                        <h3 className="text-white text-2xl md:text-4xl font-semibold font-['Poppins'] mb-4">
                          {step.title}
                        </h3>
                        <p className="text-white text-lg md:text-xl font-normal font-['Open_Sans'] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connection dot */}
                  <div className="hidden lg:flex flex-col items-center flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 bg-white rounded-full flex-shrink-0"></div>
                  </div>

                  {/* Right side - Mockup */}
                  <div className="flex-1 flex justify-end lg:justify-end">
                    <div className="w-full max-w-sm">{step.mockup}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckMyKicks;
