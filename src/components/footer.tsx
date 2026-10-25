import { SOCIALS } from '@/utils/contact'

export default function Footer() {
  return (
    <footer className="max-w-[1080px] mx-auto px-6">
      <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#86868b]">
        <span>&copy; {new Date().getFullYear()} Ömürcan Cengiz</span>
        <div className="flex items-center gap-6">
          {SOCIALS.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1d1d1f] dark-page:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
