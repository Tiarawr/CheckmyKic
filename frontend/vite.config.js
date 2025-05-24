import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
    allowedHosts: ["9d9f-157-10-8-222.ngrok-free.app"], // ganti sesuai host ngrok kamu
    host: true, // penting agar Vite menerima external request
  },
});
