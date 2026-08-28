import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // <- Baris ini yang sebelumnya hilang

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)