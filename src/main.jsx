import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './pages/ErrorPage.jsx'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary
    FallbackComponent={ErrorPage}    
  >
    <StrictMode>
      <App />
    </StrictMode>
  </ErrorBoundary>
)
