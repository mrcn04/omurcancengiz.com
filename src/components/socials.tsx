import React from 'react'
import { SOCIAL_LINKS, ISocials } from '../utils/constants'
import SpargoIcon from './spargo-icon'

const SocialLinks: React.FC = () => {
  return (
    <>
      <ul className="social" style={{ marginBottom: 0 }}>
        {SOCIAL_LINKS.map((social: ISocials) => (
          <li key={social.id}>
            <a href={social.url} id={social.name} aria-label={social.name} target="_blank">
              <i className={social.icon} />
            </a>
          </li>
        ))}
        <li>
          <a href="https://spargo.app" id="spargo" aria-label="spargo" target="_blank">
            <i>
              <SpargoIcon />
            </i>
          </a>
        </li>
      </ul>
    </>
  )
}

export default SocialLinks
