module.exports = {
  siteMetadata: {
    title: `omurcancengiz.com`,
    description: `Ömürcan Cengiz, Fullstack Developer`,
    author: `Ömürcan Cengiz`,
    siteUrl: `https://www.omurcancengiz.com`,
    keywords: `ömürcan, cengiz, ömürcan cengiz, omurcan, cengiz, omurcan cengiz, ömürcancengiz, omurcancengiz, software developer, fullstack, developer`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ömürcan Cengiz | Software Developer`,
        short_name: `Ömürcan Cengiz`,
        start_url: `/`,
        background_color: `#161618`,
        display: `minimal-ui`,
        icon: `src/images/android-chrome-256x256.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Quicksand`, `Montserrat`],
        display: 'swap',
      },
    },
  ],
}
