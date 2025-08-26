// import React primitives
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

// define a context shape for theme control
type ThemeContextValue = {
  // whether the current theme is dark
  dark: boolean
  // toggle function to flip themes
  toggle: () => void
}

// create the context with a placeholder (we’ll provide real value in the provider)
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

// define a key for localStorage persistence
const STORAGE_KEY = 'movie_fe_theme'

// provider component to wrap the app and manage theme state
export function ThemeProvider({ children }: { children: ReactNode }) {
  // state to track “is dark mode”
  const [dark, setDark] = useState<boolean>(false)

  // on first mount, read user/system preference
  useEffect(() => {
    // check localStorage first
    const saved = localStorage.getItem(STORAGE_KEY)
    // if saved exists, use it
    if (saved === 'dark') setDark(true)
    else if (saved === 'light') setDark(false)
    else {
      // otherwise, use system preference via CSS media query
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
      setDark(prefersDark)
    }
  }, [])

  // whenever dark changes, reflect on <html> and persist in storage
  useEffect(() => {
    // pick the document element (root)
    const root = document.documentElement
    // add or remove the “dark” class
    root.classList.toggle('dark', dark)
    // persist the choice
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  }, [dark])

  // memoize the context value to avoid extra renders
  const value = useMemo<ThemeContextValue>(() => ({
    dark,
    toggle: () => setDark(prev => !prev),
  }), [dark])

  // render context provider with children
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// hook to access the theme context
export function useTheme() {
  // read the context
  const ctx = useContext(ThemeContext)
  // if used outside provider, throw a friendly error
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  // otherwise return it
  return ctx
}
