import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
    allowedHosts: ["bfad-157-10-8-222.ngrok-free.app"],
    host: true,
  },
});
