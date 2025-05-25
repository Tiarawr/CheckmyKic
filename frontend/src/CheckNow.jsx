import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckNow() {
  const [brands, setBrands] = useState("");
  const [model, setModel] = useState("");
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState(null);
  const navigate = useNavigate();

  const handleCancel = () => navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }
    if (!brands.trim() || !model.trim()) {
      alert("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }
    if (photos.length !== 8) {
      alert("You must upload exactly 8 photos.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("brands", brands);
    formData.append("model", model);
    formData.append("email", email);
    photos.forEach((photo) => formData.append("photos", photo));

    try {
      const response = await fetch("/api/checknow", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Submit failed");
      setBrands("");
      setModel("");
      setEmail("");
      setPhotos([]);
      navigate("/payment");
    } catch (error) {
      alert("Gagal mengirim data: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col w-full min-h-screen bg-white"
    >
      {zoomedPhoto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <button
            onClick={() => setZoomedPhoto(null)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ×
          </button>
          <img
            src={zoomedPhoto}
            alt="Zoomed"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}

      <div className="absolute top-[191px] left-[145px] w-[1150px] h-[927px] rounded-[30px] border-2 border-[#BFBEBE]" />
      <div className="absolute top-[145px] left-[145px] text-[#B56868] font-['Poppins'] font-semibold text-[24px]">
        START A CHECK
      </div>

      <label
        htmlFor="brands"
        className="absolute top-[229px] left-[213px] text-black font-medium text-[20px]"
      >
        Brands Sneakers
      </label>
      <div className="absolute top-[261px] left-[213px] w-[600px] h-[60px]">
        <label className="relative block h-full">
          <input
            id="brands"
            type="text"
            value={brands}
            onChange={(e) => setBrands(e.target.value)}
            placeholder=" "
            className="peer w-full h-full bg-white rounded-[20px] border border-[#BFBEBE] px-4 pt-4 text-lg focus:outline-none focus:border-[#46ADAC]"
            required
          />
          <span className="absolute left-4 top-3 text-[#999] text-sm transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#46ADAC]">
            Enter your BRANDS
          </span>
        </label>
      </div>

      <label
        htmlFor="model"
        className="absolute top-[351px] left-[213px] text-black font-medium text-[20px]"
      >
        Model Sneakers
      </label>
      <div className="absolute top-[383px] left-[213px] w-[600px] h-[60px]">
        <label className="relative block h-full">
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder=" "
            className="peer w-full h-full bg-white rounded-[20px] border border-[#BFBEBE] px-4 pt-4 text-lg focus:outline-none focus:border-[#46ADAC]"
            required
          />
          <span className="absolute left-4 top-3 text-[#999] text-sm transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#46ADAC]">
            Enter your MODEL
          </span>
        </label>
      </div>

      <label
        htmlFor="photos"
        className="absolute top-[473px] left-[213px] text-black font-medium text-[20px]"
      >
        Upload Product Image
      </label>
      <div className="absolute top-[505px] left-[210px] w-[1020px] h-[420px] bg-white rounded-[20px] border border-[#BFBEBE] p-4 flex items-center justify-center">
        {photos.length > 0 ? (
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${photos.length * 100}%`,
                transform: `translateX(0)`,
              }}
            >
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 flex justify-center items-center"
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Preview ${index + 1}`}
                    onClick={() => setZoomedPhoto(URL.createObjectURL(photo))}
                    className="h-full object-contain cursor-zoom-in rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm text-center font-['Poppins']">
            No images uploaded
          </p>
        )}
      </div>

      <div className="absolute top-[535px] left-[240px] w-[200px] h-[40px] bg-[#46ADAC] rounded-[30px] flex justify-center items-center text-white text-xl font-medium">
        Photo Checklist
      </div>
      <div className="relative top-[730px] left-[840px] w-[260px] h-[45px] bg-[#46ADAC] rounded-[10px] text-white font-semibold text-[20px] flex justify-center items-center cursor-pointer">
        Photo Upload
        <input
          id="photos"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            if (files.length !== 8) {
              alert("You must upload exactly 8 photos.");
              e.target.value = "";
              setPhotos([]);
              return;
            }
            setPhotos(files);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <img
        src="/pfoto.svg"
        alt="Photo icon"
        className="absolute top-[670px] left-[924px] w-[60px] h-[60px]"
      />

      <label
        htmlFor="email"
        className="absolute top-[955px] left-[213px] text-black font-medium text-[20px]"
      >
        Email address
      </label>
      <div className="absolute top-[987px] left-[213px] w-[600px] h-[60px]">
        <label className="relative block h-full">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full h-full bg-white rounded-[20px] border border-[#BFBEBE] px-4 pt-4 text-lg focus:outline-none focus:border-[#46ADAC]"
            required
          />
          <span className="absolute left-4 top-3 text-[#999] text-sm transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#46ADAC]">
            Your Email
          </span>
        </label>
      </div>

      <div className="absolute top-[595px] left-[240px] text-[#B56868] font-semibold text-[18px] whitespace-pre-line">
        1. Appearance
        {"\n"}2. Size Tag Left
        {"\n"}3. Size Tag Right
        {"\n"}4. Back of Insole Left
        {"\n"}5. Back of Insole Right
        {"\n"}6. Insole Stitching (1)
        {"\n"}7. Insole Stitching (2)
        {"\n"}8. Box Label
      </div>

      <div className="absolute top-[810px] left-[240px] w-[356px] text-black font-normal text-[18px]">
        Please make sure to upload all 8 required photos with clear and proper
        lighting to ensure accurate legit checking.
      </div>

      <div className="w-[1064px] left-[200px] top-[1158px] absolute inline-flex justify-between items-center">
        <button
          type="button"
          onClick={handleCancel}
          className="w-52 h-16 px-12 py-5 bg-[#B56868] rounded-[40px] flex justify-center items-center gap-2.5"
        >
          <span className="text-white text-xl font-bold uppercase tracking-[3px]">
            Cancel
          </span>
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-48 h-16 px-16 py-6 ${
            isSubmitting ? "bg-gray-400" : "bg-[#B56868]"
          } rounded-[40px] flex justify-center items-center gap-2.5 cursor-pointer`}
        >
          <span className="text-white text-xl font-bold uppercase tracking-[3px]">
            {isSubmitting ? "Processing..." : "Next"}
          </span>
        </button>
      </div>
    </form>
  );
}
