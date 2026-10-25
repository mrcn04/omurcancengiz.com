import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ScrollReveal from '@/components/scroll-reveal'
import './css/main.css'
import './css/animations.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Ömürcan Cengiz | Designer, Developer & Founder',
  description: 'Ömürcan Cengiz — designer, developer, and founder of Spargo.',
  authors: [{ name: 'Ömürcan Cengiz' }],
  keywords: [
    'ömürcan',
    'cengiz',
    'ömürcan cengiz',
    'omurcan',
    'omurcan cengiz',
    'ömürcancengiz',
    'omurcancengiz',
    'software developer',
    'fullstack',
    'developer',
    'designer',
    'product designer',
  ],
  metadataBase: new URL('https://www.omurcancengiz.com'),
  openGraph: {
    title: 'Ömürcan Cengiz',
    description: 'Ömürcan Cengiz — designer, developer, and founder of Spargo.',
    url: 'https://www.omurcancengiz.com',
    type: 'website',
    images: [{ url: '/omur-bg.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ömürcan Cengiz',
    description: 'Ömürcan Cengiz — designer, developer, and founder of Spargo.',
    images: ['/omur-bg.webp'],
    creator: 'Ömürcan Cengiz',
  },
}

const GTAG_ID = process.env.NEXT_PUBLIC_GOOGLE_GTAG

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {GTAG_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GTAG_ID}');
              `}
            </Script>
          </>
        )}
        <Navbar />
        <ScrollReveal />
        {children}
        <Footer />
      </body>
    </html>
  )
}
