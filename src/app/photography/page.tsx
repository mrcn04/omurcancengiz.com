import type { Metadata } from 'next'
import Gallery from '@/components/gallery'
import SectionHeading from '@/components/section-heading'
import { PHOTOS } from '@/utils/photos'

export const metadata: Metadata = {
  title: 'Photography — Ömürcan Cengiz',
  description: 'A collection of photographs by Ömürcan Cengiz.',
}

export default function PhotographyPage() {
  return (
    <section className="pt-36 md:pt-44 pb-28 md:pb-40">
      <div className="max-w-[1080px] mx-auto px-6">
        <SectionHeading
          as="h1"
          eyebrow="Photography"
          title="Through the lens."
          subtitle="Moments between lines of code."
          description="Street scenes, travel, and the quiet details of everyday life. Mostly on film."
          className="mb-14 md:mb-20"
        />
        <Gallery photos={PHOTOS} />
      </div>
    </section>
  )
}
