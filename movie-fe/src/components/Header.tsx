// import the theme toggle button
import ThemeToggle from './ThemeToggle'

// top navigation/header with title + theme toggle
export default function Header() {
  // render a sticky header with translucent background and border
  return (
    <header className="sticky top-0 z-10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur border-b border-gray-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* left: title/brand */}
        <div className="text-lg font-semibold tracking-tight">
          {/* use an emoji for friendly brand feel */}
          🎬 Movie Explorer
        </div>
        {/* right: the theme toggle */}
        <ThemeToggle />
      </div>
    </header>
  )
}
