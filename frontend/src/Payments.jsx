import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

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

  const handlePay = async () => {
    if (selected === "QRIS") {
      try {
        const shoeRes = await fetch("/api/latest-shoe");
        if (!shoeRes.ok) {
          throw new Error("Gagal mengambil data sepatu");
        }
        const { shoe_id } = await shoeRes.json();

        const qrisRes = await fetch("/api/create-qris", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shoe_id,
            amount: 50000,
          }),
        });

        if (!qrisRes.ok) {
          throw new Error("Gagal membuat QRIS");
        }

        const qrisData = await qrisRes.json();

        if (qrisData.qr_string) {
          navigate("/qris-display", {
            state: {
              qrString: qrisData.qr_string,
              externalId: qrisData.external_id,
            },
          });
        } else {
          alert("Gagal membuat QRIS");
        }
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat membuat QRIS");
      }
    } else {
      alert("Metode pembayaran belum didukung.");
    }
  };

  return (
    <div className="w-full h-[895px] relative bg-stone-50">
      <div className="w-80 h-5 left-[144px] top-[60px] absolute text-[#B56868] text-2xl font-semibold font-['Poppins'] leading-loose">
        SELECT PAYMENT METHOD
      </div>

      <div className="w-[466px] absolute left-[800px] top-[140px] flex flex-col gap-4 z-10">
        <h2 className="text-black text-xl font-semibold font-['Open_Sans']">
          Virtual Account
        </h2>
        <div className="bg-white rounded-[20px] border border-stone-300 p-6 flex flex-col gap-6">
          {["BNI", "BRI", "BCA", "BSI", "MANDIRI"].map((bank) => (
            <div key={bank}>
              {renderRadio(
                `${bank} Virtual Account`,
                `/images/${bank.toLowerCase()}.svg`, // sesuaikan nama file di public/images/
                "va"
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[468px] left-[240px] top-[141px] absolute flex flex-col gap-4">
        <div className="text-black text-xl font-semibold font-['Open_Sans']">
          E-wallet
        </div>
        <div className="w-full bg-white rounded-[20px] border border-stone-300 p-6 flex flex-col gap-6">
          {renderRadio("GoPay", "/images/gopay.svg", "ewallet")}
          {renderRadio("DANA", "/images/dana.svg", "ewallet")}
          {renderRadio("OVO", "/images/ovo.svg", "ewallet")}
        </div>
      </div>

      <div className="w-[467px] left-[241px] top-[490px] absolute flex flex-col gap-3">
        <div className="text-black text-xl font-semibold font-['Open_Sans']">
          QRIS
        </div>
        <div
          className="bg-white rounded-[20px] border border-stone-300 p-5 flex justify-between items-center cursor-pointer"
          onClick={() => setSelected("QRIS")}
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-8 bg-black" />
            <div className="text-black text-xl font-normal font-['Open_Sans'] leading-7">
              QRIS
            </div>
          </div>
          <div className="w-6 h-6 rounded-full border border-stone-300 flex justify-center items-center">
            {selected === "QRIS" && (
              <div className="w-3 h-3 rounded-full bg-[#46ADAC]" />
            )}
          </div>
        </div>
      </div>

      <div className="w-[1054px] absolute left-[200px] top-[690px] flex justify-between items-center">
        <button
          onClick={() => navigate("/checknow")}
          className="w-72 h-16 px-14 py-4 bg-[#B56868] rounded-[40px] flex justify-center items-center gap-2.5"
        >
          <span className="text-white text-2xl font-bold font-['Open_Sans'] uppercase tracking-[3.60px]">
            BACK
          </span>
        </button>

        <button
          onClick={handlePay}
          className="w-72 h-16 px-14 py-4 bg-[#46ADAC] rounded-[40px] flex justify-center items-center gap-2.5"
        >
          <span className="text-white text-2xl font-bold font-['Open_Sans'] uppercase tracking-[3.60px]">
            Pay NOW
          </span>
        </button>
      </div>
    </div>
  );
}
