import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const shoe_id = state?.shoe_id;

  const [selected, setSelected] = useState("");

  const Loader = () => {
    return (
      <div className="loader-wrapper">
        <svg viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20"></circle>
        </svg>
        <style jsx>{`
          .loader-wrapper svg {
            width: 3.25em;
            transform-origin: center;
            animation: rotate4 2s linear infinite;
          }
          .loader-wrapper circle {
            fill: none;
            stroke: hsl(214, 97%, 59%);
            stroke-width: 2;
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            stroke-linecap: round;
            animation: dash4 1.5s ease-in-out infinite;
          }
          @keyframes rotate4 {
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes dash4 {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 90, 200;
              stroke-dashoffset: -35px;
            }
            100% {
              stroke-dashoffset: -125px;
            }
          }
        `}</style>
      </div>
    );
  };
  const handlePay = async () => {
    if (!selected) {
      alert("Silakan pilih metode pembayaran.");
      return;
    }
    if (!shoe_id) {
      alert("Missing shoe_id—please start from the CheckNow page.");
      return;
    }

    if (selected.includes("Virtual Account")) {
      const bankCodeMap = {
        "BNI Virtual Account": "BNI",
        "BRI Virtual Account": "BRI",
        "BCA Virtual Account": "BCA",
        "BSI Virtual Account": "BSI",
        "MANDIRI Virtual Account": "MANDIRI",
      };

      const bank_code = bankCodeMap[selected];
      const name = "John Doe";
      const expected_amount = 50000;

      console.log("Sending request:", {
        bank_code,
        name,
        expected_amount,
        shoe_id,
      });

      try {
        const res = await fetch(
          "https://sincere-rebirth-am.up.railway.app/api/create-va",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bank_code,
              name,
              expected_amount,
              // ensure shoe_id is a number if your DB expects it:
              shoe_id: Number(shoe_id),
            }),
          }
        );

        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("API Error:", errorText);
          alert(
            `Server error (${res.status}): ${errorText || "Unknown error"}`
          );
          return;
        }

        const vaData = await res.json();
        console.log("VA Data received:", vaData);

        if (vaData.account_number && vaData.shoe_id) {
          navigate("/paynow", {
            state: {
              ...vaData,
              shoe_id: vaData.shoe_id,
            },
          });
        } else {
          console.error("Invalid VA data:", vaData);
          alert("Gagal membuat Virtual Account: Data tidak lengkap.");
        }
      } catch (err) {
        console.error("Network/Parse error:", err);
        alert(`Terjadi kesalahan: ${err.message}`);
      }
    } else {
      alert("Metode pembayaran e-wallet belum dihubungkan.");
    }
  };
  const renderRadio = (label, logoComponent, type) => (
    <div
      className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors"
      onClick={() => setSelected(label)}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 overflow-hidden p-1 ${
            type === "ewallet" ? "rounded-full" : "rounded"
          }`}
        >
          {logoComponent}
          {/* Fallback text if image fails to load */}
          <div className="hidden w-full h-full bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600">
              {label.split(" ")[0].substring(0, 3)}
            </span>
          </div>
        </div>
        <div>
          <div className="text-black text-base sm:text-xl font-normal font-['Open_Sans'] leading-tight sm:leading-7">
            {label}
          </div>
          {type === "ewallet" && (
            <div className="text-black text-xs sm:text-sm font-normal font-['Open_Sans'] leading-tight">
              activate this payment first
            </div>
          )}
        </div>
      </div>
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-stone-300 flex justify-center items-center flex-shrink-0">
        {selected === label && (
          <div className="w-2.5 h-2.5 sm:w-6 sm:h-6 rounded-full bg-[#46ADAC]" />
        )}
      </div>
    </div>
  );

  const GoPayLogo = () => (
    <img
      src="/gopay 1.svg"
      alt="GoPay"
      className="w-full h-full rounded-4xl object-contain"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
  );

  const DanaLogo = () => (
    <img
      src="/dana 3.svg"
      alt="DANA"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
  );

  const OvoLogo = () => (
    <img
      src="/ovo.svg"
      alt="OVO"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
  );

  const BniLogo = () => (
    <img
      src="/BNI 1.svg"
      alt="BNI"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
  );

  const BriLogo = () => (
    <img
      src="/bri.svg"
      alt="BRI"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
  );

  const BcaLogo = () => (
    <img
      src="/BCA 1.svg"
      alt="BCA"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
  );

  const BsiLogo = () => (
    <img
      src="/bsi.svg"
      alt="BSI"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
  );

  const MandiriLogo = () => (
    <img
      src="/mandiri.svg"
      alt="Mandiri"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="min-h-screen bg-stone-50 px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[#B56868] text-xl sm:text-2xl font-semibold font-['Poppins'] leading-loose">
            SELECT PAYMENT METHOD
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* E-Wallet Section - Mobile First */}
            <div className="w-full lg:w-1/2 lg:order-1">
              <h2 className="text-black text-lg sm:text-xl font-semibold font-['Open_Sans'] mb-4">
                E-wallet
              </h2>
              <div className="bg-white rounded-[20px] border border-stone-300 p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:gap-6">
                  {renderRadio("GoPay", <GoPayLogo />, "ewallet")}
                  <div className="border-t border-gray-100"></div>
                  {renderRadio("DANA", <DanaLogo />, "ewallet")}
                  <div className="border-t border-gray-100"></div>
                  {renderRadio("OVO", <OvoLogo />, "ewallet")}
                </div>
              </div>
            </div>

            {/* Virtual Account Section */}
            <div className="w-full lg:w-1/2 lg:order-2">
              <h2 className="text-black text-lg sm:text-xl font-semibold font-['Open_Sans'] mb-4">
                Virtual Account
              </h2>
              <div className="bg-white rounded-[20px] border border-stone-300 p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:gap-6">
                  {[
                    { label: "BNI Virtual Account", logo: <BniLogo /> },
                    { label: "BRI Virtual Account", logo: <BriLogo /> },
                    { label: "BCA Virtual Account", logo: <BcaLogo /> },
                    { label: "BSI Virtual Account", logo: <BsiLogo /> },
                    { label: "MANDIRI Virtual Account", logo: <MandiriLogo /> },
                  ].map((bank, index) => (
                    <div key={bank.label}>
                      {renderRadio(bank.label, bank.logo, "va")}
                      {index < 4 && (
                        <div className="border-t border-gray-100"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-between items-center mt-8 sm:mt-12">
            <button
              onClick={() => navigate("/checknow")}
              className="w-full sm:w-72 h-12 sm:h-16 px-8 sm:px-14 py-3 sm:py-4 bg-[#B56868] rounded-[40px] flex justify-center items-center order-2 sm:order-1 cursor-pointer
    shadow-md transition duration-200 ease-in-out
    hover:shadow-lg hover:bg-[#a15454] active:scale-95"
            >
              <span className="text-white text-lg sm:text-2xl font-bold font-['Open_Sans'] uppercase tracking-[2px] sm:tracking-[3.60px]">
                BACK
              </span>
            </button>

            <button
              onClick={handlePay}
              className="w-full sm:w-72 h-12 sm:h-16 px-8 sm:px-14 py-3 sm:py-4 bg-[#46ADAC] rounded-[40px] flex justify-center items-center order-1 sm:order-2 cursor-pointer
    shadow-md transition duration-200 ease-in-out
    hover:shadow-lg hover:bg-[#37928a] active:scale-95"
            >
              <span className="text-white text-lg sm:text-2xl font-bold font-['Open_Sans'] uppercase tracking-[2px] sm:tracking-[3.60px]">
                Pay NOW
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
