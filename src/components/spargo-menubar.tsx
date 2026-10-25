import {
  BatteryMedium,
  BedDouble,
  CircleHelp,
  ClipboardList,
  Gauge,
  Keyboard,
  RectangleHorizontal,
  Rows3,
  Scaling,
  SunMoon,
  Timer,
  Wifi,
} from 'lucide-react'
import SpargoIcon from './spargo-icon'

// One tile per built-in app, mirroring the icon row on spargo.app.
const APPS = [
  Rows3,
  Scaling,
  Keyboard,
  RectangleHorizontal,
  SunMoon,
  ClipboardList,
  BedDouble,
  Timer,
  Gauge,
  CircleHelp,
]

export default function SpargoMenubar() {
  return (
    <div className="relative h-[340px] md:h-[400px] rounded-[28px] overflow-hidden ring-1 ring-white/10 bg-[#0b0b0d]">
      {/* Wallpaper */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_100%,rgba(79,172,254,0.28),transparent_70%),radial-gradient(50%_70%_at_85%_90%,rgba(168,85,247,0.3),transparent_70%)]"
      />

      {/* Menubar */}
      <div className="relative h-8 px-4 flex items-center justify-end gap-4 bg-white/[0.06] backdrop-blur-md text-white/70 text-[12px] font-medium">
        <Wifi size={14} />
        <BatteryMedium size={16} />
        <span className="grid place-items-center size-6 rounded-md bg-white/15">
          <SpargoIcon size={13} />
        </span>
        <span>Mon 9:41</span>
      </div>

      {/* Spargo panel */}
      <div className="absolute top-11 right-3 md:right-16 w-[min(320px,calc(100%-24px))] rounded-2xl bg-[#26262a]/85 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] p-3">
        <div className="flex items-center justify-between px-1 pb-3 text-[12px]">
          <span className="flex items-center gap-2 text-white font-medium">
            <SpargoIcon size={14} />
            Spargo
          </span>
          <span className="text-white/40">10 apps</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {APPS.map((Icon, i) => (
            <div
              key={i}
              className="aspect-square grid place-items-center rounded-xl bg-white/[0.06] text-white/80 transition-colors hover:bg-white/[0.12]"
            >
              <Icon size={18} strokeWidth={1.6} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
