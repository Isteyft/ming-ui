import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
// import apiTable from "vitepress-api-table";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Baize-UI",
  description: "BaizeUI",
  base: '/baize-ui/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
      // md.use(apiTable)
    },
  },
})
