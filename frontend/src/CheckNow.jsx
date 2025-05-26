import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CheckNow() {
  const [brands, setBrands] = useState("");
  const [model, setModel] = useState("");
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

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

      const responseData = await response.json();
      setBrands("");
      setModel("");
      setEmail("");
      setPhotos([]);
      navigate("/payment", { state: { shoe_id: responseData.shoe_id } });

      // Navigate to payment - you can implement your navigation logic here
      console.log("Navigating to payment with shoe_id:", responseData.shoe_id);
    } catch (error) {
      alert("Gagal mengirim data: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextPhoto = () => {
    if (photos.length > 0) {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (photos.length > 0) {
      setCurrentPhotoIndex(
        (prev) => (prev - 1 + photos.length) % photos.length
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="min-h-screen bg-white">
        {/* Zoom Modal */}
        {zoomedPhoto && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center p-4">
            <button
              onClick={() => setZoomedPhoto(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-2xl md:text-3xl z-10"
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

        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[#B56868] font-['Poppins'] font-semibold text-xl md:text-2xl">
              START A CHECK
            </h1>
          </div>

          {/* Main Form Container */}
          <div className="bg-white rounded-3xl border-2 border-[#BFBEBE] p-4 md:p-8">
            <div className="space-y-6 md:space-y-8">
              {/* Brand Input */}
              <div className="space-y-2">
                <label
                  htmlFor="brands"
                  className="block text-black font-medium text-lg md:text-xl"
                >
                  Brands Sneakers
                </label>
                <div className="relative">
                  <input
                    id="brands"
                    type="text"
                    value={brands}
                    onChange={(e) => setBrands(e.target.value)}
                    placeholder=" "
                    className="peer w-full h-12 md:h-15 bg-white rounded-xl md:rounded-2xl border border-[#BFBEBE] px-4 pt-4 text-base md:text-lg focus:outline-none focus:border-[#46ADAC]"
                    required
                  />
                  <span className="absolute left-4 top-2 text-[#999] text-sm transition-all peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 md:peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#46ADAC]">
                    Enter your BRANDS
                  </span>
                </div>
              </div>

              {/* Model Input */}
              <div className="space-y-2">
                <label
                  htmlFor="model"
                  className="block text-black font-medium text-lg md:text-xl"
                >
                  Model Sneakers
                </label>
                <div className="relative">
                  <input
                    id="model"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder=" "
                    className="peer w-full h-12 md:h-15 bg-white rounded-xl md:rounded-2xl border border-[#BFBEBE] px-4 pt-4 text-base md:text-lg focus:outline-none focus:border-[#46ADAC]"
                    required
                  />
                  <span className="absolute left-4 top-2 text-[#999] text-sm transition-all peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 md:peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#46ADAC]">
                    Enter your MODEL
                  </span>
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-4">
                <label
                  htmlFor="photos"
                  className="block text-black font-medium text-lg md:text-xl"
                >
                  Upload Product Image
                </label>

                <div
                  className={`grid grid-cols-1 ${
                    photos.length > 0 ? "lg:grid-cols-2" : "lg:grid-cols-4"
                  } gap-4 lg:gap-8`}
                >
                  {/* Photo Checklist - LEFT SIDE */}
                  <div className="space-y-4 order-2 lg:order-1">
                    <div className="bg-[#46ADAC] rounded-3xl px-4 py-2 text-center">
                      <span className="text-white text-lg md:text-xl font-medium">
                        Photo Checklist
                      </span>
                    </div>

                    <div className="text-[#B56868] font-semibold text-sm md:text-base space-y-1">
                      <div>1. Appearance</div>
                      <div>2. Size Tag Left</div>
                      <div>3. Size Tag Right</div>
                      <div>4. Back of Insole Left</div>
                      <div>5. Back of Insole Right</div>
                      <div>6. Insole Stitching (1)</div>
                      <div>7. Insole Stitching (2)</div>
                      <div>8. Box Label</div>
                    </div>

                    <div className="text-black font-normal text-sm md:text-base">
                      Please make sure to upload all 8 required photos with
                      clear and proper lighting to ensure accurate legit
                      checking.
                    </div>
                  </div>

                  {/* Photo Preview Area - RIGHT SIDE */}
                  <div
                    className={`order-1 lg:order-2 ${
                      photos.length > 0 ? "" : "lg:col-span-3"
                    }`}
                  >
                    <div className="w-full h-64 md:h-80 lg:h-96 bg-white rounded-2xl border border-[#BFBEBE] p-4 flex flex-col items-center justify-center relative">
                      {photos.length > 0 ? (
                        <>
                          <div className="relative w-full h-full overflow-hidden">
                            <img
                              src={URL.createObjectURL(
                                photos[currentPhotoIndex]
                              )}
                              alt={`Preview ${currentPhotoIndex + 1}`}
                              onClick={() =>
                                setZoomedPhoto(
                                  URL.createObjectURL(photos[currentPhotoIndex])
                                )
                              }
                              className="w-full h-full object-contain cursor-zoom-in rounded-lg"
                            />
                          </div>

                          {/* Navigation Buttons */}
                          {photos.length > 1 && (
                            <>
                              <button
                                onClick={prevPhoto}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
                              >
                                ←
                              </button>
                              <button
                                onClick={nextPhoto}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
                              >
                                →
                              </button>
                            </>
                          )}

                          {/* Photo Counter */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                            {currentPhotoIndex + 1} / {photos.length}
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src="/pfoto.svg"
                            alt="Upload placeholder"
                            className="w-20 h-20 mb-4 opacity-50"
                          />

                          {/* Upload Button */}
                          <div className="relative">
                            <div className="w-40 h-12 bg-[#46ADAC] rounded-xl text-white font-semibold text-lg flex justify-center items-center cursor-pointer">
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
                                    setCurrentPhotoIndex(0);
                                    return;
                                  }
                                  setPhotos(files);
                                  setCurrentPhotoIndex(0);
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Photo Thumbnails */}
                    {photos.length > 0 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {photos.map((photo, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPhotoIndex(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${
                              currentPhotoIndex === index
                                ? "border-[#46ADAC]"
                                : "border-gray-300"
                            }`}
                          >
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Thumb ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-black font-medium text-lg md:text-xl"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    className="peer w-full h-12 md:h-15 bg-white rounded-xl md:rounded-2xl border border-[#BFBEBE] px-4 pt-4 text-base md:text-lg focus:outline-none focus:border-[#46ADAC]"
                    required
                  />
                  <span className="absolute left-4 top-2 text-[#999] text-sm transition-all peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 md:peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#46ADAC]">
                    Your Email
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons - Outside the form box */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-52 h-12 md:h-16 px-8 md:px-12 py-3 md:py-5 bg-[#B56868] rounded-3xl md:rounded-[40px] flex justify-center items-center cursor-pointer"
            >
              <span className="text-white text-lg md:text-xl font-bold uppercase tracking-[2px] md:tracking-[3px]">
                Cancel
              </span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full sm:w-48 h-12 md:h-16 px-8 md:px-16 py-3 md:py-6 ${
                isSubmitting ? "bg-gray-400" : "bg-[#B56868]"
              } rounded-3xl md:rounded-[40px] flex justify-center items-center cursor-pointer`}
            >
              <span className="text-white text-lg md:text-xl font-bold uppercase tracking-[2px] md:tracking-[3px]">
                {isSubmitting ? "Processing..." : "Next"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
