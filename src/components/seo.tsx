import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import wallpaper from '../images/omur-bg.webp'

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
            siteUrl
            keywords
          }
        }
      }
    `
  )

  const metaDescription: string = description || site.siteMetadata.description
  const defaultTitle: string = site.siteMetadata?.title
  const keywords: Array<string> | string = site.siteMetadata.keywords
  const previewImage: string = `${site.siteMetadata.siteUrl}/${wallpaper}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
        prefix: 'og: http://ogp.me/ns#',
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | Founder & Developer` : undefined}
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
          name: `keywords`,
          content: typeof keywords === 'string' ? keywords : keywords.join(','),
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
          content: site.siteMetadata.siteUrl,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: previewImage,
        },
        {
          property: `image`,
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
