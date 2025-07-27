// vite.es.config.ts
import "file:///E:/Proj/ming-ui/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.45.1/node_modules/@rollup/plugin-terser/dist/es/index.js";
import { defineConfig } from "file:///E:/Proj/ming-ui/node_modules/.pnpm/vite@5.4.19_@types+node@20.19.9_terser@5.43.1/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import { readdirSync, readdir } from "fs";
import { delay, defer, filter, map } from "file:///E:/Proj/ming-ui/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import vue from "file:///E:/Proj/ming-ui/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vi_73ed8d232b50ec5beb0825e61f19602f/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///E:/Proj/ming-ui/node_modules/.pnpm/vite-plugin-dts@3.9.1_@type_30c892e77eb671512391928aa9a0dff9/node_modules/vite-plugin-dts/dist/index.mjs";
import shell2 from "file:///E:/Proj/ming-ui/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";

// hooksPlugin.ts
import { each, isFunction } from "file:///E:/Proj/ming-ui/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell from "file:///E:/Proj/ming-ui/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}

// vite.es.config.ts
import terser from "file:///E:/Proj/ming-ui/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.45.1/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "E:\\Proj\\ming-ui\\packages\\core";
var TRY_MOVE_STYLES_DELAY = 800;
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell2.mv("./dist/es/theme", "./dist"));
  });
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    }),
    hooksPlugin({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        //删除console.log
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        //压缩次数
        passes: isProd ? 4 : 1,
        //条件编译
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        //变量丑化
        toplevel: isProd,
        //函数丑化
        eval: isProd,
        //开发环境不丑化
        keep_classnames: isDev,
        keep_fnames: isDev
      }
    })
  ],
  build: {
    outDir: "dist/es",
    // minify: false,
    minify: "terser",
    cssCodeSplit: true,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "baize-ui",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawsome/fontawesome-svg-core",
        "@fortawsome/free-solid-svg-icons",
        "@fortawsome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (assetInfo.type === "asset" && /\.(css)$/i.test(assetInfo.name)) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("src/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
            return "utils";
          }
          for (const dirName of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName;
            }
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiLCAiaG9va3NQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxQcm9qXFxcXG1pbmctdWlcXFxccGFja2FnZXNcXFxcY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUHJvalxcXFxtaW5nLXVpXFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1Byb2ovbWluZy11aS9wYWNrYWdlcy9jb3JlL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgdGVyc2VyIH0gZnJvbSAnQHJvbGx1cC9wbHVnaW4tdGVyc2VyJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IHJlYWRkaXJTeW5jLCByZWFkZGlyIH0gZnJvbSBcImZzXCI7XHJcbmltcG9ydCB7IGRlbGF5LCBkZWZlciwgZmlsdGVyLCBtYXAgfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiXHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xyXG5pbXBvcnQgc2hlbGwgZnJvbSBcInNoZWxsanNcIjtcclxuaW1wb3J0IGhvb2tzIGZyb20gXCIuL2hvb2tzUGx1Z2luXCI7XHJcbmltcG9ydCB0ZXJzZXIgZnJvbSBcIkByb2xsdXAvcGx1Z2luLXRlcnNlclwiO1xyXG5cclxuY29uc3QgVFJZX01PVkVfU1RZTEVTX0RFTEFZID0gODAwIGFzIGNvbnN0O1xyXG5cclxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiO1xyXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCI7XHJcbmNvbnN0IGlzVGVzdCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInRlc3RcIjtcclxuXHJcbmZ1bmN0aW9uIGdldERpcmVjdG9yaWVzU3luYyhiYXNlUGF0aDogc3RyaW5nKSB7XHJcbiAgY29uc3QgZW50cmllcyA9IHJlYWRkaXJTeW5jKGJhc2VQYXRoLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XHJcblxyXG4gIHJldHVybiBtYXAoXHJcbiAgICBmaWx0ZXIoZW50cmllcywgKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKSxcclxuICAgIChlbnRyeSkgPT4gZW50cnkubmFtZVxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmVTdHlsZXMoKSB7XHJcbiAgcmVhZGRpcihcIi4vZGlzdC9lcy90aGVtZVwiLCAoZXJyKSA9PiB7XHJcbiAgICBpZiAoZXJyKSByZXR1cm4gZGVsYXkobW92ZVN0eWxlcywgVFJZX01PVkVfU1RZTEVTX0RFTEFZKTtcclxuICAgIGRlZmVyKCgpID0+IHNoZWxsLm12KFwiLi9kaXN0L2VzL3RoZW1lXCIsIFwiLi9kaXN0XCIpKTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdnVlKCksIFxyXG4gICAgICAgIGR0cyh7XHJcbiAgICAgICAgICAgIHRzY29uZmlnUGF0aDogJy4uLy4uL3RzY29uZmlnLmJ1aWxkLmpzb24nLFxyXG4gICAgICAgICAgICBvdXREaXI6ICdkaXN0L3R5cGVzJyxcclxuICAgICAgICB9KSxcclxuICAgICAgICBob29rcyh7XHJcbiAgICAgICAgICAgIHJtRmlsZXM6IFtcIi4vZGlzdC9lc1wiLCBcIi4vZGlzdC90aGVtZVwiLCBcIi4vZGlzdC90eXBlc1wiXSxcclxuICAgICAgICAgICAgYWZ0ZXJCdWlsZDogbW92ZVN0eWxlcyxcclxuICAgICAgICB9KSxcclxuICAgIHRlcnNlcih7XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgc2VxdWVuY2VzOiBpc1Byb2QsXHJcbiAgICAgICAgYXJndW1lbnRzOiBpc1Byb2QsXHJcbiAgICAgICAgLy9cdTUyMjBcdTk2NjRjb25zb2xlLmxvZ1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogaXNQcm9kICYmIFtcImxvZ1wiXSxcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiBpc1Byb2QsXHJcbiAgICAgICAgLy9cdTUzOEJcdTdGMjlcdTZCMjFcdTY1NzBcclxuICAgICAgICBwYXNzZXM6IGlzUHJvZCA/IDQgOiAxLFxyXG4gICAgICAgIC8vXHU2NzYxXHU0RUY2XHU3RjE2XHU4QkQxXHJcbiAgICAgICAgZ2xvYmFsX2RlZnM6IHtcclxuICAgICAgICAgIFwiQERFVlwiOiBKU09OLnN0cmluZ2lmeShpc0RldiksXHJcbiAgICAgICAgICBcIkBQUk9EXCI6IEpTT04uc3RyaW5naWZ5KGlzUHJvZCksXHJcbiAgICAgICAgICBcIkBURVNUXCI6IEpTT04uc3RyaW5naWZ5KGlzVGVzdCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgZm9ybWF0OiB7XHJcbiAgICAgICAgc2VtaWNvbG9uczogZmFsc2UsXHJcbiAgICAgICAgc2hvcnRoYW5kOiBpc1Byb2QsXHJcbiAgICAgICAgYnJhY2VzOiAhaXNQcm9kLFxyXG4gICAgICAgIGJlYXV0aWZ5OiAhaXNQcm9kLFxyXG4gICAgICAgIGNvbW1lbnRzOiAhaXNQcm9kLFxyXG4gICAgICB9LFxyXG4gICAgICBtYW5nbGU6IHtcclxuICAgICAgICAvL1x1NTNEOFx1OTFDRlx1NEUxMVx1NTMxNlxyXG4gICAgICAgIHRvcGxldmVsOiBpc1Byb2QsXHJcbiAgICAgICAgLy9cdTUxRkRcdTY1NzBcdTRFMTFcdTUzMTZcclxuICAgICAgICBldmFsOiBpc1Byb2QsXHJcbiAgICAgICAgLy9cdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMERcdTRFMTFcdTUzMTZcclxuICAgICAgICBrZWVwX2NsYXNzbmFtZXM6IGlzRGV2LFxyXG4gICAgICAgIGtlZXBfZm5hbWVzOiBpc0RldixcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG5dLFxyXG4gICAgYnVpbGQ6e1xyXG4gICAgICAgIG91dERpcjogJ2Rpc3QvZXMnLFxyXG4gICAgICAgIC8vIG1pbmlmeTogZmFsc2UsXHJcbiAgICAgICAgbWluaWZ5OiBcInRlcnNlclwiLFxyXG4gICAgICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcclxuICAgICAgICBsaWI6IHtcclxuICAgICAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9pbmRleC50cycpLFxyXG4gICAgICAgICAgICBuYW1lOiAnYmFpemUtdWknLFxyXG4gICAgICAgICAgICBmaWxlTmFtZTogJ2luZGV4JyxcclxuICAgICAgICAgICAgZm9ybWF0czogWydlcyddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAgICAgICAnQGZvcnRhd3NvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnLFxyXG4gICAgICAgICAgICAgICAgXCJAZm9ydGF3c29tZS9mcmVlLXNvbGlkLXN2Zy1pY29uc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJAZm9ydGF3c29tZS92dWUtZm9udGF3ZXNvbWVcIixcclxuICAgICAgICAgICAgICAgIFwiQHBvcHBlcmpzL2NvcmVcIixcclxuICAgICAgICAgICAgICAgIFwiYXN5bmMtdmFsaWRhdG9yXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUgPT09ICdzdHlsZS5jc3MnKSByZXR1cm4gJ2luZGV4LmNzcyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NldEluZm8udHlwZSA9PT0gXCJhc3NldFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC9cXC4oY3NzKSQvaS50ZXN0KGFzc2V0SW5mby5uYW1lIGFzIHN0cmluZylcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGhlbWUvW25hbWVdLltleHRdXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnc3JjL2hvb2tzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiaG9va3NcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi9wYWNrYWdlcy91dGlsc1wiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcInBsdWdpbi12dWU6ZXhwb3J0LWhlbHBlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ1dGlsc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRpck5hbWUgb2YgZ2V0RGlyZWN0b3JpZXNTeW5jKFwiLi4vY29tcG9uZW50c1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoYC9wYWNrYWdlcy9jb21wb25lbnRzLyR7ZGlyTmFtZX1gKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxQcm9qXFxcXG1pbmctdWlcXFxccGFja2FnZXNcXFxcY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUHJvalxcXFxtaW5nLXVpXFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcaG9va3NQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1Byb2ovbWluZy11aS9wYWNrYWdlcy9jb3JlL2hvb2tzUGx1Z2luLnRzXCI7aW1wb3J0IHsgZWFjaCwgaXNGdW5jdGlvbiB9IGZyb20gXCJsb2Rhc2gtZXNcIjtcclxuaW1wb3J0IHNoZWxsIGZyb20gXCJzaGVsbGpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBob29rc1BsdWdpbih7XHJcbiAgcm1GaWxlcyA9IFtdLFxyXG4gIGJlZm9yZUJ1aWxkLFxyXG4gIGFmdGVyQnVpbGQsXHJcbn06IHtcclxuICBybUZpbGVzPzogc3RyaW5nW107XHJcbiAgYmVmb3JlQnVpbGQ/OiBGdW5jdGlvbjtcclxuICBhZnRlckJ1aWxkPzogRnVuY3Rpb247XHJcbn0pe1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBcImhvb2tzLXBsdWdpblwiLFxyXG4gICAgYnVpbGRTdGFydCgpIHtcclxuICAgICAgZWFjaChybUZpbGVzLCAoZk5hbWUpID0+IHNoZWxsLnJtKFwiLXJmXCIsIGZOYW1lKSk7XHJcbiAgICAgIGlzRnVuY3Rpb24oYmVmb3JlQnVpbGQpICYmIGJlZm9yZUJ1aWxkKCk7XHJcbiAgICB9LFxyXG4gICAgYnVpbGRFbmQoZXJyPzogRXJyb3IpIHtcclxuICAgICAgIWVyciAmJiBpc0Z1bmN0aW9uKGFmdGVyQnVpbGQpICYmIGFmdGVyQnVpbGQoKTtcclxuICAgIH0sXHJcbiAgfTtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVIsT0FBdUI7QUFDaFQsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsYUFBYSxlQUFlO0FBQ3JDLFNBQVMsT0FBTyxPQUFPLFFBQVEsV0FBVztBQUMxQyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU9BLFlBQVc7OztBQ1BpUSxTQUFTLE1BQU0sa0JBQWtCO0FBQ3BULE9BQU8sV0FBVztBQUVILFNBQVIsWUFBNkI7QUFBQSxFQUNsQyxVQUFVLENBQUM7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUNGLEdBSUU7QUFDQSxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQ1gsV0FBSyxTQUFTLENBQUMsVUFBVSxNQUFNLEdBQUcsT0FBTyxLQUFLLENBQUM7QUFDL0MsaUJBQVcsV0FBVyxLQUFLLFlBQVk7QUFBQSxJQUN6QztBQUFBLElBQ0EsU0FBUyxLQUFhO0FBQ3BCLE9BQUMsT0FBTyxXQUFXLFVBQVUsS0FBSyxXQUFXO0FBQUEsSUFDL0M7QUFBQSxFQUNGO0FBQ0Y7OztBRGJBLE9BQU8sWUFBWTtBQVRuQixJQUFNLG1DQUFtQztBQVd6QyxJQUFNLHdCQUF3QjtBQUU5QixJQUFNLFNBQVMsUUFBUSxJQUFJLGFBQWE7QUFDeEMsSUFBTSxRQUFRLFFBQVEsSUFBSSxhQUFhO0FBQ3ZDLElBQU0sU0FBUyxRQUFRLElBQUksYUFBYTtBQUV4QyxTQUFTLG1CQUFtQixVQUFrQjtBQUM1QyxRQUFNLFVBQVUsWUFBWSxVQUFVLEVBQUUsZUFBZSxLQUFLLENBQUM7QUFFN0QsU0FBTztBQUFBLElBQ0wsT0FBTyxTQUFTLENBQUMsVUFBVSxNQUFNLFlBQVksQ0FBQztBQUFBLElBQzlDLENBQUMsVUFBVSxNQUFNO0FBQUEsRUFDbkI7QUFDRjtBQUVBLFNBQVMsYUFBYTtBQUNwQixVQUFRLG1CQUFtQixDQUFDLFFBQVE7QUFDbEMsUUFBSSxJQUFLLFFBQU8sTUFBTSxZQUFZLHFCQUFxQjtBQUN2RCxVQUFNLE1BQU1DLE9BQU0sR0FBRyxtQkFBbUIsUUFBUSxDQUFDO0FBQUEsRUFDbkQsQ0FBQztBQUNIO0FBR0EsSUFBTyx5QkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLE1BQ0EsY0FBYztBQUFBLE1BQ2QsUUFBUTtBQUFBLElBQ1osQ0FBQztBQUFBLElBQ0QsWUFBTTtBQUFBLE1BQ0YsU0FBUyxDQUFDLGFBQWEsZ0JBQWdCLGNBQWM7QUFBQSxNQUNyRCxZQUFZO0FBQUEsSUFDaEIsQ0FBQztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsVUFBVTtBQUFBLFFBQ1IsV0FBVztBQUFBLFFBQ1gsV0FBVztBQUFBO0FBQUEsUUFFWCxjQUFjLFVBQVUsQ0FBQyxLQUFLO0FBQUEsUUFDOUIsZUFBZTtBQUFBO0FBQUEsUUFFZixRQUFRLFNBQVMsSUFBSTtBQUFBO0FBQUEsUUFFckIsYUFBYTtBQUFBLFVBQ1gsUUFBUSxLQUFLLFVBQVUsS0FBSztBQUFBLFVBQzVCLFNBQVMsS0FBSyxVQUFVLE1BQU07QUFBQSxVQUM5QixTQUFTLEtBQUssVUFBVSxNQUFNO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixXQUFXO0FBQUEsUUFDWCxRQUFRLENBQUM7QUFBQSxRQUNULFVBQVUsQ0FBQztBQUFBLFFBQ1gsVUFBVSxDQUFDO0FBQUEsTUFDYjtBQUFBLE1BQ0EsUUFBUTtBQUFBO0FBQUEsUUFFTixVQUFVO0FBQUE7QUFBQSxRQUVWLE1BQU07QUFBQTtBQUFBLFFBRU4saUJBQWlCO0FBQUEsUUFDakIsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDSSxPQUFNO0FBQUEsSUFDRixRQUFRO0FBQUE7QUFBQSxJQUVSLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxJQUNkLEtBQUs7QUFBQSxNQUNELE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDdEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNsQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ1gsVUFBVTtBQUFBLFFBQ047QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0o7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNKLGdCQUFnQixDQUFDLGNBQWM7QUFDM0IsY0FBSSxVQUFVLFNBQVMsWUFBYSxRQUFPO0FBQzNDLGNBQ0ksVUFBVSxTQUFTLFdBQ25CLFlBQVksS0FBSyxVQUFVLElBQWMsR0FDM0M7QUFDRSxtQkFBTztBQUFBLFVBQ1g7QUFDQSxpQkFBTyxVQUFVO0FBQUEsUUFDckI7QUFBQSxRQUNBLGFBQWEsSUFBSTtBQUNiLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUM3QixtQkFBTztBQUFBLFVBQ1g7QUFDQSxjQUFJLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDMUIsbUJBQU87QUFBQSxVQUNYO0FBQ0EsY0FDSSxHQUFHLFNBQVMsaUJBQWlCLEtBQzdCLEdBQUcsU0FBUywwQkFBMEIsR0FDeEM7QUFDRSxtQkFBTztBQUFBLFVBQ1g7QUFDQSxxQkFBVyxXQUFXLG1CQUFtQixlQUFlLEdBQUc7QUFDdkQsZ0JBQUksR0FBRyxTQUFTLHdCQUF3QixPQUFPLEVBQUUsR0FBRztBQUNwRCxxQkFBTztBQUFBLFlBQ1A7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbInNoZWxsIiwgInNoZWxsIl0KfQo=
