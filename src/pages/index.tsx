import * as React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'
import SocialLinks from '../components/socials'

import '../css/main.css'
import '../css/animations.css'
import image from '../images/omur3.webp'
type IDocumentType = HTMLElement | HTMLMediaElement | null

const IndexPage: React.FC = () => {
  function loadImage(id: string, targetId?: string) {
    let el: HTMLMediaElement = document.getElementById(id) as HTMLMediaElement
    let targetEl: IDocumentType = targetId ? document.getElementById(targetId) : el
    let imageToLoad: string

    if (el?.dataset.image) {
      imageToLoad = el?.dataset.image
    } else if (!el?.currentSrc) {
      imageToLoad = el?.src
    } else {
      imageToLoad = el?.currentSrc
    }

    if (imageToLoad) {
      let img = new Image()
      img.src = imageToLoad
      img.onload = () => {
        targetEl!.classList.add('is-loaded')
      }
    }
  }

  React.useEffect((): void => {
    // loadImage('wallpaper')
    loadImage('pictureImage', 'picture')
  }, [])

  return (
    <Layout>
      <Seo title="Ömürcan Cengiz" />
      {/* <div id="wallpaper" className="wallpaper" data-image={wallpaper} /> */}
      <div className="content">
        <aside className="side">
          <figure id="picture" className="picture">
            {/* <div className="picture-shadow"></div> */}
            <img
              id="pictureImage"
              className="picture-image"
              src={image}
              alt="Portrait of Ömürcan Cengiz"
            />
          </figure>
        </aside>
        <main className="about">
          <h1 className="name">Hi, I'm Ömürcan Cengiz</h1>
          <p className="job">Founder & Developer</p>
          <hr className="hr" />
          <div className="description">
            <p className="summary">
              C, Go, Typescript, Swift. A seasoned full stack developer with over half a decade of
              experience. Living the irony of being an old soul while infusing my work with a
              timeless touch. Love creating stuff that makes people's lives more efficient and less
              annoying.
            </p>
            {/* <p className="summary">
              Full stack Typescript and Go developer. Mostly writing UI's with React & Vue, creating
              mobile apps with React Native and developing scalable backends with NodeJS & Go.
            </p> */}
          </div>
          <div className="contact">
            <a className="button" href="mailto:omurccengiz@gmail.com">
              {' '}
              Get in touch{' '}
            </a>
            <SocialLinks />
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default IndexPage
