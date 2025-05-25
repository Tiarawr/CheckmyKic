import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Paynow() {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) {
    // If someone lands here directly, redirect back
    navigate("/checknow");
    return null;
  }

  const { account_number, expected_amount, bank_code, shoe_id } = state;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleViewStatus = () => {
    navigate(`/payment-status/${shoe_id}`);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-8 md:pt-16 pb-6 md:pb-8 text-center">
          <h1 className="text-[#B56868] text-lg md:text-2xl lg:text-3xl font-semibold uppercase">
            Waiting for Payment
          </h1>
        </div>

        {/* Payment Details Card */}
        <div className="mb-6 md:mb-8">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto">
            <h2 className="text-center text-gray-800 text-base md:text-lg font-medium mb-6 md:mb-8 lowercase">
              payment details
            </h2>

            <div className="space-y-6 md:space-y-8">
              {/* Bank Logo Row */}
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">⚡</span>
                  </div>
                  <span className="text-orange-500 text-xl md:text-2xl font-bold">
                    {bank_code}
                  </span>
                </div>
              </div>

              {/* Virtual Account Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                <div className="text-gray-700 text-base md:text-lg font-medium">
                  Nomor Virtual Account
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-900 text-lg md:text-xl font-bold font-mono tracking-wider">
                    {account_number}
                  </span>
                  <button
                    onClick={() => copyToClipboard(account_number)}
                    className="p-2 text-[#46ADAC] hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0"
                    title="Copy Virtual Account"
                  >
                    {/* copy icon */}
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11.586l-3-3a1 1 0 00-1.414 1.414L11.586 11H15z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Total Bill Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                <div className="text-gray-700 text-base md:text-lg font-medium">
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
                    className="p-2 text-[#46ADAC] hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0"
                    title="Copy Total Amount"
                  >
                    {/* copy icon */}
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11.586l-3-3a1 1 0 00-1.414 1.414L11.586 11H15z" />
                    </svg>
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
  );
}