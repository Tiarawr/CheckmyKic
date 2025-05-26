import { useEffect, useState } from "react";
import {
  X,
  ChevronDown,
  Mail,
  FileText,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const axios = {
  get: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { data: await response.json() };
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  post: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { data: await response.json() };
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [resultStatus, setResultStatus] = useState("");
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminToken");
    if (!isLoggedIn) {
      navigate("/login-admin");
    } else {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://sincere-rebirth-am.up.railway.app//admin/orders-with-shoes"
      );

      const ordersWithParsedImages = response.data.map((order) => ({
        ...order,

        image_url: order.image_url
          ? typeof order.image_url === "string"
            ? JSON.parse(order.image_url)
            : order.image_url
          : [],
        // Ensure amount is properly formatted
        amount: order.amount ? order.amount.toString() : "0",
      }));

      // Filter only paid orders (where paid_at is not null)
      setOrders(ordersWithParsedImages.filter((o) => o.paid_at));
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please check your API connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (url, index, allImages) => {
    setSelectedImage({ url, allImages });
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : selectedImage.allImages.length - 1
    );
    setSelectedImage((prev) => ({
      ...prev,
      url: selectedImage.allImages[
        currentImageIndex > 0
          ? currentImageIndex - 1
          : selectedImage.allImages.length - 1
      ],
    }));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < selectedImage.allImages.length - 1 ? prev + 1 : 0
    );
    setSelectedImage((prev) => ({
      ...prev,
      url: selectedImage.allImages[
        currentImageIndex < selectedImage.allImages.length - 1
          ? currentImageIndex + 1
          : 0
      ],
    }));
  };

  const handleShowInfo = (order) => {
    console.log("Image URLs:", order.image_url);
    setSelectedOrder(order);
    setResultStatus(order.result || "");
    setShowModal(true);
  };

  const handleSend = async () => {
    if (!selectedOrder || !resultStatus) return;

    try {
      // Kirim update result ke backend
      await axios.post(
        "https://sincere-rebirth-am.up.railway.app//admin/update-result",
        {
          shoe_id: selectedOrder.shoe_id,
          result: resultStatus, // ini bisa "not pass"
        }
      );

      // Update lokal state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.shoe_id === selectedOrder.shoe_id
            ? { ...order, result: resultStatus }
            : order
        )
      );

      // Jika pass, langsung kirim sertifikat
      if (resultStatus === "pass") {
        await confirmSendCertificateAuto(selectedOrder);
      }

      setShowModal(false);
      setSelectedOrder(null);
      setResultStatus("");
    } catch (err) {
      console.error("Failed to update result:", err);
      alert("Failed to update result. Please try again.");
    }
  };

  const handleSendCertificate = (order) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const certData = {
      customerEmail: order.email,
      itemName: `${order.brands} ${order.model}`,
      productId: `${order.brands?.substring(0, 2).toUpperCase() || "XX"}${
        order.user_id
      }-${
        order.model?.replace(/\s+/g, "").substring(0, 6).toUpperCase() ||
        "XXXXXX"
      }`,
      issueDate: currentDate,
      orderId: order.user_id,
    };

    setCertificateData(certData);
    setShowCertificateModal(true);
  };

  const confirmSendCertificate = async () => {
    try {
      // Send certificate via your API
      await axios.post(
        "https://sincere-rebirth-am.up.railway.app//admin/send-certificate",
        {
          orderId: certificateData.orderId,
          certificateData: certificateData,
        }
      );

      alert(
        `✅ Certificate sent successfully to ${certificateData.customerEmail}!`
      );
      setShowCertificateModal(false);
      setCertificateData(null);
    } catch (err) {
      console.error("Failed to send certificate:", err);
      alert("❌ Failed to send certificate. Please try again.");
    }
  };
  const confirmSendCertificateAuto = async (order) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const certData = {
      customerEmail: order.email,
      itemName: `${order.brands} ${order.model}`,
      productId: `${order.brands?.substring(0, 2).toUpperCase() || "XX"}${
        order.user_id
      }-${
        order.model?.replace(/\s+/g, "").substring(0, 6).toUpperCase() ||
        "XXXXXX"
      }`,
      issueDate: currentDate,
      orderId: order.user_id,
    };

    try {
      await axios.post(
        "https://sincere-rebirth-am.up.railway.app/admin/send-certificate",
        {
          orderId: certData.orderId,
          certificateData: certData,
        }
      );

      alert(`✅ Certificate auto-sent to ${certData.customerEmail}!`);
    } catch (err) {
      console.error("Failed to auto-send certificate:", err);
      alert("❌ Auto-send certificate failed.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setResultStatus("");
  };

  const closeCertificateModal = () => {
    setShowCertificateModal(false);
    setCertificateData(null);
  };

  const formatCurrency = (amount) => {
    return `Rp${parseInt(amount || 0).toLocaleString("id-ID")}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  if (loading) {
    return (
      <section className="bg-white py-8 dark:bg-gray-900 md:py-16 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-center">
              <div className="text-gray-500 dark:text-gray-400">
                Loading orders...
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-8 dark:bg-gray-900 md:py-16 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <div className="text-red-500 mb-4">{error}</div>
              <button
                onClick={fetchOrders}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <>
        <section className="bg-white py-8 dark:bg-gray-900 md:py-16 min-h-screen">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  My Orders ({orders.length})
                </h2>
                <button
                  onClick={fetchOrders}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Refresh
                </button>
              </div>

              {orders.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  No paid orders available.
                </p>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => (
                    <div
                      key={`${order.shoe_id}-${order.user_id}`}
                      className="flex flex-wrap items-center gap-y-4 py-6"
                    >
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Order ID:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <a href="#" className="hover:underline">
                            #{order.user_id}
                          </a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Email:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {order.email || "N/A"}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Price:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(order.amount)}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Result:
                        </dt>
                        <dd
                          className={`mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium
                          ${
                            order.result === "pass"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : order.result === "not pass"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                          }`}
                        >
                          {order.result || "waiting"}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Payment Status:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-blue-700 dark:text-blue-300 capitalize">
                          {order.status || "completed"}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Paid At:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {formatDate(order.paid_at)}
                        </dd>
                      </dl>

                      <div className="w-full sm:w-auto flex gap-2">
                        <button
                          className="mt-2 rounded-lg border border-blue-500 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-300 dark:hover:bg-blue-700 dark:hover:text-white"
                          onClick={() => handleShowInfo(order)}
                        >
                          Show Info
                        </button>

                        {/* Certificate Button - only show for "pass" orders */}
                        {order.result === "pass" && (
                          <button
                            className="mt-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 flex items-center gap-1"
                            onClick={() => handleSendCertificate(order)}
                          >
                            <Mail size={16} />
                            Send Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Original Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Order #{selectedOrder.user_id}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(selectedOrder.amount)}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Details Section */}
                <div className="mb-6">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                    Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Brand:
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedOrder.brands || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Model:
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedOrder.model || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Email:
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedOrder.email || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Created At:
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(selectedOrder.created_at)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Payment Status:
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {selectedOrder.status || "completed"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Account Number:
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedOrder.account_number || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="mb-6">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                    Customer Images (Click to enlarge)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedOrder.image_url &&
                    selectedOrder.image_url.length > 0 ? (
                      selectedOrder.image_url.slice(0, 8).map((img, index) => {
                        console.log(
                          "IMAGE URL:",
                          `https://sincere-rebirth-am.up.railway.app${img}`
                        );

                        return (
                          <div
                            key={index}
                            className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                            onClick={() =>
                              handleImageClick(
                                `https://sincere-rebirth-am.up.railway.app${img}`,
                                index,
                                selectedOrder.image_url.map(
                                  (imgUrl) =>
                                    `https://sincere-rebirth-am.up.railway.app${imgUrl}`
                                )
                              )
                            }
                          >
                            <img
                              src={`https://sincere-rebirth-am.up.railway.app${img}`}
                              alt={`Customer image ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                            <div className="w-full h-full hidden items-center justify-center text-gray-500 text-sm">
                              Image not found
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-span-4 text-gray-500 text-sm text-center py-4">
                        No images available
                      </div>
                    )}
                  </div>
                </div>

                {/* Result Dropdown */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Result Status
                  </label>
                  <div className="relative">
                    <select
                      value={resultStatus}
                      onChange={(e) => setResultStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Select result...</option>
                      <option value="pass">Pass</option>
                      <option value="not pass">Not Pass</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                {resultStatus && (
                  <button
                    onClick={() => handleSend(true)} // <-- Tambah flag
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    Update Only
                  </button>
                )}
                {resultStatus === "not pass" && (
                  <button
                    onClick={() => handleSend()} // <-- Tanpa flag = normal behavior
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    Send Not Pass
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Image Enlargement Modal */}
        {showImageModal && selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-[60]">
            <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons */}
              {selectedImage.allImages &&
                selectedImage.allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

              {/* Image Counter */}
              {selectedImage.allImages &&
                selectedImage.allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {selectedImage.allImages.length}
                  </div>
                )}

              {/* Main Image */}
              <div className="max-w-full max-h-full flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt="Enlarged customer image"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTAwTDEwMCAxMDAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHRleHQgeD0iMTAwIiB5PSIxMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Q0EzQUYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pgo8L3N2Zz4=";
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Certificate Preview Modal */}
        {showCertificateModal && certificateData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <FileText className="text-green-600" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Certificate Preview
                    </h3>
                    <p className="text-sm text-gray-500">
                      Ready to send to {certificateData.customerEmail}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeCertificateModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Certificate Content */}
              <div className="p-8">
                <div
                  className="bg-white border-2 border-gray-200 rounded-lg p-8 max-w-3xl mx-auto"
                  style={{ aspectRatio: "4/3" }}
                >
                  {/* Background decorative elements */}
                  <div className="relative">
                    <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-20"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20"></div>

                    {/* Header */}
                    <div className="text-center pb-6">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                          <div className="text-white text-lg">✓</div>
                        </div>
                        <div>
                          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
                            CERTIFICATE OF AUTHENTICITY
                          </h1>
                          <p className="text-base text-gray-600 mt-1">
                            Issued by CheckMyKicks
                          </p>
                        </div>
                      </div>

                      {/* Authenticity Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="text-white" size={24} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      {/* Item Name */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">
                          ITEM NAME
                        </h3>
                        <p className="text-base text-gray-800">
                          {certificateData.itemName} (Code:{" "}
                          {certificateData.productId})
                        </p>
                      </div>

                      {/* Certificate Owner */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">
                          CERTIFICATE OWNER
                        </h3>
                        <p className="text-base text-gray-800">
                          {certificateData.customerEmail} –{" "}
                          {certificateData.issueDate}
                        </p>
                      </div>

                      {/* Details */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">
                          DETAILS
                        </h3>
                        <div className="text-sm text-gray-700 leading-relaxed">
                          <p className="mb-2">
                            This item has been carefully inspected by our legit
                            check team. Based on materials, stitching, tags, and
                            overall shape, the item is deemed authentic.
                          </p>
                          <p>
                            Thank you for using CheckMyKicks. This certificate
                            is digitally issued and valid for reference in
                            authenticity claims.
                          </p>
                        </div>
                      </div>

                      {/* Footer Note */}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-600 italic">
                          Note: Please do not edit or screenshot this document
                          for other purposes. Valid certificates are only issued
                          by CheckMyKicks.com.
                        </p>
                      </div>

                      {/* Signature */}
                      <div className="flex justify-end pt-2">
                        <div className="text-right">
                          <div className="w-24 h-8 border-b-2 border-gray-800 mb-1"></div>
                          <p className="text-xs text-gray-600">
                            Authorized Signature
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={closeCertificateModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSendCertificate}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2"
                >
                  <Mail size={16} />
                  Send Certificate to Customer
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </motion.div>
  );
}
