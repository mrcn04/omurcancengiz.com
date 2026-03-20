'use client'

import React, { useState, useEffect } from 'react'
import SocialLinks from '../components/socials'

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const img = new window.Image()
    img.src = '/omur.webp'
    img.onload = () => {
      const picture = document.getElementById('picture')
      picture?.classList.add('is-loaded')
    }
  }, [])

  return (
    <div className="content">
      <aside className="side">
        <figure id="picture" className="picture">
          <img
            id="pictureImage"
            className="picture-image"
            srcSet="/omur-mobile.webp 480w, /omur.webp 800w"
            sizes="(max-width: 600px) 480px, 800px"
            src="/omur.webp"
            alt="Portrait of Ömürcan Cengiz"
            width={400}
            height={600}
          />
        </figure>
      </aside>
      <main className="about">
        <h1 className="name">Hi, I&apos;m Ömürcan Cengiz</h1>
        <p className="job">Founder &amp; Developer</p>
        <hr className="hr" />
        <div className="description">
          <p className="summary">
            A seasoned full stack developer with over half a decade of experience. Living the irony
            of being an old soul while infusing my work with a timeless touch. Love creating stuff
            that makes people&apos;s lives more creative and less annoying.
          </p>
        </div>
        <div className="contact">
          <a className="button" href="mailto:omurccengiz@gmail.com">
            Get in touch
          </a>
        </div>
        {loaded ? <SocialLinks /> : <div style={{ height: '56px' }} />}
      </main>
    </div>
  )
}
