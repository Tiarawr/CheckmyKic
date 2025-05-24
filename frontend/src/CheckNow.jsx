import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckNow() {
  const [brands, setBrands] = useState("");
  const [model, setModel] = useState("");
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState(null);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/"); // Redirect ke halaman utama
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brands", brands);
    formData.append("model", model);
    formData.append("email", email);

    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }
    }

    try {
      const response = await fetch("/api/checknow", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submit failed");

      setBrands("");
      setModel("");
      setEmail("");
      setPhotos(null);

      navigate("/payment"); //
    } catch (error) {
      alert("Gagal mengirim data: " + error.message);
    }
  };

  useEffect(() => {
    // Scroll to the top when the page is loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-auto w-full h-300">
      {/* Border container */}
      <div className="absolute top-[191px] left-[145px] w-[1150px] h-[927px] rounded-[30px] border-2 border-[#BFBEBE]" />
      {/* Labels */}
      <label
        htmlFor="brands"
        className="absolute top-[229px] left-[213px] text-black font-['Poppins'] font-medium text-[20px]"
      >
        Brands Sneakers
      </label>
      <label
        htmlFor="model"
        className="absolute top-[351px] left-[213px] text-black font-['Poppins'] font-medium text-[20px]"
      >
        Model Sneakers
      </label>
      <label
        htmlFor="photos"
        className="absolute top-[473px] left-[213px] text-black font-['Poppins'] font-medium text-[20px]"
      >
        Upload Product Image
      </label>
      <label
        htmlFor="email"
        className="absolute top-[955px] left-[213px] text-black font-['Poppins'] font-medium text-[20px]"
      >
        Email address
      </label>
      {/* Input boxes with floating labels */}
      <div className="absolute top-[261px] left-[213px] w-[600px] h-[60px]">
        <label className="relative block h-full">
          <input
            id="brands"
            type="text"
            value={brands}
            onChange={(e) => setBrands(e.target.value)}
            placeholder=" "
            className="peer w-full h-full bg-white rounded-[20px] border border-[#BFBEBE] px-4 pt-4 text-lg font-['Poppins'] focus:outline-none focus:border-[#46ADAC]"
            required
          />
          <span className="absolute left-4 top-3 text-[#999] text-sm font-['Poppins'] transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#46ADAC]">
            Enter your BRANDS
          </span>
        </label>
      </div>
      <div className="absolute top-[383px] left-[213px] w-[600px] h-[60px]">
        <label className="relative block h-full">
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder=" "
            className="peer w-full h-full bg-white rounded-[20px] border border-[#BFBEBE] px-4 pt-4 text-lg font-['Poppins'] focus:outline-none focus:border-[#46ADAC]"
            required
          />
          <span className="absolute left-4 top-3 text-[#999] text-sm font-['Poppins'] transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#46ADAC]">
            Enter your MODEL
          </span>
        </label>
      </div>
      {/* Description box */}
      <div className="absolute top-[505px] left-[210px] w-[1020px] h-[420px] bg-white rounded-[20px] border border-[#BFBEBE] p-4 resize-none font-['Poppins']" />
      {/* Photo preview box */}
      <div className="absolute top-[545px] left-[730px] w-[440px] h-[340px] bg-white rounded-[20px] border border-[#BFBEBE]" />
      {/* Photo upload input */}
      <div className="absolute top-[535px] left-[240px] w-[200px] h-[40px]">
        <div className="flex justify-center items-center w-full h-full bg-[#46ADAC] rounded-[30px] text-white text-xl font-medium font-['Poppins']">
          Photo Checklist
        </div>
      </div>
      <div className="absolute top-[987px] left-[213px] w-[600px] h-[60px]">
        <label className="relative block h-full">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full h-full bg-white rounded-[20px] border border-[#BFBEBE] px-4 pt-4 text-lg font-['Poppins'] focus:outline-none focus:border-[#46ADAC]"
            required
          />
          <span className="absolute left-4 top-3 text-[#999] text-sm font-['Poppins'] transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#46ADAC]">
            Your Email
          </span>
        </label>
      </div>
      {/* START A CHECK label */}
      {/* <div className="absolute top-[145px] left-[145px] flex justify-center items-center text-[#B56868] font-['Poppins'] font-semibold text-[24px] leading-[33.43px] break-words w-[191px] h-[21px]">
        START A CHECK
      </div>
      {/* Submit Button */}
      <div className="relative top-[770px] left-[840px] w-[260px] h-[45px] bg-[#46ADAC] rounded-[10px] text-white font-semibold text-[20px] flex justify-center items-center cursor-pointer">
        Photo Upload
        <input
          id="photos"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setPhotos(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>{" "}
      {/* Photo icon */}
      <img
        src="/pfoto.svg"
        alt="Photo icon"
        className="absolute top-[670px] left-[924px] w-[60px] h-[60px]"
      />
      {/* Checklist labels */}
      <div
        className="absolute top-[595px] left-[240px] text-[#B56868] font-['Open Sans'] font-semibold text-[18px] capitalize whitespace-pre-line break-words"
        style={{ lineHeight: "1.4" }}
      >
        Appearance
        <br />
        Size Tag Left
        <br />
        Size Tag Right
        <br />
        Back of Insole Left
        <br />
        Back of Insole Right
        <br />
        Insole Stitching (1)
        <br />
        Insole Stitching (2)
        <br />
        Box Label
      </div>
      {/* Instruction paragraph */}
      <div className="absolute top-[810px] left-[240px] w-[356px] text-black font-['Open Sans'] font-normal text-[18px] break-words">
        Please make sure to upload all 8 required photos with clear and proper
        lighting to ensure accurate legit checking.
      </div>
      {/* Tombol Action Bawah */}
      <div className="w-[1064px] left-[200px] top-[1158px] absolute inline-flex justify-between items-center">
        {/* Tombol CANCEL */}
        <button
          type="button"
          onClick={handleCancel}
          className="w-52 h-16 px-12 py-5 bg-[#B56868] rounded-[40px] flex justify-center items-center gap-2.5"
        >
          <span className="text-white text-xl font-bold font-['Open_Sans'] uppercase tracking-[3px]">
            Cancel
          </span>
        </button>

        {/* Tombol NEXT */}
        <button
          type="submit"
          className="w-48 h-16 px-16 py-6 bg-[#B56868] rounded-[40px] flex justify-center items-center gap-2.5"
        >
          <span className="text-white text-xl font-bold font-['Open_Sans'] uppercase tracking-[3px]">
            Next
          </span>
        </button>
      </div>
    </form>
  );
}
