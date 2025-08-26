// import our theme hook
import { useTheme } from '../theme/ThemeProvider'

// simple toggle button that flips dark mode
export default function ThemeToggle() {
  // get dark flag and toggle function from context
  const { dark, toggle } = useTheme()
  // render a button that shows current state and flips on click
  return (
    <button
      onClick={toggle}
      className="rounded-xl border border-gray-300 dark:border-neutral-700 px-3 py-2 text-sm hover:shadow-soft transition"
      title="Toggle dark mode"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
