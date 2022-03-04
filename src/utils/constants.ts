interface ISocials {
  id: number
  name: string
  url: string
  icon: string
}

const SOCIAL_LINKS: ISocials[] = [
  {
    id: 1,
    name: 'linkedin',
    url: 'https://tr.linkedin.com/in/omurcancengiz',
    icon: 'fab fa-linkedin',
  },
  {
    id: 2,
    name: 'github',
    url: 'https://github.com/mrcn04',
    icon: 'fab fa-github',
  },
  {
    id: 3,
    name: 'stackoverflow',
    url: 'https://stackoverflow.com/users/8937209/%c3%96m%c3%bcrcan-cengiz',
    icon: 'fab fa-stack-overflow',
  },
]

export { SOCIAL_LINKS, ISocials }
