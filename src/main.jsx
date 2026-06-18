import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4500,
          style: {
            background: '#093C5D',
            color: '#fff',
            borderRadius: '8px',
            padding: '14px 20px',
            fontFamily: 'Segoe UI, sans-serif',
          },
          success: {
            iconTheme: { primary: '#5DF8D8', secondary: '#093C5D' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: '#fff' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
