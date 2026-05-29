import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    minify: false,
    rollupOptions: {
      input: {
        popup: "popup.html",
        // contextLoaderIndex: resolve(__dirname, "src/context-loader/index.ts"),
        // contextLoaderInjector: resolve(
        //   __dirname,
        //   "src/context-loader/injector.ts",
        // ),
      },
      // output: {
      //   entryFileNames: (chunkInfo) => {
      //     if (chunkInfo.name === "contextLoaderIndex") {
      //       return "context-loader/index.js";
      //     }
      //     if (chunkInfo.name === "contextLoaderInjector") {
      //       return "context-loader/injector.js";
      //     }
      //     return "assets/[name]-[hash].js";
      //   },
      // },
    },
  },
});
