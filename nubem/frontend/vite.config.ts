import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 8001,
    // proxy: {
    //   "/token": "http://127.0.0.1:5000",
    //   "/logout": "http://127.0.0.1:5000",
    //   "/profile": "http://127.0.0.1:5000",
    //   // ... add other endpoints as needed ...
    // },
  },
});
