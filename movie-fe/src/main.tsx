// import React
import React from 'react'
// import ReactDOM to mount the app
import ReactDOM from 'react-dom/client'
// import our root app
import App from './App.tsx'
// import global styles (Tailwind + overrides)
import './index.css'

// mount the app in the #root element with strict mode for DX
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
