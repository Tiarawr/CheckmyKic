import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PaymentStatus() {
  const { state } = useLocation();
  const { shoe_id } = state || {};
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/payment-status/${shoe_id}`);
        const data = await res.json();
        if (data.status === "paid") {
          setStatus("paid");
        } else {
          setStatus("unpaid");
        }
      } catch (err) {
        console.error("Failed to fetch status:", err);
        setStatus("error");
      }
    };

    if (shoe_id) checkStatus();
  }, [shoe_id]);

  if (status === "paid") {
    return (
      <div className="w-full h-[904px] relative bg-gradient-to-b from-[#5CC98D] to-slate-300">
        <div className="w-[485px] h-10 left-[478px] top-[287px] absolute justify-center text-white text-5xl font-semibold font-['Poppins'] uppercase leading-[69.64px]">
          PAYMENT SUCCESS
        </div>
        <img
          className="size-56 left-[606px] top-[388px] absolute"
          src="icon PS 1.svg"
          alt="Success"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[904px] relative bg-gradient-to-b from-[#B56868] to-white">
      <div className="w-[552px] h-10 left-[444px] top-[251px] absolute justify-center text-white text-5xl font-semibold font-['Poppins'] uppercase leading-[69.64px]">
        WAITING FOR RESULTS
      </div>
      <div className="w-[704px] h-10 left-[368px] top-[612px] absolute text-center justify-center text-gray-700 text-xl font-semibold font-['Poppins'] uppercase leading-7">
        "We are currently verifying the authenticity of your sneakers. The
        complete results will be sent to your email shortly."
      </div>
      <img
        className="size-56 left-[605px] top-[342px] absolute"
        src="waiting-list 1.svg"
        alt="Waiting"
      />
    </div>
  );
}
