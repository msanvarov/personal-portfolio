import Favicon from 'assets/favicon.png';

const title = `Sal's Personal Portfolio`;
const description =
  'A website for Sal Anvarov, a full-stack developer with expertise in TS, ReasonML, Python, Go, and Kotlin.';

export const helmet = {
  title,
  htmlAttributes: { lang: 'en' },
  meta: [
    { name: 'description', content: description },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no',
    },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'msapplication-navbutton-color', content: '#000' },
    { name: 'msapplication-TileColor', content: '#000' },
    { name: 'theme-color', content: '#000' },

    { property: 'og:title', content: title },
    { property: 'og:image:width', content: '880px' },
    { property: 'og:image:height', content: '440px' },
    { property: 'og:image:alt', content: description },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: Favicon }],
};
