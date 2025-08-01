import { defineConfig } from "vite";
import { resolve } from 'path'
import { readdirSync, readdir } from "fs";
import { delay, defer, filter, map } from "lodash-es";
import { visualizer } from "rollup-plugin-visualizer";

import vue from "@vitejs/plugin-vue"
import dts from 'vite-plugin-dts'
import shell from "shelljs";
import hooks from "./hooksPlugin";
import terser from "@rollup/plugin-terser";

const TRY_MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
}


export default defineConfig({
    plugins: [
        vue(), 
        visualizer({
            filename: 'dist/stats.es.html',
        }),
        dts({
            tsconfigPath: '../../tsconfig.build.json',
            outDir: 'dist/types',
        }),
        hooks({
            rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
            afterBuild: moveStyles,
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
          "@TEST": JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        //变量丑化
        toplevel: isProd,
        //函数丑化
        eval: isProd,
        //开发环境不丑化
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
],
    build:{
        outDir: 'dist/es',
        // minify: false,
        minify: "terser",
        cssCodeSplit: true,
        lib: {
            entry: resolve(__dirname, '../index.ts'),
            name: 'baize-ui',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: [
                'vue',
                '@fortawsome/fontawesome-svg-core',
                "@fortawsome/free-solid-svg-icons",
                "@fortawsome/vue-fontawesome",
                "@popperjs/core",
                "async-validator",
            ],
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'index.css';
                    if (
                        assetInfo.type === "asset" &&
                        /\.(css)$/i.test(assetInfo.name as string)
                    ) {
                        return "theme/[name].[ext]";
                    }
                    return assetInfo.name as string;
                },
                manualChunks(id) { 
                    if (id.includes('node_modules')) {
                        return "vendor";
                    }
                    if (id.includes('src/hooks')) {
                        return "hooks";
                    }
                    if (
                        id.includes("/packages/utils") ||
                        id.includes("plugin-vue:export-helper")
                    ) {
                        return "utils";
                    }
                    for (const dirName of getDirectoriesSync("../components")) {
                        if (id.includes(`/packages/components/${dirName}`)) {
                        return dirName;
                        }
                    }
                },
            }
        }
    }
})