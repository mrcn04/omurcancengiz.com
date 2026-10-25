interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  description?: string
  as?: 'h1' | 'h2'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  as: Tag = 'h2',
  className = '',
}: SectionHeadingProps) {
  return (
    <div data-animate className={`${Tag === 'h1' ? 'max-w-5xl' : 'max-w-3xl'} ${className}`}>
      <p className="mb-4 text-[14px] font-semibold tracking-[-0.01em] text-[#86868b]">{eyebrow}</p>
      <Tag
        className={`font-semibold tracking-[-0.025em] text-[#1d1d1f] text-balance ${
          Tag === 'h1'
            ? 'text-[clamp(2.75rem,5.6vw,4.25rem)] leading-[1.04]'
            : 'text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.06]'
        }`}
      >
        {title}
        {subtitle && <span className="block text-[#86868b]">{subtitle}</span>}
      </Tag>
      {description && (
        <p className="mt-8 max-w-2xl text-[19px] leading-[1.5] tracking-[-0.01em] text-[#86868b] text-pretty">
          {description}
        </p>
      )}
    </div>
  )
}
