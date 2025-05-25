import { useLocation, useNavigate } from "react-router-dom";

export default function Paynow() {
  const { state } = useLocation();

  const {
    account_number = "123456789101112",
    expected_amount = 50000,
    bank_code = "BNI",
    shoe_id = null,
  } = state || {};

  const bankLogos = {
    BNI: "BNI 1.svg",
    BRI: "bri.svg",
    BCA: "BCA 1.svg",
    BSI: "bsi.svg",
    MANDIRI: "mandiri.svg",
  };
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center py-16">
      <div className="text-[#B56868] text-2xl font-semibold font-poppins uppercase mb-8">
        waiting for payment
      </div>

      {/* Payment Details Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-stone-300 p-8 mb-8 w-[420px]">
        <div className="text-center text-black text-xl font-semibold font-open mb-4">
          payment details
        </div>
        <div className="flex items-center gap-2 mb-4">
          <img
            src={bankLogos[bank_code] || "https://placehold.co/60x20"}
            alt={bank_code}
            className="w-14 h-5"
          />
          <span className="text-black text-lg font-poppins">{bank_code}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600">Nomor Virtual Account</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-xl tracking-wider">{account_number}</span>
            <button
              onClick={() => navigator.clipboard.writeText(account_number)}
              className="p-1 hover:bg-gray-100 rounded cursor-pointer"
              title="Salin Nomor VA"
              type="button"
            >
              <img src="salin.svg" alt="Salin" className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div>
          <span className="text-gray-600">total bill</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-lg">
              Rp{expected_amount.toLocaleString("id-ID")}
            </span>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  "Rp" + expected_amount.toLocaleString("id-ID")
                )
              }
              className="p-1 hover:bg-gray-100 rounded cursor-pointer"
              title="Salin Total Bill"
              type="button"
            >
              <img src="salin.svg" alt="Salin" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="w-[600px] bg-white rounded-xl border border-stone-300 p-8 mb-8">
        <div className="text-[#B56868] font-semibold mb-4 text-2xl font-poppins">
          Payment Instructions
        </div>
        <div className="mb-4">
          <div className="font-bold mb-1">{bank_code} ATM</div>
          <ol className="list-decimal ml-5 text-sm text-gray-700">
            <li>Insert your card.</li>
            <li>Select your preferred language.</li>
            <li>Enter your ATM PIN.</li>
            <li>Then, select "Other Menu."</li>
            <li>
              Choose "Transfer" and select the type of account you will use (e.g., 'From Savings Account').
            </li>
            <li>
              Select "Virtual Account Billing." Enter your Virtual Account number (e.g., {account_number}).
            </li>
            <li>The bill to be paid will appear on the confirmation screen.</li>
            <li>Confirm the transaction if the details are correct.</li>
            <li>Your transaction is complete.</li>
          </ol>
        </div>
        <div>
          <div className="font-bold mb-1">{bank_code} Mobile Banking</div>
          <ol className="list-decimal ml-5 text-sm text-gray-700">
            <li>Access {bank_code} Mobile Banking via your phone.</li>
            <li>Enter your User ID and password.</li>
            <li>Select the "Transfer" menu.</li>
            <li>Choose "Virtual Account Billing," then select your debit account.</li>
            <li>
              Enter your Virtual Account number (e.g., {account_number}) in the "New Input" menu.
            </li>
            <li>The bill to be paid will appear on the confirmation screen.</li>
            <li>Confirm the transaction and enter your Transaction Password.</li>
            <li>Your payment has been successfully completed.</li>
          </ol>
        </div>
      </div>

      <button
        onClick={() => navigate("/payment-status", { state: { shoe_id } })}
        className="bg-[#46ADAC] text-white px-12 py-4 rounded-full text-2xl font-bold font-open uppercase tracking-[3.60px] cursor-pointer"
      >
        VIEW PAYMENT STATUS
      </button>
    </div>
  );
}