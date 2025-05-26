import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Kalau sudah login, langsung lempar ke /admin
    if (sessionStorage.getItem("adminToken")) {
      navigate("/admin");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://16f1-157-10-8-222.ngrok-free.app/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Login gagal");
        return;
      }

      sessionStorage.setItem("adminToken", result.token);
      navigate("/admin"); // ✅ arahkan ke dashboard
    } catch (err) {
      console.error("Login error:", err);
      alert("Terjadi kesalahan saat login.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <section className="min-h-screen dark:bg-gray-900 flex items-center justify-center font-poppins">
        <div className="w-full max-w-md bg-gray-700 rounded-xl shadow-md border dark:border-gray-900-">
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-center text-white font-caprasimo">
              Admin Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white border border-[#ccc] text-[#3D3A54] rounded-lg focus:ring-[#40B1B4] focus:border-[#40B1B4] block w-full p-2.5"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border border-[#ccc] text-[#3D3A54] rounded-lg focus:ring-[#40B1B4] focus:border-[#40B1B4] block w-full p-2.5"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
