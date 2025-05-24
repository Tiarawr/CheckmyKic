import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

export default function QRDisplay() {
  const location = useLocation();
  const { qrString, externalId } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 jam

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format detik ke HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  if (!qrString) {
    return (
      <div className="text-center mt-20 text-red-500">QRIS tidak tersedia</div>
    );
  }

  return (
    <div className="w-[1440px] h-[895px] relative bg-stone-50">
      <div className="w-96 left-[541px] top-[101px] absolute inline-flex flex-col justify-start items-center gap-20">
        <div className="self-stretch flex flex-col justify-start items-start gap-12">
          {/* Countdown */}
          <div className="w-80 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch h-8 text-center justify-center text-stone-500 text-4xl font-bold font-['Poppins'] uppercase tracking-[5.40px]">
              Pay before
            </div>
            <div className="self-stretch text-center justify-center text-black text-2xl font-bold font-['Open_Sans'] uppercase tracking-[3.60px]">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* QR Code */}
          <div className="self-stretch h-96 bg-white rounded-xl p-6 flex justify-center items-center">
            <QRCode value={qrString} size={256} />
          </div>
        </div>

        {/* Download button (placeholder) */}
        <div className="w-72 h-20 px-16 py-6 bg-stone-500 rounded-[40px] inline-flex justify-center items-center gap-2.5">
          <div className="text-center justify-center text-white text-2xl font-bold font-['Open_Sans'] uppercase tracking-[3.60px]">
            DOWNLOAD
          </div>
        </div>
      </div>
    </div>
  );
}
