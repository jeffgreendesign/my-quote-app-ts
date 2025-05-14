import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import type { UserConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  // Load env file based on the mode (development, production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        // Proxy requests starting with /api/v1
        "/api/v1": {
          target: "https://api.api-ninjas.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              proxyReq.setHeader("X-Api-Key", env.VITE_API_NINJAS_KEY);
              console.log(
                "Proxying request to:",
                options.target + proxyReq.path
              );
              console.log(
                "With API Key:",
                env.VITE_API_NINJAS_KEY ? "Yes" : "No (Check .env)"
              );
            });
            proxy.on("error", (err, req, res) => {
              console.error("Proxy error:", err);
              if (!res.headersSent) {
                res.writeHead(500, { "Content-Type": "text/plain" });
              }
              res.end("Proxy Error: " + err.message);
            });
          },
        },
      },
    },
  };
});
