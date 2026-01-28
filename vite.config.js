import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const basePath =
    process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || "/portfolio/";
  console.log("VITE_BASE_PATH:", process.env.VITE_BASE_PATH);
  return {
    base: basePath,
    plugins: [vue()],
  };
});
