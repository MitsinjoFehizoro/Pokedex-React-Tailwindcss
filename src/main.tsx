import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContextProvider } from './hooks/useToasts.tsx'
import Toast from './components/Toast.tsx'
import { AuthContextProvider } from './api/users-api/use-auth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ToastContextProvider>
  </React.StrictMode>,
)
