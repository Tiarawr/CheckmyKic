import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Explore() {
  const [shoes, setShoes] = useState([]); // ✅ <--- INI PENTING
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/shoes`
        ); //port front
        const data = await response.json();
        setShoes(data);
      } catch (error) {
        console.error("Failed to fetch shoes:", error);
      }
    };

    fetchShoes();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(shoes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShoes = shoes.slice(startIndex, endIndex);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="min-h-screen w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Title Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold font-['Poppins'] leading-tight mb-4">
              <span className="text-black">Explore </span>
              <span className="text-[#B56868]">What WE Checked</span>
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl font-semibold font-open leading-relaxed max-w-4xl mx-auto">
              CheckMyKicks has handled countless sneaker legit checks with
              precision and care.
            </p>
          </div>

          {/* Shoes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {currentShoes.map((shoe, index) => (
              <div
                key={startIndex + index}
                className="bg-white rounded-[20px] border border-zinc-300 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Shoe Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${shoe.image.replace(
                      "/uploads//uploads",
                      "/uploads"
                    )}`}
                    alt={shoe.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error("Image gagal dimuat:", e.target.src);
                      e.target.style.display = "none";
                    }}
                  />
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col h-40">
                  {/* Shoe Name */}
                  <h3 className="text-lg font-semibold text-black line-clamp-2 flex-grow">
                    {shoe.name}
                  </h3>

                  {/* Shoe Status */}
                  <div className="flex justify-end mt-4">
                    <div
                      className={`px-4 py-2 rounded-[20px] ${
                        shoe.status === "PASS" ? "bg-[#5CC98D]" : "bg-[#E06262]"
                      }`}
                    >
                      <span className="text-white text-sm font-bold font-open tracking-[0.02em]">
                        {shoe.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-1">
                {currentPage > 3 && totalPages > 5 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="px-3 py-2 rounded-lg font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                    >
                      1
                    </button>
                    {currentPage > 4 && (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    )}
                  </>
                )}

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-[#B56868] text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {currentPage < totalPages - 2 && totalPages > 5 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="px-3 py-2 rounded-lg font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Pagination Info */}
          <div className="text-center mt-6 text-gray-600 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, shoes.length)} of{" "}
            {shoes.length} results
          </div>
        </div>
      </div>
    </motion.div>
  );
}
