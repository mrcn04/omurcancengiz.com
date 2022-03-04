import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import wallpaperPng from '../images/omur-bg.png'
import wallpaperWebp from '../images/omur-bg.webp'

interface ISeoProps {
  description?: string
  lang?: string
  meta?: Array<{ name: string; content: string }>
  title: string
}

function Seo({ description = '', lang = 'en', meta = [], title }: ISeoProps) {
  const { site }: any = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription: string = description || site.siteMetadata.description
  const defaultTitle: string = site.siteMetadata?.title
  const previewImage: string = `https://www.omurcancengiz.com/${wallpaperPng || wallpaperWebp}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | Software Developer` : undefined}
      meta={[
        {
          name: `author`,
          content: site.siteMetadata?.author,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: `https://www.omurcancengiz.com`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          name: 'image',
          content: previewImage,
        },
        {
          property: `og:image:secure_url`,
          content: previewImage,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: previewImage,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <script defer src="https://use.fontawesome.com/releases/v5.0.0/js/all.js"></script>
    </Helmet>
  )
}

export default Seo
