interface ISocial {
  id: number
  name: string
  url: string
  icon: string
}

const SOCIAL_LINKS: ISocial[] = [
  {
    id: 1,
    name: 'linkedin',
    url: 'https://tr.linkedin.com/in/omurcancengiz',
    icon: 'fab fa-linkedin',
  },
  {
    id: 2,
    name: 'twitter',
    url: 'https://twitter.com/omurcancengiz',
    icon: 'fab fa-twitter',
  },
  {
    id: 3,
    name: 'github',
    url: 'https://github.com/mrcn04',
    icon: 'fab fa-github',
  },
  {
    id: 4,
    name: 'product-hunt',
    url: 'https://www.producthunt.com/@omurcancengiz',
    icon: 'fab fa-product-hunt',
  },
]

export { SOCIAL_LINKS, ISocial }
