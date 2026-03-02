import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!clerkPubKey) {
  throw new Error("Clerk publishable key is missing. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey='clerkPubKey'>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
