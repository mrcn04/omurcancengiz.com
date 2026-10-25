interface Photo {
  src: string
  thumb?: string
  alt: string
  width: number
  height: number
  caption?: string
  credit?: { name: string; href: string }
}

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format`

function placeholder(id: string, user: string, alt: string, width: number, height: number): Photo {
  return {
    src: unsplash(id, 2000),
    thumb: unsplash(id, 900),
    alt,
    width,
    height,
    credit: {
      name: `@${user}`,
      href: `https://unsplash.com/@${user}?utm_source=omurcancengiz&utm_medium=referral`,
    },
  }
}

// Placeholder photos from Unsplash until my own scans are ready.
// For my own: { src: '/photos/lisbon-01.jpg', alt: '…', width: 3, height: 4, caption: 'Lisbon, 2024' }
const PHOTOS: Photo[] = [
  placeholder(
    'photo-1761823398333-187f195deda2',
    'lawrnsky',
    'Bicycles parked in a narrow brick alleyway',
    400,
    268,
  ),
  placeholder(
    'photo-1767014732439-2f0049187b74',
    'chrisvomradio',
    'A man sitting in a chair on a narrow street',
    400,
    590,
  ),
  placeholder(
    'photo-1608609529987-6b0f453ba172',
    'wesley_squared',
    'Ocean waves in black and white',
    400,
    265,
  ),
  placeholder(
    'photo-1778092948604-e4fe080eeeb9',
    'bernhardbar',
    'Someone sitting on the steps of a narrow Italian street',
    400,
    603,
  ),
  placeholder(
    'photo-1643251476210-45fca99bf4b1',
    'saxon_white',
    'A man walking under an arch',
    400,
    600,
  ),
  placeholder(
    'photo-1758797851090-ce8961f77b4f',
    'tanyabarrow',
    'A coastal town along a sandy beach at sunset',
    400,
    265,
  ),
  placeholder(
    'photo-1760244348907-3e51b4ac0ffa',
    'realfish',
    'A small boat resting on a rocky shore at sunset',
    400,
    533,
  ),
  placeholder(
    'photo-1790701105511-6871a1e30953',
    'tanyabarrow',
    'A narrow street of pastel houses under an overcast sky',
    400,
    597,
  ),
  placeholder(
    'photo-1784908926896-ed602d9caa43',
    'kornyeir',
    'A calm sea and a small island at sunset',
    400,
    265,
  ),
  placeholder(
    'photo-1763496548557-b50a932fed69',
    'msttylcn',
    'A cyclist riding down a sunny street',
    400,
    604,
  ),
  placeholder(
    'photo-1685962890164-20bc1c7b4ab6',
    'kazaks',
    'A cobblestone street lined with tall buildings',
    400,
    603,
  ),
  placeholder(
    'photo-1783474845573-b83645b585ac',
    'kreibichh0434',
    'Dark, choppy water under a pale sky',
    400,
    265,
  ),
]

export { PHOTOS }
export type { Photo }
