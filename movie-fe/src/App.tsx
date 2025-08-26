// import our ThemeProvider to enable dark mode across app
import { ThemeProvider } from './theme/ThemeProvider'
// import the main page
import Home from './pages/Home'

// export the root component
export default function App() {
  // wrap the app in ThemeProvider so child components can toggle theme
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  )
}
