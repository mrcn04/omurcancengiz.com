require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `omurcancengiz.com`,
    description: `Ömürcan Cengiz, Founder & Developer`,
    author: `Ömürcan Cengiz`,
    siteUrl: `https://www.omurcancengiz.com`,
    keywords: `ömürcan, cengiz, ömürcan cengiz, omurcan, cengiz, omurcan cengiz, ömürcancengiz, omurcancengiz, software developer, fullstack, developer`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ömürcan Cengiz, Founder & Developer`,
        short_name: `Ömürcan Cengiz`,
        start_url: `/`,
        background_color: `#19191A`,
        display: `minimal-ui`,
        icon: `src/images/android-chrome-256x256.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GOOGLE_GTAG],
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
}
