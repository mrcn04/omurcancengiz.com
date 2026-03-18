import * as React from 'react'
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
    <>
      <html lang={lang} />
      <title>{defaultTitle ? `${title} | Founder & Developer` : title}</title>
      <meta name="author" content={site.siteMetadata?.author} />
      <meta name="description" content={metaDescription} />
      <meta
        name="keywords"
        content={typeof keywords === 'string' ? keywords : keywords.join(',')}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={site.siteMetadata.siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={previewImage} />
      <meta property="image" content={previewImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={previewImage} />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {meta.map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}
      <script defer src="https://use.fontawesome.com/releases/v5.0.0/js/all.js" />
    </>
  )
}

export default Seo
