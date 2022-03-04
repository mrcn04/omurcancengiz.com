import React from 'react'
import { SOCIAL_LINKS, ISocials } from '../utils/constants'

const SocialLinks: React.FC = () => {
  return (
    <>
      <ul className="social" style={{ marginBottom: 0 }}>
        {SOCIAL_LINKS.map((social: ISocials) => (
          <li key={social.id}>
            <a href={social.url} id={social.name} target="_blank">
              <i className={social.icon} />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SocialLinks
