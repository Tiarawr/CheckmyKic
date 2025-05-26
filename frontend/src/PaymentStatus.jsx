import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PaymentStatus() {
  const { state } = useLocation();
  const { shoe_id } = state || {};
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await fetch(
          `https://9213-157-10-8-222.ngrok-free.app/api/payment-status/${shoe_id}`
        );
        const data = await res.json();
        setStatus(data.status);
      } catch (err) {
        console.error("Failed to fetch payment status:", err);
        setStatus("error");
      }
    };

    if (shoe_id) checkPaymentStatus();
  }, [shoe_id]);

  const paidUI = (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#5CC98D] to-slate-300 px-4">
      <h1 className="text-white text-3xl md:text-5xl font-semibold uppercase mb-6">
        Payment Success
      </h1>
      <img
        src="/icon PS 1.svg"
        alt="Success"
        className="w-32 h-32 md:w-56 md:h-56"
      />
    </div>
  );

  const waitingUI = (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#B56868] to-white px-4">
      <h1 className="text-white text-3xl md:text-5xl font-semibold uppercase mb-6">
        Waiting for Payment
      </h1>
      <img
        src="/waiting-list 1.svg"
        alt="Waiting"
        className="w-32 h-32 md:w-56 md:h-56 mb-4"
      />
      <p className="text-gray-700 text-lg md:text-xl font-semibold max-w-xl">
        "We are currently verifying the authenticity of your sneakers. The
        complete results will be sent to your email shortly."
      </p>
    </div>
  );

  const loadingUI = (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-200 to-white px-4">
      <p className="text-gray-500 text-xl">Loading status...</p>
    </div>
  );

  if (status === "paid") return paidUI;
  if (status === "unpaid" || status === "waiting") return waitingUI;
  return loadingUI;
}
