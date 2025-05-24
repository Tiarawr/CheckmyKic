import { useNavigate } from "react-router-dom";

export default function Pay() {
  const navigate = useNavigate();

  // Data dummy, bisa diganti sesuai kebutuhan
  const vaNumber = "123456789101112";
  const totalBill = "Rp50.000";

  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center py-16">
      <div className="text-[#B56868] text-xl font-semibold mb-8">
        WAITING FOR PAYMENT
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-8 w-[420px]">
        <div className="text-center text-gray-700 font-semibold mb-4">payment details</div>
        <div className="flex items-center gap-2 mb-2">
          <img src="BNI 1.svg" alt="BNI" className="w-6 h-6" />
          {/* tulisan BNI dihapus */}
        </div>
        <div className="mb-2">
          <span className="text-gray-600">Nomor Virtual Account</span>
          <div className="font-bold text-xl tracking-wider flex items-center gap-2">
            {vaNumber}
            <button
              onClick={() => navigator.clipboard.writeText(vaNumber)}
              className="text-[#46ADAC] text-base"
              title="Salin"
            >
              <img src="salin.svg" alt="Salin" className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div>
          <span className="text-gray-600">total bill</span>
          <div className="font-bold text-lg flex items-center gap-2">
            {totalBill}
            <button
              onClick={() => navigator.clipboard.writeText(totalBill)}
              className="text-[#46ADAC] text-base"
              title="Salin"
            >
              <img src="salin.svg" alt="Salin" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-[600px] bg-white rounded-xl border border-stone-300 p-8 mb-8">
        <div className="text-[#B56868] font-semibold mb-4">Payment Instructions</div>
        <div className="mb-4">
          <div className="font-bold mb-1">BNI ATM</div>
          <ol className="list-decimal ml-5 text-sm text-gray-700">
            <li>Insert your card.</li>
            <li>Select your preferred language.</li>
            <li>Enter your ATM PIN.</li>
            <li>Then, select "Other Menu."</li>
            <li>Choose "Transfer" and select the type of account you will use (e.g., 'From Savings Account').</li>
            <li>Select "Virtual Account Billing." Enter your Virtual Account number (e.g., {vaNumber}).</li>
            <li>The bill to be paid will appear on the confirmation screen.</li>
            <li>Confirm the transaction if the details are correct.</li>
            <li>Your transaction is complete.</li>
          </ol>
        </div>
        <div>
          <div className="font-bold mb-1">BNI Mobile Banking</div>
          <ol className="list-decimal ml-5 text-sm text-gray-700">
            <li>Access BNI Mobile Banking via your phone.</li>
            <li>Enter your User ID and password.</li>
            <li>Select the "Transfer" menu.</li>
            <li>Choose "Virtual Account Billing," then select your debit account.</li>
            <li>Enter your Virtual Account number (e.g., {vaNumber}) in the "New Input" menu.</li>
            <li>The bill to be paid will appear on the confirmation screen.</li>
            <li>Confirm the transaction and enter your Transaction Password.</li>
            <li>Your payment has been successfully completed.</li>
          </ol>
        </div>
      </div>

      <button
        onClick={() => navigate("/payment-status")}
        className="bg-[#46ADAC] text-white px-12 py-4 rounded-full text-lg font-bold tracking-widest"
      >
        VIEW PAYMENT STATUS
      </button>
    </div>
  );
}