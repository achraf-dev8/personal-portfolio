import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Portfolio from './Portfolio.jsx'
import { AppProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Portfolio />
    </AppProvider>
  </StrictMode>,
)
