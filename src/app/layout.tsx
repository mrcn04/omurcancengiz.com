import type { Metadata } from 'next'
import { Montserrat, Quicksand, Geist } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { cn } from '@/lib/utils'
import './css/main.css'
import './css/animations.css'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ömürcan Cengiz | Founder & Developer',
  description: 'Ömürcan Cengiz, Founder & Developer',
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
  ],
  metadataBase: new URL('https://www.omurcancengiz.com'),
  openGraph: {
    title: 'Ömürcan Cengiz',
    description: 'Ömürcan Cengiz, Founder & Developer',
    url: 'https://www.omurcancengiz.com',
    type: 'website',
    images: [{ url: '/omur-bg.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ömürcan Cengiz',
    description: 'Ömürcan Cengiz, Founder & Developer',
    images: ['/omur-bg.webp'],
    creator: 'Ömürcan Cengiz',
  },
}

const GTAG_ID = process.env.NEXT_PUBLIC_GOOGLE_GTAG

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(quicksand.variable, montserrat.variable, 'font-sans', geist.variable)}>
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
        <Script
          src="https://use.fontawesome.com/releases/v5.0.0/js/all.js"
          strategy="afterInteractive"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
