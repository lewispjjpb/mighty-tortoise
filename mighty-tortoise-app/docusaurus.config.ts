import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Influenza A Wastewater Sampling',
  tagline: 'One Resource.  All Answers.',
  favicon: 'img/lab-svgrepo-com.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://dash-epi.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/mighty-tortoise/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lewispjjpb', // Usually your GitHub org/user name.
  projectName: 'mighty-tortoise', // Usually your repo name.
  onBrokenLinks: 'throw',
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    () => ({
      name: 'inject-docsbot',
      injectHtmlTags() {
        return {
          postBodyTags: [
            {
              tagName: 'script',
              innerHTML: `
                window.DocsBotAI=window.DocsBotAI||{},DocsBotAI.init=function(c){return new Promise((e,o)=>{var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://widget.docsbot.ai/chat.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n),t.addEventListener("load",()=>{Promise.all([new Promise((e,o)=>{window.DocsBotAI.mount(Object.assign({},c)).then(e).catch(o)}),(function n(t){return new Promise(e=>{if(document.querySelector(t))return e(document.querySelector(t));var o=new MutationObserver(n=>{if(document.querySelector(t))return e(document.querySelector(t)),o.disconnect()});o.observe(document.body,{childList:!0,subtree:!0})})})("#docsbotai-root")]).then(()=>e()).catch(o)}),t.addEventListener("error",e=>{o(e.message)})})};
                DocsBotAI.init({ id: "2MoUbK6wIOmmceij8jdr/f4PZp4ZjbMR2NAl0gsA0" });
              `,
            },
          ],
        };
      },
    }),
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Home',
      logo: {
        alt: 'My Site Logo',
        src: 'img/lab-svgrepo-com.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'epidemiologySidebar',
          position: 'left',
          label: 'Dashboard',
          href: '/dashboards/summary-statistics',
        },
        {
          type: 'docSidebar',
          sidebarId: 'epidemiologySidebar',
          position: 'left',
          label: 'Documentation',
        },
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/lewispjjpb/mighty-tortoise',
          label: "Visit this demo's GitHub repo",
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          versions: {
            current: { label: 'Draft' },
            '1.1.0': { label: 'Version 1.1.0' },
            '1.0.0': { label: 'Version 1.0.0' },
          },
        },
      ],
    },
    footer: {
      style: 'dark',

      copyright: `Pretend Copyright © ${new Date().getFullYear()} Mighty Tortoise, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
