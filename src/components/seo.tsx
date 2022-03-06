import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
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
            previewImage
          }
        }
      }
    `
  )

  const metaDescription: string = description || site.siteMetadata.description
  const defaultTitle: string = site.siteMetadata?.title
  const keywords: Array<string> | string = site.siteMetadata.keywords
  const previewImage: string = `${site.siteMetadata.siteUrl}${site.siteMetadata.previewImage}`

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
