/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import path from "path";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["**/*"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
  },
  manifest: {
    name: "Shop Square",
    short_name: "S-Square",
    description: "E-commerce Shop App",
    theme_color: "#2596be",
    background_color: "#383a3e",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/shop-icon-1024x1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/shop-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup/setup.ts",
    css: true,
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@providers": path.resolve(__dirname, "./src/providers"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
