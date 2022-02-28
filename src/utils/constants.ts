interface ISocials {
  id: number
  url: string
  icon: string
}

const SOCIAL_LINKS: ISocials[] = [
  {
    id: 1,
    url: 'https://tr.linkedin.com/in/omurcancengiz',
    icon: 'fab fa-linkedin',
  },
  {
    id: 2,
    url: 'https://github.com/mrcn04',
    icon: 'fab fa-github',
  },
  {
    id: 3,
    url: 'https://stackoverflow.com/users/8937209/%c3%96m%c3%bcrcan-cengiz',
    icon: 'fab fa-stack-overflow',
  },
]

export { SOCIAL_LINKS, ISocials }
