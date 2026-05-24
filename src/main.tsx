import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initLenis } from './lib/lenis'

initLenis()

const rootEl = document.getElementById('root')!
const app = <StrictMode><App /></StrictMode>

if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
