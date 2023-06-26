import React from 'react'
import { SOCIAL_LINKS, ISocial } from '../utils/constants'
import SpargoIcon from './spargo-icon'

function SocialLinks() {
  return (
    <ul className="social">
      {SOCIAL_LINKS.map((social: ISocial) => (
        <li key={social.id}>
          <a href={social.url} id={social.name} aria-label={social.name} target="_blank">
            <i className={social.icon} />
          </a>
        </li>
      ))}
      <li style={{ marginTop: '1px' }}>
        <a href="https://spargo.app" id="spargo" aria-label="spargo" target="_blank">
          <i>
            <SpargoIcon />
          </i>
        </a>
      </li>
    </ul>
  )
}

export default SocialLinks
