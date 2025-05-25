import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Payment() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const { state } = useLocation();
  const { shoe_id } = state || {};

  const handlePay = async () => {
    if (!selected) {
      alert("Silakan pilih metode pembayaran.");
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

      console.log({ bank_code, name, expected_amount, shoe_id });

      try {
        const res = await fetch("/api/create-va", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bank_code, name, expected_amount, shoe_id }),
        });

        const vaData = await res.json();

        if (vaData.account_number && vaData.shoe_id) {
          navigate("/paynow", {
            state: {
              ...vaData,
              shoe_id: vaData.shoe_id,
            },
          });
        } else {
          alert("Gagal membuat Virtual Account.");
        }
      } catch (err) {
        console.error("Gagal:", err);
        alert("Terjadi kesalahan saat membuat Virtual Account.");
      }
    } else {
      alert("Metode pembayaran e-wallet belum dihubungkan.");
    }
  };

  const renderRadio = (label, imgSrc, type) => (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => setSelected(label)}
    >
      <div className="flex items-center gap-4">
        <img src={imgSrc} alt={label} className="w-10 h-10 object-contain" />
        <div>
          <div className="text-black text-xl font-normal font-['Open_Sans'] leading-7">
            {label}
          </div>
          {type === "ewallet" && (
            <div className="text-black text-sm font-normal font-['Open_Sans'] leading-tight">
              activate this payment first
            </div>
          )}
        </div>
      </div>
      <div className="w-6 h-6 rounded-full border border-stone-300 flex justify-center items-center">
        {selected === label && (
          <div className="w-3 h-3 rounded-full bg-[#46ADAC]" />
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full h-[895px] relative bg-stone-50">
      <div className="w-80 h-5 left-[144px] top-[60px] absolute text-[#B56868] text-2xl font-semibold font-['Poppins'] leading-loose">
        SELECT PAYMENT METHOD
      </div>

      {/* Virtual Account Section */}
      <div className="w-[466px] absolute left-[800px] top-[140px] flex flex-col gap-4 z-10">
        <h2 className="text-black text-xl font-semibold font-['Open_Sans']">
          Virtual Account
        </h2>
        <div className="bg-white rounded-[20px] border border-stone-300 p-6 flex flex-col gap-6">
          {[
            { label: "BNI Virtual Account", img: "BNI 1.svg" },
            { label: "BRI Virtual Account", img: "bri.svg" },
            { label: "BCA Virtual Account", img: "BCA 1.svg" },
            { label: "BSI Virtual Account", img: "bsi.svg" },
            { label: "MANDIRI Virtual Account", img: "mandiri.svg" },
          ].map((bank) => (
            <div key={bank.label}>
              {renderRadio(bank.label, bank.img, "va")}
            </div>
          ))}
        </div>
      </div>

      {/* E-Wallet Section */}
      <div className="w-[468px] left-[240px] top-[141px] absolute flex flex-col gap-4">
        <div className="text-black text-xl font-semibold font-['Open_Sans']">
          E-wallet
        </div>
        <div className="w-full bg-white rounded-[20px] border border-stone-300 p-6 flex flex-col gap-6">
          {renderRadio("GoPay", "gopay 1.svg", "ewallet")}
          {renderRadio("DANA", "dana 3.svg", "ewallet")}
          {renderRadio("OVO", "ovo.svg", "ewallet")}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-[1054px] absolute left-[200px] top-[690px] flex justify-between items-center">
        <button
          onClick={() => navigate("/checknow")}
          className="w-72 h-16 px-14 py-4 bg-[#B56868] rounded-[40px] flex justify-center items-center gap-2.5 cursor-pointer"
        >
          <span className="text-white text-2xl font-bold font-['Open_Sans'] uppercase tracking-[3.60px]">
            BACK
          </span>
        </button>

        <button
          onClick={handlePay}
          className="w-72 h-16 px-14 py-4 bg-[#46ADAC] rounded-[40px] flex justify-center items-center gap-2.5 cursor-pointer"
        >
          <span className="text-white text-2xl font-bold font-['Open_Sans'] uppercase tracking-[3.60px]">
            Pay NOW
          </span>
        </button>
      </div>
    </div>
  );
}
