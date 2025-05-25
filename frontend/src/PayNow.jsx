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
    <div className="w-[1440px] h-[1357px] relative bg-stone-50">
      <div className="w-72 h-5 left-[144px] top-[80px] absolute justify-center text-[#B56868] text-2xl font-semibold font-['Poppins'] uppercase leading-loose">
        waiting for payment
      </div>

      <div className="w-64 h-5 left-[144px] top-[496px] absolute justify-center text-[#B56868] text-2xl font-semibold font-['Poppins'] leading-loose">
        Payment Instructions
      </div>

      <div className="w-[1152px] h-[595px] left-[144px] top-[536px] absolute bg-white rounded-[20px] border border-stone-300" />

      <div className="w-24 h-5 left-[184px] top-[576px] absolute justify-center text-black text-xl font-semibold font-Open leading-7">
        {bank_code} ATM
      </div>

      <div className="w-[811px] h-60 left-[221px] top-[607px] absolute justify-center text-black text-lg font-normal font-Open leading-relaxed">
        Insert your card.
        <br />
        Select your preferred language.
        <br />
        Enter your ATM PIN.
        <br />
        Then, select "Other Menu."
        <br />
        Choose "Transfer" and select the type of account you will use (e.g.,
        'From Savings Account').
        <br />
        Select "Virtual Account Billing." Enter your Virtual Account number
        (e.g., {account_number}).
        <br />
        The bill to be paid will appear on the confirmation screen.
        <br />
        Confirm the transaction if the details are correct.
        <br />
        Your transaction is complete.
      </div>

      <div className="w-48 h-5 left-[184px] top-[860px] absolute justify-center text-black text-xl font-semibold font-Open leading-7">
        {bank_code} Mobile Banking
      </div>

      <div className="w-[761px] h-48 left-[221px] top-[891px] absolute justify-center text-black text-lg font-normal font-Open leading-relaxed">
        Access {bank_code} Mobile Banking via your phone.
        <br />
        Enter your User ID and password.
        <br />
        Select the "Transfer" menu.
        <br />
        Choose "Virtual Account Billing," then select your debit account.
        <br />
        Enter your Virtual Account number (e.g., {account_number}) in the "New
        Input" menu.
        <br />
        The bill to be paid will appear on the confirmation screen.
        <br />
        Confirm the transaction and enter your Transaction Password.
        <br />
        Your payment has been successfully completed.
      </div>

      <div className="w-[624px] h-64 left-[408px] top-[161px] absolute bg-white rounded-[20px] shadow-[-9px_9px_4px_0px_rgba(0,0,0,0.25)] border border-stone-300" />

      <div className="w-14 h-5 left-[438px] top-[242px] absolute overflow-hidden">
        <img
          className="w-14 h-5 left-0 top-0 absolute"
          src={bankLogos[bank_code] || "https://placehold.co/60x20"}
          alt={bank_code}
        />
      </div>

      <div className="w-56 h-4 left-[438px] top-[272px] absolute justify-center text-black text-xl font-normal font-['Poppins'] leading-7">
        Nomor Virtual Account
      </div>

      <div className="w-52 h-4 left-[759px] top-[272px] absolute justify-center text-black text-2xl font-semibold font-['Poppins'] leading-loose tracking-wide">
        {account_number}
      </div>

      <div className="w-20 h-4 left-[438px] top-[328px] absolute justify-center text-black text-xl font-normal font-['Poppins'] leading-7">
        total bill
      </div>

      <div className="w-32 h-4 left-[759px] top-[325px] absolute justify-center text-black text-2xl font-semibold font-['Poppins'] leading-loose tracking-wide">
        Rp{expected_amount.toLocaleString("id-ID")}
      </div>

      <div className="w-40 h-5 left-[642px] top-[191px] absolute justify-center text-black text-xl font-semibold font-Open leading-7">
        payment details
      </div>

      <button
        onClick={() => navigate("/payment-status", { state: { shoe_id } })}
        className="w-[478px] h-16 left-[481px] top-[1207px] absolute bg-[#46ADAC] rounded-[40px] cursor-pointer"
      >
        <div className="w-96 h-8 left-[31px] top-[16px] absolute text-center justify-center text-white text-2xl font-bold font-['Open_Sans'] uppercase tracking-[3.60px]">
          view payment status
        </div>
      </button>
    </div>
  );
}
