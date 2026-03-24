interface SpargoIconProps {
  size?: number
  color?: string
}

function SpargoIcon({ size = 18, color = '#fff' }: SpargoIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7.25" stroke={color} strokeWidth="1.5" />
      <line x1="8" y1="0.400049" x2="14" y2="0.400049" stroke={color} strokeWidth="0.8" />
      <line x1="2" y1="15.6" x2="8" y2="15.6" stroke={color} strokeWidth="0.8" />
      <rect x="4" y="2" width="1.5" height="12" fill={color} />
      <rect
        x="4"
        y="8.29907"
        width="1.5"
        height="11"
        transform="rotate(-60 4 8.29907)"
        fill={color}
      />
    </svg>
  )
}

export default SpargoIcon
