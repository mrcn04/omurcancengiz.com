interface ISocials {
  url: string
  icon: string
}

const SOCIAL_LINKS: ISocials[] = [
  {
    url: 'https://tr.linkedin.com/in/omurcancengiz',
    icon: 'fab fa-linkedin',
  },
  {
    url: 'https://github.com/mrcn04',
    icon: 'fab fa-github',
  },
  {
    url: 'https://stackoverflow.com/users/8937209/%c3%96m%c3%bcrcan-cengiz',
    icon: 'fab fa-stack-overflow',
  },
]

export { SOCIAL_LINKS, ISocials }
