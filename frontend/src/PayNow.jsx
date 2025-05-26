import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Paynow() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!state) {
    navigate("/checknow");
    return null;
  }

  const bankLogos = {
    BRI: "/bri.svg",
    BCA: "/BCA 1.svg",
    BNI: "/BNI 1.svg",
    BSI: "/bsi.svg",
    MANDIRI: "/mandiri.svg",
  };

  const { account_number, expected_amount, bank_code, shoe_id } = state;

  useEffect(() => {
    fetch(`http://localhost:3000/api/payment-status/${shoe_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "paid") {
          setIsPaid(true);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch payment status:", err);
      });
  }, [shoe_id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleViewStatus = () => {
    navigate("/payment-status", {
      state: { shoe_id: shoe_id },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="pt-8 md:pt-16 pb-6 md:pb-8 text-start">
            <h1
              className={`text-2xl font-semibold uppercase font-poppins leading-loose tracking-wide ${
                isPaid ? "text-green-600" : "text-[#B56868]"
              }`}
            >
              {isPaid ? "Payment Successful" : "Waiting for Payment"}
            </h1>
          </div>

          {/* Payment Details Card */}
          <div className="mb-6 md:mb-8">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto">
              <h2 className="text-center text-black text-xl font-semibold font-poppins uppercase leading-loose tracking-wide mb-8">
                payment details
              </h2>

              <div className="space-y-6 md:space-y-8">
                {/* Bank Logo Row */}
                <div className="flex items-center gap-3">
                  <img
                    src={bankLogos[bank_code]}
                    alt={bank_code}
                    className="w-14 h-14 object-contain"
                  />
                </div>

                {/* Virtual Account Row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                  <div className="text-black text-xl font-normal font-poppins leading-7">
                    Nomor Virtual Account
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900 text-lg md:text-xl font-bold font-mono tracking-wider">
                      {account_number}
                    </span>
                    <button
                      onClick={() => copyToClipboard(account_number)}
                      className="p-2 hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0"
                      title="Copy Virtual Account"
                    >
                      <img src="/salin.svg" alt="Copy" className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Total Bill Row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                  <div className="text-black text-xl font-normal font-poppins leading-7">
                    total bill
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900 text-xl md:text-2xl font-bold">
                      Rp{expected_amount.toLocaleString("id-ID")}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `Rp${expected_amount.toLocaleString("id-ID")}`
                        )
                      }
                      className="p-2 hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0"
                      title="Copy Total Amount"
                    >
                      <img src="/salin.svg" alt="Copy" className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Copy Notification */}
                {copied && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm text-center rounded-xl border border-green-200">
                    Copied to clipboard!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="flex flex-col pb-6 md:pb-8">
            <div className="w-full">
              <h2 className="text-[#B56868] text-base md:text-xl font-semibold mb-4 md:mb-6">
                Payment Instructions
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-8">
                {/* ATM */}
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-4">
                    {bank_code} ATM
                  </h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>Insert card & select language</li>
                    <li>Enter PIN</li>
                    <li>Menu &gt; Other &gt; Transfer</li>
                    <li>Select account type</li>
                    <li>Virtual Account Billing</li>
                    <li>
                      Enter VA number:{" "}
                      <code className="font-mono bg-gray-100 px-1 rounded">
                        {account_number}
                      </code>
                    </li>
                    <li>Confirm details</li>
                    <li>Complete transaction</li>
                  </ol>
                </div>
                {/* Mobile Banking */}
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-4">
                    {bank_code} Mobile Banking
                  </h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>Open mobile app & login</li>
                    <li>Transfer Virtual Account Billing</li>
                    <li>
                      Enter VA number:{" "}
                      <code className="font-mono bg-gray-100 px-1 rounded">
                        {account_number}
                      </code>
                    </li>
                    <li>Review & confirm</li>
                    <li>Complete payment</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* View Status Button */}
            <div className="sticky bottom-0 bg-white p-4">
              <button
                onClick={handleViewStatus}
                className="w-full h-16 bg-[#46ADAC] text-white font-semibold rounded-full"
              >
                VIEW PAYMENT STATUS
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
